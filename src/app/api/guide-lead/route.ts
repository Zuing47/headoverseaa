import { NextResponse } from "next/server";
import {
  checkSpam,
  clientIp,
  isEmail,
  isValidPhone,
  rateLimit,
  sanitizePhoneInput,
} from "@/lib/form-guard";
import {
  NOTIFY_SITE,
  NOTIFY_TO,
  sendBrandedNotify,
} from "@/lib/notify-email";

type LeadBody = {
  name?: string;
  phone?: string;
  email?: string;
  guideId?: string;
  guideTitle?: string;
  locale?: string;
  website?: string;
  formStartedAt?: number | string;
};

export async function POST(request: Request) {
  let body: LeadBody;
  try {
    body = (await request.json()) as LeadBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const spam = checkSpam({
    honeypot: body.website,
    formStartedAt: body.formStartedAt,
  });
  if (spam.spam) {
    // Honeypot / missing timing: fake OK so bots stop. Too-fast: ask human to retry.
    if (spam.reason === "too_fast") {
      return NextResponse.json({ ok: false, error: "too_fast" }, { status: 429 });
    }
    return NextResponse.json({ ok: true, notified: false });
  }

  const limited = rateLimit(`guide-lead:${clientIp(request)}`);
  if (!limited.ok) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const name = String(body.name ?? "").trim();
  const phone = sanitizePhoneInput(String(body.phone ?? ""));
  const email = String(body.email ?? "").trim();
  const guideId = String(body.guideId ?? "").trim();
  const guideTitle = String(body.guideTitle ?? "").trim();
  const locale = String(body.locale ?? "pt").trim();

  if (!name || !email || !isEmail(email) || !guideId) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }
  if (!isValidPhone(phone)) {
    return NextResponse.json({ ok: false, error: "invalid_phone" }, { status: 400 });
  }

  const lead = {
    source: "materials-guide-download",
    name,
    phone,
    email,
    guideId,
    guideTitle,
    locale,
    receivedAt: new Date().toISOString(),
  };

  const webhook =
    process.env.LEAD_WEBHOOK_URL?.trim() ||
    process.env.CONTACT_WEBHOOK_URL?.trim();
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) {
        console.error("[guide-lead] webhook failed", res.status);
      }
    } catch (err) {
      console.error("[guide-lead] webhook error", err);
    }
  }

  const materialsHref =
    locale === "en"
      ? `${NOTIFY_SITE}/en/materials`
      : `${NOTIFY_SITE}/materiais`;
  const localeLabel = locale === "en" ? "English" : "Português";
  const materialName = guideTitle || guideId;

  const delivered = await sendBrandedNotify({
    subject: `Material baixado — ${name} · ${materialName}`,
    badge: "Materials",
    eyebrow: "Download de material",
    title: "Alguém baixou um material",
    intro: `${name} preencheu o formulário e baixou “${materialName}”.`,
    fields: [
      { label: "Nome", value: name },
      { label: "E-mail", value: email, href: `mailto:${email}` },
      {
        label: "Telefone",
        value: phone || "—",
        href: phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : undefined,
      },
      { label: "Material", value: materialName },
      { label: "Idioma", value: localeLabel },
    ],
    replyTo: email,
    ctaLabel: "Responder lead",
    ctaHref: `mailto:${email}?subject=${encodeURIComponent(`Re: Material Head Oversea — ${materialName}`)}`,
    secondaryCtaLabel: "Ver materiais",
    secondaryCtaHref: materialsHref,
  });

  if (!delivered.ok) {
    console.info("[guide-lead] undelivered", JSON.stringify(lead), delivered.detail);
    return NextResponse.json({
      ok: true,
      notified: false,
      hint: delivered.detail,
      to: NOTIFY_TO,
    });
  }

  return NextResponse.json({
    ok: true,
    notified: true,
    to: delivered.to ?? NOTIFY_TO,
  });
}

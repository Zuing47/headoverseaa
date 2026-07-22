import { NextResponse } from "next/server";
import {
  checkSpam,
  clientIp,
  isEmail,
  rateLimit,
} from "@/lib/form-guard";
import {
  NOTIFY_SITE,
  NOTIFY_TO,
  sendBrandedNotify,
} from "@/lib/notify-email";

type Body = {
  email?: string;
  locale?: string;
  website?: string;
  formStartedAt?: number | string;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const spam = checkSpam({
    honeypot: body.website,
    formStartedAt: body.formStartedAt,
  });
  if (spam.spam) {
    if (spam.reason === "too_fast") {
      return NextResponse.json({ ok: false, error: "too_fast" }, { status: 429 });
    }
    return NextResponse.json({ ok: true });
  }

  const limited = rateLimit(`newsletter:${clientIp(request)}`);
  if (!limited.ok) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  const locale = String(body.locale ?? "pt").trim();

  if (!email || !isEmail(email)) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  const webhook =
    process.env.LEAD_WEBHOOK_URL?.trim() ||
    process.env.CONTACT_WEBHOOK_URL?.trim();
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "newsletter-signup",
          email,
          locale,
          receivedAt: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error("[newsletter] webhook error", err);
    }
  }

  if (!process.env.RESEND_API_KEY?.trim()) {
    return NextResponse.json(
      { ok: false, error: "missing_resend_key" },
      { status: 502 },
    );
  }

  const localeLabel = locale === "en" ? "English" : "Português";
  const delivered = await sendBrandedNotify({
    subject: `Cadastro newsletter — ${email}`,
    badge: "Cadastros",
    eyebrow: "Newsletter do site",
    title: "Novo cadastro na newsletter",
    intro: `${email} se inscreveu para receber insights da Head Oversea.`,
    fields: [
      { label: "E-mail", value: email, href: `mailto:${email}` },
      { label: "Idioma", value: localeLabel },
      { label: "Origem", value: "Newsletter / Insights" },
    ],
    replyTo: email,
    ctaLabel: "Responder",
    ctaHref: `mailto:${email}?subject=${encodeURIComponent("Head Oversea — Insights")}`,
    secondaryCtaLabel: "Ver site",
    secondaryCtaHref: NOTIFY_SITE,
  });

  if (!delivered.ok) {
    console.info("[newsletter] undelivered", email, delivered.detail);
    return NextResponse.json(
      {
        ok: false,
        error: "delivery_failed",
        hint: delivered.detail,
        to: NOTIFY_TO,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, to: delivered.to ?? NOTIFY_TO });
}

import { NextResponse } from "next/server";
import {
  checkSpam,
  clampField,
  clientIp,
  isEmail,
  isValidPhone,
  rateLimit,
  sanitizePhoneInput,
} from "@/lib/form-guard";
import {
  NOTIFY_SITE,
  sendBrandedNotify,
} from "@/lib/notify-email";

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  objective?: string;
  message?: string;
  locale?: string;
  website?: string;
  formStartedAt?: number | string;
};

const FIELD_MAX = {
  name: 120,
  email: 254,
  company: 160,
  objective: 200,
  message: 4000,
  locale: 8,
} as const;

export async function POST(request: Request) {
  let rawText: string;
  try {
    rawText = await request.text();
    if (rawText.length > 20_000) {
      return NextResponse.json({ ok: false, error: "payload_too_large" }, { status: 413 });
    }
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  let body: ContactBody;
  try {
    body = JSON.parse(rawText) as ContactBody;
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

  const limited = rateLimit(`contact:${clientIp(request)}`);
  if (!limited.ok) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const name = clampField(body.name, FIELD_MAX.name);
  const email = clampField(body.email, FIELD_MAX.email);
  const phone = sanitizePhoneInput(String(body.phone ?? ""));
  const company = clampField(body.company, FIELD_MAX.company);
  const objective = clampField(body.objective, FIELD_MAX.objective);
  const message = clampField(body.message, FIELD_MAX.message);
  const locale = clampField(body.locale ?? "pt", FIELD_MAX.locale) || "pt";

  if (!name || !email || !isEmail(email)) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }
  if (!isValidPhone(phone)) {
    return NextResponse.json({ ok: false, error: "invalid_phone" }, { status: 400 });
  }

  const webhook =
    process.env.CONTACT_WEBHOOK_URL?.trim() ||
    process.env.LEAD_WEBHOOK_URL?.trim();
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "contact-form",
          name,
          email,
          phone,
          company,
          objective,
          message,
          locale,
          receivedAt: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error("[contact] webhook error", err);
    }
  }

  if (!process.env.RESEND_API_KEY?.trim()) {
    console.error("[contact] RESEND_API_KEY missing on server");
    return NextResponse.json(
      { ok: false, error: "delivery_unavailable" },
      { status: 502 },
    );
  }

  const delivered = await sendBrandedNotify({
    subject: `Novo contato — ${name}`,
    badge: "Site lead",
    eyebrow: "Formulário de contato",
    title: "Novo contato pelo site",
    intro: `${name} entrou em contato pela página Contato.`,
    fields: [
      { label: "Nome", value: name },
      { label: "E-mail", value: email, href: `mailto:${email}` },
      {
        label: "Telefone",
        value: phone || "—",
        href: phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : undefined,
      },
      { label: "Empresa", value: company || "—" },
      { label: "Objetivo", value: objective || "—" },
      {
        label: "Idioma",
        value: locale === "en" ? "English" : "Português",
      },
    ],
    messageLabel: "Mensagem",
    message: message || "—",
    replyTo: email,
    ctaLabel: "Responder agora",
    ctaHref: `mailto:${email}?subject=${encodeURIComponent(`Re: Contato Head Oversea — ${name}`)}`,
    secondaryCtaLabel: "Ver página",
    secondaryCtaHref: `${NOTIFY_SITE}/contato`,
  });

  if (!delivered.ok) {
    console.info(
      "[contact] undelivered",
      JSON.stringify({ name, email, phone, company, objective, locale }),
    );
    return NextResponse.json(
      { ok: false, error: "delivery_failed" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

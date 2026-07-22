import { NextResponse } from "next/server";

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  objective?: string;
  message?: string;
  locale?: string;
  /** Honeypot — must stay empty */
  website?: string;
};

const TO = process.env.CONTACT_TO_EMAIL?.trim() || "contact@headoversea.com";
const FROM =
  process.env.CONTACT_FROM_EMAIL?.trim() ||
  "Head Oversea <onboarding@resend.dev>";

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendWithResend(payload: {
  name: string;
  email: string;
  phone: string;
  company: string;
  objective: string;
  message: string;
  locale: string;
}) {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return false;

  const subject = `Contato Head Oversea — ${payload.name}`;
  const html = `
    <h2>Novo contato pelo site</h2>
    <p><strong>Nome:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Telefone:</strong> ${escapeHtml(payload.phone || "—")}</p>
    <p><strong>Empresa:</strong> ${escapeHtml(payload.company || "—")}</p>
    <p><strong>Objetivo:</strong> ${escapeHtml(payload.objective || "—")}</p>
    <p><strong>Idioma:</strong> ${escapeHtml(payload.locale)}</p>
    <p><strong>Mensagem:</strong></p>
    <p>${escapeHtml(payload.message || "—").replace(/\n/g, "<br/>")}</p>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: payload.email,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("[contact] resend failed", res.status, text);
    return false;
  }
  return true;
}

async function sendWithFormSubmit(payload: {
  name: string;
  email: string;
  phone: string;
  company: string;
  objective: string;
  message: string;
  locale: string;
}) {
  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(TO)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      company: payload.company,
      objective: payload.objective,
      message: payload.message,
      locale: payload.locale,
      _subject: `Contato Head Oversea — ${payload.name}`,
      _template: "table",
      _captcha: "false",
      _replyto: payload.email,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("[contact] formsubmit failed", res.status, text);
    return false;
  }
  return true;
}

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Bot honeypot
  if (String(body.website ?? "").trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const company = String(body.company ?? "").trim();
  const objective = String(body.objective ?? "").trim();
  const message = String(body.message ?? "").trim();
  const locale = String(body.locale ?? "pt").trim();

  if (!name || !email || !isEmail(email)) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  const payload = { name, email, phone, company, objective, message, locale };

  const webhook = process.env.CONTACT_WEBHOOK_URL?.trim() || process.env.LEAD_WEBHOOK_URL?.trim();
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "contact-form",
          to: TO,
          ...payload,
          receivedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        console.error("[contact] webhook failed", res.status);
      }
    } catch (err) {
      console.error("[contact] webhook error", err);
    }
  }

  let delivered = false;
  try {
    delivered = await sendWithResend(payload);
  } catch (err) {
    console.error("[contact] resend error", err);
  }

  if (!delivered) {
    try {
      delivered = await sendWithFormSubmit(payload);
    } catch (err) {
      console.error("[contact] formsubmit error", err);
    }
  }

  if (!delivered) {
    console.info("[contact] undelivered lead", JSON.stringify(payload));
    return NextResponse.json(
      { ok: false, error: "delivery_failed" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

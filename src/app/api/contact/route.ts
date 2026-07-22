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

type Payload = {
  name: string;
  email: string;
  phone: string;
  company: string;
  objective: string;
  message: string;
  locale: string;
};

function buildHtml(payload: Payload) {
  return `
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
}

async function sendWithResend(
  payload: Payload,
  from: string,
): Promise<{ ok: boolean; detail?: string }> {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return { ok: false, detail: "missing_resend_key" };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [TO],
      reply_to: payload.email,
      subject: `Contato Head Oversea — ${payload.name}`,
      html: buildHtml(payload),
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("[contact] resend failed", from, res.status, text);
    return { ok: false, detail: text.slice(0, 280) || `status_${res.status}` };
  }
  return { ok: true };
}

/**
 * Resend rejects unverified domains. Try custom from first, then the
 * Resend onboarding sender (works immediately for the account owner /
 * verified recipients).
 */
async function deliverViaResend(payload: Payload) {
  const custom = process.env.CONTACT_FROM_EMAIL?.trim();
  const attempts = [
    custom,
    "Head Oversea <onboarding@resend.dev>",
  ].filter(Boolean) as string[];

  // de-dupe
  const seen = new Set<string>();
  const unique = attempts.filter((f) => {
    if (seen.has(f)) return false;
    seen.add(f);
    return true;
  });

  let lastDetail = "resend_unavailable";
  for (const from of unique) {
    try {
      const result = await sendWithResend(payload, from);
      if (result.ok) return { ok: true as const };
      lastDetail = result.detail || lastDetail;
    } catch (err) {
      console.error("[contact] resend error", from, err);
      lastDetail = "resend_exception";
    }
  }
  return { ok: false as const, detail: lastDetail };
}

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

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

  const payload: Payload = {
    name,
    email,
    phone,
    company,
    objective,
    message,
    locale,
  };

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
          to: TO,
          ...payload,
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
      {
        ok: false,
        error: "missing_resend_key",
        hint: "Add RESEND_API_KEY in Vercel and Redeploy",
      },
      { status: 502 },
    );
  }

  const delivered = await deliverViaResend(payload);
  if (!delivered.ok) {
    console.info("[contact] undelivered", JSON.stringify(payload), delivered.detail);
    return NextResponse.json(
      {
        ok: false,
        error: "delivery_failed",
        // Helps diagnose without exposing the full key
        hint: delivered.detail,
        to: TO,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

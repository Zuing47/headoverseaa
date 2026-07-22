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
/**
 * Use noreply@ (not contact@) as From — otherwise Gmail shows the sender as "me"
 * when contact@ is also the inbox you're reading.
 */
const FROM_DEFAULT = "Head Oversea <noreply@headoversea.com>";

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

function row(label: string, value: string, href?: string) {
  const display = escapeHtml(value || "—");
  const content = href
    ? `<a href="${escapeHtml(href)}" style="color:#050505;text-decoration:underline;">${display}</a>`
    : display;
  return `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid #ebebeb;width:34%;vertical-align:top;">
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#8a8a8a;">
          ${escapeHtml(label)}
        </p>
      </td>
      <td style="padding:14px 0;border-bottom:1px solid #ebebeb;vertical-align:top;">
        <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.45;color:#050505;">
          ${content}
        </p>
      </td>
    </tr>
  `;
}

function buildHtml(payload: Payload) {
  const localeLabel = payload.locale === "en" ? "English" : "Português";
  const messageHtml = escapeHtml(payload.message || "—").replace(/\n/g, "<br/>");
  const telHref = payload.phone
    ? `tel:${payload.phone.replace(/[^\d+]/g, "")}`
    : undefined;

  return `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Novo contato — Head Oversea</title>
</head>
<body style="margin:0;padding:0;background:#f3f3f3;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f3f3;padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e6e6e6;">
          <tr>
            <td style="background:#050505;padding:28px 32px;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.45);">
                Head Oversea
              </p>
              <p style="margin:12px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.2;color:#ffffff;">
                Novo contato pelo site
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${row("Nome", payload.name)}
                ${row("E-mail", payload.email, `mailto:${payload.email}`)}
                ${row("Telefone", payload.phone || "—", telHref)}
                ${row("Empresa", payload.company || "—")}
                ${row("Objetivo", payload.objective || "—")}
                ${row("Idioma", localeLabel)}
              </table>
              <div style="margin-top:28px;padding-top:22px;border-top:1px solid #ebebeb;">
                <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#8a8a8a;">
                  Mensagem
                </p>
                <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.55;color:#050505;">
                  ${messageHtml}
                </p>
              </div>
              <div style="margin-top:28px;">
                <a href="mailto:${escapeHtml(payload.email)}"
                   style="display:inline-block;background:#050505;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;text-decoration:none;padding:14px 22px;">
                  Responder
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 32px 24px;border-top:1px solid #ebebeb;background:#fafafa;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:#8a8a8a;">
                Enviado pelo formulário de contato · headoversea.com<br/>
                Responder vai para ${escapeHtml(payload.email)}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildText(payload: Payload) {
  return [
    "Novo contato pelo site",
    "",
    `Nome: ${payload.name}`,
    `E-mail: ${payload.email}`,
    `Telefone: ${payload.phone || "—"}`,
    `Empresa: ${payload.company || "—"}`,
    `Objetivo: ${payload.objective || "—"}`,
    `Idioma: ${payload.locale === "en" ? "English" : "Português"}`,
    "",
    "Mensagem:",
    payload.message || "—",
  ].join("\n");
}

async function sendWithResend(
  payload: Payload,
  from: string,
  to: string,
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
      to: [to],
      reply_to: payload.email,
      subject: `Novo contato — ${payload.name}`,
      html: buildHtml(payload),
      text: buildText(payload),
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("[contact] resend failed", from, to, res.status, text);
    return { ok: false, detail: text.slice(0, 400) || `status_${res.status}` };
  }
  return { ok: true };
}

/**
 * From = noreply@ (avoids Gmail "me"). To = contact@.
 */
async function deliverViaResend(payload: Payload) {
  const froms = [
    process.env.CONTACT_FROM_EMAIL?.trim(),
    FROM_DEFAULT,
    "Head Oversea Website <forms@headoversea.com>",
    "Head Oversea <onboarding@resend.dev>",
  ].filter(Boolean) as string[];

  const seenFrom = new Set<string>();
  const uniqueFrom = froms.filter((f) => {
    // Never send From contact@ — Gmail labels it "me" in that inbox
    if (/<\s*contact@headoversea\.com\s*>/i.test(f) || /^contact@headoversea\.com$/i.test(f)) {
      return false;
    }
    if (seenFrom.has(f)) return false;
    seenFrom.add(f);
    return true;
  });

  const recipients = [TO];
  let lastDetail = "resend_unavailable";

  for (const from of uniqueFrom) {
    for (const to of [...recipients]) {
      try {
        const result = await sendWithResend(payload, from, to);
        if (result.ok) return { ok: true as const, to };
        lastDetail = result.detail || lastDetail;

        const own = lastDetail.match(
          /own email address \(([^)]+@[^)]+)\)/i,
        );
        if (own?.[1] && !recipients.includes(own[1].trim())) {
          recipients.push(own[1].trim());
        }
      } catch (err) {
        console.error("[contact] resend error", from, to, err);
        lastDetail = "resend_exception";
      }
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
        hint: delivered.detail,
        to: TO,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, to: delivered.to ?? TO });
}

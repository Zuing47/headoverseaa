/**
 * Branded transactional email via Resend — shared by contact + materials leads.
 */

const TO = process.env.CONTACT_TO_EMAIL?.trim() || "contact@headoversea.com";
const FROM_DEFAULT = "Head Oversea <noreply@headoversea.com>";
const SITE = "https://www.headoversea.com";
const LOGO_URL = `${SITE}/images/email/logo-white.png`;
const MARK_URL = `${SITE}/images/email/mark-white.png`;

export function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type NotifyField = {
  label: string;
  value: string;
  href?: string;
};

export type BrandedNotifyInput = {
  subject: string;
  badge?: string;
  eyebrow: string;
  title: string;
  intro: string;
  fields: NotifyField[];
  messageLabel?: string;
  message?: string;
  replyTo?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

function fieldRow(field: NotifyField) {
  const display = escapeHtml(field.value || "—");
  const content = field.href
    ? `<a href="${escapeHtml(field.href)}" style="color:#050505;text-decoration:none;border-bottom:1px solid rgba(5,5,5,0.25);">${display}</a>`
    : display;
  return `
    <tr>
      <td style="padding:18px 0;border-bottom:1px solid #ececec;width:128px;vertical-align:top;">
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:500;letter-spacing:0.16em;text-transform:uppercase;color:#9a9a9a;">
          ${escapeHtml(field.label)}
        </p>
      </td>
      <td style="padding:18px 0;border-bottom:1px solid #ececec;vertical-align:top;">
        <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:17px;line-height:1.4;color:#050505;">
          ${content}
        </p>
      </td>
    </tr>
  `;
}

export function buildBrandedNotifyHtml(input: BrandedNotifyInput) {
  const when = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    dateStyle: "medium",
    timeStyle: "short",
  });
  const messageHtml = input.message
    ? escapeHtml(input.message).replace(/\n/g, "<br/>")
    : "";
  const preview = [
    input.intro,
    ...input.fields.slice(0, 2).map((f) => f.value),
  ]
    .filter(Boolean)
    .join(" · ");

  const cta =
    input.ctaHref && input.ctaLabel
      ? `<td style="background:#050505;">
           <a href="${escapeHtml(input.ctaHref)}"
              style="display:inline-block;padding:15px 26px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;color:#ffffff;text-decoration:none;">
             ${escapeHtml(input.ctaLabel)}
           </a>
         </td>`
      : "";

  const secondary =
    input.secondaryCtaHref && input.secondaryCtaLabel
      ? `<td width="14"></td>
         <td style="border:1px solid #d4d4d4;">
           <a href="${escapeHtml(input.secondaryCtaHref)}"
              style="display:inline-block;padding:14px 22px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;color:#050505;text-decoration:none;">
             ${escapeHtml(input.secondaryCtaLabel)}
           </a>
         </td>`
      : "";

  return `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="color-scheme" content="light only" />
  <title>${escapeHtml(input.title)}</title>
</head>
<body style="margin:0;padding:0;background:#ececec;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preview)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ececec;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-collapse:collapse;">
          <tr>
            <td style="background:#050505;padding:36px 40px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="left" style="vertical-align:middle;">
                    <a href="${SITE}" style="text-decoration:none;">
                      <img src="${LOGO_URL}" width="200" alt="Head Oversea" style="display:block;border:0;outline:none;width:200px;height:auto;max-width:200px;" />
                    </a>
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.4);">
                      ${escapeHtml(input.badge || "Site lead")}
                    </p>
                  </td>
                </tr>
              </table>
              <div style="height:1px;background:rgba(255,255,255,0.12);margin:28px 0 24px;"></div>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.45);">
                ${escapeHtml(input.eyebrow)}
              </p>
              <p style="margin:14px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1.2;color:#ffffff;">
                ${escapeHtml(input.title)}
              </p>
              <p style="margin:12px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.5;color:rgba(255,255,255,0.5);">
                ${escapeHtml(when)} · Brasil–EUA
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px 8px;">
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:18px;line-height:1.45;color:#050505;">
                ${escapeHtml(input.intro)}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 40px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${input.fields.map(fieldRow).join("")}
              </table>
            </td>
          </tr>
          ${
            input.message
              ? `<tr>
            <td style="padding:20px 40px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f7f7;border:1px solid #ececec;">
                <tr>
                  <td style="padding:24px 26px;">
                    <p style="margin:0 0 12px;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:500;letter-spacing:0.16em;text-transform:uppercase;color:#9a9a9a;">
                      ${escapeHtml(input.messageLabel || "Mensagem")}
                    </p>
                    <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:17px;line-height:1.55;color:#050505;">
                      ${messageHtml}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`
              : ""
          }
          ${
            cta || secondary
              ? `<tr>
            <td style="padding:28px 40px 36px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>${cta}${secondary}</tr>
              </table>
            </td>
          </tr>`
              : `<tr><td style="padding:0 0 28px;"></td></tr>`
          }
          <tr>
            <td style="background:#050505;padding:28px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:middle;" width="44">
                    <img src="${MARK_URL}" width="36" height="36" alt="" style="display:block;border:0;width:36px;height:36px;" />
                  </td>
                  <td style="vertical-align:middle;padding-left:14px;">
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:rgba(255,255,255,0.55);">
                      Head Oversea · Private Equity &amp; Real Estate<br/>
                      <a href="${SITE}" style="color:rgba(255,255,255,0.75);text-decoration:none;">headoversea.com</a>
                      · Orlando, FL
                    </p>
                  </td>
                </tr>
              </table>
              <p style="margin:20px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.5;color:rgba(255,255,255,0.35);">
                Enviado automaticamente pelo site${
                  input.replyTo
                    ? `. Reply-to: ${escapeHtml(input.replyTo)}`
                    : ""
                }
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

export function buildBrandedNotifyText(input: BrandedNotifyInput) {
  const lines = [
    input.title,
    "",
    input.intro,
    "",
    ...input.fields.map((f) => `${f.label}: ${f.value || "—"}`),
  ];
  if (input.message) {
    lines.push("", input.messageLabel || "Mensagem", input.message);
  }
  return lines.join("\n");
}

async function sendOnce(
  input: BrandedNotifyInput,
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
      reply_to: input.replyTo || undefined,
      subject: input.subject,
      html: buildBrandedNotifyHtml(input),
      text: buildBrandedNotifyText(input),
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("[notify-email] resend failed", from, to, res.status, text);
    return { ok: false, detail: text.slice(0, 400) || `status_${res.status}` };
  }
  return { ok: true };
}

/** Deliver branded mail to contact@ (with Resend fallbacks). */
export async function sendBrandedNotify(
  input: BrandedNotifyInput,
): Promise<{ ok: boolean; to?: string; detail?: string }> {
  if (!process.env.RESEND_API_KEY?.trim()) {
    return { ok: false, detail: "missing_resend_key" };
  }

  const froms = [
    process.env.CONTACT_FROM_EMAIL?.trim(),
    FROM_DEFAULT,
    "Head Oversea Website <forms@headoversea.com>",
    "Head Oversea <onboarding@resend.dev>",
  ].filter(Boolean) as string[];

  const seen = new Set<string>();
  const uniqueFrom = froms.filter((f) => {
    if (/<\s*contact@headoversea\.com\s*>/i.test(f) || /^contact@headoversea\.com$/i.test(f)) {
      return false;
    }
    if (seen.has(f)) return false;
    seen.add(f);
    return true;
  });

  const recipients = [TO];
  let lastDetail = "resend_unavailable";

  for (const from of uniqueFrom) {
    for (const to of [...recipients]) {
      try {
        const result = await sendOnce(input, from, to);
        if (result.ok) return { ok: true, to };
        lastDetail = result.detail || lastDetail;
        const own = lastDetail.match(/own email address \(([^)]+@[^)]+)\)/i);
        if (own?.[1] && !recipients.includes(own[1].trim())) {
          recipients.push(own[1].trim());
        }
      } catch (err) {
        console.error("[notify-email] error", from, to, err);
        lastDetail = "resend_exception";
      }
    }
  }

  return { ok: false, detail: lastDetail };
}

export const NOTIFY_TO = TO;
export const NOTIFY_SITE = SITE;

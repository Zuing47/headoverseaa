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

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "missing_resend_key" },
      { status: 502 },
    );
  }

  const segmentId =
    process.env.RESEND_NEWSLETTER_SEGMENT_ID?.trim() ||
    process.env.RESEND_SEGMENT_ID?.trim() ||
    "";

  const list = await addToNewsletterList({
    apiKey,
    email,
    locale,
    segmentId,
  });

  if (!list.ok) {
    console.error("[newsletter] audience failed", email, list.detail);
    return NextResponse.json(
      {
        ok: false,
        error: "audience_failed",
        hint: list.detail,
      },
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
      {
        label: "Lista Resend",
        value: list.segmented
          ? "Adicionado ao segmento"
          : segmentId
            ? "Contato criado (segmento não aplicado)"
            : "Sem SEGMENT_ID — só notificação",
      },
    ],
    replyTo: email,
    ctaLabel: "Responder",
    ctaHref: `mailto:${email}?subject=${encodeURIComponent("Head Oversea — Insights")}`,
    secondaryCtaLabel: "Ver site",
    secondaryCtaHref: NOTIFY_SITE,
  });

  if (!delivered.ok) {
    // Contact is already on the list — don't fail the signup UX
    console.info("[newsletter] notify failed", email, delivered.detail);
    return NextResponse.json({
      ok: true,
      listed: true,
      notified: false,
      to: NOTIFY_TO,
    });
  }

  return NextResponse.json({
    ok: true,
    listed: true,
    segmented: list.segmented,
    notified: true,
    to: delivered.to ?? NOTIFY_TO,
  });
}

async function addToNewsletterList(opts: {
  apiKey: string;
  email: string;
  locale: string;
  segmentId: string;
}): Promise<{ ok: boolean; segmented: boolean; detail?: string }> {
  const headers = {
    Authorization: `Bearer ${opts.apiKey}`,
    "Content-Type": "application/json",
  };

  const createBody: Record<string, unknown> = {
    email: opts.email,
    unsubscribed: false,
  };
  if (opts.segmentId) {
    createBody.segments = [{ id: opts.segmentId }];
  }

  const createRes = await fetch("https://api.resend.com/contacts", {
    method: "POST",
    headers,
    body: JSON.stringify(createBody),
  });

  if (createRes.ok) {
    return { ok: true, segmented: Boolean(opts.segmentId) };
  }

  const createText = await createRes.text().catch(() => "");
  const alreadyExists =
    createRes.status === 409 ||
    /already|exists|duplicate/i.test(createText);

  if (!alreadyExists) {
    return {
      ok: false,
      segmented: false,
      detail: createText.slice(0, 400) || `status_${createRes.status}`,
    };
  }

  // Contact exists — ensure they're on the newsletter segment
  if (!opts.segmentId) {
    return { ok: true, segmented: false };
  }

  const segRes = await fetch(
    `https://api.resend.com/contacts/${encodeURIComponent(opts.email)}/segments/${opts.segmentId}`,
    { method: "POST", headers },
  );

  if (segRes.ok || segRes.status === 409) {
    return { ok: true, segmented: true };
  }

  const segText = await segRes.text().catch(() => "");
  return {
    ok: false,
    segmented: false,
    detail: segText.slice(0, 400) || `segment_status_${segRes.status}`,
  };
}

import { NextResponse } from "next/server";

type LeadBody = {
  name?: string;
  phone?: string;
  email?: string;
  guideId?: string;
  guideTitle?: string;
  locale?: string;
};

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(request: Request) {
  let body: LeadBody;
  try {
    body = (await request.json()) as LeadBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const email = String(body.email ?? "").trim();
  const guideId = String(body.guideId ?? "").trim();
  const guideTitle = String(body.guideTitle ?? "").trim();
  const locale = String(body.locale ?? "pt").trim();

  if (!name || !phone || !email || !isEmail(email) || !guideId) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
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

  const webhook = process.env.LEAD_WEBHOOK_URL?.trim();
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) {
        console.error("[guide-lead] webhook failed", res.status);
        return NextResponse.json({ ok: false, error: "webhook_failed" }, { status: 502 });
      }
    } catch (err) {
      console.error("[guide-lead] webhook error", err);
      return NextResponse.json({ ok: false, error: "webhook_error" }, { status: 502 });
    }
  } else {
    // No CRM wired yet — keep the lead in server logs for ops.
    console.info("[guide-lead]", JSON.stringify(lead));
  }

  return NextResponse.json({ ok: true });
}

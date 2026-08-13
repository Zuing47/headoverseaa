import { NextResponse } from "next/server";
import { loadNewsQueueForSession } from "@/lib/news/queue";

export const runtime = "nodejs";

/** Authenticated queue listing — pending first, then recent decisions. */
export async function GET() {
  const result = await loadNewsQueueForSession();
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: result.status },
    );
  }
  return NextResponse.json({ ok: true, ...result.data });
}

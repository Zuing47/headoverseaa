import { NextResponse } from "next/server";
import { getNewsMedia } from "@/lib/news/media";

export const runtime = "nodejs";

type Props = { params: Promise<{ id: string }> };

/** Public cover images hosted from ingest/upload (Redis-backed). */
export async function GET(_request: Request, { params }: Props) {
  const { id } = await params;
  const media = await getNewsMedia(id);
  if (!media) {
    return new NextResponse(null, { status: 404 });
  }

  return new NextResponse(new Uint8Array(media.bytes), {
    status: 200,
    headers: {
      "Content-Type": media.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

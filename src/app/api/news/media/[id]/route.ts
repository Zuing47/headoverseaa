import { NextResponse } from "next/server";
import { getNewsMedia } from "@/lib/news/media";

export const runtime = "nodejs";

type Props = { params: Promise<{ id: string }> };

const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

/** Public cover images hosted from ingest/upload (Redis-backed). */
export async function GET(_request: Request, { params }: Props) {
  const { id } = await params;
  if (!/^[a-f0-9]{32}$/i.test(id)) {
    return new NextResponse(null, { status: 404 });
  }

  const media = await getNewsMedia(id);
  if (!media) {
    return new NextResponse(null, { status: 404 });
  }

  let contentType = media.contentType.toLowerCase().split(";")[0].trim();
  if (contentType === "image/jpg") contentType = "image/jpeg";
  if (!ALLOWED.has(contentType)) {
    return new NextResponse(null, { status: 404 });
  }

  return new NextResponse(new Uint8Array(media.bytes), {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": 'inline; filename="cover"',
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
    },
  });
}

/**
 * Safe inline rendering for editorial news body.
 * Supports **bold** and standalone ![alt](https://...) image paragraphs.
 */

import type { ReactNode } from "react";
import { sanitizeHttpsUrl } from "@/lib/news/sanitize";
import { isNewsMediaPath } from "@/lib/news/media-path";

const IMAGE_LINE = /^!\[([^\]]*)\]\(([^)]+)\)$/;

function safeSrc(raw: string): string | null {
  const s = raw.trim();
  if (s.startsWith("/images/") || isNewsMediaPath(s)) return s;
  return sanitizeHttpsUrl(s);
}

export function renderInlineMarkdown(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      nodes.push(text.slice(last, m.index));
    }
    nodes.push(
      <strong key={`b-${key++}`} className="font-semibold text-black">
        {m[1]}
      </strong>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes.length ? nodes : [text];
}

export function EditorialBody({
  paragraphs,
  className,
}: {
  paragraphs: string[];
  className?: string;
}) {
  return (
    <div className={className}>
      {paragraphs.map((raw, i) => {
        const p = raw.trim();
        if (!p) return null;
        const img = p.match(IMAGE_LINE);
        if (img) {
          const src = safeSrc(img[2]);
          if (!src) return null;
          const alt = img[1] || "";
          return (
            <figure key={i} className="my-8 overflow-hidden bg-black/[0.03]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                className="w-full object-cover"
                referrerPolicy="no-referrer"
              />
              {alt ? (
                <figcaption className="px-1 pt-2 text-[12px] text-black/45">
                  {alt}
                </figcaption>
              ) : null}
            </figure>
          );
        }
        return (
          <p
            key={i}
            className="mb-6 text-[1.0625rem] leading-[1.8] text-black/70 first:mt-0 md:text-[1.1rem] md:leading-[1.85]"
          >
            {renderInlineMarkdown(p)}
          </p>
        );
      })}
    </div>
  );
}

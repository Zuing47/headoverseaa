/**
 * Safe editorial body rendering — HO-flavored news markup.
 * Supports: **bold**, ## headings, > pull quotes, - lists, ![alt](url) images.
 */

import type { ReactNode } from "react";
import { sanitizeHttpsUrl } from "@/lib/news/sanitize";
import { isNewsMediaPath } from "@/lib/news/media-path";

const IMAGE_LINE = /^!\[([^\]]*)\]\(([^)]+)\)$/;
const HEADING_LINE = /^##\s+(.+)$/;
const QUOTE_LINE = /^>\s?(.*)$/;
const BULLET_LINE = /^[-*]\s+(.+)$/;

function safeSrc(raw: string): string | null {
  const s = raw.trim();
  if (s.startsWith("/images/") || isNewsMediaPath(s)) return s;
  return sanitizeHttpsUrl(s);
}

/** Bold accents in navy — inspired by news portals, not Globo red-brown. */
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
      <strong key={`b-${key++}`} className="font-semibold text-[#0a2540]">
        {m[1]}
      </strong>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes.length ? nodes : [text];
}

function isQuoteBlock(paragraphs: string[], start: number): number {
  let i = start;
  while (i < paragraphs.length && QUOTE_LINE.test(paragraphs[i].trim())) {
    i += 1;
  }
  return i - start;
}

function isListBlock(paragraphs: string[], start: number): number {
  let i = start;
  while (i < paragraphs.length && BULLET_LINE.test(paragraphs[i].trim())) {
    i += 1;
  }
  return i - start;
}

export function EditorialBody({
  paragraphs,
  className,
}: {
  paragraphs: string[];
  className?: string;
}) {
  const nodes: ReactNode[] = [];
  let i = 0;

  while (i < paragraphs.length) {
    const raw = paragraphs[i].trim();
    if (!raw) {
      i += 1;
      continue;
    }

    const img = raw.match(IMAGE_LINE);
    if (img) {
      const src = safeSrc(img[2]);
      const alt = img[1] || "";
      if (src) {
        nodes.push(
          <figure key={`img-${i}`} className="my-9">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="w-full bg-black/[0.03] object-cover"
              referrerPolicy="no-referrer"
            />
            {alt ? (
              <figcaption className="mt-2 text-[12px] leading-snug text-black/45">
                {alt}
              </figcaption>
            ) : null}
          </figure>,
        );
      }
      i += 1;
      continue;
    }

    const heading = raw.match(HEADING_LINE);
    if (heading) {
      nodes.push(
        <h2
          key={`h-${i}`}
          className="mb-4 mt-10 text-[1.25rem] font-bold leading-snug tracking-[-0.01em] text-black md:text-[1.35rem]"
        >
          {heading[1].trim()}
        </h2>,
      );
      i += 1;
      continue;
    }

    const quoteLen = isQuoteBlock(paragraphs, i);
    if (quoteLen > 0) {
      const lines = paragraphs.slice(i, i + quoteLen).map((line) => {
        const m = line.trim().match(QUOTE_LINE);
        return (m?.[1] || "").trim();
      });
      nodes.push(
        <blockquote
          key={`q-${i}`}
          className="my-9 border-y border-black/[0.12] py-6"
        >
          <p className="text-[1.05rem] font-semibold leading-[1.65] text-black md:text-[1.12rem]">
            {renderInlineMarkdown(lines.join(" "))}
          </p>
        </blockquote>,
      );
      i += quoteLen;
      continue;
    }

    const listLen = isListBlock(paragraphs, i);
    if (listLen > 0) {
      const items = paragraphs.slice(i, i + listLen).map((line) => {
        const m = line.trim().match(BULLET_LINE);
        return (m?.[1] || "").trim();
      });
      nodes.push(
        <ul
          key={`ul-${i}`}
          className="my-6 list-disc space-y-2 pl-5 text-[1.05rem] leading-[1.75] text-black/70"
        >
          {items.map((item, j) => (
            <li key={j}>{renderInlineMarkdown(item)}</li>
          ))}
        </ul>,
      );
      i += listLen;
      continue;
    }

    nodes.push(
      <p
        key={`p-${i}`}
        className="mb-5 text-[1.0625rem] leading-[1.85] text-[#222] first:mt-0 md:mb-6 md:text-[1.125rem] md:leading-[1.9]"
      >
        {renderInlineMarkdown(raw)}
      </p>,
    );
    i += 1;
  }

  return <div className={className}>{nodes}</div>;
}

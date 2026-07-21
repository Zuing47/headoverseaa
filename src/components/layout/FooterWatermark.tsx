"use client";

import { useEffect, useRef } from "react";

/** Massive faded wordmark that fits its glyph box flush to the container width. */
export function FooterWatermark({ text = "HEAD OVERSEA" }: { text?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    const fit = () => {
      const svg = svgRef.current;
      const node = textRef.current;
      if (!svg || !node) return;
      try {
        const b = node.getBBox();
        svg.setAttribute("viewBox", `${b.x} ${b.y} ${b.width} ${b.height}`);
      } catch {
        /* getBBox can throw if not rendered yet */
      }
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(fit);
    } else {
      fit();
    }
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [text]);

  return (
    <div
      className="pointer-events-none relative z-0 mx-auto mt-[-60px] max-w-[1150px] select-none"
      style={{ lineHeight: 0 }}
      aria-hidden
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1000 200"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        className="block h-auto w-full overflow-visible"
      >
        <text
          ref={textRef}
          x="500"
          y="160"
          textAnchor="middle"
          fontSize="200"
          className="font-sans"
          style={{ fontWeight: 700, letterSpacing: "-0.03em", fill: "rgba(22,21,15,0.05)" }}
        >
          {text}
        </text>
      </svg>
    </div>
  );
}

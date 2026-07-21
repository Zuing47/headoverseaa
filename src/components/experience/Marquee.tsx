"use client";

import { useEffect, useRef, useState } from "react";

const IMAGES = [
  "/images/us-skyline-presence.jpg",
  "/images/private-equity-team-collaboration.jpg",
  "/images/luxury-residential-real-estate.jpg",
  "/images/philadelphia-skyline-us-real-estate.jpg",
];

const ROW1 = [...IMAGES, ...IMAGES, ...IMAGES];
const ROW2 = [...[...IMAGES].reverse(), ...[...IMAGES].reverse(), ...[...IMAGES].reverse()];

export function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const sectionTop = el.getBoundingClientRect().top + window.scrollY;
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={ref} className="bg-obsidian pt-24 pb-10 sm:pt-32 md:pt-40" style={{ overflowX: "clip" }}>
      <div className="flex flex-col gap-3">
        <Row images={ROW1} translate={offset - 200} />
        <Row images={ROW2} translate={-(offset - 200)} />
      </div>
    </section>
  );
}

function Row({ images, translate }: { images: string[]; translate: number }) {
  return (
    <div className="flex w-max gap-3" style={{ transform: `translateX(${translate}px)`, willChange: "transform" }}>
      {images.map((src, i) => (
        <div
          key={i}
          className="relative shrink-0 overflow-hidden rounded-2xl"
          style={{ width: 420, height: 270 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}

"use client";

import type { Locale } from "@/types/content";
import { BackApproach } from "@/components/back";

interface ApproachBandProps {
  locale?: Locale;
}

/** Home approach — BACK style. */
export function ApproachBand({ locale = "pt" }: ApproachBandProps) {
  const en = locale === "en";

  return (
    <BackApproach
      eyebrow={en ? "Our approach" : "Nossa abordagem"}
      title={
        en ? "Invest with Head Oversea" : "Invista com a Head Oversea"
      }
      body={
        en
          ? "Active ownership across Brazil and the United States — governance, operations, and patient capital side by side with leadership."
          : "Ownership ativo entre Brasil e Estados Unidos — governança, operação e capital paciente lado a lado com a liderança."
      }
      href={en ? "/en/why-head-oversea" : "/por-que-head-oversea"}
      cta={en ? "Why Head Oversea" : "Por que Head Oversea"}
      image="/images/dillon-kydd-2keCPb73aQY-unsplash.jpg"
      imageAlt={
        en
          ? "Head Oversea — perspective across markets"
          : "Head Oversea — perspectiva entre mercados"
      }
      quote={
        en
          ? "Our mission is institutional discipline with operational presence — in both markets."
          : "Nossa missão é disciplina institucional com presença operacional — nos dois mercados."
      }
    />
  );
}

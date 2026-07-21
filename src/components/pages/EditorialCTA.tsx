"use client";

import type { Locale } from "@/types/content";
import { BackContact } from "@/components/back";

/** @deprecated Prefer BackContact from @/components/back — BACK style. */
export function EditorialCTA({
  locale = "pt",
}: {
  locale?: Locale;
}) {
  return <BackContact locale={locale} />;
}

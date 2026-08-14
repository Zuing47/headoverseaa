import type { Locale } from "@/types/content";

export type NewsStatus = "pending" | "published" | "rejected";

/** Stored article — never trust client to set status on create. */
export type NewsArticleRecord = {
  id: string;
  status: NewsStatus;
  locale: Locale;
  slug: string;
  title: string;
  summary: string;
  body: string;
  category: string;
  sourceUrl: string | null;
  sourceName: string | null;
  imageUrl: string | null;
  /** Links PT/EN twins created on approve */
  pairId: string | null;
  /** RSS / n8n dedupe key */
  externalId: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  decidedBy: string | null;
  rejectReason: string | null;
};

export type NewsIngestInput = {
  title: string;
  summary?: string;
  body?: string;
  locale?: string;
  category?: string;
  sourceUrl?: string;
  sourceName?: string;
  /** Cover — also accepts image_url / image / enclosure from n8n */
  imageUrl?: string;
  image_url?: string;
  image?: string;
  externalId?: string;
  /** Optional pre-slug from n8n — still sanitized server-side */
  slug?: string;
};

export type NewsQueuePayload = {
  me: string;
  pending: NewsArticleRecord[];
  published: NewsArticleRecord[];
  rejected: NewsArticleRecord[];
};

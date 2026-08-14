/** Client-safe helpers for hosted news media paths (no Node APIs). */

export function isNewsMediaPath(path: string): boolean {
  return /^\/api\/news\/media\/[a-f0-9]{32}$/i.test(path.trim());
}

export function newsMediaPublicPath(id: string): string {
  return `/api/news/media/${id}`;
}

export function newsMediaIdFromPath(path: string): string | null {
  const m = path.trim().match(/^\/api\/news\/media\/([a-f0-9]{32})$/i);
  return m?.[1] ?? null;
}

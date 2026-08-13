import { createHash, timingSafeEqual, randomBytes } from "node:crypto";

/** Constant-time string compare via SHA-256 digests (handles unequal lengths). */
export function safeEqual(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a, "utf8").digest();
  const hb = createHash("sha256").update(b, "utf8").digest();
  return timingSafeEqual(ha, hb);
}

export function newNewsId(): string {
  return randomBytes(16).toString("hex");
}

export function newExternalFallbackId(): string {
  return `gen_${randomBytes(12).toString("hex")}`;
}

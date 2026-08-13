/**
 * Admin login helpers for Vercel.
 *
 * Forma mais simples (recomendado):
 *   NEWS_ADMIN_EMAIL=marketing@headoversea.com
 *   NEWS_ADMIN_PASSWORD=sua-senha-forte
 *
 * Ou SHA-256:
 *   npm run news:hash-password -- "sua-senha-forte"
 */

import { createHash } from "node:crypto";

const password = process.argv[2];

if (!password || password.length < 8) {
  console.error('Usage: npm run news:hash-password -- "password-at-least-8-chars"');
  process.exit(1);
}

const sha256 = createHash("sha256").update(password, "utf8").digest("hex");

console.log("");
console.log("=== MAIS SIMPLES (cole na Vercel) ===");
console.log("NEWS_ADMIN_EMAIL=marketing@headoversea.com");
console.log(`NEWS_ADMIN_PASSWORD=${password}`);
console.log("");
console.log("Marque Sensitive. Depois: Redeploy.");
console.log("No login digite a MESMA senha.");
console.log("");
console.log("=== Alternativa (sem senha em claro) ===");
console.log(`NEWS_ADMIN_PASSWORD_SHA256=${sha256}`);
console.log("");

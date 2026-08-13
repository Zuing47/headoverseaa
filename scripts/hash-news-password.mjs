/**
 * Generate Vercel-safe admin login secrets.
 *
 * Usage:
 *   npm run news:hash-password -- "sua-senha-forte-aqui"
 *
 * Login no site = a SENHA em texto (nunca o hash).
 * Na Vercel = EMAIL + PASSWORD_SHA256.
 */

import { createHash } from "node:crypto";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const bcrypt = require("bcryptjs");

const password = process.argv[2];

if (!password || password.length < 12) {
  console.error(
    'Usage: npm run news:hash-password -- "password-at-least-12-chars"',
  );
  process.exit(1);
}

const sha256 = createHash("sha256").update(password, "utf8").digest("hex");
const bcryptHash = bcrypt.hashSync(password, 12);
const b64 = Buffer.from(bcryptHash, "utf8").toString("base64");

console.log("");
console.log("1) Guarde a SENHA — é o que você digita em /admin/news/login");
console.log("2) Cole NA VERCEL só estas duas linhas:");
console.log("");
console.log("NEWS_ADMIN_EMAIL=marketing@headoversea.com");
console.log(`NEWS_ADMIN_PASSWORD_SHA256=${sha256}`);
console.log("");
console.log("3) Apague na Vercel (se existirem):");
console.log("   NEWS_ADMIN_CREDENTIALS");
console.log("   NEWS_ADMIN_PASSWORD_HASH");
console.log("   NEWS_ADMIN_PASSWORD_HASH_B64");
console.log("");
console.log("4) Redeploy na Vercel");
console.log("");
console.log("(backup bcrypt, opcional)");
console.log(`NEWS_ADMIN_PASSWORD_HASH_B64=${b64}`);
console.log("");

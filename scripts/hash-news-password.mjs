/**
 * Generate bcrypt hash + Vercel-safe base64 for news admin login.
 *
 * Usage:
 *   npm run news:hash-password -- "sua-senha-forte-aqui"
 *
 * Login no site = a SENHA em texto (nunca o hash).
 * Na Vercel = EMAIL + HASH_B64 (nunca a senha).
 */

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

const hash = bcrypt.hashSync(password, 12);
const b64 = Buffer.from(hash, "utf8").toString("base64");

console.log("");
console.log("=== Guarde a SENHA (digita no login) ===");
console.log("(não cole a senha na Vercel)");
console.log("");
console.log("=== Cole isto na Vercel ===");
console.log("NEWS_ADMIN_EMAIL=marketing@headoversea.com");
console.log(`NEWS_ADMIN_PASSWORD_HASH_B64=${b64}`);
console.log("");
console.log("(opcional, se precisar do hash cru — escape $ como $$)");
console.log(hash);
console.log("");

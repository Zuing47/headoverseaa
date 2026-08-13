/**
 * Generate a bcrypt hash for NEWS_ADMIN_CREDENTIALS.
 *
 * Usage:
 *   npm run news:hash-password -- "sua-senha-forte-aqui"
 *
 * Then set in Vercel / .env (never commit the password):
 *   NEWS_ADMIN_CREDENTIALS=voce@headoversea.com:$2b$12$...
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
console.log(hash);
console.log("");
console.log("Example env line:");
console.log(`NEWS_ADMIN_CREDENTIALS=marketing@headoversea.com:${hash}`);

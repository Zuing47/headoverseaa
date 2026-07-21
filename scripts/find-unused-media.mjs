import fs from "fs";
import path from "path";

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (["node_modules", ".next", ".git", ".cursor"].includes(e.name)) continue;
      walk(p, acc);
    } else {
      acc.push(p);
    }
  }
  return acc;
}

const root = process.cwd();
const files = walk(root).filter((f) =>
  /\.(ts|tsx|js|jsx|mjs|json|md|css)$/i.test(f),
);
const text = files
  .map((f) => {
    try {
      return fs.readFileSync(f, "utf8");
    } catch {
      return "";
    }
  })
  .join("\n");

const refs = new Set();
for (const m of text.matchAll(/\/(?:images|videos|guides|og)[^"'`)\s?]*/g)) {
  refs.add(m[0].replace(/\\/g, "/").split("?")[0].toLowerCase());
}

const media = walk(path.join(root, "public")).filter((f) =>
  /\.(mp4|webm|jpg|jpeg|png|webp|gif|svg|pdf|mov)$/i.test(f),
);

const unused = [];
const used = [];
for (const f of media) {
  const rel = "/" + path.relative(path.join(root, "public"), f).split(path.sep).join("/");
  const key = rel.toLowerCase();
  const mb = +(fs.statSync(f).size / 1e6).toFixed(2);
  (refs.has(key) ? used : unused).push({ mb, path: rel });
}

unused.sort((a, b) => b.mb - a.mb);
used.sort((a, b) => b.mb - a.mb);

const sum = (arr) => arr.reduce((s, x) => s + x.mb, 0);
console.log(
  JSON.stringify(
    {
      refs: refs.size,
      usedMB: +sum(used).toFixed(1),
      unusedMB: +sum(unused).toFixed(1),
      unused,
    },
    null,
    2,
  ),
);

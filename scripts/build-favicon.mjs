import sharp from "sharp";
import fs from "fs";

const NAVY = "#08274d";
const MARK = [
  "M39,107.9h23.62l.94,1.09c-2.75,12.5,4.53,26.34,17.87,28.09,7.48.98,26.74.82,34.43.06,11.54-1.15,18.87-9.18,19.91-20.59-1.54-22.78,1.97-48.04-.04-70.51-.88-9.83-7.39-19.16-17.68-20.57-7-.96-30.37-.96-37.37,0s-16.94,9.6-16.94,16.81v11.62h-24.75c-1.52-21.1,7.86-42.21,28.3-50.07C78.72-.57,106.19-.47,118.86.66c23.37,2.08,40.16,20.8,41.67,43.83,1.35,20.63,1.5,53.03,0,73.56-3.28,44.65-45.71,45.81-80.68,43.12-21.11-1.62-40.85-20.59-40.85-42.4v-10.88Z",
  "M24.75,68.9h61.5v24H24c1.38,5.76.06,11.72-.04,17.66-.2,11.75-.27,24.07,0,35.99.1,4.24,1.38,9,.66,13.36l-1,1.24H0V.65h23.62l1.12,1.12v67.12Z",
];

/** Padded viewBox — full mark, nothing clipped, transparent air around. */
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-18 -18 197 198" width="1024" height="1024">
  <g fill="${NAVY}">
    ${MARK.map((d) => `<path d="${d}"/>`).join("")}
  </g>
</svg>`;

fs.writeFileSync("public/favicon.svg", svg);

async function out(file, size) {
  await sharp(Buffer.from(svg))
    .resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(file);
  console.log("wrote", file, size);
}

await out("public/favicon.png", 64);
await out("public/favicon-32.png", 32);
await out("public/icon.png", 180);
await out("public/apple-touch-icon.png", 180);
await out("public/icon-512.png", 512);

for (const f of [
  "public/favicon.png",
  "public/icon.png",
  "public/icon-512.png",
]) {
  const { data, info } = await sharp(f)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  let t = 0;
  for (let i = 3; i < data.length; i += 4) if (data[i] < 10) t++;
  console.log(
    f,
    info.width,
    "transparent%",
    ((t / (info.width * info.height)) * 100).toFixed(1),
  );
}

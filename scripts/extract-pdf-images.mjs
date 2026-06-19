import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createCanvas } from "canvas";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const outputDir = path.join(rootDir, "public", "images", "pdf");

const pdfFiles = fs
  .readdirSync(rootDir)
  .filter((f) => f.toLowerCase().endsWith(".pdf"));

if (pdfFiles.length === 0) {
  console.error("No PDF file found.");
  process.exit(1);
}

const pdfPath = path.join(rootDir, pdfFiles[0]);
console.log(`Extracting from: ${pdfFiles[0]}`);

fs.mkdirSync(outputDir, { recursive: true });

const data = new Uint8Array(fs.readFileSync(pdfPath));
const pdf = await pdfjsLib.getDocument({ data, useSystemFonts: true }).promise;

console.log(`Total pages: ${pdf.numPages}`);

let imageIndex = 0;
const embeddedImages = [];

for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
  const page = await pdf.getPage(pageNum);
  const ops = await page.getOperatorList();
  const imgNames = new Set();

  for (let i = 0; i < ops.fnArray.length; i++) {
    if (
      ops.fnArray[i] === pdfjsLib.OPS.paintImageXObject ||
      ops.fnArray[i] === pdfjsLib.OPS.paintInlineImageXObject
    ) {
      imgNames.add(ops.argsArray[i][0]);
    }
  }

  for (const imgName of imgNames) {
    await new Promise((resolve) => {
      page.objs.get(imgName, (img) => {
        if (!img) {
          resolve(null);
          return;
        }

        try {
          let buffer;

          if (img.data && img.width && img.height) {
            const w = img.width;
            const h = img.height;
            const imgCanvas = createCanvas(w, h);
            const imgCtx = imgCanvas.getContext("2d");
            const imageData = imgCtx.createImageData(w, h);
            imageData.data.set(img.data);
            imgCtx.putImageData(imageData, 0, 0);
            buffer = imgCanvas.toBuffer("image/png");
            imageIndex++;
            const name = `img-p${String(pageNum).padStart(2, "0")}-${String(imageIndex).padStart(3, "0")}-${w}x${h}.png`;
            fs.writeFileSync(path.join(outputDir, name), buffer);
            embeddedImages.push({ pageNum, name, w, h });
            console.log(`Saved: ${name}`);
          } else if (img.src) {
            imageIndex++;
            const ext = img.src.includes("jpeg") ? "jpg" : "png";
            const name = `img-p${String(pageNum).padStart(2, "0")}-${String(imageIndex).padStart(3, "0")}.${ext}`;
            fs.writeFileSync(path.join(outputDir, name), Buffer.from(img.src));
            embeddedImages.push({ pageNum, name, w: 0, h: 0 });
            console.log(`Saved raw: ${name}`);
          }
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          console.warn(`Skip ${imgName} on page ${pageNum}:`, message);
        }
        resolve(null);
      });
    });
  }
}

const manifest = {
  source: pdfFiles[0],
  extractedAt: new Date().toISOString(),
  embeddedImages,
};

fs.writeFileSync(
  path.join(outputDir, "manifest.json"),
  JSON.stringify(manifest, null, 2)
);

console.log(`\nExtracted ${embeddedImages.length} images to ${outputDir}`);

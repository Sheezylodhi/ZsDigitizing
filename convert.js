import sharp from "sharp";
import fs from "fs";
import path from "path";
import chokidar from "chokidar";
import { fileURLToPath } from "url";

// __dirname fix for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Folders jahan images hain
const folders = [
  path.join(__dirname, "public"),
  path.join(__dirname, "public/images"),
  path.join(__dirname, "public/portfolio")
];

const outputFolder = path.join(__dirname, "public-webp");

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

// Recursive conversion function
function convertFolder(folderPath) {
  fs.readdirSync(folderPath).forEach(file => {
    const fullPath = path.join(folderPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      convertFolder(fullPath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if ([".jpg", ".jpeg", ".png"].includes(ext)) {
        const relativePath = path.relative(__dirname, fullPath);
        const outPath = path.join(outputFolder, relativePath);
        const outDir = path.dirname(outPath);

        if (!fs.existsSync(outDir)) {
          fs.mkdirSync(outDir, { recursive: true });
        }

        sharp(fullPath)
          .webp({ quality: 80 })
          .toFile(outPath.replace(ext, ".webp"))
          .then(() => console.log(`Converted: ${file}`))
          .catch(err => console.error(`Error: ${file}`, err));
      }
    }
  });
}

// Convert existing images
folders.forEach(folder => convertFolder(folder));
console.log("✅ Existing images converted.");

// Watcher for future images
const watcher = chokidar.watch(folders, { persistent: true });

watcher.on("add", filePath => {
  const ext = path.extname(filePath).toLowerCase();
  if ([".jpg", ".jpeg", ".png"].includes(ext)) {
    const relativePath = path.relative(__dirname, filePath);
    const outPath = path.join(outputFolder, relativePath);
    const outDir = path.dirname(outPath);

    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    sharp(filePath)
      .webp({ quality: 80 })
      .toFile(outPath.replace(ext, ".webp"))
      .then(() => console.log(`Auto Converted: ${filePath}`))
      .catch(err => console.error(err));
  }
});

console.log("👀 Watching for new images...");
import sharp from "sharp";
import fs from "fs";
import path from "path";
import chokidar from "chokidar";
import { fileURLToPath } from "url";

// __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sirf public folder
const publicFolder = path.join(__dirname, "public");

// Recursive conversion
function convertFolder(folderPath) {
  fs.readdirSync(folderPath).forEach(file => {
    const fullPath = path.join(folderPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      convertFolder(fullPath);
    } else {
      const ext = path.extname(file).toLowerCase();

      if ([".jpg", ".jpeg", ".png"].includes(ext)) {
        const webpPath = fullPath.replace(ext, ".webp");

        // Agar already webp exist karta hai to skip
        if (fs.existsSync(webpPath)) {
          console.log(`Skipped (already exists): ${webpPath}`);
          return;
        }

        sharp(fullPath)
          .webp({ quality: 80 })
          .toFile(webpPath)
          .then(() => console.log(`Converted: ${webpPath}`))
          .catch(err => console.error(`Error: ${file}`, err));
      }
    }
  });
}

// Existing images convert
convertFolder(publicFolder);
console.log("✅ Existing images converted.");

// Watcher (auto future conversion)
const watcher = chokidar.watch(publicFolder, { persistent: true });

watcher.on("add", filePath => {
  const ext = path.extname(filePath).toLowerCase();

  if ([".jpg", ".jpeg", ".png"].includes(ext)) {
    const webpPath = filePath.replace(ext, ".webp");

    if (fs.existsSync(webpPath)) return;

    sharp(filePath)
      .webp({ quality: 80 })
      .toFile(webpPath)
      .then(() => console.log(`Auto Converted: ${webpPath}`))
      .catch(err => console.error(err));
  }
});

console.log("👀 Watching for new images...");
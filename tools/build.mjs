/**
 * بناء مجلد dist الذي يُنشر على GitHub Pages.
 * ينسخ الملفات الثابتة فقط، ثم يبني Tailwind فوقها.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

const INDEX = path.join(root, "index.html");
if (!fs.existsSync(INDEX)) {
  console.error("\n❌  index.html غير موجود في جذر المستودع.\n");
  console.error("    هذا طبيعي في البداية: الموقع لم يُرحَّل من بلوجر بعد.");
  console.error("    شغّل أداة الترحيل أولاً، مثال:\n");
  console.error("      node ../tools/migrate-blogger.mjs \\");
  console.error("           --in blogspot.html --out ./index.html \\");
  console.error("           --whatsapp +218XXXXXXXXX\n");
  process.exit(1);
}

const FILES = ["index.html", "404.html", "robots.txt", "sitemap.xml", "CNAME"];
const DIRS = ["assets"];

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

let copied = 0;
const missing = [];

for (const file of FILES) {
  const from = path.join(root, file);
  if (!fs.existsSync(from)) {
    if (file !== "index.html") missing.push(file);
    continue;
  }
  fs.copyFileSync(from, path.join(dist, file));
  copied += 1;
}

for (const dir of DIRS) {
  const from = path.join(root, dir);
  if (!fs.existsSync(from)) {
    missing.push(dir + "/");
    continue;
  }
  fs.cpSync(from, path.join(dist, dir), { recursive: true });
  copied += 1;
}

// صفحات التحويل للروابط القديمة تُنسخ إلى جذر dist بنفس مساراتها
const redirectsFrom = path.join(root, "redirects");
let redirectCount = 0;
if (fs.existsSync(redirectsFrom)) {
  fs.cpSync(redirectsFrom, dist, { recursive: true });
  const walk = (dir) =>
    fs.readdirSync(dir, { withFileTypes: true }).reduce((n, e) => {
      const full = path.join(dir, e.name);
      return n + (e.isDirectory() ? walk(full) : 1);
    }, 0);
  redirectCount = walk(redirectsFrom);
}

console.log(`✅  dist جاهز — نُسخ ${copied} عنصراً.`);
if (redirectCount) console.log(`↪️   ${redirectCount} صفحة تحويل للروابط القديمة.`);
if (missing.length) {
  console.log(`⚠️   عناصر غير موجودة (تُتجاهل): ${missing.join(", ")}`);
}

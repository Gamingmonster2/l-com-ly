/** ينسخ ملفات البنية التحتية وSEO إلى مجلد الإخراج بعد بناء Vite. */
import { cpSync, existsSync, mkdirSync } from "node:fs"
import { join } from "node:path"

const root = process.cwd()
const dist = join(root, "dist")

if (!existsSync(dist)) {
  throw new Error("dist/ غير موجود؛ شغّل npm run build أولاً.")
}

mkdirSync(dist, { recursive: true })

for (const file of ["CNAME", "404.html", "robots.txt", "sitemap.xml"]) {
  const source = join(root, file)
  if (existsSync(source)) {
    cpSync(source, join(dist, file))
  }
}

const redirects = join(root, "redirects")
if (existsSync(redirects)) {
  cpSync(redirects, join(dist, "redirects"), { recursive: true })
}

console.log("Copied Pages/SEO assets into dist/")

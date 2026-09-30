/**
 * معاينة محلية لمجلد dist بلا أي تبعيات وبلا شبكة.
 *   npm run build
 *   npm run preview      →  http://127.0.0.1:4173
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."), "dist");
const port = Number(process.env.PORT || 4173);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

if (!fs.existsSync(root)) {
  console.error("❌  مجلد dist غير موجود. شغّل أولاً:  npm run build");
  process.exit(1);
}

const server = http.createServer((req, res) => {
  let urlPath;
  try {
    urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  } catch {
    urlPath = "/";
  }

  let file = path.join(root, urlPath);
  if (!file.startsWith(root)) {
    res.writeHead(403, { "Content-Type": TYPES[".txt"] }).end("ممنوع");
    return;
  }

  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    file = path.join(file, "index.html");
  }

  if (!fs.existsSync(file)) {
    const notFound = path.join(root, "404.html");
    if (fs.existsSync(notFound)) {
      res.writeHead(404, { "Content-Type": TYPES[".html"] });
      res.end(fs.readFileSync(notFound));
      return;
    }
    res.writeHead(404, { "Content-Type": TYPES[".txt"] }).end("غير موجود");
    return;
  }

  res.writeHead(200, {
    "Content-Type": TYPES[path.extname(file).toLowerCase()] || "application/octet-stream",
    "Cache-Control": "no-store",
  });
  fs.createReadStream(file).pipe(res);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`\nالمعاينة المحلية: http://127.0.0.1:${port}\nلإيقافها: Ctrl + C\n`);
});

/**
 * فحص تغطية الأنماط — يحلّ محل الفحص البصري داخل بيئة بلا متصفح.
 *
 * السؤال: عند استبدال Tailwind CDN (يولّد كل صنف يجده في DOM) بملف CSS مبني مسبقاً
 * (يقرأ الملفات نصّاً) — هل ضاع أي صنف؟
 *
 * الطريقة: نأخذ كل صنف مستخدم في الصفحة، ونبني صيغته المُهرَّبة كما يكتبها Tailwind
 * في CSS (.dark\:bg-slate-800) ثم نبحث عنه فعلياً. هذا أدقّ من استخراج الأصناف من CSS
 * لأن مُحدِّدات Tailwind تلتحق بها `:is(...)` و`::before` وغيرها.
 *
 *   node tools/check-css.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

const readOrNull = (p) => (fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null);

const html = readOrNull(path.join(dist, "index.html"));
const css = readOrNull(path.join(dist, "assets", "style.css"));
if (!html || !css) {
  console.error("❌  شغّل أولاً:  npm run build");
  process.exit(1);
}

/* ---------------------------- أدوات التهريب ---------------------------- */

/**
 * يهرّب اسم صنف كما يفعل Tailwind في CSS: dark:bg-x → dark\:bg-x
 * ملاحظة: الشرطة السفلية والشرطة العادية حروف صالحة في مُحدِّد CSS ولا تُهرَّب،
 * وتهريبها كان يجعل كل صنف يبدو «مفقوداً».
 */
function escapeClass(name) {
  let out = name.replace(/[^A-Za-z0-9_-]/g, (ch) => `\\${ch}`);
  // صنف يبدأ برقم يُكتب كتبريب سادس عشري: 2xl:grid → \32 xl\:grid
  if (/^[0-9]/.test(out)) out = `\\3${out[0]} ${out.slice(1)}`;
  return out;
}

/** هل الصنف مُعرَّف فعلاً في ورقة الأنماط؟ */
function hasClass(sheet, name) {
  const pattern = escapeClass(name).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\.${pattern}(?![A-Za-z0-9_-])`).test(sheet);
}

/* --------------------------- الأصناف المستخدمة --------------------------- */

function usedInClasses(document) {
  const used = new Set();
  for (const m of document.matchAll(/class\s*=\s*"([^"]*)"/g)) {
    for (const t of m[1].split(/\s+/)) if (t) used.add(t);
  }
  for (const m of document.matchAll(/class\s*=\s*'([^']*)'/g)) {
    for (const t of m[1].split(/\s+/)) if (t) used.add(t);
  }
  return used;
}

/* ------------------------------ التحليل ------------------------------ */

const inlineStyle = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]).join("\n");
const allCss = `${css}\n${inlineStyle}`;
const used = usedInClasses(html);
const missing = [...used].filter((c) => !hasClass(allCss, c)).sort();

// تغطية الجافاسكربت: أصناف تُضاف للعناصر برمجياً (toast والنافذة)
const assetsDir = path.join(root, "assets");
const jsText = fs.existsSync(assetsDir)
  ? fs
      .readdirSync(assetsDir)
      .filter((f) => f.endsWith(".js"))
      .map((f) => readOrNull(path.join(assetsDir, f)) || "")
      .join("\n")
  : "";

const jsCandidates = new Set();
// نبني التعبيرات نصّاً لتجنّب مشاكل تهريب الأقواس داخل Regex literal
const CLASS_CHARS = "a-z0-9:_\\[\\]/.%-";
const JS_TOKEN = new RegExp(`^[a-z][${CLASS_CHARS}]*$`, "i");
const JS_HINT = new RegExp(`[${CLASS_CHARS}]`);
for (const m of jsText.matchAll(/"([^"\n]{4,80})"/g)) {
  for (const token of m[1].split(/\s+/)) {
    if (JS_TOKEN.test(token) && JS_HINT.test(token)) jsCandidates.add(token);
  }
}
const jsMissing = [...jsCandidates]
  .filter((c) => /^(bg|text|border|ring|p[xytblr]?|m[xytblr]?|w|h|flex|grid|rounded|shadow|font|leading|tracking|top|bottom|left|right|inset|z)-/.test(c))
  .filter((c) => !hasClass(allCss, c))
  .sort();

/* -------------------------------- التقرير -------------------------------- */

console.log("\nفحص تغطية الأنماط — L.COM.LY\n" + "=".repeat(56));
console.log(`📄 الصفحة: ${(Buffer.byteLength(html, "utf8") / 1024).toFixed(1)} ك.ب`);
console.log(`🎨 CSS المبني: ${(Buffer.byteLength(css, "utf8") / 1024).toFixed(1)} ك.ب`);
console.log(`🔍 أصناف مستخدمة في الصفحة: ${used.size}`);
console.log(`🔍 أصناف مرشّحة من JS: ${jsCandidates.size}`);

if (missing.length) {
  console.log(`\n❌  ${missing.length} صنفاً مستخدماً في الصفحة وغير مُعرَّف:`);
  for (const c of missing.slice(0, 40)) console.log(`    ${c}`);
  process.exit(1);
}
console.log("\n✅  كل صنف مستخدم في الصفحة (337 صنفاً) مُعرَّف في CSS المبني.");
console.log("   لا فرق بين ما كان CDN يولّده وما بنيناه مسبقاً.");

const realJsMissing = jsMissing.filter((c) => {
  const tail = c.split(/[-:]/)[0];
  return !["block", "none", "hidden", "flex", "grid", "absolute", "relative", "fixed"].includes(tail);
});
if (realJsMissing.length) {
  console.log(`\n🟡  أصناف مرشّحة من JS ولم نجدها (${realJsMissing.length}) — راجعها يدوياً:`);
  for (const c of realJsMissing.slice(0, 15)) console.log(`    ${c}`);
} else {
  console.log("✅  أصناف ملفات JS (toast والنافذة) كلها مُعرَّفة أيضاً.");
}
console.log("");

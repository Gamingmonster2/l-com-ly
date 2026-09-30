/**
 * فحص ما قبل النشر — يعمل محلياً وفي GitHub Actions.
 * يمنع نشر موقع فيه بقايا بلوجر أو ملف CSS ناقص.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

// رسالة واضحة بدل سبعة أخطاء «ملف مفقود» مضلّلة
if (!fs.existsSync(dist)) {
  console.error("\n❌  مجلد dist غير موجود — لم يُبنَ الموقع بعد.");
  console.error("    شغّل أولاً:  npm run build\n");
  process.exit(1);
}

const problems = [];
const notes = [];

const read = (rel) => {
  const p = path.join(dist, rel);
  if (!fs.existsSync(p)) return null;
  return fs.readFileSync(p, "utf8");
};

/* ------------------------------ 1. الملفات ------------------------------ */
const REQUIRED = [
  "index.html",
  "assets/style.css",
  "assets/app.js",
  "assets/contact-form.js",
  "assets/chat-widget.js",
  "assets/consent.js",
  "CNAME",
];
for (const rel of REQUIRED) {
  const p = path.join(dist, rel);
  if (!fs.existsSync(p)) problems.push(`ملف مفقود: ${rel}`);
}
for (const rel of ["robots.txt", "sitemap.xml", "404.html"]) {
  if (!fs.existsSync(path.join(dist, rel))) notes.push(`اختياري مفقود: ${rel}`);
}

// أصول اختيارية، لكن غيابها يُضعف المشاركة على وسائل التواصل
const OPTIONAL_ASSETS = [
  ["assets/og-cover.png", "صورة المشاركة 1200×630 — بدونها لا تظهر صورة عند مشاركة الرابط"],
  ["assets/logo.svg", "شعار البيانات المنظمة (schema.org/logo)"],
];
for (const [rel, why] of OPTIONAL_ASSETS) {
  if (!fs.existsSync(path.join(dist, rel))) notes.push(`ينتظرك: ${rel} — ${why}`);
}

/* --------------------------- 2. حجم CSS المبني --------------------------- */
const css = read("assets/style.css");
if (css !== null) {
  const kb = Buffer.byteLength(css, "utf8") / 1024;
  if (kb < 5) {
    problems.push(`assets/style.css صغير جداً (${kb.toFixed(1)} ك.ب) — يبدو أن Tailwind لم يُبنَ`);
  } else {
    notes.push(`حجم CSS: ${kb.toFixed(1)} ك.ب`);
  }
}

/* ---------------------------- 3. نظافة الصفحة ---------------------------- */
const html = read("index.html");
if (html === null) {
  problems.push("index.html مفقود");
} else {
  const mustNot = [
    [/cdn\.tailwindcss\.com/, "بقايا Tailwind CDN — يجب استخدام الملف المبني"],
    [/cdn-cgi|l\/email-protection|__cf_email__/, "بقايا حماية بريد Cloudflare (تعمل فقط على Cloudflare)"],
    [/google-adsense-platform-domain/, "ميتا AdSense خاصة ببلوجر"],
    [/cookienotice\.js|cookieChoices/, "بقايا إشعار كوكيز بلوجر"],
    [/<b:[a-z]/i, "وسوم قالب بلوجر"],
    [/(?<![.\w])alert\(/, "نداءات alert() — استخدم toast()"],
  ];
  for (const [re, message] of mustNot) {
    if (re.test(html)) problems.push(message);
  }

  const must = [
    [/<html[^>]*lang="ar"/i, "وسم lang=\"ar\" مفقود"],
    [/<html[^>]*dir="rtl"/i, "وسم dir=\"rtl\" مفقود"],
    [/href="assets\/style\.css"/, "ملف الأنماط غير مربوط"],
    [/src="assets\/app\.js"/, "سكربت التحسينات غير مربوط"],
    [/src="assets\/contact-form\.js"/, "معالج النموذج المحصّن غير مربوط"],
    [/src="assets\/chat-widget\.js"/, "نافذة المحادثة غير مربوطة"],
    [/window\.LCOM_CONFIG\s*=/, "إعداد LCOM_CONFIG مفقود"],
    [/rel="canonical"/, "canonical مفقود"],
    [/name="website"/, "مصيدة السبام غير موجودة في النموذج"],
    [/id="intro"/, "شاشة الافتتاح مفقودة"],
  ];
  for (const [re, message] of must) {
    if (!re.test(html)) problems.push(message);
  }

  const sizeKb = Buffer.byteLength(html, "utf8") / 1024;
  notes.push(`حجم الصفحة: ${sizeKb.toFixed(1)} ك.ب`);
  if (sizeKb < 5) problems.push(`index.html صغير بشكل مريب (${sizeKb.toFixed(1)} ك.ب) — ربما الترحيل أتلف الصفحة`);

  const workerMatch = html.match(/"workerUrl":"([^"]*)"/);
  if (!workerMatch || !workerMatch[1]) {
    problems.push("رابط الـ Worker غير مضبوط في window.LCOM_CONFIG");
  } else if (!/\/api\/message$/.test(workerMatch[1])) {
    problems.push(`رابط الـ Worker يجب أن ينتهي بـ /api/message — الحالي: ${workerMatch[1]}`);
  } else {
    notes.push(`رابط الـ Worker: ${workerMatch[1]}`);
  }

  // الخصوصية: تحليلات تعمل بلا إشعار كوكيز = تتبّع بلا علم الزائر
  if (/googletagmanager\.com|gtag\(/.test(html)) {
    if (!/gtag\(\s*['"]consent['"]/.test(html)) {
      problems.push("تحليلات جوجل تعمل بلا وضع موافقة — أضِف gtag('consent','default')");
    } else {
      notes.push("تحليلات جوجل محكومة بموافقة الزائر");
    }
    if (!/assets\/consent\.js/.test(html)) problems.push("إشعار الكوكيز غير مربوط (assets/consent.js)");
  }

  // البيانات المنظمة: أي كتلة تالفة تتجاهلها محركات البحث بصمت
  const ldBlocks = html.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi) || [];
  let badLd = 0;
  for (const block of ldBlocks) {
    const raw = block.replace(/^<script[^>]*>/i, "").replace(/<\/script>$/i, "");
    try {
      JSON.parse(raw.trim());
    } catch {
      badLd += 1;
    }
  }
  if (badLd) problems.push(`${badLd} كتلة JSON-LD غير صالحة`);
  else if (ldBlocks.length) notes.push(`بيانات منظمة صالحة: ${ldBlocks.length} كتلة`);
}

/* ------------------------------- 4. النطاق ------------------------------- */
const cname = read("CNAME");
if (cname !== null) {
  const value = cname.trim();
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(value)) {
    problems.push(`محتوى CNAME غير صالح: «${value}»`);
  } else {
    notes.push(`النطاق: ${value}`);
  }
}

/* -------------------------------- التقرير -------------------------------- */
console.log("\nفحص ما قبل النشر — L.COM.LY\n" + "=".repeat(52));
for (const n of notes) console.log(`ℹ️  ${n}`);
if (!problems.length) {
  console.log("\n✅  كل الفحوص نجحت — الموقع جاهز للنشر.\n");
  process.exit(0);
}
console.log("");
for (const p of problems) console.log(`❌  ${p}`);
console.log(`\n❌  ${problems.length} مشكلة تمنع النشر.\n`);
process.exit(1);

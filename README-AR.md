# L.COM.LY — مستودع الموقع (GitHub Pages)

هذا هو مجلد المستودع الذي سيُرفع إلى GitHub ويُنشر على `https://www.l.com.ly`.

> **الحالة:** البنية كاملة وجاهزة. الملف الوحيد الناقص هو `index.html` — يصل من أداة الترحيل
> بعد أن ترسل كود موقعك الحالي.

---

## 1. كيف يعمل البناء

```
index.html (مصدر)  ──►  tools/build.mjs  ──►  dist/        ──►  GitHub Pages
404.html                    (نسخ)              index.html
assets/app.js                                 404.html
src/input.css ──► Tailwind (بناء CSS) ──►      assets/style.css
```

- **لا يوجد Tailwind CDN.** الملف `assets/style.css` يُبنى مسبقاً (‎~11 ك.ب) بدل تحميل محرّك
  كامل داخل متصفح الزائر — هذا أكبر مكسب في سرعة الموقع.
- البناء يفشل **قبل** النشر إذا وجد بقايا بلوجر أو ملفاً ناقصاً (`tools/check-site.mjs`).

## 2. تشغيله محلياً

```powershell
cd ..
npm run doctor     # يفحص الجاهزية ويقول لك الخطوة التالية بالحرف
cd site
npm install
npm run build      # يبني dist
npm run check      # يفحص قبل النشر
npm run preview    # معاينة على http://127.0.0.1:4173
```

## 3. وضع ملف الموقع الحقيقي

لم تعد تحتاج نسخ أي كود — الموقع منشور، فنجلبه:

```powershell
cd ..
npm run fetch -- --posts     # يجلب موقعك + robots + sitemap + كل مقال
npm run redirects            # صفحات تحويل للروابط القديمة (لا 404)
node tools/migrate-blogger.mjs --in source/live-index.html --out ./site/index.html --whatsapp +218XXXXXXXXX
```

أو بأمر واحد مع التقرير:

```powershell
node tools/migrate-blogger.mjs `
     --in source/live-index.html `
     --out ./site/index.html `
     --whatsapp +218XXXXXXXXX `
     --report source/تقرير-الترحيل.md
```

ثم:

```powershell
cd site
npm run build
npm run check
npm run preview
```

> **مهم:** إذا حدّثت موقعك على بلوجر لاحقاً، أعِد `npm run fetch` ثم خط الترحيل — النتيجة
> متطابقة دائماً ولا تعتمد على نسخ يدوي.

## 3.1 صفحات التحويل للروابط القديمة

الروابط القديمة (مثل `/2025/12/blog-post.html`) تُولَّد في `site/redirects/`
وتُنسخ تلقائياً عند البناء إلى نفس المسارات — فلا يرى محرك البحث 404 ولا يفقد أي رابط خارجي.

## 4. النشر

**الطريقة الموصى بها — GitHub Desktop:**

1. أنشئ مستودعاً عاماً باسم `l-com-ly` على GitHub.
2. في GitHub Desktop: `File → Add Local Repository` واختر **هذا المجلد**.
3. اضغط **Push origin**. وإن لم تكن مسجّلاً الدخول فسيسألك أولاً.
4. `Settings → Pages → Source: GitHub Actions` (إلزامي).
5. تابع تبويب **Actions**: بناء ← فحص ← نشر.

**إن ظهرت رسالة «Newer commits on remote»** — معناها أنك أنشأت المستودع مع ملف
(README مثلاً)، فأصبح للفرعين تاريخان مستقلان. الحل:

```
انقر مرتين على reconcile-remote.cmd
```

يجلب التزامات GitHub ويدمجها مع مشروعك تلقائياً (يفضّل ملفات مشروعك عند أي تعارض)، ثم
تعود إلى GitHub Desktop وتضغط **Push origin**. لن يُفقد أي ملف من مشروعك.

> ملاحظة تقنية: الملف مكتوب بنهايات **CRLF** — لأن `cmd.exe` لا يقرأ ملفات batch
> بنهايات LF (تلتحم الأسطر وتُنفَّذ كأوامر غريبة). و`npm run check:batch` يمنع عودة هذا الخطأ.

## 5. ربط النطاق www.l.com.ly

> ⚠️ **لا تنفّذ هذه الخطوة قبل أن يعمل الرابط المؤقت `gamingmonster2.github.io/l-com-ly/`.**

في `Cloudflare → النطاق l.com.ly → DNS`:

| النوع | الاسم | القيمة | البروكسي |
|---|---|---|---|
| A | `@` | `185.199.108.153` | **DNS only** |
| A | `@` | `185.199.109.153` | **DNS only** |
| A | `@` | `185.199.110.153` | **DNS only** |
| A | `@` | `185.199.111.153` | **DNS only** |
| CNAME | `www` | `gamingmonster2.github.io` | **DNS only** |

**احذف** أولاً أي سجل قديم يشير إلى بلوجر (عناوين Google أو `ghs.google.com`).

- السحابة يجب أن تكون **رمادية** (DNS only) وإلا لن يصدر GitHub شهادة HTTPS.
- ثم: `Settings → Pages → Custom domain` → اكتب `www.l.com.ly` → **Save**.
- بعد ظهور `DNS check successful`: فعّل **Enforce HTTPS**.
- من إعدادات بلوجر: أعد المدونة إلى `*.blogspot.com` حتى لا تتشبث بالنطاق.

## 6. ربط النموذج بالوكيل الذكي

في `index.html`، سطر واحد فقط:

```js
const WORKER_URL = "https://lcomly-agent.<حسابك>.workers.dev/api/message";
```

تفاصيل الوكيل في [`../worker/README-AR.md`](../worker/README-AR.md).

## 7. بنية الملفات

| المسار | الوظيفة |
|---|---|
| `index.html` | الصفحة الوحيدة (تُنتَج بأداة الترحيل) |
| `404.html` | صفحة الخطأ |
| `src/input.css` | مدخل Tailwind + أنماط إشعارات toast |
| `assets/app.js` | `toast()` بديل `alert()` + تحسينات صغيرة |
| `assets/contact-form.js` | **معالج النموذج المحصّن**: تحقق، مهلة، منع إرسال مزدوج، بديل واتساب |
| `assets/chat-widget.js` | **نافذة محادثة الوكيل**: الزائر يسأل ويستلم الرد في المتصفح، وواتساب مدمج كزر عائم |
| `assets/consent.js` | **إشعار الكوكيز + موافقة تحليلات جوجل** (Consent Mode v2) — لا كوكيز قبل الموافقة |
| `assets/logo.svg` | شعار البيانات المنظمة (schema.org/logo) |
| `assets/og-cover.png` | صورة المشاركة 1200×630 — تُولَّد بـ `npm run og` بلا مكتبات |
| `tailwind.config.cjs` | إعداد Tailwind ونطاق الألوان والخطوط |
| `tools/build.mjs` | يبني `dist/` وينسخ صفحات التحويل |
| `tools/check-site.mjs` | فحص ما قبل النشر (يعمل في CI) |
| `tools/check-css.mjs` | يتأكد أن كل صنف مستخدم في الصفحة مُعرَّف في CSS المبني |
| `tools/serve.mjs` | معاينة محلية بلا تبعيات |
| `redirects/` | صفحات تحويل للروابط القديمة تُنسخ بنفس مساراتها |
| `.github/workflows/deploy.yml` | البناء والفحص والنشر تلقائياً |
| `CNAME` | النطاق المخصص |
| `robots.txt` / `sitemap.xml` | الفهرسة في محركات البحث |

## 8. أخطاء شائعة

| الرسالة | السبب والحل |
|---|---|
| `index.html غير موجود` | لم يُشغَّل الترحيل بعد — راجع القسم 3 |
| `بقايا Tailwind CDN` | الملف لم يُرحَّل من بلوجر |
| `assets/style.css صغير جداً` | فشل بناء Tailwind — شغّل `npm run build:css` |
| فشل `npm install` | استخدم كاشاً محلياً: `npm install --cache ./.npm-cache` |

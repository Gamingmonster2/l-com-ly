# L.COM.LY — الموقع الرسمي

بوابتك الرقمية للعالمية. موقع ثابت نظيف، منقول من بلوجر، ويُنشر تلقائياً على GitHub Pages.

**الرابط:** https://gamingmonster2.github.io/l-com-ly/ — (النطاق `www.l.com.ly` يُربط لاحقاً)

---

## ماذا في هذا المستودع

| الملف | الوصف |
|---|---|
| `index.html` | الصفحة الرئيسية بعد الترحيل من بلوجر |
| `assets/style.css` | يُبنى من Tailwind — لا CDN في الإنتاج |
| `assets/chat-widget.js` | نافذة محادثة الوكيل الذكي |
| `assets/contact-form.js` | نموذج تواصل محصّن |
| `assets/consent.js` | إشعار الكوكيز وموافقة تحليلات جوجل |
| `redirects/` | صفحات تحويل للروابط القديمة (لا 404) |
| `404.html` · `robots.txt` · `sitemap.xml` · `CNAME` | ملفات الأساس |
| `tools/` | بناء وفحص ومعاينة محلية |

## التشغيل محلياً

```powershell
npm install --cache ./.npm-cache
npm run build      # يبني مجلد dist
npm run check      # فحص ما قبل النشر
npm run preview    # معاينة على http://127.0.0.1:4173
```

## النشر

تلقائي عبر **GitHub Actions** عند كل رفع إلى فرع `main`:
بناء ← فحص ← نشر. وإن فشل الفحص، **لا يُنشر الموقع** — فلا يصل زائر إلى نسخة معطوبة.

> يتطلب تفعيل: `Settings → Pages → Source: GitHub Actions`.

## الدليل الكامل

[`README-AR.md`](README-AR.md) — شرح مفصّل للبنية وربط النطاق واستكشاف الأخطاء.

---

© L.COM.LY — جميع الحقوق محفوظة.

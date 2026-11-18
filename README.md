# L.COM.LY — الإصدار v2

الموقع الرسمي، مبني من الصفر على **React 19 + Vite + TypeScript + Tailwind**، بهوية **Magic UI** الرسمية أحادية اللون (oklch، خطوط Geist، نصف قطر `0.625rem`).

**الرابط:** https://www.l.com.ly/

## ما الذي تغيّر في v2

- واجهة حديثة بالكامل مع لقطات حقيقية من المواقع الأربعة داخل نوافذ متصفح (Magic UI Safari + MagicCard + BorderBeam + BlurFade + DotPattern + Framer Motion). النقرة تفتح الموقع الأصلي في تبويب جديد.
- نقل مزايا النسخة القديمة:
  - **نافذة محادثة حيّة** مع جلسة محفوظة، استقصاء كل ٣ ثوانٍ، وأسئلة شائعة فورية عبر Worker.
  - **إشعار كوكيز** مع Google Consent Mode v2 — لا تحليلات Google ولا Cloudflare قبل الموافقة.
  - **نماذج تواصل محصّنة**: تحقق، حقل سبام مخفي، مهلة ١٢ ثانية، منع إرسال مزدوج، وبديل واتساب عند الفشل.
  - **SEO**: canonical، Open Graph، Twitter Card، بيانات منظّمة JSON-LD، `sitemap.xml`، `robots.txt`.
- الحفاظ على `CNAME` وصفحات `redirects/` لروابط Blogger القديمة.

## التشغيل محلياً

```powershell
npm ci
npm run dev       # http://localhost:5173
npm run build     # ينتج dist/
npm run preview
```

## النشر

GitHub Actions ينشر تلقائياً عند الدفع إلى `v2` فقط:

1. `npm ci` ثم `npm run build`
2. نسخ `CNAME` و`404.html` و`robots.txt` و`sitemap.xml` و`redirects/` إلى `dist/`
3. رفع `dist/` إلى GitHub Pages

> يتطلب تفعيلاًonce: `Settings → Pages → Build and deployment → Source: GitHub Actions`.

## بنية المشروع

| المسار | الوصف |
|---|---|
| `src/components/` | الأقسام + مكوّنات المحادثة والموافقة |
| `src/components/magicui/` | مكوّنات Magic UI المستخدمة |
| `src/data/translations.ts` | المحتوى العربي والإنجليزي |
| `src/data/widget-copy.ts` | نصوص النوافذ والنماذج |
| `src/lib/` | إعدادات الموقع، الموافقة، المحادثة، التحقق من النماذج |
| `public/` | أصول ثابتة (شعارات وأيقونات ولقطات `screenshots/`) |
| `worker/telegram-gateway/` | Worker مستخرج من عقد النسخة الأصلية (Telegram + KV + webhook) |
| `redirects/` | تحويلات الروابط القديمة |

الإعدادات الحسّاسة لا توجد في الكود؛ تُقرأ من `window.LCOM_CONFIG` في `index.html`. أسرار البوت تُضاف في Cloudflare عبر `wrangler secret put` كما في `worker/telegram-gateway/README.md`.

---

© L.COM.

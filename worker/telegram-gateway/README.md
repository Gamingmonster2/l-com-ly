# L.COM.LY Telegram Gateway

الكود الأصلي للبوت **غير موجود** في ملف HTML الذي أُرسل؛ الموجود فيه فقط رابط الـ Worker وشكل الطلبات. هذا المجلد يعيد بناء الـ Worker من نفس العقد، ويضيف ردود الأسئلة الشائعة وإرسال كل استفسار إلى هاتف صاحب الموقع عبر Telegram.

## العقد المستخرج من الكود الأصلي

| الطريقة | المسار | البيانات | الغرض |
| --- | --- | --- | --- |
| `POST` | `/` | `{ type:"project", name, email, message, package }` | استفسار مشروع جديد |
| `POST` | `/` | `{ type:"feedback", feedback }` | ملاحظة/تقييم |
| `POST` | `/` | `{ type:"project", session, message, package }` | رسالة محادثة الموقع |
| `GET` | `/api/chat?session=...&after=...` | — | سحب ردود البوت/صاحب الموقع |
| `POST` | `/telegram/webhook` | Telegram update | إيصال رد صاحب الموقع إلى المحادثة |

كما يتوافق الـ Worker مع `POST /api/message` للنسخ التي تستخدم هذا المسار.

## النشر

1. أنشئ بوتاً من BotFather واحصل على `TELEGRAM_BOT_TOKEN`، ثم احصل على `TELEGRAM_CHAT_ID` لحسابك أنت.
2. أنشئ KV لتخزين المحادثات:
   ```bash
   npx wrangler kv namespace create CHAT_KV
   ```
   ثم ضع الـ ID في `wrangler.toml` بدل `REPLACE_WITH_KV_NAMESPACE_ID`.
3. أضف الأسرار:
   ```bash
   npx wrangler secret put TELEGRAM_BOT_TOKEN
   npx wrangler secret put TELEGRAM_CHAT_ID
   npx wrangler secret put TELEGRAM_WEBHOOK_SECRET
   ```
4. انشر:
   ```bash
   npm install
   npm run deploy
   ```
5. اربط ويب هوك Telegram (استبدل القيم وترميز الـ secret في URL):
   ```text
   https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook?url=https://lcomly-telegram-gateway.safealigoog.workers.dev/telegram/webhook&secret_token=<TELEGRAM_WEBHOOK_SECRET>
   ```

بعد ذلك: أي رسالة من نموذج التواصل أو المحادثة تصل إلى هاتفك، والرد الفوري يعمل من الأسئلة الشائعة، وإذا أجبتَ على رسالة البوت عبر **Reply** يظهر ردك داخل نافذة محادثة الموقع.

## ملاحظة مهمة
لا يمكن استخراج `TELEGRAM_BOT_TOKEN` أو `TELEGRAM_CHAT_ID` من HTML؛ لا يوجد أي منهما في الكود المُرسل. يجب إدخالهما كأسرار في Cloudflare كما فوق.

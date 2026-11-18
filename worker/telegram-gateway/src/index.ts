/**
 * Cloudflare Worker gateway for L.COM.LY.
 * Extracted contract from the original site:
 *   POST /            { type:"project", name, email, message, package }
 *   POST /            { type:"feedback", feedback }
 * The chat widget also posts { type:"project", session, message, package }.
 */
interface KVStore {
  get(key: string): Promise<string | null>
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>
}

interface Env {
  TELEGRAM_BOT_TOKEN: string
  TELEGRAM_CHAT_ID: string
  TELEGRAM_WEBHOOK_SECRET?: string
  CHAT_MODE?: "faq" | "shadow" | "live"
  CHAT_KV?: KVStore
}

interface ChatMessage {
  id: number
  role: "customer" | "assistant" | "owner"
  content: string
}

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...CORS_HEADERS,
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  })
}

function text(value: unknown, max = 2000): string {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max)
}

function truncate(value: string, max = 3900): string {
  return value.length > max ? `${value.slice(0, max)}…` : value
}

function sanitizeSession(value: unknown): string {
  const session = text(value, 64)
  return /^[A-Za-z0-9_-]{8,64}$/.test(session) ? session : ""
}

async function readBody(request: Request): Promise<Record<string, unknown>> {
  try {
    const data: unknown = await request.json()
    return data && typeof data === "object" ? (data as Record<string, unknown>) : {}
  } catch {
    return {}
  }
}

async function sendTelegram(
  env: Env,
  message: string
): Promise<{ ok: boolean; messageId?: number; error?: string }> {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    return { ok: false, error: "missing_telegram_config" }
  }

  const res = await fetch(
    `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID,
        text: truncate(message),
        disable_web_page_preview: true,
      }),
    }
  )

  const data = (await res.json().catch(() => null)) as
    | { ok?: boolean; result?: { message_id?: number }; description?: string }
    | null

  if (!res.ok || !data?.ok) {
    return { ok: false, error: data?.description || `telegram_${res.status}` }
  }
  return { ok: true, messageId: data.result?.message_id }
}

function formatProject(payload: Record<string, unknown>): string {
  return [
    "🚨 استفسار مشروع جديد — L.COM.LY",
    "",
    `الاسم: ${text(payload.name, 120) || "-"}`,
    `البريد: ${text(payload.email, 160) || "-"}`,
    `الخدمة: ${text(payload.package, 120) || "غير محددة"}`,
    "",
    text(payload.message, 3000) || "-",
  ].join("\n")
}

function formatFeedback(payload: Record<string, unknown>): string {
  return ["📝 ملاحظة جديدة — L.COM.LY", "", text(payload.feedback, 3000) || "-"].join("\n")
}

function quickReply(message: string): string | null {
  const q = message.toLowerCase()

  if (/سعر|السعر|تكلفة|كم|price|cost|100|600/.test(q)) {
    return "تصميم المواقع يبدأ من 100 إلى 600 دولار حسب حجم العمل. الاستشارات والمواقع الدينية مجانية، والمشاريع الكبيرة حسب الاتفاق. عملاء ليبيا يمكنهم الدفع بالدينار الليبي مع تخفيض."
  }
  if (/نطاق|دومين|domain/.test(q)) {
    return "أسعار النطاقات غير مشمولة في الخدمة؛ السعر يعتمد على مزوّد النطاق الذي تختاره. يمكننا توجيه العمل إلى Cloudflare أو حسابك الخاص."
  }
  if (/استضاف|نشر|github|cloudflare|pages|host/.test(q)) {
    return "نسلّم المشروع في مستودع GitHub عام قابل للاستخدام والـ fork، وننشر عبر GitHub Pages و/أو Cloudflare Edge. يمكننا الاستضافة في حسابنا أو تسليم المشروع إلى حسابك."
  }
  if (/اندرويد|تطبيق|ويب|app|web/.test(q)) {
    return "نطوّر تطبيقات ويب وأندرويد بمساعدة الذكاء الاصطناعي والوكلاء البرمجيين. السعر يُحدد بعد استشارة مجانية حسب النطاق والمزايا."
  }
  if (/تواصل|بريد|ايميل|واتس|جوال|هاتف|contact|email/.test(q)) {
    return "يمكنك ترك تفاصيلك هنا أو عبر نموذج التواصل، وسنرد عليك في أقرب وقت. البريد المعتمد: info@l.com.ly"
  }
  if (/مجاني|خيري|مسجد|قرآن|ديني|free|noor|نور/.test(q)) {
    return "الاستشارات التقنية والمواقع الدينية ضمن مبادرة نور مجانية بالكامل. أرسل تفاصيل الجهة أو المشروع وسنراجع الطلب."
  }
  return null
}

async function readLog(env: Env, session: string): Promise<ChatMessage[]> {
  if (!env.CHAT_KV) return []
  try {
    const raw = await env.CHAT_KV.get(`chat:${session}`)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed)
      ? (parsed.filter(
          (m): m is ChatMessage =>
            !!m &&
            typeof m === "object" &&
            typeof (m as ChatMessage).id === "number" &&
            typeof (m as ChatMessage).role === "string" &&
            typeof (m as ChatMessage).content === "string"
        ) as ChatMessage[])
      : []
  } catch {
    return []
  }
}

async function writeLog(env: Env, session: string, messages: ChatMessage[]): Promise<void> {
  if (!env.CHAT_KV) return
  await env.CHAT_KV.put(`chat:${session}`, JSON.stringify(messages.slice(-80)), {
    expirationTtl: 60 * 60 * 24 * 30,
  })
}

function nextId(messages: ChatMessage[]): number {
  return messages.reduce((max, m) => (m.id > max ? m.id : max), 0) + 1
}

async function handleChatPost(env: Env, payload: Record<string, unknown>): Promise<Response> {
  const session = sanitizeSession(payload.session)
  const message = text(payload.message, 1200)
  if (!session || message.length < 2) {
    return json({ success: false, error: "invalid_message" }, 400)
  }

  const log = await readLog(env, session)
  const messageId = nextId(log)
  const updated: ChatMessage[] = [
    ...log,
    { id: messageId, role: "customer", content: message },
  ]

  const delivered = await sendTelegram(
    env,
    [
      "💬 رسالة من محادثة الموقع",
      `الجلسة: ${session}`,
      `الخدمة: ${text(payload.package, 120) || "غير محددة"}`,
      "",
      message,
      "",
      "للرد: استخدم Reply على هذه الرسالة من البوت.",
    ].join("\n")
  )

  if (!delivered.ok) {
    return json({ success: false, error: delivered.error || "telegram_failed" }, 502)
  }

  if (delivered.messageId && env.CHAT_KV) {
    await env.CHAT_KV.put(`tg:${delivered.messageId}`, session, {
      expirationTtl: 60 * 60 * 24 * 30,
    })
  }

  const mode = env.CHAT_MODE === "faq" || env.CHAT_MODE === "shadow" ? env.CHAT_MODE : "faq"
  let reply: string | null = null

  if (mode === "faq") {
    reply = quickReply(message)
    if (reply) {
      updated.push({ id: messageId + 1, role: "assistant", content: reply })
    }
  }

  await writeLog(env, session, updated)

  return json({
    success: true,
    mode: reply ? "faq" : "shadow",
    messageId,
    reply: reply || undefined,
  })
}

async function handleChatGet(url: URL, env: Env): Promise<Response> {
  const session = sanitizeSession(url.searchParams.get("session"))
  const after = Number(url.searchParams.get("after") || 0)
  if (!session || !Number.isFinite(after)) {
    return json({ messages: [] })
  }
  const messages = (await readLog(env, session)).filter((m) => m.id > after)
  return json({ messages })
}

async function handleTelegramWebhook(request: Request, env: Env): Promise<Response> {
  if (
    env.TELEGRAM_WEBHOOK_SECRET &&
    request.headers.get("x-telegram-bot-api-secret-token") !== env.TELEGRAM_WEBHOOK_SECRET
  ) {
    return json({ ok: false, error: "unauthorized" }, 403)
  }

  const update = await readBody(request)
  const incoming = (update.message || update.edited_message || {}) as Record<string, unknown>
  const replyText = text(incoming.text, 1200)
  const replyTo = (incoming.reply_to_message as Record<string, unknown> | undefined)?.message_id
  if (!replyText || !replyTo || !env.CHAT_KV) return json({ ok: true })

  const session = sanitizeSession(await env.CHAT_KV.get(`tg:${String(replyTo)}`))
  if (!session) return json({ ok: true })

  const log = await readLog(env, session)
  log.push({ id: nextId(log), role: "owner", content: replyText })
  await writeLog(env, session, log)
  return json({ ok: true })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS })
    }

    const url = new URL(request.url)
    const path = url.pathname.replace(/\/+$/, "") || "/"

    if (request.method === "GET" && path === "/api/chat") {
      return handleChatGet(url, env)
    }

    if (request.method === "POST" && path === "/telegram/webhook") {
      return handleTelegramWebhook(request, env)
    }

    if (request.method === "POST") {
      const payload = await readBody(request)
      const isChat = !!payload.session && !payload.email

      if (path === "/api/chat" || isChat) {
        return handleChatPost(env, payload)
      }

      if (path === "/" || path === "/api/message") {
        const type = text(payload.type, 40)
        const message =
          type === "feedback" ? formatFeedback(payload) : formatProject(payload)
        const delivered = await sendTelegram(env, message)
        return delivered.ok
          ? json({ success: true })
          : json({ success: false, error: delivered.error || "telegram_failed" }, 502)
      }
    }

    return json({ error: "not_found" }, 404)
  },
}

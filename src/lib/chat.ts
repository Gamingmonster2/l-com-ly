/** دوال نافذة المحادثة النقية — منقولة من النسخة السابقة. */

export const SESSION_KEY = "lcom_chat_session"
export const LOG_KEY = "lcom_chat_log"
export const POLL_MS = 3000
export const MAX_MESSAGE = 1200

export interface ChatMessage {
  id: number
  role: string
  content: string
}

export function newSessionId(): string {
  const bytes = new Uint8Array(18)
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(bytes)
  } else {
    for (let i = 0; i < bytes.length; i += 1) {
      bytes[i] = Math.floor(Math.random() * 256)
    }
  }
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("")
}

export function getOrCreateSession(): string {
  let session: string | null = null
  try {
    session = window.localStorage.getItem(SESSION_KEY)
  } catch {
    session = null
  }
  const valid =
    typeof session === "string" &&
    /^[A-Za-z0-9_-]{8,64}$/.test(session)
  if (!valid) {
    const created = newSessionId()
    try {
      window.localStorage.setItem(SESSION_KEY, created)
    } catch {
      /* تجاهل */
    }
    return created
  }
  return session as string
}

export function normalizeMessage(text: string): {
  ok: boolean
  error: string
  text: string
} {
  const value = String(text ?? "").replace(/\s+/g, " ").trim()
  if (!value) return { ok: false, error: "اكتب رسالتك أولاً.", text: "" }
  if (value.length < 2) {
    return { ok: false, error: "الرسالة قصيرة جداً.", text: value }
  }
  if (value.length > MAX_MESSAGE) {
    return {
      ok: false,
      error: "الرسالة طويلة — اختصرها قليلاً.",
      text: value.slice(0, MAX_MESSAGE),
    }
  }
  return { ok: true, error: "", text: value }
}

export function mergeMessages(
  existing: ChatMessage[],
  incoming: ChatMessage[]
): ChatMessage[] {
  const byId = new Map<number, ChatMessage>()
  for (const m of [...(existing || []), ...(incoming || [])]) {
    if (m && typeof m.id === "number") byId.set(m.id, m)
  }
  return [...byId.values()].sort((a, b) => a.id - b.id)
}

export function lastMessageId(messages: ChatMessage[]): number {
  return (messages || []).reduce(
    (max, m) => (m && m.id > max ? m.id : max),
    0
  )
}

export function isAgentMessage(role: string): boolean {
  return role === "assistant" || role === "owner"
}

export function readLog(): ChatMessage[] {
  try {
    const raw = window.localStorage.getItem(LOG_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? (parsed as ChatMessage[]) : []
  } catch {
    return []
  }
}

export function writeLog(messages: ChatMessage[]): void {
  try {
    window.localStorage.setItem(LOG_KEY, JSON.stringify(messages.slice(-60)))
  } catch {
    /* التخزين ممتلئ أو ممنوع */
  }
}

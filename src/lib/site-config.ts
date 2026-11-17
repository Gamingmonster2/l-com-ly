/**
 * إعدادات الموقع المشتركة. القيم الافتراضية من النسخة السابقة، ويمكن تجاوزها
 * عبر window.LCOM_CONFIG كما في النسخة القديمة (بلا مفاتيح داخل الكود).
 */
declare global {
  interface Window {
    LCOM_CONFIG?: { workerUrl?: string; whatsapp?: string }
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export const SITE = {
  url: "https://www.l.com.ly/",
  email: "info@l.com.ly",
  gaMeasurementId: "G-R3ZC7B10TV",
  workerUrl:
    "https://lcomly-telegram-gateway.safealigoog.workers.dev/api/message",
  whatsapp: "",
} as const

export function getWorkerUrl(): string {
  if (typeof window === "undefined") return SITE.workerUrl
  return window.LCOM_CONFIG?.workerUrl || SITE.workerUrl
}

export function getWhatsapp(): string {
  if (typeof window === "undefined") return SITE.whatsapp
  return window.LCOM_CONFIG?.whatsapp || SITE.whatsapp
}

export function getChatPollUrl(session: string, after: number): string {
  const base = getWorkerUrl().replace(/\/api\/message\/?$/, "")
  return `${base}/api/chat?session=${encodeURIComponent(session)}&after=${after}`
}

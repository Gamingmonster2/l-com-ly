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
  cloudflareAnalyticsToken: "34b448a27e2a4082b3b71e3d4cd16d65",
  // نفس رابط Worker المستخدم في النسخة الأصلية (جذر النطاق).
  workerUrl: "https://lcomly-telegram-gateway.safealigoog.workers.dev",
  // رقم الأعمال المعتمد بصيغة دولية (ليبيا +218). الرقم المحلي 0944119965.
  whatsapp: "+218944119965",
} as const

export function getWorkerUrl(): string {
  if (typeof window === "undefined") return SITE.workerUrl
  return window.LCOM_CONFIG?.workerUrl || SITE.workerUrl
}

export function getWorkerBaseUrl(): string {
  return getWorkerUrl().replace(/\/+$/, "").replace(/\/api\/message$/, "")
}

export function getWorkerSubmitUrl(): string {
  return `${getWorkerBaseUrl()}/`
}

export function getWhatsapp(): string {
  if (typeof window === "undefined") return SITE.whatsapp
  return window.LCOM_CONFIG?.whatsapp || SITE.whatsapp
}

export function getChatPollUrl(session: string, after: number): string {
  return `${getWorkerBaseUrl()}/api/chat?session=${encodeURIComponent(session)}&after=${after}`
}

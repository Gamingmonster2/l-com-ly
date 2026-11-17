/** نموذج التواصل المحصّن — دوال نقية منقولة من النسخة السابقة. */

export const LIMITS = { name: 120, email: 160, message: 4000 }
export const DEFAULT_TIMEOUT_MS = 12000

export interface LeadInput {
  name: string
  email: string
  message: string
  package: string
}

export interface ValidationResult {
  ok: boolean
  errors: Record<string, string>
  value: LeadInput
}

export function validateLead(input: Partial<LeadInput> = {}): ValidationResult {
  const errors: Record<string, string> = {}
  const value: LeadInput = {
    name: String(input.name ?? "").trim().slice(0, LIMITS.name),
    email: String(input.email ?? "").trim().slice(0, LIMITS.email),
    message: String(input.message ?? "").trim().slice(0, LIMITS.message),
    package: String(input.package ?? "").trim().slice(0, 80),
  }

  if (value.name.length < 2) errors.name = "يرجى كتابة الاسم (حرفان على الأقل)."
  if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(value.email)) {
    errors.email = "صيغة البريد الإلكتروني غير صحيحة."
  }
  if (value.message.length < 10) {
    errors.message = "يرجى كتابة تفاصيل أوضح (10 أحرف على الأقل)."
  }
  if ((value.message.match(/https?:\/\//gi) || []).length > 3) {
    errors.message = "يبدو أن الرسالة تحتوي روابط كثيرة — اختصرها."
  }

  return { ok: Object.keys(errors).length === 0, errors, value }
}

export function buildWhatsAppFallback(
  phone: string,
  lead: Partial<LeadInput> = {}
): string {
  const digits = String(phone ?? "").replace(/\D/g, "")
  if (!digits) return ""
  const lines = [
    "مرحباً، أريد الاستفسار عن خدمات L.COM.LY",
    "",
    `الاسم: ${lead.name || "-"}`,
    `البريد: ${lead.email || "-"}`,
    `الباقة: ${lead.package || "غير محددة"}`,
    "",
    lead.message || "",
  ]
  return `https://wa.me/${digits}?text=${encodeURIComponent(lines.join("\n"))}`
}

export interface SubmitResult {
  ok: boolean
  status?: number
  data?: { success?: boolean; message?: string; error?: string } | null
  error?: string
  detail?: string
}

export async function submitLead({
  workerUrl,
  payload,
  timeoutMs = DEFAULT_TIMEOUT_MS,
}: {
  workerUrl: string
  payload: LeadInput
  timeoutMs?: number
}): Promise<SubmitResult> {
  if (!workerUrl) return { ok: false, error: "no_worker_url" }
  if (typeof fetch !== "function") return { ok: false, error: "no_fetch" }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const res = await fetch(workerUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    let data: SubmitResult["data"] = null
    try {
      data = await res.json()
    } catch {
      data = null
    }

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        data,
        error: data?.error || `http_${res.status}`,
      }
    }
    if (data && data.success === false) {
      return {
        ok: false,
        status: res.status,
        data,
        error: data.error || "server_rejected",
      }
    }
    return { ok: true, status: res.status, data }
  } catch (err) {
    const aborted = (err as Error)?.name === "AbortError"
    return {
      ok: false,
      error: aborted ? "timeout" : "network",
      detail: String((err as Error)?.message || err).slice(0, 200),
    }
  } finally {
    clearTimeout(timer)
  }
}

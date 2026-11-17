/** إشعار الكوكيز + Google Consent Mode v2 — منقول من النسخة السابقة. */

export const CONSENT_KEY = "lcom_consent"

export const CONSENT_GRANTED = {
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  analytics_storage: "granted",
} as const

export const CONSENT_DENIED = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
} as const

export type ConsentDecision = "granted" | "denied"
export type ConsentState = typeof CONSENT_GRANTED | typeof CONSENT_DENIED

export function isDecided(stored: string | null): stored is ConsentDecision {
  return stored === "granted" || stored === "denied"
}

export function consentStateFor(decision: ConsentDecision): ConsentState {
  return decision === "granted" ? CONSENT_GRANTED : CONSENT_DENIED
}

export function readConsent(): string | null {
  try {
    return window.localStorage.getItem(CONSENT_KEY)
  } catch {
    return null
  }
}

export function writeConsent(decision: ConsentDecision): void {
  try {
    window.localStorage.setItem(CONSENT_KEY, decision)
  } catch {
    /* التخزين ممنوع — يُطبَّق القرار لهذه الجلسة فقط */
  }
}

export function applyConsent(decision: ConsentDecision): ConsentState {
  const state = consentStateFor(decision)
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("consent", "update", state)
  }
  return state
}

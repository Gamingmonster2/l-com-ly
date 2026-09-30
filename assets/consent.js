/**
 * إشعار الكوكيز + وضع الموافقة لتحليلات جوجل (Consent Mode v2).
 *
 * لماذا: موقعك الأصلي كان يعرض إشعار كوكيز من بلوجر، والترحيل أزاله بينما تحليلات
 * جوجل (gtag) ما زالت تعمل — أي تتبّع بلا إشعار. هذا يعيد الإشعار ويزيد عليه:
 * لا تُخزَّن أي كوكيز تحليلية قبل موافقة الزائر.
 *
 * الدوال النقية مُصدَّرة للاختبار؛ كود الواجهة محميّ بفحص وجود document.
 */

export const CONSENT_KEY = "lcom_consent";

/** حالات الموافقة كما يعرّفها Google Consent Mode v2. */
export const CONSENT_GRANTED = {
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  analytics_storage: "granted",
};

export const CONSENT_DENIED = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
};

/** هل اختار الزائر مسبقاً؟ */
export function isDecided(stored) {
  return stored === "granted" || stored === "denied";
}

/** حالة الموافقة التي تُرسل إلى gtag. */
export function consentStateFor(decision) {
  return decision === "granted" ? CONSENT_GRANTED : CONSENT_DENIED;
}

/* --------------------------------- واجهة --------------------------------- */

const BAR_ID = "lcom-consent";
const Z = "z-[9999]";

function el(tag, className, attrs) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  for (const [k, v] of Object.entries(attrs || {})) {
    if (k === "text") node.textContent = v;
    else node.setAttribute(k, v);
  }
  return node;
}

function applyConsent(decision) {
  const state = consentStateFor(decision);
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("consent", "update", state);
  }
  return state;
}

function start() {
  const storage = window.localStorage;
  let stored = null;
  try {
    stored = storage.getItem(CONSENT_KEY);
  } catch {
    stored = null;
  }

  // زائر قرّر مسبقاً: نُحدّث الموافقة فوراً بلا إزعاج
  if (isDecided(stored)) {
    applyConsent(stored);
    return;
  }

  const bar = el(
    "div",
    `fixed bottom-0 inset-x-0 ${Z} bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 shadow-2xl p-4`,
    { id: BAR_ID, role: "dialog", "aria-label": "إشعار ملفات تعريف الارتباط", dir: "rtl" },
  );

  const wrap = el("div", "max-w-screen-lg mx-auto flex flex-col md:flex-row md:items-center gap-3");
  const text = el("p", "text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-1", {
    text:
      "نستخدم ملفات تعريف الارتباط من Google لتحليل الزيارات وتحسين الخدمة. لا نبيع بياناتك ولا نشاركها مع أي طرف آخر. رفضك لا يمنعك من استخدام الموقع.",
  });

  const more = el("a", "text-xs font-bold text-blue-600 dark:text-blue-400 underline", {
    href: "https://policies.google.com/technologies/cookies",
    target: "_blank",
    rel: "noopener",
    text: "معرفة المزيد",
  });

  const actions = el("div", "flex items-center gap-2 shrink-0");
  const accept = el(
    "button",
    "px-5 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-500 transition",
    { id: "lcom-consent-accept", type: "button", text: "أوافق" },
  );
  const deny = el(
    "button",
    "px-5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition",
    { id: "lcom-consent-deny", type: "button", text: "رفض التحليلات" },
  );
  actions.appendChild(accept);
  actions.appendChild(deny);

  wrap.appendChild(text);
  wrap.appendChild(more);
  wrap.appendChild(actions);
  bar.appendChild(wrap);

  const decide = (choice) => {
    try {
      storage.setItem(CONSENT_KEY, choice);
    } catch {
      /* التخزين ممنوع — نطبّق القرار لهذه الجلسة فقط */
    }
    applyConsent(choice);
    bar.remove();
    if (choice === "denied" && typeof window.toast === "function") {
      window.toast("احترمنا اختيارك — لن نخزّن كوكيز تحليلية.", "info");
    }
  };

  accept.addEventListener("click", () => decide("granted"));
  deny.addEventListener("click", () => decide("denied"));

  document.body.appendChild(bar);
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
}

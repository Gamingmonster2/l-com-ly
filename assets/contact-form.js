/**
 * معالج نموذج التواصل — النسخة المحصّنة لموقع L.COM.LY.
 *
 * يُحمَّل كوحدة (type="module") في المتصفح، ويُستورَد في Node للاختبار
 * (الدوال النقية مُصدَّرة، وكود DOM محميّ بفحص وجود document).
 *
 * المزايا فوق النسخة القديمة:
 *   • تحقق من المدخلات قبل الإرسال برسائل عربية واضحة
 *   • مصيدة سبام (حقل مخفي)
 *   • مهلة زمنية (لا يتجمّد النموذج أبداً)
 *   • منع الإرسال المزدوج
 *   • بديل واتساب يعمل بضغطة عند فشل الشبكة
 *   • نزع أي معالج قديم بالاستنساخ (تفادي إرسالين لنفس الطلب)
 *
 * لا تحتوي على أي مفتاح. الرابط يأتي من window.LCOM_CONFIG.
 */

export const LIMITS = { name: 120, email: 160, message: 4000 };
export const DEFAULT_TIMEOUT_MS = 12000;

/* ---------------------------------- نقي ---------------------------------- */

/** يتحقق من مدخلات النموذج ويعيد رسائل عربية واضحة. */
export function validateLead(input = {}) {
  const errors = {};
  const value = {
    name: String(input.name ?? "").trim().slice(0, LIMITS.name),
    email: String(input.email ?? "").trim().slice(0, LIMITS.email),
    message: String(input.message ?? "").trim().slice(0, LIMITS.message),
    package: String(input.package ?? "").trim().slice(0, 80),
  };

  if (value.name.length < 2) errors.name = "يرجى كتابة الاسم (حرفان على الأقل).";
  if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(value.email)) {
    errors.email = "صيغة البريد الإلكتروني غير صحيحة.";
  }
  if (value.message.length < 10) errors.message = "يرجى كتابة تفاصيل أوضح (10 أحرف على الأقل).";
  if ((value.message.match(/https?:\/\//gi) || []).length > 3) {
    errors.message = "يبدو أن الرسالة تحتوي روابط كثيرة — اختصرها.";
  }

  return { ok: Object.keys(errors).length === 0, errors, value };
}

/** يبني رسالة واتساب جاهزة تحتوي كل بيانات العميل. */
export function buildWhatsAppFallback(phone, lead = {}) {
  const digits = String(phone ?? "").replace(/\D/g, "");
  if (!digits) return "";
  const lines = [
    "مرحباً، أريد الاستفسار عن خدمات L.COM.LY",
    "",
    `الاسم: ${lead.name || "-"}`,
    `البريد: ${lead.email || "-"}`,
    `الباقة: ${lead.package || "غير محددة"}`,
    "",
    lead.message || "",
  ];
  return `https://wa.me/${digits}?text=${encodeURIComponent(lines.join("\n"))}`;
}

/** يرسل الطلب إلى الـ Worker مع مهلة زمنية، ويعيد نتيجة موحّدة بلا استثناءات. */
export async function submitLead({ workerUrl, payload, fetchImpl, timeoutMs = DEFAULT_TIMEOUT_MS } = {}) {
  if (!workerUrl) return { ok: false, error: "no_worker_url" };

  const doFetch = fetchImpl || (typeof fetch !== "undefined" ? fetch : null);
  if (!doFetch) return { ok: false, error: "no_fetch" };

  const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
  const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;

  try {
    const res = await doFetch(workerUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      ...(controller ? { signal: controller.signal } : {}),
    });

    let data = null;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (!res.ok) {
      return { ok: false, status: res.status, data, error: (data && data.error) || `http_${res.status}` };
    }
    if (data && data.success === false) {
      return { ok: false, status: res.status, data, error: data.error || "server_rejected" };
    }
    return { ok: true, status: res.status, data };
  } catch (err) {
    const aborted = err && (err.name === "AbortError" || err.code === "ABORT_ERR");
    return {
      ok: false,
      error: aborted ? "timeout" : "network",
      detail: String((err && err.message) || err).slice(0, 200),
    };
  } finally {
    if (timer) clearTimeout(timer);
  }
}

/* --------------------------------- واجهة --------------------------------- */

function fieldValue(form, name) {
  const el = form.querySelector(`[name="${name}"]`);
  return el ? String(el.value || "").trim() : "";
}

function markInvalid(form, errors) {
  form.querySelectorAll("[aria-invalid='true']").forEach((el) => {
    el.removeAttribute("aria-invalid");
    el.classList.remove("ring-2", "ring-red-500");
  });
  for (const key of Object.keys(errors)) {
    const el = form.querySelector(`[name="${key}"]`);
    if (!el) continue;
    el.setAttribute("aria-invalid", "true");
    el.classList.add("ring-2", "ring-red-500");
  }
}

function clearInvalid(form) {
  form.querySelectorAll("[aria-invalid='true']").forEach((el) => {
    el.removeAttribute("aria-invalid");
    el.classList.remove("ring-2", "ring-red-500");
  });
}

function statusEl(form) {
  let el = form.querySelector("#lcomFormStatus");
  if (!el) {
    el = document.createElement("p");
    el.id = "lcomFormStatus";
    form.appendChild(el);
  }
  return el;
}

function setStatus(form, message, kind, link) {
  const el = statusEl(form);
  el.textContent = "";
  if (!message) {
    el.className = "hidden";
    return;
  }
  const span = document.createElement("span");
  span.textContent = message;
  el.appendChild(span);

  if (link) {
    const a = document.createElement("a");
    a.href = link;
    a.target = "_blank";
    a.rel = "noopener";
    a.className = "underline ms-2";
    a.textContent = "أرسل على واتساب";
    el.appendChild(a);
  }

  const color = kind === "error" ? "text-red-500" : kind === "success" ? "text-green-600" : "text-slate-500";
  el.className = `text-sm font-bold mt-3 ${color}`;
}

function notify(message, kind) {
  if (typeof window !== "undefined" && typeof window.toast === "function") {
    window.toast(message, kind);
  }
}

function init() {
  const original = document.getElementById("contactForm");
  if (!original || original.dataset.lcomOwned === "1") return;

  // نستنسخ النموذج للتخلّص من أي معالج قديم مرتبط به (تفادي إرسال الطلب مرتين)
  const form = original.cloneNode(true);
  form.dataset.lcomOwned = "1";
  if (original.parentNode) original.parentNode.replaceChild(form, original);

  const config = (typeof window !== "undefined" && window.LCOM_CONFIG) || {};
  const button = form.querySelector("#submitBtn") || form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // مصيدة السبام: مخفية عن الإنسان، والبوتات تملؤها
    if (fieldValue(form, "website")) {
      setStatus(form, "تم استلام رسالتك، شكراً لك.", "success");
      form.reset();
      return;
    }

    const raw = {
      name: fieldValue(form, "name"),
      email: fieldValue(form, "email"),
      message: fieldValue(form, "message"),
      package: form.dataset.package || "استفسار عام",
    };

    const check = validateLead(raw);
    if (!check.ok) {
      markInvalid(form, check.errors);
      const first = Object.values(check.errors)[0];
      notify(first, "error");
      setStatus(form, first, "error");
      return;
    }

    clearInvalid(form);
    setStatus(form, "", "info");

    const label = button ? button.textContent : "";
    if (button) {
      button.disabled = true;
      button.textContent = "جاري الإرسال...";
    }
    form.setAttribute("aria-busy", "true");

    const result = await submitLead({ workerUrl: config.workerUrl, payload: check.value });

    if (button) {
      button.disabled = false;
      button.textContent = label;
    }
    form.removeAttribute("aria-busy");

    if (result.ok) {
      const message = (result.data && result.data.message) || "تم استلام طلبك بنجاح! سنتواصل معك قريباً.";
      notify(message, "success");
      setStatus(form, message, "success");
      form.reset();
      const terms = form.querySelector("#termsCheck");
      if (terms) terms.checked = false;
      return;
    }

    const fallback = buildWhatsAppFallback(config.whatsapp, check.value);
    const message =
      result.error === "timeout"
        ? "تعذّر الوصول إلى الخادم (انتهت المهلة). يمكنك الإرسال على واتساب الآن."
        : "حدث خطأ أثناء الإرسال. جرّب مرة أخرى، أو أرسل على واتساب مباشرة.";
    notify(message, "error");
    setStatus(form, message, "error", fallback);
  });
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}

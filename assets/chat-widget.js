/**
 * نافذة محادثة الوكيل — قناة خدمة العملاء على الموقع نفسه.
 *
 * كيف تعمل:
 *   1. الزائر يكتب رسالة → تُرسل إلى /api/message مع معرّف جلسة.
 *   2. الوكيل يرد فوراً (الوضع المباشر)، أو يصل إشعار للمالك في تليجرام (وضع الظل).
 *   3. النافذة تستقصي /api/chat كل ٣ ثوانٍ، فيظهر ردّك الذي أرسلته من تليجرام
 *      في متصفح الزائر خلال ثوانٍ — بلا بريد ولا انتظار.
 *
 * الدوال النقية مُصدَّرة ليختبرها Node (كود الواجهة محميّ بفحص وجود document).
 * لا تحتوي على أي مفتاح؛ الرابط من window.LCOM_CONFIG.
 */

export const SESSION_KEY = "lcom_chat_session";
export const LOG_KEY = "lcom_chat_log";
export const POLL_MS = 3000;
export const MAX_MESSAGE = 1200;

/* ---------------------------------- نقي ---------------------------------- */

/** يولّد معرّف جلسة عشوائياً — يعمل كرمز وصول لمحادثة واحدة فقط. */
export function newSessionId(random) {
  const src = random || (typeof crypto !== "undefined" && crypto.getRandomValues ? crypto : null);
  const bytes = new Uint8Array(18);
  if (src && src.getRandomValues) {
    src.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i += 1) bytes[i] = Math.floor(Math.random() * 256);
  }
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

/** يتحقق من رسالة الزائر قبل إرسالها. */
export function normalizeMessage(text) {
  const value = String(text ?? "").replace(/\s+/g, " ").trim();
  if (!value) return { ok: false, error: "اكتب رسالتك أولاً.", text: "" };
  if (value.length < 2) return { ok: false, error: "الرسالة قصيرة جداً.", text: value };
  if (value.length > MAX_MESSAGE) {
    return { ok: false, error: "الرسالة طويلة — اختصرها قليلاً.", text: value.slice(0, MAX_MESSAGE) };
  }
  return { ok: true, error: "", text: value };
}

/** يدمج الرسائل القادمة مع المعروضة: بلا تكرار ومرتّبة بالمعرّف. */
export function mergeMessages(existing, incoming) {
  const byId = new Map();
  for (const m of [...(existing || []), ...(incoming || [])]) {
    if (m && typeof m.id === "number") byId.set(m.id, m);
  }
  return [...byId.values()].sort((a, b) => a.id - b.id);
}

/** أعلى معرّف رسالة معروضة — نقطة البداية للاستقصاء التالي. */
export function lastMessageId(messages) {
  return (messages || []).reduce((max, m) => (m && m.id > max ? m.id : max), 0);
}

/** هل الرسالة من الوكيل/الفريق (تُعرض على اليسار)؟ */
export function isAgentMessage(role) {
  return role === "assistant" || role === "owner";
}

/* --------------------------------- واجهة --------------------------------- */

const STYLE = {
  wrap: "fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3",
  panel:
    "w-[22rem] max-w-[calc(100vw-2rem)] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden",
  header: "flex items-center justify-between gap-3 px-4 py-3 bg-slate-900 dark:bg-slate-800 text-white",
  log: "h-72 overflow-y-auto p-3 space-y-2 bg-slate-50 dark:bg-slate-950",
  foot: "p-3 border-t border-slate-200 dark:border-slate-700 flex items-end gap-2",
  input:
    "flex-1 resize-none p-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white",
  send: "px-4 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-500 transition disabled:opacity-50",
  toggle:
    "w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-500 transition flex items-center justify-center text-2xl",
  bubbleMine: "ms-auto bg-blue-600 text-white rounded-2xl rounded-br-sm px-3 py-2 text-sm max-w-[85%] w-fit",
  bubbleAgent:
    "me-auto bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-bl-sm px-3 py-2 text-sm max-w-[85%] w-fit",
  system: "text-center text-[11px] text-slate-400 dark:text-slate-500 py-1",
};

function el(tag, className, attrs) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  for (const [k, v] of Object.entries(attrs || {})) {
    if (k === "text") node.textContent = v;
    else node.setAttribute(k, v);
  }
  return node;
}

function readLog(storage) {
  try {
    const raw = storage.getItem(LOG_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLog(storage, messages) {
  try {
    storage.setItem(LOG_KEY, JSON.stringify(messages.slice(-60)));
  } catch {
    /* التخزين ممتلئ أو ممنوع — نتجاهل */
  }
}

function start() {
  const config = (typeof window !== "undefined" && window.LCOM_CONFIG) || {};
  const storage = window.localStorage;

  let session = storage.getItem(SESSION_KEY);
  if (!/^[A-Za-z0-9_-]{8,64}$/.test(session || "")) {
    session = newSessionId();
    try {
      storage.setItem(SESSION_KEY, session);
    } catch {
      /* تجاهل */
    }
  }

  let messages = readLog(storage);
  let cursor = lastMessageId(messages);
  let sending = false;

  const wrap = el("div", STYLE.wrap);
  wrap.id = "lcom-chat";
  wrap.setAttribute("dir", "rtl");

  const toggle = el("button", STYLE.toggle, {
    id: "lcom-chat-toggle",
    type: "button",
    "aria-label": "افتح المحادثة مع فريق L.COM.LY",
    "aria-expanded": "false",
  });
  toggle.textContent = "💬";

  const panel = el("div", STYLE.panel, { id: "lcom-chat-panel", role: "dialog", "aria-label": "محادثة" });
  panel.hidden = true;

  const header = el("div", STYLE.header);
  const headText = el("div");
  headText.appendChild(el("p", "font-bold text-sm", { text: "مساعد L.COM.LY" }));
  headText.appendChild(
    el("p", "text-[11px] text-slate-400", { text: "اسأل عن الخدمات والأسعار — نجيبك فوراً" }),
  );
  const closeBtn = el("button", "text-slate-300 hover:text-white text-lg leading-none", {
    id: "lcom-chat-close",
    type: "button",
    "aria-label": "إغلاق المحادثة",
  });
  closeBtn.textContent = "✕";
  header.appendChild(headText);
  header.appendChild(closeBtn);

  const log = el("div", STYLE.log, { id: "lcom-chat-log", role: "log", "aria-live": "polite" });

  const foot = el("form", STYLE.foot, { id: "lcom-chat-form" });
  const input = el("textarea", STYLE.input, {
    id: "lcom-chat-input",
    rows: "1",
    placeholder: "اكتب رسالتك…",
    "aria-label": "رسالتك",
    maxlength: String(MAX_MESSAGE),
  });
  const send = el("button", STYLE.send, { id: "lcom-chat-send", type: "submit", text: "إرسال" });
  foot.appendChild(input);
  foot.appendChild(send);

  panel.appendChild(header);
  panel.appendChild(log);
  panel.appendChild(foot);
  wrap.appendChild(panel);
  wrap.appendChild(toggle);

  function renderBubble(m) {
    const node = el("div", isAgentMessage(m.role) ? STYLE.bubbleAgent : STYLE.bubbleMine);
    node.textContent = m.content;
    log.appendChild(node);
    log.scrollTop = log.scrollHeight;
  }

  function renderSystem(text) {
    log.appendChild(el("p", STYLE.system, { text }));
    log.scrollTop = log.scrollHeight;
  }

  function renderAll() {
    log.textContent = "";
    if (!messages.length) {
      renderSystem("مرحباً بك 👋 اكتب سؤالك وسنجيبك في الحال.");
      return;
    }
    for (const m of messages) renderBubble(m);
  }

  function addMessages(incoming) {
    const before = messages.length;
    messages = mergeMessages(messages, incoming);
    cursor = lastMessageId(messages);
    writeLog(storage, messages);
    if (messages.length === before) return 0;
    renderAll();
    return messages.length - before;
  }

  let waFloat = null;
  /** زر واتساب عائم فوق زر المحادثة — يظهر فقط إن حُدّد رقم. */
  function showWhatsApp() {
    const digits = String(config.whatsapp || "").replace(/\D/g, "");
    if (!digits || waFloat) return;
    const href = `https://wa.me/${digits}?text=${encodeURIComponent("مرحباً، أريد الاستفسار عن خدمات L.COM.LY")}`;
    waFloat = el(
      "a",
      "w-12 h-12 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition flex items-center justify-center",
      {
        id: "lcom-chat-wa-float",
        href,
        target: "_blank",
        rel: "noopener",
        "aria-label": "تواصل على واتساب",
      },
    );
    waFloat.innerHTML =
      '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm5.8 14.06c-.24.68-1.42 1.3-1.96 1.35-.54.05-1.05.24-3.53-.73-2.99-1.18-4.86-4.28-5.01-4.48-.15-.2-1.19-1.58-1.19-3.01 0-1.43.75-2.13 1.02-2.43.27-.29.59-.37.78-.37.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.59.83 2.02.9 2.17.07.15.12.32.02.51-.1.2-.15.32-.29.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.61.17.29.75 1.24 1.61 2.01 1.11.99 2.04 1.3 2.33 1.44.29.15.46.12.63-.07.17-.2.73-.85.93-1.14.2-.29.39-.24.66-.15.27.1 1.7.8 1.99.95.29.15.49.22.56.34.07.13.07.73-.17 1.41z"/></svg>';
    wrap.insertBefore(waFloat, toggle);
  }

  async function poll() {
    if (document.visibilityState === "hidden") return;
    if (!config.workerUrl) return;
    try {
      const url = `${config.workerUrl.replace(/\/api\/message\/?$/, "")}/api/chat?session=${encodeURIComponent(session)}&after=${cursor}`;
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) return;
      const data = await res.json();
      if (data && Array.isArray(data.messages) && data.messages.length) addMessages(data.messages);
    } catch {
      /* انقطاع مؤقت — نُعيد المحاولة في النبضة القادمة */
    }
  }

  let timer = null;
  function startPolling() {
    if (timer) return;
    timer = setInterval(poll, POLL_MS);
  }
  function stopPolling() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  function open() {
    panel.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    renderAll();
    input.focus();
    startPolling();
    poll();
  }

  function close() {
    panel.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    stopPolling();
  }

  toggle.addEventListener("click", () => (panel.hidden ? open() : close()));
  closeBtn.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !panel.hidden) close();
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      foot.requestSubmit ? foot.requestSubmit() : foot.dispatchEvent(new Event("submit", { cancelable: true }));
    }
  });

  foot.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (sending) return;

    const check = normalizeMessage(input.value);
    if (!check.ok) {
      renderSystem(check.error);
      return;
    }
    if (!config.workerUrl) {
      renderSystem("المحادثة غير مهيّأة بعد — استخدم واتساب بالأسفل.");
      showWhatsApp();
      return;
    }

    sending = true;
    send.disabled = true;
    input.value = "";
    renderSystem("… يرسل");

    try {
      const res = await fetch(config.workerUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "project", session, message: check.text, package: "محادثة الموقع" }),
      });
      const data = await res.json().catch(() => null);

      // نُزيل سطر "يرسل"
      const last = log.lastElementChild;
      if (last && last.textContent === "… يرسل") last.remove();

      if (!res.ok || !data || data.success === false) {
        renderSystem("تعذّر الإرسال الآن. جرّب مرة أخرى أو استخدم واتساب.");
        showWhatsApp();
        return;
      }

      if (typeof data.messageId === "number") {
        messages = mergeMessages(messages, [{ id: data.messageId, role: "customer", content: check.text }]);
        cursor = lastMessageId(messages);
        writeLog(storage, messages);
        renderAll();
      }

      renderSystem(
        data.mode === "shadow"
          ? "تم استلام رسالتك — سيرد عليك فريقنا بعد قليل 👌"
          : "تم استلام رسالتك، جارٍ تحضير الرد…",
      );
      await poll();
    } catch {
      const last = log.lastElementChild;
      if (last && last.textContent === "… يرسل") last.remove();
      renderSystem("تعذّر الوصول للخادم. تحقّق من الاتصال أو استخدم واتساب.");
      showWhatsApp();
    } finally {
      sending = false;
      send.disabled = false;
      input.focus();
    }
  });

  document.body.appendChild(wrap);
  renderAll();
  showWhatsApp();

  // إن كانت هناك محادثة سابقة، نحدّثها فوراً عند فتح الصفحة
  if (cursor > 0) poll();
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
}

/**
 * تحسينات L.COM.LY — تُحمَّل بتأجيل (defer) فلا تعطّل العرض.
 *
 * المهمة الوحيدة: توفير toast() بديلاً عن alert()، وتحسينات صغيرة آمنة.
 * لا تحتوي على أي مفتاح أو منطق أعمال.
 */
(function () {
  "use strict";

  var CONTAINER_ID = "lcom-toasts";
  var ICONS = { success: "✅", error: "⚠️", info: "ℹ️" };

  function container() {
    var el = document.getElementById(CONTAINER_ID);
    if (!el) {
      el = document.createElement("div");
      el.id = CONTAINER_ID;
      el.setAttribute("role", "status");
      el.setAttribute("aria-live", "polite");
      el.setAttribute("aria-atomic", "false");
      document.body.appendChild(el);
    }
    return el;
  }

  /**
   * إشعار أنيق غير حاجب.
   * @param {string} message النص المعروض
   * @param {"success"|"error"|"info"} [type]
   * @param {number} [ms] مدة العرض
   */
  function toast(message, type, ms) {
    var kind = type === "success" || type === "error" ? type : "info";
    var duration = typeof ms === "number" ? ms : 4500;

    var node = document.createElement("div");
    node.className = "lcom-toast lcom-toast--" + kind;
    node.setAttribute("role", kind === "error" ? "alert" : "status");

    var icon = document.createElement("span");
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = ICONS[kind];

    var text = document.createElement("span");
    text.textContent = String(message == null ? "" : message);

    node.appendChild(icon);
    node.appendChild(text);
    container().appendChild(node);

    requestAnimationFrame(function () {
      node.classList.add("is-visible");
    });

    var timer = setTimeout(function () {
      node.classList.remove("is-visible");
      setTimeout(function () {
        if (node.parentNode) node.parentNode.removeChild(node);
      }, 300);
    }, duration);

    // الضغط للإغلاق الفوري
    node.addEventListener("click", function () {
      clearTimeout(timer);
      node.classList.remove("is-visible");
      setTimeout(function () {
        if (node.parentNode) node.parentNode.removeChild(node);
      }, 300);
    });

    return node;
  }

  window.toast = toast;

  // تحسينات صغيرة لا تغيّر أي وظيفة قائمة
  function enhance() {
    document.querySelectorAll("img:not([loading])").forEach(function (img) {
      img.setAttribute("loading", "lazy");
      img.setAttribute("decoding", "async");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enhance);
  } else {
    enhance();
  }
})();

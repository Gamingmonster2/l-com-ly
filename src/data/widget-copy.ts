import type { Language } from "@/data/translations"

interface WidgetCopy {
  chat: {
    toggle: string
    close: string
    title: string
    subtitle: string
    welcome: string
    placeholder: string
    send: string
    sending: string
    errorEmpty: string
    errorShort: string
    errorLong: string
    notConfigured: string
    receivedShadow: string
    receivedLive: string
    sendFailed: string
    sendFailedWa: string
    networkFailed: string
    networkFailedWa: string
    waLabel: string
    waText: string
    package: string
  }
  consent: {
    label: string
    text: string
    more: string
    accept: string
    deny: string
  }
  form: {
    defaultSuccess: string
    honeypotSuccess: string
    timeout: string
    network: string
    waLink: string
  }
}

export const widgetCopy: Record<Language, WidgetCopy> = {
  ar: {
    chat: {
      toggle: "افتح المحادثة مع فريق L.COM.LY",
      close: "إغلاق المحادثة",
      title: "مساعد L.COM.LY",
      subtitle: "اسأل عن الخدمات والأسعار — نجيبك فوراً",
      welcome: "مرحباً بك 👋 اكتب سؤالك وسنجيبك في الحال.",
      placeholder: "اكتب رسالتك…",
      send: "إرسال",
      sending: "… يرسل",
      errorEmpty: "اكتب رسالتك أولاً.",
      errorShort: "الرسالة قصيرة جداً.",
      errorLong: "الرسالة طويلة — اختصرها قليلاً.",
      notConfigured: "المحادثة غير مهيّأة بعد — استخدم واتساب بالأسفل.",
      receivedShadow: "تم استلام رسالتك — سيرد عليك فريقنا بعد قليل 👌",
      receivedLive: "تم استلام رسالتك، جارٍ تحضير الرد…",
      sendFailed: "تعذّر الإرسال الآن. جرّب مرة أخرى.",
      sendFailedWa: "تعذّر الإرسال الآن. جرّب مرة أخرى أو استخدم واتساب.",
      networkFailed: "تعذّر الوصول للخادم. تحقّق من الاتصال.",
      networkFailedWa:
        "تعذّر الوصول للخادم. تحقّق من الاتصال أو استخدم واتساب.",
      waLabel: "تواصل على واتساب",
      waText: "مرحباً، أريد الاستفسار عن خدمات L.COM.LY",
      package: "محادثة الموقع",
    },
    consent: {
      label: "إشعار ملفات تعريف الارتباط",
      text:
        "نستخدم ملفات تعريف الارتباط من Google لتحليل الزيارات وتحسين الخدمة. لا نبيع بياناتك ولا نشاركها مع أي طرف آخر. رفضك لا يمنعك من استخدام الموقع.",
      more: "معرفة المزيد",
      accept: "أوافق",
      deny: "رفض التحليلات",
    },
    form: {
      defaultSuccess: "تم استلام طلبك بنجاح! سنتواصل معك قريباً.",
      honeypotSuccess: "تم استلام رسالتك، شكراً لك.",
      timeout:
        "تعذّر الوصول إلى الخادم (انتهت المهلة). يمكنك الإرسال على واتساب الآن.",
      network:
        "حدث خطأ أثناء الإرسال. جرّب مرة أخرى، أو أرسل على واتساب مباشرة.",
      waLink: "أرسل على واتساب",
    },
  },
  en: {
    chat: {
      toggle: "Chat with the L.COM.LY team",
      close: "Close chat",
      title: "L.COM.LY Assistant",
      subtitle: "Ask about services and pricing — we reply instantly",
      welcome: "Welcome 👋 Ask your question and we'll get right back to you.",
      placeholder: "Type your message…",
      send: "Send",
      sending: "… sending",
      errorEmpty: "Please write a message first.",
      errorShort: "Your message is too short.",
      errorLong: "Your message is too long — please shorten it.",
      notConfigured: "Chat is not set up yet — use WhatsApp below.",
      receivedShadow: "Message received — our team will get back to you shortly 👌",
      receivedLive: "Message received, preparing a reply…",
      sendFailed: "Could not send right now. Please try again.",
      sendFailedWa:
        "Could not send right now. Please try again or use WhatsApp.",
      networkFailed: "Could not reach the server. Check your connection.",
      networkFailedWa:
        "Could not reach the server. Check your connection or use WhatsApp.",
      waLabel: "Chat on WhatsApp",
      waText: "Hello, I'd like to ask about L.COM.LY services",
      package: "Website chat",
    },
    consent: {
      label: "Cookie notice",
      text:
        "We use Google cookies to analyse traffic and improve the service. We do not sell your data or share it with any third party. Declining does not prevent you from using the site.",
      more: "Learn more",
      accept: "Accept",
      deny: "Reject analytics",
    },
    form: {
      defaultSuccess: "Your request was received! We'll get in touch soon.",
      honeypotSuccess: "Your message was received, thank you.",
      timeout: "The server timed out. You can send your message on WhatsApp now.",
      network: "Something went wrong. Try again, or send it directly on WhatsApp.",
      waLink: "Send on WhatsApp",
    },
  },
}

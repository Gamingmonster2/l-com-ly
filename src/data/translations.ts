export type Language = "ar" | "en"

export interface TranslationData {
  nav: {
    home: string
    portfolio: string
    pricing: string
    about: string
    contact: string
    startProject: string
  }
  hero: {
    statusBadge: string
    statusDot: string
    headlineMain: string
    headlineSub: string
    description: string
    ctaPrimary: string
    ctaSecondary: string
    stats: {
      platforms: string
      platformsLabel: string
      uptime: string
      uptimeLabel: string
      support: string
      supportLabel: string
      infrastructure: string
      infrastructureLabel: string
    }
  }
  portfolio: {
    badge: string
    title: string
    subtitle: string
    disclaimerTag: string
    disclaimer: string
    visitSite: string
    items: Array<{
      id: string
      title: string
      subtitle: string
      description: string
      domain: string
      url: string
      category: string
      badge: string
      screenshot: string
    }>
  }
  pricing: {
    badge: string
    title: string
    subtitle: string
    selectPlan: string
    popularTag: string
    requestQuote: string
    deliveryTitle: string
    deliveryText: string
    libyaNote: string
    domainNote: string
    plans: Array<{
      id: string
      name: string
      tagline: string
      price: string
      priceDetail: string
      featured?: boolean
      badge: string
      badgeVariant: "emerald" | "blue" | "gold" | "default"
      features: string[]
      ctaText: string
    }>
  }
  contact: {
    badge: string
    title: string
    subtitle: string
    infoTitle: string
    infoSubtitle: string
    contactEmailLabel: string
    whatsappLabel: string
    domainLabel: string
    locationLabel: string
    locationValue: string
    hoursLabel: string
    hoursValue: string
    formTitle: string
    namePlaceholder: string
    nameLabel: string
    emailPlaceholder: string
    emailLabel: string
    phonePlaceholder: string
    phoneLabel: string
    planLabel: string
    messagePlaceholder: string
    messageLabel: string
    termsLabel: string
    submitButton: string
    submitting: string
    successTitle: string
    successMessage: string
    sendAnother: string
  }
  modal: {
    title: string
    description: string
    selectedPackage: string
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    notesLabel: string
    notesPlaceholder: string
    confirmButton: string
    cancelButton: string
    successAlert: string
  }
  footer: {
    rights: string
    madeIn: string
    tripoliLibya: string
    quickLinks: string
    legal: string
    privacy: string
    terms: string
    digitalHub: string
  }
}

export const translations: Record<Language, TranslationData> = {
  ar: {
    nav: {
      home: "الرئيسية",
      portfolio: "الأعمال والمنصات",
      pricing: "الخدمات والأسعار",
      about: "عن البوابة",
      contact: "اتصل بنا",
      startProject: "ابدأ مشروعك",
    },
    hero: {
      statusBadge: "طرابلس، ليبيا • Tripoli, Libya",
      statusDot: "نبني من ليبيا إلى العالم",
      headlineMain: "L.COM.LY",
      headlineSub: "نحوّل فكرتك إلى موقع أو تطبيق حقيقي",
      description:
        "نصمم مواقع وتطبيقات ويب وتطبيقات أندرويد باستخدام الذكاء الاصطناعي والوكلاء البرمجيين، ونسلّم المشروع كاملاً داخل مستودع GitHub عام يمكنك استخدامه أو عمل fork منه. الاستشارات والمواقع الدينية مجانية، وتصميم المواقع يبدأ من 100 إلى 600 دولار حسب العمل.",
      ctaPrimary: "ابدأ مشروعك الآن",
      ctaSecondary: "شاهد أعمالنا الحقيقية",
      stats: {
        platforms: "4",
        platformsLabel: "مواقع حقيقية معروضة",
        uptime: "$100–$600",
        uptimeLabel: "سعر تصميم المواقع حسب العمل",
        support: "مجاناً",
        supportLabel: "الاستشارات والمواقع الدينية",
        infrastructure: "GitHub",
        infrastructureLabel: "تسليم المصدر في مستودع عام",
      },
    },
    portfolio: {
      badge: "أعمال حقيقية • لقطات من المواقع نفسها",
      title: "مواقع بنيناها، انقر لتجربتها",
      subtitle:
        "هذه لقطات حقيقية من مواقع مباشرة. الصورة نفسها تعرّف بالموقع، والضغط عليها يفتح الموقع الأصلي في تبويب جديد.",
      disclaimerTag: "جزء من أعمالنا",
      disclaimer:
        "هذه أمثلة حقيقية من مشاريعنا، ولدينا أعمال أخرى غير معروضة هنا. إذا كنت تبحث عن موقع أو تطبيق، أرسل طلبك وسنحدد النطاق والسعر معاً.",
      visitSite: "افتح الموقع في تبويب جديد",
      items: [
        {
          id: "toolseer",
          title: "ToolSeer.com",
          subtitle: "أدوات PDF تعمل داخل المتصفح",
          description:
            "دمج وضغط وتقسيم وتحويل وحماية ملفات PDF بالكامل على جهازك، دون رفع أو تسجيل.",
          domain: "toolseer.com",
          url: "https://toolseer.com/",
          category: "أدوات ويب",
          badge: "PDF Tools",
          screenshot: "/screenshots/toolseer.png",
        },
        {
          id: "stream",
          title: "Stream.com.ly",
          subtitle: "منصة ألعاب وتجارب رقمية",
          description:
            "ألعاب ويب أصلية وأدوات ومشاريع قادمة من ليبيا إلى العالم، من ضمنها Cyber Michelangelo.",
          domain: "stream.com.ly",
          url: "https://stream.com.ly/",
          category: "ألعاب الويب",
          badge: "Web Games",
          screenshot: "/screenshots/stream.png",
        },
        {
          id: "bit",
          title: "Bit.com.ly",
          subtitle: "ضغط الصور بخصوصية كاملة",
          description:
            "ضغط الصور محلياً داخل المتصفح بصيغ AVIF وWebP وJPEG وPNG وJXL، مع ضغط دفعات وتنزيل ZIP.",
          domain: "bit.com.ly",
          url: "https://bit.com.ly/",
          category: "أدوات الصور",
          badge: "Image Compression",
          screenshot: "/screenshots/bit.png",
        },
        {
          id: "btc",
          title: "BTC.org.ly/en",
          subtitle: "منصة معلوماتية حيوية مفتوحة",
          description:
            "أدوات برمجيات حيوية تعمل في المتصفح، ومحتوى تعليمي عربي موثوق في المعلوماتية الحيوية وتطبيقات الذكاء الاصطناعي.",
          domain: "btc.org.ly/en",
          url: "https://btc.org.ly/en",
          category: "علم البيانات الحيوية",
          badge: "Bioinformatics",
          screenshot: "/screenshots/btc.png",
        },
      ],
    },
    pricing: {
      badge: "خدمات واضحة وأسعار معلنة",
      title: "من الفكرة إلى مستودع جاهز للنشر",
      subtitle:
        "استشارات ومواقع دينية مجانية، وتصميم مواقع من 100 إلى 600 دولار حسب العمل. المشاريع الكبيرة والمؤسسية حسب الاتفاق.",
      selectPlan: "اطلب هذه الخدمة",
      popularTag: "الأكثر طلباً",
      requestQuote: "اطلب تسعيراً خاصاً",
      deliveryTitle: "كيف نسلّم المشروع؟",
      deliveryText:
        "تُرفع كل المشاريع داخل مستودع GitHub عام؛ يمكنك عمل fork له أو استخدامه مباشرة. نبني المشروع عبر GitHub Pages أو Cloudflare Edge أو كليهما معاً. يمكننا الاستضافة في مستودعاتنا أو Cloudflare Pages الخاص بنا، وإذا كان لديك حساب Cloudflare أو نطاق خاص بك نوجّه العمل إليك ونسلّمك التحكم كاملاً.",
      libyaNote:
        "عملاء ليبيا: يمكن التواصل والدفع بالدينار الليبي، مع حصولهم على تخفيض في السعر.",
      domainNote:
        "أسعار النطاقات غير مشمولة في الخدمة؛ السعر يعتمد على مزوّد النطاق الذي تختاره.",
      plans: [
        {
          id: "consultation",
          name: "استشارة تقنية",
          tagline: "تحليل الفكرة وتحديد الطريق الأنسب قبل التنفيذ",
          price: "مجاناً",
          priceDetail: "بدون رسوم أو التزام",
          badge: "خدمة مجانية",
          badgeVariant: "emerald",
          features: [
            "مناقشة الفكرة والمتطلبات والجمهور المستهدف",
            "ترشيح التقنيات المناسبة للموقع أو التطبيق",
            "تحديد النطاق التقريبي للعمل والمدة والسعر",
            "رد مباشر عبر نموذج التواصل أو محادثة الموقع",
          ],
          ctaText: "احجز استشارة مجانية",
        },
        {
          id: "noor",
          name: "المواقع الدينية — مبادرة نور",
          tagline: "دعم مجاني للمساجد ومراكز القرآن والجمعيات الخيرية",
          price: "مجاناً 100%",
          priceDetail: "خدمة مجانية دائمة",
          badge: "مبادرة خيرية",
          badgeVariant: "emerald",
          features: [
            "موقع متجاوب مناسب للمساجد ومراكز تحفيظ القرآن والهيئات الخيرية",
            "تصميم بسيط ووقور متوافق مع جميع الهواتف",
            "إعداد النشر عبر GitHub Pages أو Cloudflare",
            "تسليم المصدر في مستودع GitHub عام عند الطلب",
            "إرشادات تحديث المحتوى والتحكم بالموقع",
          ],
          ctaText: "التقديم للمبادرة",
        },
        {
          id: "websites",
          name: "تصميم المواقع",
          tagline: "مواقع لشركتك أو مشروعك، من الصفحة الواحدة إلى الموقع المتكامل",
          price: "$100 – $600",
          priceDetail: "حسب حجم العمل والمزايا المطلوبة",
          featured: true,
          badge: "السعر حسب العمل",
          badgeVariant: "gold",
          features: [
            "تصميم متجاوب وهوية بصرية متناسقة مع علامتك",
            "بناء الصفحات وتجهيز المحتوى الأساسي والعناوين",
            "تحسين أساسي لمحركات البحث وبيانات الميتا",
            "تسليم المشروع في مستودع GitHub عام قابل للاستخدام والـ fork",
            "النشر عبر GitHub Pages و/أو Cloudflare Edge",
            "استضافة في حسابنا أو تسليم المشروع إلى حسابك",
          ],
          ctaText: "اطلب تصميم موقع",
        },
        {
          id: "apps",
          name: "تطبيقات الويب والأندرويد",
          tagline: "تطبيقات تفاعلية تُبنى بمساعدة الذكاء الاصطناعي والوكلاء البرمجيين",
          price: "حسب الطلب",
          priceDetail: "يُحدد السعر بعد الاستشارة المجانية",
          badge: "ويب + أندرويد",
          badgeVariant: "blue",
          features: [
            "تطبيقات ويب ولوحات تحكم وتدفقات عمل مخصصة",
            "تطبيقات أندرويد تُطوّر بمساعدة الذكاء الاصطناعي والوكلاء",
            "ربط واجهات APIs وقواعد بيانات ونظم دخول وصلاحيات",
            "تسليم الشيفرة المصدرية داخل مستودع GitHub عام",
            "النشر على Cloudflare Edge أو GitHub Pages أو حساب العميل",
            "تسعير حسب النطاق والمزايا، دون أرقام تقديرية وهمية",
          ],
          ctaText: "اطلب تطوير تطبيق",
        },
        {
          id: "enterprise",
          name: "مشاريع مؤسسية وكبيرة",
          tagline: "أنظمة متعددة الصفحات أو تكاملات معقدة أو عمل مستمر",
          price: "حسب الاتفاق",
          priceDetail: "عرض سعر مفصل بعد دراسة النطاق",
          badge: "حسب الاتفاق",
          badgeVariant: "default",
          features: [
            "تحليل معمق للمتطلبات وهندسة الحل",
            "تقسيم العمل إلى مراحل وتسليمات واضحة",
            "تكاملات خارجية ولوحات إدارية متقدمة",
            "خطة استضافة ومراقبة وتحديث متفق عليها",
            "عقد عمل واتفاقية تسليم واضحة",
          ],
          ctaText: "اطلب عرضاً مؤسسياً",
        },
      ],
    },
    contact: {
      badge: "تواصل معنا من طرابلس",
      title: "أرسل فكرتك وسنحوّلها إلى مشروع",
      subtitle:
        "سواء كنت تريد موقعاً أو تطبيق ويب أو تطبيق أندرويد، فريق L.COM.LY على بعد رسالة واحدة. الاستشارة الأولى مجانية.",
      infoTitle: "قنوات التواصل المباشرة",
      infoSubtitle: "سنرد على استفسارك ونحدد الخطوة التالية معاً.",
      contactEmailLabel: "البريد الإلكتروني المعتمد",
      whatsappLabel: "واتساب — تواصل سريع",
      domainLabel: "البوابة الرقمية",
      locationLabel: "المقر",
      locationValue: "طرابلس، ليبيا — Tripoli, Libya",
      hoursLabel: "التواصل",
      hoursValue: "الأسرع عبر واتساب، أو نموذج التواصل ومحادثة الموقع.",
      formTitle: "أرسل تفاصيل مشروعك",
      nameLabel: "الاسم الكامل",
      namePlaceholder: "مثال: م. محمد الورفلي",
      emailLabel: "البريد الإلكتروني",
      emailPlaceholder: "name@company.com",
      phoneLabel: "رقم الهاتف / واتساب (اختياري)",
      phonePlaceholder: "+218 91 000 0000",
      planLabel: "الخدمة المطلوبة",
      messageLabel: "تفاصيل المشروع أو الاستفسار",
      messagePlaceholder: "صف لنا فكرتك، والصفحات أو المزايا المطلوبة، والجدول الزمني المتوقع...",
      termsLabel: "أوافق على سياسة الخصوصية وشروط معالجة البيانات الفنية من قِبل L.COM.LY",
      submitButton: "إرسال طلب المشروع الآن",
      submitting: "جارٍ إرسال البيانات وتشفيرها...",
      successTitle: "تم استلام طلبك بنجاح!",
      successMessage: "شكراً لاهتمامك. سيتواصل معك الفريق لمناقشة التفاصيل والخطوة التالية.",
      sendAnother: "إرسال استفسار آخر",
    },
    modal: {
      title: "طلب الخدمة المختارة",
      description: "سيتم إرسال طلبك مباشرة إلى الفريق التقني لمراجعة المتطلبات والتواصل معك.",
      selectedPackage: "الخدمة المختارة:",
      nameLabel: "اسمك الكريم",
      namePlaceholder: "أدخل اسمك أو اسم المؤسسة",
      emailLabel: "البريد الإلكتروني للتواصل",
      emailPlaceholder: "you@example.com",
      notesLabel: "ملاحظات إضافية أو رابط مشروعك (اختياري)",
      notesPlaceholder: "اذكر أي تفاصيل تفضل مناقشتها بخصوص هذه الخدمة...",
      confirmButton: "تأكيد الطلب",
      cancelButton: "إلغاء",
      successAlert: "تم تسجيل طلبك بنجاح! سنتواصل معك لمناقشة التنفيذ.",
    },
    footer: {
      rights: "جميع الحقوق محفوظة للبوابة الرقمية L.COM.LY © 2026",
      madeIn: "صُنع في طرابلس، ليبيا",
      tripoliLibya: "طرابلس • ليبيا",
      quickLinks: "روابط سريعة",
      legal: "الشؤون القانونية والميثاق",
      privacy: "سياسة الخصوصية",
      terms: "شروط الخدمة",
      digitalHub: "تصميم مواقع وتطبيقات ويب وأندرويد من ليبيا إلى العالم",
    },
  },
  en: {
    nav: {
      home: "Home",
      portfolio: "Portfolio",
      pricing: "Services & Pricing",
      about: "About",
      contact: "Contact",
      startProject: "Start Project",
    },
    hero: {
      statusBadge: "Tripoli, Libya • طرابلس، ليبيا",
      statusDot: "Built in Libya for the world",
      headlineMain: "L.COM.LY",
      headlineSub: "We turn your idea into a real site or app",
      description:
        "We design websites, web apps and Android apps with AI and coding agents, and deliver the whole project in a public GitHub repository you can use or fork. Consultations and religious websites are free; website design starts at $100–$600 depending on the work.",
      ctaPrimary: "Start Your Project",
      ctaSecondary: "See Real Work",
      stats: {
        platforms: "4",
        platformsLabel: "Real sites shown",
        uptime: "$100–$600",
        uptimeLabel: "Website design by scope",
        support: "Free",
        supportLabel: "Consulting & religious sites",
        infrastructure: "GitHub",
        infrastructureLabel: "Public source delivery",
      },
    },
    portfolio: {
      badge: "Real work • Screenshots from the sites",
      title: "Sites we built — click to explore",
      subtitle:
        "These are real screenshots from live sites. The image itself identifies the site, and clicking it opens the original in a new tab.",
      disclaimerTag: "Part of our work",
      disclaimer:
        "These are real examples from our projects, and we have other work not shown here. If you need a site or app, send a request and we will define the scope and price together.",
      visitSite: "Open site in a new tab",
      items: [
        {
          id: "toolseer",
          title: "ToolSeer.com",
          subtitle: "Browser-based PDF tools",
          description:
            "Merge, compress, split, convert and protect PDFs entirely on your device — no upload, no signup.",
          domain: "toolseer.com",
          url: "https://toolseer.com/",
          category: "Web utilities",
          badge: "PDF Tools",
          screenshot: "/screenshots/toolseer.png",
        },
        {
          id: "stream",
          title: "Stream.com.ly",
          subtitle: "A platform for games and digital experiences",
          description:
            "Original web games, tools and upcoming projects from Libya to the world, including Cyber Michelangelo.",
          domain: "stream.com.ly",
          url: "https://stream.com.ly/",
          category: "Web games",
          badge: "Web Games",
          screenshot: "/screenshots/stream.png",
        },
        {
          id: "bit",
          title: "Bit.com.ly",
          subtitle: "Private image compression",
          description:
            "Compress images locally in your browser with AVIF, WebP, JPEG, PNG and JXL, plus batch compression and ZIP download.",
          domain: "bit.com.ly",
          url: "https://bit.com.ly/",
          category: "Image tools",
          badge: "Image Compression",
          screenshot: "/screenshots/bit.png",
        },
        {
          id: "btc",
          title: "BTC.org.ly/en",
          subtitle: "Open bioinformatics platform",
          description:
            "Browser-based bioinformatics tools and reliable Arabic educational content in bioinformatics and AI applications in biology.",
          domain: "btc.org.ly/en",
          url: "https://btc.org.ly/en",
          category: "Bioinformatics",
          badge: "Bioinformatics",
          screenshot: "/screenshots/btc.png",
        },
      ],
    },
    pricing: {
      badge: "Clear services and published prices",
      title: "From an idea to a repository ready to ship",
      subtitle:
        "Free consultations and religious websites. Website design from $100 to $600 depending on the work. Large projects are priced by agreement.",
      selectPlan: "Request this service",
      popularTag: "Most requested",
      requestQuote: "Request a custom quote",
      deliveryTitle: "How do we deliver?",
      deliveryText:
        "Every project is uploaded to a public GitHub repository — you can fork it or use it directly. We build with GitHub Pages, Cloudflare Edge, or both. We can host in our repositories or our company Cloudflare Pages account; if you have a Cloudflare or domain account, we point the work to you and hand over full control.",
      libyaNote:
        "Clients in Libya: we can communicate and receive payment in LYD, with a discounted price.",
      domainNote:
        "Domain prices are not included; the final cost depends on your chosen registrar.",
      plans: [
        {
          id: "consultation",
          name: "Tech Consultation",
          tagline: "Understand the idea and choose the right path before building",
          price: "Free",
          priceDetail: "No fees, no obligation",
          badge: "Free service",
          badgeVariant: "emerald",
          features: [
            "Discuss the idea, requirements and target audience",
            "Recommend the right stack for the site or app",
            "Define the approximate scope, timeline and price",
            "Direct reply through the contact form or site chat",
          ],
          ctaText: "Book a free consultation",
        },
        {
          id: "noor",
          name: "Religious Websites — Noor Initiative",
          tagline: "Free support for mosques, Quran centers and charities",
          price: "100% Free",
          priceDetail: "Permanent free service",
          badge: "Charity initiative",
          badgeVariant: "emerald",
          features: [
            "Responsive sites for mosques, Quran centers and non-profits",
            "Simple, dignified design that works on all phones",
            "Publishing setup through GitHub Pages or Cloudflare",
            "Public GitHub source delivery on request",
            "Guidance for updating content and controlling the site",
          ],
          ctaText: "Apply for the initiative",
        },
        {
          id: "websites",
          name: "Website Design",
          tagline: "For your company or project — from one page to a full site",
          price: "$100 – $600",
          priceDetail: "Depending on scope and features",
          featured: true,
          badge: "Priced by work",
          badgeVariant: "gold",
          features: [
            "Responsive design and a visual identity that fits your brand",
            "Page building and core content preparation",
            "Basic SEO and metadata setup",
            "Public GitHub repository you can use or fork",
            "Publish through GitHub Pages and/or Cloudflare Edge",
            "Host in our account or hand the project to yours",
          ],
          ctaText: "Request a website",
        },
        {
          id: "apps",
          name: "Web & Android Apps",
          tagline: "Interactive apps built with AI and coding agents",
          price: "By request",
          priceDetail: "Priced after the free consultation",
          badge: "Web + Android",
          badgeVariant: "blue",
          features: [
            "Web apps, dashboards and custom workflows",
            "Android apps developed with AI and coding agents",
            "API, database, authentication and permissions integrations",
            "Source code delivered in a public GitHub repository",
            "Deploy on Cloudflare Edge, GitHub Pages or your account",
            "Priced by real scope — no invented estimates",
          ],
          ctaText: "Request an app",
        },
        {
          id: "enterprise",
          name: "Enterprise & Large Projects",
          tagline: "Multi-page systems, complex integrations or ongoing work",
          price: "By agreement",
          priceDetail: "Detailed quote after scope review",
          badge: "By agreement",
          badgeVariant: "default",
          features: [
            "Deep requirements analysis and solution architecture",
            "Clear phases and deliverables",
            "External integrations and advanced admin dashboards",
            "Agreed hosting, monitoring and update plan",
            "Clear contract and delivery agreement",
          ],
          ctaText: "Request an enterprise proposal",
        },
      ],
    },
    contact: {
      badge: "Reach us from Tripoli",
      title: "Send your idea and we will turn it into a project",
      subtitle:
        "Whether you need a website, web app or Android app, the L.COM.LY team is one message away. The first consultation is free.",
      infoTitle: "Direct contact channels",
      infoSubtitle: "We will reply and agree on the next step together.",
      contactEmailLabel: "Official email",
      whatsappLabel: "WhatsApp — quick contact",
      domainLabel: "Digital portal",
      locationLabel: "Location",
      locationValue: "Tripoli, Libya — طرابلس، ليبيا",
      hoursLabel: "Availability",
      hoursValue: "Fastest on WhatsApp, or use the contact form and site chat.",
      formTitle: "Send your project details",
      nameLabel: "Full Name",
      namePlaceholder: "e.g. Eng. Tarek Al-Fitouri",
      emailLabel: "Email Address",
      emailPlaceholder: "name@company.com",
      phoneLabel: "Phone / WhatsApp (Optional)",
      phonePlaceholder: "+218 91 000 0000",
      planLabel: "Requested service",
      messageLabel: "Project Details & Scope",
      messagePlaceholder: "Describe your idea, the pages or features you need, and your expected timeline...",
      termsLabel: "I agree to the privacy policy and data processing terms of L.COM.LY",
      submitButton: "Send Project Inquiry",
      submitting: "Encrypting and transmitting...",
      successTitle: "Inquiry Successfully Received!",
      successMessage: "Thank you for reaching out. Our team will contact you to discuss the details and next step.",
      sendAnother: "Send Another Inquiry",
    },
    modal: {
      title: "Request Selected Service",
      description: "Your request will be routed directly to our technical team for review and coordination.",
      selectedPackage: "Selected service:",
      nameLabel: "Your Name",
      namePlaceholder: "Enter your full name or company name",
      emailLabel: "Contact Email",
      emailPlaceholder: "you@example.com",
      notesLabel: "Additional Notes or Project URL (Optional)",
      notesPlaceholder: "Specify any details you want to discuss about this service...",
      confirmButton: "Confirm Request",
      cancelButton: "Cancel",
      successAlert: "Request submitted! We will contact you shortly.",
    },
    footer: {
      rights: "All Rights Reserved. L.COM.LY Digital Portal © 2026",
      madeIn: "Made in Tripoli, Libya",
      tripoliLibya: "Tripoli • Libya",
      quickLinks: "Quick Navigation",
      legal: "Legal & Governance",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      digitalHub: "Websites, web apps and Android apps from Libya to the world",
    },
  },
}

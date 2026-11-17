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
    previewCode: string
    liveTelemetry: string
    items: Array<{
      id: string
      title: string
      subtitle: string
      description: string
      domain: string
      url: string
      category: string
      badge: string
      color: string
      metric: string
      techStack: string[]
    }>
  }
  pricing: {
    badge: string
    title: string
    subtitle: string
    selectPlan: string
    popularTag: string
    requestQuote: string
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
      pricing: "الباقات والمبادرات",
      about: "عن البوابة",
      contact: "اتصل بنا",
      startProject: "ابدأ مشروعك",
    },
    hero: {
      statusBadge: "طرابلس، ليبيا • Tripoli, Libya",
      statusDot: "متصل بالشبكة العالمية",
      headlineMain: "L.COM.LY",
      headlineSub: "بوابتك الرقمية للعالمية",
      description:
        "مركز التميز والابتكار البرمجي الرائد في ليبيا — نربط أفكاركم ومشاريعكم بالآفاق الرقمية العالمية، من خلال حلول هندسية متطورة، استضافة سحابية فائقة السرعة، وبنية تحتية عالية الموثوقية والأمان.",
      ctaPrimary: "ابدأ مشروعك الآن",
      ctaSecondary: "تصفح شركاء النجاح",
      stats: {
        platforms: "10+",
        platformsLabel: "منصات ومشاريع رقمية",
        uptime: "99.99%",
        uptimeLabel: "جاهزية واستقرار سحابي",
        support: "24/7",
        supportLabel: "دعم ومتابعة هندسية",
        infrastructure: "100%",
        infrastructureLabel: "بنية Google Cloud",
      },
    },
    portfolio: {
      badge: "منظومة المشاريع والأصول الرقمية المباشرة",
      title: "نماذج حية من منصاتنا الرقمية",
      subtitle:
        "استعراض تفاعلي لأبرز المنصات السحابية ومحركات الذكاء الاصطناعي التي طورناها ونشرف على بنيتها التحتية مباشرة.",
      disclaimerTag: "إشعار التوسّع والإنتاج",
      disclaimer:
        "هذه المنصات المعروضة تمثل جزءاً مختاراً من منظومة أعمالنا البرمجية المباشرة؛ وتضم منصتنا مشاريع استراتيجية وأنظمة مؤسسية كبرى أخرى قيد التشغيل والتطوير المستمر.",
      visitSite: "زيارة المنصة الحية",
      previewCode: "معاينة الصندوق",
      liveTelemetry: "البث التفاعلي المباشر نشط",
      items: [
        {
          id: "toolseer",
          title: "Toolseer.com",
          subtitle: "منصة الأدوات الذكية والمحركات التحليلية",
          description:
            "محرك بحث وفهرسة ذكي يجمع آلاف الأدوات الرقمية وحلول الذكاء الاصطناعي في بيئة تفاعلية موحدة تتيح للمطورين والشركات الوصول لأحدث التقنيات ورفع الإنتاجية.",
          domain: "toolseer.com",
          url: "https://toolseer.com/",
          category: "محركات الذكاء الاصطناعي والأدوات",
          badge: "محرك ذكاء اصطناعي",
          color: "from-foreground/70 via-foreground/30 to-foreground/60",
          metric: "12,500+ أداة مفهرسة لحظياً",
          techStack: ["AI Engine", "Next.js 15", "Algolia Vector", "Cloudflare Workers"],
        },
        {
          id: "stream",
          title: "Stream.com.ly",
          subtitle: "منصة البث المباشر والوسائط السحابية",
          description:
            "بنية تحتية سحابية متقدمة للبث المباشر وتوزيع محتوى الوسائط الرقمية (Live & VOD) بزمن وصول فائق الانخفاض (Ultra-Low Latency) وشبكة تسليم محتوى (CDN) عالية الاستقرار.",
          domain: "stream.com.ly",
          url: "https://stream.com.ly/",
          category: "بنية البث السحابي والوسائط",
          badge: "بث فائق السرعة",
          color: "from-foreground/60 via-foreground/35 to-foreground/75",
          metric: "< 1.2s زمن استجابة البث",
          techStack: ["WebRTC / HLS", "Edge CDN", "Adaptive Bitrate", "NVENC Transcoding"],
        },
        {
          id: "bit",
          title: "Bit.com.ly",
          subtitle: "بوابة التقنية وحلول البلوكتشين والتحويل الرقمي",
          description:
            "منصة تقنية تقود مسيرة التحول الرقمي وتقديم حلول الدفع المالي المبتكرة والبنية التحتية اللامركزية، وربط المؤسسات والشركات الناشئة بأحدث تقنيات الويب 3.0 السحابية.",
          domain: "bit.com.ly",
          url: "https://bit.com.ly/",
          category: "تحول رقمي وحلول مالية متقدمة",
          badge: "بنية رقمية متقدمة",
          color: "from-foreground/75 via-foreground/40 to-foreground/55",
          metric: "99.99% موثوقية البنية",
          techStack: ["Fintech APIs", "Docker Swarm", "Zero-Trust TLS", "High-Throughput DB"],
        },
        {
          id: "btc",
          title: "BTC.org.ly",
          subtitle: "مجتمع وتقنيات البتكوين في ليبيا (BTC Libya)",
          description:
            "البوابة المعرفية والتقنية الرائدة لنشر الوعي ببروتوكول شبكة البتكوين (Bitcoin) وشبكة البرق (Lightning Network)، وتقديم أدلة موثوقة ومؤشرات أمان رقمي مفتوحة المصدر.",
          domain: "btc.org.ly/en",
          url: "https://btc.org.ly/en",
          category: "بلوكتشين وتقنيات البتكوين",
          badge: "شبكة البتكوين الليبية",
          color: "from-foreground/55 via-foreground/30 to-foreground/70",
          metric: "24/7 مؤشرات وأدلة مفتوحة",
          techStack: ["Bitcoin Protocol", "Lightning LND", "Open-Source Docs", "Cryptographic P2P"],
        },
      ],
    },
    pricing: {
      badge: "باقات الخدمات والاستثمار الرقمي",
      title: "خيارات استثمار مصممة لنمو أعمالك",
      subtitle:
        "حلول شفافة ومدروسة تناسب كل مرحلة، بدءاً من الاستشارة المجانية والمبادرات الخيرية وصولاً إلى الهوية المتكاملة والأنظمة المخصصة.",
      selectPlan: "طلب هذه الباقة",
      popularTag: "الأكثر طلباً وتميزاً",
      requestQuote: "طلب تسعير خاص",
      plans: [
        {
          id: "consultation",
          name: "استشارة تقنية",
          tagline: "تحليل معمق لأفكارك التقنية والخطوات التنفيذية",
          price: "مجاناً",
          priceDetail: "بدون أي رسوم أو التزام مسبق",
          badge: "جلسة مجانية",
          badgeVariant: "emerald",
          features: [
            "تحليل متطلبات الفكرة ودراسة جدواها التقنية",
            "ترشيح حزمة البرمجيات والتقنيات الأنسب لمشروعك",
            "الرد التفصيلي والمناقشة خلال 1 إلى 3 أيام عمل",
            "مخطط هندسي أولي وتوصيات أمنية للتطبيق",
          ],
          ctaText: "احجز استشارتك المجانية",
        },
        {
          id: "noor",
          name: "مبادرة نور (وقف خيري)",
          tagline: "دعم رقمي مجاني للمساجد والمراكز القرآنية والجمعيات الخيرية",
          price: "مجاناً 100%",
          priceDetail: "وقف خيري دائم لوجه الله تعالى",
          badge: "وقف إسلامي خيري",
          badgeVariant: "emerald",
          features: [
            "مخصصة للمساجد ومراكز تحفيظ القرآن الكريم والهيئات الخيرية",
            "إعداد استضافة Blogger أو سحابية آمنة ومستقرة تماماً",
            "تصميم إسلامي راقٍ وبسيط متوافق مع كافة الهواتف",
            "حماية فائقة من الهجمات وتأمين الروابط الخارجية",
            "دعم فني وإشراف تقني متواصل مجاناً",
          ],
          ctaText: "التقديم للمبادرة الخيرية",
        },
        {
          id: "identity",
          name: "الهوية الرقمية",
          tagline: "الحل المتكامل الأكثر شمولاً للشركات والمشاريع التجارية الليبية",
          price: "500 د.ل",
          priceDetail: "دفعة أولى تأسيسية + 30 د.ل شهرياً فقط",
          featured: true,
          badge: "الباقة الأكثر طلباً",
          badgeVariant: "gold",
          features: [
            "حجز نطاق رسمي مخصص (.ly أو .com) مسجل باسمك",
            "استضافة سحابية عالية الأداء على Google Cloud العالمية",
            "تقارير وإحصائيات أداء وزوار شهرية شفافة",
            "جاهزية وتشغيل بنسبة 99.9% مع حماية 24/7",
            "شهادة أمان SSL مشفرة وتأمين ضد الثغرات",
            "بريد إلكتروني تجاري احترافي مرتبط بنطاقك",
            "دعم فني مباشر وفريق هندسي ليبي متخصص",
          ],
          ctaText: "امتلك هويتك الرقمية الآن",
        },
        {
          id: "custom",
          name: "حلول مخصصة",
          tagline: "أنظمة برمجية تفاعلية، ألعاب وتطبيقات خرائط بمواصفات حصرية",
          price: "حسب الطلب",
          priceDetail: "تسعير مخصص يطابق نطاق عملك الدقيق",
          badge: "أنظمة كبرى ومؤسسية",
          badgeVariant: "blue",
          features: [
            "تطبيقات تفاعلية متقدمة وأنظمة ويب ثلاثية الأبعاد (3D)",
            "تطوير ألعاب تفاعلية ومنصات محاكاة برمجية",
            "تطبيقات الخرائط الجغرافية المتقدمة ونظم المعلومات (GIS)",
            "ربط واجهات برمجة التطبيقات (APIs) وقواعد بيانات ضخمة",
            "لوحات تحكم إدارية شاملة للتحليلات وإدارة العمليات",
            "اتفاقية مستوى خدمة مخصصة (SLA) وأعلى درجات التشفير",
          ],
          ctaText: "اطلب عرض سعر مخصص",
        },
      ],
    },
    contact: {
      badge: "تواصل مع خبرائنا في طرابلس",
      title: "ابدأ رحلتك الرقمية نحو العالمية",
      subtitle:
        "سواء كنت بصدد إطلاق مشروع جديد، أو ترقية منصتك الحالية، فريق L.COM.LY في طرابلس، ليبيا على بعد رسالة واحدة منك.",
      infoTitle: "قنوات التواصل المباشرة",
      infoSubtitle: "مستعدون للإجابة على استفساراتكم ومناقشة تفاصيل مشاريعكم التقنية.",
      contactEmailLabel: "البريد الإلكتروني المعتمد",
      domainLabel: "البوابة الرقمية",
      locationLabel: "المقر الرئيسي",
      locationValue: "طرابلس، ليبيا — Tripoli, Libya",
      hoursLabel: "ساعات العمل والتواجد",
      hoursValue: "الأحد إلى الخميس: 9:00 ص - 6:00 م (الدعم الفني السحابي 24/7)",
      formTitle: "أرسل رسالتك وسنرد في الحال",
      nameLabel: "الاسم الكامل",
      namePlaceholder: "مثال: م. محمد الورفلي",
      emailLabel: "البريد الإلكتروني",
      emailPlaceholder: "name@company.com",
      phoneLabel: "رقم الهاتف / واتساب (اختياري)",
      phonePlaceholder: "+218 91 000 0000",
      planLabel: "الخدمة أو الباقة المرغوبة",
      messageLabel: "تفاصيل المشروع أو الاستفسار",
      messagePlaceholder: "صف لنا فكرتك، متطلباتك، والجدول الزمني المقترح لإنجاز المشروع...",
      termsLabel: "أوافق على سياسة الخصوصية وشروط معالجة البيانات الفنية من قِبل L.COM.LY",
      submitButton: "إرسال طلب المشروع الآن",
      submitting: "جارٍ إرسال البيانات وتشفيرها...",
      successTitle: "تم استلام طلبك بنجاح!",
      successMessage: "شكراً لاهتمامك. سيتواصل معك أحد مهندسينا خلال أقل من 24 ساعة عبر البريد الإلكتروني.",
      sendAnother: "إرسال استفسار آخر",
    },
    modal: {
      title: "طلب باقة رقمية مخصصة",
      description: "سيتم إرسال طلبك مباشرة إلى الفريق التقني لمراجعة متطلبات الباقة والتواصل معك.",
      selectedPackage: "الباقة المختارة:",
      nameLabel: "اسمك الكريم",
      namePlaceholder: "أدخل اسمك أو اسم المؤسسة",
      emailLabel: "البريد الإلكتروني للتواصل",
      emailPlaceholder: "you@example.com",
      notesLabel: "ملاحظات إضافية أو رابط مشروعك (اختياري)",
      notesPlaceholder: "اذكر أي تفاصيل تفضل مناقشتها معنا بخصوص الباقة...",
      confirmButton: "تأكيد طلب الباقة",
      cancelButton: "إلغاء",
      successAlert: "تم تسجيل رغبتك بالباقة بنجاح! سنتواصل معك للتنفيذ فوراً.",
    },
    footer: {
      rights: "جميع الحقوق محفوظة للبوابة الرقمية L.COM.LY © 2026",
      madeIn: "صُنع بكل فخر وشغف تقني في طرابلس، ليبيا",
      tripoliLibya: "طرابلس • ليبيا",
      quickLinks: "روابط سريعة",
      legal: "الشؤون القانونية والميثاق",
      privacy: "سياسة الخصوصية",
      terms: "شروط الخدمة",
      digitalHub: "المنصة الليبية للتطوير البرمجي والهندسة السحابية",
    },
  },
  en: {
    nav: {
      home: "Home",
      portfolio: "Portfolio",
      pricing: "Service Plans",
      about: "About Hub",
      contact: "Contact",
      startProject: "Start Project",
    },
    hero: {
      statusBadge: "Tripoli, Libya • طرابلس، ليبيا",
      statusDot: "Connected to Global Network",
      headlineMain: "L.COM.LY",
      headlineSub: "Your Digital Gateway to the World",
      description:
        "Libya's premier digital agency and engineering hub — bridging local vision with international scale through cutting-edge web architecture, high-performance cloud hosting, and enterprise-grade cybersecurity.",
      ctaPrimary: "Start Your Project",
      ctaSecondary: "Explore Portfolio",
      stats: {
        platforms: "10+",
        platformsLabel: "Active Platforms & Systems",
        uptime: "99.99%",
        uptimeLabel: "Cloud SLA & Reliability",
        support: "24/7",
        supportLabel: "Continuous Tech Oversight",
        infrastructure: "100%",
        infrastructureLabel: "Google Cloud Infrastructure",
      },
    },
    portfolio: {
      badge: "Curated Live Platforms & Engineering Deployments",
      title: "Featured Works & Real-Time Cyber Assets",
      subtitle:
        "Interactive preview frames of our live platforms, cloud architectures, and intelligence engines operating in production.",
      disclaimerTag: "Production Scope Notice",
      disclaimer:
        "These featured platforms represent a curated selection of our live digital ecosystem; our engineering hub actively manages and scales numerous other enterprise systems, proprietary tools, and private deployments.",
      visitSite: "Launch Live Site",
      previewCode: "Preview Box",
      liveTelemetry: "Live Interactive Sandbox",
      items: [
        {
          id: "toolseer",
          title: "Toolseer.com",
          subtitle: "Smart AI & Developer Utilities Discovery Engine",
          description:
            "A high-throughput search and curation portal indexing thousands of cutting-edge AI models, developer instruments, and workflow automation tools in a unified reactive workspace.",
          domain: "toolseer.com",
          url: "https://toolseer.com/",
          category: "AI Engines & Developer Discovery",
          badge: "AI Discovery Hub",
          color: "from-foreground/70 via-foreground/30 to-foreground/60",
          metric: "12,500+ Curated Tools",
          techStack: ["AI Engine", "Next.js 15", "Algolia Vector", "Cloudflare Workers"],
        },
        {
          id: "stream",
          title: "Stream.com.ly",
          subtitle: "Cloud Media & Ultra-Low Latency Streaming",
          description:
            "Enterprise-grade cloud broadcast infrastructure and resilient video CDN delivering sub-second live streaming, adaptive bitrate encoding, and scalable VOD playback across North Africa.",
          domain: "stream.com.ly",
          url: "https://stream.com.ly/",
          category: "Cloud Media & CDN Infrastructure",
          badge: "Ultra-Low Latency",
          color: "from-foreground/60 via-foreground/35 to-foreground/75",
          metric: "< 1.2s Broadcast Latency",
          techStack: ["WebRTC / HLS", "Edge CDN", "Adaptive Bitrate", "NVENC Transcoding"],
        },
        {
          id: "bit",
          title: "Bit.com.ly",
          subtitle: "Digital Transformation & Blockchain Innovation",
          description:
            "A visionary technology portal accelerating digital transformation, enterprise cloud adoption, and modern fintech rails for startups and commercial institutions across Libya.",
          domain: "bit.com.ly",
          url: "https://bit.com.ly/",
          category: "Fintech & Digital Transformation",
          badge: "Enterprise Gateway",
          color: "from-foreground/75 via-foreground/40 to-foreground/55",
          metric: "99.99% Enterprise SLA",
          techStack: ["Fintech APIs", "Docker Swarm", "Zero-Trust TLS", "High-Throughput DB"],
        },
        {
          id: "btc",
          title: "BTC.org.ly",
          subtitle: "Libyan Bitcoin Community & Educational Network",
          description:
            "The authoritative non-profit digital gateway and educational knowledge base demystifying the Bitcoin monetary protocol, Lightning Network routing, and open-source self-custody security.",
          domain: "btc.org.ly/en",
          url: "https://btc.org.ly/en",
          category: "Bitcoin Protocols & Cryptography",
          badge: "BTC Libya Network",
          color: "from-foreground/55 via-foreground/30 to-foreground/70",
          metric: "24/7 Decentralized Telemetry",
          techStack: ["Bitcoin Protocol", "Lightning LND", "Open-Source Docs", "Cryptographic P2P"],
        },
      ],
    },
    pricing: {
      badge: "Service Packages & Strategic Growth",
      title: "Transparent Investments Engineered for Impact",
      subtitle:
        "From complimentary architectural discovery and charitable endowments to fully managed corporate identities and custom enterprise solutions.",
      selectPlan: "Select This Plan",
      popularTag: "Most Popular Choice",
      requestQuote: "Request Bespoke Quote",
      plans: [
        {
          id: "consultation",
          name: "Tech Consultation",
          tagline: "In-depth strategic and architectural analysis for your tech concept",
          price: "Free",
          priceDetail: "Zero obligation & completely complimentary",
          badge: "Free Discovery",
          badgeVariant: "emerald",
          features: [
            "Technical feasibility assessment and feature scoping",
            "Software stack & cloud infrastructure recommendations",
            "Detailed engineer feedback within 1 to 3 business days",
            "Preliminary architectural blueprint & security roadmap",
          ],
          ctaText: "Book Free Consultation",
        },
        {
          id: "noor",
          name: "Noor Initiative (Endowment)",
          tagline: "Free digital enablement for mosques, Quran centers, and charities",
          price: "100% Free",
          priceDetail: "Perpetual charitable endowment (وقف خيري)",
          badge: "Charitable Initiative",
          badgeVariant: "emerald",
          features: [
            "Dedicated to mosques, Quran memorization centers & non-profits",
            "Secure, high-availability cloud or Blogger infrastructure",
            "Dignified, accessible Islamic responsive design",
            "Hardened security against cyber threats and downtime",
            "Ongoing voluntary tech maintenance and support",
          ],
          ctaText: "Apply for Noor Initiative",
        },
        {
          id: "identity",
          name: "Digital Identity",
          tagline: "The all-inclusive flagship launchpad for Libyan commercial enterprises",
          price: "500 LYD",
          priceDetail: "Initial setup fee + 30 LYD/Month ongoing",
          featured: true,
          badge: "Featured Business Pack",
          badgeVariant: "gold",
          features: [
            "Official custom domain registration (.ly or .com)",
            "High-speed global cloud hosting on Google Cloud infrastructure",
            "Comprehensive monthly performance and visitor analytics reports",
            "Guaranteed 99.9% uptime SLA with 24/7 security monitoring",
            "Free SSL certificate & full end-to-end encryption",
            "Official corporate email accounts matching your domain",
            "Direct local support from dedicated Libyan engineers",
          ],
          ctaText: "Launch Your Digital Identity",
        },
        {
          id: "custom",
          name: "Custom Solutions",
          tagline: "Interactive 3D environments, custom games, and GIS mapping apps",
          price: "Custom Quote",
          priceDetail: "Tailored scope pricing matching your exact project needs",
          badge: "Enterprise Grade",
          badgeVariant: "blue",
          features: [
            "Advanced web applications & interactive real-time 3D environments",
            "Interactive gamified systems and simulation engines",
            "Advanced GIS geospatial mapping and real-time telemetry",
            "Custom backend integrations, high-throughput APIs & databases",
            "Executive operations dashboards and granular user analytics",
            "Custom SLA agreement with ironclad data encryption",
          ],
          ctaText: "Request Custom Proposal",
        },
      ],
    },
    contact: {
      badge: "Connect With Our Hub in Tripoli",
      title: "Start Your Digital Journey Today",
      subtitle:
        "Whether you're launching a visionary venture or elevating existing digital infrastructure, the L.COM.LY engineering team is one message away.",
      infoTitle: "Direct Contact Channels",
      infoSubtitle: "Ready to discuss technical requirements, architecture, or timelines.",
      contactEmailLabel: "Official Email Address",
      domainLabel: "Digital Portal",
      locationLabel: "Headquarters",
      locationValue: "Tripoli, Libya — طرابلس، ليبيا",
      hoursLabel: "Working Hours",
      hoursValue: "Sunday - Thursday: 9:00 AM - 6:00 PM (Cloud monitoring 24/7)",
      formTitle: "Send a Message — We Respond Quickly",
      nameLabel: "Full Name",
      namePlaceholder: "e.g. Eng. Tarek Al-Fitouri",
      emailLabel: "Email Address",
      emailPlaceholder: "name@company.com",
      phoneLabel: "Phone / WhatsApp (Optional)",
      phonePlaceholder: "+218 91 000 0000",
      planLabel: "Desired Package / Service",
      messageLabel: "Project Details & Scope",
      messagePlaceholder: "Describe your concept, technical goals, and expected timeline...",
      termsLabel: "I agree to the privacy policy and data processing terms of L.COM.LY",
      submitButton: "Transmit Project Inquiry",
      submitting: "Encrypting and transmitting...",
      successTitle: "Inquiry Successfully Transmitted!",
      successMessage: "Thank you for reaching out. A senior engineer will review your request and reply within 24 hours.",
      sendAnother: "Send Another Inquiry",
    },
    modal: {
      title: "Order Digital Service Package",
      description: "Your inquiry will be routed directly to our lead architect for quick review and coordination.",
      selectedPackage: "Selected Package:",
      nameLabel: "Your Name",
      namePlaceholder: "Enter your full name or company name",
      emailLabel: "Contact Email",
      emailPlaceholder: "you@example.com",
      notesLabel: "Additional Scope Notes or Project URL (Optional)",
      notesPlaceholder: "Specify any custom requirements or questions about this plan...",
      confirmButton: "Confirm Plan Inquiry",
      cancelButton: "Cancel",
      successAlert: "Package inquiry submitted! We will reach out shortly.",
    },
    footer: {
      rights: "All Rights Reserved. L.COM.LY Digital Portal © 2026",
      madeIn: "Engineered with passion and precision in Tripoli, Libya",
      tripoliLibya: "Tripoli • Libya",
      quickLinks: "Quick Navigation",
      legal: "Legal & Governance",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      digitalHub: "The Libyan Flagship for Software Engineering & Cloud Solutions",
    },
  },
}

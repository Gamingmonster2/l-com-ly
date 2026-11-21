/**
 * يولّد صفحات مقالات HTML ثابتة من src/data/articles.json بعد بناء Vite.
 * الصفحات حقيقية على القرص (قابلة للزحف والفهرسة) وتستخدم نفس ملف CSS الخاص بالموقع.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const root = process.cwd()
const dist = join(root, "dist")
const articles = JSON.parse(readFileSync(join(root, "src/data/articles.json"), "utf8"))

const indexHtml = readFileSync(join(dist, "index.html"), "utf8")
const cssMatch = indexHtml.match(/href="(\/assets\/[^"]+\.css)"/)
if (!cssMatch) throw new Error("تعذّر العثور على ملف CSS المبني في dist/index.html")
const cssHref = cssMatch[1]

const SITE = "https://www.l.com.ly"
const WHATSAPP = "https://wa.me/218944119965"

const copy = {
  ar: {
    dir: "rtl",
    home: "الرئيسية",
    articles: "المقالات",
    allArticles: "كل المقالات",
    readArticle: "اقرأ المقال",
    minRead: "دقيقة قراءة",
    backHome: "العودة للصفحة الرئيسية",
    contactUs: "تواصل معنا",
    startProject: "لديك فكرة؟ لنبدأ بها",
    startProjectText: "أرسل لنا رسالة قصيرة وسنرد عليك ببداية واضحة، والاستشارة الأولى مجانية.",
    related: "اقرأ أيضاً",
    indexTitle: "مقالات L.COM.LY — كيف نبني المواقع ونخدم عملاءنا",
    indexDesc: "مقالات عملية تشرح طريقة عملنا في تصميم المواقع، تسليم المصدر على GitHub، النشر على Cloudflare، تحسين محركات البحث، والذكاء الاصطناعي.",
    cookieText: "نستخدم ملفات تعريف الارتباط لتحليل الزيارات فقط بعد موافقتك.",
    accept: "أوافق",
    decline: "رفض التحليلات",
    date: (d) => {
      const [y, m, day] = d.split("-")
      const months = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]
      return `${Number(day)} ${months[Number(m) - 1]} ${y}`
    },
  },
  en: {
    dir: "ltr",
    home: "Home",
    articles: "Articles",
    allArticles: "All articles",
    readArticle: "Read article",
    minRead: "min read",
    backHome: "Back to homepage",
    contactUs: "Contact us",
    startProject: "Have an idea? Let's build it",
    startProjectText: "Send us a short message and we will reply with a clear starting point. The first consultation is free.",
    related: "Read also",
    indexTitle: "L.COM.LY Articles — How We Build Websites and Serve Clients",
    indexDesc: "Practical articles about our website design process, GitHub source delivery, Cloudflare publishing, SEO and honest AI-assisted development.",
    cookieText: "We use cookies for analytics only after your consent.",
    accept: "Accept",
    decline: "Decline analytics",
    date: (d) => {
      const [y, m, day] = d.split("-")
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      return `${months[Number(m) - 1]} ${Number(day)}, ${y}`
    },
  },
}

const esc = (value) => String(value)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")

const jsonLd = (data) => JSON.stringify(data).replace(/</g, "\\u003c")

function renderBlocks(blocks) {
  return blocks.map((block) => {
    if (block.type === "h2") return `<h2 class="mt-10 mb-3 text-xl font-bold text-foreground sm:text-2xl">${esc(block.text)}</h2>`
    if (block.type === "quote") {
      return `<blockquote class="my-8 border-s-4 border-foreground/25 bg-foreground/[0.05] px-5 py-4 text-sm leading-relaxed text-foreground/80">${esc(block.text)}</blockquote>`
    }
    if (block.type === "list") {
      const items = (block.items || []).map((item) => `<li class="leading-relaxed">${esc(item)}</li>`).join("")
      return `<ul class="my-5 list-disc space-y-2 ps-6 text-sm leading-relaxed text-foreground/80">${items}</ul>`
    }
    return `<p class="mb-5 text-sm leading-loose text-foreground/80 sm:text-base">${esc(block.text)}</p>`
  }).join("\n")
}

function shell({ lang, title, description, keywords, canonical, ld, body }) {
  const c = copy[lang]
  return `<!doctype html>
<html lang="${lang}" dir="${c.dir}" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="keywords" content="${esc(keywords)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="L.COM.LY">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:locale" content="${lang === "ar" ? "ar_AR" : "en_US"}">
  <link rel="icon" type="image/svg+xml" href="/logo.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${cssHref}">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-R3ZC7B10TV"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('consent', 'default', { ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied', analytics_storage:'denied' });
    gtag('config', 'G-R3ZC7B10TV');
  </script>
  <script type="application/ld+json">${jsonLd(ld)}</script>
</head>
<body class="bg-background text-foreground antialiased selection:bg-foreground selection:text-background min-h-screen">
  <header class="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
    <div class="mx-auto flex max-w-4xl items-center justify-between px-5 py-4">
      <a href="/" class="flex items-center gap-2.5 font-black tracking-wide text-foreground">
        <span class="flex size-9 items-center justify-center rounded-xl border border-foreground/20 bg-foreground/[0.06] text-lg">L</span>
        <span>L.COM.LY</span>
      </a>
      <nav class="flex items-center gap-4 text-xs font-bold text-muted-foreground">
        <a class="hover:text-foreground" href="/">${c.home}</a>
        <a class="hover:text-foreground" href="${lang === "en" ? "/articles/en/" : "/articles/"}">${c.articles}</a>
        <a class="hover:text-foreground" href="/#contact">${c.contactUs}</a>
      </nav>
    </div>
  </header>

  <main class="mx-auto max-w-4xl px-5 py-12 sm:py-16">${body}</main>

  <footer class="border-t border-border/70 py-10 text-center text-xs text-muted-foreground">
    <p>© ${new Date().getFullYear()} L.COM.LY — ${lang === "ar" ? "بوابة ليبيا الرقمية" : "Libya Digital Hub"}</p>
    <p class="mt-2"><a class="underline" href="mailto:info@l.com.ly">info@l.com.ly</a> · <a class="underline" href="${WHATSAPP}" target="_blank" rel="noopener">WhatsApp</a></p>
  </footer>

  <div id="lcom-consent" class="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-2xl border border-border bg-card p-4 text-xs shadow-2xl">
    <p class="mb-3 leading-relaxed text-muted-foreground">${c.cookieText}</p>
    <div class="flex gap-2">
      <button id="lcom-accept" class="rounded-xl bg-foreground px-4 py-2 font-bold text-background">${c.accept}</button>
      <button id="lcom-decline" class="rounded-xl border border-border px-4 py-2 font-bold text-foreground">${c.decline}</button>
    </div>
  </div>
  <script>
    (function () {
      var box = document.getElementById('lcom-consent');
      var stored = null;
      try { stored = localStorage.getItem('lcom_consent'); } catch (e) {}
      if (stored === 'granted' || stored === 'denied') { box.remove(); return; }
      function decide(value) {
        try { localStorage.setItem('lcom_consent', value); } catch (e) {}
        if (typeof window.gtag === 'function') {
          window.gtag('consent', 'update', {
            ad_storage: value, ad_user_data: value, ad_personalization: value, analytics_storage: value
          });
        }
        if (value === 'granted' && !document.getElementById('lcom-cf')) {
          var s = document.createElement('script');
          s.id = 'lcom-cf';
          s.defer = true;
          s.src = 'https://static.cloudflareinsights.com/beacon.min.js/vce701823e78c4301a35b7e07294d87301792088814092';
          s.setAttribute('data-cf-beacon', '{"token":"34b448a27e2a4082b3b71e3d4cd16d65"}');
          document.head.appendChild(s);
        }
        box.remove();
      }
      document.getElementById('lcom-accept').addEventListener('click', function () { decide('granted'); });
      document.getElementById('lcom-decline').addEventListener('click', function () { decide('denied'); });
    })();
  </script>
</body>
</html>
`
}

function writePage(path, html) {
  const dir = join(dist, path)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, "index.html"), html)
  console.log(`generated /${path}index.html`)
}

for (const lang of ["ar", "en"]) {
  const c = copy[lang]
  const base = lang === "en" ? "articles/en" : "articles"
  const prefix = lang === "en" ? "/articles/en/" : "/articles/"

  const listBody = `
    <p class="mb-3 inline-block rounded-full border border-foreground/15 bg-foreground/[0.06] px-3 py-1 text-xs font-bold text-foreground/80">${c.articles}</p>
    <h1 class="mb-4 text-3xl font-black tracking-tight text-foreground sm:text-4xl">${esc(c.indexTitle)}</h1>
    <p class="mb-10 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">${esc(c.indexDesc)}</p>
    <div class="grid gap-5 sm:grid-cols-2">
      ${articles.map((a) => `
        <a href="${prefix}${a.slug}/" class="group rounded-2xl border border-border/80 bg-card/60 p-5 transition-colors hover:border-foreground/25">
          <p class="mb-2 text-[11px] font-bold text-muted-foreground">${esc(lang === "ar" ? a.category.ar : a.category.en)} · ${esc(c.date(a.date))}</p>
          <h2 class="mb-2 text-lg font-bold leading-snug text-foreground group-hover:underline">${esc(lang === "ar" ? a.title.ar : a.title.en)}</h2>
          <p class="mb-3 text-xs leading-relaxed text-muted-foreground">${esc(lang === "ar" ? a.excerpt.ar : a.excerpt.en)}</p>
          <span class="text-xs font-bold text-foreground">${c.readArticle} →</span>
        </a>`).join("")}
    </div>`

  writePage(base, shell({
    lang,
    title: c.indexTitle,
    description: c.indexDesc,
    keywords: lang === "ar" ? "مقالات L.COM.LY، تصميم مواقع ليبيا، SEO ليبيا، تسليم GitHub" : "L.COM.LY articles, website design Libya, SEO Libya, GitHub delivery",
    canonical: `${SITE}${prefix}`,
    ld: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: c.indexTitle,
      description: c.indexDesc,
      url: `${SITE}${prefix}`,
      mainEntity: articles.map((a) => ({
        "@type": "Article",
        headline: lang === "ar" ? a.title.ar : a.title.en,
        url: `${SITE}${prefix}${a.slug}/`,
        datePublished: a.date,
      })),
    },
    body: listBody,
  }))

  for (const article of articles) {
    const title = lang === "ar" ? article.title.ar : article.title.en
    const excerpt = lang === "ar" ? article.excerpt.ar : article.excerpt.en
    const category = lang === "ar" ? article.category.ar : article.category.en
    const url = `${SITE}${prefix}${article.slug}/`
    const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3)

    const body = `
      <nav class="mb-8 text-xs text-muted-foreground">
        <a href="/" class="hover:text-foreground">${c.home}</a> / <a href="${prefix}" class="hover:text-foreground">${c.articles}</a> / <span>${esc(category)}</span>
      </nav>
      <p class="mb-3 inline-block rounded-full border border-foreground/15 bg-foreground/[0.06] px-3 py-1 text-xs font-bold text-foreground/80">${esc(category)}</p>
      <h1 class="mb-5 text-3xl font-black leading-tight tracking-tight text-foreground sm:text-4xl">${esc(title)}</h1>
      <p class="mb-6 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span>${esc(c.date(article.date))}</span>
        <span>·</span>
        <span>${article.readMinutes} ${c.minRead}</span>
        <span>·</span>
        <span>L.COM.LY</span>
      </p>
      <p class="mb-9 border-s-4 border-foreground/20 ps-5 text-base font-medium leading-relaxed text-foreground/80">${esc(excerpt)}</p>

      <article>${renderBlocks(article.body[lang])}</article>

      <div class="mt-12 rounded-2xl border border-border/80 bg-foreground/[0.04] p-6">
        <h2 class="mb-2 text-lg font-bold text-foreground">${c.startProject}</h2>
        <p class="mb-4 text-sm leading-relaxed text-muted-foreground">${c.startProjectText}</p>
        <a href="/#contact" class="inline-block rounded-xl bg-foreground px-5 py-2.5 text-sm font-bold text-background">${c.contactUs}</a>
      </div>

      <section class="mt-12">
        <h2 class="mb-4 text-lg font-bold text-foreground">${c.related}</h2>
        <div class="grid gap-3 sm:grid-cols-3">
          ${related.map((a) => `
            <a href="${prefix}${a.slug}/" class="rounded-xl border border-border/80 p-4 text-xs font-bold leading-snug text-foreground hover:border-foreground/25">
              ${esc(lang === "ar" ? a.title.ar : a.title.en)}
            </a>`).join("")}
        </div>
      </section>`

    writePage(`${base}/${article.slug}`, shell({
      lang,
      title: `${title} — L.COM.LY`,
      description: excerpt,
      keywords: lang === "ar" ? article.keywords.ar : article.keywords.en,
      canonical: url,
      ld: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description: excerpt,
        datePublished: article.date,
        dateModified: article.date,
        keywords: lang === "ar" ? article.keywords.ar : article.keywords.en,
        inLanguage: lang,
        author: { "@type": "Organization", name: "L.COM.LY", url: SITE },
        publisher: { "@type": "Organization", name: "L.COM.LY", url: SITE },
        mainEntityOfPage: url,
        url,
      },
      body,
    }))
  }
}

console.log(`Generated ${articles.length * 2} article pages + 2 index pages.`)

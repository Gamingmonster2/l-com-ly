import { useState, useEffect } from "react"
import type { Language } from "@/data/translations"
import { translations } from "@/data/translations"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Portfolio } from "@/components/portfolio"
import { Pricing } from "@/components/pricing"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { PlanModal } from "@/components/plan-modal"
import { CookieConsent } from "@/components/cookie-consent"
import { ChatWidget } from "@/components/chat-widget"
import { BrandIntro } from "@/components/brand-intro"

export function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem("l_lang")
    return (saved === "en" ? "en" : "ar") as Language
  })

  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem("l_theme")
    return saved !== null ? saved === "dark" : true
  })

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<{
    id: string
    name: string
    price: string
  } | null>(null)

  // Sync RTL / LTR and fonts
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute("lang", lang)
    root.setAttribute("dir", lang === "ar" ? "rtl" : "ltr")
    localStorage.setItem("l_lang", lang)
  }, [lang])

  // Sync Dark / Light theme
  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add("dark")
      localStorage.setItem("l_theme", "dark")
    } else {
      root.classList.remove("dark")
      localStorage.setItem("l_theme", "light")
    }
  }, [isDark])

  const t = translations[lang]

  const handleSelectPlan = (plan: { id: string; name: string; price: string }) => {
    setSelectedPlan(plan)
    setModalOpen(true)
  }

  const handleOpenConsultation = () => {
    const defaultPlan = t.pricing.plans[0]
    setSelectedPlan({
      id: defaultPlan.id,
      name: defaultPlan.name,
      price: defaultPlan.price,
    })
    setModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Sticky Glassmorphic Navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        isDark={isDark}
        setIsDark={setIsDark}
        t={t}
        onOpenConsultation={handleOpenConsultation}
      />

      {/* Main Single Page Content */}
      <main>
        <Hero
          lang={lang}
          isDark={isDark}
          t={t}
          onOpenConsultation={handleOpenConsultation}
        />

        <Portfolio lang={lang} t={t} />

        <Pricing
          lang={lang}
          t={t}
          onSelectPlan={handleSelectPlan}
        />

        <Contact lang={lang} t={t} />
      </main>

      {/* Footer */}
      <Footer lang={lang} t={t} />

      {/* Interactive shadcn/ui Dialog Plan Modal */}
      <PlanModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedPlan={selectedPlan}
        lang={lang}
        t={t}
      />

      {/* Magic UI brand intro — shows once per session, auto-dismisses */}
      <BrandIntro />

      {/* Ported legacy features: consent banner + live chat */}
      <CookieConsent lang={lang} />
      <ChatWidget lang={lang} />
    </div>
  )
}

export default App

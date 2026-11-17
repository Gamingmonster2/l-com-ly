import { useState, useEffect } from "react"
import type { Language, TranslationData } from "@/data/translations"
import { Button } from "@/components/ui/button"
import {
  Sun,
  Moon,
  Globe2,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  ArrowLeft,
} from "lucide-react"

interface NavbarProps {
  lang: Language
  setLang: (lang: Language) => void
  isDark: boolean
  setIsDark: (dark: boolean) => void
  t: TranslationData
  onOpenConsultation: () => void
}

export function Navbar({
  lang,
  setLang,
  isDark,
  setIsDark,
  t,
  onOpenConsultation,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleLanguage = () => {
    const nextLang = lang === "ar" ? "en" : "ar"
    setLang(nextLang)
  }

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 glass border-b border-border/80 shadow-md shadow-foreground/[0.03]"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("hero")
            }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-foreground via-foreground/70 to-foreground/70 p-[2px] shadow-lg shadow-foreground/[0.08] group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-background rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <span className="text-foreground font-black text-xl tracking-tighter">
                  L
                </span>
                <span className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-foreground animate-ping" />
                <span className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-foreground" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-wider text-foreground group-hover:text-foreground transition-colors">
                L.COM.LY
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold -mt-1">
                {lang === "ar" ? "بوابة ليبيا الرقمية" : "Libya Digital Hub"}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 rounded-full px-4 py-1.5 glass-card shadow-sm border border-border/60">
            <button
              onClick={() => scrollToSection("hero")}
              className="px-3.5 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 rounded-full transition-colors"
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="px-3.5 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 rounded-full transition-colors"
            >
              {t.nav.portfolio}
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="px-3.5 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 rounded-full transition-colors"
            >
              {t.nav.pricing}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-3.5 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 rounded-full transition-colors"
            >
              {t.nav.contact}
            </button>
          </nav>

          {/* Right Controls: Language toggle + Theme switch + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border-border/80 text-xs font-bold hover:border-foreground/25"
              title={lang === "ar" ? "Switch to English" : "التبديل إلى العربية"}
            >
              <Globe2 className="w-3.5 h-3.5 text-foreground" />
              <span>{lang === "ar" ? "English" : "العربية"}</span>
            </Button>

            {/* Dark/Light Switcher */}
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full w-9 h-9 border-border/80 hover:border-foreground/25"
              title={isDark ? "Switch to Light Mode" : "التبديل إلى الوضع الليلي"}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-foreground/70" />
              ) : (
                <Moon className="w-4 h-4 text-foreground" />
              )}
            </Button>

            {/* Action Button */}
            <Button
              variant="gradient"
              size="sm"
              onClick={onOpenConsultation}
              className="rounded-full px-5 py-2 shadow-md flex items-center gap-1.5 group"
            >
              <Sparkles className="w-3.5 h-3.5 text-foreground/60" />
              <span>{t.nav.startProject}</span>
              {lang === "ar" ? (
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              ) : (
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              )}
            </Button>
          </div>

          {/* Mobile Right Controls: Hamburger + Lang + Theme */}
          <div className="flex lg:hidden items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full w-8 h-8"
            >
              {isDark ? (
                <Sun className="w-3.5 h-3.5 text-foreground/70" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-foreground" />
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="rounded-full px-2.5 h-8 text-xs font-bold"
            >
              {lang === "ar" ? "EN" : "عربي"}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-full w-9 h-9"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 rounded-2xl glass border border-border/80 p-4 shadow-xl flex flex-col gap-2 animate-in fade-in slide-in-from-top-3">
            <button
              onClick={() => scrollToSection("hero")}
              className="w-full text-start px-4 py-2.5 rounded-xl font-medium text-foreground hover:bg-accent/60 transition-colors"
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="w-full text-start px-4 py-2.5 rounded-xl font-medium text-foreground hover:bg-accent/60 transition-colors"
            >
              {t.nav.portfolio}
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="w-full text-start px-4 py-2.5 rounded-xl font-medium text-foreground hover:bg-accent/60 transition-colors"
            >
              {t.nav.pricing}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="w-full text-start px-4 py-2.5 rounded-xl font-medium text-foreground hover:bg-accent/60 transition-colors"
            >
              {t.nav.contact}
            </button>

            <div className="pt-2 border-t border-border/60">
              <Button
                variant="gradient"
                className="w-full rounded-xl py-3 justify-center"
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenConsultation()
                }}
              >
                <Sparkles className="w-4 h-4 me-2 text-foreground/60" />
                {t.nav.startProject}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

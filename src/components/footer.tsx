import type { Language, TranslationData } from "@/data/translations"
import { Globe, Heart, Shield, ArrowUp } from "lucide-react"

interface FooterProps {
  lang: Language
  t: TranslationData
}

export function Footer({ t }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <footer className="relative border-t border-border/80 bg-background/80 backdrop-blur-md pt-16 pb-12 overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="pointer-events-none absolute bottom-0 start-1/2 -translate-x-1/2 w-3/4 h-28 bg-gradient-to-t from-foreground/[0.06] to-transparent blur-3xl" />

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-border/60">
          {/* Brand info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-foreground via-foreground/70 to-foreground/70 p-[2px]">
                <div className="w-full h-full bg-background rounded-[10px] flex items-center justify-center">
                  <span className="text-foreground font-black text-lg">L</span>
                </div>
              </div>
              <span className="text-xl font-black text-foreground tracking-wider">
                L.COM.LY
              </span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              {t.footer.digitalHub}
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-foreground/80">
              <span className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
              <span>{t.footer.tripoliLibya}</span>
              <span className="text-muted-foreground">• info@l.com.ly</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button
                  onClick={() => scrollToSection("hero")}
                  className="hover:text-foreground transition-colors"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("portfolio")}
                  className="hover:text-foreground transition-colors"
                >
                  {t.nav.portfolio}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("pricing")}
                  className="hover:text-foreground transition-colors"
                >
                  {t.nav.pricing}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="hover:text-foreground transition-colors"
                >
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Legal and Network */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              {t.footer.legal}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-foreground" />
                <span>{t.footer.privacy}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                <span>{t.footer.terms}</span>
              </li>
              <li className="text-xs text-muted-foreground pt-1">
                ASN: AS-LIBYA-CLOUD • TLS 1.3 Certified
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>{t.footer.rights}</p>

          <div className="flex items-center gap-2">
            <span>{t.footer.madeIn}</span>
            <Heart className="w-3.5 h-3.5 text-foreground fill-foreground inline" />
          </div>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl border border-border/80 hover:bg-muted transition-colors flex items-center gap-1"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}

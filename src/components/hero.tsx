import type { Language, TranslationData } from "@/data/translations"
import { Globe } from "@/components/magicui/globe"
import { BlurFade } from "@/components/magicui/blur-fade"
import { TextAnimate } from "@/components/magicui/text-animate"
import { DotPattern } from "@/components/magicui/dot-pattern"
import { RetroGrid } from "@/components/magicui/retro-grid"
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text"
import { Button } from "@/components/ui/button"
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Layers,
  ShieldCheck,
  Zap,
  Globe2,
  Server,
} from "lucide-react"

interface HeroProps {
  lang: Language
  isDark: boolean
  t: TranslationData
  onOpenConsultation: () => void
}

export function Hero({ lang, isDark, t, onOpenConsultation }: HeroProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-28 pb-16 flex items-center justify-center overflow-hidden"
    >
      {/* Background Patterns: DotPattern & RetroGrid */}
      <DotPattern
        width={32}
        height={32}
        cx={1.5}
        cy={1.5}
        cr={1.2}
        glow
        className="opacity-40"
      />
      <RetroGrid angle={70} className="opacity-25" />

      {/* Cyber Ambient Radial Glows */}
      <div className="pointer-events-none absolute top-1/4 -start-20 w-96 h-96 bg-foreground/[0.06] rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 -end-20 w-96 h-96 bg-foreground/[0.06] rounded-full blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-foreground/[0.03] rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left / Primary Content Column */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-start">
            {/* Status Badge with Live Green Pulse Dot & Magic UI AnimatedShinyText */}
            <BlurFade delay={0.05} yOffset={10}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-foreground/15 bg-foreground/[0.03] dark:bg-foreground/[0.04] text-xs font-semibold shadow-sm mb-6 backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-foreground"></span>
                </span>
                <span className="text-foreground/90 font-medium tracking-wide">
                  {t.hero.statusBadge}
                </span>
                <span className="hidden sm:inline text-muted-foreground/40">|</span>
                <AnimatedShinyText className="hidden sm:inline text-foreground dark:text-foreground/80 text-[11px] font-mono">
                  {t.hero.statusDot}
                </AnimatedShinyText>
              </div>
            </BlurFade>

            {/* Main Headline with TextAnimate */}
            <BlurFade delay={0.12} yOffset={14}>
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-foreground">
                    <span className="shimmer-text">L.COM.LY</span>
                  </h1>
                  <span className="px-2.5 py-1 text-xs font-mono font-bold uppercase rounded-md bg-foreground/[0.06] text-foreground dark:text-foreground/80 border border-foreground/10">
                    HUB v2.6
                  </span>
                </div>

                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground/90 mt-2">
                  <TextAnimate
                    text={t.hero.headlineSub}
                    type="words"
                    delay={0.2}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/70 to-foreground dark:from-foreground/80 dark:via-foreground/60 dark:to-foreground/80"
                  />
                </div>
              </div>
            </BlurFade>

            {/* Description */}
            <BlurFade delay={0.2} yOffset={12}>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-8">
                {t.hero.description}
              </p>
            </BlurFade>

            {/* Primary & Secondary CTAs */}
            <BlurFade delay={0.28} yOffset={10}>
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
                <Button
                  size="lg"
                  variant="gradient"
                  onClick={onOpenConsultation}
                  className="w-full sm:w-auto rounded-2xl px-7 py-3.5 text-base font-bold shadow-xl shadow-foreground/[0.06] group hover:shadow-foreground/[0.12] transition-all"
                >
                  <Sparkles className="w-5 h-5 me-2 text-foreground/60 group-hover:rotate-12 transition-transform" />
                  <span>{t.hero.ctaPrimary}</span>
                  {lang === "ar" ? (
                    <ArrowLeft className="w-4 h-4 ms-2 group-hover:-translate-x-1 transition-transform" />
                  ) : (
                    <ArrowRight className="w-4 h-4 ms-2 group-hover:translate-x-1 transition-transform" />
                  )}
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection("portfolio")}
                  className="w-full sm:w-auto rounded-2xl px-7 py-3.5 text-base font-semibold border-border hover:border-foreground/25 hover:bg-accent/60"
                >
                  <Layers className="w-5 h-5 me-2 text-foreground" />
                  <span>{t.hero.ctaSecondary}</span>
                </Button>
              </div>
            </BlurFade>

            {/* Key Metrics / Stats Row */}
            <BlurFade delay={0.35} yOffset={10} className="w-full">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-border/60 w-full">
                <div className="flex flex-col p-3 rounded-xl glass-card text-center sm:text-start">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-foreground mb-1">
                    <Zap className="w-4 h-4" />
                    <span className="text-xl sm:text-2xl font-black text-foreground">
                      {t.hero.stats.platforms}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">
                    {t.hero.stats.platformsLabel}
                  </span>
                </div>

                <div className="flex flex-col p-3 rounded-xl glass-card text-center sm:text-start">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-foreground mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-xl sm:text-2xl font-black text-foreground">
                      {t.hero.stats.uptime}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">
                    {t.hero.stats.uptimeLabel}
                  </span>
                </div>

                <div className="flex flex-col p-3 rounded-xl glass-card text-center sm:text-start">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-foreground/80 mb-1">
                    <Globe2 className="w-4 h-4" />
                    <span className="text-xl sm:text-2xl font-black text-foreground">
                      {t.hero.stats.support}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">
                    {t.hero.stats.supportLabel}
                  </span>
                </div>

                <div className="flex flex-col p-3 rounded-xl glass-card text-center sm:text-start">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-muted-foreground mb-1">
                    <Server className="w-4 h-4" />
                    <span className="text-xl sm:text-2xl font-black text-foreground">
                      {t.hero.stats.infrastructure}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">
                    {t.hero.stats.infrastructureLabel}
                  </span>
                </div>
              </div>
            </BlurFade>
          </div>

          {/* Right Column: Magic UI Interactive Globe */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <BlurFade delay={0.2} yOffset={20} className="w-full">
              <div className="relative w-full max-w-[480px] mx-auto flex flex-col items-center">
                {/* Globe Container with decorative rings */}
                <div className="relative w-full aspect-square flex items-center justify-center">
                  {/* Decorative orbital rings */}
                  <div className="absolute inset-2 rounded-full border border-foreground/10 border-dashed animate-[spin_60s_linear_infinite] pointer-events-none" />
                  <div className="absolute inset-8 rounded-full border border-foreground/10 pointer-events-none" />
                  <div className="absolute inset-14 rounded-full border border-foreground/10 border-dotted animate-[spin_40s_linear_infinite_reverse] pointer-events-none" />

                  {/* 3D Interactive Cobe Globe */}
                  <Globe isDark={isDark} className="w-full h-full" />
                </div>

                {/* Telemetry pill under globe */}
                <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-border/80 text-[11px] font-mono text-muted-foreground shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
                  <span>Tripoli: 32.8872° N, 13.1913° E</span>
                  <span className="text-foreground font-sans font-medium">
                    {lang === "ar" ? "• اسحب لتدوير الكرة" : "• Drag to rotate"}
                  </span>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  )
}

import type { Language, TranslationData } from "@/data/translations"
import { motion, useReducedMotion } from "framer-motion"
import { Safari } from "@/components/magicui/safari"
import { BorderBeam } from "@/components/magicui/border-beam"
import { BlurFade } from "@/components/magicui/blur-fade"
import { MagicCard } from "@/components/magicui/magic-card"
import { DotPattern } from "@/components/magicui/dot-pattern"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ExternalLink, Layers, MousePointerClick, Sparkles } from "lucide-react"

interface PortfolioProps {
  lang: Language
  t: TranslationData
}

const previewVariants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.045, y: -8 },
}

const overlayVariants = {
  rest: { opacity: 0, y: 8 },
  hover: { opacity: 1, y: 0 },
}

export function Portfolio({ t }: PortfolioProps) {
  const reduceMotion = useReducedMotion()

  return (
    <section id="portfolio" className="relative py-28 scroll-mt-20 overflow-hidden">
      {/* Neutral cinematic ambience */}
      <div className="pointer-events-none absolute top-1/4 start-1/4 h-96 w-96 rounded-full bg-foreground/[0.045] blur-[140px]" />
      <div className="pointer-events-none absolute bottom-1/4 end-1/4 h-96 w-96 rounded-full bg-foreground/[0.05] blur-[140px]" />
      <DotPattern className="opacity-30" cr={0.7} />

      <div className="relative z-10 mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <BlurFade delay={0.05} yOffset={8}>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/[0.06] px-3.5 py-1 text-xs font-semibold text-foreground/80 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-foreground" />
              <span>{t.portfolio.badge}</span>
            </div>
          </BlurFade>

          <BlurFade delay={0.1} yOffset={10}>
            <h2 className="mb-4 text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {t.portfolio.title}
            </h2>
          </BlurFade>

          <BlurFade delay={0.15} yOffset={10}>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t.portfolio.subtitle}
            </p>
          </BlurFade>
        </div>

        <BlurFade delay={0.2} yOffset={10}>
          <div className="mx-auto mb-12 flex max-w-4xl flex-col items-center gap-3.5 rounded-2xl border border-foreground/15 bg-foreground/[0.025] p-4 text-center shadow-md sm:flex-row sm:p-5 sm:text-start">
            <div className="shrink-0 rounded-xl bg-foreground/[0.08] p-2.5 text-foreground">
              <Layers className="h-5 w-5" />
            </div>
            <div className="space-y-0.5">
              <span className="block text-xs font-bold uppercase tracking-wider text-foreground/70">
                {t.portfolio.disclaimerTag}
              </span>
              <p className="text-xs font-medium leading-relaxed text-foreground/85 sm:text-sm">
                {t.portfolio.disclaimer}
              </p>
            </div>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          {t.portfolio.items.map((item, index) => (
            <BlurFade key={item.id} delay={0.15 + index * 0.08} yOffset={16} className="h-full">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.title} — ${t.portfolio.visitSite}`}
                className="block h-full rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <MagicCard
                  gradientSize={280}
                  gradientColor="oklch(0.8 0 0)"
                  gradientOpacity={0.16}
                  className="h-full rounded-3xl border-border/80 p-5 shadow-lg transition-all duration-300 hover:border-foreground/25 hover:shadow-2xl sm:p-6"
                >
                  <BorderBeam
                    size={240}
                    duration={8}
                    delay={index * 1.5}
                    borderWidth={1.25}
                    colorFrom="#525252"
                    colorTo="#FAFAFA"
                  />

                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-black text-foreground sm:text-2xl">
                          {item.title}
                        </h3>
                        <Badge
                          variant="outline"
                          className="border-border bg-background/80 text-[10px] font-semibold"
                        >
                          {item.badge}
                        </Badge>
                      </div>
                      <p className="text-xs font-semibold text-foreground/70">{item.subtitle}</p>
                    </div>
                    <span className="shrink-0 rounded-xl bg-muted/80 p-2.5 text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {item.description}
                  </p>

                  <div className="relative mt-5 overflow-hidden rounded-2xl shadow-xl shadow-black/30">
                    <Safari url={item.domain} showOpenLink={false}>
                      <motion.div
                        initial="rest"
                        animate="rest"
                        whileHover={reduceMotion ? undefined : "hover"}
                        className="relative aspect-[16/10] overflow-hidden bg-zinc-950"
                      >
                        <motion.img
                          src={item.screenshot}
                          alt={`${item.title} — ${item.subtitle}`}
                          variants={previewVariants}
                          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full w-full object-cover object-top"
                        />
                        <motion.div
                          variants={overlayVariants}
                          transition={{ duration: 0.4 }}
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"
                        />
                        <motion.div
                          variants={overlayVariants}
                          transition={{ duration: 0.4, delay: 0.05 }}
                          className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-3"
                        >
                          <span
                            dir="ltr"
                            className="truncate rounded-md bg-black/55 px-2 py-1 font-mono text-[10px] text-zinc-100 backdrop-blur-sm"
                          >
                            {item.domain}
                          </span>
                          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-white/90 px-2 py-1 text-[10px] font-bold text-zinc-900 backdrop-blur-sm">
                            <ExternalLink className="h-3 w-3" />
                            <span className="hidden sm:inline">{t.portfolio.visitSite}</span>
                          </span>
                        </motion.div>
                      </motion.div>
                    </Safari>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/60 pt-4">
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {item.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-foreground/80">
                      <MousePointerClick className="h-3.5 w-3.5" />
                      {t.portfolio.visitSite}
                    </span>
                  </div>
                </MagicCard>
              </a>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}

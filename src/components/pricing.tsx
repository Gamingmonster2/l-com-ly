import type { Language, TranslationData } from "@/data/translations"
import { BlurFade } from "@/components/magicui/blur-fade"
import { BorderBeam } from "@/components/magicui/border-beam"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Check,
  Sparkles,
  HelpCircle,
  Heart,
  Crown,
  Cpu,
  ArrowRight,
  ArrowLeft,
  Flame,
} from "lucide-react"

interface PricingProps {
  lang: Language
  t: TranslationData
  onSelectPlan: (plan: { id: string; name: string; price: string }) => void
}

export function Pricing({ lang, t, onSelectPlan }: PricingProps) {
  const getPlanIcon = (id: string) => {
    switch (id) {
      case "consultation":
        return <HelpCircle className="w-5 h-5 text-foreground" />
      case "noor":
        return <Heart className="w-5 h-5 text-foreground" />
      case "identity":
        return <Crown className="w-5 h-5 text-foreground/80" />
      case "custom":
        return <Cpu className="w-5 h-5 text-muted-foreground" />
      default:
        return <Sparkles className="w-5 h-5 text-foreground" />
    }
  }

  return (
    <section id="pricing" className="relative py-24 scroll-mt-20">
      {/* Background ambient accents */}
      <div className="pointer-events-none absolute top-1/3 end-0 w-96 h-96 bg-foreground/[0.06] rounded-full blur-[120px]" />
      <div className="pointer-events-none absolute bottom-10 start-10 w-96 h-96 bg-foreground/[0.05] rounded-full blur-[120px]" />

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <BlurFade delay={0.05} yOffset={8}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-foreground/[0.06] border border-foreground/10 text-xs font-semibold text-foreground/80 dark:text-foreground/70 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-foreground/80" />
              <span>{t.pricing.badge}</span>
            </div>
          </BlurFade>

          <BlurFade delay={0.1} yOffset={10}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-4">
              {t.pricing.title}
            </h2>
          </BlurFade>

          <BlurFade delay={0.15} yOffset={10}>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t.pricing.subtitle}
            </p>
          </BlurFade>
        </div>

        {/* 4 Responsive Service Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {t.pricing.plans.map((plan, index) => {
            const isFeatured = !!plan.featured

            return (
              <BlurFade
                key={plan.id}
                delay={0.1 + index * 0.08}
                yOffset={16}
                className="h-full"
              >
                <div
                  className={`h-full relative rounded-3xl flex flex-col justify-between p-6 sm:p-7 transition-all duration-300 ${
                    isFeatured
                      ? "glass-card border-2 border-foreground/25 shadow-2xl shadow-foreground/[0.04] dark:shadow-foreground/[0.04] lg:-translate-y-3 z-20"
                      : "glass-card border border-border/80 shadow-md hover:shadow-xl hover:border-foreground/20"
                  }`}
                >
                  {/* BorderBeam for Featured Plan ("الهوية الرقمية") */}
                  {isFeatured && (
                    <BorderBeam
                      size={250}
                      duration={8}
                      borderWidth={2}
                      colorFrom="#737373"
                      colorTo="#FAFAFA"
                    />
                  )}

                  <div>
                    {/* Top Header: Badge & Icon */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="p-2.5 rounded-2xl bg-muted/80 border border-border/60">
                        {getPlanIcon(plan.id)}
                      </div>
                      <Badge
                        variant={plan.badgeVariant}
                        className={`text-[11px] font-bold ${
                          isFeatured
                            ? "bg-gradient-to-r from-foreground/[0.08] to-foreground/[0.08] border-foreground/20 text-foreground/80 dark:text-foreground/70"
                            : ""
                        }`}
                      >
                        {isFeatured && <Flame className="w-3 h-3 me-1 text-foreground/80 inline fill-foreground" />}
                        {plan.badge}
                      </Badge>
                    </div>

                    {/* Plan Name & Tagline */}
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-5 min-h-[36px]">
                      {plan.tagline}
                    </p>

                    {/* Price Block */}
                    <div className="py-4 border-y border-border/60 mb-6">
                      <div className="flex items-baseline gap-1">
                        <span
                          className={`text-2xl sm:text-3xl font-black ${
                            isFeatured
                              ? "text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground dark:from-foreground/80 dark:to-foreground/80"
                              : "text-foreground"
                          }`}
                        >
                          {plan.price}
                        </span>
                      </div>
                      <span className="text-[11px] text-muted-foreground font-medium block mt-1">
                        {plan.priceDetail}
                      </span>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-2.5 text-xs sm:text-sm">
                          <span
                            className={`p-0.5 rounded-full mt-0.5 shrink-0 ${
                              isFeatured
                                ? "bg-foreground/[0.1] text-foreground/80"
                                : plan.id === "noor"
                                ? "bg-foreground/[0.1] text-foreground"
                                : "bg-foreground/[0.1] text-foreground"
                            }`}
                          >
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          </span>
                          <span className="text-foreground/80 leading-snug">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Plan CTA Button */}
                  <div className="pt-2 mt-auto">
                    <Button
                      variant={
                        isFeatured
                          ? "gold"
                          : plan.id === "noor"
                          ? "emerald"
                          : "default"
                      }
                      className="w-full rounded-2xl py-3 font-bold group shadow-md"
                      onClick={() =>
                        onSelectPlan({
                          id: plan.id,
                          name: plan.name,
                          price: plan.price,
                        })
                      }
                    >
                      <span>{plan.ctaText}</span>
                      {lang === "ar" ? (
                        <ArrowLeft className="w-4 h-4 ms-2 group-hover:-translate-x-1 transition-transform" />
                      ) : (
                        <ArrowRight className="w-4 h-4 ms-2 group-hover:translate-x-1 transition-transform" />
                      )}
                    </Button>
                  </div>
                </div>
              </BlurFade>
            )
          })}
        </div>
      </div>
    </section>
  )
}

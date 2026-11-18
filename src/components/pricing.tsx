import type { Language, TranslationData } from "@/data/translations"
import { BlurFade } from "@/components/magicui/blur-fade"
import { BorderBeam } from "@/components/magicui/border-beam"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Building2,
  Check,
  Crown,
  Flame,
  GitBranch,
  Globe2,
  Heart,
  HelpCircle,
  MessageCircle,
  Smartphone,
  Sparkles,
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
        return <HelpCircle className="h-5 w-5 text-foreground" />
      case "noor":
        return <Heart className="h-5 w-5 text-foreground" />
      case "websites":
        return <Crown className="h-5 w-5 text-foreground/80" />
      case "apps":
        return <Smartphone className="h-5 w-5 text-foreground/80" />
      case "enterprise":
        return <Building2 className="h-5 w-5 text-muted-foreground" />
      default:
        return <Sparkles className="h-5 w-5 text-foreground" />
    }
  }

  return (
    <section id="pricing" className="relative py-24 scroll-mt-20">
      <div className="pointer-events-none absolute top-1/3 end-0 h-96 w-96 rounded-full bg-foreground/[0.055] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-10 start-10 h-96 w-96 rounded-full bg-foreground/[0.045] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <BlurFade delay={0.05} yOffset={8}>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/[0.06] px-3.5 py-1 text-xs font-semibold text-foreground/80">
              <Sparkles className="h-3.5 w-3.5 text-foreground/80" />
              <span>{t.pricing.badge}</span>
            </div>
          </BlurFade>

          <BlurFade delay={0.1} yOffset={10}>
            <h2 className="mb-4 text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {t.pricing.title}
            </h2>
          </BlurFade>

          <BlurFade delay={0.15} yOffset={10}>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t.pricing.subtitle}
            </p>
          </BlurFade>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 items-stretch xl:grid-cols-3">
          {t.pricing.plans.map((plan, index) => {
            const isFeatured = !!plan.featured

            return (
              <BlurFade
                key={plan.id}
                delay={0.08 + index * 0.06}
                yOffset={16}
                className="h-full"
              >
                <div
                  className={`relative flex h-full flex-col justify-between rounded-3xl p-6 transition-all duration-300 sm:p-7 ${
                    isFeatured
                      ? "glass-card z-20 border-2 border-foreground/25 shadow-2xl shadow-foreground/[0.04] xl:-translate-y-3"
                      : "glass-card border border-border/80 shadow-md hover:border-foreground/20 hover:shadow-xl"
                  }`}
                >
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
                    <div className="mb-4 flex items-center justify-between gap-2">
                      <div className="rounded-2xl border border-border/60 bg-muted/80 p-2.5">
                        {getPlanIcon(plan.id)}
                      </div>
                      <Badge
                        variant={plan.badgeVariant}
                        className={`text-[11px] font-bold ${
                          isFeatured
                            ? "border-foreground/20 bg-gradient-to-r from-foreground/[0.08] to-foreground/[0.08] text-foreground/80"
                            : ""
                        }`}
                      >
                        {isFeatured && (
                          <Flame className="me-1 inline h-3 w-3 fill-foreground/80 text-foreground/80" />
                        )}
                        {plan.badge}
                      </Badge>
                    </div>

                    <h3 className="mb-1 text-xl font-bold text-foreground">{plan.name}</h3>
                    <p className="mb-5 min-h-[36px] text-xs leading-relaxed text-muted-foreground">
                      {plan.tagline}
                    </p>

                    <div className="mb-6 border-y border-border/60 py-4">
                      <span
                        className={`text-2xl font-black sm:text-3xl ${
                          isFeatured
                            ? "bg-gradient-to-r from-foreground to-foreground bg-clip-text text-transparent"
                            : "text-foreground"
                        }`}
                      >
                        {plan.price}
                      </span>
                      <span className="mt-1 block text-[11px] font-medium text-muted-foreground">
                        {plan.priceDetail}
                      </span>
                    </div>

                    <ul className="mb-8 space-y-3">
                      {plan.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-2.5 text-xs sm:text-sm">
                          <span className="mt-0.5 shrink-0 rounded-full bg-foreground/[0.1] p-0.5 text-foreground/80">
                            <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                          </span>
                          <span className="leading-snug text-foreground/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2">
                    <Button
                      variant={
                        isFeatured
                          ? "gold"
                          : plan.id === "noor" || plan.id === "consultation"
                          ? "emerald"
                          : "default"
                      }
                      className="group w-full rounded-2xl py-3 font-bold shadow-md"
                      onClick={() =>
                        onSelectPlan({ id: plan.id, name: plan.name, price: plan.price })
                      }
                    >
                      <span>{plan.ctaText}</span>
                      {lang === "ar" ? (
                        <ArrowLeft className="ms-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                      ) : (
                        <ArrowRight className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      )}
                    </Button>
                  </div>
                </div>
              </BlurFade>
            )
          })}
        </div>

        <BlurFade delay={0.3} yOffset={12} className="mt-12">
          <div className="glass-card grid gap-4 rounded-3xl border border-border/70 p-5 shadow-md md:grid-cols-3 md:p-6">
            <div className="flex items-start gap-3">
              <span className="rounded-xl bg-foreground/[0.08] p-2.5 text-foreground">
                <GitBranch className="h-4 w-4" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-foreground">
                  {t.pricing.deliveryTitle}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {t.pricing.deliveryText}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="rounded-xl bg-foreground/[0.08] p-2.5 text-foreground">
                <Banknote className="h-4 w-4" />
              </span>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {t.pricing.libyaNote}
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="rounded-xl bg-foreground/[0.08] p-2.5 text-foreground">
                <Globe2 className="h-4 w-4" />
              </span>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {t.pricing.domainNote}
              </p>
            </div>
          </div>
        </BlurFade>

        <BlurFade delay={0.35} yOffset={12} className="mt-5">
          <div className="glass-card grid gap-4 rounded-3xl border border-border/70 p-5 shadow-md md:grid-cols-2 md:p-6">
            <div className="flex items-start gap-3">
              <span className="rounded-xl bg-foreground/[0.08] p-2.5 text-foreground">
                <HelpCircle className="h-4 w-4" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-foreground">
                  {t.pricing.limitsTitle}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {t.pricing.limitsText}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="rounded-xl bg-foreground/[0.08] p-2.5 text-foreground">
                <MessageCircle className="h-4 w-4" />
              </span>
              <div className="w-full">
                <h3 className="text-sm font-bold text-foreground">
                  {t.pricing.negotiationTitle}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {t.pricing.negotiationText}
                </p>
                <Button
                  variant="default"
                  size="sm"
                  className="group mt-3 rounded-xl px-4 py-2 text-xs font-bold"
                  onClick={() =>
                    onSelectPlan({
                      id: "negotiation",
                      name: t.pricing.negotiationCta,
                      price: t.pricing.requestQuote,
                    })
                  }
                >
                  <span>{t.pricing.negotiationCta}</span>
                  {lang === "ar" ? (
                    <ArrowLeft className="ms-2 h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                  ) : (
                    <ArrowRight className="ms-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}

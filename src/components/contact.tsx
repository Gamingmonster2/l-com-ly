import { useState } from "react"
import type { Language, TranslationData } from "@/data/translations"
import { BlurFade } from "@/components/magicui/blur-fade"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Globe,
  MapPin,
  Clock,
  Phone,
  Send,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Copy,
  Check,
} from "lucide-react"
import confetti from "canvas-confetti"
import { widgetCopy } from "@/data/widget-copy"
import { buildWhatsAppFallback, submitLead, validateLead } from "@/lib/lead"
import { getWhatsapp, getWorkerUrl } from "@/lib/site-config"

interface ContactProps {
  lang: Language
  t: TranslationData
}

export function Contact({ lang, t }: ContactProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [selectedPlan, setSelectedPlan] = useState("identity")
  const [message, setMessage] = useState("")
  const [termsAgreed, setTermsAgreed] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [honeypot, setHoneypot] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<{
    message: string
    kind: "error" | "success" | "info"
    link?: string
  }>({ message: "", kind: "info" })

  const copy = widgetCopy[lang].form
  const whatsappDigits = getWhatsapp().replace(/\D/g, "")
  const whatsappHref = whatsappDigits
    ? `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(widgetCopy[lang].chat.waText)}`
    : ""
  const whatsappDisplay = whatsappDigits.startsWith("218")
    ? `+218 ${whatsappDigits.slice(3, 5)} ${whatsappDigits.slice(5, 8)} ${whatsappDigits.slice(8)}`
    : getWhatsapp() || "—"

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("info@l.com.ly")
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    // مصيدة سبام: مخفية عن الإنسان، والبوتات تملؤها
    if (honeypot) {
      setStatus({ message: copy.honeypotSuccess, kind: "success" })
      setHoneypot("")
      return
    }

    const plan = t.pricing.plans.find((p) => p.id === selectedPlan)
    const check = validateLead({
      name,
      email,
      message,
      package: plan?.name || "استفسار عام",
    })
    if (!check.ok) {
      setErrors(check.errors)
      const firstError = Object.values(check.errors)[0]
      setStatus({ message: firstError, kind: "error" })
      return
    }

    setErrors({})
    setStatus({ message: "", kind: "info" })
    setIsSubmitting(true)

    const result = await submitLead({
      workerUrl: getWorkerUrl(),
      payload: check.value,
    })

    setIsSubmitting(false)
    if (result.ok) {
      const success =
        result.data?.message || copy.defaultSuccess
      setStatus({ message: success, kind: "success" })
      setIsSubmitted(true)
      setHoneypot("")
      setTermsAgreed(true)
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.65 },
        colors: ["#525252", "#A3A3A3", "#D4D4D4", "#FAFAFA"],
      })
      return
    }

    const fallback = buildWhatsAppFallback(getWhatsapp(), check.value)
    const failure =
      result.error === "timeout" ? copy.timeout : copy.network
    setStatus({ message: failure, kind: "error", link: fallback || undefined })
  }

  const handleReset = () => {
    setName("")
    setEmail("")
    setPhone("")
    setMessage("")
    setErrors({})
    setStatus({ message: "", kind: "info" })
    setSelectedPlan("identity")
    setTermsAgreed(true)
    setIsSubmitted(false)
  }

  return (
    <section id="contact" className="relative py-24 scroll-mt-20">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-foreground/[0.03] rounded-full blur-[140px]" />

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <BlurFade delay={0.05} yOffset={8}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-foreground/[0.06] border border-foreground/10 text-xs font-semibold text-foreground dark:text-foreground/80 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-foreground" />
              <span>{t.contact.badge}</span>
            </div>
          </BlurFade>

          <BlurFade delay={0.1} yOffset={10}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-4">
              {t.contact.title}
            </h2>
          </BlurFade>

          <BlurFade delay={0.15} yOffset={10}>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t.contact.subtitle}
            </p>
          </BlurFade>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Cards & Information */}
          <div className="lg:col-span-5 space-y-6">
            <BlurFade delay={0.15} yOffset={12}>
              <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {t.contact.infoTitle}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {t.contact.infoSubtitle}
                  </p>
                </div>

                {/* WhatsApp Card — القناة الأسرع في ليبيا */}
                {whatsappHref && (
                  <div className="p-4 rounded-2xl bg-foreground/[0.04] border border-foreground/20 flex items-center justify-between group hover:border-foreground/40 transition-colors">
                    <div className="flex items-center gap-3.5">
                      <div className="p-2.5 rounded-xl bg-foreground text-background">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] text-muted-foreground font-semibold block">
                          {t.contact.whatsappLabel}
                        </span>
                        <a
                          href={whatsappHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          dir="ltr"
                          className="text-sm sm:text-base font-bold text-foreground hover:underline"
                        >
                          {whatsappDisplay}
                        </a>
                      </div>
                    </div>
                    <Badge variant="blue" className="text-[11px]">
                      {lang === "ar" ? "مباشر" : "Direct"}
                    </Badge>
                  </div>
                )}

                {/* Email Card (info@l.com.ly) */}
                <div className="p-4 rounded-2xl bg-muted/60 border border-border/80 flex items-center justify-between group hover:border-foreground/20 transition-colors">
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-xl bg-foreground/[0.06] text-foreground">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] text-muted-foreground font-semibold block">
                        {t.contact.contactEmailLabel}
                      </span>
                      <a
                        href="mailto:info@l.com.ly"
                        className="text-sm sm:text-base font-bold text-foreground hover:text-foreground transition-colors"
                      >
                        info@l.com.ly
                      </a>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopyEmail}
                    className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
                    title={lang === "ar" ? "نسخ البريد" : "Copy email"}
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-foreground" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                {/* Portal Domain Card (l.com.ly) */}
                <div className="p-4 rounded-2xl bg-muted/60 border border-border/80 flex items-center justify-between group hover:border-foreground/20 transition-colors">
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-xl bg-foreground/[0.06] text-muted-foreground">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] text-muted-foreground font-semibold block">
                        {t.contact.domainLabel}
                      </span>
                      <a
                        href="https://l.com.ly"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm sm:text-base font-bold text-foreground hover:text-foreground transition-colors"
                      >
                        l.com.ly
                      </a>
                    </div>
                  </div>
                  <Badge variant="blue" className="text-[11px]">
                    LIVE
                  </Badge>
                </div>

                {/* Location Card: Tripoli, Libya */}
                <div className="p-4 rounded-2xl bg-muted/60 border border-border/80 flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-foreground/[0.06] text-foreground">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-muted-foreground font-semibold block">
                      {t.contact.locationLabel}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {t.contact.locationValue}
                    </span>
                  </div>
                </div>

                {/* Working Hours Card */}
                <div className="p-4 rounded-2xl bg-muted/60 border border-border/80 flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-foreground/[0.06] text-foreground/80">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-muted-foreground font-semibold block">
                      {t.contact.hoursLabel}
                    </span>
                    <span className="text-xs text-foreground/80 leading-relaxed font-medium">
                      {t.contact.hoursValue}
                    </span>
                  </div>
                </div>

                {/* Security verification stamp */}
                <div className="pt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="w-4 h-4 text-foreground" />
                  <span>
                    {lang === "ar"
                      ? "جميع الاتصالات مشفرة وفق معايير TLS 1.3"
                      : "All communications encrypted via TLS 1.3"}
                  </span>
                </div>
              </div>
            </BlurFade>
          </div>

          {/* Right Column: Sleek shadcn/ui Contact Form */}
          <div className="lg:col-span-7">
            <BlurFade delay={0.2} yOffset={12}>
              <div className="glass-card rounded-3xl p-6 sm:p-9">
                <h3 className="text-xl font-bold text-foreground mb-6">
                  {t.contact.formTitle}
                </h3>

                {isSubmitted ? (
                  <div className="py-12 flex flex-col items-center text-center space-y-4 animate-in fade-in zoom-in-95">
                    <div className="w-20 h-20 rounded-full bg-foreground/[0.08] border-2 border-foreground/20 flex items-center justify-center text-foreground shadow-xl shadow-foreground/[0.04]">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h4 className="text-2xl font-bold text-foreground">
                      {t.contact.successTitle}
                    </h4>
                    <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                      {t.contact.successMessage}
                    </p>

                    <Button
                      variant="outline"
                      className="mt-6 rounded-2xl px-6 py-2.5 font-bold"
                      onClick={handleReset}
                    >
                      {t.contact.sendAnother}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Honeypot — مخفي عن الزائر، يصيد الروبوتات فقط */}
                    <div
                      aria-hidden="true"
                      className="absolute -start-[9999px] h-0 w-0 overflow-hidden"
                    >
                      <label htmlFor="contact-website">Website</label>
                      <input
                        id="contact-website"
                        name="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>

                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-foreground/90">
                          {t.contact.nameLabel}{" "}
                          <span className="text-destructive">*</span>
                        </label>
                        <Input
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={t.contact.namePlaceholder}
                          aria-invalid={!!errors.name}
                        />
                        {errors.name && (
                          <p className="text-xs text-destructive">{errors.name}</p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-foreground/90">
                          {t.contact.emailLabel}{" "}
                          <span className="text-destructive">*</span>
                        </label>
                        <Input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={t.contact.emailPlaceholder}
                          aria-invalid={!!errors.email}
                        />
                        {errors.email && (
                          <p className="text-xs text-destructive">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Phone & Service Plan Selection Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-foreground/90">
                          {t.contact.phoneLabel}
                        </label>
                        <Input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder={t.contact.phonePlaceholder}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-foreground/90">
                          {t.contact.planLabel}
                        </label>
                        <select
                          value={selectedPlan}
                          onChange={(e) => setSelectedPlan(e.target.value)}
                          className="flex h-11 w-full rounded-xl border border-input bg-background/50 px-3.5 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 backdrop-blur-sm text-foreground"
                        >
                          {t.pricing.plans.map((p) => (
                            <option key={p.id} value={p.id} className="bg-background text-foreground">
                              {p.name} ({p.price})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message / Project Details Textarea */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground/90">
                        {t.contact.messageLabel}{" "}
                        <span className="text-destructive">*</span>
                      </label>
                      <Textarea
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={t.contact.messagePlaceholder}
                        aria-invalid={!!errors.message}
                      />
                      {errors.message && (
                        <p className="text-xs text-destructive">{errors.message}</p>
                      )}
                    </div>

                    {/* Terms Checkbox */}
                    <div className="flex items-start gap-3 pt-1">
                      <Checkbox
                        id="terms"
                        checked={termsAgreed}
                        onCheckedChange={(c) => setTermsAgreed(!!c)}
                      />
                      <label
                        htmlFor="terms"
                        className="text-xs text-muted-foreground leading-relaxed cursor-pointer select-none"
                      >
                        {t.contact.termsLabel}
                      </label>
                    </div>

                    {status.message && (
                      <p
                        role="status"
                        className={`text-sm font-bold ${
                          status.kind === "error"
                            ? "text-destructive"
                            : status.kind === "success"
                              ? "text-foreground"
                              : "text-muted-foreground"
                        }`}
                      >
                        {status.message}
                        {status.link && (
                          <a
                            href={status.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ms-2 underline"
                          >
                            {copy.waLink}
                          </a>
                        )}
                      </p>
                    )}

                    {/* Submit Button */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        size="lg"
                        variant="gradient"
                        disabled={
                          isSubmitting ||
                          !termsAgreed ||
                          !name ||
                          !email ||
                          !message
                        }
                        className="w-full sm:w-auto min-w-[200px] rounded-2xl py-3.5 font-bold shadow-lg shadow-foreground/[0.08]"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>{t.contact.submitting}</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Send className="w-4 h-4" />
                            <span>{t.contact.submitButton}</span>
                          </span>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useState, useEffect } from "react"
import type { Language, TranslationData } from "@/data/translations"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Sparkles, CheckCircle2, Send } from "lucide-react"
import confetti from "canvas-confetti"
import { widgetCopy } from "@/data/widget-copy"
import { buildWhatsAppFallback, submitLead, validateLead } from "@/lib/lead"
import { getWhatsapp, getWorkerUrl } from "@/lib/site-config"

interface PlanModalProps {
  isOpen: boolean
  onClose: () => void
  selectedPlan: {
    id: string
    name: string
    price: string
  } | null
  lang: Language
  t: TranslationData
}

export function PlanModal({
  isOpen,
  onClose,
  selectedPlan,
  lang,
  t,
}: PlanModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [notes, setNotes] = useState("")
  const [agreed, setAgreed] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [honeypot, setHoneypot] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<{
    message: string
    kind: "error" | "success"
    link?: string
  }>({ message: "", kind: "error" })

  const copy = widgetCopy[lang].form

  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false)
      setIsSubmitting(false)
    }
  }, [isOpen, selectedPlan])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    if (honeypot) {
      setStatus({ message: copy.honeypotSuccess, kind: "success" })
      setIsSuccess(true)
      setHoneypot("")
      return
    }

    const check = validateLead({
      name,
      email,
      message:
        notes.trim().length >= 10
          ? notes
          : `${t.modal.selectedPackage}: ${selectedPlan?.name || t.pricing.plans[0].name}`,
      package: selectedPlan?.name || t.pricing.plans[0].name,
    })
    if (!check.ok) {
      setErrors(check.errors)
      setStatus({ message: Object.values(check.errors)[0], kind: "error" })
      return
    }

    setErrors({})
    setStatus({ message: "", kind: "error" })
    setIsSubmitting(true)

    const result = await submitLead({
      workerUrl: getWorkerUrl(),
      payload: check.value,
    })

    setIsSubmitting(false)
    if (result.ok) {
      setIsSuccess(true)
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#525252", "#A3A3A3", "#D4D4D4", "#FAFAFA"],
      })
      return
    }

    const fallback = buildWhatsAppFallback(getWhatsapp(), check.value)
    setStatus({
      message: result.error === "timeout" ? copy.timeout : copy.network,
      kind: "error",
      link: fallback || undefined,
    })
  }

  const handleModalClose = () => {
    setIsSuccess(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleModalClose()}>
      <DialogContent className="sm:max-w-[520px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-foreground/[0.06] text-foreground">
              <Sparkles className="w-5 h-5 text-foreground/70" />
            </span>
            <DialogTitle>{t.modal.title}</DialogTitle>
          </div>
          <DialogDescription>{t.modal.description}</DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-8 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-foreground/[0.08] border border-foreground/15 flex items-center justify-center text-foreground">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-foreground">
              {t.contact.successTitle}
            </h4>
            <p className="text-sm text-muted-foreground max-w-sm">
              {t.modal.successAlert}
            </p>

            <div className="p-4 rounded-xl glass-card w-full text-start text-xs space-y-1.5 mt-2 border border-border/80">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.modal.selectedPackage}</span>
                <span className="font-bold text-foreground">{selectedPlan?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.modal.emailLabel}:</span>
                <span className="font-medium">{email}</span>
              </div>
            </div>

            <Button
              variant="gradient"
              className="mt-4 w-full rounded-xl"
              onClick={handleModalClose}
            >
              {lang === "ar" ? "إغلاق النافذة" : "Close Dialog"}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            {/* Honeypot — مخفي عن الزائر */}
            <div
              aria-hidden="true"
              className="absolute -start-[9999px] h-0 w-0 overflow-hidden"
            >
              <label htmlFor="modal-website">Website</label>
              <input
                id="modal-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            {/* Pre-filled Plan Highlight Card */}
            <div className="p-3.5 rounded-2xl bg-muted/60 border border-foreground/15 flex items-center justify-between">
              <div>
                <span className="text-xs text-muted-foreground font-medium block">
                  {t.modal.selectedPackage}
                </span>
                <span className="text-base font-black text-foreground">
                  {selectedPlan?.name}
                </span>
              </div>
              <Badge variant="gold" className="text-xs px-3 py-1 font-bold">
                {selectedPlan?.price}
              </Badge>
            </div>

            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground/90">
                {t.modal.nameLabel} <span className="text-destructive">*</span>
              </label>
              <Input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.modal.namePlaceholder}
                className="h-10"
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name}</p>
              )}
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground/90">
                {t.modal.emailLabel} <span className="text-destructive">*</span>
              </label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.modal.emailPlaceholder}
                className="h-10"
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email}</p>
              )}
            </div>

            {/* Phone Input (Optional) */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground/90">
                {t.contact.phoneLabel}
              </label>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t.contact.phonePlaceholder}
                className="h-10"
              />
            </div>

            {/* Notes / Message */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground/90">
                {t.modal.notesLabel}
              </label>
              <Textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t.modal.notesPlaceholder}
                className="min-h-[80px]"
              />
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-2.5 pt-1">
              <Checkbox
                id="modal-terms"
                checked={agreed}
                onCheckedChange={(c) => setAgreed(!!c)}
              />
              <label
                htmlFor="modal-terms"
                className="text-xs text-muted-foreground leading-snug cursor-pointer select-none"
              >
                {t.contact.termsLabel}
              </label>
            </div>

            {status.message && (
              <p role="status" className="text-sm font-bold text-destructive">
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

            <DialogFooter className="pt-2 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleModalClose}
                className="rounded-xl"
              >
                {t.modal.cancelButton}
              </Button>
              <Button
                type="submit"
                variant="gradient"
                disabled={isSubmitting || !agreed || !name || !email}
                className="rounded-xl min-w-[130px]"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{t.contact.submitting}</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    <span>{t.modal.confirmButton}</span>
                  </span>
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

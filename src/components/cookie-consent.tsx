import { useEffect, useState } from "react"
import type { Language } from "@/data/translations"
import { widgetCopy } from "@/data/widget-copy"
import {
  applyConsent,
  isDecided,
  readConsent,
  writeConsent,
  type ConsentDecision,
} from "@/lib/consent"
import { Button } from "@/components/ui/button"

export function CookieConsent({ lang }: { lang: Language }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = readConsent()
    if (isDecided(stored)) {
      applyConsent(stored)
      return
    }
    setVisible(true)
  }, [])

  if (!visible) return null

  const copy = widgetCopy[lang].consent

  const decide = (choice: ConsentDecision) => {
    writeConsent(choice)
    applyConsent(choice)
    setVisible(false)
  }

  return (
    <div
      role="dialog"
      aria-label={copy.label}
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="fixed inset-x-0 bottom-0 z-[9999] border-t border-border bg-background/95 p-4 shadow-2xl backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-screen-lg flex-col gap-3 md:flex-row md:items-center">
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
          {copy.text}
        </p>
        <a
          href="https://policies.google.com/technologies/cookies"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-xs font-bold text-foreground underline underline-offset-2"
        >
          {copy.more}
        </a>
        <div className="flex shrink-0 items-center gap-2">
          <Button
            type="button"
            onClick={() => decide("granted")}
            className="rounded-lg px-5"
          >
            {copy.accept}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => decide("denied")}
            className="rounded-lg px-5"
          >
            {copy.deny}
          </Button>
        </div>
      </div>
    </div>
  )
}

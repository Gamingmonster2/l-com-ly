import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text"
import { BorderBeam } from "@/components/magicui/border-beam"

/**
 * مقدمة شعار قصيرة وتلقائية باستخدام Magic UI.
 * تظهر مرة واحدة فقط في كل جلسة متصفح، وتُختفي تلقائياً دون أي ضغط،
 * وتُتخطّى تماماً إذا كان الجهاز يطلب تقليل الحركة (prefers-reduced-motion).
 */
const INTRO_KEY = "l_intro_seen_v1"
const INTRO_MS = 1700
const FADE_MS = 300

type Phase = "hidden" | "show" | "fade" | "done"

export function BrandIntro() {
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<Phase>("hidden")

  useEffect(() => {
    if (reduceMotion) {
      setPhase("done")
      return
    }

    let seen = false
    try {
      seen = sessionStorage.getItem(INTRO_KEY) === "1"
    } catch {
      // المتصفح قد يمنع التخزين في وضع التصفح الخاص — نعرض المقدمة بأي حال.
    }
    if (seen) {
      setPhase("done")
      return
    }

    setPhase("show")
    const fadeTimer = window.setTimeout(() => setPhase("fade"), INTRO_MS)
    const doneTimer = window.setTimeout(() => {
      setPhase("done")
      try {
        sessionStorage.setItem(INTRO_KEY, "1")
      } catch {
        // تجاهل فشل التخزين.
      }
    }, INTRO_MS + FADE_MS)

    return () => {
      window.clearTimeout(fadeTimer)
      window.clearTimeout(doneTimer)
    }
  }, [reduceMotion])

  if (phase === "hidden" || phase === "done") return null

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="L.COM.LY"
      className={`pointer-events-none fixed inset-0 z-[200] flex items-center justify-center bg-background transition-opacity duration-300 ${
        phase === "fade" ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-7 px-6">
        <motion.div
          initial={{ scale: 0.65, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 18 }}
          className="relative flex size-20 items-center justify-center rounded-2xl border border-foreground/15 bg-foreground/[0.04] shadow-2xl shadow-foreground/[0.06] sm:size-24"
        >
          <BorderBeam size={140} duration={1.5} borderWidth={2} />
          <span className="text-4xl font-black tracking-tighter text-foreground sm:text-5xl">
            L
          </span>
          <span className="absolute bottom-2.5 right-2.5 size-2 rounded-full bg-foreground shadow-[0_0_12px_2px_rgba(250,250,250,0.45)]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.18, duration: 0.45 }}
          className="flex flex-col items-center gap-1.5"
        >
          <AnimatedShinyText
            shimmerWidth={180}
            className="text-xl font-black tracking-[0.28em] text-foreground sm:text-2xl"
          >
            L.COM.LY
          </AnimatedShinyText>
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Libya Digital Hub
          </span>
        </motion.div>

        <div className="h-px w-40 overflow-hidden rounded-full bg-foreground/10 sm:w-52">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.3, ease: "easeInOut" }}
            className="h-full rounded-full bg-foreground"
          />
        </div>
      </div>
    </div>
  )
}

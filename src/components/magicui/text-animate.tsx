import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TextAnimateProps {
  text: string
  className?: string
  delay?: number
  type?: "words" | "letters" | "fade"
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div"
}

export function TextAnimate({
  text,
  className,
  delay = 0,
  type = "words",
  as: Component = "span",
}: TextAnimateProps) {
  if (type === "words") {
    const words = text.split(" ")
    return (
      <Component className={cn("inline-block", className)}>
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.45,
              delay: delay + index * 0.08,
              ease: [0.2, 0.65, 0.3, 0.9],
            }}
            className="inline-block me-[0.28em] last:me-0"
          >
            {word}
          </motion.span>
        ))}
      </Component>
    )
  }

  if (type === "letters") {
    const letters = Array.from(text)
    return (
      <Component className={cn("inline-block", className)}>
        {letters.map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.3,
              delay: delay + index * 0.02,
              ease: "easeOut",
            }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </Component>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {text}
    </motion.div>
  )
}

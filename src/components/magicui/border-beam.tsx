import { cn } from "@/lib/utils"

interface BorderBeamProps {
  className?: string
  size?: number
  duration?: number
  borderWidth?: number
  colorFrom?: string
  colorTo?: string
  delay?: number
}

export function BorderBeam({
  className,
  size = 200,
  duration = 10,
  borderWidth = 1.5,
  colorFrom = "#737373",
  colorTo = "#FAFAFA",
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          "--size": `${size}px`,
          "--duration": `${duration}s`,
          "--delay": `-${delay}s`,
          "--border-width": `${borderWidth}px`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden [border:calc(var(--border-width))_solid_transparent]",
        // Mask to only show border
        "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
        className
      )}
    >
      <div
        className={cn(
          "absolute aspect-square w-[calc(var(--size))] bg-gradient-to-r from-[var(--color-from)] via-[#A3A3A3] to-[var(--color-to)]",
          "animate-border-beam [animation-delay:var(--delay)]"
        )}
        style={{
          offsetPath: "rect(0 auto auto 0 round calc(var(--size) / 2))",
        }}
      />
    </div>
  )
}

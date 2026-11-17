import { useEffect, useRef } from "react"
import createGlobe from "cobe"
import { cn } from "@/lib/utils"

interface GlobeProps {
  className?: string
  isDark?: boolean
}

export function Globe({ className, isDark = true }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const globeRef = useRef<{ update: (s: Record<string, unknown>) => void; destroy: () => void } | null>(null)
  const phiRef = useRef(0.2)
  const frameRef = useRef<number>(0)
  const pointerInteracting = useRef<number | null>(null)
  const pointerMovement = useRef(0)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    let width = canvas.offsetWidth

    const handleResize = () => {
      width = canvas.offsetWidth
      globeRef.current?.update({ width: width * 2, height: width * 2 })
    }
    window.addEventListener("resize", handleResize)

    // Destroy previous instance if re-rendering
    globeRef.current?.destroy()
    cancelAnimationFrame(frameRef.current)

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio || 2, 2),
      width: width * 2 || 1000,
      height: width * 2 || 1000,
      phi: phiRef.current,
      theta: 0.25,
      dark: isDark ? 1 : 0,
      diffuse: isDark ? 1.4 : 1.1,
      mapSamples: 16000,
      mapBrightness: isDark ? 6.5 : 4,
      baseColor: isDark ? [0.1, 0.16, 0.28] : [0.9, 0.94, 0.98],
      markerColor: [0.06, 0.72, 0.51],
      glowColor: isDark ? [0.15, 0.35, 0.85] : [0.4, 0.6, 0.95],
      markers: [
        // Tripoli, Libya (Primary Hub) — emerald pulse
        { location: [32.8872, 13.1913], size: 0.12 },
        // Benghazi
        { location: [32.1194, 20.0868], size: 0.05 },
        // London
        { location: [51.5074, -0.1278], size: 0.06 },
        // Dubai
        { location: [25.2048, 55.2708], size: 0.07 },
        // Frankfurt (Google Cloud EU)
        { location: [50.1109, 8.6821], size: 0.06 },
        // New York
        { location: [40.7128, -74.006], size: 0.07 },
        // Tokyo
        { location: [35.6762, 139.6503], size: 0.05 },
        // Singapore
        { location: [1.3521, 103.8198], size: 0.06 },
        // Istanbul
        { location: [41.0082, 28.9784], size: 0.06 },
        // Cairo
        { location: [30.0444, 31.2357], size: 0.06 },
      ],
    })

    globeRef.current = globe as unknown as { update: (s: Record<string, unknown>) => void; destroy: () => void }

    // Animate rotation loop using update()
    const animate = () => {
      if (pointerInteracting.current === null) {
        phiRef.current += 0.0035
      } else {
        phiRef.current += pointerMovement.current
        pointerMovement.current = 0
      }
      globe.update({ phi: phiRef.current })
      frameRef.current = requestAnimationFrame(animate)
    }
    frameRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frameRef.current)
      globe.destroy()
      window.removeEventListener("resize", handleResize)
    }
  }, [isDark])

  return (
    <div
      className={cn(
        "relative flex items-center justify-center w-full aspect-square max-w-[580px] mx-auto overflow-hidden",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX
          if (canvasRef.current) canvasRef.current.style.cursor = "grabbing"
        }}
        onPointerUp={() => {
          pointerInteracting.current = null
          if (canvasRef.current) canvasRef.current.style.cursor = "grab"
        }}
        onPointerOut={() => {
          pointerInteracting.current = null
          if (canvasRef.current) canvasRef.current.style.cursor = "grab"
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = (e.clientX - pointerInteracting.current) * 0.005
            pointerMovement.current = delta
            pointerInteracting.current = e.clientX
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = (e.touches[0].clientX - pointerInteracting.current) * 0.005
            pointerMovement.current = delta
            pointerInteracting.current = e.touches[0].clientX
          }
        }}
        style={{
          width: "100%",
          height: "100%",
          contain: "layout paint size",
          cursor: "grab",
          opacity: 0.95,
        }}
      />
    </div>
  )
}

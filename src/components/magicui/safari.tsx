import React from "react"
import { cn } from "@/lib/utils"
import { Lock, RotateCw, ArrowLeft, ArrowRight, ShieldCheck, ExternalLink } from "lucide-react"

interface SafariProps extends React.HTMLAttributes<HTMLDivElement> {
  url?: string
  src?: string
  children?: React.ReactNode
  className?: string
  width?: number | string
  height?: number | string
  headerClassName?: string
}

export function Safari({
  url = "https://l.com.ly",
  children,
  className,
  headerClassName,
  ...props
}: SafariProps) {
  return (
    <div
      className={cn(
        "relative w-full rounded-2xl border border-white/[0.12] dark:border-white/[0.08] bg-card/90 dark:bg-card/95 shadow-2xl backdrop-blur-xl overflow-hidden group transition-all duration-500",
        className
      )}
      {...props}
    >
      {/* Top Browser Bar */}
      <div
        className={cn(
          "flex h-11 items-center justify-between border-b border-border/60 bg-muted/40 dark:bg-zinc-900/80 px-4 select-none",
          headerClassName
        )}
      >
        {/* macOS Traffic Light Buttons */}
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#EF4444] inline-block shadow-sm shadow-foreground/[0.08] transition-transform group-hover:scale-110" />
          <span className="h-3 w-3 rounded-full bg-[#F59E0B] inline-block shadow-sm shadow-foreground/[0.08] transition-transform group-hover:scale-110" />
          <span className="h-3 w-3 rounded-full bg-[#10B981] inline-block shadow-sm shadow-foreground/[0.08] transition-transform group-hover:scale-110" />

          {/* Navigation Arrows */}
          <div className="hidden sm:flex items-center gap-1.5 ms-3 text-muted-foreground/60">
            <ArrowLeft className="w-3.5 h-3.5 hover:text-foreground cursor-pointer transition-colors" />
            <ArrowRight className="w-3.5 h-3.5 hover:text-foreground cursor-pointer transition-colors" />
            <RotateCw className="w-3 h-3 hover:text-foreground cursor-pointer transition-colors ms-0.5" />
          </div>
        </div>

        {/* Center URL Pill with SSL Lock */}
        <div className="flex items-center gap-1.5 rounded-lg bg-background/80 dark:bg-black/50 px-3.5 py-1 text-xs font-mono text-muted-foreground border border-border/50 max-w-[280px] sm:max-w-md w-full justify-center shadow-inner">
          <Lock className="w-3 h-3 text-foreground shrink-0" />
          <span className="truncate text-foreground/90 font-medium dir-ltr" dir="ltr">
            {url}
          </span>
          <span className="hidden md:inline-flex items-center gap-1 text-[10px] text-foreground/80 ms-1 font-sans">
            <ShieldCheck className="w-3 h-3" />
            <span>TLS 1.3</span>
          </span>
        </div>

        {/* Right Corner: External Link */}
        <div className="flex items-center gap-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] font-semibold text-primary hover:text-foreground/80 px-2 py-0.5 rounded-md hover:bg-primary/10 transition-colors"
            title="Open in new window"
          >
            <span className="hidden sm:inline">Open</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Browser Viewport Content */}
      <div className="relative w-full overflow-hidden bg-zinc-950/40">
        {children}
      </div>
    </div>
  )
}

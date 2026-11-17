import { useState } from "react"
import type { Language, TranslationData } from "@/data/translations"
import { Safari } from "@/components/magicui/safari"
import { BorderBeam } from "@/components/magicui/border-beam"
import { BlurFade } from "@/components/magicui/blur-fade"
import { Marquee } from "@/components/magicui/marquee"
import { Badge } from "@/components/ui/badge"
import {
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  Search,
  Radio,
  Layers,
  Zap,
  TrendingUp,
} from "lucide-react"

interface PortfolioProps {
  lang: Language
  t: TranslationData
}

export function Portfolio({ lang, t }: PortfolioProps) {
  const [activeTab, setActiveTab] = useState<string>("toolseer")
  const [hoveredBox, setHoveredBox] = useState<string | null>(null)

  // Interactive search simulator state for Toolseer
  const [toolseerQuery, setToolseerQuery] = useState("AI Voice & Code")

  // Interactive channel simulator state for Stream Libya
  const [streamQuality, setStreamQuality] = useState("1080p60")

  // Interactive currency simulator for Bit Libya
  const [selectedCurrency, setSelectedCurrency] = useState("USD/LYD")

  const marqueeTech = [
    { name: "Google Cloud Engine", icon: "🌐" },
    { name: "Next.js 15 App Router", icon: "⚡" },
    { name: "Cloudflare Edge Workers", icon: "🛡️" },
    { name: "WebRTC Ultra-Low Latency", icon: "📡" },
    { name: "Bitcoin & Lightning Protocol", icon: "₿" },
    { name: "Docker & Kubernetes", icon: "🐳" },
    { name: "High-Throughput PostgreSQL", icon: "🐘" },
    { name: "End-to-End TLS 1.3 Encryption", icon: "🔒" },
    { name: "Libya ccTLD (.ly Registry)", icon: "🇱🇾" },
    { name: "Algolia Vector Neural Search", icon: "🧠" },
  ]

  // Render simulated rich live UI inside the Safari box
  const renderSimulatedContent = (id: string) => {
    switch (id) {
      case "toolseer":
        return (
          <div className="p-4 sm:p-6 bg-gradient-to-b from-zinc-950/90 to-zinc-900/90 text-zinc-100 min-h-[310px] flex flex-col justify-between select-none">
            {/* Top Search & Filter Bar */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-foreground flex items-center justify-center font-black text-xs text-background">
                    TS
                  </div>
                  <span className="font-bold text-sm tracking-wide">
                    Toolseer Hub
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-foreground/[0.1] text-foreground/70 font-mono">
                    v3.4
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-foreground/80 font-mono">
                  <span className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
                  <span>12,500+ Tools Live</span>
                </div>
              </div>

              {/* Simulated Interactive Search Box */}
              <div className="relative mb-4">
                <Search className="w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  value={toolseerQuery}
                  onChange={(e) => setToolseerQuery(e.target.value)}
                  className="w-full bg-zinc-900/90 border border-zinc-700/70 rounded-xl py-2 ps-9 pe-3 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-foreground/40 font-mono"
                  placeholder="Search 12,000+ AI & Dev Tools..."
                />
              </div>

              {/* Simulated Category Pills with motion */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {["AI Writers", "Code Generators", "Voice Cloners", "Productivity", "SEO Engines"].map(
                  (cat, i) => (
                    <button
                      key={cat}
                      onClick={() => setToolseerQuery(cat)}
                      className={`text-[10px] px-2.5 py-1 rounded-lg border transition-all ${
                        i === 0
                          ? "bg-foreground/[0.12] border-foreground/25 text-foreground/60 font-semibold"
                          : "bg-zinc-800/60 border-zinc-700/50 text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      {cat}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Simulated Live Tool Cards Grid */}
            <div className="grid grid-cols-2 gap-2 mt-auto">
              <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-foreground/20 transition-colors flex items-center justify-between">
                <div>
                  <div className="font-semibold text-xs text-white">NeuralDev AI</div>
                  <div className="text-[10px] text-zinc-400">Code Optimization</div>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-foreground/[0.1] text-foreground/80 font-mono">
                  ★ 4.9
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-foreground/20 transition-colors flex items-center justify-between">
                <div>
                  <div className="font-semibold text-xs text-white">AudioSynth Ly</div>
                  <div className="text-[10px] text-zinc-400">Arabic Voice AI</div>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-foreground/[0.1] text-foreground/70 font-mono">
                  ★ 4.8
                </span>
              </div>
            </div>
          </div>
        )

      case "stream":
        return (
          <div className="p-4 sm:p-6 bg-gradient-to-b from-zinc-950 to-foreground/[0.03] text-zinc-100 min-h-[310px] flex flex-col justify-between select-none">
            {/* Top Stream Status Bar */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-foreground/20 border border-foreground/25 text-foreground font-bold text-[11px] animate-pulse">
                  <Radio className="w-3 h-3" />
                  LIVE BROADCAST
                </span>
                <span className="text-xs text-zinc-400 hidden sm:inline">
                  Tripoli CDN Node #01
                </span>
              </div>

              {/* Quality Switcher */}
              <div className="flex items-center gap-1 bg-zinc-900/80 p-0.5 rounded-lg border border-zinc-800 text-[10px] font-mono">
                {["1080p60", "4K HDR", "720p"].map((q) => (
                  <button
                    key={q}
                    onClick={() => setStreamQuality(q)}
                    className={`px-2 py-0.5 rounded ${
                      streamQuality === q
                        ? "bg-foreground text-background font-bold"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Live Video Player with Audio Equalizer Waves */}
            <div className="relative aspect-video max-h-[140px] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 flex items-center justify-center group my-2">
              <div className="absolute inset-0 bg-gradient-to-tr from-foreground/[0.08] via-foreground/[0.04] to-foreground/[0.04]" />
              
              {/* Equalizer Waveform Animation */}
              <div className="flex items-end gap-1.5 z-10 h-14">
                {[40, 75, 55, 90, 60, 85, 45, 95, 70, 80, 50, 65, 85, 60].map(
                  (height, i) => (
                    <span
                      key={i}
                      style={{
                        height: `${height}%`,
                        animationDuration: `${0.6 + (i % 5) * 0.2}s`,
                      }}
                      className="w-1.5 bg-gradient-to-t from-foreground via-foreground/60 to-foreground/80 rounded-full animate-pulse"
                    />
                  )
                )}
              </div>

              {/* Live Overlay Metrics */}
              <div className="absolute bottom-2 start-2 end-2 flex justify-between text-[10px] font-mono text-zinc-300 z-10 bg-black/60 px-2 py-1 rounded backdrop-blur-sm">
                <span>Latency: 1.1s</span>
                <span>Bitrate: 6,450 kbps</span>
                <span className="text-foreground/80">Frames: 0 Dropped</span>
              </div>
            </div>

            {/* Bottom Stream Telemetry Pills */}
            <div className="flex items-center justify-between text-xs pt-1 border-t border-zinc-800">
              <span className="text-[11px] text-zinc-400">
                Protocols: HLS • WebRTC • DASH
              </span>
              <span className="text-foreground/80 font-mono text-[11px]">
                99.99% Uptime SLA
              </span>
            </div>
          </div>
        )

      case "bit":
        return (
          <div className="p-4 sm:p-6 bg-gradient-to-b from-zinc-950 to-foreground/[0.03] text-zinc-100 min-h-[310px] flex flex-col justify-between select-none">
            {/* Top Fintech Bar */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-foreground flex items-center justify-center font-black text-xs text-background">
                    BIT
                  </div>
                  <span className="font-bold text-sm tracking-wide">
                    Bit Libya Portal
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-foreground/[0.1] text-foreground/80 font-mono">
                  TLS 1.3 Verified
                </span>
              </div>

              {/* Currency Pair Tabs */}
              <div className="flex gap-2 mb-3">
                {["USD/LYD", "EUR/LYD", "CRYPTO/LYD"].map((pair) => (
                  <button
                    key={pair}
                    onClick={() => setSelectedCurrency(pair)}
                    className={`text-[11px] px-3 py-1 rounded-lg border font-mono transition-all ${
                      selectedCurrency === pair
                        ? "bg-foreground/[0.12] border-foreground/30 text-foreground/70 font-bold"
                        : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {pair}
                  </button>
                ))}
              </div>

              {/* Live Ticker Card */}
              <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 my-2">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-xs text-zinc-400">
                    Market Exchange Benchmark
                  </span>
                  <span className="text-xs text-foreground/80 font-mono flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> +1.4%
                  </span>
                </div>
                <div className="text-xl font-mono font-black text-white">
                  {selectedCurrency === "USD/LYD"
                    ? "7.28 LYD / USD"
                    : selectedCurrency === "EUR/LYD"
                    ? "7.84 LYD / EUR"
                    : "682,400 LYD / BTC"}
                </div>
              </div>
            </div>

            {/* Bottom Infrastructure Metrics */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800 text-center">
              <div className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                <span className="block text-[10px] text-zinc-400">Tx Speed</span>
                <span className="font-mono text-xs font-bold text-foreground/80">
                  0.04s Instant
                </span>
              </div>
              <div className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                <span className="block text-[10px] text-zinc-400">API Gateway</span>
                <span className="font-mono text-xs font-bold text-foreground/70">
                  Zero-Trust 256-bit
                </span>
              </div>
            </div>
          </div>
        )

      case "btc":
        return (
          <div className="p-4 sm:p-6 bg-gradient-to-b from-zinc-950 to-foreground/[0.03] text-zinc-100 min-h-[310px] flex flex-col justify-between select-none">
            {/* Top Bitcoin Bar */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-foreground flex items-center justify-center font-black text-sm text-background">
                    ₿
                  </div>
                  <span className="font-bold text-sm tracking-wide">
                    BTC Libya Network
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-foreground/[0.1] text-foreground/70 font-mono">
                  Block #891,240
                </span>
              </div>

              {/* Lightning Network Node Pulse Visualizer */}
              <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-foreground/15 my-2 relative overflow-hidden">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-foreground/70 font-semibold flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 fill-foreground/80" />
                    Lightning Node Telemetry
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">
                    Libya Peer #07
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-300">
                  <span>Routing Channels: 128</span>
                  <span className="text-foreground/80">Capacity: 14.8 BTC</span>
                </div>
                {/* Visual pulse line */}
                <div className="mt-2.5 h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-foreground via-foreground/70 to-foreground rounded-full animate-[shimmer_2s_infinite]" />
                </div>
              </div>

              {/* Knowledge Modules Pill */}
              <div className="flex flex-wrap gap-1.5 my-2">
                {[
                  "Self-Custody Guide",
                  "Lightning LND",
                  "Hardware Wallets",
                  "Libya Node Setup",
                ].map((item) => (
                  <span
                    key={item}
                    className="text-[10px] px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Non-Profit Community Bar */}
            <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
              <span>Open-Source Education Hub</span>
              <span className="text-foreground/70 font-mono">P2P Network Active</span>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <section id="portfolio" className="relative py-28 scroll-mt-20 overflow-hidden">
      {/* Background ambient lighting in Magic UI style */}
      <div className="pointer-events-none absolute top-1/4 start-1/4 w-96 h-96 bg-foreground/[0.05] rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute bottom-1/4 end-1/4 w-96 h-96 bg-foreground/[0.06] rounded-full blur-[140px]" />

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <BlurFade delay={0.05} yOffset={8}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-foreground/[0.06] border border-foreground/10 text-xs font-semibold text-foreground dark:text-foreground/80 mb-3 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-foreground" />
              <span>{t.portfolio.badge}</span>
            </div>
          </BlurFade>

          <BlurFade delay={0.1} yOffset={10}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-4">
              {t.portfolio.title}
            </h2>
          </BlurFade>

          <BlurFade delay={0.15} yOffset={10}>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t.portfolio.subtitle}
            </p>
          </BlurFade>
        </div>

        {/* Prominent Production Scope Notice (as requested by user) */}
        <BlurFade delay={0.2} yOffset={10}>
          <div className="mb-14 max-w-4xl mx-auto p-4 sm:p-5 rounded-2xl glass-card border border-foreground/15 bg-foreground/[0.02] dark:bg-foreground/[0.04] flex flex-col sm:flex-row items-center gap-3.5 text-center sm:text-start shadow-md">
            <div className="p-2.5 rounded-xl bg-foreground/[0.08] text-foreground shrink-0">
              <Layers className="w-5 h-5 text-foreground" />
            </div>
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-foreground dark:text-foreground/80 uppercase tracking-wider block">
                {t.portfolio.disclaimerTag}
              </span>
              <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed font-medium">
                {t.portfolio.disclaimer}
              </p>
            </div>
          </div>
        </BlurFade>

        {/* 4 Interactive Safari / Browser Mockup Preview Boxes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {t.portfolio.items.map((item, index) => {
            const isHovered = hoveredBox === item.id
            const isActive = activeTab === item.id

            return (
              <BlurFade
                key={item.id}
                delay={0.15 + index * 0.08}
                yOffset={16}
                className="h-full"
              >
                <div
                  className="group relative flex flex-col justify-between h-full rounded-3xl glass-card border border-border/80 hover:border-foreground/25 p-6 sm:p-7 shadow-lg hover:shadow-2xl transition-all duration-300"
                  onMouseEnter={() => {
                    setHoveredBox(item.id)
                    setActiveTab(item.id)
                  }}
                  onMouseLeave={() => setHoveredBox(null)}
                >
                  {/* BorderBeam on hovered box */}
                  {(isHovered || isActive) && (
                    <BorderBeam
                      size={260}
                      duration={7}
                      borderWidth={1.5}
                      colorFrom={
                        item.id === "btc"
                          ? "#A3A3A3"
                          : item.id === "bit"
                          ? "#737373"
                          : "#525252"
                      }
                      colorTo={
                        item.id === "btc"
                          ? "#FAFAFA"
                          : item.id === "stream"
                          ? "#D4D4D4"
                          : "#E5E5E5"
                      }
                    />
                  )}

                  {/* Header info above the browser box */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl sm:text-2xl font-black text-foreground group-hover:text-foreground transition-colors">
                          {item.title}
                        </h3>
                        <Badge
                          variant="outline"
                          className="text-[10px] font-semibold bg-background/80 border-border"
                        >
                          {item.badge}
                        </Badge>
                      </div>
                      <p className="text-xs font-semibold text-foreground dark:text-foreground/80">
                        {item.subtitle}
                      </p>
                    </div>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-muted/80 hover:bg-primary hover:text-primary-foreground transition-colors group/btn shrink-0"
                      title={t.portfolio.visitSite}
                    >
                      <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-5">
                    {item.description}
                  </p>

                  {/* Magic UI Safari Mockup Box with simulated live content & motion */}
                  <div className="relative mb-5 rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 group-hover:scale-[1.01]">
                    <Safari url={item.url}>
                      {renderSimulatedContent(item.id)}
                    </Safari>
                  </div>

                  {/* Tech Stack Chips & Action Link at bottom */}
                  <div className="pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-3 mt-auto">
                    <div className="flex flex-wrap gap-1.5">
                      {item.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-muted/80 text-muted-foreground border border-border/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-foreground/80 transition-colors px-3 py-1.5 rounded-xl bg-primary/10 hover:bg-primary/20"
                    >
                      <span>{t.portfolio.visitSite}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </BlurFade>
            )
          })}
        </div>

        {/* Magic UI Infinite Marquee Ribbon of Enterprise Technologies */}
        <BlurFade delay={0.4} yOffset={10} className="mt-20">
          <div className="rounded-3xl glass-card border border-border/60 p-4 sm:p-6 shadow-md relative overflow-hidden">
            <div className="text-center mb-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground font-semibold">
                {lang === "ar"
                  ? "معايير التقنية والبنية التحتية السحابية المعتمدة"
                  : "Enterprise Cloud Infrastructure & Technology Standards"}
              </span>
            </div>

            <Marquee pauseOnHover className="[--duration:30s]">
              {marqueeTech.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/50 border border-border/60 text-xs font-semibold text-foreground/80 hover:bg-accent transition-colors shrink-0"
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.name}</span>
                </div>
              ))}
            </Marquee>

            {/* Gradient edge masks for smooth fade */}
            <div className="pointer-events-none absolute inset-y-0 start-0 w-16 bg-gradient-to-r from-card to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 end-0 w-16 bg-gradient-to-l from-card to-transparent" />
          </div>
        </BlurFade>
      </div>
    </section>
  )
}

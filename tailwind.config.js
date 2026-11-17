/** @type {import('tailwindcss').Config} */

// Magic UI uses full oklch color values. color-mix keeps Tailwind opacity
// modifiers (e.g. text-foreground/60, border-border/80) working with them.
const token = (name) =>
  `color-mix(in oklab, var(${name}) calc(<alpha-value> * 100%), transparent)`

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: token("--background"),
        foreground: token("--foreground"),
        card: {
          DEFAULT: token("--card"),
          foreground: token("--card-foreground"),
        },
        popover: {
          DEFAULT: token("--popover"),
          foreground: token("--popover-foreground"),
        },
        primary: {
          DEFAULT: token("--primary"),
          foreground: token("--primary-foreground"),
        },
        secondary: {
          DEFAULT: token("--secondary"),
          foreground: token("--secondary-foreground"),
        },
        muted: {
          DEFAULT: token("--muted"),
          foreground: token("--muted-foreground"),
        },
        accent: {
          DEFAULT: token("--accent"),
          foreground: token("--accent-foreground"),
        },
        destructive: {
          DEFAULT: token("--destructive"),
          foreground: token("--destructive-foreground"),
        },
        border: token("--border"),
        input: token("--input"),
        ring: token("--ring"),
        surface: {
          DEFAULT: token("--surface"),
          foreground: token("--surface-foreground"),
        },
        chart: {
          "1": token("--chart-1"),
          "2": token("--chart-2"),
          "3": token("--chart-3"),
          "4": token("--chart-4"),
          "5": token("--chart-5"),
        },
        color: {
          "1": token("--color-1"),
          "2": token("--color-2"),
          "3": token("--color-3"),
          "4": token("--color-4"),
          "5": token("--color-5"),
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
        arabic: ["IBM Plex Sans Arabic", "var(--font-geist-sans)"],
        display: ["IBM Plex Sans Arabic", "var(--font-geist-sans)"],
      },
      maxWidth: {
        container: "1400px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "border-beam": {
          "100%": { "offset-distance": "100%" },
        },
        grid: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "shiny-text": {
          "0%, 90%, 100%": { backgroundPosition: "calc(-100% - 40%) 0" },
          "30%, 60%": { backgroundPosition: "calc(100% + 40%) 0" },
        },
        aurora: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        meteor: {
          "0%": { transform: "rotate(var(--angle)) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": { transform: "rotate(var(--angle)) translateX(-500px)", opacity: "0" },
        },
        ripple: {
          "0%, 100%": { transform: "translate(-50%, -50%) scale(1)" },
          "50%": { transform: "translate(-50%, -50%) scale(0.9)" },
        },
        "line-shadow": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "100% -100%" },
        },
      },
      animation: {
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
        grid: "grid 15s linear infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "shiny-text": "shiny-text 8s infinite",
        aurora: "aurora 8s ease-in-out infinite alternate",
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        meteor: "meteor 5s linear infinite",
        ripple: "ripple var(--duration, 2s) ease calc(var(--i, 0) * 0.2s) infinite",
        "line-shadow": "line-shadow 15s linear infinite",
      },
    },
  },
  plugins: [],
}

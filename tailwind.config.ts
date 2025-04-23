import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        brand: {
          red: "#FF5470",
          orange: "#FF9770",
          blue: "#0496FF",
          indigo: "#5D67E9",
          purple: "#6665DD",
          green: "#06D6A0",
          mint: "#79DEAA",
          yellow: "#FFC43D",
          pink: "#EF476F",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 0.25rem)",
        sm: "calc(var(--radius) - 0.5rem)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontSize: {
        "2xs": "0.625rem",
        "3xl": "1.75rem",
        "4xl": "2.25rem",
        "5xl": "2.75rem",
        "6xl": "3.5rem",
        "7xl": "4.25rem",
        "8xl": "5.5rem",
      },
      letterSpacing: {
        tightest: "-.06em",
        tighter: "-.04em",
        tight: "-.02em",
        wide: ".02em",
        wider: ".04em",
        widest: ".06em",
      },
      lineHeight: {
        tighter: "1.1",
        tight: "1.2",
        snug: "1.3",
        relaxed: "1.6",
      },
      textShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.1)",
        DEFAULT: "0 2px 4px rgba(0, 0, 0, 0.1)",
        lg: "0 8px 16px rgba(0, 0, 0, 0.1)",
      },
      fontFamily: {
        sans: ["var(--font-jost)"],
      },
      transitionTimingFunction: {
        "custom-bezier": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

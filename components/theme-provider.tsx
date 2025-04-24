"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  // Ensure no hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Add a class to the body when theme changes for global transitions
  React.useEffect(() => {
    if (!mounted) return

    const handleThemeChange = () => {
      document.documentElement.classList.add("theme-changing")
      setTimeout(() => {
        document.documentElement.classList.remove("theme-changing")
      }, 500)
    }

    window.addEventListener("themeChange", handleThemeChange)
    return () => window.removeEventListener("themeChange", handleThemeChange)
  }, [mounted])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

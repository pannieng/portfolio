"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

export function useThemeEffect() {
  const { theme, resolvedTheme } = useTheme()

  useEffect(() => {
    // Add a class to trigger animations when theme changes
    const handleThemeChange = () => {
      document.documentElement.classList.add("theme-changing")

      // Remove the class after animations complete
      setTimeout(() => {
        document.documentElement.classList.remove("theme-changing")
      }, 500)
    }

    // Create a MutationObserver to watch for theme attribute changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class" &&
          (mutation.target as HTMLElement).classList.contains("dark") !== (theme === "dark")
        ) {
          handleThemeChange()
          // Dispatch a custom event that other components can listen for
          window.dispatchEvent(
            new CustomEvent("themeChange", {
              detail: { theme: resolvedTheme },
            }),
          )
        }
      })
    })

    // Start observing the document with the configured parameters
    observer.observe(document.documentElement, { attributes: true })

    return () => {
      observer.disconnect()
    }
  }, [theme, resolvedTheme])

  return { currentTheme: theme }
}

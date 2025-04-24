"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"
import { Magnetic } from "@/components/magnetic"

interface ThemeToggleProps {
  className?: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export function ThemeToggle({ className = "", onMouseEnter, onMouseLeave }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isHovered, setIsHovered] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark")
      setTimeout(() => setIsAnimating(false), 300)
    }, 150)
  }

  const variants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  }

  const sunVariants = {
    hidden: { opacity: 0, rotate: -30, scale: 0.5 },
    visible: { opacity: 1, rotate: 0, scale: 1 },
  }

  const moonVariants = {
    hidden: { opacity: 0, rotate: 30, scale: 0.5 },
    visible: { opacity: 1, rotate: 0, scale: 1 },
  }

  return (
    <Magnetic strength={15}>
      <motion.button
        onClick={toggleTheme}
        className={`relative h-10 w-10 rounded-full flex items-center justify-center overflow-hidden ${className} ${
          isAnimating ? "after:opacity-100" : "after:opacity-0"
        } after:content-[''] after:absolute after:inset-0 after:bg-white after:dark:bg-black after:rounded-full after:transition-opacity after:duration-300`}
        onMouseEnter={() => {
          setIsHovered(true)
          onMouseEnter && onMouseEnter()
        }}
        onMouseLeave={() => {
          setIsHovered(false)
          onMouseLeave && onMouseLeave()
        }}
        whileTap="tap"
        variants={variants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        <motion.div
          variants={sunVariants}
          initial="hidden"
          animate={theme === "dark" ? "hidden" : "visible"}
          exit="hidden"
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute"
        >
          <Sun className="h-5 w-5 text-yellow-500" />
        </motion.div>
        <motion.div
          variants={moonVariants}
          initial="hidden"
          animate={theme === "dark" ? "visible" : "hidden"}
          exit="hidden"
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute"
        >
          <Moon className="h-5 w-5 text-slate-300" />
        </motion.div>
      </motion.button>
    </Magnetic>
  )
}

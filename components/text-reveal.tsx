"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface TextRevealProps {
  children: React.ReactNode
  className?: string
  threshold?: number
  delay?: number
  once?: boolean
}

export const TextReveal = ({ children, className = "", threshold = 0.5, delay = 0, once = true }: TextRevealProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, threshold })

  // Add theme-specific transitions to text reveal animations

  // Update the variants to include theme-specific transitions
  const variants = {
    hidden: {
      clipPath: "inset(100% 0 0 0)",
      opacity: 0,
      y: 75,
    },
    visible: {
      clipPath: "inset(0 0 0 0)",
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <div ref={ref} className={`overflow-hidden ${className} theme-text-transition`}>
      <motion.div variants={variants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
        {children}
      </motion.div>
    </div>
  )
}

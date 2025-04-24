"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion } from "framer-motion"

interface MagneticProps {
  children: React.ReactNode
  className?: string
  strength?: number
}

export const Magnetic = ({ children, className = "", strength = 30 }: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const { clientX, clientY } = e
    const { width, height, left, top } = ref.current.getBoundingClientRect()

    const x = ((clientX - (left + width / 2)) / (width / 2)) * strength
    const y = ((clientY - (top + height / 2)) / (height / 2)) * strength

    setPosition({ x, y })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  const { x, y } = position

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.1 }}
      className={`${className} theme-transition`}
    >
      {children}
    </motion.div>
  )
}

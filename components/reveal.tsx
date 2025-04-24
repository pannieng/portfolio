"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface RevealProps {
  children: React.ReactNode
  width?: "fit-content" | "100%"
  delay?: number
  duration?: number
  className?: string
  direction?: "up" | "down" | "left" | "right"
  once?: boolean
}

export const Reveal = ({
  children,
  width = "fit-content",
  delay = 0,
  duration = 0.5,
  className = "",
  direction = "up",
  once = true,
}: RevealProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-100px" })

  const getDirectionVariants = () => {
    switch (direction) {
      case "down":
        return {
          hidden: { y: -75, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        }
      case "left":
        return {
          hidden: { x: 75, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        }
      case "right":
        return {
          hidden: { x: -75, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        }
      case "up":
      default:
        return {
          hidden: { y: 75, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        }
    }
  }

  const variants = getDirectionVariants()

  return (
    <div ref={ref} style={{ width }} className={className}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="theme-transition"
      >
        {children}
      </motion.div>
    </div>
  )
}

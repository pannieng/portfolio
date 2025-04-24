"use client"

import type React from "react"

import { useRef } from "react"
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion"
import { wrap } from "@motionone/utils"

interface MarqueeProps {
  children: React.ReactNode
  speed?: number
  direction?: "left" | "right"
  pauseOnHover?: boolean
  className?: string
}

export const Marquee = ({
  children,
  speed = 50,
  direction = "left",
  pauseOnHover = true,
  className = "",
}: MarqueeProps) => {
  const baseVelocity = direction === "left" ? -speed : speed
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  })

  const x = useTransform(baseX, (v) => `${wrap(0, -50, v)}%`)

  const directionFactor = direction === "left" ? -1 : 1
  const containerRef = useRef<HTMLDivElement>(null)

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor * baseVelocity * (delta / 1000)

    if (velocityFactor.get() !== 0) {
      moveBy += directionFactor * moveBy * velocityFactor.get()
    }

    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div ref={containerRef} className={`overflow-hidden whitespace-nowrap flex ${className}`}>
      <motion.div
        className="flex whitespace-nowrap theme-transition"
        style={{ x }}
        whileHover={pauseOnHover ? { animationPlayState: "paused" } : undefined}
      >
        <div className="flex items-center justify-center">{children}</div>
        <div className="flex items-center justify-center">{children}</div>
        <div className="flex items-center justify-center">{children}</div>
        <div className="flex items-center justify-center">{children}</div>
      </motion.div>
    </div>
  )
}

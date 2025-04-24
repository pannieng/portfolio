"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { useScroll, useTransform, useSpring, motion } from "framer-motion"

interface SmoothScrollProps {
  children: React.ReactNode
}

export const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current && scrollerRef.current) {
        scrollerRef.current.style.height = `${contentRef.current.clientHeight}px`
      }
    }

    updateHeight()
    window.addEventListener("resize", updateHeight)

    return () => {
      window.removeEventListener("resize", updateHeight)
    }
  }, [])

  const { scrollY } = useScroll()
  const transform = useTransform(scrollY, [0, 1], [0, -1])
  const physics = { damping: 15, mass: 0.27, stiffness: 55 }
  const spring = useSpring(transform, physics)

  return (
    <>
      <div ref={scrollerRef} className="h-screen w-full" />
      <motion.div ref={contentRef} style={{ y: spring }} className="fixed top-0 left-0 w-full will-change-transform">
        {children}
      </motion.div>
    </>
  )
}

"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation, type Variant } from "framer-motion"
import type { JSX } from "react"

type AnimatedTextProps = {
  text: string | string[]
  el?: keyof JSX.IntrinsicElements
  className?: string
  once?: boolean
  repeatDelay?: number
  animation?: {
    hidden: Variant
    visible: Variant
  }
}

// Update the animation variants to include theme-specific transitions
const defaultAnimations = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export const AnimatedText = ({
  text,
  el: Wrapper = "p",
  className,
  once = true,
  repeatDelay = 0,
  animation = defaultAnimations,
}: AnimatedTextProps) => {
  const controls = useAnimation()
  const textArray = Array.isArray(text) ? text : [text]
  const ref = useRef(null)
  const isInView = useInView(ref, { once })

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const show = () => {
      controls.start("visible")
      if (repeatDelay) {
        timeout = setTimeout(async () => {
          await controls.start("hidden")
          controls.start("visible")
        }, repeatDelay)
      }
    }

    if (isInView) {
      show()
    } else {
      controls.start("hidden")
    }

    return () => clearTimeout(timeout)
  }, [isInView, controls, repeatDelay])

  return (
    // Add theme-specific class to the wrapper
    <Wrapper className={`${className} theme-text-transition`} ref={ref}>
      <span className="sr-only">{textArray.join(" ")}</span>
      <motion.span
        initial="hidden"
        animate={controls}
        variants={{
          visible: { transition: { staggerChildren: 0.03 } },
          hidden: {},
        }}
        aria-hidden
      >
        {textArray.map((line, lineIndex) => (
          <span className="block" key={`${line}-${lineIndex}`}>
            {line.split(" ").map((word, wordIndex) => (
              <span className="inline-block" key={`${word}-${wordIndex}`}>
                {word.split("").map((char, charIndex) => (
                  <motion.span key={`${char}-${charIndex}`} className="inline-block" variants={animation}>
                    {char}
                  </motion.span>
                ))}
                <span className="inline-block">&nbsp;</span>
              </span>
            ))}
          </span>
        ))}
      </motion.span>
    </Wrapper>
  )
}

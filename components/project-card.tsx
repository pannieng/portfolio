"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

interface ProjectCardProps {
  project: {
    id: number
    title: string
    description: string
    category: string
    year: string
    image: string
    color: string
  }
  onMouseEnter: () => void
  onMouseLeave: () => void
  isActive: boolean
}

export const ProjectCard = ({ project, onMouseEnter, onMouseLeave, isActive }: ProjectCardProps) => {
  const [hovered, setHovered] = useState(false)
  const { theme } = useTheme()

  // Adjust color opacity for dark mode
  const getAdjustedColor = (color: string) => {
    if (theme === "dark") {
      // Convert hex to rgba with opacity and brightness adjustment
      const r = Number.parseInt(color.slice(1, 3), 16)
      const g = Number.parseInt(color.slice(3, 5), 16)
      const b = Number.parseInt(color.slice(5, 7), 16)

      // Brighten colors slightly for dark mode
      const brightenFactor = 1.2
      const clamp = (num: number) => Math.min(255, Math.round(num * brightenFactor))

      return `rgba(${clamp(r)}, ${clamp(g)}, ${clamp(b)}, 0.9)`
    }
    return color
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="group"
      onMouseEnter={() => {
        setHovered(true)
        onMouseEnter()
      }}
      onMouseLeave={() => {
        setHovered(false)
        onMouseLeave()
      }}
      whileHover={{ y: -10 }}
    >
      <Link href={`#project-${project.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105 dark:dark-image"
          />
          <motion.div
            className={cn(
              "absolute inset-0 transition-colors duration-300 flex items-center justify-center",
              isActive ? `bg-opacity-10 dark:bg-opacity-20` : "group-hover:bg-opacity-5 dark:group-hover:bg-opacity-15",
              "theme-bg-transition",
            )}
            style={{ backgroundColor: getAdjustedColor(project.color) }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: hovered ? 1 : 0,
                scale: hovered ? 1 : 0.8,
                transition: { duration: 0.3 },
              }}
              className="transition-opacity duration-300"
            >
              <motion.div
                className="w-12 h-12 border rounded-full flex items-center justify-center"
                style={{
                  borderColor: getAdjustedColor(project.color),
                  color: getAdjustedColor(project.color),
                }}
                animate={{
                  rotate: hovered ? 90 : 0,
                  transition: { duration: 0.3 },
                }}
              >
                <ArrowUpRight className="h-5 w-5" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        <div className="mt-6 space-y-1">
          <div className="flex items-center justify-between">
            <motion.h3
              className="text-xl md:text-2xl font-normal"
              animate={{
                x: hovered ? 5 : 0,
                transition: { duration: 0.3 },
              }}
            >
              {project.title}
            </motion.h3>
            <span className="text-xs text-muted-foreground">{project.year}</span>
          </div>
          <p className="text-sm md:text-base font-light">
            <span className="text-muted-foreground">{project.category} — </span>
            <span className="font-normal" style={{ color: getAdjustedColor(project.color) }}>
              {project.description}
            </span>
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

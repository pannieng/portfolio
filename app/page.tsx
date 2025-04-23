"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

export default function PortfolioPage() {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [cursorText, setCursorText] = useState("")
  const [cursorVariant, setCursorVariant] = useState("default")
  const [cursorColor, setCursorColor] = useState("#111")
  const cursorRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const [activeFilter, setActiveFilter] = useState("all")

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const { scrollYProgress: projectsScrollProgress } = useScroll({
    target: projectsRef,
    offset: ["start end", "end start"],
  })

  const heroOpacity = useTransform(heroScrollProgress, [0, 0.8], [1, 0])
  const heroScale = useTransform(heroScrollProgress, [0, 0.8], [1, 0.95])
  const heroY = useTransform(heroScrollProgress, [0, 0.8], [0, 100])

  const projectsY = useTransform(projectsScrollProgress, [0, 0.2], [100, 0])
  const projectsOpacity = useTransform(projectsScrollProgress, [0, 0.2], [0, 1])

  useEffect(() => {
    setMounted(true)

    const sections = ["home", "work", "about", "contact"]

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (!element) continue

        const { offsetTop, offsetHeight } = element

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section)
          break
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`
    }
  }, [cursorPosition])

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const projects = [
    {
      id: 1,
      title: "Essence",
      description: "Brand identity system",
      category: "Branding",
      year: "2023",
      image: "/placeholder.svg?height=600&width=800",
      color: "#FF5470",
    },
    {
      id: 2,
      title: "Horizon",
      description: "Digital experience",
      category: "Digital",
      year: "2023",
      image: "/placeholder.svg?height=600&width=800",
      color: "#0496FF",
    },
    {
      id: 3,
      title: "Monochrome",
      description: "Photography series",
      category: "Photography",
      year: "2022",
      image: "/placeholder.svg?height=600&width=800",
      color: "#6665DD",
    },
    {
      id: 4,
      title: "Whisper",
      description: "Packaging design",
      category: "Product",
      year: "2022",
      image: "/placeholder.svg?height=600&width=800",
      color: "#06D6A0",
    },
    {
      id: 5,
      title: "Lucid",
      description: "Interactive installation",
      category: "Digital",
      year: "2023",
      image: "/placeholder.svg?height=600&width=800",
      color: "#FFC43D",
    },
    {
      id: 6,
      title: "Serenity",
      description: "Editorial design",
      category: "Print",
      year: "2022",
      image: "/placeholder.svg?height=600&width=800",
      color: "#EF476F",
    },
  ]

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category.toLowerCase() === activeFilter.toLowerCase())

  const cursorVariants = {
    default: {
      width: "24px",
      height: "24px",
      backgroundColor: "rgba(0, 0, 0, 0)",
      border: "1px solid rgba(0, 0, 0, 0.5)",
      x: cursorPosition.x - 12,
      y: cursorPosition.y - 12,
    },
    text: {
      width: "120px",
      height: "120px",
      backgroundColor: cursorColor,
      mixBlendMode: "difference",
      color: "#fff",
      x: cursorPosition.x - 60,
      y: cursorPosition.y - 60,
    },
    project: {
      width: "80px",
      height: "80px",
      backgroundColor: cursorColor,
      mixBlendMode: "normal",
      color: "#fff",
      x: cursorPosition.x - 40,
      y: cursorPosition.y - 40,
    },
  }

  const colorClasses = {
    red: "bg-gradient-to-br from-[#FF5470] to-[#FF9770]",
    blue: "bg-gradient-to-br from-[#0496FF] to-[#5D67E9]",
    green: "bg-gradient-to-br from-[#06D6A0] to-[#79DEAA]",
    purple: "bg-gradient-to-br from-[#6665DD] to-[#A594F9]",
    yellow: "bg-gradient-to-br from-[#FFC43D] to-[#FFDD4A]",
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <div className="min-h-screen bg-[#f8f8f8] text-[#111] selection:bg-[#111] selection:text-white">
        {/* Custom Cursor */}
        <motion.div
          ref={cursorRef}
          className="fixed top-0 left-0 rounded-full pointer-events-none z-50 flex items-center justify-center hidden md:flex"
          variants={cursorVariants}
          animate={cursorVariant}
          transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        >
          <span
            className={cn(
              "text-sm font-light tracking-wider whitespace-nowrap",
              cursorText ? "opacity-100" : "opacity-0",
            )}
          >
            {cursorText}
          </span>
        </motion.div>

        {/* Header/Navigation */}
        <header className="fixed top-0 z-40 w-full py-8">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="text-lg tracking-tight font-light"
                onMouseEnter={() => {
                  setCursorText("Home")
                  setCursorVariant("text")
                  setCursorColor("#111")
                }}
                onMouseLeave={() => {
                  setCursorText("")
                  setCursorVariant("default")
                }}
              >
                ALEX KIM
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-12">
                {["home", "work", "about", "contact"].map((section) => (
                  <Link
                    key={section}
                    href={`#${section}`}
                    className={cn(
                      "text-sm font-light capitalize transition-colors relative py-2",
                      activeSection === section ? "text-[#111]" : "text-[#555] hover:text-[#111]",
                    )}
                    onMouseEnter={() => {
                      setCursorText(section)
                      setCursorVariant("text")
                      setCursorColor("#111")
                    }}
                    onMouseLeave={() => {
                      setCursorText("")
                      setCursorVariant("default")
                    }}
                  >
                    {section}
                    {activeSection === section && (
                      <motion.span
                        layoutId="activeSection"
                        className="absolute bottom-0 left-0 h-px w-full bg-[#111]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                ))}
              </nav>

              {/* Mobile Menu Button */}
              <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden bg-[#f8f8f8]"
              >
                <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
                  {["home", "work", "about", "contact"].map((section) => (
                    <Link
                      key={section}
                      href={`#${section}`}
                      className={cn(
                        "text-sm font-light capitalize transition-colors",
                        activeSection === section ? "text-[#111]" : "text-[#555]",
                      )}
                      onClick={toggleMenu}
                    >
                      {section}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <main>
          {/* Hero Section */}
          <section id="home" className="min-h-screen flex items-center pt-20" ref={heroRef}>
            <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div style={{ opacity: heroOpacity, y: heroY, scale: heroScale }} className="max-w-3xl">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.1] tracking-tight"
                  onMouseEnter={() => {
                    setCursorText("Hello")
                    setCursorVariant("text")
                    setCursorColor("#111")
                  }}
                  onMouseLeave={() => {
                    setCursorText("")
                    setCursorVariant("default")
                  }}
                >
                  <span className="block font-normal">Distinctive</span>
                  <span className="block mt-2 tracking-tight">design that</span>
                  <span className="block mt-2 italic font-medium">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF5470] to-[#FF9770]">
                      stands out.
                    </span>
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-12 text-lg text-[#555] font-light max-w-xl leading-relaxed"
                  onMouseEnter={() => {
                    setCursorText("About me")
                    setCursorVariant("text")
                    setCursorColor("#111")
                  }}
                  onMouseLeave={() => {
                    setCursorText("")
                    setCursorVariant("default")
                  }}
                >
                  I'm a designer and creative developer crafting distinctive digital experiences that stand out through
                  refined aesthetics and thoughtful interactions.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-12"
                >
                  <Button
                    asChild
                    className="rounded-none bg-gradient-to-r from-[#FF5470] to-[#FF9770] hover:from-[#FF9770] hover:to-[#FF5470] text-white border-0 px-8 py-6 h-auto text-sm font-light transition-all duration-500"
                    onMouseEnter={() => {
                      setCursorText("View Work")
                      setCursorVariant("text")
                      setCursorColor("#FF5470")
                    }}
                    onMouseLeave={() => {
                      setCursorText("")
                      setCursorVariant("default")
                    }}
                  >
                    <Link href="#work" className="flex items-center gap-2">
                      View Work
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1.2 }}
                  className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:block"
                >
                  <div className="flex flex-col items-center gap-2 text-[#555]">
                    <span className="text-xs font-light">Scroll to explore</span>
                    <ChevronDown className="h-4 w-4 animate-bounce" />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Work Section */}
          <section id="work" className="py-24 sm:py-32" ref={projectsRef}>
            <motion.div
              style={{ opacity: projectsOpacity, y: projectsY }}
              className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
            >
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={stagger}
              >
                <motion.div variants={fadeIn} className="mb-16 flex flex-col md:flex-row md:items-end justify-between">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-normal tracking-tight">Selected Work</h2>
                    <div className="mt-2 h-px w-12 bg-gradient-to-r from-[#FF5470] to-[#FF9770]" />
                  </div>

                  <div className="mt-8 md:mt-0 flex flex-wrap gap-6">
                    {["all", "branding", "digital", "photography", "print", "product"].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={cn(
                          "text-sm font-light capitalize transition-colors relative",
                          activeFilter === filter ? "text-[#111]" : "text-[#555] hover:text-[#111]",
                        )}
                        onMouseEnter={() => {
                          setCursorText(filter)
                          setCursorVariant("text")
                          setCursorColor("#111")
                        }}
                        onMouseLeave={() => {
                          setCursorText("")
                          setCursorVariant("default")
                        }}
                      >
                        {filter}
                        {activeFilter === filter && (
                          <motion.span
                            layoutId="activeFilter"
                            className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-[#FF5470] to-[#FF9770]"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={fadeIn} layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  <AnimatePresence>
                    {filteredProjects.map((project) => (
                      <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="group"
                        onMouseEnter={() => {
                          setActiveProject(project.id)
                          setCursorText("View")
                          setCursorVariant("project")
                          setCursorColor(project.color)
                        }}
                        onMouseLeave={() => {
                          setActiveProject(null)
                          setCursorText("")
                          setCursorVariant("default")
                        }}
                      >
                        <Link href={`#project-${project.id}`} className="block">
                          <div className="relative aspect-[4/5] overflow-hidden">
                            <Image
                              src={project.image || "/placeholder.svg"}
                              alt={project.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div
                              className={cn(
                                "absolute inset-0 bg-opacity-0 transition-colors duration-300 flex items-center justify-center",
                                activeProject === project.id ? `bg-opacity-10` : "group-hover:bg-opacity-5",
                              )}
                              style={{ backgroundColor: project.color }}
                            >
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              >
                                <div
                                  className="w-12 h-12 border rounded-full flex items-center justify-center"
                                  style={{ borderColor: project.color, color: project.color }}
                                >
                                  <ArrowUpRight className="h-5 w-5" />
                                </div>
                              </motion.div>
                            </div>
                          </div>
                          <div className="mt-6 space-y-1">
                            <div className="flex items-center justify-between">
                              <h3 className="text-xl md:text-2xl font-normal">{project.title}</h3>
                              <span className="text-xs text-[#555]">{project.year}</span>
                            </div>
                            <p className="text-sm md:text-base font-light">
                              <span className="text-[#555]">{project.category} — </span>
                              <span className="font-normal" style={{ color: project.color }}>
                                {project.description}
                              </span>
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            </motion.div>
          </section>

          {/* About Section */}
          <section id="about" className="py-24 sm:py-32 bg-[#f2f2f2]">
            <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={stagger}
              >
                <motion.div variants={fadeIn} className="mb-16">
                  <h2 className="text-3xl md:text-4xl font-normal tracking-tight">About</h2>
                  <div className="mt-2 h-px w-12 bg-gradient-to-r from-[#0496FF] to-[#5D67E9]" />
                </motion.div>

                <div className="grid gap-16 md:grid-cols-[1fr_1.5fr] items-start">
                  <motion.div
                    variants={fadeIn}
                    className="relative"
                    onMouseEnter={() => {
                      setCursorText("Hello")
                      setCursorVariant("text")
                      setCursorColor("#0496FF")
                    }}
                    onMouseLeave={() => {
                      setCursorText("")
                      setCursorVariant("default")
                    }}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=600&width=450"
                        alt="Alex Kim"
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0496FF]/10 to-[#5D67E9]/10 mix-blend-multiply" />
                    </div>
                    <div className="absolute top-6 left-6 -z-10 w-full h-full border border-[#0496FF]" />
                  </motion.div>

                  <motion.div variants={fadeIn} className="space-y-12">
                    <div
                      className="space-y-6"
                      onMouseEnter={() => {
                        setCursorText("About me")
                        setCursorVariant("text")
                        setCursorColor("#0496FF")
                      }}
                      onMouseLeave={() => {
                        setCursorText("")
                        setCursorVariant("default")
                      }}
                    >
                      <h3 className="text-2xl md:text-3xl font-normal tracking-tight">Designer & Developer</h3>
                      <p className="text-[#333] leading-relaxed font-light text-base md:text-lg">
                        I'm Alex, a designer and developer focused on creating distinctive digital experiences. My work
                        combines clean aesthetics with thoughtful interactions to help brands{" "}
                        <span className="text-[#0496FF] font-normal">stand out</span> in meaningful ways.
                      </p>
                      <p className="text-[#333] leading-relaxed font-light text-base md:text-lg">
                        With over 8 years of experience, I've collaborated with brands and studios around the world,
                        bringing a distinctive aesthetic to every project that helps them{" "}
                        <span className="text-[#5D67E9] font-normal">stand out</span> from competitors.
                      </p>
                      <p className="text-[#333] leading-relaxed font-light text-base md:text-lg">
                        My approach combines strategic thinking with artistic sensibility—creating work that
                        communicates clearly while <span className="text-[#0496FF] font-normal">standing out</span>{" "}
                        through subtle, sophisticated design choices.
                      </p>
                    </div>

                    <div className="grid gap-12 sm:grid-cols-2">
                      <div
                        className="space-y-6"
                        onMouseEnter={() => {
                          setCursorText("Skills")
                          setCursorVariant("text")
                          setCursorColor("#0496FF")
                        }}
                        onMouseLeave={() => {
                          setCursorText("")
                          setCursorVariant("default")
                        }}
                      >
                        <h4 className="text-lg md:text-xl font-medium tracking-tight">Design</h4>
                        <ul className="space-y-3 text-[#333] font-light text-base">
                          <li className="flex items-baseline gap-3">
                            <div className="w-1 h-1 rounded-full bg-[#0496FF]" />
                            <span>Brand Identity</span>
                          </li>
                          <li className="flex items-baseline gap-3">
                            <div className="w-1 h-1 rounded-full bg-[#1C6AE4]" />
                            <span>UI/UX Design</span>
                          </li>
                          <li className="flex items-baseline gap-3">
                            <div className="w-1 h-1 rounded-full bg-[#343DEB]" />
                            <span>Typography</span>
                          </li>
                          <li className="flex items-baseline gap-3">
                            <div className="w-1 h-1 rounded-full bg-[#4B11E8]" />
                            <span>Art Direction</span>
                          </li>
                          <li className="flex items-baseline gap-3">
                            <div className="w-1 h-1 rounded-full bg-[#5D67E9]" />
                            <span>Editorial Design</span>
                          </li>
                        </ul>
                      </div>

                      <div
                        className="space-y-6"
                        onMouseEnter={() => {
                          setCursorText("Skills")
                          setCursorVariant("text")
                          setCursorColor("#0496FF")
                        }}
                        onMouseLeave={() => {
                          setCursorText("")
                          setCursorVariant("default")
                        }}
                      >
                        <h4 className="text-lg md:text-xl font-medium tracking-tight">Development</h4>
                        <ul className="space-y-3 text-[#333] font-light text-base">
                          <li className="flex items-baseline gap-3">
                            <div className="w-1 h-1 rounded-full bg-[#0496FF]" />
                            <span>Frontend Development</span>
                          </li>
                          <li className="flex items-baseline gap-3">
                            <div className="w-1 h-1 rounded-full bg-[#1C6AE4]" />
                            <span>Creative Coding</span>
                          </li>
                          <li className="flex items-baseline gap-3">
                            <div className="w-1 h-1 rounded-full bg-[#343DEB]" />
                            <span>Interactive Experiences</span>
                          </li>
                          <li className="flex items-baseline gap-3">
                            <div className="w-1 h-1 rounded-full bg-[#4B11E8]" />
                            <span>Animation</span>
                          </li>
                          <li className="flex items-baseline gap-3">
                            <div className="w-1 h-1 rounded-full bg-[#5D67E9]" />
                            <span>WebGL & Three.js</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div
                      className="pt-4"
                      onMouseEnter={() => {
                        setCursorText("Experience")
                        setCursorVariant("text")
                        setCursorColor("#0496FF")
                      }}
                      onMouseLeave={() => {
                        setCursorText("")
                        setCursorVariant("default")
                      }}
                    >
                      <h4 className="text-lg md:text-xl font-medium tracking-tight mb-6">Experience</h4>
                      <div className="space-y-8">
                        <div className="flex justify-between items-start border-b border-[#ddd] pb-6">
                          <div>
                            <h5 className="font-normal text-base md:text-lg">Senior Designer</h5>
                            <p className="text-sm text-[#555] font-light">Mono Studio, Stockholm</p>
                          </div>
                          <span className="text-sm text-[#0496FF] font-medium">2020—Present</span>
                        </div>
                        <div className="flex justify-between items-start border-b border-[#ddd] pb-6">
                          <div>
                            <h5 className="font-normal text-base md:text-lg">UI/UX Designer</h5>
                            <p className="text-sm text-[#555] font-light">Minimal Agency, Copenhagen</p>
                          </div>
                          <span className="text-sm text-[#343DEB] font-medium">2017—2020</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-normal text-base md:text-lg">Visual Designer</h5>
                            <p className="text-sm text-[#555] font-light">Form Collective, Berlin</p>
                          </div>
                          <span className="text-sm text-[#5D67E9] font-medium">2015—2017</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-24 sm:py-32">
            <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={stagger}
              >
                <motion.div variants={fadeIn} className="mb-16">
                  <h2 className="text-3xl md:text-4xl font-normal tracking-tight">Contact</h2>
                  <div className="mt-2 h-px w-12 bg-gradient-to-r from-[#06D6A0] to-[#79DEAA]" />
                </motion.div>

                <div className="grid gap-16 md:grid-cols-2">
                  <motion.div
                    variants={fadeIn}
                    className="space-y-8"
                    onMouseEnter={() => {
                      setCursorText("Contact")
                      setCursorVariant("text")
                      setCursorColor("#06D6A0")
                    }}
                    onMouseLeave={() => {
                      setCursorText("")
                      setCursorVariant("default")
                    }}
                  >
                    <h3 className="text-2xl md:text-3xl font-normal tracking-tight">Let's work together</h3>
                    <p className="text-[#333] leading-relaxed font-light text-base md:text-lg">
                      I'm currently available for freelance projects and collaborations. If you have a project that
                      needs to <span className="text-[#06D6A0] font-normal">stand out</span> through distinctive design
                      and thoughtful execution, let's talk.
                    </p>

                    <div className="space-y-6 pt-4">
                      <div>
                        <p className="text-sm text-[#555] font-light">Email</p>
                        <a
                          href="mailto:hello@alexkim.design"
                          className="font-light text-[#06D6A0] hover:text-[#555] transition-colors"
                        >
                          hello@alexkim.design
                        </a>
                      </div>

                      <div>
                        <p className="text-sm text-[#555] font-light">Based in</p>
                        <p className="font-light">Stockholm, Sweden</p>
                      </div>

                      <div>
                        <p className="text-sm text-[#555] font-light">Social</p>
                        <div className="flex gap-6 mt-1">
                          <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-light hover:text-[#06D6A0] transition-colors"
                            onMouseEnter={() => {
                              setCursorText("Instagram")
                              setCursorVariant("text")
                              setCursorColor("#06D6A0")
                            }}
                            onMouseLeave={() => {
                              setCursorText("")
                              setCursorVariant("default")
                            }}
                          >
                            Instagram
                          </a>
                          <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-light hover:text-[#06D6A0] transition-colors"
                            onMouseEnter={() => {
                              setCursorText("LinkedIn")
                              setCursorVariant("text")
                              setCursorColor("#06D6A0")
                            }}
                            onMouseLeave={() => {
                              setCursorText("")
                              setCursorVariant("default")
                            }}
                          >
                            LinkedIn
                          </a>
                          <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-light hover:text-[#06D6A0] transition-colors"
                            onMouseEnter={() => {
                              setCursorText("Twitter")
                              setCursorVariant("text")
                              setCursorColor("#06D6A0")
                            }}
                            onMouseLeave={() => {
                              setCursorText("")
                              setCursorVariant("default")
                            }}
                          >
                            Twitter
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeIn}>
                    <form
                      className="space-y-8"
                      onMouseEnter={() => {
                        setCursorText("Message")
                        setCursorVariant("text")
                        setCursorColor("#06D6A0")
                      }}
                      onMouseLeave={() => {
                        setCursorText("")
                        setCursorVariant("default")
                      }}
                    >
                      <div className="space-y-3">
                        <Label htmlFor="name" className="text-sm font-normal text-[#333]">
                          Name
                        </Label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          className="border-0 border-b border-[#ddd] rounded-none px-0 py-3 h-auto focus-visible:ring-0 focus-visible:border-[#06D6A0] bg-transparent font-light"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="email" className="text-sm font-normal text-[#333]">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Your email"
                          className="border-0 border-b border-[#ddd] rounded-none px-0 py-3 h-auto focus-visible:ring-0 focus-visible:border-[#06D6A0] bg-transparent font-light"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="message" className="text-sm font-normal text-[#333]">
                          Message
                        </Label>
                        <textarea
                          id="message"
                          placeholder="Tell me about your project..."
                          className="w-full border-0 border-b border-[#ddd] rounded-none px-0 py-3 h-auto focus-visible:ring-0 focus-visible:border-[#06D6A0] bg-transparent font-light resize-none min-h-[120px]"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="rounded-none bg-gradient-to-r from-[#06D6A0] to-[#79DEAA] hover:from-[#79DEAA] hover:to-[#06D6A0] text-white border-0 px-8 py-6 h-auto text-sm font-light transition-all duration-500 mt-8"
                      >
                        Send Message
                      </Button>
                    </form>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <footer className="py-12 border-t border-[#ddd]">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-sm text-[#555] font-light">
                © {new Date().getFullYear()} Alex Kim. All rights reserved.
              </p>

              <div className="flex gap-8">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-light hover:text-[#FF5470] transition-colors"
                  onMouseEnter={() => {
                    setCursorText("Instagram")
                    setCursorVariant("text")
                    setCursorColor("#FF5470")
                  }}
                  onMouseLeave={() => {
                    setCursorText("")
                    setCursorVariant("default")
                  }}
                >
                  Instagram
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-light hover:text-[#0496FF] transition-colors"
                  onMouseEnter={() => {
                    setCursorText("LinkedIn")
                    setCursorVariant("text")
                    setCursorColor("#0496FF")
                  }}
                  onMouseLeave={() => {
                    setCursorText("")
                    setCursorVariant("default")
                  }}
                >
                  LinkedIn
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-light hover:text-[#06D6A0] transition-colors"
                  onMouseEnter={() => {
                    setCursorText("Twitter")
                    setCursorVariant("text")
                    setCursorColor("#06D6A0")
                  }}
                  onMouseLeave={() => {
                    setCursorText("")
                    setCursorVariant("default")
                  }}
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { AnimatedText } from "@/components/animated-text"
import { Magnetic } from "@/components/magnetic"
import { Reveal } from "@/components/reveal"
import { TextReveal } from "@/components/text-reveal"
import { ProjectCard } from "@/components/project-card"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "next-themes"
import { useThemeEffect } from "@/hooks/use-theme-effect"

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
  const { theme } = useTheme()

  const { currentTheme } = useThemeEffect()

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
      border: theme === "dark" ? "1px solid rgba(255, 255, 255, 0.5)" : "1px solid rgba(0, 0, 0, 0.5)",
      x: cursorPosition.x - 12,
      y: cursorPosition.y - 12,
    },
    text: {
      width: "120px",
      height: "120px",
      backgroundColor: cursorColor,
      mixBlendMode: "difference",
      color: theme === "dark" ? "#000" : "#fff",
      x: cursorPosition.x - 60,
      y: cursorPosition.y - 60,
    },
    project: {
      width: "80px",
      height: "80px",
      backgroundColor: cursorColor,
      mixBlendMode: theme === "dark" ? "lighten" : "normal",
      color: "#fff",
      x: cursorPosition.x - 40,
      y: cursorPosition.y - 40,
    },
  }

  const skills = [
    "Brand Identity",
    "UI/UX Design",
    "Frontend Development",
    "Creative Coding",
    "Typography",
    "Motion Design",
    "Art Direction",
    "Interactive Experiences",
    "Editorial Design",
    "Animation",
    "WebGL & Three.js",
  ]

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <div className="min-h-screen bg-background text-foreground selection:bg-brand-red selection:text-white dark:selection:text-black theme-transition">
        {/* Custom Cursor */}
        <motion.div
  ref={cursorRef}
  className="fixed top-0 left-0 rounded-full pointer-events-none z-50 flex items-center justify-center hidden md:flex custom-cursor"
  style={{ mixBlendMode: "difference" }} // 👈 move it here
  variants={{
    default: { x: 0, y: 0, width: "32px", height: "32px", backgroundColor: "#000", border: "2px solid #fff" },
    text: {
      x: 0,
      y: 0,
      width: "80px",
      height: "80px",
      backgroundColor: "#fff",
      color: "#000", // fine if used via class/style
    },
    project: {
      x: 0,
      y: 0,
      width: "200px",
      height: "200px",
      backgroundColor: "#000",
      border: "2px solid #fff",
    },
  }}
  animate={cursorVariant}
  transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
>
  <span
    className={cn(
      "text-sm font-light tracking-wider whitespace-nowrap",
      cursorText ? "opacity-100" : "opacity-0"
    )}
  >
    {cursorText}
  </span>
</motion.div>


        {/* Header/Navigation */}
        <header className="fixed top-0 z-40 w-full py-8 theme-bg-transition">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <Magnetic strength={20}>
                <Link
                  href="/"
                  className="text-lg tracking-tight font-light"
                  onMouseEnter={() => {
                    setCursorText("Home")
                    setCursorVariant("text")
                    setCursorColor(theme === "dark" ? "#fff" : "#111")
                  }}
                  onMouseLeave={() => {
                    setCursorText("")
                    setCursorVariant("default")
                  }}
                >
                  ALEX KIM
                </Link>
              </Magnetic>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-12">
                {["home", "work", "about", "contact"].map((section) => (
                  <Magnetic key={section} strength={10}>
                    <Link
                      href={`#${section}`}
                      className={cn(
                        "text-sm font-light capitalize transition-colors relative py-2",
                        activeSection === section ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                      )}
                      onMouseEnter={() => {
                        setCursorText(section)
                        setCursorVariant("text")
                        setCursorColor(theme === "dark" ? "#fff" : "#111")
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
                          className="absolute bottom-0 left-0 h-px w-full bg-foreground"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  </Magnetic>
                ))}

                <ThemeToggle
                  onMouseEnter={() => {
                    setCursorText("Theme")
                    setCursorVariant("text")
                    setCursorColor(theme === "dark" ? "#fff" : "#111")
                  }}
                  onMouseLeave={() => {
                    setCursorText("")
                    setCursorVariant("default")
                  }}
                />
              </nav>

              {/* Mobile Menu Button */}
              <div className="flex items-center gap-4 md:hidden">
                <ThemeToggle />
                <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
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
                className="md:hidden bg-background theme-transition"
              >
                <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
                  {["home", "work", "about", "contact"].map((section) => (
                    <Link
                      key={section}
                      href={`#${section}`}
                      className={cn(
                        "text-sm font-light capitalize transition-colors",
                        activeSection === section ? "text-foreground" : "text-muted-foreground",
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
          <section id="home" className="min-h-screen flex items-center pt-20 theme-bg-transition" ref={heroRef}>
            <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div style={{ opacity: heroOpacity, y: heroY, scale: heroScale }} className="max-w-3xl">
              <AnimatedText
                  text={["Distinctive", "design that"]}
                  el="h1"
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.1] tracking-tight"
                  animation={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                />
              <div
                onMouseEnter={() => {
                  setCursorText("Hello");
                  setCursorVariant("text");
                  setCursorColor(theme === "dark" ? "#fff" : "#111");
                }}
                onMouseLeave={() => {
                  setCursorText("");
                  setCursorVariant("default");
                }}
              >
               
              </div>

             

                <motion.span
                  className="block mt-2 italic font-medium text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-red to-brand-orange dark:from-brand-red/90 dark:to-brand-orange/90 dark-gradient">
                    stands out.
                  </span>
                </motion.span>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-12 text-lg text-muted-foreground font-light max-w-xl leading-relaxed"
                  onMouseEnter={() => {
                    setCursorText("About me")
                    setCursorVariant("text")
                    setCursorColor(theme === "dark" ? "#fff" : "#111")
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
                  transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-12"
                >
                  <Magnetic strength={40}>
                    <Button
                      asChild
                      className="rounded-none bg-gradient-to-r from-brand-red to-brand-orange hover:from-brand-orange hover:to-brand-red text-white border-0 px-8 py-6 h-auto text-sm font-light transition-all duration-500 dark:from-brand-red/90 dark:to-brand-orange/90 dark:hover:from-brand-orange/90 dark:hover:to-brand-red/90"
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
                  </Magnetic>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1.2 }}
                  className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:block"
                >
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <span className="text-xs font-light">Scroll to explore</span>
                    <ChevronDown className="h-4 w-4 animate-bounce" />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Work Section */}
          <section id="work" className="py-24 sm:py-32 theme-bg-transition" ref={projectsRef}>
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
                    <TextReveal>
                      <h2 className="text-3xl md:text-4xl font-normal tracking-tight">Selected Work</h2>
                    </TextReveal>
                    <div className="mt-2 h-px w-12 bg-gradient-to-r from-brand-red to-brand-orange dark:from-brand-red/90 dark:to-brand-orange/90" />
                  </div>

                  <div className="mt-8 md:mt-0 flex flex-wrap gap-6">
                    {["all", "branding", "digital", "photography", "print", "product"].map((filter, index) => (
                      <Reveal key={filter} delay={index * 0.1}>
                        <button
                          onClick={() => setActiveFilter(filter)}
                          className={cn(
                            "text-sm font-light capitalize transition-colors relative",
                            activeFilter === filter ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                          )}
                          onMouseEnter={() => {
                            setCursorText(filter)
                            setCursorVariant("text")
                            setCursorColor(theme === "dark" ? "#fff" : "#111")
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
                              className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-brand-red to-brand-orange dark:from-brand-red/90 dark:to-brand-orange/90"
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          )}
                        </button>
                      </Reveal>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={fadeIn} layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  <AnimatePresence>
                    {filteredProjects.map((project, index) => (
                      <Reveal key={project.id} delay={index * 0.1} once={false}>
                        <ProjectCard
                          project={project}
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
                          isActive={activeProject === project.id}
                        />
                      </Reveal>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            </motion.div>
          </section>

          {/* About Section */}
          <section id="about" className="py-24 sm:py-32 bg-secondary theme-bg-transition">
            <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={stagger}
              >
                <motion.div variants={fadeIn} className="mb-16">
                  <TextReveal>
                    <h2 className="text-3xl md:text-4xl font-normal tracking-tight">About</h2>
                  </TextReveal>
                  <div className="mt-2 h-px w-12 bg-gradient-to-r from-brand-blue to-brand-indigo dark:from-brand-blue/90 dark:to-brand-indigo/90" />
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
                    <Reveal>
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <Image
                          src="/placeholder.svg?height=600&width=450"
                          alt="Alex Kim"
                          fill
                          className="object-cover dark-image"
                          priority
                        />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 to-brand-indigo/10 mix-blend-multiply dark:from-brand-blue/20 dark:to-brand-indigo/20"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                      <motion.div
                        className="absolute top-6 left-6 -z-10 w-full h-full border border-brand-blue dark:border-brand-blue/70"
                        initial={{ opacity: 0, x: -20, y: -20 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 1, delay: 0.7 }}
                      />
                    </Reveal>
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
                      <TextReveal>
                        <h3 className="text-2xl md:text-3xl font-normal tracking-tight">Designer & Developer</h3>
                      </TextReveal>

                      <Reveal delay={0.1}>
                        <p className="text-foreground/80 leading-relaxed font-light text-base md:text-lg">
                          I'm Alex, a designer and developer focused on creating distinctive digital experiences. My
                          work combines clean aesthetics with thoughtful interactions to help brands{" "}
                          <span className="text-brand-blue dark:text-brand-blue/90 font-normal">stand out</span> in
                          meaningful ways.
                        </p>
                      </Reveal>

                      <Reveal delay={0.2}>
                        <p className="text-foreground/80 leading-relaxed font-light text-base md:text-lg">
                          With over 8 years of experience, I've collaborated with brands and studios around the world,
                          bringing a distinctive aesthetic to every project that helps them{" "}
                          <span className="text-brand-indigo dark:text-brand-indigo/90 font-normal">stand out</span>{" "}
                          from competitors.
                        </p>
                      </Reveal>

                      <Reveal delay={0.3}>
                        <p className="text-foreground/80 leading-relaxed font-light text-base md:text-lg">
                          My approach combines strategic thinking with artistic sensibility—creating work that
                          communicates clearly while{" "}
                          <span className="text-brand-blue dark:text-brand-blue/90 font-normal">standing out</span>{" "}
                          through subtle, sophisticated design choices.
                        </p>
                      </Reveal>
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
                        <TextReveal>
                          <h4 className="text-lg md:text-xl font-medium tracking-tight">Design</h4>
                        </TextReveal>

                        <ul className="space-y-3 text-foreground/80 font-light text-base">
                          {["Brand Identity", "UI/UX Design", "Typography", "Art Direction", "Editorial Design"].map(
                            (skill, index) => (
                              <Reveal key={skill} delay={0.1 + index * 0.1}>
                                <li className="flex items-baseline gap-3">
                                  <div
                                    className="w-1 h-1 rounded-full"
                                    style={{ backgroundColor: `rgba(4, 150, 255, ${1 - index * 0.15})` }}
                                  />
                                  <span>{skill}</span>
                                </li>
                              </Reveal>
                            ),
                          )}
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
                        <TextReveal>
                          <h4 className="text-lg md:text-xl font-medium tracking-tight">Development</h4>
                        </TextReveal>

                        <ul className="space-y-3 text-foreground/80 font-light text-base">
                          {[
                            "Frontend Development",
                            "Creative Coding",
                            "Interactive Experiences",
                            "Animation",
                            "WebGL & Three.js",
                          ].map((skill, index) => (
                            <Reveal key={skill} delay={0.1 + index * 0.1}>
                              <li className="flex items-baseline gap-3">
                                <div
                                  className="w-1 h-1 rounded-full"
                                  style={{ backgroundColor: `rgba(93, 103, 233, ${1 - index * 0.15})` }}
                                />
                                <span>{skill}</span>
                              </li>
                            </Reveal>
                          ))}
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
                      <TextReveal>
                        <h4 className="text-lg md:text-xl font-medium tracking-tight mb-6">Experience</h4>
                      </TextReveal>

                      <div className="space-y-8">
                        <Reveal delay={0.1}>
                          <div className="flex justify-between items-start border-b border-border pb-6">
                            <div>
                              <h5 className="font-normal text-base md:text-lg">Senior Designer</h5>
                              <p className="text-sm text-muted-foreground font-light">Mono Studio, Stockholm</p>
                            </div>
                            <span className="text-sm text-brand-blue dark:text-brand-blue/90 font-medium">
                              2020—Present
                            </span>
                          </div>
                        </Reveal>

                        <Reveal delay={0.2}>
                          <div className="flex justify-between items-start border-b border-border pb-6">
                            <div>
                              <h5 className="font-normal text-base md:text-lg">UI/UX Designer</h5>
                              <p className="text-sm text-muted-foreground font-light">Minimal Agency, Copenhagen</p>
                            </div>
                            <span className="text-sm text-brand-indigo dark:text-brand-indigo/90 font-medium">
                              2017—2020
                            </span>
                          </div>
                        </Reveal>

                        <Reveal delay={0.3}>
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-normal text-base md:text-lg">Visual Designer</h5>
                              <p className="text-sm text-muted-foreground font-light">Form Collective, Berlin</p>
                            </div>
                            <span className="text-sm text-brand-purple dark:text-brand-purple/90 font-medium">
                              2015—2017
                            </span>
                          </div>
                        </Reveal>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-24 sm:py-32 theme-bg-transition">
            <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={stagger}
              >
                <motion.div variants={fadeIn} className="mb-16">
                  <TextReveal>
                    <h2 className="text-3xl md:text-4xl font-normal tracking-tight">Contact</h2>
                  </TextReveal>
                  <div className="mt-2 h-px w-12 bg-gradient-to-r from-brand-green to-brand-mint dark:from-brand-green/90 dark:to-brand-mint/90" />
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
                    <TextReveal>
                      <h3 className="text-2xl md:text-3xl font-normal tracking-tight">Let's work together</h3>
                    </TextReveal>

                    <Reveal>
                      <p className="text-foreground/80 leading-relaxed font-light text-base md:text-lg">
                        I'm currently available for freelance projects and collaborations. If you have a project that
                        needs to{" "}
                        <span className="text-brand-green dark:text-brand-green/90 font-normal">stand out</span> through
                        distinctive design and thoughtful execution, let's talk.
                      </p>
                    </Reveal>

                    <div className="space-y-6 pt-4">
                      <Reveal delay={0.1}>
                        <div>
                          <p className="text-sm text-muted-foreground font-light">Email</p>
                          <Magnetic strength={10}>
                            <a
                              href="mailto:hello@alexkim.design"
                              className="font-light text-brand-green dark:text-brand-green/90 hover:text-muted-foreground transition-colors"
                            >
                              hello@alexkim.design
                            </a>
                          </Magnetic>
                        </div>
                      </Reveal>

                      <Reveal delay={0.2}>
                        <div>
                          <p className="text-sm text-muted-foreground font-light">Based in</p>
                          <p className="font-light">Stockholm, Sweden</p>
                        </div>
                      </Reveal>

                      <Reveal delay={0.3}>
                        <div>
                          <p className="text-sm text-muted-foreground font-light">Social</p>
                          <div className="flex gap-6 mt-1">
                            <Magnetic strength={10}>
                              <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-light hover:text-brand-green dark:hover:text-brand-green/90 transition-colors"
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
                            </Magnetic>
                            <Magnetic strength={10}>
                              <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-light hover:text-brand-green dark:hover:text-brand-green/90 transition-colors"
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
                            </Magnetic>
                            <Magnetic strength={10}>
                              <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-light hover:text-brand-green dark:hover:text-brand-green/90 transition-colors"
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
                            </Magnetic>
                          </div>
                        </div>
                      </Reveal>
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
                      <Reveal delay={0.1}>
                        <div className="space-y-3">
                          <Label htmlFor="name" className="text-sm font-normal">
                            Name
                          </Label>
                          <Input
                            id="name"
                            placeholder="Your name"
                            className="border-0 border-b border-border rounded-none px-0 py-3 h-auto focus-visible:ring-0 focus-visible:border-brand-green dark:focus-visible:border-brand-green/90 bg-transparent font-light"
                          />
                        </div>
                      </Reveal>

                      <Reveal delay={0.2}>
                        <div className="space-y-3">
                          <Label htmlFor="email" className="text-sm font-normal">
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Your email"
                            className="border-0 border-b border-border rounded-none px-0 py-3 h-auto focus-visible:ring-0 focus-visible:border-brand-green dark:focus-visible:border-brand-green/90 bg-transparent font-light"
                          />
                        </div>
                      </Reveal>

                      <Reveal delay={0.3}>
                        <div className="space-y-3">
                          <Label htmlFor="message" className="text-sm font-normal">
                            Message
                          </Label>
                          <textarea
                            id="message"
                            placeholder="Tell me about your project..."
                            className="w-full border-0 border-b border-border rounded-none px-0 py-3 h-auto focus-visible:ring-0 focus-visible:border-brand-green dark:focus-visible:border-brand-green/90 bg-transparent font-light resize-none min-h-[120px]"
                          />
                        </div>
                      </Reveal>

                      <Reveal delay={0.4}>
                        <Magnetic strength={30}>
                          <Button
                            type="submit"
                            className="rounded-none bg-gradient-to-r from-brand-green to-brand-mint hover:from-brand-mint hover:to-brand-green text-white border-0 px-8 py-6 h-auto text-sm font-light transition-all duration-500 mt-8 dark:from-brand-green/90 dark:to-brand-mint/90 dark:hover:from-brand-mint/90 dark:hover:to-brand-green/90"
                          >
                            Send Message
                          </Button>
                        </Magnetic>
                      </Reveal>
                    </form>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <footer className="py-12 border-t border-border theme-bg-transition">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-sm text-muted-foreground font-light">
                © {new Date().getFullYear()} Alex Kim. All rights reserved.
              </p>

              <div className="flex gap-8">
                <Magnetic strength={5}>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-light hover:text-brand-red dark:hover:text-brand-red/90 transition-colors"
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
                </Magnetic>
                <Magnetic strength={5}>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-light hover:text-brand-blue dark:hover:text-brand-blue/90 transition-colors"
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
                </Magnetic>
                <Magnetic strength={5}>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-light hover:text-brand-green dark:hover:text-brand-green/90 transition-colors"
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
                </Magnetic>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}
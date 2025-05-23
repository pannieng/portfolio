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

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
      title: "Stock Trend Classification System",
      description: "Classify stock trends",
      category: "AI",
      year: "2024",
      image: "/placeholder.svg?height=600&width=800",
      color: "#FF5470",
    },
    {
      id: 2,
      title: "Plant AI System",
      description: "Checking on plant health condition system",
      category: "AI",
      year: "2025",
      image: "/placeholder.svg?height=600&width=800",
      color: "#0496FF",
    },
    {
      id: 3,
      title: "Recipe Collection System",
      description: "Collect Recipe",
      category: "Website",
      year: "2022",
      image: "/placeholder.svg?height=600&width=800",
      color: "#6665DD",
    },
    // {
    //   id: 4,
    //   title: "Whisper",
    //   description: "Packaging design",
    //   category: "Product",
    //   year: "2022",
    //   image: "/placeholder.svg?height=600&width=800",
    //   color: "#06D6A0",
    // },
    // {
    //   id: 5,
    //   title: "Lucid",
    //   description: "Interactive installation",
    //   category: "Digital",
    //   year: "2023",
    //   image: "/placeholder.svg?height=600&width=800",
    //   color: "#FFC43D",
    // },
    // {
    //   id: 6,
    //   title: "Serenity",
    //   description: "Editorial design",
    //   category: "Print",
    //   year: "2022",
    //   image: "/placeholder.svg?height=600&width=800",
    //   color: "#EF476F",
    // },
  ]

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category.toLowerCase() === activeFilter.toLowerCase())

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <div className="min-h-screen bg-background text-foreground selection:bg-brand-red selection:text-white dark:selection:text-black theme-transition">
        {/* Header/Navigation */}
        <header className="fixed top-0 z-40 w-full py-8 theme-bg-transition">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <Magnetic strength={20}>
                <Link
                  href="/"
                  className="text-lg tracking-tight font-light"
                >
                  PANNIE NG
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

                <ThemeToggle />
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
                <div>
                  <AnimatedText
                    text={["Crafting Innovative", "Solutions with"]}
                    el="h1"
                    className="text-5xl sm:text-5xl md:text-7xl lg:text-8xl font-light leading-[1.1] tracking-tight"
                    animation={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                  />
                </div>

                <motion.span
                  className="block mt-2 italic font-medium text-5xl sm:text-6xl md:text-7xl lg:text-6xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-red to-brand-orange dark:from-brand-red/90 dark:to-brand-orange/90 dark-gradient">
                  Automation, Full-Stack, and AI.
                  </span>
                </motion.span>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-12 text-lg text-muted-foreground font-light max-w-xl leading-relaxed"
                >
                Welcome to my portfolio. I am Pannie, a skilled software engineer with extensive experience in freelance projects, full-stack development, 
                and web development for testing instruments. Currently, my work is focused on industrial automation, where I leverage my technical expertise to design and 
                implement innovative solutions. In addition, I am actively exploring AI projects, with a strong interest in integrating artificial intelligence technologies into practical applications. 
                This portfolio website showcases a selection of my work, reflecting my commitment to delivering high-quality, impactful, and well-engineered systems.
                 I am always open to collaboration and eager to contribute to meaningful projects. Thank you for visiting.


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
                    {/* {["all", "AI", "Website", "photography", "print", "product"].map((filter, index) => ( */}
                     {["all", "AI", "Website"].map((filter, index) => (
                      <Reveal key={filter} delay={index * 0.1}>
                        <button
                          onClick={() => setActiveFilter(filter)}
                          className={cn(
                            "text-sm font-light capitalize transition-colors relative",
                            activeFilter === filter ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                          )}
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
                          onMouseEnter={() => setActiveProject(project.id)}
                          onMouseLeave={() => setActiveProject(null)}
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
                  >
                    <Reveal>
                      <div className="relative aspect-square overflow-hidden rounded-lg">
                        <Image
                          src="/profile.jpg"
                          alt="Pannie Ng"
                          width={600}
                          height={600}
                          className="object-cover"
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
                    <div className="space-y-6">
                      <TextReveal>
                        <h3 className="text-2xl md:text-3xl font-normal tracking-tight">Software Engineer</h3>
                      </TextReveal>

                      <Reveal delay={0.1}>
                        <p className="text-foreground/80 leading-relaxed font-light text-base md:text-lg">
                          I'm Pannie, a  <span className="text-brand-blue dark:text-brand-blue/90 font-normal">fresh graduate</span> with a major in <span className="text-brand-blue dark:text-brand-blue/90 font-normal">Computer Science</span> and less than a year of experience in <span className="text-brand-blue dark:text-brand-blue/90 font-normal">industrial automation</span>. I am passionate about exploring  <span className="text-brand-blue dark:text-brand-blue/90 font-normal">AI projects</span> and using technology to drive <span className="text-brand-blue dark:text-brand-blue/90 font-normal">innovation</span>.
                        </p>
                      </Reveal>

                      <Reveal delay={0.2}>
                        <p className="text-foreground/80 leading-relaxed font-light text-base md:text-lg">
                          My journey so far has included working on  <span className="text-brand-blue dark:text-brand-blue/90 font-normal">automation projects</span> that combine my technical skills with  <span className="text-brand-blue dark:text-brand-blue/90 font-normal">problem-solving abilities</span> to deliver  <span className="text-brand-blue dark:text-brand-blue/90 font-normal">efficient solutions</span>. In addition, I have contributed to  <span className="text-brand-blue dark:text-brand-blue/90 font-normal">web development projects</span> involving testing instruments and  <span className="text-brand-blue dark:text-brand-blue/90 font-normal">full-stack development</span>.
                        </p>
                      </Reveal>

                      <Reveal delay={0.3}>
                        <p className="text-foreground/80 leading-relaxed font-light text-base md:text-lg">
                          I approach every project with a blend of  <span className="text-brand-blue dark:text-brand-blue/90 font-normal">creativity</span>,  <span className="text-brand-blue dark:text-brand-blue/90 font-normal">technical expertise</span>, and  <span className="text-brand-blue dark:text-brand-blue/90 font-normal">attention to detail</span>, always striving to create  <span className="text-brand-blue dark:text-brand-blue/90 font-normal">impactful systems</span> that improve functionality and user experience.
                        </p>
                      </Reveal>

                    </div>

                    <div className="grid gap-12 sm:grid-cols-2">
                      {/* <div className="space-y-6">
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
                      </div>  */}

                      <div className="space-y-6">
                        <TextReveal>
                          <h4 className="text-lg md:text-xl font-medium tracking-tight">Technical Skills</h4>
                        </TextReveal>

                        <ul className="space-y-3 text-foreground/80 font-light text-base">
                          {[
                           "HTML, CSS, JavaScript, PHP, Python, Java, MySQL",
                          "Version Control with Git & GitHub",
                          "Frameworks: Laravel PHP",
                          "Tools: VS Code, PyCharm, IntelliJ, Android Studio, Jupyter Notebook",
                          "Platforms: VirtualBox, Eggplant (SenseTalk)",
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

                    <div className="pt-4">
                      <TextReveal>
                        <h4 className="text-lg md:text-xl font-medium tracking-tight mb-6">Experience</h4>
                      </TextReveal>

                      <div className="space-y-8">
                        <Reveal delay={0.1}>
                          <div className="flex justify-between items-start border-b border-border pb-6">
                            <div>
                              <h5 className="font-normal text-base md:text-lg">Software Engineer</h5>
                              <p className="text-sm text-muted-foreground font-light">Greatech, Penang</p>
                            </div>
                            <span className="text-sm text-brand-blue dark:text-brand-blue/90 font-medium">
                              2024—Present
                            </span>
                          </div>
                        </Reveal>

                        <Reveal delay={0.2}>
                          <div className="flex justify-between items-start border-b border-border pb-6">
                            <div>
                              <h5 className="font-normal text-base md:text-lg">QA Software Engineer</h5>
                              <p className="text-sm text-muted-foreground font-light">Keysight, Penang</p>
                            </div>
                            <span className="text-sm text-brand-indigo dark:text-brand-indigo/90 font-medium">
                              May 2023—Dec 2023
                            </span>
                          </div>
                        </Reveal>

                        <Reveal delay={0.3}>
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-normal text-base md:text-lg">Freelance software developer</h5>
                              <p className="text-sm text-muted-foreground font-light">The Reamers Envision Sdn Bhd, Penang</p>
                            </div>
                            <span className="text-sm text-brand-purple dark:text-brand-purple/90 font-medium">
                              Sep 2022—Nov 2022
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
                  >
                    <TextReveal>
                      <h3 className="text-2xl md:text-3xl font-normal tracking-tight">Let's work together</h3>
                    </TextReveal>

                    <Reveal>
                      <p className="text-foreground/80 leading-relaxed font-light text-base md:text-lg">
                      I'm currently open to freelance and work opportunities. If you're looking for a dedicated software engineer{" "}
                        <span className="text-brand-green dark:text-brand-green/90 font-normal">to bring innovation and impact to your project,</span> feel free to reach out.
                      </p>
                    </Reveal>

                    <div className="space-y-6 pt-4">
                      <Reveal delay={0.1}>
                        <div>
                          <p className="text-sm text-muted-foreground font-light">Email</p>
                          <Magnetic strength={10}>
                            <a
                              href="mailto:pannie.shin@gmail.com"
                              className="font-light text-brand-green dark:text-brand-green/90 hover:text-muted-foreground transition-colors"
                            >
                              pannie.shin@gmail.com
                            </a>
                          </Magnetic>
                        </div>
                      </Reveal>

                      <Reveal delay={0.2}>
                        <div>
                          <p className="text-sm text-muted-foreground font-light">Based in</p>
                          <p className="font-light">Penang</p>
                        </div>
                      </Reveal>

                      <Reveal delay={0.3}>
                        <div>
                          <p className="text-sm text-muted-foreground font-light">Social</p>
                          <div className="flex gap-6 mt-1">
                            {/* <Magnetic strength={10}>
                              <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-light hover:text-brand-green dark:hover:text-brand-green/90 transition-colors"
                              >
                                Instagram
                              </a>
                            </Magnetic> */}
                            <Magnetic strength={10}>
                              <a
                                href="https://www.linkedin.com/in/pannie-ng-shin-lu-176002244?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-light hover:text-brand-green dark:hover:text-brand-green/90 transition-colors"
                              >
                                LinkedIn
                              </a>
                            </Magnetic>
                            {/* <Magnetic strength={10}>
                              <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-light hover:text-brand-green dark:hover:text-brand-green/90 transition-colors"
                              >
                                Twitter
                              </a>
                            </Magnetic> */}
                          </div>
                        </div>
                      </Reveal>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeIn}>
                    <form className="space-y-8">
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
                            placeholder="Message ...."
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
                © {new Date().getFullYear()} Pannie Ng. All rights reserved.
              </p>

              <div className="flex gap-8">
                {/* <Magnetic strength={5}>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-light hover:text-brand-red dark:hover:text-brand-red/90 transition-colors"
                  >
                    Instagram
                  </a>
                </Magnetic> */}
                <Magnetic strength={5}>
                  <a
                    href="https://www.linkedin.com/in/pannie-ng-shin-lu-176002244?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-light hover:text-brand-blue dark:hover:text-brand-blue/90 transition-colors"
                  >
                    LinkedIn
                  </a>
                </Magnetic>
                {/* <Magnetic strength={5}>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-light hover:text-brand-green dark:hover:text-brand-green/90 transition-colors"
                  >
                    Twitter
                  </a>
                </Magnetic> */}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}
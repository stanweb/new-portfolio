"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download } from "lucide-react"
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"
import { TextReveal } from "@/components/text-reveal"
import { SOCIALS, HERO_SOCIAL_IDS, type SocialId } from "@/lib/social"

const statusMessages = [
  "Available for senior opportunities",
  "Building production banking systems",
  "Exploring event-driven architectures",
]

const EXPO = [0.22, 1, 0.36, 1] as const

function MagneticButton({ children, ...props }: React.ComponentProps<typeof Button>) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 20, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 200, damping: 20, mass: 0.5 })

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const dx = e.clientX - (rect.left + rect.width / 2)
        const dy = e.clientY - (rect.top + rect.height / 2)
        x.set(dx * 0.25)
        y.set(dy * 0.25)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      <Button {...props}>{children}</Button>
    </motion.button>
  )
}

function StatusPill() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setIndex((i) => (i + 1) % statusMessages.length), 4000)
    return () => clearInterval(id)
  }, [reduce])

  return (
    <div className="inline-flex items-center gap-2 text-sm font-medium text-primary bg-primary/10 border border-primary/20 px-4 py-2 rounded-full">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
      </span>
      <span className="relative grid h-5 w-64 overflow-hidden text-left">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={statusMessages[index]}
            initial={reduce ? { opacity: 0 } : { y: "110%" }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            exit={reduce ? { opacity: 0 } : { y: "-110%" }}
            transition={{ duration: 0.45, ease: EXPO }}
            className="col-start-1 row-start-1 block leading-5"
          >
            {statusMessages[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section
      ref={ref}
      className="relative min-h-[85dvh] flex items-center justify-center px-4 pt-20 pb-12 overflow-hidden"
    >
      {/* Aurora background */}
      <motion.div
        aria-hidden="true"
        style={{ y, opacity }}
        className="absolute inset-0 -z-10"
      >
        <div className="aurora aurora-a" />
        <div className="aurora aurora-b" />
        <div className="aurora aurora-c" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,var(--background))]" />
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          }}
        />
      </motion.div>

      <div className="container max-w-5xl mx-auto">
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: EXPO }}
            className="flex justify-center"
          >
            <StatusPill />
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-balance">
            <TextReveal delay={0.2} stagger={0.06} duration={0.7}>
              Stanley Kamau
            </TextReveal>
          </h1>

          <h2 className="text-2xl md:text-3xl text-muted-foreground font-medium text-balance">
            <TextReveal delay={0.5} stagger={0.04} duration={0.6}>
              Software Engineer — Frontend & Systems
            </TextReveal>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: EXPO }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty"
          >
            Shipping production systems for banking and fintech. Currently at Diamond Trust Bank — 
            React, Node.js, Spring Boot. I build fast, resilient interfaces and the infrastructure that keeps them running.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease: EXPO }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2"
          >
            <MagneticButton size="lg" asChild className="group">
              <a href="/resume">
                <Download className="mr-2 h-4 w-4" />
                View Resume
              </a>
            </MagneticButton>
            <Button size="lg" variant="outline" asChild>
              <a href="#contact">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="flex gap-4 justify-center pt-2"
          >
            {HERO_SOCIAL_IDS.map((id: SocialId) => {
              const social = SOCIALS[id]
              const Icon = social.icon
              return (
                <Button key={id} variant="ghost" size="icon" asChild>
                  <a
                    href={social.href}
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noopener noreferrer" : undefined}
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </Button>
              )
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="pt-2"
          >
            <a
              href="#projects"
              className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
            >
              View Projects
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

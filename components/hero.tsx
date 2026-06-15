"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion"
import { TextReveal } from "@/components/text-reveal"
import { SOCIALS, HERO_SOCIAL_IDS, type SocialId } from "@/lib/social"
import { OrbitChips } from "@/components/orbit-chips"

const statusMessages = [
  "Available for opportunities",
  "Building AI-powered tools",
  "Open to senior frontend roles",
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
  return (
    <div className="inline-flex items-center gap-2 text-sm font-medium text-primary bg-primary/10 border border-primary/20 px-4 py-2 rounded-full">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
      </span>
      <span className="relative h-5 w-56 overflow-hidden">
        {statusMessages.map((msg, i) => (
          <motion.span
            key={msg}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: EXPO, delay: 0.6 + i * 0.05 }}
            className="block"
          >
            {msg}
          </motion.span>
        ))}
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
      className="relative min-h-[85vh] flex items-center justify-center px-4 pt-20 pb-12 overflow-hidden"
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
          className="hero-grid-pulse absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
            // CSS variables for the keyframe to interpolate between.
            ["--hero-grid-opacity-min" as string]: "0.025",
            ["--hero-grid-opacity-max" as string]: "0.06",
          }}
        />
        <OrbitChips />
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

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
            <TextReveal delay={0.2} stagger={0.06} duration={0.7}>
              Stanley Kamau
            </TextReveal>
          </h1>

          <h2 className="text-2xl md:text-3xl text-muted-foreground font-medium text-balance">
            <TextReveal delay={0.5} stagger={0.04} duration={0.6}>
              FullStack Engineer
            </TextReveal>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: EXPO }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty"
          >
            Crafting dynamic, user-centric web applications with Spring Boot, Next.js, and React, while building
            scalable and maintainable WordPress websites.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease: EXPO }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2"
          >
            <MagneticButton size="lg" asChild className="group">
              <a href="#projects">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </MagneticButton>
            <Button size="lg" variant="outline" asChild>
              <a href="/blog">Read Blog</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="flex gap-4 justify-center pt-4"
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
        </div>
      </div>
    </section>
  )
}

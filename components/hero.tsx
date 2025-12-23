"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

  return (
    <section ref={ref} className="relative min-h-[85vh] flex items-center justify-center px-4 pt-20 pb-12 overflow-hidden">
      {/* Parallax Background for Dark Mode */}
      <motion.div 
        style={{ y }}
        className="absolute -top-[20%] left-0 w-full h-[140%] -z-10 hidden md:dark:block"
      >
        <Image
          src="/hero-dark.webp"
          alt="Hero Background"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/20 via-background/60 to-background" />
      </motion.div>

      {/* Parallax Background for Light Mode */}
      <motion.div 
        style={{ y }}
        className="absolute -top-[20%] left-0 w-full h-[140%] -z-10 hidden md:block dark:hidden"
      >
        <Image
          src="/hero-light.webp"
          alt="Hero Background Light"
          fill
          className="object-cover opacity-20 grayscale" 
          priority
        />
        <div className="absolute inset-0 bg-[#389560]/20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/60 to-background" />
      </motion.div>

      <div className="container max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <div className="inline-block">
            <span className="text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full">
              Available for opportunities
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">Stanley Kamau</h1>

          <h2 className="text-2xl md:text-3xl text-muted-foreground font-medium text-balance">FullStack Engineer</h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
            Crafting dynamic, user-centric web applications with Spring Boot, NextJs, and React, while building scalable and
            maintainable Wordpress websites.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
            <Button size="lg" asChild className="group">
              <a href="#projects">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/blog">Read Blog</a>
            </Button>
          </div>

          <div className="flex gap-4 justify-center pt-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="mailto:contact@example.com">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

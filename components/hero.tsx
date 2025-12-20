"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

export function Hero() {
  return (
    <section className="min-h-[85vh] flex items-center justify-center px-4 pt-20 pb-12">
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
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-8 mt-16"
        >
          {/*<h2 className="text-3xl md:text-4xl font-bold text-center">About Me</h2>*/}

          <Card className="p-8 md:p-10 border-2 max-w-4xl mx-auto">
            <div className="space-y-6 text-lg leading-relaxed text-left">
              <p className="text-muted-foreground">
                I'm a full-stack developer with a strong focus on building dynamic, high-quality websites and applications.
                I combine creative problem-solving with solid technical execution to deliver engaging, user-focused digital
                experiences.
              </p>

              <p className="text-muted-foreground">
                With hands-on experience in Spring Boot, Node.js, and React, I specialize in creating responsive website with React and NextJs,
               intuitive user interfaces that feel fast and seamless, and efficient and scalable backend solutions.
              </p>

              <p className="text-muted-foreground">
                Driven by a passion for innovation, I’m committed to crafting clean, maintainable solutions that prioritize
                performance, usability, and long-term impact. Turning ideas into products users genuinely enjoy.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

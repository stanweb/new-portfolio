"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-4 bg-linear-to-t">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center">About Me</h2>

          <Card className="p-8 md:p-10 border-2 bg-background/80 backdrop-blur-sm">
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

"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-4">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>

          <Card className="p-8 md:p-10 border-2">
            <div className="space-y-6 text-lg leading-relaxed">
              <p className="text-muted-foreground">
                I'm a Backend & AI Engineer passionate about building robust, scalable systems that solve real-world
                problems. My approach is grounded in strong computer science fundamentals—particularly data structures
                and algorithms—which inform every architectural decision I make.
              </p>

              <p className="text-muted-foreground">
                I believe in learning by building. Whether it's implementing complex RAG pipelines, optimizing database
                queries, or solving algorithmic challenges, I focus on creating clean, maintainable code that
                prioritizes both performance and correctness.
              </p>

              <p className="text-muted-foreground">
                Currently exploring the intersection of traditional backend engineering and modern AI systems, with a
                focus on making large language models practical and production-ready through techniques like vector
                search, embeddings, and local deployment.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

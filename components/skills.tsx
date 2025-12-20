"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Code } from "lucide-react"
import axios from "axios"
import {getIcon} from "@/lib/utils";
import {Loading} from "@/components/loading";
import {SKILLS_GIST_URL} from "@/lib/constants";

interface SkillCategory {
  icon: string
  title: string
  skills: string[]
}

export function Skills() {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSkills() {
      try {
        const response = await axios.get(SKILLS_GIST_URL)
        setSkillCategories(response.data)
      } catch (error) {
        console.error("Failed to fetch skills:", error)
      } finally {
        setLoading(false)
      }
    }

    void fetchSkills()
  }, [])

  return (
    <section id="skills" className="py-24 md:py-32 px-4 bg-muted/30">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Skills & Expertise</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive toolkit for building scalable backend systems and AI applications
            </p>
          </div>

          {loading ? (
            <Loading message={'Loading Skills ...'}/>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {skillCategories.map((category, index) => {
                const IconComponent = getIcon(category.icon) || Code
                return (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="p-6 h-full hover:border-primary transition-colors">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <h3 className="text-xl font-semibold">{category.title}</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {category.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1.5 text-sm bg-secondary text-secondary-foreground rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

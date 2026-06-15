import { Card } from "@/components/ui/card"
import { Code } from "lucide-react"
import { getIcon } from "@/lib/utils"
import { getSkillCategories } from "@/lib/api"
import { Reveal } from "@/components/reveal"
import { SectionAnchor } from "@/components/section-anchor"

export async function Skills() {
  const skillCategories = await getSkillCategories()

  return (
    <section id="skills" className="py-16 md:py-20 px-4 bg-muted/30">
      <div className="container max-w-6xl mx-auto">
        <div className="space-y-12">
          <Reveal className="text-center space-y-4">
            <SectionAnchor number="02" label="SKILLS" />
            <h2 className="text-3xl md:text-4xl font-bold">
              Skills &amp; Expertise
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive toolkit for building scalable backend systems and AI applications
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {skillCategories.map((category, index) => {
              const IconComponent = getIcon(category.icon) || Code
              return (
                <Reveal key={category.title} delay={index * 0.1}>
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
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

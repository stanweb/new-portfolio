import { Card } from "@/components/ui/card"
import { Code } from "lucide-react"
import { getIcon } from "@/lib/utils"
import { getSkillCategories } from "@/lib/api"
import { Reveal } from "@/components/reveal"
import { SectionAnchor } from "@/components/section-anchor"
import { cn } from "@/lib/utils"

const LEVEL_STYLES: Record<string, string> = {
  Expert: "bg-primary text-primary-foreground",
  Proficient: "bg-secondary text-secondary-foreground",
  Exposure: "bg-muted text-muted-foreground",
}

export async function Skills() {
  const skillCategories = await getSkillCategories()

  return (
    <section id="skills" className="py-16 md:py-20 px-4 bg-muted/30">
      <div className="container max-w-6xl mx-auto">
        <div className="space-y-12">
          <Reveal className="text-center space-y-4">
            <SectionAnchor number="04" label="SKILLS" />
            <h2 className="text-3xl md:text-4xl font-bold">
              Skills &amp; Expertise
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Depth across the stack — from React performance to production observability.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {skillCategories.map((category, index) => {
              const IconComponent = getIcon(category.icon) || Code
              const levelStyle = LEVEL_STYLES[category.level] || LEVEL_STYLES.Exposure
              return (
                <Reveal key={category.title} delay={index * 0.1}>
                  <Card className="p-6 h-full hover:border-primary transition-colors">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-semibold">{category.title}</h3>
                          <span
                            className={cn(
                              "px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-full",
                              levelStyle
                            )}
                          >
                            {category.level}
                          </span>
                        </div>
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

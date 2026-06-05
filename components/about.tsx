import { Card } from "@/components/ui/card"
import { Reveal } from "@/components/reveal"
import { SectionAnchor } from "@/components/section-anchor"
import { BookOpen, Briefcase, Code2, Sparkles } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface CurrentItem {
  icon: LucideIcon
  label: string
  value: string
}

const currentItems: CurrentItem[] = [
  { icon: Briefcase, label: "Working on", value: "AI-powered tools for content teams" },
  { icon: Code2, label: "Exploring", value: "Better RAG evaluation patterns" },
  { icon: BookOpen, label: "Reading", value: "Designing Data-Intensive Applications" },
  { icon: Sparkles, label: "Open to", value: "Senior frontend & full-stack roles" },
]

export function About() {
  return (
    <section id="about" className="py-16 md:py-20 px-4 bg-linear-to-t">
      <div className="container max-w-5xl mx-auto">
        <Reveal className="space-y-4 mb-12 text-center">
          <SectionAnchor number="01" label="ABOUT" />
          <h2 className="text-3xl md:text-4xl font-bold text-balance">
            A bit about how I work
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-6">
          <Reveal className="lg:col-span-3">
            <Card className="p-6 md:p-8 border-2 bg-background/80 backdrop-blur-sm h-full">
              <div className="space-y-4 text-base md:text-lg leading-relaxed text-left">
                <p className="text-muted-foreground">
                  I&apos;m a full-stack developer with a strong focus on building dynamic, high-quality websites and
                  applications. I combine creative problem-solving with solid technical execution to deliver engaging,
                  user-focused digital experiences.
                </p>
                <p className="text-muted-foreground">
                  With hands-on experience in Spring Boot, Node.js, and React, I specialize in creating responsive
                  websites with React and Next.js, intuitive user interfaces that feel fast and seamless, and efficient
                  and scalable backend solutions.
                </p>
                <p className="text-muted-foreground">
                  Driven by a passion for innovation, I&apos;m committed to crafting clean, maintainable solutions that
                  prioritize performance, usability, and long-term impact.
                </p>
              </div>
            </Card>
          </Reveal>

          <Reveal className="lg:col-span-2" delay={0.1}>
            <Card className="p-6 md:p-8 border-2 bg-background/80 backdrop-blur-sm h-full">
              <h3 className="text-sm font-mono tracking-widest text-muted-foreground mb-6">CURRENTLY</h3>
              <ul className="space-y-4">
                {currentItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.label} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div>
                        <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                          {item.label}
                        </div>
                        <div className="text-sm font-medium leading-snug">{item.value}</div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

import { Card } from "@/components/ui/card"
import { Reveal } from "@/components/reveal"
import { SectionAnchor } from "@/components/section-anchor"
import { getExperience } from "@/lib/api"
import { Briefcase } from "lucide-react"

export async function Experience() {
  const roles = await getExperience()

  return (
    <section id="experience" className="py-16 md:py-20 px-4">
      <div className="container max-w-5xl mx-auto">
        <Reveal className="space-y-4 mb-12 text-center">
          <SectionAnchor number="05" label="EXPERIENCE" />
          <h2 className="text-3xl md:text-4xl font-bold text-balance">
            Where I&apos;ve worked
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            4+ years of production engineering — most of it in the room when things go wrong.
          </p>
        </Reveal>

        <div className="space-y-6">
          {roles.map((role, index) => (
            <Reveal key={`${role.company}-${role.start}`} delay={index * 0.1}>
              <Card className="p-6 md:p-8 border-2 bg-background/80 backdrop-blur-sm h-full">
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Briefcase className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3 className="text-xl md:text-2xl font-semibold">
                          {role.role} <span className="text-muted-foreground font-normal">· {role.company}</span>
                        </h3>
                        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                          {role.start} – {role.end}
                        </span>
                      </div>
                      {role.location && (
                        <p className="text-sm text-muted-foreground mt-1">{role.location}</p>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-2 text-base leading-relaxed text-muted-foreground pl-14">
                    {role.bullets.map((bullet, i) => (
                      <li key={i} className="relative pl-4">
                        <span
                          aria-hidden="true"
                          className="absolute left-0 top-[0.7em] h-1 w-1 rounded-full bg-primary"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pl-14">
                    {role.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

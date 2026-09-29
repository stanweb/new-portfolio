"use client"

import { Card } from "@/components/ui/card"
import { Reveal } from "@/components/reveal"
import { SectionAnchor } from "@/components/section-anchor"
import { ArrowRight } from "lucide-react"

interface Note {
  title: string
  date: string
  summary: string
  tag: string
}

const NOTES: Note[] = [
  {
    title: "On reducing React re-renders in production dashboards",
    date: "2025-09-15",
    summary:
      "How I cut unnecessary re-renders by 60% in a banking dashboard using memo, useMemo, and component-level code splitting. The impact: smoother scroll performance and happier on-call rotations.",
    tag: "Frontend Performance",
  },
  {
    title: "Lessons from on-call: building runbooks that actually work",
    date: "2025-08-22",
    summary:
      "Most runbooks are written once and never updated. Here is the template I use — structured around symptom → query → action → escalation — that reduced our incident MTTR from 45 minutes to under 10.",
    tag: "Observability",
  },
  {
    title: "Why I moved my spending tracker from SQLite to MySQL",
    date: "2025-07-10",
    summary:
      "A single-config-flag migration strategy that let the same Spring Boot JAR run against either database. No downtime, no data loss, and a clean rollback path if things went sideways.",
    tag: "Backend Architecture",
  },
]

export function WritingPreview() {
  return (
    <section id="notes" className="py-16 md:py-20 px-4 bg-muted/30">
      <div className="container max-w-5xl mx-auto">
        <Reveal className="text-center space-y-4 mb-12">
          <SectionAnchor number="06" label="NOTES" />
          <h2 className="text-3xl md:text-4xl font-bold text-balance">Engineering Notes</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Short, focused thoughts on building production software.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {NOTES.map((note, i) => (
            <Reveal key={note.title} delay={i * 0.1}>
              <a href="/blog" className="block group">
                <Card className="p-6 h-full hover:border-primary transition-colors border-2 bg-background/80 backdrop-blur-sm">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-full bg-primary/10 text-primary">
                        {note.tag}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">
                        {note.date}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {note.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {note.summary}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      <span>Read more</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Card>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

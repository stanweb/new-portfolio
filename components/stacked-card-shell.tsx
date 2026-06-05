import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import type { Project } from "@/lib/api"

interface StackedCardShellProps {
  project: Project
  index: number
  total: number
  size?: "sm" | "md"
}

/**
 * Pure presentational shell for a project card. Used by both the
 * server-rendered scroll-pinned stack and the client live-upgrade path,
 * so any visual tweak to the card lands in one place.
 */
export function StackedCardShell({ project, index, total, size = "md" }: StackedCardShellProps) {
  const padding = size === "md" ? "p-8" : "p-6"
  const titleSize = size === "md" ? "text-2xl md:text-3xl" : "text-xl"
  const bodySize = size === "md" ? "text-lg" : "text-base"
  const cardClass =
    size === "md"
      ? "shadow-2xl shadow-primary/5 bg-card/95 backdrop-blur-sm"
      : ""

  return (
    <Card className={`${padding} h-full flex flex-col hover:border-primary transition-colors group ${cardClass}`}>
      <div className="text-sm font-mono text-muted-foreground mb-4">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>

      <div className="space-y-4 flex-1">
        <h3 className={`${titleSize} font-semibold group-hover:text-primary transition-colors`}>
          {project.title}
        </h3>
        <p className={`text-muted-foreground leading-relaxed ${bodySize}`}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className={`flex gap-3 ${size === "md" ? "pt-6" : "pt-4"}`}>
        <Button size="sm" variant="outline" asChild className="flex-1 bg-transparent">
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" aria-hidden="true" />
            Code
          </a>
        </Button>
        {project.live && (
          <Button size="sm" asChild className="flex-1">
            <a href={project.live} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
              View
            </a>
          </Button>
        )}
      </div>
    </Card>
  )
}

import { getProjects } from "@/lib/api"
import { ProjectsLive } from "@/components/projects-live"
import { HeadingReveal } from "@/components/text-reveal"
import { SectionAnchor } from "@/components/section-anchor"
import { LIVE_SOURCES } from "@/lib/config"

export async function Projects() {
  const initialProjects = await getProjects()

  return (
    <section id="projects" className="py-16 md:py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <SectionAnchor number="03" label="PROJECTS" />
          <HeadingReveal className="text-3xl md:text-4xl font-bold">
            Featured Projects
          </HeadingReveal>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Building practical solutions that demonstrate technical expertise
          </p>
        </div>

        <ProjectsLive
          initialProjects={initialProjects}
          gistUrl={LIVE_SOURCES.projects.gistUrl}
        />
      </div>
    </section>
  )
}

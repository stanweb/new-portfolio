import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { ArchitectureShowcase } from "@/components/architecture-showcase"
import { WritingPreview } from "@/components/writing-preview"
import { Contact } from "@/components/contact"
import { SectionDivider } from "@/components/section-divider"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <SectionDivider />
        <Skills />
        <ArchitectureShowcase />
        <WritingPreview />
        <Contact />
      </main>
    </div>
  )
}

import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { SnowfallBackground } from "@/components/snowfall-background"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <div className="hidden md:block">
          <SnowfallBackground />
        </div>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  )
}

import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Experience } from "@/components/experience"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"
import { SnowfallBackground } from "@/components/snowfall-background"
import { SectionDivider } from "@/components/section-divider"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/*<div className="hidden md:block">*/}
        {/*  <SnowfallBackground />*/}
        {/*</div>*/}
        <Hero />
        <SectionDivider />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
    </div>
  )
}

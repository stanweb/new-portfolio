"use client"

import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import Snowfall from 'react-snowfall'

export default function Home() {
  return (
    <div className="min-h-screen">

      <Navbar />
      <main>
          <div className={'hidden md:flex'}>
              <Snowfall color={'#389560'} />
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

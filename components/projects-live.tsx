"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"
import { useRef } from "react"
import type { Project } from "@/lib/api"
import { StackedCardShell } from "@/components/stacked-card-shell"
import { SyncIndicator, type SyncState } from "@/components/sync-indicator"
import { TiltCard } from "@/components/tilt-card"

interface ProjectsLiveProps {
  initialProjects: Project[]
  gistUrl: string
}

export function ProjectsLive({ initialProjects, gistUrl }: ProjectsLiveProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [sync, setSync] = useState<SyncState>("idle")

  useEffect(() => {
    let cancelled = false
    const controller = new AbortController()

    async function fetchRemote() {
      setSync("syncing")
      try {
        const res = await fetch(gistUrl, { signal: controller.signal, cache: "no-store" })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = (await res.json()) as unknown
        if (!Array.isArray(data)) throw new Error("Invalid projects payload")
        const valid = data.filter(
          (p): p is Project =>
            typeof p === "object" &&
            p !== null &&
            typeof (p as Project).title === "string" &&
            Array.isArray((p as Project).tech)
        )
        if (valid.length === 0) throw new Error("Empty or invalid projects payload")
        if (cancelled) return
        setProjects(valid)
        setSync("synced")
      } catch (err) {
        if (cancelled) return
        if (err instanceof DOMException && err.name === "AbortError") return
        setSync("error")
      }
    }

    void fetchRemote()
    return () => {
      cancelled = true
      controller.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gistUrl])

  return (
    <>
      <SyncIndicator
        state={sync}
        syncingLabel="Checking for project updates…"
        centered
        className="mb-6"
      />
      <ProjectsStack projects={projects} />
    </>
  )
}

// ---------- Stack (mobile grid + desktop scroll-pinned, both client-side) ----------

const EXPO = [0.22, 1, 0.36, 1] as const

function ProjectsStack({ projects }: { projects: Project[] }) {
  return (
    <>
      <div className="grid md:hidden gap-6">
        {projects.map((project, i) => (
          <MobileCard key={`${project.title}-${i}`} project={project} index={i} />
        ))}
      </div>
      <DesktopStack projects={projects} />
    </>
  )
}

function MobileCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EXPO, delay: index * 0.1 }}
    >
      <TiltCard>
        <StackedCardShell project={project} index={index} total={0} size="sm" />
      </TiltCard>
    </motion.div>
  )
}

function DesktopStack({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  return (
    <div
      ref={ref}
      className="hidden md:block relative"
      style={{ height: `${projects.length * 100}vh` }}
    >
      <div className="sticky top-24 flex items-center justify-center h-[calc(100vh-6rem)]">
        <div className="relative w-full max-w-3xl h-[60vh]">
          {projects.map((project, index) => (
            <StackedCard
              key={`${project.title}-${index}`}
              project={project}
              index={index}
              total={projects.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

interface StackedCardProps {
  project: Project
  index: number
  total: number
  progress: MotionValue<number>
}

function StackedCard({ project, index, total, progress }: StackedCardProps) {
  const start = index / total
  const end = (index + 1) / total
  const span = end - start
  const enterEnd = start + span * 0.4
  const exitStart = start + span * 0.6

  const y = useTransform(progress, [start, enterEnd, exitStart, end], [80, 0, 0, -80])
  const scale = useTransform(progress, [start, enterEnd, exitStart, end], [0.92, 1, 1, 0.92])
  const opacity = useTransform(
    progress,
    [start, start + span * 0.15, enterEnd, exitStart, end - span * 0.05, end],
    [0, 0.6, 1, 1, 0.6, 0]
  )

  return (
    <motion.div style={{ y, scale, opacity, zIndex: 10 + index }} className="absolute inset-0">
      <TiltCard className="h-full">
        <StackedCardShell project={project} index={index} total={total} size="md" />
      </TiltCard>
    </motion.div>
  )
}

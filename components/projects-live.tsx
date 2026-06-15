"use client"

import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"
import type { Project } from "@/lib/api"
import { StackedCardShell } from "@/components/stacked-card-shell"
import { SyncIndicator, type SyncState } from "@/components/sync-indicator"
import { TiltCard } from "@/components/tilt-card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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
      <ProjectsCarousel projects={projects} />
    </>
  )
}

// ---------- Carousel (single component, mobile + desktop) ----------

const EXPO = [0.22, 1, 0.36, 1] as const

function ProjectsCarousel({ projects }: { projects: Project[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
  })
  const [selected, setSelected] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelected(emblaApi.selectedScrollSnap())
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
  }, [emblaApi, onSelect])

  // Keyboard arrow support when the carousel region is focused.
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!emblaApi) return
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      emblaApi.scrollPrev()
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      emblaApi.scrollNext()
    }
  }

  if (projects.length === 0) return null

  return (
    <div className="space-y-6">
      <div
        className="overflow-hidden"
        ref={emblaRef}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured projects"
        onKeyDown={onKeyDown}
      >
        <div className="flex touch-pan-y -mx-3">
          {projects.map((project, i) => (
            <CarouselSlide key={`${project.title}-${i}`} project={project} index={i} total={projects.length} />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2" role="tablist" aria-label="Project pagination">
          {projects.map((project, i) => (
            <button
              key={`dot-${project.title}-${i}`}
              type="button"
              role="tab"
              aria-selected={selected === i}
              aria-label={`Go to project ${i + 1}: ${project.title}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                selected === i
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              )}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground tabular-nums">
            {String(selected + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
            aria-label="Previous project"
            className="h-9 w-9"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
            aria-label="Next project"
            className="h-9 w-9"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function CarouselSlide({ project, index, total }: { project: Project; index: number; total: number }) {
  // On mobile: one full-width slide. On md+: ~70% width so the next card peeks in.
  // flex-[0_0_85%] is the slide basis; md+ overrides to 70% with a peek.
  return (
    <div
      className="flex-[0_0_88%] sm:flex-[0_0_75%] md:flex-[0_0_70%] lg:flex-[0_0_58%] xl:flex-[0_0_52%] min-w-0 px-3"
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}: ${project.title}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: EXPO, delay: Math.min(index, 4) * 0.08 }}
        className="h-full"
      >
        <TiltCard className="h-full">
          <StackedCardShell project={project} index={index} total={total} size="md" />
        </TiltCard>
      </motion.div>
    </div>
  )
}

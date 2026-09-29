"use client"

import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"
import type { Project } from "@/lib/api"
import { StackedCardShell } from "@/components/stacked-card-shell"
import { SyncIndicator, type SyncState } from "@/components/sync-indicator"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface ProjectsLiveProps {
  initialProjects: Project[]
  gistUrl: string
}

/** Maps tech-stack keywords to filter categories (order = chip order). */
const CATEGORY_RULES: { category: string; match: RegExp }[] = [
  { category: "Frontend", match: /react|next\.js|tailwind|shadcn|redux/i },
  { category: "Backend", match: /spring boot|node\.js|sqlite|mysql|postgres(ql)?|mongo(db)?|redis|kafka|rabbitmq|graphql|grpc/i },
  { category: "DevOps", match: /docker|github actions|ci\/?cd/i },
  { category: "AI", match: /\bai\b|\bgroq\b|\brag\b|\bllm\b/i },
]

function categoriesFor(project: Project): string[] {
  const tags = project.tech.join(" ")
  return CATEGORY_RULES.filter((r) => r.match.test(tags)).map((r) => r.category)
}

export function ProjectsLive({ initialProjects, gistUrl }: ProjectsLiveProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [sync, setSync] = useState<SyncState>("idle")
  const [filter, setFilter] = useState<string>("All")

  const filters = ["All", ...CATEGORY_RULES.map((r) => r.category)]
  const visible =
    filter === "All" ? projects : projects.filter((p) => categoriesFor(p).includes(filter))

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

      <div className="flex flex-wrap justify-center gap-2 mb-8" role="group" aria-label="Filter projects by category">
        {filters.map((f) => {
          const active = filter === f
          const count = f === "All" ? projects.length : projects.filter((p) => categoriesFor(p).includes(f)).length
          if (f !== "All" && count === 0) return null
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-2.5 rounded-full text-sm font-medium border transition-colors duration-200 cursor-pointer",
                active
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
              )}
            >
              {f}
              <span className={cn("ml-1.5 text-xs tabular-nums", active ? "text-primary-foreground/80" : "text-muted-foreground/60")}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Screen-reader announcement for filter/swap results */}
      <p className="sr-only" role="status" aria-live="polite">
        {filter === "All"
          ? `Showing all ${visible.length} projects`
          : `Showing ${visible.length} ${filter} projects`}
      </p>

      {visible.length === 0 ? (
        <div className="flex gap-6" aria-hidden="true">
          <Skeleton className="h-96 flex-1 rounded-xl" />
          <Skeleton className="h-96 w-[40%] rounded-xl hidden md:block" />
        </div>
      ) : (
        <>
          {/* Desktop+: full grid — every project visible at scroll-cost zero */}
          <ProjectsGrid projects={visible} />
          {/* Mobile: swipeable carousel */}
          <ProjectsCarousel projects={visible} key={filter} />
        </>
      )}
    </>
  )
}

// ---------- Grid (md and up) ----------

const EXPO = [0.22, 1, 0.36, 1] as const

function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="hidden md:grid grid-cols-2 gap-6">
      {projects.map((project, i) => (
        <motion.div
          key={`${project.title}-${i}`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EXPO, delay: Math.min(i, 4) * 0.08 }}
        >
          <StackedCardShell project={project} index={i} total={projects.length} size="md" />
        </motion.div>
      ))}
    </div>
  )
}

// ---------- Carousel (mobile only) ----------

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

  return (
    <div className="space-y-6 md:hidden">
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
        {/* Pagination dots: plain buttons with 44px hit areas inside a visual dot */}
        <div className="flex items-center" aria-label="Project pagination">
          {projects.map((project, i) => (
            <button
              key={`dot-${project.title}-${i}`}
              type="button"
              aria-current={selected === i ? "true" : undefined}
              aria-label={`Go to project ${i + 1}: ${project.title}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className="h-11 w-11 flex items-center justify-center cursor-pointer"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  selected === i
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/30 group-hover:bg-muted-foreground/60"
                )}
              />
            </button>
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
            className="h-11 w-11"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
            aria-label="Next project"
            className="h-11 w-11"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function CarouselSlide({ project, index, total }: { project: Project; index: number; total: number }) {
  return (
    <div
      className="flex-[0_0_88%] min-w-0 px-3"
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
        <StackedCardShell project={project} index={index} total={total} size="md" />
      </motion.div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const elements = ids
      .map((id) => ({ id, el: document.getElementById(id) }))
      .filter((e): e is { id: string; el: HTMLElement } => e.el !== null)

    if (elements.length === 0) {
      setActive(null)
      return
    }

    // Track current visibility for each id. After every callback
    // we recompute the active id from scratch so leaving a section
    // correctly resets the active state.
    const visibility = new Map<string, boolean>(elements.map(({ id }) => [id, false]))

    const recompute = () => {
      const visible = elements
        .filter(({ id }) => visibility.get(id))
        .map(({ id }) => id)
      setActive(visible[0] ?? null)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id
          visibility.set(id, entry.isIntersecting)
        }
        recompute()
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    elements.forEach(({ el }) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}

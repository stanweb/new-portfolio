"use client"

import { useEffect, useState } from "react"
import MarkdownRenderer from "@/components/markdown-renderer"
import { SyncIndicator, type SyncState } from "@/components/sync-indicator"

interface ResumeLiveProps {
  initialContent: string
  gistUrl: string
}

export function ResumeLive({ initialContent, gistUrl }: ResumeLiveProps) {
  const [content, setContent] = useState(initialContent)
  const [sync, setSync] = useState<SyncState>("idle")

  useEffect(() => {
    let cancelled = false
    const controller = new AbortController()

    async function fetchRemote() {
      setSync("syncing")
      try {
        const res = await fetch(gistUrl, { signal: controller.signal, cache: "no-store" })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const text = await res.text()
        if (cancelled) return
        if (text && text.trim().length > 0 && text !== content) {
          setContent(text)
          setSync("synced")
        } else {
          setSync("idle")
        }
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
        syncingLabel="Checking for resume updates…"
        className="print:hidden mb-6"
      />
      <MarkdownRenderer content={content} />
    </>
  )
}

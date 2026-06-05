"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Reveal } from "@/components/reveal"
import { SyncIndicator, type SyncState } from "@/components/sync-indicator"
import { type BlogPost, type RemoteBlogPost } from "@/lib/api"

interface BlogGridLiveProps {
  initialPosts: BlogPost[]
  gistUrl: string
}

function isRemotePayload(data: unknown): data is RemoteBlogPost[] {
  if (!Array.isArray(data)) return false
  return data.every(
    (p) =>
      typeof p === "object" &&
      p !== null &&
      typeof (p as RemoteBlogPost).title === "string" &&
      typeof (p as RemoteBlogPost).slug === "string" &&
      typeof (p as RemoteBlogPost).contentUrl === "string"
  )
}

function sortByDateDesc<T extends { date: string }>(posts: T[]): T[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function BlogGridLive({ initialPosts, gistUrl }: BlogGridLiveProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts)
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
        if (!isRemotePayload(data)) throw new Error("Invalid blog index payload")
        if (cancelled) return
        setPosts(sortByDateDesc(data))
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
        syncingLabel="Checking for new posts…"
        centered
        className="mb-6"
      />
      <div className="grid gap-6">
        {posts.map((post, index) => (
          <Reveal key={post.slug} delay={index * 0.1}>
            <Link href={`/blog/${post.slug}`} aria-label={post.title}>
              <Card className="p-6 hover:border-primary transition-colors group cursor-pointer">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>

                  <h3 className="text-2xl font-semibold group-hover:text-primary transition-colors text-balance">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed text-pretty">{post.excerpt}</p>

                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center text-sm font-medium text-primary pt-2">
                    Read more
                    <ArrowRight
                      className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Card>
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  )
}

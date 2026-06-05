/**
 * Centralized config for runtime-upgradeable content sources.
 *
 * Pattern: every "live" content source is a Gist URL paired with a local
 * fallback (read from /content at build time). The server component reads
 * the local fallback for SSR/SEO; the client component optionally fetches
 * the gist URL after hydration and replaces the content on success.
 *
 * To add a new live content source:
 *   1. Add an entry here with a stable `id`, a `gistUrl`, and the matching
 *      local fallback loader.
 *   2. In the page/component, render the local content as initial data
 *      and hand it + the gistUrl to a `<XLive>` client component.
 */
import { getBlogPosts, getProjects, getResume } from "@/lib/api"

export interface LiveSource<TFallback> {
  /** Stable identifier. */
  id: string
  /** Human label (used in sync indicator copy if shown). */
  label: string
  /** Gist URL fetched on the client after hydration. */
  gistUrl: string
  /** Loader for the local fallback (used for SSR + gist failure). */
  fallback: () => Promise<TFallback>
}

export const LIVE_SOURCES = {
  resume: {
    id: "resume",
    label: "resume",
    gistUrl:
      "https://gist.githubusercontent.com/stanweb/2dff303249ae5c12e96720394968663c/raw/my-resume.md",
    fallback: getResume,
  },
  projects: {
    id: "projects",
    label: "projects",
    gistUrl:
      "https://gist.githubusercontent.com/stanweb/4241f4efef993870b33444658c5e3767/raw/projects.json",
    fallback: getProjects,
  },
  blogs: {
    id: "blogs",
    label: "blog index",
    gistUrl:
      "https://gist.githubusercontent.com/stanweb/3e797eea20d5236b650f27a7fbe8867a/raw/blogs.json",
    fallback: getBlogPosts,
  },
  // Future: skills, testimonials, anything else you want to upgrade without redeploying.
  // skills: { id: "skills", label: "skills", gistUrl: "...", fallback: getSkillCategories },
} as const satisfies Record<string, LiveSource<unknown>>

export type LiveSourceId = keyof typeof LIVE_SOURCES

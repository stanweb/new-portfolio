import { promises as fs } from "node:fs"
import path from "node:path"
import { cache } from "react"

export interface LocalBlogPost {
  title: string
  excerpt: string
  tags: string[]
  date: string
  slug: string
  /** Filename in /content/posts (local fallback). */
  file: string
}

export interface RemoteBlogPost {
  title: string
  excerpt: string
  tags: string[]
  date: string
  slug: string
  /** URL of a gist containing the post's markdown body. */
  contentUrl: string
}

/** Normalized blog post used by the UI. Exactly one of file/contentUrl is set. */
export type BlogPost = LocalBlogPost | RemoteBlogPost

export function isLocalPost(post: BlogPost): post is LocalBlogPost {
  return "file" in post && typeof (post as LocalBlogPost).file === "string"
}

export function isRemotePost(post: BlogPost): post is RemoteBlogPost {
  return "contentUrl" in post && typeof (post as RemoteBlogPost).contentUrl === "string"
}

export interface Project {
  title: string
  description: string
  tech: string[]
  github: string
  live?: string
}

export interface SkillCategory {
  icon: string
  title: string
  skills: string[]
}

const CONTENT_DIR = path.join(process.cwd(), "content")
const POSTS_DIR = path.join(CONTENT_DIR, "posts")

async function readJSON<T>(file: string): Promise<T> {
  const raw = await fs.readFile(path.join(CONTENT_DIR, file), "utf8")
  return JSON.parse(raw) as T
}

export const getSkillCategories = cache(async (): Promise<SkillCategory[]> => {
  return readJSON<SkillCategory[]>("skills.json")
})

export const getProjects = cache(async (): Promise<Project[]> => {
  return readJSON<Project[]>("projects.json")
})

export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
  const posts = await readJSON<BlogPost[]>("blogs.json")
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1))
})

export const fetchBlogBody = cache(async (url: string): Promise<string> => {
  const res = await fetch(url, { cache: "no-store" })
  if (!res.ok) throw new Error(`Failed to fetch blog body: HTTP ${res.status}`)
  return res.text()
})

export async function getBlogPost(
  slug: string
): Promise<{ post: BlogPost; content: string } | null> {
  const posts = await getBlogPosts()
  const post = posts.find((p) => p.slug === slug)
  if (!post) return null
  let content: string
  if (isLocalPost(post)) {
    content = await fs.readFile(path.join(POSTS_DIR, post.file), "utf8")
  } else {
    content = await fetchBlogBody(post.contentUrl)
  }
  return { post, content }
}

export async function getResume(): Promise<string> {
  return fs.readFile(path.join(CONTENT_DIR, "resume.md"), "utf8")
}

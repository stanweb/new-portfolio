import axios from "axios"
import { BLOG_INDEX_URL } from "./constants"

export interface BlogPostIndex {
  title: string
  excerpt: string
  tags: string[]
  date: string
  slug: string
  contentUrl: string
}

export async function getBlogPosts(): Promise<BlogPostIndex[]> {
  try {
    const response = await axios.get(BLOG_INDEX_URL)
    return response.data
  } catch (error) {
    console.error("Failed to fetch blog posts", error)
    return []
  }
}

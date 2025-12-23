import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import axios from "axios"
import MarkdownRenderer from "@/components/markdown-renderer";
import {BLOG_INDEX_URL} from "@/lib/constants";
import { Metadata } from "next"


// Interface for the blog post index
interface BlogPostIndex {
  title: string
  excerpt: string
  tags: string[]
  date: string
  slug: string
  contentUrl: string
}


async function getBlogPosts(): Promise<BlogPostIndex[]> {
  try {
    const response = await axios.get(BLOG_INDEX_URL)
    return response.data
  } catch (error) {
    console.error("Failed to fetch blog posts", error)
    return []
  }
}

async function getBlogContent(url: string): Promise<string> {
  try {
    const response = await axios.get(`${url}?cachebust=${Date.now()}`)
    return response.data
  } catch (error) {
    console.error("Failed to fetch blog content", error)
    return ""
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const posts = await getBlogPosts()
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
      authors: ["Stanley Mutua"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  }
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const posts = await getBlogPosts()
  const postIndex = posts.find((p) => p.slug === slug)

  if (!postIndex) {
    notFound()
  }

  const content = await getBlogContent(postIndex.contentUrl)

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-24 md:py-32">
        <article className="max-w-3xl mx-auto">
          <Button variant="ghost" asChild className="mb-8">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>

          <div className="space-y-6 mb-8">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <time dateTime={postIndex.date}>
                {new Date(postIndex.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-balance">{postIndex.title}</h1>

            <div className="flex flex-wrap gap-2">
              {postIndex.tags.map((tag) => (
                <span key={tag} className="px-3 py-1.5 text-sm font-medium bg-primary/10 text-primary rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
           <MarkdownRenderer content={content}/>
          </div>
        </article>
      </main>
    </div>
  )
}

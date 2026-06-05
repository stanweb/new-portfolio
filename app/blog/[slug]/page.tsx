import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import MarkdownRenderer from "@/components/markdown-renderer"
import { BlogPostLive } from "@/components/blog-post-live"
import { getBlogPost, getBlogPosts, isLocalPost } from "@/lib/api"
import { SITE_URL } from "@/lib/constants"
import { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const result = await getBlogPost(slug)
  if (!result) return { title: "Post Not Found" }
  const { post } = result
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `${SITE_URL}/blog/${post.slug}`,
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
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const result = await getBlogPost(slug)
  if (!result) notFound()
  const { post, content } = result

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-16 md:py-20">
        <article className="max-w-3xl mx-auto">
          <Button variant="ghost" asChild className="mb-8">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Back to Blog
            </Link>
          </Button>

          <header className="space-y-6 mb-8">
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

            <h1 className="text-4xl md:text-5xl font-bold text-balance">{post.title}</h1>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1.5 text-sm font-medium bg-primary/10 text-primary rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {isLocalPost(post) ? (
            <MarkdownRenderer content={content} />
          ) : (
            <BlogPostLive initialContent={content} contentUrl={post.contentUrl} />
          )}
        </article>
      </main>
    </div>
  )
}

import { Navbar } from "@/components/navbar"
import { BlogGridLive } from "@/components/blog-grid-live"
import { Metadata } from "next"
import { SITE_URL } from "@/lib/constants"
import { getBlogPosts } from "@/lib/api"
import { LIVE_SOURCES } from "@/lib/config"

export const metadata: Metadata = {
  title: "Writing & Notes",
  description: "Explore thoughts and tutorials on fullstack development, software engineering, and AI.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Writing & Notes | Stanley Mutua",
    description: "Explore thoughts and tutorials on fullstack development, software engineering, and AI.",
    type: "website",
    url: `${SITE_URL}/blog`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing & Notes | Stanley Mutua",
    description: "Explore thoughts and tutorials on fullstack development, software engineering, and AI.",
  },
}

export default async function BlogPage() {
  const initialPosts = await getBlogPosts()
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Writing &amp; Notes</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Thoughts on fullstack development, software development, and AI engineering.
          </p>
          <BlogGridLive initialPosts={initialPosts} gistUrl={LIVE_SOURCES.blogs.gistUrl} />
        </div>
      </main>
    </div>
  )
}

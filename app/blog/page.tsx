import { Navbar } from "@/components/navbar"
import { BlogGrid } from "@/components/blog-grid"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Writing & Notes | Stanley's Portfolio",
  description: "Explore thoughts and tutorials on fullstack development, software engineering, and AI.",
  openGraph: {
    title: "Writing & Notes | Stanley's Portfolio",
    description: "Explore thoughts and tutorials on fullstack development, software engineering, and AI.",
    type: "website",
    // url: "https://your-domain.com/blog", // Recommended: Add your canonical URL here
    // images: ["/og-blog.png"], // Recommended: Add an Open Graph image in your public folder
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing & Notes | Stanley's Portfolio",
    description: "Explore thoughts and tutorials on fullstack development, software engineering, and AI.",
  },
}

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Writing & Notes</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Thoughts on fullstack development, software development, and AI engineering.
          </p>
          <BlogGrid />
        </div>
      </main>
    </div>
  )
}

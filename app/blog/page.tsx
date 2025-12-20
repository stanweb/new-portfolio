import { Navbar } from "@/components/navbar"
import { BlogGrid } from "@/components/blog-grid"

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Writing & Notes</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Thoughts on data structures, algorithms, and AI engineering.
          </p>
          <BlogGrid />
        </div>
      </main>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import axios from "axios"
import {Loading} from "@/components/loading";

interface BlogPost {
  title: string
  excerpt: string
  tags: string[]
  date: string
  slug: string
  contentUrl: string
}

export function BlogGrid() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        // The JSON should be an array of objects matching the BlogPost interface
        const response = await axios.get(`https://gist.githubusercontent.com/stanweb/3e797eea20d5236b650f27a7fbe8867a/raw/blogs.json?cachebust=${Math.random()}`)
        setPosts(response.data)
      } catch (error) {
        console.error("Failed to fetch blog posts:", error)
        // Fallback to empty array or handle error appropriately
      } finally {
        setLoading(false)
      }
    }

    void fetchPosts()
  }, [])

  if (loading) {
    return (
        <Loading message={'Loading Posts ...'}/>
    )
  }

  return (
    <div className="grid gap-6">
      {posts.map((post, index) => (
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Link href={`/blog/${post.slug}`}>
            <Card className="p-6 hover:border-primary transition-colors group cursor-pointer">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
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
                    <span key={tag} className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center text-sm font-medium text-primary pt-2">
                  Read more
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

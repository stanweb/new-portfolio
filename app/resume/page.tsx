"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import MarkdownRenderer from "@/components/markdown-renderer"
import axios from "axios"
import {Loading} from "@/components/loading";
import {RESUME_GIST_URL} from "@/lib/constants";



export default function ResumePage() {
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchResume() {
      try {
        const response = await axios.get(RESUME_GIST_URL)
        setContent(response.data)
      } catch (error) {
        console.error("Failed to fetch resume:", error)
        setContent("# Resume\n\nFailed to load resume content. Please check the Gist URL.")
      } finally {
        setLoading(false)
      }
    }

    void fetchResume()
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto bg-card p-8 md:p-12 rounded-lg border shadow-sm">
          {loading ? (
            <Loading message={"Loading Resume..."}/>
          ) : (
            <MarkdownRenderer content={content} />
          )}
        </div>
      </main>
    </div>
  )
}

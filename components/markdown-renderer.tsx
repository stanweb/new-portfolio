'use client'

import React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import remarkToc from "remark-toc"
import rehypeRaw from "rehype-raw"
import rehypeSlug from "rehype-slug"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

interface MarkdownRendererProps {
    content: string
    className?: string // allow custom styling
}

export default function MarkdownRenderer({
                                             content,
                                             className = "",
                                         }: MarkdownRendererProps) {
    return (
        <div className={`prose prose-neutral dark:prose-invert max-w-none ${className}`}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath, remarkToc]}
                rehypePlugins={[rehypeRaw, rehypeSlug]}
                components={{
                    code({ node, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "")
                        // Extract inline and ref from props to avoid passing incompatible ref to SyntaxHighlighter
                        const { inline, ref, ...rest } = props as any
                        
                        return !inline && match ? (
                            <SyntaxHighlighter
                                style={oneDark as any}
                                language={match[1]}
                                PreTag="div"
                                {...rest}
                            >
                                {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                        ) : (
                            <code className={`${className} bg-gray-200 dark:bg-gray-800 px-1 rounded`} {...props}>
                                {children}
                            </code>
                        )
                    },
                    a({ href, children, ...props }) {
                        return (
                            <a
                                href={href}
                                target={"_blank"}
                                className="text-blue-600 hover:underline"
                                {...props}
                            >
                                {children}
                            </a>
                        )
                    },
                    p({ children, ...props }) {
                        return (
                            <p className="mb-4 leading-relaxed" {...props}>
                                {children}
                            </p>
                        )
                    },
                    h1({ children, ...props }) {
                        return (
                            <h1 className="text-3xl font-bold mt-8 mb-4" {...props}>
                                {children}
                            </h1>
                        )
                    },
                    h2({ children, ...props }) {
                        return (
                            <h2 className="text-2xl font-semibold mt-8 mb-4" {...props}>
                                {children}
                            </h2>
                        )
                    },
                    h3({ children, ...props }) {
                        return (
                            <h3 className="text-xl font-semibold mt-6 mb-3" {...props}>
                                {children}
                            </h3>
                        )
                    },
                    h4({ children, ...props }) {
                        return (
                            <h4 className="text-lg font-semibold mt-6 mb-3" {...props}>
                                {children}
                            </h4>
                        )
                    },
                    ul({ children, ...props }) {
                        return (
                            <ul className="list-disc pl-6 mb-4 space-y-2" {...props}>
                                {children}
                            </ul>
                        )
                    },
                    ol({ children, ...props }) {
                        return (
                            <ol className="list-decimal pl-6 mb-4 space-y-2" {...props}>
                                {children}
                            </ol>
                        )
                    },
                    li({ children, ...props }) {
                        return (
                            <li className="mb-1" {...props}>
                                {children}
                            </li>
                        )
                    },
                    table({ children, ...props }) {
                        return (
                            <table className="table-auto border-collapse border border-gray-300 dark:border-gray-600 w-full mb-4" {...props}>
                                {children}
                            </table>
                        )
                    },
                    th({ children, ...props }) {
                        return (
                            <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-left font-semibold" {...props}>
                                {children}
                            </th>
                        )
                    },
                    td({ children, ...props }) {
                        return (
                            <td className="border border-gray-300 dark:border-gray-600 px-3 py-2" {...props}>
                                {children}
                            </td>
                        )
                    },
                    blockquote({ children, ...props }) {
                        return (
                            <blockquote className="border-l-4 border-gray-400 dark:border-gray-500 pl-4 italic text-gray-700 dark:text-gray-300 my-4" {...props}>
                                {children}
                            </blockquote>
                        )
                    },
                    hr({ ...props }) {
                        return <hr className="my-8 border-t-4 border-gray-300 dark:border-gray-600" {...props} />
                    }
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    )
}

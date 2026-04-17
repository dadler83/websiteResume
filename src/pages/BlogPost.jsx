import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Markdown from 'react-markdown'
import Giscus from '../components/Giscus'
import './BlogPost.css'

export default function BlogPost() {
    const { slug } = useParams()
    const [content, setContent] = useState('')
    const [meta, setMeta] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const [mdRes, metaRes] = await Promise.all([
                    fetch(`/blog-posts/${slug}.md`),
                    fetch('/blog-posts/posts.json'),
                ])

                if (!mdRes.ok) {
                    setError(true)
                    setLoading(false)
                    return
                }

                const markdown = await mdRes.text()
                const posts = await metaRes.json()
                const postMeta = posts.find((p) => p.slug === slug)

                setContent(markdown)
                setMeta(postMeta || null)
                setLoading(false)
            } catch {
                setError(true)
                setLoading(false)
            }
        }

        fetchPost()
    }, [slug])

    if (loading) {
        return (
            <div className="blogpost-container">
                <p className="blogpost-loading">Loading…</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="blogpost-container">
                <h1>Post not found</h1>
                <p>
                    Sorry, that blog post doesn't exist.{' '}
                    <Link to="/blog">← Back to blog</Link>
                </p>
            </div>
        )
    }

    return (
        <div className="blogpost-container">
            <Link to="/blog" className="blogpost-back">
                ← Back to blog
            </Link>

            {meta && (
                <header className="blogpost-header">
                    <span className="blogpost-date">{meta.date}</span>
                    <div className="blogpost-tags">
                        {meta.tags.map((tag) => (
                            <span className="blogpost-tag" key={tag}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </header>
            )}

            <article className="blogpost-content">
                <Markdown>{content}</Markdown>
            </article>

            <Giscus term={slug} />
        </div>
    )
}

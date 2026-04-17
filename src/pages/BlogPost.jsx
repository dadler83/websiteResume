import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Markdown from 'react-markdown'
import Giscus from '../components/Giscus'
import ModulationChart from '../components/ModulationChart'
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

    const backPath = meta?.category ? `/my-learning/${meta.category}` : '/blog'
    const backLabel = meta?.category ? '← Back to topic' : '← Back to blog'

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
                    <Link to="/my-learning">← Back to My Learning</Link>
                </p>
            </div>
        )
    }

    return (
        <div className="blogpost-container">
            <Link to={backPath} className="blogpost-back">
                {backLabel}
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
                {slug === 'signal-processing-basics' && <ModulationChart />}
            </article>

            <Giscus term={slug} />
        </div>
    )
}

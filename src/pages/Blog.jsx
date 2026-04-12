import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Blog.css'

export default function Blog() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/blog-posts/posts.json')
            .then((res) => res.json())
            .then((data) => {
                const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date))
                setPosts(sorted)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <div className="blog-container">
                <p className="blog-loading">Loading posts…</p>
            </div>
        )
    }

    return (
        <div className="blog-container">
            <section className="blog-hero">
                <h1>Blog</h1>
                <p className="blog-subtitle">
                    Thoughts on software, science, and everything in between.
                </p>
            </section>

            <div className="blog-list">
                {posts.map((post) => (
                    <Link
                        to={`/blog/${post.slug}`}
                        key={post.slug}
                        className="blog-card-link"
                    >
                        <article className="blog-card">
                            <span className="blog-card-date">{post.date}</span>
                            <h2 className="blog-card-title">{post.title}</h2>
                            <p className="blog-card-summary">{post.summary}</p>
                            <div className="blog-card-tags">
                                {post.tags.map((tag) => (
                                    <span className="blog-tag" key={tag}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </div>
    )
}

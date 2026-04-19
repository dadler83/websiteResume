import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import './Blog.css'

const categoryLabels = {
    'math-cs': 'Math & CS',
    'biology': 'Biology',
    'chemistry': 'Chemistry',
}

export default function Blog() {
    const { category } = useParams()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/blog-posts/posts.json')
            .then((res) => res.json())
            .then((data) => {
                let filtered = data
                if (category) {
                    filtered = data.filter((p) => p.category === category)
                }
                const sorted = filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
                setPosts(sorted)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [category])

    const title = category ? (categoryLabels[category] || category) : 'Blog'
    const subtitle = category
        ? `Posts about ${categoryLabels[category] || category}.`
        : 'Thoughts on software, science, and everything in between.'

    if (loading) {
        return (
            <div className="blog-container">
                <p className="blog-loading">Loading posts…</p>
            </div>
        )
    }

    return (
        <div className="blog-container">
            {category && (
                <Link to="/my-learning" className="blog-back-link">
                    ← Back to My Learning
                </Link>
            )}

            <section className="blog-hero">
                <h1>{title}</h1>
                <p className="blog-subtitle">{subtitle}</p>
            </section>

            <div className="blog-list">
                {posts.length === 0 && (
                    <p className="blog-empty">No posts in this category yet — check back soon!</p>
                )}
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

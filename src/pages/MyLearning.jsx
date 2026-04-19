import { Link } from 'react-router-dom'
import './MyLearning.css'

const topics = [
    {
        slug: 'math-cs',
        title: 'Math & CS',
        description: 'Software development, algorithms, signal processing, and computational topics.',
        icon: '🧮',
    },
    {
        slug: 'biology',
        title: 'Biology',
        description: 'Molecular biology, biophysics, and the science of living systems.',
        icon: '🧬',
    },
    {
        slug: 'chemistry',
        title: 'Chemistry',
        description: 'Chemical principles, spectroscopy, and materials science.',
        icon: '⚗️',
    },
]

export default function MyLearning() {
    return (
        <div className="mylearning-container">
            <section className="mylearning-hero">
                <h1>My Learning</h1>
                <p className="mylearning-subtitle">
                    Notes, tutorials, and deep-dives organized by topic.
                </p>
            </section>

            <div className="mylearning-grid">
                {topics.map((topic) => (
                    <Link
                        to={`/my-learning/${topic.slug}`}
                        key={topic.slug}
                        className="mylearning-card-link"
                    >
                        <article className={`mylearning-card mylearning-card--${topic.slug}`}>
                            <span className="mylearning-card-icon">{topic.icon}</span>
                            <h2 className="mylearning-card-title">{topic.title}</h2>
                            <p className="mylearning-card-description">{topic.description}</p>
                        </article>
                    </Link>
                ))}
            </div>
        </div>
    )
}

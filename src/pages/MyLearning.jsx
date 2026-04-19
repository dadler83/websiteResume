import { Link } from 'react-router-dom'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import './MyLearning.css'

const topics = [
    {
        slug: 'math-cs',
        title: 'Math & CS',
        description: 'Software development, algorithms, signal processing, and computational topics.',
        latex: '\\sum_{i=0}^{n} x_i',
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
                            <span className="mylearning-card-icon">
                                {topic.latex ? (
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: katex.renderToString(topic.latex, { throwOnError: false }),
                                        }}
                                    />
                                ) : (
                                    topic.icon
                                )}
                            </span>
                            <h2 className="mylearning-card-title">{topic.title}</h2>
                            <p className="mylearning-card-description">{topic.description}</p>
                        </article>
                    </Link>
                ))}
            </div>
        </div>
    )
}

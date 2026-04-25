import { Link } from 'react-router-dom'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import MoleculeViewer from '../components/MoleculeViewer'
import cifData from '../assets/1ud2.cif?raw'
import serotoninJson from '../assets/Conformer3D_COMPOUND_CID_5202.json'
import pubchemToSdf from '../utils/pubchemToSdf'
import './MyLearning.css'

const serotoninSdf = pubchemToSdf(serotoninJson)

const topics = [
    {
        slug: 'math-cs',
        title: 'Math & CS',
        description: 'Software development, algorithms, signal processing, and computational topics.',
        latex: 'f(n) \\in \\mathbb{O}(g(n))' +
            '\\newline \\Leftrightarrow \\newline' +
            ' \\big( \\exists c \\in \\mathbb{R}^{+}. \\ \\exists n_0 \\in \\mathbb{N}. \\forall n \\in \\mathbb{N}. \\ n \\geq n_0 \\implies f(n) \\leq c \\cdot g(n) \\big)',
        latexName: 'Definition of Big O',
    },
    {
        slug: 'biology',
        title: 'Biology',
        description: 'Molecular biology, biophysics, and the science of living systems.',
        molecule: { data: cifData, format: 'cif', viewStyle: { cartoon: { color: 'spectrum' } }, backgroundColor: '#E0F2D8', name: 'alpha-amylase' },
    },
    {
        slug: 'chemistry',
        title: 'Chemistry',
        description: 'Chemical principles, spectroscopy, and materials science.',
        molecule: { data: serotoninSdf, format: 'sdf', viewStyle: { stick: {} }, backgroundColor: '#EDE5F5', name: 'Serotonin' },
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
                            <h2 className="mylearning-card-title">{topic.title}</h2>
                            <span className="mylearning-card-icon">
                                {topic.latex ? (
                                    <span className="latex-viewer-wrapper">
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: katex.renderToString(topic.latex, { throwOnError: false }),
                                            }}
                                        />
                                        {topic.latexName && <span className="latex-viewer-name">{topic.latexName}</span>}
                                    </span>
                                ) : topic.molecule ? (
                                    <MoleculeViewer
                                        data={topic.molecule.data}
                                        format={topic.molecule.format}
                                        viewStyle={topic.molecule.viewStyle}
                                        backgroundColor={topic.molecule.backgroundColor}
                                        name={topic.molecule.name}
                                    />
                                ) : (
                                    topic.icon
                                )}
                            </span>
                            <p className="mylearning-card-description">{topic.description}</p>
                        </article>
                    </Link>
                ))}
            </div>
        </div>
    )
}

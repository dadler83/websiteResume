import { Link } from 'react-router-dom'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import MoleculeViewer from '../components/MoleculeViewer'
import cifData from '../assets/1ud2.cif?raw'
import './MyLearning.css'

const ethanolPdb = `
HETATM    1  C1  UNL     1       0.000   0.000   0.000
HETATM    2  C2  UNL     1       1.540   0.000   0.000
HETATM    3  O   UNL     1       2.090   1.200   0.000
HETATM    4  H1  UNL     1      -0.540   0.900   0.000
HETATM    5  H2  UNL     1      -0.540  -0.900   0.000
HETATM    6  H3  UNL     1       1.900  -0.900   0.000
HETATM    7  H4  UNL     1       1.900   1.900   0.000
HETATM    8  H5  UNL     1       2.900   1.200   0.900
HETATM    9  H6  UNL     1       2.900   1.200  -0.900
CONECT    1    2    4    5
CONECT    2    1    3    6    7
CONECT    3    2    8    9
END
`

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
        molecule: { data: cifData, format: 'cif', viewStyle: { cartoon: { color: 'spectrum' } }, backgroundColor: '#E0F2D8' },
    },
    {
        slug: 'chemistry',
        title: 'Chemistry',
        description: 'Chemical principles, spectroscopy, and materials science.',
        molecule: { data: ethanolPdb, format: 'pdb', viewStyle: { stick: {} }, backgroundColor: '#EDE5F5' },
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
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: katex.renderToString(topic.latex, { throwOnError: false }),
                                        }}
                                    />
                                ) : topic.molecule ? (
                                    <MoleculeViewer
                                        data={topic.molecule.data}
                                        format={topic.molecule.format}
                                        viewStyle={topic.molecule.viewStyle}
                                        backgroundColor={topic.molecule.backgroundColor}
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

import './About.css'

const experiences = [
    {
        date: '2023 – Present',
        role: 'Firmware & GUI Developer',
        company: 'HighQ Technologies',
        description:
            'Lead firmware and GUI development for the Fathom Spectrometer — the world\'s first quantum-enabled EPR spectrometer. Responsibilities include real-time data acquisition systems, DSP algorithm implementation, and building intuitive visualization interfaces.',
    },
    {
        date: '2021 – 2023',
        role: 'Software Engineering Intern',
        company: 'Acme Embedded Systems',
        description:
            'Developed low-level C drivers for sensor peripherals, automated regression test suites in Python, and contributed to a Qt-based desktop application used in production hardware testing.',
    },
    {
        date: '2020 – 2021',
        role: 'Research Assistant',
        company: 'University Physics Lab',
        description:
            'Assisted graduate researchers with data collection pipelines, wrote signal-processing scripts to clean and analyze spectroscopy data, and maintained lab documentation.',
    },
]

const interests = [
    {
        icon: '🎸',
        title: 'Music',
        description: 'Playing guitar and experimenting with audio synthesis in my free time.',
    },
    {
        icon: '📐',
        title: 'Design',
        description: 'Typography, UI/UX, and the intersection of aesthetics and function.',
    },
    {
        icon: '🔬',
        title: 'Science',
        description: 'Quantum physics, optics, and the engineering challenges they present.',
    },
    {
        icon: '🌿',
        title: 'Outdoors',
        description: 'Hiking, camping, and recharging away from screens whenever possible.',
    },
    {
        icon: '📚',
        title: 'Learning',
        description: 'Picking up new languages, frameworks, and concepts continuously.',
    },
    {
        icon: '🎮',
        title: 'Game Dev',
        description: 'Tinkering with small games to explore interactive design and logic.',
    },
]

export default function About() {
    return (
        <div className="about-container">

            {/* ── Hero ───────────────────────────────── */}
            <section className="about-hero">
                <h1>David Adler</h1>
                <p className="about-subtitle">Software Developer · Scientist · Designer</p>
            </section>

            {/* ── Bio ────────────────────────────────── */}
            <section className="about-bio">
                <div className="about-avatar">👤</div>
                <div className="about-bio-text">
                    <h2>A little about me</h2>
                    <p>
                        I'm a software developer with a passion for building things that sit at the
                        intersection of hardware and software. My background spans embedded firmware,
                        real-time signal processing, and modern web development — which means I'm
                        equally comfortable writing C close to the metal as I am crafting React
                        components in the browser.
                    </p>
                    <p>
                        When I'm not coding, you'll find me reading about quantum physics, strumming
                        a guitar, or exploring trails in the Pacific Northwest. I believe the best
                        software is built by people who are curious about everything.
                    </p>
                </div>
            </section>

            {/* ── Experience ─────────────────────────── */}
            <h2 className="about-section-header">Experience</h2>
            <div className="about-experience">
                {experiences.map((exp) => (
                    <div className="experience-item" key={exp.role}>
                        <span className="experience-date">{exp.date}</span>
                        <div className="experience-details">
                            <h3>{exp.role}</h3>
                            <p className="experience-company">{exp.company}</p>
                            <p>{exp.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Education ──────────────────────────── */}
            <h2 className="about-section-header">Education</h2>
            <div className="about-education">
                <div className="education-card">
                    <h3>B.S. Computer Science</h3>
                    <p className="edu-institution">State University</p>
                    <p className="edu-year">2019 – 2023</p>
                    <p>
                        Focused on systems programming, algorithms, and applied mathematics.
                        Completed senior capstone project on real-time audio signal processing.
                    </p>
                </div>
                <div className="education-card">
                    <h3>Minor in Physics</h3>
                    <p className="edu-institution">State University</p>
                    <p className="edu-year">2019 – 2023</p>
                    <p>
                        Coursework in quantum mechanics, electromagnetism, and optical systems —
                        providing the scientific foundation behind my work with spectroscopy hardware.
                    </p>
                </div>
            </div>

            {/* ── Interests ──────────────────────────── */}
            <h2 className="about-section-header">Interests</h2>
            <div className="about-interests">
                {interests.map((item) => (
                    <div className="interest-card" key={item.title}>
                        <div className="interest-icon">{item.icon}</div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}
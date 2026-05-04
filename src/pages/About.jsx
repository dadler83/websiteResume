import { Link } from 'react-router-dom'
import './About.css'
import TetrisSketch from '../components/TetrisSketch.jsx'
import RoundedPictureFrame from '../components/RoundedPictureFrame.jsx'
import FlipCard from '../components/FlipCard.jsx'

const experiences = [
    {
        date: '2023 – Present',
        role: 'Firmware & GUI Developer',
        company: 'HighQ Technologies',
        description:
            'Lead firmware and GUI development for the Fathom Spectrometer — the world\'s first quantum-enabled EPR spectrometer. Responsibilities include real-time data acquisition systems, DSP algorithm implementation, and building intuitive visualization interfaces.',
    },
    {
        date: '2020 – 2021',
        role: 'Research Assistant',
        company: 'University Physics Lab',
        description:
            'Assisted graduate researchers with data collection pipelines, wrote signal-processing scripts to clean and analyze spectroscopy data, and maintained lab documentation.',
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
                <div className="about-avatar">
                    <RoundedPictureFrame size="100%" interval={8000} />
                </div>
                <div className="about-bio-text">
                    <h2>A little about me</h2>
                    <p>
                        I've been a programmer for over a decade now, and I've always loved everything
                        science and computers. My programming background spans many languages, including niches
                        such as embedded development, real-time signal processing, domain-specific languages,
                        and high-performance computing.
                    </p>
                    <p>
                        Aside from my recent focuses in computer science,
                        you can find me at the gym or running, no better way to clear the head.
                        I also enjoy a number of intellectual and creative pursuits: biology, chemistry,
                        writing, drawing, and painting. And, I love getting involved with new people!
                    </p>
                </div>
            </section>

            {/* ── Experience ─────────────────────────── */}
            <div className="about-section-header">
                <h2 className="about-section-header">Experience</h2>
                <Link to="/cv" className="cv-link">View Full CV →</Link>
            </div>
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
            <div className="about-section-header">
                <h2 className="about-section-header">Education</h2>
                <Link to="/cv" className="cv-link">View Full CV →</Link>
            </div>
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
            </div>

            {/* ── Gaming ─────────────────────────────── */}
            <div className="about-section-header">
                <h2 className="about-section-header">Gaming</h2>
                <Link to="/cv" className="cv-link">View Full CV →</Link>
            </div>
            <div className="about-gaming">
                <div className="gaming-blurb">
                    <h3>A lifelong gamer</h3>
                    <p>
                        Video games have been a constant companion since childhood. They taught me
                        problem-solving, pattern recognition, and — perhaps most importantly — how
                        to stay calm under pressure when the blocks start falling faster.
                    </p>
                    <p>
                        Tetris holds a special place in my heart. It's elegant in its simplicity,
                        infinitely replayable, and genuinely hard to master. I even wrote my own
                        p5.js implementation with SRS wall kicks, a piece-bag randomizer, and a
                        lock-delay system — give it a try!
                    </p>
                </div>
                <div>
                    <FlipCard
                        frontContent={
                        <div className="gaming-sketch-wrapper">

                            <TetrisSketch />
                            <p className="gaming-controls">
                                <strong>Controls:</strong>  <br/> ← → Move &nbsp;·&nbsp; ↑ Rotate &nbsp;·&nbsp; <br/> ↓ Soft drop &nbsp;·&nbsp; Space Hard drop &nbsp;·&nbsp; Z Hold
                            </p>
                        </div>
                    }
                        backContent={<div className="gaming-sketch-wrapper" style={{width: "100%", height: "100%", padding: "0"}}/>}
                    />
                </div>
            </div>

        </div>
    )
}
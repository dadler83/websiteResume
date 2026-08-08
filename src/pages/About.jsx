import { Link } from 'react-router-dom'
import './About.css'
import TetrisSketch from '../components/TetrisSketch.jsx'
import RoundedPictureFrame from '../components/RoundedPictureFrame.jsx'
import FlipCard from '../components/FlipCard.jsx'
import {useEffect} from "react";

const experiences = [
    {
        date: '2022 – Present',
        role: 'Full-Stack Software Developer and Field Service Technician',
        company: 'HighQ Technologies',
        description:
            'Lead firmware and GUI development for the Fathom Spectrometer — the world\'s first quantum-enabled EPR spectrometer.',
    },
    {
        date: '2024 – 2025',
        role: 'Undergraduate Researcher',
        company: 'University of Toronto CS',
        description:
            'Assisted graduate researchers with data collection pipelines, analysis, reproducibility, fuzzing CPUs, ' +
            'bug-fixing and paper writing.',
    },
]


export default function About() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }

    useEffect(() => {
        scrollToTop()
    }, []);

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
                    <h3>Honors B.S. in Computer Science</h3>
                    <p className="edu-institution">University of Toronto</p>
                    <p className="edu-year">2021 – 2025</p>
                    <p>
                        Coursework focused in Biology, Chemistry, System Architecture, Database Design,
                        and Machine Learning.
                    </p>
                </div>
            </div>

            {/* ── hobbies ─────────────────────────────── */}
            <div className="about-section-header">
                <h2 className="about-section-header">Hobbies</h2>
                <Link to="/cv" className="cv-link">View Full CV →</Link>
            </div>
            <div className="about-hobbies">
                <div className="hobbies-blurb">
                    <h3>I like video games...</h3>
                    <p>
                        Video games have been a great source of inspiration over the years. When done well,
                        they are not only entertaining but bring together a blend of my favorite interests:
                        programming, managing compute, art, making music, and more.
                    </p>
                    <p>
                        Tetris is a game I've loved over the years. It's elegant in its simplicity, a fun puzzler,
                        and has an extremely high skill ceiling. When getting comfortable with a new language or GUI framework,
                        a Tetris implementation was always one of my gotos; I once turned the console into a writable buffer
                        to make it work in ASCII.

                        {/*I even wrote my own*/}
                        {/*p5.js implementation with SRS wall kicks, a piece-bag randomizer, and a*/}
                        {/*lock-delay system — give it a try!*/}
                    </p>
                    <p>
                        So, have a go at playing my latest web-version if you please. I'd love to add a leader board,
                        but I haven't wanted to set up a backend for this project :)
                    </p>
                </div>
                <div className="hobbies-flip-container">
                    <FlipCard
                        frontContent={
                        <div className="hobbies-sketch-wrapper">

                            <TetrisSketch />
                            <p className="hobbies-controls">
                                <strong>Controls:</strong>  <br/> ← → Move &nbsp;·&nbsp; ↑ Rotate &nbsp;·&nbsp; <br/> ↓ Soft drop &nbsp;·&nbsp; Space Hard drop &nbsp;·&nbsp; Z Hold
                            </p>
                        </div>
                    }
                        backContent={<div className="hobbies-sketch-wrapper" style={{width: "100%", height: "100%", padding: "0"}}/>}
                    />
                </div>
            </div>

        </div>
    )
}
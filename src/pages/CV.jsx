import './CV.css'

// CV-specific icons
import iconMail from '../assets/cv-icons/mail.svg'
import iconLocation from '../assets/cv-icons/location.svg'
import iconCalendar from '../assets/cv-icons/calendar.svg'
import iconBriefcase from '../assets/cv-icons/briefcase.svg'
import iconGradCap from '../assets/cv-icons/graduation-cap-solid.svg'
import iconProjects from '../assets/cv-icons/projects.svg'

// Existing brand icons (black variants)
import iconGitHub from '../assets/GitHub_Invertocat_Black.svg'
import iconLinkedIn from '../assets/linkedin-svgrepo-com.svg'

const contact = {
    email: 'david@davidadler.dev',
    location: 'Portland, OR',
    website: 'davidadler.dev',
    github: 'dadler83',
    linkedin: 'david-adler-a30b3424a',
}

const skills = [
    {
        title: 'Programming',
        entries: [
            { name: 'C / C++', rating: 5 },
            { name: 'Python', rating: 5 },
            { name: 'JavaScript', rating: 4 },
            { name: 'React', rating: 4 },
            { name: 'HTML / CSS', rating: 4 },
            { name: 'Java', rating: 3 },
            { name: 'MATLAB', rating: 3 },
        ],
    },
    {
        title: 'Technologies',
        entries: [
            { name: 'Embedded / Firmware', rating: 5 },
            { name: 'DSP / Signal Processing', rating: 5 },
            { name: 'Git', rating: 4 },
            { name: 'Qt / GUI Development', rating: 4 },
            { name: 'Linux', rating: 4 },
            { name: 'Docker', rating: 3 },
        ],
    },
    {
        title: 'Languages',
        entries: [
            { name: 'English', value: 'Native' },
        ],
    },
]

const education = [
    {
        name: 'B.S. Computer Science',
        location: 'State University',
        date: '2019 – 2023',
        description:
            'Focused on systems programming, algorithms, and applied mathematics. Completed senior capstone project on real-time audio signal processing.',
    },
]

const experience = [
    {
        name: 'Firmware & GUI Developer',
        location: 'HighQ Technologies',
        date: '2023 – Present',
        description:
            'Lead firmware and GUI development for the Fathom Spectrometer — the world\'s first quantum-enabled EPR spectrometer. Responsibilities include real-time data acquisition systems, DSP algorithm implementation, and building intuitive visualization interfaces.',
    },
    {
        name: 'Research Assistant',
        location: 'University Physics Lab',
        date: '2020 – 2021',
        description:
            'Assisted graduate researchers with data collection pipelines, wrote signal-processing scripts to clean and analyze spectroscopy data, and maintained lab documentation.',
    },
]

const projects = [
    {
        name: 'Fathom Spectrometer GUI',
        date: '2023 – Present',
        tech: 'C++; Qt; Python',
        description:
            'Desktop application for controlling and visualizing data from the Fathom EPR spectrometer. Features real-time signal processing, interactive data visualization, and experiment configuration.',
    },
    {
        name: 'Personal Portfolio Website',
        date: '2024 – Present',
        tech: 'React; Vite; D3.js',
        link: 'https://davidadler.dev',
        description:
            'Interactive developer portfolio built with React and Vite. Features include a live code editor, signal processing visualizations, and a Tetris game implemented with p5.js.',
    },
]

function RatingDots({ rating }) {
    return (
        <span className="cv-rating-dots">
            {[1, 2, 3, 4, 5].map((i) => (
                <span
                    key={i}
                    className={
                        i <= rating
                            ? 'cv-rating-dot active'
                            : 'cv-rating-dot inactive'
                    }
                >●</span>
            ))}
        </span>
    )
}

export default function CV() {
    return (
        <div className="cv-page">
            <div className="cv-container">
                {/* ── Header ──────────────────────────── */}
                <header className="cv-header">
                    <h1>David Adler</h1>
                    <p>Software Developer · Scientist · Designer</p>
                </header>

                {/* ── Body ────────────────────────────── */}
                <div className="cv-body">
                    {/* ── Sidebar ──────────────────────── */}
                    <aside className="cv-sidebar">
                        {/* Contact */}
                        <h2 className="cv-sidebar-heading">Contact</h2>
                        <div className="cv-contact">
                            <div className="cv-contact-item">
                                <img src={iconMail} alt="" className="cv-contact-icon" />
                                <a href={`mailto:${contact.email}`}>{contact.email}</a>
                            </div>
                            <div className="cv-contact-item">
                                <img src={iconLocation} alt="" className="cv-contact-icon" />
                                <span>{contact.location}</span>
                            </div>
                            <div className="cv-contact-item">
                                <img src={iconProjects} alt="" className="cv-contact-icon" />
                                <a href={`https://${contact.website}`} target="_blank" rel="noopener noreferrer">
                                    {contact.website}
                                </a>
                            </div>
                            <div className="cv-contact-item">
                                <img src={iconGitHub} alt="" className="cv-contact-icon" />
                                <a href={`https://github.com/${contact.github}`} target="_blank" rel="noopener noreferrer">
                                    @{contact.github}
                                </a>
                            </div>
                            <div className="cv-contact-item">
                                <img src={iconLinkedIn} alt="" className="cv-contact-icon" />
                                <a href={`https://linkedin.com/in/${contact.linkedin}`} target="_blank" rel="noopener noreferrer">
                                    LinkedIn
                                </a>
                            </div>
                        </div>

                        {/* Skills */}
                        <h2 className="cv-sidebar-heading">Skills</h2>
                        {skills.map((group) => (
                            <div className="cv-skills-section" key={group.title}>
                                <h3 className="cv-skills-section-title">{group.title}</h3>
                                {group.entries.map((entry) => (
                                    <div className="cv-skills-entry" key={entry.name}>
                                        <span className="cv-skills-name">{entry.name}</span>
                                        {entry.rating && <RatingDots rating={entry.rating} />}
                                        {entry.value && <span className="cv-skills-value">{entry.value}</span>}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </aside>

                    {/* ── Main sections ────────────────── */}
                    <div className="cv-sections">
                        {/* Education */}
                        <section>
                            <h2 className="cv-section-heading">
                                <img src={iconGradCap} alt="" className="cv-section-icon" /> Education
                            </h2>
                            {education.map((item) => (
                                <div className="cv-entry" key={item.name}>
                                    <div className="cv-entry-header">
                                        <div className="cv-entry-info">
                                            <span><img src={iconCalendar} alt="" className="cv-inline-icon" /> {item.date}</span>
                                            <span><img src={iconLocation} alt="" className="cv-inline-icon" /> {item.location}</span>
                                        </div>
                                        <div className="cv-entry-name">{item.name}</div>
                                    </div>
                                    <p className="cv-entry-description">{item.description}</p>
                                </div>
                            ))}
                        </section>

                        {/* Experience */}
                        <section>
                            <h2 className="cv-section-heading">
                                <img src={iconBriefcase} alt="" className="cv-section-icon" /> Work Experience
                            </h2>
                            {experience.map((item) => (
                                <div className="cv-entry" key={item.name}>
                                    <div className="cv-entry-header">
                                        <div className="cv-entry-info">
                                            <span><img src={iconCalendar} alt="" className="cv-inline-icon" /> {item.date}</span>
                                            <span><img src={iconLocation} alt="" className="cv-inline-icon" /> {item.location}</span>
                                        </div>
                                        <div className="cv-entry-name">{item.name}</div>
                                    </div>
                                    <p className="cv-entry-description">{item.description}</p>
                                </div>
                            ))}
                        </section>

                        {/* Projects */}
                        <section>
                            <h2 className="cv-section-heading">
                                <img src={iconProjects} alt="" className="cv-section-icon" /> Projects
                            </h2>
                            {projects.map((item) => (
                                <div className="cv-project" key={item.name}>
                                    <div className="cv-project-header">
                                        <span className="cv-project-name">
                                            {item.link ? (
                                                <a href={item.link} target="_blank" rel="noopener noreferrer">
                                                    {item.name}
                                                </a>
                                            ) : (
                                                item.name
                                            )}
                                        </span>
                                        <div className="cv-project-info">
                                            <span><img src={iconCalendar} alt="" className="cv-inline-icon" /> {item.date}</span>
                                            <span><img src={iconProjects} alt="" className="cv-inline-icon" /> {item.tech}</span>
                                        </div>
                                    </div>
                                    <p className="cv-entry-description">{item.description}</p>
                                </div>
                            ))}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

import './CV.css'

// CV-specific icons
import iconMail from '../assets/cv-icons/mail.svg'
import iconLocation from '../assets/cv-icons/location.svg'
import iconCalendar from '../assets/cv-icons/calendar.svg'
import iconBriefcase from '../assets/cv-icons/briefcase.svg'
import iconGradCap from '../assets/cv-icons/graduation-cap.svg'
import iconProjects from '../assets/cv-icons/projects.svg'
import iconLink from '../assets/cv-icons/link.svg'

// Existing brand icons (black variants)
import iconGitHub from '../assets/GitHub_Invertocat_Black.svg'
import iconLinkedIn from '../assets/linkedin-svgrepo-com.svg'

const contact = {
    email: 'david.adler@highqtechnologies.com',
    location: 'Waterloo, ON',
    website: 'davidadler.dev',
    github: 'dadler83',
    linkedin: 'david-adler-a30b3424a',
}

const skills = [
    {
        title: 'Languages',
        entries: [
            { name: 'Python', rating: 5 },
            { name: 'Make', rating: 5 },
            { name: 'C++', rating: 4 },
            { name: 'C', rating: 4 },
            { name: 'C#', rating: 4 },
            { name: 'JavaScript', rating: 4 },
            { name: 'SQL', rating: 4 },
            { name: 'CMake', rating: 3 },
            { name: 'Bash', rating: 3 },
            { name: 'React (jsx)', rating: 3 },
            { name: 'Typescript', rating: 3 },
            { name: 'HTML / CSS', rating: 3 },
            { name: 'Java', rating: 3 },
            { name: 'Powershell', rating: 3 },
            { name: 'Batch', rating: 2 },
            { name: 'Haskell', rating: 2 },
            { name: 'PHP', rating: 1 },
            { name: 'Rust', rating: 1 },
        ],
    },
    {
        title: 'Technologies',
        entries: [
            // { name: 'Embedded / Firmware', rating: 5 },
            // { name: 'DSP / Signal Processing', rating: 5 },
            { name: 'Git', rating: 5 },
            { name: 'Docker', rating: 4 },
            // { name: 'Qt / GUI Development', rating: 4 },
            { name: 'Linux', rating: 4 },
            { name: 'Windows', rating: 3 },
            { name: 'MacOS', rating: 1 },
        ],
    },
    // {
    //     title: 'Languages',
    //     entries: [
    //         { name: 'English', value: 'Native' },
    //     ],
    // },
]

const education = [
    {
        name: 'Honors B.S. in Computer Science',
        location: 'University of Toronto',
        date: '2021 – 2025',
        description: (
            <>
                Coursework focused in Biology, Chemistry, System Architecture, Database Design, and Machine Learning.
                Completed senior projects in database research, cache side-channel research, and video game design.
                <ul>
                    <li><strong>Final Cumulative GPA</strong>: 3.91/4.0</li>
                    <li>Awarded Dean's List Scholar (2021-2025)</li>
                    <li>Awarded <a href={"https://www.uc.utoronto.ca/scholarships-awards/louis-savlov-uc-1937-scholarships-science-social-sciences-and-humanities"}>Louis Savlov (UC&apos;37) Scholarships In Sciences And Humanities At University College</a> (2025)</li>
                    <li>Awarded <a href={"https://www.uc.utoronto.ca/scholarships-awards/dr-james-connie-p-dickson-scholarships-sciences-and-mathematics"}>Dr. James A. &amp; Connie P. Dickson Scholarship In Science &amp; Mathematics</a> (2022)</li>
                    <li>Awarded <a href={"https://www.uc.utoronto.ca/scholarships-awards/john-leyerleplum-foundation-scholarships"}>John Leyerle/Plum Foundation Scholarship</a> (2021)</li>
                </ul>
            </>
        ),
    },
]

const experience = [
    {
        name: 'Full-Stack Software Developer and Field Service Technician',
        location: 'Waterloo, ON',
        date: '2022 – Present',
        description: (
            <ul>
                <li>Lead firmware and GUI development for the <a href={"https://highqtechnologies.com/"}>Fathom Spectrometer</a> — the world&apos;s first quantum-enabled EPR spectrometer.</li>
                <li>Designed real-time data acquisition systems, motor control systems, and high-performance domain specific algorithms for nanosecond precision qubit control.</li>
                <li>Physical component maintenance, setup, sample handling and loading.</li>
            </ul>
        ),
    },
    {
        name: 'CS Researcher',
        location: 'UofT Research Lab',
        date: '2024 – 2025',
        description: (
            <ul>
                <li>Assisted graduate researchers with data collection pipelines, analysis, reproducibility,
                    fuzzing CPUs, bug-fixing and paper writing.</li>
                <li><a href={"https://dl.acm.org/doi/epdf/10.1145/3676641.3716247"}>Hardware Security paper</a> published
                    in <strong>ASPLOS</strong>, a world leading conference in computer architecture.</li>
                <li>Implemented and benchmarked database hash table improvements in RocksDB.</li>
            </ul>
        ),
    },
]

const projects = [
    {
        name: 'Portfolio Website',
        date: '2025 – Present',
        tech: 'React; Vite; D3.js',
        link: 'https://davidadler.dev',
        description: (
            <>
                Interactive developer portfolio; Features a blog, signal processing visualizations, a Tetris game implemented with p5.js,
                3D molecule visualizations, and more about me.
            </>
        ),
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
                                    <div className="cv-entry-description">{item.description}</div>
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
                                    <div className="cv-entry-description">{item.description}</div>
                                </div>
                            ))}
                        </section>

                        {/* Projects */}
                        <section>
                            <h2 className="cv-section-heading">
                                <img src={iconProjects} alt="" className="cv-section-icon" /> Projects And More
                            </h2>
                            {projects.map((item) => (
                                <div className="cv-project" key={item.name}>
                                    <div className="cv-project-header">
                                        <span className="cv-project-name">
                                            {item.link ? (
                                                <a href={item.link} target="_blank" rel="noopener noreferrer">
                                                    {item.name} <img src={iconLink} alt="" className="cv-inline-icon" />
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
                                    <div className="cv-entry-description">{item.description}</div>
                                </div>
                            ))}
                            <div className="cv-entry-description">
                                Other Accolades
                                <ul>
                                    <li>Top 64 at National Speech and Debate Association debate
                                        tournament (2019)</li>
                                    <li>Louisiana All-State Cross Country Honors Athlete (2020)</li>
                                </ul>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <div style={{display: "flex", justifyContent: "flex-end", alignItems: "flex-end", width: "95%"}}>
                <button className="cv-print-btn" onClick={() => {
                    let temp = document.title;
                    const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
                    document.title = "Adler_David_CV_" + today;
                    window.print();
                    document.title = temp;
                }}>
                    Print CV
                </button>
            </div>
        </div>
    )
}

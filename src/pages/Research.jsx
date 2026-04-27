import './Research.css'

export default function Research() {
    return (
        <div className="research-container">

            {/* ── Hero ───────────────────────────────── */}
            <section className="research-hero">
                <h1>Research</h1>
                <p className="research-subtitle">Key-Value Stores · Hardware Security · Speculation</p>
            </section>

            {/* ── Overview ───────────────────────────── */}
            <section className="research-overview">
                <h2>My Undergrad Research</h2>
                <p>
                    During my undergrad, despite my part-time job,
                    I'm very thankful I got to participate in some research.
                </p>
                <p>
                    The main research project I participated in focused on hardware-security, specifically speculation.
                    From <a href="https://www.nivdayan.net/" target="_blank" rel="noopener noreferrer">
                        Dr. Niv Dayan
                    </a>,
                    I also got to learn a lot about database backends, optimization, and key-value stores.
                    My projects focused on detecting side-channels for processors before any HDL or
                    hardware had been made and exploring optimizations for{' '}
                    <strong>RocksDB</strong> using <strong>minimal perfect hash functions</strong> to
                    improve key lookup times for SSTs cached on the CPU.
                </p>
            </section>

            {/* ── Publications ───────────────────────── */}
            <h2 className="research-section-header">Publications</h2>
            <div className="research-publications">
                <div className="publication-card">
                    <span className="publication-venue">ASPLOS 2025</span>
                    <h3>
                        <a
                            href="https://dl.acm.org/doi/epdf/10.1145/3676641.3716247"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View Paper&nbsp;↗
                        </a>
                    </h3>
                    <p>
                        Published at <strong>ASPLOS</strong> (Architectural Support for Programming
                        Languages and Operating Systems), a top-tier venue for systems research.
                        This work investigates novel approaches to key-value database design
                        using RocksDB and minimal perfect hash functions to optimize storage
                        efficiency and lookup performance.
                    </p>
                </div>
            </div>

            {/* ── Collaborators ──────────────────────── */}
            <h2 className="research-section-header">Collaborators</h2>
            <div className="research-collaborators">
                <div className="collaborator-card">
                    <h3>
                        <a
                            href="https://www.nivdayan.net/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Dr. Niv Dayan&nbsp;↗
                        </a>
                    </h3>
                    <p>
                        Research advisor and collaborator on key-value database research.
                        Together we explore storage engine optimizations for modern hardware
                        using RocksDB and minimal perfect hash functions.
                    </p>
                </div>
            </div>

        </div>
    )
}

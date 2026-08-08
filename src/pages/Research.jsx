import './Research.css'
import Editor from '@monaco-editor/react'

export default function Research() {
    const speculationSnippet = `#include <iostream>
#include <vector>

void speculate(bool authorized, std::vector<int>& cache) {
    if (authorized) {
        int secret = 42;
        cache[secret * 64] += 1;
    }
}

// The CPU may execute this path before the branch resolves.`
    return (
        <div className="research-container">

            {/* ── Hero ───────────────────────────────── */}
            <section className="research-hero">
                <h1>Research</h1>
                <p className="research-subtitle">Key-Value Stores · Hardware Security · Speculation · EPR</p>
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
                    <b>RocksDB</b> using <b>minimal perfect hash functions</b> to
                    improve key lookup times for SSTs cached on the CPU.
                </p>
            </section>

            <section className="research-overview">
                <h2>About Speculation and Side-channels</h2>
                <div className="research-speculation-layout">
                    <p className="research-speculation-full-width">
                        Modern processors are heavily optimized pieces of equipment.
                        A not so simple yet powerful optimization is essentially a requirement for modern applications:
                        Speculation. Simply put, the CPU receives instructions to execute from programs we run like a browser.
                        Often times, we want to load or perform actions conditionally; for example, your browser may want to load
                        your instagram page if your login information is valid. However, the data to evaluate such a condition may be
                        incredibly far from your CPU at time of request.
                    </p>
                    <div className="research-speculation-text">
                        <p>
                            In order to move-on, your CPU will predict the outcome
                            of such a condition. It is incredibly good at making such predictions;
                            in fact, modern branch predictors are over 90% accurate. If later, when the condition is evaluated,
                            your CPU discovers it made a wrong prediction, it will throw out its work (flush its instruction pipeline)
                            and start anew. This logic is written directly into CPU hardware. Instructions executed under such a
                            prediction are said to be speculatively executed, and this process is called speculation.
                        </p>
                        <br/>
                        <p>
                            Conventional wisdom was that once an incorrect prediction was flushed,
                            data fetched under speculation couldn't be identified or retrieved; however, with the discovery of
                            {' '} <a href={"https://hackmag.com/security/meltdown-and-spectre"}>Spectre and Meltdown in 2018</a>,
                            it became known that this necessary optimization caused a security vulnerability at the hardware-level,
                            invisible to the software. Differences in speculatively executed instructions can cause the same
                            code to produce a different microarchitectural state, or differences in data loaded into the
                            processor cache. It was discovered that a clever attacker prime the processor to misspeculate,
                            loading, identifying, and fetching secret data that was loaded speculatively.
                        </p>
                    </div>
                    <div className="research-editor-card">
                        <div className="research-editor-header">
                            <h3>Speculative Execution Sketch</h3>
                            <span>C++</span>
                        </div>
                        <div className="research-editor-shell">
                            <div className="research-editor-label">C++</div>
                            <Editor
                                height="260px"
                                defaultLanguage="cpp"
                                defaultValue={speculationSnippet}
                                theme="vs-dark"
                                options={{
                                    readOnly: true,
                                    minimap: { enabled: false },
                                    scrollBeyondLastLine: false,
                                    fontSize: 13,
                                    lineNumbersMinChars: 3,
                                    automaticLayout: true,
                                    padding: { top: 10, bottom: 10 },
                                    wordWrap: 'on'
                                }}
                            />
                        </div>
                        <p className="research-editor-description">
                            A simplified example of how speculative execution can touch data before a branch resolves.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Publications ───────────────────────── */}
            <h2 className="research-section-header">Publications</h2>
            <div className="research-publications">
                <div className="publication-card">
                    <h3>
                        <a
                            href="https://dl.acm.org/doi/epdf/10.1145/3676641.3716247"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            AMuLeT: Automated Design-Time Testing of SecureSpeculation Countermeasures&nbsp;↗
                        </a>
                    </h3>
                    <span className="publication-venue">ASPLOS 2025</span>
                    <p>
                        Published at <strong>ASPLOS</strong> (Architectural Support for Programming
                        Languages and Operating Systems), a top-tier venue for systems research.
                        This work investigates a novel approach for design-time mitigation of Spectre-based side-channels
                        before expensive HDL or hardware has been manufactured.
                    </p>
                </div>
            </div>

            {/* ── Collaborators ──────────────────────── */}
            {/*<h2 className="research-section-header">Collaborators</h2>*/}
            {/*<div className="research-collaborators">*/}
            {/*    <div className="collaborator-card">*/}
            {/*        <h3>*/}
            {/*            <a*/}
            {/*                href="https://www.nivdayan.net/"*/}
            {/*                target="_blank"*/}
            {/*                rel="noopener noreferrer"*/}
            {/*            >*/}
            {/*                Dr. Niv Dayan&nbsp;↗*/}
            {/*            </a>*/}
            {/*        </h3>*/}
            {/*        <p>*/}
            {/*            Research advisor and collaborator on key-value database research.*/}
            {/*            Together we explore storage engine optimizations for modern hardware*/}
            {/*            using RocksDB and minimal perfect hash functions.*/}
            {/*        </p>*/}
            {/*    </div>*/}
            {/*</div>*/}

        </div>
    )
}

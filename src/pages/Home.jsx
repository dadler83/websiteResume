import './Home.css'
import fathom from "../assets/FATHOM.png"
import MonacoEditor from "../components/MonacoEditor.jsx";
import PulseChart from "../components/PulseChart.jsx";
import FlipCard from "../components/FlipCard.jsx";
import ModulationChart from "../components/ModulationChart.jsx";
import SkillCarousel from "../components/SkillCarousel.jsx";

export default function Home() {
    return (
        <div className="home-container">
            <div className="home-content">
                <div className="home-left">
                    <h1>I'm David Adler, </h1>
                    <p>
                        A Software Developer.
                        A Scientist.
                        A Designer. <br/>
                        Learning to pass the time.
                    </p>
                </div>

                <div className="home-right">
                    <FlipCard
                        frontContent={
                            <div className="rounded-box" style={{width:'100%', height: '100%', maxWidth: '35rem'}}>
                                <h2>Hello World!</h2>
                                <h4>...or as I've also said</h4>
                                <MonacoEditor />
                            </div>
                        }
                        backContent={
                            <div className="rounded-box" style={{width:'100%', height: '100%', padding: '0px', alignItems: 'center', display: "flex", flexDirection: 'column', justifyContent: 'center'}}>
                                <p>
                                    I've worked in many languages and frameworks over the years, but I think
                                    you learn to move around; I wouldn't consider myself a "React developer", but
                                    I strung this website together using React, Vite, and many other libraries.
                                </p>
                                <p>
                                    So, I just do whatever it takes to get the job done, and I pick up new tools as needed along the way.
                                </p>
                                <p>
                                    That said, low-level performance-critical programming is where I feel most at home,
                                    and I have a lot of experience writing embedded firmware in C and C++ for microcontrollers and DSLs for proprietary devices.
                                </p>
                            </div>
                        }
                    />

                </div>
            </div>
            <div className="fathom-content">

                <FlipCard
                    frontContent={
                        <div className="fathom-box" style={{width:'100%', height: '100%'}}>
                            <div className="fathom-image">
                                <img src={fathom} alt="HighQ Fathom Spectormeter" />
                            </div>
                        </div>
                    }
                    backContent={
                        <div className="fathom-box" style={{width:'100%', height: '100%', padding: '0px', margin: '0px', display: "flex", flexDirection: 'column', justifyContent: 'center'}}>
                            <p>
                                The Fathom Spectrometer has had a lot of interesting challenges to solve along the way.
                                I wish I could go over all of the design intricacies and engineering decisions that went into it,
                                but I don't want to give away any trade secrets.
                            </p>
                            <p>
                                For now, I can say that I'm thankful I've gotten to solve some truly one-of-a-kind problems,
                                and <a href={"https://en.wikipedia.org/wiki/Electron_paramagnetic_resonance#Hardware_components"}>
                                    EPR spectroscopy
                                </a> is a fascinating process that requires coordination between many
                                unique pieces of equipment.
                            </p>
                        </div>
                    }
                />
                <div className="fathom-text">
                    <p>
                        I lead firmware and GUI development for HighQ's <a href={"https://highqtechnologies.com/"}>Fathom Spectrometer</a>,
                        the world's first quantum-enabled EPR spectrometer.
                        <br/> <br/>
                        <br/> <br/>
                        My work has involved developing robust data acquisition systems, implementing real-time signal processing algorithms,
                        and creating user-friendly interfaces for data visualization.
                    </p>
                </div>
            </div>

            <h3 className={"section-header"}>Some Things I do</h3>
            <div className="signal-content">
                <div className="signal-box">
                    <h3 className={"section-header"}>Signal Processing</h3>
                    <div className={"signal-widgets"}>
                        <FlipCard
                            frontContent={
                                <div className="signal-widget-box" style={{width:'100%', height: '100%'}}>
                                    <PulseChart />
                                </div>
                            }
                            backContent={
                                <div className="signal-widget-box" style={{width:'100%', height: '100%', padding: '0px'}}>
                                    {/*<div className="fathom-image">*/}
                                    {/*    <img src={fathom} alt="HighQ Fathom Spectormeter" />*/}
                                    {/*</div>*/}
                                </div>
                            }
                        />
                        <FlipCard
                            frontContent={
                                <div className="signal-widget-box" style={{width:'100%', height: '100%'}}>
                                    <ModulationChart/>
                                </div>
                            }
                            backContent={
                                <div className="signal-widget-box" style={{width:'100%', height: '100%', padding: '0px'}}>
                                    {/*<div className="fathom-image">*/}
                                    {/*    <img src={fathom} alt="HighQ Fathom Spectormeter" />*/}
                                    {/*</div>*/}
                                </div>
                            }
                        />
                    </div>
                </div>
            </div>

            <SkillCarousel />
        </div>
    )
}
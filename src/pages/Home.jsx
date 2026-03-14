import './Home.css'
import { useRef, useEffect, useCallback } from 'react';
import fathom from "../assets/FATHOM.png"
import MonacoEditor from "../components/MonacoEditor.jsx";
import PulseChart from "../components/PulseChart.jsx";
import TestKeyboardComponent from "../components/TestKeyboardComponent.jsx";
import FlipCard from "../components/FlipCard.jsx";
import ModulationChart from "../components/ModulationChart.jsx";

const skillCards = [
    {
        icon: '⚛️',
        title: 'React',
        description: 'Building dynamic, component-driven UIs with hooks and modern patterns.',
        frontColor: '#C8ECFE',
        backColor: '#1565C0',
    },
    {
        icon: '🐍',
        title: 'Python',
        description: 'Data analysis, scripting, and backend services using Python.',
        frontColor: '#FFF3B0',
        backColor: '#306998',
    },
    {
        icon: '⚡',
        title: 'C / C++',
        description: 'Low-level firmware and performance-critical systems development.',
        frontColor: '#D4E6F1',
        backColor: '#1A5276',
    },
    {
        icon: '📡',
        title: 'Firmware',
        description: 'Embedded systems programming for hardware-software integration.',
        frontColor: '#FDEBD0',
        backColor: '#784212',
    },
    {
        icon: '📊',
        title: 'Signal Processing',
        description: 'Real-time DSP algorithms and data visualization pipelines.',
        frontColor: '#D5F5E3',
        backColor: '#1E8449',
    },
    {
        icon: '🗄️',
        title: 'Databases',
        description: 'Designing and querying relational and document-based databases.',
        frontColor: '#E8DAEF',
        backColor: '#6C3483',
    },
];

// Triple the array so scroll can loop seamlessly from either end
const tripleCards = [...skillCards, ...skillCards, ...skillCards];

// Auto-advance one card every N milliseconds
const AUTO_SCROLL_INTERVAL_MS = 3000;

export default function Home() {
    const carouselRef = useRef(null);
    const isPausedRef = useRef(false);

    /** Width of one card slot (card + gap). */
    const getCardStep = useCallback(() => {
        const el = carouselRef.current;
        if (!el) return 0;
        const card = el.querySelector('.skill-carousel-card');
        if (!card) return 0;
        // Read the gap from computed style; fall back to 24 (typical 1.5rem at default font size)
        const gap = parseFloat(window.getComputedStyle(el).gap) || 24;
        return card.offsetWidth + gap;
    }, []);

    /** Total scroll width of one copy of skillCards. */
    const getSetWidth = useCallback(() => {
        const step = getCardStep();
        return step > 0 ? step * skillCards.length : 0;
    }, [getCardStep]);

    /**
     * Silently snap back to the equivalent position inside the middle copy.
     * Called ~650 ms after each smooth scroll so the animation has finished.
     */
    const correctPosition = useCallback(() => {
        const el = carouselRef.current;
        if (!el) return;
        const setWidth = getSetWidth();
        if (setWidth <= 0) return;
        if (el.scrollLeft < setWidth) {
            el.scrollLeft += setWidth;
        } else if (el.scrollLeft >= setWidth * 2) {
            el.scrollLeft -= setWidth;
        }
    }, [getSetWidth]);

    /** Advance the carousel by one card (auto or manual). */
    const scrollOneCard = useCallback((dir = 1) => {
        const el = carouselRef.current;
        if (!el) return;
        const step = getCardStep();
        if (step <= 0) return;
        el.scrollTo({ left: el.scrollLeft + dir * step, behavior: 'smooth' });
        // Wait for the smooth-scroll animation (~600 ms) to finish before correcting position
        setTimeout(correctPosition, 650);
    }, [getCardStep, correctPosition]);

    // On mount: jump to the beginning of the middle copy so we can scroll both ways
    useEffect(() => {
        const el = carouselRef.current;
        if (!el) return;
        const t = setTimeout(() => {
            const setWidth = getSetWidth();
            if (setWidth > 0) el.scrollLeft = setWidth;
        }, 50);
        return () => clearTimeout(t);
    }, [getSetWidth]);

    // Auto-scroll: advance one card every AUTO_SCROLL_INTERVAL_MS unless paused
    useEffect(() => {
        // Capture the interval ID in a local variable so the cleanup always clears
        // the exact interval that this effect instance created, even if the ref changes.
        const id = setInterval(() => {
            if (!isPausedRef.current) scrollOneCard(1);
        }, AUTO_SCROLL_INTERVAL_MS);
        return () => clearInterval(id);
    }, [scrollOneCard]);

    const handleMouseEnter = () => { isPausedRef.current = true; };
    const handleMouseLeave = () => { isPausedRef.current = false; };

    const scrollManual = (dir) => scrollOneCard(dir);
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
                            <div className="rounded-box" style={{width:'100%', height: '100%', maxWidth: '30rem'}}>
                                <h1>Hello World!</h1>
                                <h4>...or as I've also said</h4>
                                <MonacoEditor />
                            </div>
                        }
                        backContent={
                            <div className="rounded-box" style={{width:'95%', height: '93%', maxWidth: '30rem'}}>
                                <h1>Hello World!</h1>
                            </div>
                        }
                    />

                </div>
            </div>
            <div className="fathom-content">

                <FlipCard
                    frontContent={
                        <div className="fathom-box" style={{width:'95%', height: '100%'}}>
                            <div className="fathom-image">
                                <img src={fathom} alt="HighQ Fathom Spectormeter" />
                            </div>
                        </div>
                    }
                    backContent={
                        <div className="fathom-box" style={{width:'95%', height: '100%'}}>
                            {/*<div className="fathom-image">*/}
                            {/*    <img src={fathom} alt="HighQ Fathom Spectormeter" />*/}
                            {/*</div>*/}
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

            <h1 className={"section-header"}>Some Things I do</h1>
            <div className="signal-content">
                <div className="signal-box">
                    <h1 className={"section-header"}>Signal Processing</h1>
                    <div className={"signal-widgets"}>
                        <FlipCard
                            frontContent={
                                <div className="signal-widget-box" style={{width:'95%', height: '100%'}}>
                                    <PulseChart />
                                </div>
                            }
                            backContent={
                                <div className="signal-widget-box" style={{width:'95%', height: '90%'}}>
                                    {/*<div className="fathom-image">*/}
                                    {/*    <img src={fathom} alt="HighQ Fathom Spectormeter" />*/}
                                    {/*</div>*/}
                                </div>
                            }
                        />
                        <FlipCard
                            frontContent={
                                <div className="signal-widget-box" style={{width:'95%', height: '100%'}}>
                                    <ModulationChart/>
                                </div>
                            }
                            backContent={
                                <div className="signal-widget-box" style={{width:'95%', height: '90%'}}>
                                    {/*<div className="fathom-image">*/}
                                    {/*    <img src={fathom} alt="HighQ Fathom Spectormeter" />*/}
                                    {/*</div>*/}
                                </div>
                            }
                        />
                    </div>
                </div>
            </div>

            <h1 className={"section-header"}>System Architecture</h1>
            <p>Databases, Operating Systems, IOT, Low-level Development</p>
            {/*<h1>Art, Design, and Creativity?</h1>*/}
            {/*<TestKeyboardComponent/>*/}


            {/*<div className="fathom-content">*/}
            {/*    <div className="fathom-box">*/}
            {/*        <div className="fathom-content">*/}
            {/*            <p>*/}
            {/*                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus arcu leo, id pellentesque dui eleifend ut. Sed at elit quis elit finibus vulputate in tempus sapien. Cras rhoncus dolor ex, a hendrerit tortor volutpat id. Integer nec tristique dui. Sed convallis semper nunc vitae finibus. Phasellus eu ligula tellus. Morbi ultrices pretium mi quis aliquet. Etiam lectus felis, blandit et dapibus sed, blandit non lectus. Curabitur ac luctus enim, nec facilisis massa. Suspendisse potenti. Nunc elementum magna ac ipsum aliquet, eget pellentesque eros aliquam. Sed in nibh sed ipsum gravida mollis pulvinar lobortis velit. Duis ut erat sit amet urna lacinia lacinia.*/}
            {/*            </p>*/}
            {/*            <br/>*/}
            {/*            <p>*/}
            {/*                Sed eu vulputate risus, in auctor magna. In quis dui vel massa rutrum consectetur sit amet id nulla. Proin in nibh ut leo tincidunt sollicitudin non in nisl. In posuere, est ultrices condimentum commodo, ex turpis fringilla tortor, eget tempor velit mauris sed ante. Sed et nisl vitae velit ultricies faucibus sit amet at magna. Ut pharetra est risus, non accumsan dolor auctor vitae. Fusce gravida tempus nisi, non congue purus dapibus sed. Ut quis enim sagittis erat rutrum placerat quis in enim. Integer at lacus in quam maximus malesuada id in ligula. Donec porta et est et pharetra. Sed et maximus turpis, non aliquet lacus. Pellentesque ut diam consectetur enim eleifend ornare ac ac nibh. Nullam convallis enim sed sollicitudin feugiat.*/}
            {/*            </p>*/}
            {/*            <br/>*/}
            {/*            <p>*/}
            {/*                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus arcu leo, id pellentesque dui eleifend ut. Sed at elit quis elit finibus vulputate in tempus sapien. Cras rhoncus dolor ex, a hendrerit tortor volutpat id. Integer nec tristique dui. Sed convallis semper nunc vitae finibus. Phasellus eu ligula tellus. Morbi ultrices pretium mi quis aliquet. Etiam lectus felis, blandit et dapibus sed, blandit non lectus. Curabitur ac luctus enim, nec facilisis massa. Suspendisse potenti. Nunc elementum magna ac ipsum aliquet, eget pellentesque eros aliquam. Sed in nibh sed ipsum gravida mollis pulvinar lobortis velit. Duis ut erat sit amet urna lacinia lacinia.*/}
            {/*            </p>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className="flip-card-row-section">
                <h1 className="section-header">Skills &amp; Tools</h1>
                <div className="flip-card-carousel-wrapper">
                    <button
                        className="flip-card-carousel-btn"
                        onClick={() => scrollManual(-1)}
                        aria-label="Scroll left"
                    >&#8249;</button>
                    <div
                        className="flip-card-row"
                        ref={carouselRef}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {tripleCards.map((card, index) => (
                            <div
                                key={index}
                                className="skill-carousel-card"
                            >
                                <FlipCard
                                    frontContent={
                                        <div className="skill-card-front" style={{ backgroundColor: card.frontColor }}>
                                            <span className="skill-icon">{card.icon}</span>
                                            <h3>{card.title}</h3>
                                        </div>
                                    }
                                    backContent={
                                        <div className="skill-card-back" style={{ backgroundColor: card.backColor }}>
                                            <p>{card.description}</p>
                                        </div>
                                    }
                                />
                            </div>
                        ))}
                    </div>
                    <button
                        className="flip-card-carousel-btn"
                        onClick={() => scrollManual(1)}
                        aria-label="Scroll right"
                    >&#8250;</button>
                </div>
            </div>
        </div>
    )
}
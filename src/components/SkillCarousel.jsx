import './SkillCarousel.css';
import { useRef, useEffect, useCallback } from 'react';
import FlipCard from './FlipCard.jsx';

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

export default function SkillCarousel() {
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
                            key={`${Math.floor(index / skillCards.length)}-${index % skillCards.length}`}
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
    );
}

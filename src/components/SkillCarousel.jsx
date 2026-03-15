import './SkillCarousel.css';
import { useRef, useEffect } from 'react';
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

// Continuous scroll speed in pixels per second
const SCROLL_SPEED_PX_PER_SEC = 60;

// How long (ms) to pause auto-scroll after an arrow button is clicked
const ARROW_PAUSE_MS = 3000;

// Fallback gap in px used when getComputedStyle cannot parse the gap value.
// Matches the CSS variable --skill-card-gap (1.5rem @ 16px base = 24px).
const DEFAULT_GAP_PX = 24;

export default function SkillCarousel() {
    const carouselRef = useRef(null);

    // rAF state
    const rafIdRef        = useRef(null);
    const lastTsRef       = useRef(null);   // null signals "reset timestamp on next frame"

    // Pause flags (refs so they never trigger re-renders)
    const isHoveredRef      = useRef(false);
    const isArrowPausedRef  = useRef(false);
    const arrowTimerRef     = useRef(null);

    // Cached card step width so the rAF loop never touches the DOM for geometry
    const stepCacheRef = useRef(0);

    // ── helpers ──────────────────────────────────────────────────────────────

    /** Measure and cache (cardWidth + gap). */
    const computeStep = () => {
        const el = carouselRef.current;
        if (!el) return;
        const card = el.querySelector('.skill-carousel-card');
        if (!card) { stepCacheRef.current = 0; return; }
        const gap = parseFloat(window.getComputedStyle(el).gap) || DEFAULT_GAP_PX;
        stepCacheRef.current = card.offsetWidth + gap;
    };

    /** Silently keep scrollLeft inside the middle copy of tripleCards. */
    const wrapScroll = (el) => {
        const setWidth = stepCacheRef.current * skillCards.length;
        if (setWidth <= 0) return;
        if (el.scrollLeft < setWidth)          el.scrollLeft += setWidth;
        else if (el.scrollLeft >= setWidth * 2) el.scrollLeft -= setWidth;
    };

    // ── effects ──────────────────────────────────────────────────────────────

    // Cache step on mount and keep it fresh on resize
    useEffect(() => {
        computeStep();
        window.addEventListener('resize', computeStep);
        return () => window.removeEventListener('resize', computeStep);
    }, []);

    // Jump to the middle copy so we can scroll both ways immediately
    useEffect(() => {
        const t = setTimeout(() => {
            const el = carouselRef.current;
            if (!el) return;
            computeStep();
            const setWidth = stepCacheRef.current * skillCards.length;
            if (setWidth > 0) el.scrollLeft = setWidth;
        }, 50);
        return () => clearTimeout(t);
    }, []);

    // Continuous rAF scroll loop
    useEffect(() => {
        const animate = (ts) => {
            const paused = isHoveredRef.current || isArrowPausedRef.current;

            if (!paused) {
                const el = carouselRef.current;
                if (el && lastTsRef.current !== null) {
                    // Clamp dt to 100 ms so a hidden-tab resume doesn't jump
                    const dt = Math.min(ts - lastTsRef.current, 100);
                    el.scrollLeft += (SCROLL_SPEED_PX_PER_SEC * dt) / 1000;
                    wrapScroll(el);
                }
                lastTsRef.current = ts;
            } else {
                // Clear timestamp so there's no position jump when we resume
                lastTsRef.current = null;
            }

            rafIdRef.current = requestAnimationFrame(animate);
        };

        rafIdRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafIdRef.current);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // ── event handlers ───────────────────────────────────────────────────────

    const handleMouseEnter = () => { isHoveredRef.current = true; };
    const handleMouseLeave = () => { isHoveredRef.current = false; };

    const scrollManual = (dir) => {
        const el = carouselRef.current;
        if (!el || stepCacheRef.current <= 0) return;

        // Stop the rAF loop so it doesn't fight the browser's smooth scroll
        isArrowPausedRef.current = true;
        if (arrowTimerRef.current) clearTimeout(arrowTimerRef.current);

        // Smooth-scroll one card in the chosen direction
        el.scrollTo({ left: el.scrollLeft + dir * stepCacheRef.current, behavior: 'smooth' });

        // Wrap scrollLeft once the smooth animation finishes.
        // Use the 'scrollend' event where supported; fall back to a fixed timeout.
        const onScrollEnd = () => {
            clearTimeout(fallbackTimer);
            wrapScroll(el);
        };
        el.addEventListener('scrollend', onScrollEnd, { once: true });
        const fallbackTimer = setTimeout(() => {
            el.removeEventListener('scrollend', onScrollEnd);
            wrapScroll(el);
        }, 700);

        // Resume continuous scroll after the pause window
        arrowTimerRef.current = setTimeout(() => {
            isArrowPausedRef.current = false;
            arrowTimerRef.current = null;
        }, ARROW_PAUSE_MS);
    };

    // ── render ───────────────────────────────────────────────────────────────

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

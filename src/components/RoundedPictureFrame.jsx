import { useState, useEffect, useRef } from 'react';
import './RoundedPictureFrame.css';

// Default catalogue — replace src values with real photos as needed
const DEFAULT_IMAGES = [
    {
        src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="300" height="300" fill="%231B3720"/><text x="50%25" y="54%25" dominant-baseline="middle" text-anchor="middle" font-size="120" font-family="serif">🧑‍💻</text></svg>',
        alt: 'Developer',
    },
    {
        src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="300" height="300" fill="%234F86C6"/><text x="50%25" y="54%25" dominant-baseline="middle" text-anchor="middle" font-size="120" font-family="serif">🔬</text></svg>',
        alt: 'Scientist',
    },
    {
        src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="300" height="300" fill="%23E5E1EE"/><text x="50%25" y="54%25" dominant-baseline="middle" text-anchor="middle" font-size="120" font-family="serif">🎸</text></svg>',
        alt: 'Musician',
    },
    {
        src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="300" height="300" fill="%23D5F5E3"/><text x="50%25" y="54%25" dominant-baseline="middle" text-anchor="middle" font-size="120" font-family="serif">🌿</text></svg>',
        alt: 'Outdoors',
    },
];

// Duration (ms) of the cross-fade CSS transition
const FADE_MS = 600;

/**
 * A rounded/circular picture frame that periodically cycles through a preset
 * catalogue of images using a smooth cross-fade transition.
 *
 * Props
 * ─────
 * images   – array of { src, alt } objects   (default: DEFAULT_IMAGES)
 * interval – ms between swaps               (default: 3000)
 * size     – CSS size string for the frame   (default: '180px')
 */
export default function RoundedPictureFrame({
    images = DEFAULT_IMAGES,
    interval = 3000,
    size = '180px',
}) {
    const catalogue = images.length > 0 ? images : DEFAULT_IMAGES;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [visible, setVisible] = useState(true);
    const intervalRef = useRef(null);
    const fadeOutRef = useRef(null);

    useEffect(() => {
        if (catalogue.length <= 1) return;

        intervalRef.current = setInterval(() => {
            // Fade the current image out
            setVisible(false);

            // After the fade-out completes, advance to the next image and fade back in
            fadeOutRef.current = setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % catalogue.length);
                setVisible(true);
            }, FADE_MS);
        }, interval);

        return () => {
            clearInterval(intervalRef.current);
            clearTimeout(fadeOutRef.current);
        };
    }, [interval, catalogue.length]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div
            className="rounded-picture-frame"
            style={{ width: size, height: size }}
        >
            <img
                src={catalogue[currentIndex].src}
                alt={catalogue[currentIndex].alt}
                className="rpf-img"
                style={{ opacity: visible ? 1 : 0 }}
            />

            {/* Decorative inner ring */}
            <div className="rpf-ring" />
        </div>
    );
}

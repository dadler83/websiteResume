import { useState, useEffect, useRef } from 'react';
import './RoundedPictureFrame.css';
import img1 from '../assets/self-img/2026-MardiGras-DSLR-0725.jpg';
import img2 from '../assets/self-img/2026-MardiGras-DSLR-0726.jpg';
import img3 from '../assets/self-img/2026-MardiGras-DSLR-1295.jpg';
import img4 from '../assets/self-img/IMG_7293.jpeg';
import {preload} from "react-dom";

const DEFAULT_IMAGES = [
    { src: img1, alt: 'Photo 1' },
    { src: img2, alt: 'Photo 2' },
    { src: img3, alt: 'Photo 3' },
    { src: img4, alt: 'Photo 4' },
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
    interval = 8000,
    size = '180px',
}) {
    const catalogue = images.length > 0 ? images : DEFAULT_IMAGES;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [visible, setVisible] = useState(true);
    const intervalRef = useRef(null);

    // for (const img of catalogue) {
    //     preload(img.src, { as: 'image' });
    // }

    useEffect(() => {
        if (catalogue.length <= 1) return;

        intervalRef.current = setInterval(async () => {
            // Fade the current image out
            setVisible(false);
            await new Promise((resolve) => setTimeout(resolve, FADE_MS));
            // After the fade-out completes, advance to the next image and fade back in
            // todo: fix picture frame jumping
            setCurrentIndex((prev) => (prev + 1) % catalogue.length);
            await new Promise((resolve) => setTimeout(resolve, FADE_MS));
            setVisible(true);
        }, interval);

        return () => {
            clearInterval(intervalRef.current);
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

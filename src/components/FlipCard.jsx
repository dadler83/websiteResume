// src/components/FlipCard.jsx
import React, { useState } from 'react';
import './FlipCard.css';

const FlipCard = ({ frontContent, backContent, children }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className={`flip-card ${isFlipped ? 'flipped' : ''}`}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            {/* Sparkle indicator – top-left corner */}
            <svg
                className="flip-card-sparkle"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" />
            </svg>

            {/* Pointer indicator – bottom-right corner */}
            <svg
                className="flip-card-pointer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path d="M4 2 L4 17 L8 13 L11 20 L13.5 19 L10.5 12 L15.5 12 Z" />
            </svg>

            <div className="flip-card-inner">
                <div className="flip-card-front">
                    {frontContent || children}
                </div>
                <div className="flip-card-back">
                    {backContent}
                </div>
            </div>
        </div>
    );
};

export default FlipCard;
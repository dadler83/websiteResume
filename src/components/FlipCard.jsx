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
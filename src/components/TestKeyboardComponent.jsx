import { useState, useEffect } from 'react';

function TestKeyboardComponent() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [lastKey, setLastKey] = useState('');

    useEffect(() => {
        const handleKeyDown = (event) => {
            console.log(event.key)
            setLastKey(event.key);

            // Move position based on arrow keys
            setPosition(prev => {
                const step = 10;
                switch(event.key) {
                    case 'w':
                        return { ...prev, y: prev.y - step };
                    case 's':
                        return { ...prev, y: prev.y + step };
                    case 'a':
                        return { ...prev, x: prev.x - step };
                    case 'd':
                        return { ...prev, x: prev.x + step };
                    case 'r':
                        // Reset position
                        return { x: 0, y: 0 };
                    default:
                        return prev;
                }
            });
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Use Arrow Keys to Move</h1>
            <p>Last key pressed: <strong>{lastKey}</strong></p>
            <p>Press 'r' to reset</p>

            <div
                style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'blue',
                    position: 'relative',
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    transition: 'transform 0.1s'
                }}
            />
        </div>
    );
}

export default TestKeyboardComponent;
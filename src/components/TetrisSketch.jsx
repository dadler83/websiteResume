import {useEffect, useRef, useState} from 'react'
import p5 from 'p5'
import { tetrisSketch } from '../tetris.js'

export default function TetrisSketch() {
    const containerRef = useRef(null)
    const [instance, instanceSetter] = useState(null);

    useEffect(() => {
        if (!containerRef.current) return;

        if (instance !== null) return;
        const canvas = new p5(tetrisSketch, containerRef.current);
        instanceSetter(canvas);

        return () => {
            canvas.remove();
        }
    }, [instance, instanceSetter])

    return <div ref={containerRef} className="tetris-sketch-container" />
}

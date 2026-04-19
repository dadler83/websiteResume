import {useEffect, useRef} from 'react'
import p5 from 'p5'
import { tetrisSketch } from './tetris.js'

export default function TetrisSketch() {
    const containerRef = useRef(null)

    useEffect(() => {
        if (!containerRef.current) return;

        // note: only thing that seems to prevevnt canvas rendering issues is turning off react strict mode
        const canvas = new p5(tetrisSketch, containerRef.current);

        return () => {
            canvas.remove();
        }
    }, [])

    return <div
        ref={containerRef}
        className="tetris-sketch-container"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
    />
}

import {useEffect, useRef} from 'react'
import p5 from 'p5'
import { tetrisSketch } from './tetris.js'

export default function TetrisSketch() {
    const containerRef = useRef(null)
    const instanceRef = useRef(null)

    useEffect(() => {
        if (!containerRef.current || instanceRef.current) return;

        instanceRef.current = new p5(tetrisSketch, containerRef.current);

        return () => {
            instanceRef.current.remove();
            instanceRef.current = null;
        }
    }, [])

    return <div ref={containerRef} className="tetris-sketch-container" />
}

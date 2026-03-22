import { useEffect, useRef } from 'react'
import p5 from 'p5'
import { tetrisSketch } from '../tetris.js'

export default function TetrisSketch() {
    const containerRef = useRef(null)

    useEffect(() => {
        if (!containerRef.current) return

        const instance = new p5(tetrisSketch, containerRef.current)

        return () => {
            instance.remove()
        }
    }, [])

    return <div ref={containerRef} className="tetris-sketch-container" />
}

import {useEffect, useRef} from 'react'
import p5 from 'p5'
import { createTetrisSketch, DEFAULT_TETRIS_WIDTH } from './tetris.js'

export default function TetrisSketch() {
    const containerRef = useRef(null)
    const p5InstanceRef = useRef(null)
    const currentWidthRef = useRef(null)
    const debounceTimerRef = useRef(null)

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;

        function startSketch(width) {
            if (p5InstanceRef.current) {
                p5InstanceRef.current.remove();
                p5InstanceRef.current = null;
            }
            p5InstanceRef.current = new p5(createTetrisSketch(width), container);
            currentWidthRef.current = width;
        }

        // Do NOT read container.offsetWidth here — layout hasn't completed yet
        // and it returns 0 or an incorrect value. Let ResizeObserver provide
        // the real width after the browser's first layout pass.
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const newWidth = Math.floor(entry.contentRect.width);
                if (newWidth > 0 && newWidth !== currentWidthRef.current) {
                    if (currentWidthRef.current === null) {
                        // Initial observation — start immediately, no debounce
                        startSketch(newWidth);
                    } else {
                        // Subsequent resize — debounce to avoid thrashing
                        clearTimeout(debounceTimerRef.current);
                        debounceTimerRef.current = setTimeout(() => {
                            startSketch(newWidth);
                        }, 150);
                    }
                }
            }
        });

        observer.observe(container);

        return () => {
            clearTimeout(debounceTimerRef.current);
            observer.disconnect();
            if (p5InstanceRef.current) {
                p5InstanceRef.current.remove();
                p5InstanceRef.current = null;
            }
        }
    }, [])

    return <div
        ref={containerRef}
        className="tetris-sketch-container"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
    />
}

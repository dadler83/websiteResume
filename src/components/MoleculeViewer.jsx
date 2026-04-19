import { useEffect, useRef } from 'react'
import * as $3Dmol from '3dmol'
import './MoleculeViewer.css'

export default function MoleculeViewer({
    data,
    format = 'pdb',
    viewStyle = { stick: {} },
    width = 150,
    height = 150,
}) {
    const containerRef = useRef(null)
    const viewerRef = useRef(null)

    useEffect(() => {
        if (!containerRef.current || viewerRef.current || !data) return

        const viewer = $3Dmol.createViewer(containerRef.current, {
            backgroundColor: 'transparent',
        })

        viewer.addModel(data, format)
        viewer.setStyle({}, viewStyle)
        viewer.zoomTo()
        viewer.spin(true)
        viewer.render()

        viewerRef.current = viewer

        return () => {
            if (viewerRef.current) {
                viewerRef.current.clear()
                viewerRef.current = null
            }
        }
    }, [data, format, viewStyle])

    return (
        <div
            ref={containerRef}
            className="molecule-viewer"
            style={{ width, height }}
        />
    )
}

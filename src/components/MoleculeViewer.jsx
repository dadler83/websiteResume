import { useEffect, useRef } from 'react'
import * as $3Dmol from '3dmol'
import cifData from '../assets/1ud2.cif?raw'
import './MoleculeViewer.css'

export default function MoleculeViewer({ width = 150, height = 150 }) {
    const containerRef = useRef(null)
    const viewerRef = useRef(null)

    useEffect(() => {
        if (!containerRef.current || viewerRef.current) return

        const viewer = $3Dmol.createViewer(containerRef.current, {
            backgroundColor: 'transparent',
        })

        viewer.addModel(cifData, 'cif')
        viewer.setStyle({}, { cartoon: { color: 'spectrum' } })
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
    }, [])

    return (
        <div
            ref={containerRef}
            className="molecule-viewer"
            style={{ width, height }}
        />
    )
}

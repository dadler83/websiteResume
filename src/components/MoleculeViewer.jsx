import { useEffect, useRef } from 'react'
import * as $3Dmol from '3dmol'
import './MoleculeViewer.css'
import iconLink from "../assets/cv-icons/link.svg";

export default function MoleculeViewer({
    data,
    format = 'pdb',
    viewStyle = { stick: {} },
    backgroundColor = '#000',
    width = 150,
    height = 150,
    name = '',
    link = '',
}) {
    const containerRef = useRef(null)
    const viewerRef = useRef(null)

    useEffect(() => {
        if (!containerRef.current || viewerRef.current || !data) return;

        const viewer = $3Dmol.createViewer(containerRef.current, {
            backgroundColor: backgroundColor,
        })

        viewer.addModel(data, format)
        viewer.setStyle({}, viewStyle)
        viewer.zoomTo()
        viewer.spin(true)
        viewer.render()

        viewerRef.current = viewer

        return () => {
            viewer.scene = null;
            if (viewerRef.current) {
                viewerRef.current.scene = null;
                viewerRef.current = null;
            }
        }
    }, [data, format, viewStyle])

    return (
        <div className="molecule-viewer-wrapper" style={{ width, height }}>
            <div
                ref={containerRef}
                className="molecule-viewer"
                style={{ width, height }}
            />
            {name && (
                link ? (
                    <div
                        className="molecule-viewer-name molecule-viewer-name--link"
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                            e.stopPropagation()
                            window.open(link, '_blank', 'noopener,noreferrer')
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.stopPropagation()
                                window.open(link, '_blank', 'noopener,noreferrer')
                            }
                        }}
                    >
                        {name}
                        <img src={iconLink} alt="" className="molecule-viewer-inline-icon" />
                    </div>
                ) : (
                    <span className="molecule-viewer-name">{name}</span>
                )
            )}
        </div>
    )
}

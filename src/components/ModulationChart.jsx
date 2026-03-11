import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import "./ModulationChart.css";

/**
 * ModulationChart
 * - Plots:
 *   1) message signal m(t)
 *   2) carrier c(t)
 *   3) AM modulated output y(t) = (1 + k*m(t)) * c(t)
 * - Sliders parameterize both signal and carrier.
 *
 * Notes:
 * - m(t) is normalized to [-1, 1] via amplitude slider (0..1).
 * - Carrier amplitude is fixed at 1 for clarity; you can add a slider if desired.
 */
export default function ModulationChart() {
    const svgRef = useRef(null);

    // Chart params
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };
    const innerWidth = 600 - margin.left - margin.right;
    const innerHeight = 360 - margin.top - margin.bottom;

    // Sampling
    const numPoints = 900;
    const tMin = 0;
    const tMax = 1; // seconds

    // Message (signal) params
    const [msgAmp, setMsgAmp] = useState(0.7); // 0..1
    const [msgFreq, setMsgFreq] = useState(3); // Hz
    const [msgPhase, setMsgPhase] = useState(0); // radians

    // Carrier params
    const [carFreq, setCarFreq] = useState(30); // Hz
    const [carPhase, setCarPhase] = useState(0); // radians

    // Modulation index
    const [modIndex, setModIndex] = useState(0.8); // 0..1.5

    const data = useMemo(() => {
        const dt = (tMax - tMin) / (numPoints - 1);

        const points = Array.from({ length: numPoints }, (_, i) => {
            const t = tMin + i * dt;

            // Message signal in [-msgAmp, msgAmp]
            const m = msgAmp * Math.sin(2 * Math.PI * msgFreq * t + msgPhase);

            // Carrier in [-1, 1]
            const c = Math.sin(2 * Math.PI * carFreq * t + carPhase);

            // AM (DSB-LC): y(t) = (1 + k*m(t)) * c(t)
            // If msgAmp*k > 1, envelope inversion can occur; allowed for exploration.
            const y = (1 + modIndex * m) * c;

            return { t, m, c, y };
        });

        return points;
    }, [msgAmp, msgFreq, msgPhase, carFreq, carPhase, modIndex]);

    useEffect(() => {
        const svgEl = svgRef.current;
        if (!svgEl) return;

        // Clear
        const root = d3.select(svgEl);
        root.selectAll("*").remove();

        // SVG + group
        const svg = root
            .attr("width", innerWidth + margin.left + margin.right)
            .attr("height", innerHeight + margin.top + margin.bottom);

        const g = svg
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Scales
        const xScale = d3.scaleLinear().domain([tMin, tMax]).range([0, innerWidth]);

        // y domain based on computed data (with padding)
        const yExtent = d3.extent(data.flatMap((d) => [d.m, d.c, d.y]));
        const yPad = 0.2;
        const yMin = (yExtent[0] ?? -1) - yPad;
        const yMax = (yExtent[1] ?? 1) + yPad;

        const yScale = d3.scaleLinear().domain([yMin, yMax]).range([innerHeight, 0]);

        // Axes
        g.append("g")
            .attr("class", "mc-axis mc-axis-x")
            .attr("transform", `translate(0,${innerHeight})`)
            .call(d3.axisBottom(xScale).ticks(10));

        g.append("g")
            .attr("class", "mc-axis mc-axis-y")
            .call(d3.axisLeft(yScale).ticks(7));

        // Labels
        g.append("text")
            .attr("class", "mc-axis-label mc-axis-label-x")
            .attr("x", innerWidth / 2)
            .attr("y", innerHeight + 34)
            .attr("text-anchor", "middle")
            .text("Time (s)");

        g.append("text")
            .attr("class", "mc-axis-label mc-axis-label-y")
            .attr("transform", "rotate(-90)")
            .attr("x", -innerHeight / 2)
            .attr("y", -38)
            .attr("text-anchor", "middle")
            .text("Amplitude");

        // Grid
        g.append("g")
            .attr("class", "mc-grid")
            .call(
                d3
                    .axisLeft(yScale)
                    .ticks(7)
                    .tickSize(-innerWidth)
                    .tickFormat("")
            );

        // Line generators
        const lineM = d3
            .line()
            .x((d) => xScale(d.t))
            .y((d) => yScale(d.m));

        const lineC = d3
            .line()
            .x((d) => xScale(d.t))
            .y((d) => yScale(d.c));

        const lineY = d3
            .line()
            .x((d) => xScale(d.t))
            .y((d) => yScale(d.y));

        // Draw lines
        g.append("path")
            .datum(data)
            .attr("class", "mc-line mc-line-message")
            .attr("d", lineM);

        g.append("path")
            .datum(data)
            .attr("class", "mc-line mc-line-carrier")
            .attr("d", lineC);

        g.append("path")
            .datum(data)
            .attr("class", "mc-line mc-line-modulated")
            .attr("d", lineY);

        // Legend
        const legend = g.append("g").attr("class", "mc-legend").attr("transform", `translate(0,0)`);

        const legendItems = [
            { label: "Signal m(t)", className: "mc-legend-swatch mc-swatch-message" },
            { label: "Carrier c(t)", className: "mc-legend-swatch mc-swatch-carrier" },
            { label: "Modulated y(t)", className: "mc-legend-swatch mc-swatch-modulated" },
        ];

        legendItems.forEach((item, i) => {
            const row = legend.append("g").attr("class", "mc-legend-row").attr("transform", `translate(0,${i * 18})`);

            row.append("line").attr("class", item.className).attr("x1", 0).attr("x2", 22).attr("y1", 8).attr("y2", 8);

            row.append("text").attr("class", "mc-legend-text").attr("x", 28).attr("y", 12).text(item.label);
        });
    }, [data]);

    const stop = (e) => e.stopPropagation();

    return (
        <div className="mc-container">
            <h3 className="mc-title">Signal + Carrier + AM Modulation</h3>

            <svg ref={svgRef} />

            <div className="mc-controls">
                <div className="mc-section">
                    <div className="mc-section-title">Signal (message)</div>

                    <div className="mc-slider-row">
                        <label htmlFor="msgAmp">Amplitude</label>
                        <input
                            id="msgAmp"
                            className="mc-slider"
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={msgAmp}
                            onChange={(e) => setMsgAmp(Number(e.target.value))}
                            onPointerDown={stop}
                            onPointerUp={stop}
                            onClick={stop}
                        />
                        <div className="mc-slider-value">{msgAmp.toFixed(2)}</div>
                    </div>

                    <div className="mc-slider-row">
                        <label htmlFor="msgFreq">Frequency (Hz)</label>
                        <input
                            id="msgFreq"
                            className="mc-slider"
                            type="range"
                            min="0.5"
                            max="10"
                            step="0.1"
                            value={msgFreq}
                            onChange={(e) => setMsgFreq(Number(e.target.value))}
                            onPointerDown={stop}
                            onPointerUp={stop}
                            onClick={stop}
                        />
                        <div className="mc-slider-value">{msgFreq.toFixed(1)}</div>
                    </div>

                    <div className="mc-slider-row">
                        <label htmlFor="msgPhase">Phase (rad)</label>
                        <input
                            id="msgPhase"
                            className="mc-slider"
                            type="range"
                            min={(-Math.PI).toString()}
                            max={Math.PI.toString()}
                            step="0.01"
                            value={msgPhase}
                            onChange={(e) => setMsgPhase(Number(e.target.value))}
                            onPointerDown={stop}
                            onPointerUp={stop}
                            onClick={stop}
                        />
                        <div className="mc-slider-value">{msgPhase.toFixed(2)}</div>
                    </div>
                </div>

                <div className="mc-section">
                    <div className="mc-section-title">Carrier</div>

                    <div className="mc-slider-row">
                        <label htmlFor="carFreq">Frequency (Hz)</label>
                        <input
                            id="carFreq"
                            className="mc-slider"
                            type="range"
                            min="5"
                            max="100"
                            step="1"
                            value={carFreq}
                            onChange={(e) => setCarFreq(Number(e.target.value))}
                            onPointerDown={stop}
                            onPointerUp={stop}
                            onClick={stop}
                        />
                        <div className="mc-slider-value">{carFreq.toFixed(0)}</div>
                    </div>

                    <div className="mc-slider-row">
                        <label htmlFor="carPhase">Phase (rad)</label>
                        <input
                            id="carPhase"
                            className="mc-slider"
                            type="range"
                            min={(-Math.PI).toString()}
                            max={Math.PI.toString()}
                            step="0.01"
                            value={carPhase}
                            onChange={(e) => setCarPhase(Number(e.target.value))}
                            onPointerDown={stop}
                            onPointerUp={stop}
                            onClick={stop}
                        />
                        <div className="mc-slider-value">{carPhase.toFixed(2)}</div>
                    </div>
                </div>

                <div className="mc-section">
                    <div className="mc-section-title">Modulation</div>

                    <div className="mc-slider-row">
                        <label htmlFor="modIndex">Modulation index k</label>
                        <input
                            id="modIndex"
                            className="mc-slider"
                            type="range"
                            min="0"
                            max="1.5"
                            step="0.01"
                            value={modIndex}
                            onChange={(e) => setModIndex(Number(e.target.value))}
                            onPointerDown={stop}
                            onPointerUp={stop}
                            onClick={stop}
                        />
                        <div className="mc-slider-value">{modIndex.toFixed(2)}</div>
                    </div>

                    <div className="mc-equation">y(t) = (1 + k·m(t)) · c(t)</div>
                </div>
            </div>
        </div>
    );
}
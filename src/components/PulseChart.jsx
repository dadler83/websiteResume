import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './PulseChart.css';

export default function PulseChart() {
    const svgRef = useRef();
    const cycleLen = 51;
    const numPoints = 200;
    const indexPtr = useRef(0);

    /**
     * TODO: generate voltages for default pwm val, instead of filler 0s
     * @returns {{time: *, voltage: number}[]}
     */
    const generateVoltages = () => {
        const voltages =
            Array.from({ length: 200 }, (_, index) => {
                return { time: index, voltage: 0 };
            });


        return voltages;
    }

    const voltageAtPoint = (seqPtr, analog=200) => {
        const percentOn = analog / 255;
        let numPointsOn = Math.round(percentOn * cycleLen);

        if (seqPtr >= 0 && seqPtr < numPointsOn) {
            return 5;
        } else {
            return 0;
        }
    };

    const [pulseData, setPulseData] = useState(generateVoltages());

    // Update data after timeout
    useEffect(() => {
        const interval = setInterval(() => {
            setPulseData(prevData => {
                if (prevData.length === 0) return prevData;

                // Remove the first point
                let newData = prevData.slice(1);

                // Get the last point's values
                const lastPoint = newData[newData.length - 1];
                const lastTime = lastPoint.time;

                indexPtr.current = (indexPtr.current + 1) % cycleLen;
                const lastVoltage = voltageAtPoint(indexPtr.current - 1);
                const newVoltage = voltageAtPoint(indexPtr.current);

                // Generate a new point at the end
                // Randomly decide if we should toggle voltage or stay the same
                const shouldToggle = lastVoltage !== newVoltage;
                const timeIncrement = 1; // Random time between 1-3 units

                // DEBUG
                // if (shouldToggle) {
                //     console.log(`toggle from ${lastVoltage} to ${newVoltage} at ${indexPtr.current}/${cycleLen}`);
                // }

                // Add transition points for hard pulse
                if (shouldToggle) {
                    newData.push(
                        { time: lastTime + timeIncrement, voltage: lastVoltage },
                        { time: lastTime + timeIncrement, voltage: newVoltage }
                    );
                    newData = newData.slice(1);
                } else {
                    newData.push(
                        { time: lastTime + timeIncrement, voltage: lastVoltage }
                    );
                }

                // Normalize time values to keep them within reasonable range
                const minTime = newData[0].time;
                newData = newData.map(d => ({
                    time: d.time - minTime,
                    voltage: d.voltage
                }));
                return newData;
            });
        }, 10);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (pulseData.length === 0) return;

        // Set up dimensions
        const margin = { top: 20, right: 30, bottom: 40, left: 50 };
        const width = 800 - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;

        // Clear previous SVG content
        d3.select(svgRef.current).selectAll("*").remove();

        // Create SVG
        const svg = d3.select(svgRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Create scales
        const xScale = d3.scaleLinear()
            .domain([d3.min(pulseData, d => d.time), numPoints])
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain([-0.5, 5.5])
            .range([height, 0]);

        // Create line generator with step interpolation for hard pulses
        const line = d3.line()
            .x(d => xScale(d.time))
            .y(d => yScale(d.voltage))
            .curve(d3.curveStepAfter);

        // Add X axis
        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(xScale).ticks(10))
            .append('text')
            .attr('x', width / 2)
            .attr('y', 35)
            .attr('fill', '#1B3720')
            .attr('font-size', '12px')
            .attr('font-weight', 'bold')
            .text('Time (ms)');

        // Add Y axis
        svg.append('g')
            .call(d3.axisLeft(yScale).tickValues([0, 5]))
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', -height / 2)
            .attr('y', -35)
            .attr('fill', '#1B3720')
            .attr('font-size', '12px')
            .attr('font-weight', 'bold')
            .attr('text-anchor', 'middle')
            .text('Voltage (V)');

        // Add grid lines
        svg.append('g')
            .attr('class', 'grid')
            .attr('opacity', 0.1)
            .call(d3.axisLeft(yScale)
                .tickValues([0, 5])
                .tickSize(-width)
                .tickFormat('')
            );

        // Add horizontal reference lines at 0V and 5V
        svg.append('line')
            .attr('x1', 0)
            .attr('x2', width)
            .attr('y1', yScale(0))
            .attr('y2', yScale(0))
            .attr('stroke', '#94A684')
            .attr('stroke-width', 1)
            .attr('stroke-dasharray', '5,5')
            .attr('opacity', 0.5);

        svg.append('line')
            .attr('x1', 0)
            .attr('x2', width)
            .attr('y1', yScale(5))
            .attr('y2', yScale(5))
            .attr('stroke', '#94A684')
            .attr('stroke-width', 1)
            .attr('stroke-dasharray', '5,5')
            .attr('opacity', 0.5);

        // Add the line path with smooth transition
        const path = svg.append('path')
            .datum(pulseData)
            .attr('fill', 'none')
            .attr('stroke', '#1B3720')
            .attr('stroke-width', 2.5)
            .attr('d', line);

        // Add smooth transition effect
        path
            .transition()
            .duration(500)
            .ease(d3.easeLinear);

    }, [pulseData]); // Re-render when data changes

    return (
        <div className="pulse-chart-container">
            <h3>Digital Pulse Signal (Live)</h3>
            <svg ref={svgRef}></svg>
        </div>
    );
}
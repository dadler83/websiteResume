import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './PulseChart.css';

export default function PulseChart() {
    const svgRef = useRef();
    const cycleLen = 51;
    const numPoints = 200;
    const indexPtr = useRef(0);

    // Committed (applied) value used by voltageAtPoint
    const [analogValue, setAnalogValue] = useState(200);
    // Draft value while the user is dragging the slider
    const [analogDraftValue, setAnalogDraftValue] = useState(200);

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

    const voltageAtPoint = (seqPtr, analog = 200) => {

        const percentOn = analog / 255;
        let numPointsOn = Math.round(percentOn * cycleLen);

        if ((seqPtr >= 0 && seqPtr < numPointsOn) || percentOn === 1) {
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

                // Use committed (applied) analog value here
                const lastVoltage = voltageAtPoint(indexPtr.current - 1, analogValue);
                const newVoltage = voltageAtPoint(indexPtr.current, analogValue);

                // Generate a new point at the end
                const shouldToggle = lastVoltage !== newVoltage;
                const timeIncrement = 1;

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
        }, 30);

        return () => clearInterval(interval);
    }, [analogValue]); // only changes when user "commits" a new slider value

    useEffect(() => {
        if (pulseData.length === 0) return;

        // Set up dimensions
        const margin = { top: 20, right: 30, bottom: 40, left: 50 };
        const width = 600 - margin.left - margin.right;
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

        // PWM average voltage (duty-cycle * 5V)
        const pwmAvgVoltage = (analogValue / 255) * 5;

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

        // --- PWM average indicator line (red dashed) ---
        svg.append('line')
            .attr('class', 'pwm-avg-line')
            .attr('x1', 0)
            .attr('x2', width)
            .attr('y1', yScale(pwmAvgVoltage))
            .attr('y2', yScale(pwmAvgVoltage))
            .attr('stroke', '#D7263D')
            .attr('stroke-width', 2)
            .attr('stroke-dasharray', '6,6')
            .attr('opacity', 0.9);

        svg.append('text')
            .attr('class', 'pwm-avg-label')
            .attr('x', width - 4)
            .attr('y', yScale(pwmAvgVoltage) - 6)
            .attr('fill', '#D7263D')
            .attr('font-size', '12px')
            .attr('font-weight', 'bold')
            .attr('text-anchor', 'end')
            .text('pwm');

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

    }, [pulseData]);

    // Animate the PWM average line ONLY when analogValue changes.
    useEffect(() => {
        const margin = { top: 20, right: 30, bottom: 40, left: 50 };
        const height = 300 - margin.top - margin.bottom;

        const yScale = d3.scaleLinear()
            .domain([-0.5, 5.5])
            .range([height, 0]);

        const pwmAvgVoltage = (analogValue / 255) * 5;

        const svg = d3.select(svgRef.current).select('g');

        svg.select('.pwm-avg-line')
            .interrupt()
            .transition()
            .duration(10000)
            .ease(d3.easeCubicInOut)
            .attr('y1', yScale(pwmAvgVoltage))
            .attr('y2', yScale(pwmAvgVoltage));

        svg.select('.pwm-avg-label')
            .transition()
            .duration(10000)
            .ease(d3.easeCubicOut)
            .attr('y', yScale(pwmAvgVoltage) - 6);

    }, [analogValue]);

    const commitAnalogDraftValue = () => {
        setAnalogValue(analogDraftValue);
    };

    return (
        <div className="pulse-chart-container">
            <h4>Digital Pulse Signal (Live)</h4>
            <svg ref={svgRef}></svg>

            {/* Slider controlling the analog (PWM) value */}
            <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', }}>
                <label
                    htmlFor="analog-slider"
                    style={{ display: 'flex', width: '80px', alignItems: 'center', gap: '8px', marginBottom: '6px' }}
                >
                    <span>PWM:</span>
                    <strong>{analogDraftValue}</strong>
                </label>

                <input
                    id="analog-slider"
                    type="range"
                    min="0"
                    max="255"
                    step="1"
                    value={analogDraftValue}
                    onChange={(e) => setAnalogDraftValue(Number(e.target.value))}
                    onMouseUp={commitAnalogDraftValue}
                    onTouchEnd={commitAnalogDraftValue}
                    onKeyUp={(e) => {
                        // commit when user finishes keyboard adjustments (arrows/page up/down/home/end)
                        const commitKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown'];
                        if (commitKeys.includes(e.key)) commitAnalogDraftValue();
                    }}
                    onClick={(e) => e.stopPropagation()}
                    onPointerDown={(e) => e.stopPropagation()}
                    style={{ width: '500px', maxWidth: '60%' }}
                />
            </div>
        </div>
    );
}
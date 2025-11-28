import React, { useRef, useEffect, useState } from 'react';
import { cn } from '../../utils/cn';

interface Point {
    value: number;
    label?: string;
    color?: string;
    draggable?: boolean;
}

interface Interval {
    start: number;
    end: number;
    color?: string;
    startOpen?: boolean;
    endOpen?: boolean;
}

interface NumberLineProps {
    min?: number;
    max?: number;
    points?: Point[];
    intervals?: Interval[];
    onChange?: (points: Point[]) => void;
    className?: string;
    width?: number;
    height?: number;
}

export const NumberLine: React.FC<NumberLineProps> = ({
    min = -10,
    max = 10,
    points = [],
    intervals = [],
    onChange,
    className,
    width = 600,
    height = 100
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [draggingPointIndex, setDraggingPointIndex] = useState<number | null>(null);
    const [localPoints, setLocalPoints] = useState<Point[]>(points);

    useEffect(() => {
        setLocalPoints(points);
    }, [points]);

    const padding = 40;
    const effectiveWidth = width - padding * 2;
    const range = max - min;

    const valueToX = (value: number) => {
        return padding + ((value - min) / range) * effectiveWidth;
    };

    const xToValue = (x: number) => {
        const value = min + ((x - padding) / effectiveWidth) * range;
        return Math.max(min, Math.min(max, Math.round(value * 10) / 10)); // Snap to 0.1
    };

    const handleMouseDown = (index: number) => {
        if (localPoints[index].draggable) {
            setDraggingPointIndex(index);
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (draggingPointIndex !== null && svgRef.current) {
            const rect = svgRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const newValue = xToValue(x);

            const newPoints = [...localPoints];
            newPoints[draggingPointIndex] = { ...newPoints[draggingPointIndex], value: newValue };
            setLocalPoints(newPoints);
            onChange?.(newPoints);
        }
    };

    const handleMouseUp = () => {
        setDraggingPointIndex(null);
    };

    // Generate ticks
    const ticks = [];
    for (let i = Math.ceil(min); i <= Math.floor(max); i++) {
        ticks.push(i);
    }

    return (
        <div className={cn("overflow-x-auto", className)}>
            <svg
                ref={svgRef}
                width={width}
                height={height}
                className="select-none"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                {/* Main Line */}
                <line
                    x1={padding}
                    y1={height / 2}
                    x2={width - padding}
                    y2={height / 2}
                    stroke="#374151"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                    markerStart="url(#arrowhead-start)"
                />

                {/* Arrow Markers */}
                <defs>
                    <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                    >
                        <polygon points="0 0, 10 3.5, 0 7" fill="#374151" />
                    </marker>
                    <marker
                        id="arrowhead-start"
                        markerWidth="10"
                        markerHeight="7"
                        refX="1"
                        refY="3.5"
                        orient="auto-start-reverse"
                    >
                        <polygon points="0 0, 10 3.5, 0 7" fill="#374151" />
                    </marker>
                </defs>

                {/* Ticks */}
                {ticks.map((tick) => (
                    <g key={tick} transform={`translate(${valueToX(tick)}, ${height / 2})`}>
                        <line y1="-5" y2="5" stroke="#374151" strokeWidth="1" />
                        <text
                            y="20"
                            textAnchor="middle"
                            className="text-xs fill-gray-500"
                            style={{ fontSize: '12px' }}
                        >
                            {tick}
                        </text>
                    </g>
                ))}

                {/* Intervals */}
                {intervals.map((interval, i) => {
                    const x1 = valueToX(Math.max(min, interval.start));
                    const x2 = valueToX(Math.min(max, interval.end));
                    const color = interval.color || '#3B82F6';

                    return (
                        <g key={i}>
                            <line
                                x1={x1}
                                y1={height / 2}
                                x2={x2}
                                y2={height / 2}
                                stroke={color}
                                strokeWidth="4"
                                opacity="0.5"
                            />
                            {/* Endpoints */}
                            <circle
                                cx={x1}
                                cy={height / 2}
                                r={4}
                                fill={interval.startOpen ? 'white' : color}
                                stroke={color}
                                strokeWidth="2"
                            />
                            <circle
                                cx={x2}
                                cy={height / 2}
                                r={4}
                                fill={interval.endOpen ? 'white' : color}
                                stroke={color}
                                strokeWidth="2"
                            />
                        </g>
                    );
                })}

                {/* Points */}
                {localPoints.map((point, i) => (
                    <g
                        key={i}
                        transform={`translate(${valueToX(point.value)}, ${height / 2})`}
                        onMouseDown={() => handleMouseDown(i)}
                        style={{ cursor: point.draggable ? 'grab' : 'default' }}
                    >
                        <circle
                            r={6}
                            fill={point.color || '#EF4444'}
                            stroke="white"
                            strokeWidth="2"
                            className="drop-shadow-sm"
                        />
                        {point.label && (
                            <text
                                y="-15"
                                textAnchor="middle"
                                className="text-xs font-bold fill-gray-700"
                            >
                                {point.label}
                            </text>
                        )}
                    </g>
                ))}
            </svg>
        </div>
    );
};

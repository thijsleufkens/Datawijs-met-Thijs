"use client";

import { Group } from "@visx/group";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleLinear, scaleSqrt } from "@visx/scale";
import { Circle, Line } from "@visx/shape";
import { Text } from "@visx/text";
import type { Project } from "@/data/projecten";

type Props = {
  projecten: Project[];
  hoveredId: string | null;
  selectedId: string | null;
  onHover: (id: string | null) => void;
  onSelect: (id: string | null) => void;
};

const width = 720;
const height = 480;
const margin = { top: 24, right: 32, bottom: 56, left: 72 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const INK = "#1D0C0C";
const SLATE = "#727272";
const INK_300 = "#B8B0AC";
const AMBER = "#F2B969";
const AMBER_500 = "#C98634";
const POSITIVE = "#3F7D4E";
const NEGATIVE = "#A2382B";

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

export function KwadrantPlot({
  projecten,
  hoveredId,
  selectedId,
  onHover,
  onSelect,
}: Props) {
  const omzetValues = projecten.map((p) => p.omzet);
  const margeValues = projecten.map((p) => p.margePercent);
  const urenValues = projecten.map((p) => p.totaalUren);

  const xMax = Math.max(...omzetValues) * 1.1;
  const yMin = Math.min(0, Math.min(...margeValues) - 4);
  const yMax = Math.max(...margeValues) + 4;

  const xScale = scaleLinear<number>({
    domain: [0, xMax],
    range: [0, innerWidth],
    nice: true,
  });

  const yScale = scaleLinear<number>({
    domain: [yMin, yMax],
    range: [innerHeight, 0],
    nice: true,
  });

  const rScale = scaleSqrt<number>({
    domain: [0, Math.max(...urenValues)],
    range: [5, 22],
  });

  const xMedian = median(omzetValues);
  const yMedian = median(margeValues);

  const activeId = hoveredId ?? selectedId;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      role="img"
      aria-label="Scatterplot: omzet versus marge per project"
      onClick={() => onSelect(null)}
      style={{ background: "#FFFFFF", borderRadius: 12 }}
    >
      <Group left={margin.left} top={margin.top}>
        {/* Kwadrant-tints, heel subtiel */}
        <rect
          x={xScale(xMedian)}
          y={0}
          width={innerWidth - xScale(xMedian)}
          height={yScale(yMedian)}
          fill={POSITIVE}
          fillOpacity={0.04}
        />
        <rect
          x={0}
          y={yScale(yMedian)}
          width={xScale(xMedian)}
          height={innerHeight - yScale(yMedian)}
          fill={NEGATIVE}
          fillOpacity={0.04}
        />

        {/* Mediaan-lijnen */}
        <Line
          from={{ x: xScale(xMedian), y: 0 }}
          to={{ x: xScale(xMedian), y: innerHeight }}
          stroke={INK_300}
          strokeDasharray="4 4"
          strokeWidth={1}
        />
        <Line
          from={{ x: 0, y: yScale(yMedian) }}
          to={{ x: innerWidth, y: yScale(yMedian) }}
          stroke={INK_300}
          strokeDasharray="4 4"
          strokeWidth={1}
        />

        {/* Kwadrant-labels */}
        <Text
          x={innerWidth - 8}
          y={14}
          textAnchor="end"
          fill={SLATE}
          fontSize={11}
          fontWeight={500}
        >
          groot &amp; gezond
        </Text>
        <Text x={8} y={14} fill={SLATE} fontSize={11} fontWeight={500}>
          klein &amp; gezond
        </Text>
        <Text
          x={innerWidth - 8}
          y={innerHeight - 8}
          textAnchor="end"
          fill={SLATE}
          fontSize={11}
          fontWeight={500}
        >
          groot &amp; marge-arm
        </Text>
        <Text
          x={8}
          y={innerHeight - 8}
          fill={SLATE}
          fontSize={11}
          fontWeight={500}
        >
          klein &amp; marge-arm
        </Text>

        {/* Assen */}
        <AxisBottom
          top={innerHeight}
          scale={xScale}
          stroke={INK_300}
          tickStroke={INK_300}
          tickFormat={(d) => `€ ${(Number(d) / 1000).toFixed(0)}k`}
          tickLabelProps={() => ({
            fill: SLATE,
            fontSize: 11,
            textAnchor: "middle",
          })}
          label="Omzet per project"
          labelProps={{
            fill: INK,
            fontSize: 12,
            fontWeight: 500,
            textAnchor: "middle",
            y: 44,
          }}
        />
        <AxisLeft
          scale={yScale}
          stroke={INK_300}
          tickStroke={INK_300}
          tickFormat={(d) => `${d}%`}
          tickLabelProps={() => ({
            fill: SLATE,
            fontSize: 11,
            textAnchor: "end",
            dx: -4,
            dy: 3,
          })}
          label="Marge"
          labelProps={{
            fill: INK,
            fontSize: 12,
            fontWeight: 500,
            textAnchor: "middle",
            transform: "rotate(-90)",
            x: -innerHeight / 2,
            y: -52,
          }}
        />

        {/* Punten */}
        {projecten.map((p) => {
          const isActive = activeId === p.id;
          const isFaded = activeId !== null && !isActive;
          const isNegative = p.margePercent < 0;
          const baseFill = isNegative ? NEGATIVE : INK;
          return (
            <Circle
              key={p.id}
              cx={xScale(p.omzet)}
              cy={yScale(p.margePercent)}
              r={rScale(p.totaalUren)}
              fill={isActive ? AMBER : baseFill}
              fillOpacity={isFaded ? 0.12 : 0.5}
              stroke={isActive ? AMBER_500 : baseFill}
              strokeWidth={isActive ? 2 : 1}
              strokeOpacity={isFaded ? 0.2 : 0.8}
              style={{ cursor: "pointer", transition: "all 120ms ease" }}
              onMouseEnter={() => onHover(p.id)}
              onMouseLeave={() => onHover(null)}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(selectedId === p.id ? null : p.id);
              }}
            />
          );
        })}
      </Group>
    </svg>
  );
}

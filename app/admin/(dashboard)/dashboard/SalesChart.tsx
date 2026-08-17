"use client";

import { useMemo, useState } from "react";

type SalesData = {
  month: string;
  revenue: number;
};

type SalesChartProps = {
  data: SalesData[];
};

export default function SalesChart({ data }: SalesChartProps) {
  const [range, setRange] = useState<"6M" | "12M">("6M");

  const chartData = useMemo(() => {
    return range === "6M" ? data.slice(-6) : data;
  }, [data, range]);

  const maxRevenue = Math.max(...chartData.map((item) => item.revenue), 1);

  const width = 700;
  const height = 260;
  const paddingX = 35;
  const paddingY = 25;

  const points = chartData.map((item, index) => {
    const x =
      chartData.length === 1
        ? width / 2
        : paddingX + (index / (chartData.length - 1)) * (width - paddingX * 2);

    const y =
      height - paddingY - (item.revenue / maxRevenue) * (height - paddingY * 2);

    return {
      ...item,
      x,
      y,
    };
  });

  const linePath = points
    .map((point, index) =>
      index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`,
    )
    .join(" ");

  const areaPath =
    points.length > 0
      ? `${linePath} L ${points[points.length - 1].x} ${
          height - paddingY
        } L ${points[0].x} ${height - paddingY} Z`
      : "";

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Analytics
          </p>

          <h2 className="mt-1 text-xl font-semibold text-[var(--color-primary)]">
            Sales Overview
          </h2>

          <p className="mt-1 text-sm text-[var(--color-text-light)]">
            Revenue generated from completed orders
          </p>
        </div>

        <div className="flex rounded-lg border border-[var(--color-border)] p-1">
          <button
            type="button"
            onClick={() => setRange("6M")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
              range === "6M"
                ? "bg-[var(--color-primary)] text-white"
                : "text-[var(--color-text-light)] hover:text-[var(--color-primary)]"
            }`}
          >
            6M
          </button>

          <button
            type="button"
            onClick={() => setRange("12M")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
              range === "12M"
                ? "bg-[var(--color-primary)] text-white"
                : "text-[var(--color-text-light)] hover:text-[var(--color-primary)]"
            }`}
          >
            12M
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-8 overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-[280px] min-w-[650px] w-full"
          preserveAspectRatio="none"
        >
          {/* Horizontal grid */}
          {[0, 1, 2, 3, 4].map((line) => {
            const y = paddingY + (line / 4) * (height - paddingY * 2);

            return (
              <line
                key={line}
                x1={paddingX}
                x2={width - paddingX}
                y1={y}
                y2={y}
                stroke="currentColor"
                className="text-black/5"
              />
            );
          })}

          {/* Area */}
          {areaPath && (
            <path
              d={areaPath}
              fill="currentColor"
              className="text-[var(--color-accent)] opacity-10"
            />
          )}

          {/* Line */}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[var(--color-accent)]"
            />
          )}

          {/* Points */}
          {points.map((point) => (
            <g key={point.month}>
              <circle
                cx={point.x}
                cy={point.y}
                r="5"
                fill="currentColor"
                className="text-[var(--color-card)]"
              />

              <circle
                cx={point.x}
                cy={point.y}
                r="3"
                fill="currentColor"
                className="text-[var(--color-accent)]"
              />

              <text
                x={point.x}
                y={height - 3}
                textAnchor="middle"
                className="fill-black/40 text-[11px]"
              >
                {point.month}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

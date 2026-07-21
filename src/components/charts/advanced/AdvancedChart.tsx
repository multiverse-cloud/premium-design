"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/cn";

// Types
export interface ChartDataPoint {
  x: string | number | Date;
  y: number;
  meta?: Record<string, unknown>;
}

export interface ChartSeries {
  name: string;
  data: ChartDataPoint[];
  color?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ChartOptions = Record<string, any>;

// Dynamic imports for ApexCharts
const ReactApexChart = dynamic(() => import("react-apexcharts"), { 
  ssr: false,
  loading: () => <ChartSkeleton />
});

// Skeleton loader
function ChartSkeleton({ height = 300 }: { height?: number }) {
  return (
    <div 
      className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"
      style={{ height }}
    />
  );
}

// Line Chart
export interface LineChartProps {
  series: ChartSeries[];
  height?: number;
  title?: string;
  subtitle?: string;
  options?: Partial<ChartOptions>;
  loading?: boolean;
  className?: string;
}

export function LineChart({
  series,
  height = 300,
  title,
  subtitle,
  options = {},
  loading = false,
  className,
}: LineChartProps) {
  const defaultOptions: ChartOptions = {
    chart: {
      toolbar: { show: false },
      animations: { enabled: true, easing: "easeinout", speed: 800 },
      zoom: { enabled: false },
    },
    stroke: { curve: "smooth", width: 2 },
    markers: { size: 0, hover: { size: 5 } },
    xaxis: {
      labels: { rotate: 0, style: { fontSize: "12px" } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: { show: true, style: { fontSize: "12px" } },
    },
    grid: {
      borderColor: "#e5e7eb",
      strokeDashArray: 3,
      show: true,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    tooltip: { theme: "light" },
    legend: { show: true, position: "top", horizontalAlign: "right" },
    fill: { type: "solid" },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    chart: { ...defaultOptions.chart, ...options.chart },
    xaxis: { ...defaultOptions.xaxis, ...options.xaxis },
    yaxis: { ...defaultOptions.yaxis, ...options.yaxis },
    grid: { ...defaultOptions.grid, ...options.grid },
    tooltip: { ...defaultOptions.tooltip, ...options.tooltip },
    legend: { ...defaultOptions.legend, ...options.legend },
    stroke: { ...defaultOptions.stroke, ...options.stroke },
    markers: { ...defaultOptions.markers, ...options.markers },
    fill: { ...defaultOptions.fill, ...options.fill },
  };

  return (
    <div className={cn("bg-white dark:bg-gray-900 rounded-xl shadow-premium border border-gray-200 dark:border-gray-700 p-6", className)}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
        </div>
      )}
      {loading ? (
        <ChartSkeleton height={height} />
      ) : (
        <ReactApexChart
          type="line"
          series={series}
          options={mergedOptions}
          height={height}
        />
      )}
    </div>
  );
}

// Area Chart
export interface AreaChartProps {
  series: ChartSeries[];
  height?: number;
  title?: string;
  subtitle?: string;
  options?: Partial<ChartOptions>;
  loading?: boolean;
  className?: string;
}

export function AreaChart({
  series,
  height = 300,
  title,
  subtitle,
  options = {},
  loading = false,
  className,
}: AreaChartProps) {
  const defaultOptions: ChartOptions = {
    chart: {
      toolbar: { show: false },
      animations: { enabled: true, easing: "easeinout", speed: 800 },
      zoom: { enabled: false },
    },
    stroke: { curve: "smooth", width: 2 },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.4,
        opacityFrom: 0.8,
        opacityTo: 0.1,
      },
    },
    markers: { size: 0, hover: { size: 5 } },
    xaxis: {
      labels: { rotate: 0, style: { fontSize: "12px" } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: { show: true, style: { fontSize: "12px" } },
    },
    grid: {
      borderColor: "#e5e7eb",
      strokeDashArray: 3,
      show: true,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    tooltip: { theme: "light" },
    legend: { show: true, position: "top", horizontalAlign: "right" },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    chart: { ...defaultOptions.chart, ...options.chart },
    fill: { ...defaultOptions.fill, ...options.fill },
    xaxis: { ...defaultOptions.xaxis, ...options.xaxis },
    yaxis: { ...defaultOptions.yaxis, ...options.yaxis },
    grid: { ...defaultOptions.grid, ...options.grid },
    tooltip: { ...defaultOptions.tooltip, ...options.tooltip },
    legend: { ...defaultOptions.legend, ...options.legend },
    stroke: { ...defaultOptions.stroke, ...options.stroke },
  };

  return (
    <div className={cn("bg-white dark:bg-gray-900 rounded-xl shadow-premium border border-gray-200 dark:border-gray-700 p-6", className)}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
        </div>
      )}
      {loading ? (
        <ChartSkeleton height={height} />
      ) : (
        <ReactApexChart
          type="area"
          series={series}
          options={mergedOptions}
          height={height}
        />
      )}
    </div>
  );
}

// Bar Chart
export interface BarChartProps {
  series: ChartSeries[];
  height?: number;
  title?: string;
  subtitle?: string;
  horizontal?: boolean;
  stacked?: boolean;
  options?: Partial<ChartOptions>;
  loading?: boolean;
  className?: string;
}

export function BarChart({
  series,
  height = 300,
  title,
  subtitle,
  horizontal = false,
  stacked = false,
  options = {},
  loading = false,
  className,
}: BarChartProps) {
  const defaultOptions: ChartOptions = {
    chart: {
      toolbar: { show: false },
      animations: { enabled: true, easing: "easeinout", speed: 800 },
    },
    plotOptions: {
      bar: {
        horizontal,
        borderRadius: 4,
        borderRadiusApplication: "end",
        columnWidth: horizontal ? "50%" : "60%",
      },
    },
    stroke: { width: 0 },
    xaxis: {
      labels: { rotate: 0, style: { fontSize: "12px" } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: { show: true, style: { fontSize: "12px" } },
      opposite: horizontal,
    },
    grid: {
      borderColor: "#e5e7eb",
      strokeDashArray: 3,
      show: !horizontal,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    tooltip: { theme: "light" },
    legend: { show: true, position: "top", horizontalAlign: "right" },
    fill: { type: "solid" },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    chart: { ...defaultOptions.chart, ...options.chart },
    plotOptions: { ...defaultOptions.plotOptions, ...options.plotOptions },
    xaxis: { ...defaultOptions.xaxis, ...options.xaxis },
    yaxis: { ...defaultOptions.yaxis, ...options.yaxis },
    grid: { ...defaultOptions.grid, ...options.grid },
    tooltip: { ...defaultOptions.tooltip, ...options.tooltip },
    legend: { ...defaultOptions.legend, ...options.legend },
  };

  return (
    <div className={cn("bg-white dark:bg-gray-900 rounded-xl shadow-premium border border-gray-200 dark:border-gray-700 p-6", className)}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
        </div>
      )}
      {loading ? (
        <ChartSkeleton height={height} />
      ) : (
        <ReactApexChart
          type="bar"
          series={series}
          options={mergedOptions}
          height={height}
        />
      )}
    </div>
  );
}

// Pie/Doughnut Chart
export interface PieChartProps {
  series: number[];
  labels: string[];
  height?: number;
  title?: string;
  subtitle?: string;
  donut?: boolean;
  donutSize?: string;
  options?: Partial<ChartOptions>;
  loading?: boolean;
  className?: string;
}

export function PieChart({
  series,
  labels,
  height = 300,
  title,
  subtitle,
  donut = false,
  donutSize = "60%",
  options = {},
  loading = false,
  className,
}: PieChartProps) {
  const defaultOptions: ChartOptions = {
    chart: {
      toolbar: { show: false },
      animations: { enabled: true, easing: "easeinout", speed: 800 },
    },
    plotOptions: {
              pie: {
        donut: donut ? {
          size: donutSize,
          labels: {
            show: true,
            name: { show: true, fontSize: "14px" },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            value: { show: true, fontSize: "16px", formatter: (val: any) => val },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            total: { show: true, label: "Total", fontSize: "14px", formatter: (w: any) => w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0) },
          },
        } : undefined,
      },
    },
    labels,
    legend: { show: true, position: "bottom" },
    tooltip: { enabled: true, theme: "light" },
    dataLabels: { enabled: false },
    stroke: { width: 0 },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    chart: { ...defaultOptions.chart, ...options.chart },
    plotOptions: { ...defaultOptions.plotOptions, ...options.plotOptions },
    legend: { ...defaultOptions.legend, ...options.legend },
    tooltip: { ...defaultOptions.tooltip, ...options.tooltip },
  };

  return (
    <div className={cn("bg-white dark:bg-gray-900 rounded-xl shadow-premium border border-gray-200 dark:border-gray-700 p-6", className)}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
        </div>
      )}
      {loading ? (
        <ChartSkeleton height={height} />
      ) : (
        <ReactApexChart
          type={donut ? "donut" : "pie"}
          series={series}
          options={mergedOptions}
          height={height}
        />
      )}
    </div>
  );
}

// Radial Bar Chart
export interface RadialBarChartProps {
  series: number[];
  height?: number;
  title?: string;
  subtitle?: string;
  options?: Partial<ChartOptions>;
  loading?: boolean;
  className?: string;
}

export function RadialBarChart({
  series,
  height = 300,
  title,
  subtitle,
  options = {},
  loading = false,
  className,
}: RadialBarChartProps) {
  const defaultOptions: ChartOptions = {
    chart: {
      toolbar: { show: false },
      animations: { enabled: true, easing: "easeinout", speed: 800 },
    },
    plotOptions: {
      radialBar: {
        hollow: { size: "40%", background: "transparent" },
        track: { background: "#f5f5f5", margin: 5 },
        dataLabels: {
          name: { fontSize: "14px", color: "#666" },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          value: { fontSize: "18px", color: "#333", formatter: (val: any) => `${val}%` },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          total: { show: true, label: "Total", fontSize: "14px", color: "#666", formatter: (w: any) => `${w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0) / w.globals.series.length}%` },
        },
      },
    },
    labels: series.map((_, i) => `Label ${i + 1}`),
    legend: { show: true, position: "bottom" },
    tooltip: { enabled: true, theme: "light" },
    stroke: { lineCap: "round" },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    chart: { ...defaultOptions.chart, ...options.chart },
    plotOptions: { ...defaultOptions.plotOptions, ...options.plotOptions },
    legend: { ...defaultOptions.legend, ...options.legend },
    tooltip: { ...defaultOptions.tooltip, ...options.tooltip },
  };

  return (
    <div className={cn("bg-white dark:bg-gray-900 rounded-xl shadow-premium border border-gray-200 dark:border-gray-700 p-6", className)}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
        </div>
      )}
      {loading ? (
        <ChartSkeleton height={height} />
      ) : (
        <ReactApexChart
          type="radialBar"
          series={series}
          options={mergedOptions}
          height={height}
        />
      )}
    </div>
  );
}

// Sparkline
export interface SparklineProps {
  series: number[];
  height?: number;
  color?: string;
  className?: string;
}

export function Sparkline({
  series,
  height = 50,
  color = "#3b82f6",
  className,
}: SparklineProps) {
  return (
    <div className={className}>
      <ReactApexChart
        type="line"
        series={[{ data: series }]}
        options={{
          chart: {
            toolbar: { show: false },
            sparkline: { enabled: true },
            animations: { enabled: false },
          },
          stroke: { curve: "smooth", width: 2, colors: [color] },
          fill: {
            type: "gradient",
            gradient: {
              shade: "light",
              type: "vertical",
              shadeIntensity: 0.1,
              opacityFrom: 0.3,
              opacityTo: 0,
            },
          },
          tooltip: { enabled: false },
          markers: { size: 0 },
        }}
        height={height}
      />
    </div>
  );
}

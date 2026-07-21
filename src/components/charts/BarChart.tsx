"use client";

import ReactApexChart from "react-apexcharts";
import { cn } from "@/lib/cn";

interface BarChartProps {
  series: Array<{
    name: string;
    data: number[];
  }>;
  categories?: string[];
  height?: number;
  className?: string;
  showLegend?: boolean;
  showGrid?: boolean;
  horizontal?: boolean;
  stacked?: boolean;
  colors?: string[];
  borderRadius?: number;
}

const defaultColors = ["#3C50E0", "#6577F3", "#0FADFF", "#00E396", "#FFB547"];

export function BarChart({
  series,
  categories = [],
  height = 350,
  className,
  showLegend = true,
  showGrid = true,
  horizontal = false,
  stacked = false,
  colors = defaultColors,
  borderRadius = 4,
}: BarChartProps) {
  const options = {
    chart: {
      type: "bar",
      stacked,
      toolbar: {
        show: false,
      },
      fontFamily: "Plus Jakarta Sans, sans-serif",
    },
    plotOptions: {
      bar: {
        horizontal,
        borderRadius,
        borderRadiusApplication: "end" as const,
        columnWidth: "40%",
        barHeight: horizontal ? "80%" : undefined,
        distributed: false,
        dataLabels: {
          position: "top" as const,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: showLegend,
      position: "top" as const,
      horizontalAlign: "right" as const,
      fontSize: "14px",
      fontWeight: 500,
      labels: {
        colors: "#64748B",
      },
      markers: {
        size: 6,
        offsetX: -2,
        offsetY: 0,
      },
      itemMargin: {
        horizontal: 12,
        vertical: 4,
      },
    },
    grid: {
      show: showGrid,
      borderColor: "#E2E8F0",
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    tooltip: {
      theme: "light",
    },
    xaxis: {
      categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: "#64748B",
          fontSize: "12px",
          fontWeight: 500,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#64748B",
          fontSize: "12px",
          fontWeight: 500,
        },
      },
    },
    colors,
    states: {
      hover: {
        filter: {
          type: "darken",
          value: 0.9,
        },
      },
    },
  };

  return (
    <div className={cn(className)}>
      <ReactApexChart
        options={options as ApexCharts.ApexOptions}
        series={series}
        type="bar"
        height={height}
      />
    </div>
  );
}

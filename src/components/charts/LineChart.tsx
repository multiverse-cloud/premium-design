"use client";

import ReactApexChart from "react-apexcharts";
import { cn } from "@/lib/cn";

interface LineChartProps {
  series: Array<{
    name: string;
    data: number[];
  }>;
  categories?: string[];
  height?: number;
  className?: string;
  showLegend?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
  colors?: string[];
  curve?: "smooth" | "straight" | "stepline";
  fill?: boolean;
}

const defaultColors = ["#3C50E0", "#6577F3", "#0FADFF", "#00E396", "#FFB547"];

export function LineChart({
  series,
  categories = [],
  height = 350,
  className,
  showLegend = true,
  showGrid = true,
  showTooltip = true,
  colors = defaultColors,
  curve = "smooth",
  fill = false,
}: LineChartProps) {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: fill ? "area" : "line",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      fontFamily: "Plus Jakarta Sans, sans-serif",
    },
    stroke: {
      curve,
      width: 2,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: showLegend,
      position: "top",
      horizontalAlign: "right",
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
      enabled: showTooltip,
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
    fill: fill
      ? {
          opacity: 0.15,
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.4,
            opacityTo: 0.05,
            stops: [0, 90, 100],
          },
        }
      : undefined,
  };

  return (
    <div className={cn(className)}>
      <ReactApexChart
        options={options}
        series={series}
        type={fill ? "area" : "line"}
        height={height}
      />
    </div>
  );
}

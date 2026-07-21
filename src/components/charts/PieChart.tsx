"use client";

import ReactApexChart from "react-apexcharts";
import { cn } from "@/lib/cn";

interface PieChartProps {
  series: number[];
  labels?: string[];
  height?: number;
  width?: number | string;
  className?: string;
  showLegend?: boolean;
  showLabels?: boolean;
  colors?: string[];
  type?: "pie" | "donut";
  innerRadius?: number;
}

const defaultColors = ["#3C50E0", "#6577F3", "#0FADFF", "#00E396", "#FFB547", "#F765A0"];

export function PieChart({
  series,
  labels = [],
  height = 350,
  width = "100%",
  className,
  showLegend = true,
  showLabels = false,
  colors = defaultColors,
  type = "donut",
  innerRadius = 60,
}: PieChartProps) {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type,
      toolbar: {
        show: false,
      },
      fontFamily: "Plus Jakarta Sans, sans-serif",
    },
    labels,
    legend: {
      show: showLegend,
      position: "bottom" as const,
      horizontalAlign: "center" as const,
      fontSize: "14px",
      fontWeight: 500,
      labels: {
        colors: "#64748B",
      },
      markers: {
        size: 6,
        offsetX: 0,
        offsetY: 0,
      },
      itemMargin: {
        horizontal: 12,
        vertical: 4,
      },
    },
    dataLabels: {
      enabled: showLabels,
      formatter: (val: number) => `${Math.round(val)}%`,
      style: {
        fontSize: "12px",
        fontWeight: 500,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: `${innerRadius}%`,
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "14px",
              fontWeight: 500,
              color: "#64748B",
            },
            value: {
              show: true,
              fontSize: "20px",
              fontWeight: 600,
              color: "#1E293B",
              formatter: (val: string) => val,
            },
            total: {
              show: true,
              label: "Total",
              fontSize: "14px",
              fontWeight: 500,
              color: "#64748B",
              formatter: () =>
                series.reduce((a, b) => a + b, 0).toString(),
            },
          },
        },
      },
    },
    tooltip: {
      enabled: true,
      theme: "light",
    },
    colors,
    stroke: {
      show: false,
    },
  };

  return (
    <div className={cn(className)}>
      <ReactApexChart
        options={options}
        series={series}
        type={type}
        height={height}
        width={width}
      />
    </div>
  );
}

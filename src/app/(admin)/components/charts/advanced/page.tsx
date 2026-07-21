"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/data-display/card/Card";
import { Button } from "@/components/ui/button/Button";
import { 
  LineChart, 
  AreaChart, 
  BarChart, 
  PieChart, 
  RadialBarChart,
  Sparkline,
  ChartSeries
} from "@/components/charts/advanced/AdvancedChart";

// Sample data
const monthlySalesData: ChartSeries[] = [
  {
    name: "Sales",
    data: [
      { x: "Jan", y: 4200 },
      { x: "Feb", y: 3800 },
      { x: "Mar", y: 5100 },
      { x: "Apr", y: 4600 },
      { x: "May", y: 5800 },
      { x: "Jun", y: 6200 },
      { x: "Jul", y: 5900 },
      { x: "Aug", y: 6800 },
      { x: "Sep", y: 7200 },
      { x: "Oct", y: 7800 },
      { x: "Nov", y: 8500 },
      { x: "Dec", y: 9200 },
    ],
    color: "#3b82f6",
  },
];

const multiSeriesData: ChartSeries[] = [
  {
    name: "Revenue",
    data: [
      { x: "Mon", y: 1200 },
      { x: "Tue", y: 1900 },
      { x: "Wed", y: 1500 },
      { x: "Thu", y: 2100 },
      { x: "Fri", y: 2800 },
      { x: "Sat", y: 900 },
      { x: "Sun", y: 600 },
    ],
    color: "#10b981",
  },
  {
    name: "Expenses",
    data: [
      { x: "Mon", y: 800 },
      { x: "Tue", y: 1200 },
      { x: "Wed", y: 1000 },
      { x: "Thu", y: 1500 },
      { x: "Fri", y: 1800 },
      { x: "Sat", y: 400 },
      { x: "Sun", y: 300 },
    ],
    color: "#f43f5e",
  },
];

const stackedData: ChartSeries[] = [
  {
    name: "Product A",
    data: [
      { x: "Jan", y: 30 }, { x: "Feb", y: 40 }, { x: "Mar", y: 35 }, { x: "Apr", y: 50 },
      { x: "May", y: 49 }, { x: "Jun", y: 60 }, { x: "Jul", y: 70 }, { x: "Aug", y: 91 },
    ],
    color: "#3b82f6",
  },
  {
    name: "Product B",
    data: [
      { x: "Jan", y: 23 }, { x: "Feb", y: 42 }, { x: "Mar", y: 35 }, { x: "Apr", y: 27 },
      { x: "May", y: 43 }, { x: "Jun", y: 22 }, { x: "Jul", y: 17 }, { x: "Aug", y: 31 },
    ],
    color: "#10b981",
  },
  {
    name: "Product C",
    data: [
      { x: "Jan", y: 12 }, { x: "Feb", y: 17 }, { x: "Mar", y: 21 }, { x: "Apr", y: 18 },
      { x: "May", y: 23 }, { x: "Jun", y: 15 }, { x: "Jul", y: 12 }, { x: "Aug", y: 20 },
    ],
    color: "#f59e0b",
  },
];

const productCategories = [35, 25, 20, 12, 8];
const categoryLabels = ["Electronics", "Clothing", "Home & Garden", "Sports", "Books"];

const radialData = [67, 45, 78, 52];

export default function AdvancedChartsPage() {
  const [loading, setLoading] = useState(false);

  const sparklineData1 = [25, 30, 28, 35, 32, 38, 42, 40, 48, 52, 50, 58];
  const sparklineData2 = [15, 20, 18, 25, 22, 28, 32, 30, 38, 42, 40, 48];
  const sparklineData3 = [45, 50, 48, 55, 52, 58, 62, 60, 68, 72, 70, 78];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Advanced Charts</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Interactive charts powered by ApexCharts with real-time updates, tooltips, and animations
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setLoading(true)}
          disabled={loading}
        >
          {loading ? "Loading..." : "Simulate Loading"}
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setLoading(false)}
        >
          Stop Loading
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Line Chart</h3>
            <p className="text-sm text-gray-500">Monthly sales over time</p>
          </CardHeader>
          <CardContent>
            <LineChart
              series={monthlySalesData}
              height={300}
              loading={loading}
            />
          </CardContent>
        </Card>

        {/* Area Chart */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Area Chart</h3>
            <p className="text-sm text-gray-500">Revenue vs Expenses comparison</p>
          </CardHeader>
          <CardContent>
            <AreaChart
              series={multiSeriesData}
              height={300}
              loading={loading}
            />
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Bar Chart</h3>
            <p className="text-sm text-gray-500">Weekly performance</p>
          </CardHeader>
          <CardContent>
            <BarChart
              series={multiSeriesData}
              height={300}
              loading={loading}
            />
          </CardContent>
        </Card>

        {/* Horizontal Bar Chart */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Horizontal Bar Chart</h3>
            <p className="text-sm text-gray-500">Category comparison</p>
          </CardHeader>
          <CardContent>
            <BarChart
              series={[{
                name: "Value", 
                data: [
                  { x: "Electronics", y: 4000 }, 
                  { x: "Clothing", y: 3000 }, 
                  { x: "Food", y: 2500 }, 
                  { x: "Books", y: 2000 }, 
                  { x: "Toys", y: 1500 }, 
                  { x: "Home", y: 1000 }
                ], 
                color: "#3b82f6" 
              }]}
              height={300}
              horizontal
              loading={loading}
            />
          </CardContent>
        </Card>

        {/* Stacked Bar Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <h3 className="text-lg font-semibold">Stacked Bar Chart</h3>
            <p className="text-sm text-gray-500">Product distribution over months</p>
          </CardHeader>
          <CardContent>
            <BarChart
              series={stackedData}
              height={350}
              stacked
              loading={loading}
            />
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Pie Chart</h3>
            <p className="text-sm text-gray-500">Sales by category</p>
          </CardHeader>
          <CardContent>
            <PieChart
              series={productCategories}
              labels={categoryLabels}
              height={300}
              loading={loading}
            />
          </CardContent>
        </Card>

        {/* Doughnut Chart */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Doughnut Chart</h3>
            <p className="text-sm text-gray-500">Market share</p>
          </CardHeader>
          <CardContent>
            <PieChart
              series={productCategories}
              labels={categoryLabels}
              height={300}
              donut
              donutSize="60%"
              loading={loading}
            />
          </CardContent>
        </Card>

        {/* Radial Bar Chart */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Radial Bar Chart</h3>
            <p className="text-sm text-gray-500">Completion rates</p>
          </CardHeader>
          <CardContent>
            <RadialBarChart
              series={radialData}
              height={300}
              loading={loading}
              options={{
                labels: ["Completed", "In Progress", "Pending", "Cancelled"],
                colors: ["#10b981", "#3b82f6", "#f59e0b", "#f43f5e"],
              }}
            />
          </CardContent>
        </Card>

        {/* Sparklines */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Sparklines</h3>
            <p className="text-sm text-gray-500">Compact trend indicators</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Revenue</span>
                <Sparkline series={sparklineData1} height={50} color="#10b981" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Users</span>
                <Sparkline series={sparklineData2} height={50} color="#3b82f6" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Conversions</span>
                <Sparkline series={sparklineData3} height={50} color="#f59e0b" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Features</h3>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Smooth animations
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Interactive tooltips
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Legend toggle
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Responsive sizing
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Dark mode support
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Gradient fills
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Loading states
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Multiple series
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

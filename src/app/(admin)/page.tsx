import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import DemographicCard from "@/components/ecommerce/DemographicCard";

export const metadata: Metadata = {
  title: "Overview",
  description: "Verdant premium analytics overview dashboard.",
};

export default function Ecommerce() {
  return (
    <div className="animate-fade-in-up">
      <div className="mb-6 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-gradient-to-r from-brand-50 to-brand-100 px-3 py-1 text-xs fontsemibold text-brand-700 shadow-sm shadow-brand-500/10 dark:border-brand-500/30 dark:from-brand-500/15 dark:to-brand-500/25 dark:text-brand-300">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand-400 to-brand-600 shadow-lg shadow-brand-500/50 animate-pulse" />
            Live overview
          </span>
        </div>
        <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white sm:text-title-sm">
          Welcome back
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Here is what&apos;s happening across your workspace today.
        </p>
      </div>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <EcommerceMetrics />

        <MonthlySalesChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <RecentOrders />
      </div>
      </div>
    </div>
  );
}

"use client";
import React from "react";
import Badge from "../ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon, BoxIconLine, GroupIcon } from "@/icons";

export const EcommerceMetrics = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-5 shadow-theme-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-premium dark:border-white/10 dark:bg-white/[0.03] md:p-6">
        <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-400/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-60" />
        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-brand-glow transition-transform duration-500 group-hover:scale-110">
          <GroupIcon className="size-6" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Customers
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              3,782
            </h4>
          </div>
          <Badge color="success">
            <ArrowUpIcon />
            11.01%
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-5 shadow-theme-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-premium dark:border-white/10 dark:bg-white/[0.03] md:p-6">
        <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-400/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-60" />
        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 text-white shadow-theme-md transition-transform duration-500 group-hover:scale-110 dark:from-gray-600 dark:to-gray-800">
          <BoxIconLine />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Orders
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              5,359
            </h4>
          </div>

          <Badge color="error">
            <ArrowDownIcon className="text-error-500" />
            9.05%
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
};

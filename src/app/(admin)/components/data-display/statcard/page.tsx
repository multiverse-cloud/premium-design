"use client";

import React from "react";
import { StatCard } from "@/components/data-display/stat-card/StatCard";
import { DollarLineIcon, BoltIcon, GroupIcon, CheckCircleIcon } from "@/icons";

export default function StatCardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Stat Card</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Statistics card component for dashboard metrics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value="$45,231"
          icon={<DollarLineIcon className="h-6 w-6" />}
          iconColor="success"
          trend={{ value: 12.5, label: "vs last month" }}
        />
        <StatCard
          title="Total Users"
          value="2,350"
          icon={<BoltIcon className="h-6 w-6" />}
          iconColor="brand"
          trend={{ value: 8.2, label: "vs last month" }}
        />
        <StatCard
          title="Conversion Rate"
          value="3.24%"
          icon={<CheckCircleIcon className="h-6 w-6" />}
          iconColor="warning"
          trend={{ value: -2.1, label: "vs last month" }}
        />
        <StatCard
          title="Active Sessions"
          value="1,429"
          icon={<GroupIcon className="h-6 w-6" />}
          iconColor="error"
          trend={{ value: 0, label: "No change" }}
        />
      </div>
    </div>
  );
}

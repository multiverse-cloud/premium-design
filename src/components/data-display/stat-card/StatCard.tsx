"use client";

import { forwardRef, type ReactNode } from "react";
import { Card } from "../card/Card";
import { ArrowUpIcon, ArrowDownIcon } from "@/icons";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const trendVariants = cva("inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold", {
  variants: {
    variant: {
      up: "bg-success-100 text-success-700 dark:bg-success-500/20 dark:text-success-400",
      down: "bg-error-100 text-error-700 dark:bg-error-500/20 dark:text-error-400",
      neutral: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
    },
  },
  defaultVariants: {
    variant: "neutral" as const,
  },
});

const iconContainerVariants = cva("flex h-12 w-12 items-center justify-center rounded-xl", {
  variants: {
    color: {
      brand: "bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400",
      success: "bg-success-100 text-success-600 dark:bg-success-500/20 dark:text-success-400",
      error: "bg-error-100 text-error-600 dark:bg-error-500/20 dark:text-error-400",
      warning: "bg-warning-100 text-warning-600 dark:bg-warning-500/20 dark:text-warning-400",
      gray: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
    },
  },
  defaultVariants: {
    color: "brand" as const,
  },
});

export interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    label?: string;
  };
  iconColor?: "brand" | "success" | "error" | "warning" | "gray";
  description?: string;
  className?: string;
  children?: ReactNode;
}

export function StatCard({
  title,
  value,
  icon,
  trend,
  iconColor = "brand",
  description,
  className,
  children,
}: StatCardProps) {
  const trendVariant = trend
    ? trend.value > 0
      ? "up"
      : trend.value < 0
        ? "down"
        : "neutral"
    : undefined;

  return (
    <Card className={cn("p-6", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
          {trend && (
            <div className="flex items-center gap-2">
              <span className={cn(trendVariants({ variant: trendVariant }))}>
                {trend.value > 0 ? (
                  <ArrowUpIcon className="h-3 w-3" />
                ) : trend.value < 0 ? (
                  <ArrowDownIcon className="h-3 w-3" />
                ) : null}
                {Math.abs(trend.value)}%
              </span>
              {trend.label && (
                <span className="text-xs text-gray-500 dark:text-gray-400">{trend.label}</span>
              )}
            </div>
          )}
          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
          )}
          {children}
        </div>
        {icon && <div className={cn(iconContainerVariants({ color: iconColor }))}>{icon}</div>}
      </div>
    </Card>
  );
}

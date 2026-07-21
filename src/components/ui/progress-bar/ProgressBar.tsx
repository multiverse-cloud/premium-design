"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const progressBarVariants = cva("w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800", {
  variants: {
    size: {
      sm: "h-1",
      md: "h-2",
      lg: "h-3",
      xl: "h-4",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const progressIndicatorVariants = cva("h-full rounded-full transition-all duration-300", {
  variants: {
    color: {
      brand: "bg-brand-500",
      success: "bg-success-500",
      error: "bg-error-500",
      warning: "bg-warning-500",
      info: "bg-blue-light-500",
    },
    variant: {
      solid: "",
      gradient: "bg-gradient-to-r from-brand-500 to-brand-600",
      striped: "bg-stripes",
    },
  },
  defaultVariants: {
    color: "brand",
    variant: "solid",
  },
});

export interface ProgressBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof progressBarVariants>, "size"> {
  value: number;
  max?: number;
  showLabel?: boolean;
  indicatorSize?: "sm" | "md" | "lg" | "xl";
  indicatorColor?: "brand" | "success" | "error" | "warning" | "info";
  indicatorVariant?: "solid" | "gradient" | "striped";
  labelClassName?: string;
}

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ 
    className, 
    value, 
    max = 100, 
    showLabel = false, 
    indicatorSize = "md",
    indicatorColor = "brand",
    indicatorVariant = "solid",
    labelClassName,
    ...props 
  }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <div className="w-full" ref={ref} {...props}>
        {showLabel && (
          <div className="mb-1 flex justify-between text-sm">
            <span className={cn("text-gray-600 dark:text-gray-400", labelClassName)}>
              Progress
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
        <div className={cn(progressBarVariants({ size: "md" }))}>
          <div
            className={cn(
              progressIndicatorVariants({ 
                color: indicatorColor, 
                variant: indicatorVariant 
              }),
              `h-${indicatorSize === "sm" ? 1 : indicatorSize === "md" ? 2 : indicatorSize === "lg" ? 3 : 4}`
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = "ProgressBar";

export { ProgressBar, progressBarVariants, progressIndicatorVariants };

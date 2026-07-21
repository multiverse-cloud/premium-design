"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const progressCircleVariants = cva("", {
  variants: {
    size: {
      sm: "h-12 w-12",
      md: "h-16 w-16",
      lg: "h-20 w-20",
      xl: "h-24 w-24",
    },
    thickness: {
      thin: "stroke-1",
      normal: "stroke-2",
      thick: "stroke-3",
    },
  },
  defaultVariants: {
    size: "md",
    thickness: "normal",
  },
});

export interface ProgressCircleProps
  extends React.SVGAttributes<SVGSVGElement>,
    Omit<VariantProps<typeof progressCircleVariants>, "thickness"> {
  value: number;
  max?: number;
  showValue?: boolean;
  strokeWidth?: number;
  color?: "brand" | "success" | "error" | "warning" | "gray";
  trackColor?: string;
  label?: string;
}

const ProgressCircle = forwardRef<SVGSVGElement, ProgressCircleProps>(
  ({ 
    className, 
    size, 
    value, 
    max = 100, 
    showValue = false,
    strokeWidth = 4,
    color = "brand",
    trackColor = "stroke-gray-200 dark:stroke-gray-800",
    label,
    ...props 
  }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const colorClasses = {
      brand: "stroke-brand-500",
      success: "stroke-success-500",
      error: "stroke-error-500",
      warning: "stroke-warning-500",
      gray: "stroke-gray-500",
    };

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg
          ref={ref}
          className={cn(progressCircleVariants({ size, className }))}
          viewBox="0 0 100 100"
          {...props}
        >
          <circle
            className={trackColor}
            strokeWidth={strokeWidth}
            fill="none"
            cx="50"
            cy="50"
            r={radius}
          />
          <circle
            className={cn(colorClasses[color], "transition-all duration-300 ease-in-out")}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            fill="none"
            cx="50"
            cy="50"
            r={radius}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset,
              transform: "rotate(-90deg)",
              transformOrigin: "50% 50%",
            }}
          />
        </svg>
        {(showValue || label) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {showValue && (
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                {Math.round(percentage)}%
              </span>
            )}
            {label && (
              <span className="text-[10px] text-gray-500 dark:text-gray-400">
                {label}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

ProgressCircle.displayName = "ProgressCircle";

export { ProgressCircle, progressCircleVariants };

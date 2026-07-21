"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const statusDotVariants = cva("inline-block rounded-full", {
  variants: {
    size: {
      sm: "h-1.5 w-1.5",
      md: "h-2 w-2",
      lg: "h-2.5 w-2.5",
      xl: "h-3 w-3",
    },
    color: {
      brand: "bg-brand-500",
      success: "bg-success-500",
      error: "bg-error-500",
      warning: "bg-warning-500",
      gray: "bg-gray-400",
    },
    pulse: {
      true: "animate-pulse",
      false: "",
    },
  },
  defaultVariants: {
    size: "md" as const,
    color: "brand" as const,
    pulse: false as const,
  },
});

type StatusDotVariantProps = VariantProps<typeof statusDotVariants>;

export interface StatusDotProps {
  size?: StatusDotVariantProps["size"];
  color?: StatusDotVariantProps["color"];
  pulse?: StatusDotVariantProps["pulse"];
  label?: string;
  className?: string;
}

const StatusDot = forwardRef<HTMLSpanElement, StatusDotProps>(
  ({ className, size, color, pulse, label }, ref) => {
    return (
      <span className="inline-flex items-center gap-2">
        <span
          ref={ref}
          className={cn(statusDotVariants({ size, color, pulse, className }))}
        />
        {label && (
          <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
        )}
      </span>
    );
  }
);

StatusDot.displayName = "StatusDot";

export { StatusDot, statusDotVariants };

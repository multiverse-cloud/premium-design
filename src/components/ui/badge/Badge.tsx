"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1.5 rounded-full font-semibold transition-all duration-300",
  {
    variants: {
      variant: {
        light: "",
        solid: "",
        gradient: "",
        outline: "",
      },
      color: {
        primary: "",
        success: "",
        error: "",
        warning: "",
        info: "",
        gray: "",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    compoundVariants: [
      { variant: "light" as const, color: "primary" as const, className: "bg-brand-50 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400" },
      { variant: "light" as const, color: "success" as const, className: "bg-success-50 text-success-600 dark:bg-success-500/20 dark:text-success-400" },
      { variant: "light" as const, color: "error" as const, className: "bg-error-50 text-error-600 dark:bg-error-500/20 dark:text-error-400" },
      { variant: "light" as const, color: "warning" as const, className: "bg-warning-50 text-warning-600 dark:bg-warning-500/20 dark:text-warning-400" },
      { variant: "light" as const, color: "info" as const, className: "bg-blue-light-50 text-blue-light-600 dark:bg-blue-light-500/20 dark:text-blue-light-400" },
      { variant: "light" as const, color: "gray" as const, className: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400" },
      { variant: "solid" as const, color: "primary" as const, className: "bg-brand-500 text-white" },
      { variant: "solid" as const, color: "success" as const, className: "bg-success-500 text-white" },
      { variant: "solid" as const, color: "error" as const, className: "bg-error-500 text-white" },
      { variant: "solid" as const, color: "warning" as const, className: "bg-warning-500 text-white" },
      { variant: "solid" as const, color: "info" as const, className: "bg-blue-light-500 text-white" },
      { variant: "solid" as const, color: "gray" as const, className: "bg-gray-500 text-white" },
      { variant: "gradient" as const, color: "primary" as const, className: "bg-gradient-to-r from-brand-500 via-purple-500 to-pink-500 text-white" },
      { variant: "gradient" as const, color: "success" as const, className: "bg-gradient-to-r from-success-500 via-emerald-500 to-teal-500 text-white" },
      { variant: "gradient" as const, color: "error" as const, className: "bg-gradient-to-r from-error-500 via-rose-500 to-pink-500 text-white" },
      { variant: "gradient" as const, color: "warning" as const, className: "bg-gradient-to-r from-warning-500 via-orange-500 to-amber-500 text-white" },
      { variant: "gradient" as const, color: "info" as const, className: "bg-gradient-to-r from-blue-light-500 via-cyan-500 to-sky-500 text-white" },
      { variant: "outline" as const, color: "primary" as const, className: "border-2 border-brand-500 text-brand-600 dark:text-brand-400" },
      { variant: "outline" as const, color: "success" as const, className: "border-2 border-success-500 text-success-600 dark:text-success-400" },
      { variant: "outline" as const, color: "error" as const, className: "border-2 border-error-500 text-error-600 dark:text-error-400" },
      { variant: "outline" as const, color: "warning" as const, className: "border-2 border-warning-500 text-warning-600 dark:text-warning-400" },
      { variant: "outline" as const, color: "info" as const, className: "border-2 border-blue-light-500 text-blue-light-600 dark:text-blue-light-400" },
      { variant: "outline" as const, color: "gray" as const, className: "border-2 border-gray-300 text-gray-600 dark:text-gray-400" },
    ],
    defaultVariants: {
      variant: "light" as const,
      color: "primary" as const,
      size: "md" as const,
    },
  }
);

type BadgeVariantProps = VariantProps<typeof badgeVariants>;

export interface BadgeProps {
  variant?: BadgeVariantProps["variant"];
  color?: BadgeVariantProps["color"];
  size?: BadgeVariantProps["size"];
  dot?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, color, size, dot, children }, ref) => {
    return (
      <span
        className={cn(badgeVariants({ variant, color, size, className }))}
        ref={ref}
      >
        {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;

export { Badge, badgeVariants };

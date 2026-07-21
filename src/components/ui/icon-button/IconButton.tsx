"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const iconButtonVariants = cva(
  "inline-flex items-center justify-center rounded-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-500/20 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        solid: "bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 hover:shadow-brand-glow dark:bg-brand-500 dark:hover:bg-brand-400",
        outline: "border-2 border-brand-500 text-brand-500 bg-transparent hover:bg-brand-50 active:bg-brand-100 dark:border-brand-400 dark:text-brand-400",
        ghost: "text-gray-500 hover:bg-gray-100 hover:text-gray-700 active:bg-gray-200 dark:text-gray-400 dark:hover:bg-white/5",
        soft: "bg-brand-50 text-brand-600 hover:bg-brand-100 active:bg-brand-200 dark:bg-brand-500/20 dark:text-brand-300",
      },
      size: {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "md",
    },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  label: string;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, label, children, ...props }, ref) => {
    return (
      <button
        className={cn(iconButtonVariants({ variant, size, className }))}
        ref={ref}
        aria-label={label}
        title={label}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };

"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const tagVariants = cva(
  "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
        brand: "bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-300",
        success: "bg-success-100 text-success-700 dark:bg-success-500/20 dark:text-success-300",
        error: "bg-error-100 text-error-700 dark:bg-error-500/20 dark:text-error-300",
        warning: "bg-warning-100 text-warning-700 dark:bg-warning-500/20 dark:text-warning-300",
        outline: "border border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400",
      },
      removable: {
        true: "pr-1",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  onRemove?: () => void;
}

const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, removable, onRemove, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(tagVariants({ variant, removable: !!onRemove, className }))}
        {...props}
      >
        {children}
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="ml-0.5 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10"
            aria-label="Remove tag"
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </span>
    );
  }
);

Tag.displayName = "Tag";

export { Tag, tagVariants };

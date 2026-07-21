"use client";

import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const textareaVariants = cva(
  "flex w-full rounded-xl border bg-white px-4 py-3 text-sm font-medium text-gray-900 shadow-theme-sm transition-all duration-200 placeholder:text-gray-400 focus:outline-none focus:ring-3 disabled:cursor-not-allowed disabled:opacity-50 resize-none dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500",
  {
    variants: {
      variant: {
        default: "border-gray-200 focus:border-brand-500 focus:ring-brand-500/20 dark:border-gray-700",
        error: "border-error-500 focus:border-error-500 focus:ring-error-500/20 dark:border-error-500",
        success: "border-success-500 focus:border-success-500 focus:ring-success-500/20 dark:border-success-500",
      },
      textareaSize: {
        sm: "min-h-[80px]",
        md: "min-h-[120px]",
        lg: "min-h-[160px]",
      },
    },
    defaultVariants: {
      variant: "default" as const,
      textareaSize: "md" as const,
    },
  }
);

type TextareaVariantProps = VariantProps<typeof textareaVariants>;

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "rows">,
    VariantProps<typeof textareaVariants> {
  textareaSize?: TextareaVariantProps["textareaSize"];
  error?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, textareaSize, error, ...props }, ref) => {
    const variantToUse = error ? "error" : variant;

    return (
      <textarea
        className={cn(textareaVariants({ variant: variantToUse, textareaSize, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };

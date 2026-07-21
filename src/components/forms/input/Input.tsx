"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const inputVariants = cva(
  "flex w-full rounded-xl border bg-white px-4 py-2.5 text-sm font-medium text-gray-900 shadow-theme-sm transition-all duration-200 placeholder:text-gray-400 focus:outline-none focus:ring-3 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500",
  {
    variants: {
      variant: {
        default: "border-gray-200 focus:border-brand-500 focus:ring-brand-500/20 dark:border-gray-700",
        error: "border-error-500 focus:border-error-500 focus:ring-error-500/20 dark:border-error-500",
        success: "border-success-500 focus:border-success-500 focus:ring-success-500/20 dark:border-success-500",
      },
      inputSize: {
        sm: "h-9 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-5 text-base",
      },
    },
    defaultVariants: {
      variant: "default" as const,
      inputSize: "md" as const,
    },
  }
);

type InputVariantProps = VariantProps<typeof inputVariants>;

export interface InputProps {
  variant?: InputVariantProps["variant"];
  inputSize?: InputVariantProps["inputSize"];
  prefix?: ReactNode;
  suffix?: ReactNode;
  error?: boolean;
  className?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, prefix, suffix, error, type = "text", ...props }, ref) => {
    const variantToUse = error ? "error" : variant;

    return (
      <div className="relative">
        {prefix && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
            {prefix}
          </div>
        )}
        <input
          type={type}
          className={cn(
            inputVariants({
              variant: variantToUse,
              inputSize,
              className: cn(prefix && "pl-10", suffix && "pr-10", className)
            })
          )}
          ref={ref}
          {...props}
        />
        {suffix && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
            {suffix}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };

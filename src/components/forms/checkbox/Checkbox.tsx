"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { forwardRef, type InputHTMLAttributes } from "react";
import { CheckIcon } from "@/icons";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const checkboxVariants = cva(
  "peer h-5 w-5 shrink-0 rounded border shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-gray-300 data-[state=checked]:bg-brand-500 data-[state=checked]:border-brand-500 data-[state=checked]:text-white hover:border-brand-500 dark:border-gray-600",
        error: "border-error-500 data-[state=checked]:bg-error-500 data-[state=checked]:border-error-500 data-[state=checked]:text-white",
        success: "border-success-500 data-[state=checked]:bg-success-500 data-[state=checked]:border-success-500 data-[state=checked]:text-white",
      },
    },
    defaultVariants: {
      variant: "default" as const,
    },
  }
);

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLButtonElement>, "type">,
    VariantProps<typeof checkboxVariants> {
  label?: string;
  description?: string;
  error?: boolean;
}

const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, variant, label, description, error, id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    const variantToUse = error ? "error" : variant;

    return (
      <div className="flex items-start gap-3">
        <CheckboxPrimitive.Root
          ref={ref}
          id={checkboxId}
          className={cn(checkboxVariants({ variant: variantToUse, className }))}
          {...props}
        >
          <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
            <CheckIcon className="h-3.5 w-3.5" />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label
                htmlFor={checkboxId}
                className="text-sm font-medium text-gray-900 cursor-pointer dark:text-white"
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox, checkboxVariants };
export type { CheckboxProps };

"use client";

import * as React from "react";
import * as RadioPrimitive from "@radix-ui/react-radio-group";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const radioVariants = cva(
  "aspect-square h-5 w-5 rounded-full border shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-gray-300 data-[state=checked]:border-brand-500 hover:border-brand-500 dark:border-gray-600",
        error: "border-error-500 data-[state=checked]:border-error-500",
        success: "border-success-500 data-[state=checked]:border-success-500",
      },
    },
    defaultVariants: {
      variant: "default" as const,
    },
  }
);

const indicatorVariants = cva("flex items-center justify-center", {
  variants: {
    variant: {
      default: "",
      error: "",
      success: "",
    },
  },
});

export interface RadioProps {
  className?: string;
  variant?: "default" | "error" | "success";
  label?: string;
  description?: string;
  error?: boolean;
  value?: string;
  name?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  id?: string;
  onChange?: () => void;
}

const Radio = ({ className, variant, label, description, error, id, ...props }: RadioProps) => {
    const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;
    const variantToUse = error ? "error" : variant;

    return (
      <div className="flex items-start gap-3">
        <RadioPrimitive.Root
          id={radioId}
          className={cn(radioVariants({ variant: variantToUse, className }))}
          {...props}
        >
          <RadioPrimitive.Indicator className={cn("flex items-center justify-center", variantToUse === "default" && "text-brand-500", variantToUse === "error" && "text-error-500", variantToUse === "success" && "text-success-500")}>
            <div className="h-2 w-2 rounded-full bg-current" />
          </RadioPrimitive.Indicator>
        </RadioPrimitive.Root>
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label
                htmlFor={radioId}
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
  };

Radio.displayName = "Radio";

export interface RadioGroupProps {
  className?: string;
  label?: string;
  error?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

const RadioGroup = ({ className, label, error, children, ...props }: RadioGroupProps) => {
  return (
    <div className="space-y-3">
      {label && (
        <label className="text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
      )}
      <RadioPrimitive.Root className={cn("flex flex-col gap-2", className)} {...props}>
        {children}
      </RadioPrimitive.Root>
      {error && (
        <p className="text-xs text-error-500">{error}</p>
      )}
    </div>
  );
};

RadioGroup.displayName = "RadioGroup";

export { Radio, RadioGroup, radioVariants };

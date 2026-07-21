"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import { forwardRef, type InputHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const switchVariants = cva(
  "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gray-200 data-[state=checked]:bg-brand-500 dark:bg-gray-700 dark:data-[state=checked]:bg-brand-500",
        error: "bg-gray-200 data-[state=checked]:bg-error-500 dark:bg-gray-700",
        success: "bg-gray-200 data-[state=checked]:bg-success-500 dark:bg-gray-700",
      },
    },
    defaultVariants: {
      variant: "default" as const,
    },
  }
);

const thumbVariants = cva(
  "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200",
  {
    variants: {
      align: {
        left: "translate-x-0 data-[state=checked]:translate-x-5",
        right: "translate-x-5 data-[state=checked]:translate-x-0",
      },
    },
    defaultVariants: {
      align: "left" as const,
    },
  }
);

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLButtonElement>, "type">,
    VariantProps<typeof switchVariants> {
  label?: string;
  description?: string;
  thumbAlign?: "left" | "right";
  error?: boolean;
}

const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, variant, label, description, thumbAlign = "left", error, id, ...props }, ref) => {
    const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;
    const variantToUse = error ? "error" : variant;

    return (
      <div className="flex items-start gap-3">
        <SwitchPrimitive.Root
          ref={ref}
          id={switchId}
          className={cn(switchVariants({ variant: variantToUse, className }))}
          {...props}
        >
          <SwitchPrimitive.Thumb className={cn(thumbVariants({ align: thumbAlign }))} />
        </SwitchPrimitive.Root>
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label
                htmlFor={switchId}
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

Switch.displayName = "Switch";

export { Switch, switchVariants };

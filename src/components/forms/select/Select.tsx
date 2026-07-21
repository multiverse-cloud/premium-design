"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { forwardRef, type ReactNode } from "react";
import { ChevronDownIcon, CheckIcon } from "@/icons";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const selectTriggerVariants = cva(
  "flex w-full items-center justify-between rounded-xl border bg-white px-4 py-2.5 text-sm font-medium text-gray-900 shadow-theme-sm transition-all duration-200 focus:outline-none focus:ring-3 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-900 dark:text-white",
  {
    variants: {
      variant: {
        default: "border-gray-200 focus:border-brand-500 focus:ring-brand-500/20 dark:border-gray-700",
        error: "border-error-500 focus:border-error-500 focus:ring-error-500/20 dark:border-error-500",
        success: "border-success-500 focus:border-success-500 focus:ring-success-500/20 dark:border-success-500",
      },
    },
    defaultVariants: {
      variant: "default" as const,
    },
  }
);

const selectContentVariants = cva(
  "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900",
  {
    variants: {
      side: {
        top: "slideInFromBottom-2",
        bottom: "slideInFromTop-2",
      },
    },
    defaultVariants: {
      side: "bottom" as const,
    },
  }
);

const selectItemVariants = cva(
  "relative flex w-full cursor-pointer select-none items-center rounded-lg py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-gray-800",
  {
    variants: {
      variant: {
        default: "",
        error: "",
        success: "",
      },
    },
  }
);

type SelectVariantProps = VariantProps<typeof selectTriggerVariants>;

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  variant?: SelectVariantProps["variant"];
  error?: boolean;
  children: ReactNode;
  className?: string;
}

const Select = forwardRef<HTMLButtonElement, SelectProps>(
  ({ className, variant, error, placeholder, children, ...props }, ref) => {
    const variantToUse = error ? "error" : variant;

    return (
      <SelectPrimitive.Root {...props}>
        <SelectPrimitive.Trigger
          ref={ref}
          className={cn(selectTriggerVariants({ variant: variantToUse, className }))}
        >
          <SelectPrimitive.Value placeholder={placeholder || "Select..."} />
          <SelectPrimitive.Icon>
            <ChevronDownIcon className="h-4 w-4 text-gray-400" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content className={cn(selectContentVariants())} position="popper" sideOffset={4}>
            <SelectPrimitive.Viewport className="p-1">
              {children}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    );
  }
);

Select.displayName = "Select";

export interface SelectItemProps {
  value: string;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <SelectPrimitive.Item
        ref={ref}
        className={cn("relative flex w-full cursor-pointer select-none items-center rounded-lg py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-gray-800", className)}
        {...props}
      >
        <span className="absolute left-3 flex h-3.5 w-3.5 items-center justify-center">
          <SelectPrimitive.ItemIndicator>
            <CheckIcon className="h-4 w-4 text-brand-500" />
          </SelectPrimitive.ItemIndicator>
        </span>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </SelectPrimitive.Item>
    );
  }
);

SelectItem.displayName = "SelectItem";

export { Select, SelectItem };
export type { SelectProps, SelectItemProps };

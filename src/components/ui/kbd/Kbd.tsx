"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const kbdVariants = cva(
  "inline-flex items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-gray-600 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400",
  {
    variants: {
      size: {
        sm: "min-w-[20px] text-[8px]",
        md: "min-w-[24px] text-[10px]",
        lg: "min-w-[28px] text-xs",
      },
    },
    defaultVariants: {
      size: "md" as const,
    },
  }
);

type KbdVariantProps = VariantProps<typeof kbdVariants>;

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  size?: KbdVariantProps["size"];
}

const Kbd = forwardRef<HTMLElement, KbdProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <kbd
        ref={ref}
        className={cn(kbdVariants({ size, className }))}
        {...props}
      >
        {children}
      </kbd>
    );
  }
);

Kbd.displayName = "Kbd";

export { Kbd, kbdVariants };

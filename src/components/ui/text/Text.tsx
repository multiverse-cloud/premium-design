"use client";

import { forwardRef, type HTMLAttributes, type ElementType } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const textVariants = cva("", {
  variants: {
    size: {
      xs: "text-xs leading-4",
      sm: "text-sm leading-5",
      md: "text-base leading-6",
      lg: "text-lg leading-7",
      xl: "text-xl leading-8",
    },
    variant: {
      default: "text-gray-900 dark:text-white",
      muted: "text-gray-500 dark:text-gray-400",
      subtle: "text-gray-400 dark:text-gray-500",
      brand: "text-brand-600 dark:text-brand-400",
      error: "text-error-600 dark:text-error-400",
      success: "text-success-600 dark:text-success-400",
      warning: "text-warning-600 dark:text-warning-400",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    size: "md" as const,
    variant: "default" as const,
    weight: "normal" as const,
  },
});

type TextVariantProps = VariantProps<typeof textVariants>;

export interface TextProps extends HTMLAttributes<HTMLElement> {
  size?: TextVariantProps["size"];
  variant?: TextVariantProps["variant"];
  weight?: TextVariantProps["weight"];
  as?: ElementType;
}

const Text = forwardRef<HTMLElement, TextProps>(
  ({ className, size, variant, weight, as: Component = "p", children, ...props }, ref) => {
    return (
      <Component
        ref={ref as React.Ref<HTMLParagraphElement>}
        className={cn(textVariants({ size, variant, weight, className }))}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = "Text";

export { Text, textVariants };

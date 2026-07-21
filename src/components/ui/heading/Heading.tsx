"use client";

import { forwardRef, type HTMLAttributes, type ElementType } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const headingVariants = cva("font-display font-bold tracking-tight", {
  variants: {
    level: {
      h1: "text-4xl md:text-5xl lg:text-6xl",
      h2: "text-3xl md:text-4xl lg:text-5xl",
      h3: "text-2xl md:text-3xl lg:text-4xl",
      h4: "text-xl md:text-2xl lg:text-3xl",
      h5: "text-lg md:text-xl lg:text-2xl",
      h6: "text-base md:text-lg lg:text-xl",
    },
    variant: {
      default: "text-gray-900 dark:text-white",
      muted: "text-gray-500 dark:text-gray-400",
      brand: "text-brand-600 dark:text-brand-400",
      error: "text-error-600 dark:text-error-400",
      success: "text-success-600 dark:text-success-400",
    },
  },
  defaultVariants: {
    level: "h1" as const,
    variant: "default" as const,
  },
});

type HeadingVariantProps = VariantProps<typeof headingVariants>;
type HeadingLevel = NonNullable<HeadingVariantProps["level"]>;

const headingComponents = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
} as const;

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  variant?: HeadingVariantProps["variant"];
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = "h1", variant, children, ...props }, ref) => {
    const Component = headingComponents[level];
    
    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ level, variant, className }))}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = "Heading";

export { Heading, headingVariants };

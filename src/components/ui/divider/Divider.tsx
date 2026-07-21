"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  variant?: "solid" | "dashed" | "dotted";
  color?: "default" | "muted" | "brand";
  spacing?: "none" | "sm" | "md" | "lg";
}

const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ 
    className, 
    orientation = "horizontal", 
    variant = "solid", 
    color = "default",
    spacing = "md",
    ...props 
  }, ref) => {
    const colorClasses = {
      default: "bg-gray-200 dark:bg-gray-800",
      muted: "bg-gray-100 dark:bg-gray-900",
      brand: "bg-brand-200 dark:bg-brand-800",
    };

    const spacingClasses = {
      none: "",
      sm: orientation === "horizontal" ? "my-1" : "mx-1",
      md: orientation === "horizontal" ? "my-3" : "mx-3",
      lg: orientation === "horizontal" ? "my-6" : "mx-6",
    };

    const variantClasses = {
      solid: "",
      dashed: "border-dashed",
      dotted: "border-dotted",
    };

    return (
      <div
        ref={ref}
        role="separator"
        className={cn(
          "flex-shrink-0",
          orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
          colorClasses[color],
          spacingClasses[spacing],
          className
        )}
        style={variant !== "solid" ? { borderWidth: "1px", borderColor: "currentColor" } as React.CSSProperties : undefined}
        {...props}
      />
    );
  }
);

Divider.displayName = "Divider";

export { Divider };

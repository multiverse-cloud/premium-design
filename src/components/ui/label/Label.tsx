"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  optional?: boolean;
  hint?: string;
  error?: string;
  size?: "sm" | "md" | "lg";
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ 
    className, 
    required, 
    optional, 
    hint, 
    error, 
    size = "md",
    children, 
    ...props 
  }, ref) => {
    const sizeClasses = {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    };

    return (
      <div className="space-y-1">
        <label
          ref={ref}
          className={cn(
            "block font-medium text-gray-700 dark:text-gray-300",
            sizeClasses[size],
            error && "text-error-600 dark:text-error-400",
            className
          )}
          {...props}
        >
          {children}
          {required && <span className="ml-1 text-error-500">*</span>}
          {optional && <span className="ml-1 text-gray-400">(optional)</span>}
        </label>
        {hint && !error && (
          <p className="text-xs text-gray-500 dark:text-gray-400">{hint}</p>
        )}
        {error && (
          <p className="text-xs text-error-600 dark:text-error-400">{error}</p>
        )}
      </div>
    );
  }
);

Label.displayName = "Label";

export { Label };

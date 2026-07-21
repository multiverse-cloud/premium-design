"use client";

import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface FormFieldProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
  labelClassName?: string;
}

const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ label, error, helperText, required, disabled, children, className, labelClassName, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {label && (
          <label
            className={cn(
              "text-sm font-medium text-gray-900 dark:text-white",
              disabled && "cursor-not-allowed opacity-50",
              labelClassName
            )}
          >
            {label}
            {required && <span className="ml-1 text-error-500">*</span>}
          </label>
        )}
        <div className={cn(error && "mt-1")}>{children}</div>
        {error && (
          <p className="text-xs text-error-500">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-xs text-gray-500 dark:text-gray-400">{helperText}</p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";

export { FormField };


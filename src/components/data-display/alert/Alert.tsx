"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { AlertIcon, CloseIcon, CheckCircleIcon, ErrorIcon, InfoIcon } from "@/icons";

const alertVariants = cva(
  "relative w-full rounded-xl border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-0 [&>svg~*]:pl-9",
  {
    variants: {
      variant: {
        default: "bg-white text-gray-900 border-gray-200 dark:bg-gray-900 dark:text-white dark:border-gray-700",
        info: "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400",
        success: "bg-success-50 border-success-200 text-success-900 dark:bg-success-900/20 dark:border-success-800 dark:text-success-200 [&>svg]:text-success-600 dark:[&>svg]:text-success-400",
        warning: "bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-400",
        error: "bg-error-50 border-error-200 text-error-900 dark:bg-error-900/20 dark:border-error-800 dark:text-error-200 [&>svg]:text-error-600 dark:[&>svg]:text-error-400",
      },
    },
    defaultVariants: {
      variant: "default" as const,
    },
  }
);

const iconMap = {
  default: AlertIcon,
  info: InfoIcon,
  success: CheckCircleIcon,
  warning: AlertIcon,
  error: ErrorIcon,
};

interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  title?: string;
  description?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", title, description, dismissible, onDismiss, children, ...props }, ref) => {
    const Icon = iconMap[variant || "default"];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        <Icon className="h-5 w-5" />
        <div className="pl-6">
          {title && (
            <h5 className="mb-1 text-sm font-semibold leading-none tracking-tight">
              {title}
            </h5>
          )}
          {description && (
            <div className="text-sm [&_p]:leading-relaxed">
              {description}
            </div>
          )}
          {children}
        </div>
        {dismissible && (
          <button
            onClick={onDismiss}
            className="absolute right-4 top-4 rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            aria-label="Dismiss"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);
Alert.displayName = "Alert";

export { Alert, alertVariants };

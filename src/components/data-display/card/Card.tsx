"use client";

import { forwardRef, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const cardVariants = cva(
  "rounded-2xl border border-gray-200 bg-white shadow-theme-sm transition-all duration-200 dark:border-gray-800 dark:bg-gray-900",
  {
    variants: {
      variant: {
        default: "",
        elevated: "shadow-xl",
        outline: "shadow-none",
        ghost: "border-transparent bg-transparent shadow-none",
      },
      hover: {
        true: "hover:shadow-xl hover:-translate-y-1",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default" as const,
      hover: false,
    },
  }
);

const cardHeaderVariants = cva("px-6 py-5", {
  variants: {
    bordered: {
      true: "border-b border-gray-100 dark:border-gray-800",
      false: "",
    },
  },
});

const cardContentVariants = cva("p-6", {
  variants: {
    padding: {
      none: "p-0",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    },
  },
  defaultVariants: {
    padding: "md" as const,
  },
});

const cardFooterVariants = cva("px-6 py-4 border-t border-gray-100 dark:border-gray-800", {
  variants: {
    padding: {
      none: "p-0",
      sm: "px-4 py-4",
      md: "px-6 py-4",
      lg: "px-8 py-6",
    },
  },
  defaultVariants: {
    padding: "md" as const,
  },
});

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  children: ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, hover, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, hover, className }))}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  bordered?: boolean;
  action?: ReactNode;
  children?: ReactNode;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, description, bordered, action, children, ...props }, ref) => {
    if (children) {
      return (
        <div ref={ref} className={cn(cardHeaderVariants({ bordered, className }))} {...props}>
          {children}
        </div>
      );
    }

    return (
      <div ref={ref} className={cn(cardHeaderVariants({ bordered, className }))} {...props}>
        <div className="flex items-start justify-between">
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
            )}
            {description && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
            )}
          </div>
          {action}
        </div>
      </div>
    );
  }
);

CardHeader.displayName = "CardHeader";

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
  children: ReactNode;
}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, padding, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(cardContentVariants({ padding, className }))} {...props}>
        {children}
      </div>
    );
  }
);

CardContent.displayName = "CardContent";

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
  children: ReactNode;
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, padding, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(cardFooterVariants({ padding, className }))} {...props}>
        {children}
      </div>
    );
  }
);

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardContent, CardFooter };

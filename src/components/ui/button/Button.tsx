"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-500/20 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        solid: "bg-brand-500 text-white shadow-sm hover:bg-brand-600 active:bg-brand-700 hover:shadow-brand-glow dark:bg-brand-500 dark:hover:bg-brand-400",
        outline: "border-2 border-brand-500 text-brand-500 bg-transparent hover:bg-brand-50 active:bg-brand-100 dark:border-brand-400 dark:text-brand-400 dark:hover:bg-brand-500/10",
        ghost: "text-gray-600 hover:bg-gray-100 active:bg-gray-200 dark:text-gray-300 dark:hover:bg-white/5 dark:active:bg-white/10",
        soft: "bg-brand-50 text-brand-700 hover:bg-brand-100 active:bg-brand-200 dark:bg-brand-500/20 dark:text-brand-300 dark:hover:bg-brand-500/30",
        link: "text-brand-500 underline-offset-4 hover:underline dark:text-brand-400",
        gradient: "bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg hover:shadow-brand-glow hover:-translate-y-0.5",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 py-2",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
      color: {
        brand: "bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700",
        gray: "bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300 dark:bg-gray-800 dark:text-gray-200",
        success: "bg-success-500 text-white hover:bg-success-600 active:bg-success-700",
        error: "bg-error-500 text-white hover:bg-error-600 active:bg-error-700",
        warning: "bg-warning-500 text-white hover:bg-warning-600 active:bg-warning-700",
      },
    },
    compoundVariants: [
      { variant: ["solid", "soft"] as const, color: "brand" as const, className: "hover:shadow-brand-glow" },
    ],
    defaultVariants: {
      variant: "solid" as const,
      size: "md" as const,
      color: "brand" as const,
    },
  }
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export interface ButtonProps {
  variant?: ButtonVariantProps["variant"];
  size?: ButtonVariantProps["size"];
  color?: ButtonVariantProps["color"];
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, color, children, disabled, type, onClick }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, color, className }))}
        ref={ref}
        disabled={disabled}
        type={type}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

// Default export for backward compatibility
export default Button;

export { Button, buttonVariants };

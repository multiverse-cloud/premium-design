"use client";

import { forwardRef, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const navbarVariants = cva(
  "sticky top-0 z-40 flex h-16 w-full items-center border-b border-gray-100 bg-white/80 px-6 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/80",
  {
    variants: {
      variant: {
        default: "",
        elevated: "shadow-lg",
        bordered: "",
      },
    },
    defaultVariants: {
      variant: "default" as const,
    },
  }
);

export interface NavbarProps {
  variant?: "default" | "elevated" | "bordered";
  leftContent?: ReactNode;
  centerContent?: ReactNode;
  rightContent?: ReactNode;
  className?: string;
}

const Navbar = forwardRef<HTMLElement, NavbarProps>(
  ({ variant = "default", leftContent, centerContent, rightContent, className }, ref) => {
    return (
      <header ref={ref as React.Ref<HTMLDivElement>} className={cn(navbarVariants({ variant, className }))}>
        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-4">{leftContent}</div>
          {centerContent && <div className="hidden flex-1 justify-center md:flex">{centerContent}</div>}
          <div className="flex flex-1 items-center justify-end gap-4">{rightContent}</div>
        </div>
      </header>
    );
  }
);

Navbar.displayName = "Navbar";

export { Navbar };

"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const skeletonVariants = cva("animate-pulse rounded-md bg-gray-200 dark:bg-gray-800", {
  variants: {
    variant: {
      text: "h-4 w-full",
      circular: "rounded-full",
      rectangular: "rounded-md",
      card: "h-32 w-full rounded-xl",
    },
    size: {
      sm: "h-2",
      md: "h-4",
      lg: "h-6",
      xl: "h-8",
    },
  },
  defaultVariants: {
    variant: "rectangular",
  },
});

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  width?: string | number;
  height?: string | number;
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, size, width, height, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant, size, className }))}
        style={{
          width: width,
          height: height,
          ...style,
        }}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

// SkeletonText component
export interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number;
  lastLineWidth?: string;
}

const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ className, lines = 3, lastLineWidth = "60%", ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            variant="text"
            style={{ width: i === lines - 1 ? lastLineWidth : "100%" }}
          />
        ))}
      </div>
    );
  }
);

SkeletonText.displayName = "SkeletonText";

// SkeletonAvatar component
export interface SkeletonAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
}

const SkeletonAvatar = forwardRef<HTMLDivElement, SkeletonAvatarProps>(
  ({ className, size = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12",
      xl: "h-16 w-16",
    };

    return (
      <Skeleton
        ref={ref}
        variant="circular"
        className={cn(sizeClasses[size], className)}
        {...props}
      />
    );
  }
);

SkeletonAvatar.displayName = "SkeletonAvatar";

// SkeletonCard component
export interface SkeletonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  showAvatar?: boolean;
  lines?: number;
}

const SkeletonCard = forwardRef<HTMLDivElement, SkeletonCardProps>(
  ({ className, showAvatar = true, lines = 3, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900", className)}
        {...props}
      >
        <div className="flex items-center gap-3">
          {showAvatar && <SkeletonAvatar size="md" />}
          <div className="flex-1 space-y-2">
            <Skeleton height={12} width="40%" />
            <Skeleton height={10} width="25%" />
          </div>
        </div>
        <div className="mt-4 space-y-2">
          {Array.from({ length: lines }).map((_, i) => (
            <SkeletonText key={i} lines={1} />
          ))}
        </div>
      </div>
    );
  }
);

SkeletonCard.displayName = "SkeletonCard";

export { Skeleton, skeletonVariants, SkeletonText, SkeletonAvatar, SkeletonCard };

"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import { forwardRef, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const sliderTrackVariants = cva("relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700", {
  variants: {
    size: {
      sm: "h-1",
      md: "h-2",
      lg: "h-3",
    },
  },
  defaultVariants: {
    size: "md" as const,
  },
});

const sliderRangeVariants = cva("absolute h-full", {
  variants: {
    variant: {
      default: "bg-brand-500",
      error: "bg-error-500",
      success: "bg-success-500",
    },
  },
  defaultVariants: {
    variant: "default" as const,
  },
});

const sliderThumbVariants = cva(
  "block h-5 w-5 rounded-full border-2 border-brand-500 bg-white shadow-lg ring-0 transition-colors focus-visible:outline-none focus-visible:ring-3 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-900",
  {
    variants: {
      variant: {
        default: "border-brand-500 focus-visible:ring-brand-500/20",
        error: "border-error-500 focus-visible:ring-error-500/20",
        success: "border-success-500 focus-visible:ring-success-500/20",
      },
    },
    defaultVariants: {
      variant: "default" as const,
    },
  }
);

type SliderVariantProps = VariantProps<typeof sliderThumbVariants>;

export interface SliderProps {
  defaultValue?: number[];
  value?: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  variant?: SliderVariantProps["variant"];
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Slider = forwardRef<HTMLSpanElement, SliderProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <SliderPrimitive.Root
        ref={ref}
        className={cn("relative flex w-full touch-none select-none items-center", className)}
        {...props}
      >
        <SliderPrimitive.Track className={cn(sliderTrackVariants({ size }))}>
          <SliderPrimitive.Range className={cn(sliderRangeVariants({ variant }))} />
        </SliderPrimitive.Track>
        {props.defaultValue?.map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            className={cn(sliderThumbVariants({ variant }))}
          />
        )) || <SliderPrimitive.Thumb className={cn(sliderThumbVariants({ variant }))} />}
      </SliderPrimitive.Root>
    );
  }
);

Slider.displayName = "Slider";

export { Slider };

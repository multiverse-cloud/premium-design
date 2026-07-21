"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { forwardRef, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const tabsListVariants = cva(
  "inline-flex items-center justify-center gap-1 rounded-xl bg-gray-100 p-1 dark:bg-gray-800",
  {
    variants: {
      variant: {
        default: "",
        pills: "rounded-full bg-gray-100 dark:bg-gray-800",
        underline: "rounded-none border-b border-gray-200 bg-transparent p-0 dark:border-gray-700",
      },
    },
    defaultVariants: {
      variant: "default" as const,
    },
  }
);

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-3 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-900 dark:data-[state=active]:text-white",
        pills: "rounded-full text-gray-600 hover:bg-white hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-900 dark:data-[state=active]:text-white",
        underline: "rounded-none border-b-2 border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white data-[state=active]:border-brand-500 data-[state=active]:text-brand-600 dark:data-[state=active]:text-brand-400",
      },
      size: {
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default" as const,
      size: "md" as const,
    },
  }
);

export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
}

const Tabs = ({ defaultValue, value, onValueChange, children, className }: TabsProps) => {
  return (
    <TabsPrimitive.Root
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      className={cn("w-full", className)}
    >
      {children}
    </TabsPrimitive.Root>
  );
};

Tabs.displayName = "Tabs";

export interface TabsListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsListVariants> {
  size?: "sm" | "md" | "lg";
}

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, variant, size = "md", children, ...props }, ref) => {
    return (
      <TabsPrimitive.List
        ref={ref}
        className={cn(tabsListVariants({ variant, className }))}
        {...props}
      >
        {children}
      </TabsPrimitive.List>
    );
  }
);

TabsList.displayName = "TabsList";

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tabsTriggerVariants> {
  value: string;
  disabled?: boolean;
}

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, variant, size, value, children, ...props }, ref) => {
    return (
      <TabsPrimitive.Trigger
        ref={ref}
        value={value}
        className={cn(tabsTriggerVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </TabsPrimitive.Trigger>
    );
  }
);

TabsTrigger.displayName = "TabsTrigger";

export interface TabsContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    return (
      <TabsPrimitive.Content
        ref={ref}
        value={value}
        className={cn(
          "mt-4 animate-fade-in-up focus-visible:outline-none",
          className
        )}
        {...props}
      >
        {children}
      </TabsPrimitive.Content>
    );
  }
);

TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };


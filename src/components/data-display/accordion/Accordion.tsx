"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@/icons";
import { cn } from "@/lib/cn";

interface AccordionProps {
  type?: "single" | "multiple";
  defaultValue?: string;
  className?: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ 
  type = "single", 
  defaultValue, 
  className, 
  children 
}) => (
  <AccordionPrimitive.Root
    type={type as any}
    defaultValue={defaultValue as any}
    className={cn("flex flex-col border-b border-gray-200 dark:border-gray-700", className)}
  >
    {children}
  </AccordionPrimitive.Root>
);
Accordion.displayName = "Accordion";

interface AccordionItemProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ 
  value, 
  className, 
  children 
}) => (
  <AccordionPrimitive.Item
    value={value}
    className={cn("border-b border-gray-200 last:border-b-0 dark:border-gray-700", className)}
  >
    {children}
  </AccordionPrimitive.Item>
);
AccordionItem.displayName = "AccordionItem";

interface AccordionTriggerProps {
  className?: string;
  children: React.ReactNode;
}

const AccordionTrigger: React.FC<AccordionTriggerProps> = ({ 
  className, 
  children 
}) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:pointer-events-none disabled:opacity-50 text-gray-900 dark:text-white",
        className
      )}
    >
      {children}
      <ChevronDownIcon className="h-4 w-4 shrink-0 text-gray-500 transition-transform duration-200 group-data-[state=open]:rotate-180" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);
AccordionTrigger.displayName = "AccordionTrigger";

interface AccordionContentProps {
  className?: string;
  children: React.ReactNode;
}

const AccordionContent: React.FC<AccordionContentProps> = ({ 
  className, 
  children 
}) => (
  <AccordionPrimitive.Content
    className="overflow-hidden text-sm data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up"
  >
    <div className={cn("text-gray-600 dark:text-gray-400 pb-4 pt-0", className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
);
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

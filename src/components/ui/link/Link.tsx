"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const linkVariants = cva("transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-500/20", {
  variants: {
    variant: {
      default: "text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline-offset-4 hover:underline",
      muted: "text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
      subtle: "text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400",
    },
    underline: {
      none: "no-underline",
      hover: "underline-offset-4 hover:underline",
      always: "underline",
    },
  },
  defaultVariants: {
    variant: "default",
    underline: "hover",
  },
});

export interface LinkProps
  extends React.ComponentPropsWithoutRef<typeof Link>,
    VariantProps<typeof linkVariants> {
  external?: boolean;
  newTab?: boolean;
}

const LinkComponent = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, underline, href, external, newTab, children, ...props }, ref) => {
    const isExternal = external || (href?.toString().startsWith("http") && !href?.toString().startsWith(typeof window !== "undefined" ? window.location.origin : ""));
    
    if (isExternal || newTab) {
      return (
        <a
          ref={ref}
          href={href?.toString()}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(linkVariants({ variant, underline, className }))}
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        ref={ref}
        href={href || "/"}
        className={cn(linkVariants({ variant, underline, className }))}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

LinkComponent.displayName = "Link";

export { LinkComponent as Link, linkVariants };

"use client";

import { forwardRef, type ReactNode } from "react";
import { ChevronLeftIcon } from "@/icons";
import { cn } from "@/lib/cn";

export interface BreadcrumbProps {
  children: ReactNode;
  className?: string;
  separator?: ReactNode;
}

const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ children, className, separator = <ChevronLeftIcon className="h-4 w-4 rotate-90" />, ...props }, ref) => {
    return (
      <nav
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn("flex items-center", className)}
        {...props}
      >
        <ol className="flex items-center gap-1">{children}</ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = "Breadcrumb";

export interface BreadcrumbItemProps {
  children: ReactNode;
  href?: string;
  isCurrentPage?: boolean;
  className?: string;
}

const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ children, href, isCurrentPage, className, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn(
          "flex items-center gap-1",
          className
        )}
        {...props}
      >
        {href && !isCurrentPage ? (
          <a
            href={href}
            className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            {children}
          </a>
        ) : (
          <span
            className={cn(
              "text-sm font-medium",
              isCurrentPage
                ? "text-gray-900 dark:text-white"
                : "text-gray-500 dark:text-gray-400"
            )}
            aria-current={isCurrentPage ? "page" : undefined}
          >
            {children}
          </span>
        )}
      </li>
    );
  }
);

BreadcrumbItem.displayName = "BreadcrumbItem";

export interface BreadcrumbSeparatorProps {
  children?: ReactNode;
  className?: string;
}

const BreadcrumbSeparator = forwardRef<HTMLLIElement, BreadcrumbSeparatorProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn("flex items-center text-gray-400 dark:text-gray-600", className)}
        {...props}
      >
        {children || <ChevronLeftIcon className="h-4 w-4 rotate-90" />}
      </li>
    );
  }
);

BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator };


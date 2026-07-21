"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  variant?: "none" | "ordered" | "disc" | "decimal";
  spacing?: "none" | "sm" | "md" | "lg";
}

const List = React.forwardRef<HTMLUListElement, ListProps>(
  ({ className, variant = "disc", spacing = "md", children, ...props }, ref) => {
    const listStyle = {
      none: "list-none",
      ordered: "list-decimal",
      disc: "list-disc",
      decimal: "list-decimal",
    };

    const spacingStyle = {
      none: "space-y-0",
      sm: "space-y-1",
      md: "space-y-2",
      lg: "space-y-4",
    };

    return (
      <ul
        ref={ref}
        className={cn(listStyle[variant], spacingStyle[spacing], className)}
        {...props}
      >
        {children}
      </ul>
    );
  }
);
List.displayName = "List";

interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  icon?: React.ReactNode;
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, icon, children, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn(
          "flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300",
          className
        )}
        {...props}
      >
        {icon && <span className="mt-0.5 shrink-0">{icon}</span>}
        <span>{children}</span>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

export { List, ListItem };

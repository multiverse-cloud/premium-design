"use client";

import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TableProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  striped?: boolean;
}

const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ children, className, hoverable = false, striped = false, ...props }, ref) => {
    return (
      <div className="w-full overflow-x-auto">
        <table
          ref={ref}
          className={cn(
            "w-full border-collapse",
            className
          )}
          {...props}
        >
          {children}
        </table>
      </div>
    );
  }
);

Table.displayName = "Table";

export interface TableHeadProps {
  children: ReactNode;
  className?: string;
}

const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <thead
        ref={ref}
        className={cn("border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50", className)}
        {...props}
      >
        {children}
      </thead>
    );
  }
);

TableHead.displayName = "TableHead";

export interface TableBodyProps {
  children: ReactNode;
  className?: string;
}

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <tbody
        ref={ref}
        className={cn("divide-y divide-gray-100 dark:divide-gray-800", className)}
        {...props}
      >
        {children}
      </tbody>
    );
  }
);

TableBody.displayName = "TableBody";

export interface TableRowProps {
  children: ReactNode;
  className?: string;
  selected?: boolean;
  onClick?: () => void;
}

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ children, className, selected, onClick, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        onClick={onClick}
        className={cn(
          "transition-colors dark:text-white",
          onClick && "cursor-pointer",
          selected && "bg-brand-50 dark:bg-brand-500/10",
          className
        )}
        {...props}
      >
        {children}
      </tr>
    );
  }
);

TableRow.displayName = "TableRow";

export interface TableHeaderCellProps {
  children: ReactNode;
  className?: string;
  sortable?: boolean;
  sorted?: "asc" | "desc";
  onSort?: () => void;
}

const TableHeaderCell = forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
  ({ children, className, sortable, sorted, onSort, ...props }, ref) => {
    return (
      <th
        ref={ref}
        className={cn(
          "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400",
          sortable && "cursor-pointer select-none hover:text-gray-700 dark:hover:text-gray-200",
          className
        )}
        onClick={sortable ? onSort : undefined}
        {...props}
      >
        <div className="flex items-center gap-2">
          {children}
          {sortable && sorted && (
            <span className="text-brand-500">{sorted === "asc" ? "↑" : "↓"}</span>
          )}
        </div>
      </th>
    );
  }
);

TableHeaderCell.displayName = "TableHeaderCell";

export interface TableCellProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "muted" | "highlight";
}

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ children, className, variant = "default", ...props }, ref) => {
    return (
      <td
        ref={ref}
        className={cn(
          "px-4 py-3 text-sm",
          variant === "default" && "text-gray-900 dark:text-white",
          variant === "muted" && "text-gray-500 dark:text-gray-400",
          variant === "highlight" && "font-medium text-gray-900 dark:text-white",
          className
        )}
        {...props}
      >
        {children}
      </td>
    );
  }
);

TableCell.displayName = "TableCell";

export { Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell };


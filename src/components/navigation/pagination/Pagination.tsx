"use client";

import { forwardRef } from "react";
import { ChevronLeftIcon } from "@/icons";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const paginationVariants = cva("flex items-center gap-2", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "md" as const,
  },
});

const pageButtonVariants = cva(
  "flex h-9 w-9 items-center justify-center rounded-xl border font-medium transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
        active: "border-brand-500 bg-brand-500 text-white hover:bg-brand-600 dark:border-brand-500 dark:bg-brand-500",
        outline: "border-transparent text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800",
      },
    },
    defaultVariants: {
      variant: "default" as const,
    },
  }
);

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  ({ currentPage, totalPages, onPageChange, showFirstLast = true, showPrevNext = true, size = "md", className }, ref) => {
    const getPageNumbers = () => {
      const pages: (number | "...")[] = [];
      const delta = 2;

      if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);

        if (currentPage > delta + 2) {
          pages.push("...");
        }

        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
          pages.push(i);
        }

        if (currentPage < totalPages - delta - 1) {
          pages.push("...");
        }

        pages.push(totalPages);
      }

      return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
      <nav ref={ref} className={cn(paginationVariants({ size, className }))} aria-label="Pagination">
        {showFirstLast && (
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className={cn(pageButtonVariants({ variant: currentPage === 1 ? "outline" : "default" }), "hidden sm:flex")}
            aria-label="First page"
          >
            <span>«</span>
          </button>
        )}

        {showPrevNext && (
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={cn(pageButtonVariants({ variant: currentPage === 1 ? "outline" : "default" }))}
            aria-label="Previous page"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
        )}

        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) =>
            page === "..." ? (
              <span key={`ellipsis-${index}`} className="flex h-9 w-9 items-center justify-center text-gray-400">
                ···
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={cn(pageButtonVariants({ variant: currentPage === page ? "active" : "default" }))}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            )
          )}
        </div>

        {showPrevNext && (
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={cn(pageButtonVariants({ variant: currentPage === totalPages ? "outline" : "default" }))}
            aria-label="Next page"
          >
            <ChevronLeftIcon className="h-4 w-4 rotate-180" />
          </button>
        )}

        {showFirstLast && (
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className={cn(pageButtonVariants({ variant: currentPage === totalPages ? "outline" : "default" }), "hidden sm:flex")}
            aria-label="Last page"
          >
            <span>»</span>
          </button>
        )}
      </nav>
    );
  }
);

Pagination.displayName = "Pagination";

export { Pagination };

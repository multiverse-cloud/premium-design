"use client";

import { forwardRef, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const sidebarVariants = cva(
  "fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col bg-white shadow-xl dark:bg-gray-900 transition-transform duration-300",
  {
    variants: {
      collapsed: {
        true: "w-[80px]",
        false: "w-[280px]",
      },
    },
    defaultVariants: {
      collapsed: false,
    },
  }
);

const sidebarHeaderVariants = cva("flex h-16 items-center border-b border-gray-100 px-6 dark:border-gray-800", {
  variants: {
    collapsed: {
      true: "justify-center px-4",
      false: "",
    },
  },
});

const sidebarContentVariants = cva("flex-1 overflow-y-auto px-4 py-6", {
  variants: {
    collapsed: {
      true: "px-2",
      false: "",
    },
  },
});

const sidebarFooterVariants = cva("border-t border-gray-100 p-4 dark:border-gray-800", {
  variants: {
    collapsed: {
      true: "px-2",
      false: "",
    },
  },
});

const navItemVariants = cva(
  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white",
  {
    variants: {
      active: {
        true: "bg-brand-50 text-brand-600 hover:bg-brand-50 dark:bg-brand-500/10 dark:text-brand-400",
        false: "",
      },
    },
  }
);

const navSectionVariants = cva("space-y-1");

export interface SidebarProps {
  collapsed?: boolean;
  children: ReactNode;
  className?: string;
}

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  ({ collapsed = false, className, children }, ref) => {
    return (
      <aside ref={ref} className={cn(sidebarVariants({ collapsed, className }))}>
        {children}
      </aside>
    );
  }
);

Sidebar.displayName = "Sidebar";

export interface SidebarHeaderProps {
  collapsed?: boolean;
  logo?: ReactNode;
  title?: string;
  className?: string;
}

const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ collapsed, logo, title, className }, ref) => {
    return (
      <div ref={ref} className={cn(sidebarHeaderVariants({ collapsed, className }))}>
        {logo || (
          <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 shadow-lg">
              <span className="text-xl font-bold text-white">V</span>
            </div>
            {!collapsed && (
              <span className="text-xl font-bold text-gray-900 dark:text-white">{title || "Verdant"}</span>
            )}
          </div>
        )}
      </div>
    );
  }
);

SidebarHeader.displayName = "SidebarHeader";

export interface SidebarContentProps {
  collapsed?: boolean;
  children: ReactNode;
  className?: string;
}

const SidebarContent = forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ collapsed, className, children }, ref) => {
    return (
      <nav ref={ref} className={cn(sidebarContentVariants({ collapsed, className }))}>
        {children}
      </nav>
    );
  }
);

SidebarContent.displayName = "SidebarContent";

export interface SidebarFooterProps {
  collapsed?: boolean;
  children: ReactNode;
  className?: string;
}

const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ collapsed, className, children }, ref) => {
    return (
      <div ref={ref} className={cn(sidebarFooterVariants({ collapsed, className }))}>
        {children}
      </div>
    );
  }
);

SidebarFooter.displayName = "SidebarFooter";

export interface NavSectionProps {
  title?: string;
  collapsed?: boolean;
  children: ReactNode;
  className?: string;
}

const NavSection = forwardRef<HTMLDivElement, NavSectionProps>(
  ({ title, collapsed, className, children }, ref) => {
    return (
      <div ref={ref} className={cn(navSectionVariants({ className }))}>
        {!collapsed && title && (
          <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">{title}</h3>
        )}
        {children}
      </div>
    );
  }
);

NavSection.displayName = "NavSection";

export interface NavItemProps {
  active?: boolean;
  icon?: ReactNode;
  label: string;
  collapsed?: boolean;
  badge?: string | number;
  className?: string;
  onClick?: () => void;
}

const NavItem = forwardRef<HTMLDivElement, NavItemProps>(
  ({ active, icon, label, collapsed, badge, className, onClick, ...props }, ref) => {
    return (
      <div
        ref={ref}
        onClick={onClick}
        className={cn(navItemVariants({ active, className }), collapsed && "justify-center px-2")}
        {...props}
      >
        {icon && (
          <span className={cn("flex-shrink-0", collapsed && "flex items-center justify-center")}>
            {icon}
          </span>
        )}
        {!collapsed && (
          <>
            <span className="flex-1">{label}</span>
            {badge !== undefined && (
              <span className="rounded-full bg-brand-100 px-2 py-0.5 text-xs font-semibold text-brand-600 dark:bg-brand-500/20 dark:text-brand-400">
                {badge}
              </span>
            )}
          </>
        )}
      </div>
    );
  }
);

NavItem.displayName = "NavItem";

export { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, NavSection, NavItem };

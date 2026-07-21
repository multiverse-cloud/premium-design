"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { CloseIcon } from "@/icons";
import { Button } from "@/components/ui/button/Button";

export interface ModalFooterAction {
  label: string;
  onClick: () => void;
  variant?: "solid" | "outline" | "ghost" | "link";
  color?: "brand" | "success" | "error" | "warning";
  disabled?: boolean;
  loading?: boolean;
}

export interface AdvancedModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  footerActions?: ModalFooterAction[];
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  position?: "center" | "top" | "bottom-right";
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  closeButtonPosition?: "inside" | "outside";
  hideBackdrop?: boolean;
  backdropClassName?: string;
  modalClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  preventScroll?: boolean;
  className?: string;
}

// Size classes
const sizeClasses = {
  xs: "max-w-sm",
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-[calc(100vw-4rem)] max-h-[calc(100vh-4rem)]",
};

// Position classes
const positionClasses = {
  center: "items-center justify-center",
  top: "items-start justify-center pt-20",
  "bottom-right": "items-end justify-end p-4",
};

export function AdvancedModal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  footerActions,
  size = "md",
  position = "center",
  closeOnClickOutside = true,
  closeOnEscape = true,
  showCloseButton = true,
  closeButtonPosition = "inside",
  hideBackdrop = false,
  backdropClassName,
  modalClassName,
  headerClassName,
  bodyClassName,
  footerClassName,
  preventScroll = true,
  className,
}: AdvancedModalProps) {
  // Focus trap and scroll lock
  React.useEffect(() => {
    if (!open) return;

    if (preventScroll) {
      document.body.style.overflow = "hidden";
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && closeOnEscape) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, closeOnEscape, onClose, preventScroll]);

  // Handle click outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnClickOutside) {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex",
        positionClasses[position],
        !hideBackdrop && "bg-black/50 backdrop-blur-sm animate-fade-in"
      )}
      onClick={closeOnClickOutside ? handleBackdropClick : undefined}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      aria-describedby={description ? "modal-description" : undefined}
    >
      <div
        className={cn(
          "relative flex flex-col w-full bg-white dark:bg-gray-900 rounded-xl shadow-premium border border-gray-200 dark:border-gray-700 transition-all animate-fade-in-up",
          sizeClasses[size],
          modalClassName,
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className={cn("flex items-start justify-between gap-4 p-6 border-b border-gray-100 dark:border-gray-800", headerClassName)}>
            <div className="flex-1 min-w-0">
              {title && (
                <h2 id="modal-title" className="text-lg font-semibold text-gray-900 dark:text-white">
                  {title}
                </h2>
              )}
              {description && (
                <p id="modal-description" className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {description}
                </p>
              )}
            </div>
            {showCloseButton && closeButtonPosition === "inside" && (
              <button
                onClick={onClose}
                className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0"
                aria-label="Close modal"
              >
                <CloseIcon className="h-5 w-5 text-gray-400" />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className={cn("flex-1 overflow-y-auto p-6", bodyClassName)}>
          {children}
        </div>

        {/* Footer */}
        {(footer || footerActions?.length) && (
          <div className={cn("flex items-center justify-end gap-3 p-6 border-t border-gray-100 dark:border-gray-800", footerClassName)}>
            {footer}
            {footerActions?.map((action, idx) => (
              <Button
                key={idx}
                variant={action.variant || "solid"}
                color={action.color}
                onClick={action.onClick}
                disabled={action.disabled || action.loading}
              >
                {action.loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Loading...
                  </span>
                ) : action.label}
              </Button>
            ))}
          </div>
        )}

        {/* Close button outside */}
        {showCloseButton && closeButtonPosition === "outside" && (
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 p-2 bg-white dark:bg-gray-900 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close modal"
          >
            <CloseIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </button>
        )}
      </div>
    </div>
  );
}

// Confirmation Dialog
export interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "danger" | "warning";
  loading?: boolean;
}

const variantStyles = {
  default: {
    iconBg: "bg-brand-100 dark:bg-brand-900",
    iconColor: "text-brand-600 dark:text-brand-400",
  },
  danger: {
    iconBg: "bg-error-100 dark:bg-error-900",
    iconColor: "text-error-600 dark:text-error-400",
  },
  warning: {
    iconBg: "bg-warning-100 dark:bg-warning-900",
    iconColor: "text-warning-600 dark:text-warning-400",
  },
};

const variantIcons = {
  default: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>
  ),
  danger: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  ),
  warning: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  ),
};

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  loading = false,
}: ConfirmDialogProps) {
  const styles = variantStyles[variant];

  return (
    <AdvancedModal
      open={open}
      onClose={onClose}
      size="sm"
      showCloseButton={false}
    >
      <div className="flex flex-col items-center text-center">
        <div className={cn("flex items-center justify-center w-12 h-12 rounded-full mb-4", styles.iconBg)}>
          <div className={styles.iconColor}>
            {variantIcons[variant]}
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          {message}
        </p>
        <div className="flex items-center gap-3 w-full">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            disabled={loading}
          >
            {cancelLabel}
          </Button>
          <Button
            variant="solid"
            color={variant === "danger" ? "error" : "brand"}
            className="flex-1"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </span>
            ) : confirmLabel}
          </Button>
        </div>
      </div>
    </AdvancedModal>
  );
}

// Alert Dialog
export interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  type?: "info" | "success" | "warning" | "error";
  buttonLabel?: string;
}

const typeStyles = {
  info: {
    iconBg: "bg-info-100 dark:bg-info-900",
    iconColor: "text-info-600 dark:text-info-400",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
      </svg>
    ),
  },
  success: {
    iconBg: "bg-success-100 dark:bg-success-900",
    iconColor: "text-success-600 dark:text-success-400",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  warning: {
    iconBg: "bg-warning-100 dark:bg-warning-900",
    iconColor: "text-warning-600 dark:text-warning-400",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
  },
  error: {
    iconBg: "bg-error-100 dark:bg-error-900",
    iconColor: "text-error-600 dark:text-error-400",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
  },
};

export function AlertDialog({
  open,
  onClose,
  title,
  message,
  type = "info",
  buttonLabel = "OK",
}: AlertDialogProps) {
  const styles = typeStyles[type];

  return (
    <AdvancedModal
      open={open}
      onClose={onClose}
      size="sm"
      showCloseButton={false}
    >
      <div className="flex flex-col items-center text-center">
        <div className={cn("flex items-center justify-center w-12 h-12 rounded-full mb-4", styles.iconBg)}>
          <div className={styles.iconColor}>
            {styles.icon}
          </div>
        </div>
        {title && (
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
        )}
        {message && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            {message}
          </p>
        )}
        <Button
          variant="solid"
          className="w-full"
          onClick={onClose}
        >
          {buttonLabel}
        </Button>
      </div>
    </AdvancedModal>
  );
}

// Drawer (Side Panel)
export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  footerActions?: ModalFooterAction[];
  position?: "left" | "right";
  size?: "sm" | "md" | "lg";
  closeOnClickOutside?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

const drawerSizeClasses = {
  sm: "w-80",
  md: "w-96",
  lg: "w-[500px]",
};

const drawerPositionClasses = {
  left: "inset-y-0 left-0 rounded-r-2xl",
  right: "inset-y-0 right-0 rounded-l-2xl",
};

export function Drawer({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  footerActions,
  position = "right",
  size = "md",
  closeOnClickOutside = true,
  showCloseButton = true,
  className,
}: DrawerProps) {
  // Focus trap and scroll lock
  React.useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnClickOutside) {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={closeOnClickOutside ? handleBackdropClick : undefined}
    >
      <div
        className={cn(
          "absolute flex flex-col h-full bg-white dark:bg-gray-900 shadow-premium border border-gray-200 dark:border-gray-700 transition-transform animate-slide-in",
          position === "left" ? "animate-slide-in-left" : "animate-slide-in-right",
          drawerSizeClasses[size],
          drawerPositionClasses[position],
          className
        )}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-start justify-between gap-4 p-6 border-b border-gray-100 dark:border-gray-800">
            <div className="flex-1 min-w-0">
              {title && (
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {description}
                </p>
              )}
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0"
                aria-label="Close drawer"
              >
                <CloseIcon className="h-5 w-5 text-gray-400" />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>

        {/* Footer */}
        {(footer || footerActions?.length) && (
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 dark:border-gray-800">
            {footer}
            {footerActions?.map((action, idx) => (
              <Button
                key={idx}
                variant={action.variant || "solid"}
                color={action.color}
                onClick={action.onClick}
                disabled={action.disabled || action.loading}
              >
                {action.loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Loading...
                  </span>
                ) : action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// End of file

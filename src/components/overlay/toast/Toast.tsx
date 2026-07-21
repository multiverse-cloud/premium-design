"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { CloseIcon, CheckLineIcon } from "@/icons";

export type ToastType = "success" | "error" | "warning" | "info" | "loading";

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  progress?: boolean;
}

export interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => string;
  removeToast: (id: string) => void;
  clearAll: () => void;
}

// Toast Context
const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

// Toast Provider
export function ToastProvider({ 
  children, 
  position = "top-right",
  maxToasts = 5,
}: { 
  children: React.ReactNode;
  position?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
  maxToasts?: number;
}) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const addToast = React.useCallback((toast: Omit<Toast, "id">) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newToast: Toast = { ...toast, id };
    
    setToasts(prev => {
      const updated = [...prev, newToast];
      return updated.slice(-maxToasts);
    });

    // Auto remove after duration
    if (toast.duration !== 0) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration || 5000);
    }

    return id;
  }, [maxToasts]);

  const removeToast = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const clearAll = React.useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearAll }}>
      {children}
      <ToastContainer position={position} />
    </ToastContext.Provider>
  );
}

// Toast Container
function ToastContainer({ position }: { position: string }) {
  const { toasts } = useToast();

  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
    "bottom-right": "bottom-4 right-4",
  };

  return (
    <div 
      className={cn(
        "fixed z-[100] flex flex-col gap-2 pointer-events-none",
        positionClasses[position as keyof typeof positionClasses]
      )}
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}

// Toast Item
function ToastItem({ toast }: { toast: Toast }) {
  const { removeToast } = useToast();
  const [isPaused, setIsPaused] = React.useState(false);
  const [progress, setProgress] = React.useState(100);
  const [isVisible, setIsVisible] = React.useState(false);

  // Animation on mount
  React.useEffect(() => {
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, []);

  // Progress countdown
  React.useEffect(() => {
    if (toast.duration === 0 || !toast.progress || isPaused) return;

    const duration = toast.duration || 5000;
    const interval = 50;
    const decrement = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev - decrement;
        if (next <= 0) {
          clearInterval(timer);
          return 0;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [toast.duration, toast.progress, isPaused]);

  const typeStyles = {
    success: {
      bg: "bg-white dark:bg-gray-900",
      border: "border-l-4 border-l-success-500",
      icon: "text-success-500",
      iconBg: "bg-success-100 dark:bg-success-900",
      progress: "bg-success-500",
    },
    error: {
      bg: "bg-white dark:bg-gray-900",
      border: "border-l-4 border-l-error-500",
      icon: "text-error-500",
      iconBg: "bg-error-100 dark:bg-error-900",
      progress: "bg-error-500",
    },
    warning: {
      bg: "bg-white dark:bg-gray-900",
      border: "border-l-4 border-l-warning-500",
      icon: "text-warning-500",
      iconBg: "bg-warning-100 dark:bg-warning-900",
      progress: "bg-warning-500",
    },
    info: {
      bg: "bg-white dark:bg-gray-900",
      border: "border-l-4 border-l-info-500",
      icon: "text-info-500",
      iconBg: "bg-info-100 dark:bg-info-900",
      progress: "bg-info-500",
    },
    loading: {
      bg: "bg-white dark:bg-gray-900",
      border: "border-l-4 border-l-brand-500",
      icon: "text-brand-500",
      iconBg: "bg-brand-100 dark:bg-brand-900",
      progress: "bg-brand-500",
    },
  };

  const typeIcons = {
    success: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
      </svg>
    ),
    loading: (
      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    ),
  };

  const styles = typeStyles[toast.type];

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      removeToast(toast.id);
    }, 200);
  };

  return (
    <div
      className={cn(
        "relative w-80 pointer-events-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200",
        styles.bg,
        styles.border,
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="alert"
      aria-live="polite"
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className={cn("flex items-center justify-center w-8 h-8 rounded-full shrink-0", styles.iconBg)}>
            <div className={styles.icon}>
              {typeIcons[toast.type]}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{toast.title}</p>
            {toast.message && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{toast.message}</p>
            )}
            {toast.action && (
              <button
                onClick={toast.action.onClick}
                className="mt-2 text-sm font-medium text-brand-600 hover:text-brand-500"
              >
                {toast.action.label}
              </button>
            )}
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0"
          >
            <CloseIcon className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      {toast.progress && toast.duration !== 0 && (
        <div className="h-1 bg-gray-100 dark:bg-gray-800">
          <div
            className={cn("h-full transition-all duration-50", styles.progress)}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

// Helper hook for quick toasts
export function useToastHelpers() {
  const { addToast } = useToast();

  return {
    success: (title: string, message?: string, options?: Partial<Omit<Toast, "id" | "type" | "title" | "message">>) => {
      return addToast({ type: "success", title, message, ...options });
    },
    error: (title: string, message?: string, options?: Partial<Omit<Toast, "id" | "type" | "title" | "message">>) => {
      return addToast({ type: "error", title, message, duration: options?.duration || 8000, ...options });
    },
    warning: (title: string, message?: string, options?: Partial<Omit<Toast, "id" | "type" | "title" | "message">>) => {
      return addToast({ type: "warning", title, message, ...options });
    },
    info: (title: string, message?: string, options?: Partial<Omit<Toast, "id" | "type" | "title" | "message">>) => {
      return addToast({ type: "info", title, message, ...options });
    },
    loading: (title: string, message?: string, options?: Partial<Omit<Toast, "id" | "type" | "title" | "message">>) => {
      return addToast({ type: "loading", title, message, duration: 0, ...options });
    },
  };
}

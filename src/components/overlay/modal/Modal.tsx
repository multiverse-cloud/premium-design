"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { forwardRef, type ReactNode } from "react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { CloseIcon } from "@/icons";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const overlayVariants = cva("fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", {
  variants: {
    variant: {
      default: "",
      destructive: "bg-black/80",
    },
  },
  defaultVariants: {
    variant: "default" as const,
  },
});

const contentVariants = cva("fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-gray-900 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] duration-200", {
  variants: {
    size: {
      sm: "max-w-md",
      md: "max-w-lg",
      lg: "max-w-2xl",
      xl: "max-w-4xl",
      full: "max-w-[95vw] max-h-[95vh]",
    },
  },
  defaultVariants: {
    size: "md" as const,
  },
});

const headerVariants = cva("flex items-start justify-between mb-4", {
  variants: {
    noPadding: {
      true: "px-6 pt-6",
      false: "",
    },
  },
});

const footerVariants = cva("flex items-center justify-end gap-3 mt-6", {
  variants: {
    noPadding: {
      true: "px-6 pb-6",
      false: "",
    },
  },
});

export interface ModalProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

const Modal = ({ open, defaultOpen, onOpenChange, children }: ModalProps) => {
  return (
    <DialogPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {children}
    </DialogPrimitive.Root>
  );
};

Modal.displayName = "Modal";

export interface ModalTriggerProps extends DialogPrimitive.DialogTriggerProps {
  children: ReactNode;
}

const ModalTrigger = forwardRef<HTMLButtonElement, ModalTriggerProps>(
  ({ children, ...props }, ref) => {
    return (
      <DialogPrimitive.Trigger ref={ref} asChild {...props}>
        {children}
      </DialogPrimitive.Trigger>
    );
  }
);

ModalTrigger.displayName = "ModalTrigger";

export interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof contentVariants> {
  hideCloseButton?: boolean;
  hideTitle?: boolean;
  title?: string;
  description?: string;
}

const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  ({ className, size, hideCloseButton, hideTitle, title, description, children, ...props }, ref) => {
    return (
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={cn(overlayVariants())} />
        <DialogPrimitive.Content
          ref={ref}
          className={cn(contentVariants({ size, className }))}
          {...props}
        >
          {!hideTitle && (
            <DialogPrimitive.Title className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </DialogPrimitive.Title>
          )}
          {!hideTitle && description && (
            <DialogPrimitive.Description className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {description}
            </DialogPrimitive.Description>
          )}
          {children}
          {!hideCloseButton && (
            <DialogPrimitive.Close className="absolute right-4 top-4 rounded-xl p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:hover:bg-gray-800 dark:hover:text-gray-200">
              <CloseIcon className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    );
  }
);

ModalContent.displayName = "ModalContent";

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
  children: ReactNode;
}

const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, noPadding, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(headerVariants({ noPadding, className }))} {...props}>
        {children}
      </div>
    );
  }
);

ModalHeader.displayName = "ModalHeader";

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
  children: ReactNode;
}

const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, noPadding, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(footerVariants({ noPadding, className }))} {...props}>
        {children}
      </div>
    );
  }
);

ModalFooter.displayName = "ModalFooter";

export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex-1", className)} {...props}>
        {children}
      </div>
    );
  }
);

ModalBody.displayName = "ModalBody";

export { Modal, ModalTrigger, ModalContent, ModalHeader, ModalBody, ModalFooter };

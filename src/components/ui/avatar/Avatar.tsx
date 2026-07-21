"use client";

import Image from "next/image";
import { forwardRef, useState, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-medium shadow-lg shadow-gray-900/20",
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-[10px]",
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
        xl: "h-14 w-14 text-lg",
        "2xl": "h-16 w-16 text-xl",
      },
    },
    defaultVariants: {
      size: "md" as const,
    },
  }
);

const statusVariants = cva("absolute bottom-0 right-0 rounded-full border-2 border-white dark:border-gray-900", {
  variants: {
    statusSize: {
      xs: "h-1.5 w-1.5",
      sm: "h-2 w-2",
      md: "h-2.5 w-2.5",
      lg: "h-3 w-3",
      xl: "h-3.5 w-3.5",
      "2xl": "h-4 w-4",
    },
    status: {
      online: "bg-success-500",
      offline: "bg-gray-400",
      busy: "bg-error-500",
      away: "bg-warning-500",
    },
  },
});

type AvatarVariantProps = VariantProps<typeof avatarVariants>;

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  size?: AvatarVariantProps["size"];
  src?: string;
  alt?: string;
  fallback?: string;
  status?: "online" | "offline" | "busy" | "away";
  ring?: boolean;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, src, alt = "User Avatar", fallback, status, ring = false, ...props }, ref) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const initials = fallback
      ? fallback.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
      : alt.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

    return (
      <div
        ref={ref}
        className={cn(
          avatarVariants({ size, className }),
          ring && "ring-4 ring-white dark:ring-gray-800 shadow-xl"
        )}
        {...props}
      >
        {src && !imageError ? (
          <>
            <div className={`absolute inset-0 bg-gradient-to-br from-brand-400 to-purple-500 transition-opacity duration-300 ${imageLoaded ? "opacity-0" : "animate-pulse"}`} />
            <Image
              width={0}
              height={0}
              sizes="100vw"
              src={src}
              alt={alt}
              className={`object-cover w-full h-full transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-500/20 dark:to-brand-500/10">
            <span className="font-semibold text-brand-600 dark:text-brand-400">{initials}</span>
          </div>
        )}
        {status && (
          <span className={cn(statusVariants({ statusSize: size, status }))} />
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export default Avatar;

export { Avatar, avatarVariants };

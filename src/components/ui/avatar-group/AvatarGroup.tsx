"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import { Avatar, type AvatarProps } from "../avatar/Avatar";

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  avatars: (Omit<AvatarProps, "size"> & { size?: AvatarProps["size"] })[];
  max?: number;
  size?: AvatarProps["size"];
  spacing?: "tight" | "normal" | "loose";
}

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, avatars, max = 4, size = "sm", spacing = "normal", ...props }, ref) => {
    const spacingClasses = {
      tight: "-space-x-2",
      normal: "-space-x-3",
      loose: "-space-x-4",
    };

    const visibleAvatars = avatars.slice(0, max);
    const remainingCount = avatars.length - max;

    return (
      <div
        ref={ref}
        className={cn("flex items-center", spacingClasses[spacing], className)}
        {...props}
      >
        {visibleAvatars.map((avatar, index) => (
          <Avatar
            key={index}
            {...avatar}
            size={avatar.size || size}
            className="ring-2 ring-white dark:ring-gray-900"
          />
        ))}
        {remainingCount > 0 && (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-600 ring-2 ring-white dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-900">
            +{remainingCount}
          </span>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = "AvatarGroup";

export { AvatarGroup };

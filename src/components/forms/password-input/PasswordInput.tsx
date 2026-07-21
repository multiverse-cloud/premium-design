"use client";

import { useState } from "react";
import { Input } from "../input/Input";
import { EyeIcon, EyeCloseIcon } from "@/icons";

export interface PasswordInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  inputSize?: "sm" | "md" | "lg";
}

export function PasswordInput({
  value,
  defaultValue,
  onChange,
  placeholder = "Enter password",
  disabled,
  error,
  className,
  inputSize = "md",
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={className}>
      <Input
        type={showPassword ? "text" : "password"}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        error={error}
        inputSize={inputSize}
        suffix={
          <button
            type="button"
            onClick={togglePassword}
            className="flex items-center justify-center rounded-lg p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeCloseIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
          </button>
        }
      />
    </div>
  );
}

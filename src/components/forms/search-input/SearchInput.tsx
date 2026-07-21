"use client";

import { useState } from "react";
import { Input } from "../input/Input";
import { FileIcon, CloseIcon } from "@/icons";

export interface SearchInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  inputSize?: "sm" | "md" | "lg";
  showClear?: boolean;
}

export function SearchInput({
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder = "Search...",
  disabled,
  error,
  className,
  inputSize = "md",
  showClear = true,
}: SearchInputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue || "");
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleClear = () => {
    if (!isControlled) {
      setInternalValue("");
    }
    onChange?.("");
  };

  return (
    <div className={className}>
      <Input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        error={error}
        inputSize={inputSize}
        prefix={<FileIcon className="h-4 w-4" />}
        suffix={
          showClear && value ? (
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center justify-center rounded-lg p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              tabIndex={-1}
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          ) : undefined
        }
      />
    </div>
  );
}


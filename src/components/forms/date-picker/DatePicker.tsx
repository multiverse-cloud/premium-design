"use client";

import { forwardRef, useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import { CalenderIcon } from "@/icons";
import { Input } from "../input/Input";
import { cn } from "@/lib/cn";

export interface DatePickerProps {
  value?: string;
  defaultValue?: string;
  onChange?: (date: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  inputSize?: "sm" | "md" | "lg";
  minDate?: string;
  maxDate?: string;
  mode?: "single" | "multiple" | "range";
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      placeholder = "Select date",
      disabled,
      error,
      className,
      inputSize = "md",
      minDate,
      maxDate,
      mode = "single",
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (!inputRef.current) return;

      const fp = flatpickr(inputRef.current, {
        defaultDate: defaultValue ? new Date(defaultValue) : undefined,
        onChange: (selectedDates, dateStr) => {
          onChange?.(dateStr);
        },
        minDate: minDate,
        maxDate: maxDate,
        mode: mode,
        disableMobile: true,
      });

      return () => {
        fp.destroy();
      };
    }, [defaultValue, minDate, maxDate, mode, onChange]);

    return (
      <div className={cn("relative", className)}>
        <Input
          ref={inputRef}
          type="text"
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          error={error}
          inputSize={inputSize}
          prefix={<CalenderIcon className="h-4 w-4" />}
          {...props}
        />
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";

export { DatePicker };


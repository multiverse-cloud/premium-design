"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  SearchIcon,
  XIcon,
  CheckLineIcon,
  CloseIcon,
} from "@/icons";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  description?: string;
}

export interface SelectGroup {
  label: string;
  options: SelectOption[];
}

export interface AdvancedSelectProps {
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  options: SelectOption[] | SelectGroup[];
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  multiple?: boolean;
  maxSelected?: number;
  noOptionsMessage?: string;
  loadingMessage?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  error?: boolean;
}

// Check if options is a group array
function isSelectGroupArray(options: SelectOption[] | SelectGroup[]): options is SelectGroup[] {
  return options.length > 0 && "options" in options[0];
}

// Spinner component
function Spinner({ className }: { className?: string }) {
  return (
    <svg className={cn("animate-spin", className)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}

// Single Select Component
function AdvancedSelectSingle({
  value,
  onChange,
  options,
  placeholder = "Select...",
  disabled = false,
  loading = false,
  searchable = true,
  clearable = true,
  noOptionsMessage = "No options found",
  loadingMessage = "Loading...",
  className,
  size = "md",
  error = false,
}: Omit<AdvancedSelectProps, "multiple" | "maxSelected">) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const flatOptions = React.useMemo(() => {
    if (isSelectGroupArray(options)) {
      return options.flatMap(group => group.options);
    }
    return options;
  }, [options]);

  const filteredOptions = React.useMemo(() => {
    if (!search) return flatOptions;
    const query = search.toLowerCase();
    return flatOptions.filter(opt => 
      opt.label.toLowerCase().includes(query) ||
      opt.description?.toLowerCase().includes(query)
    );
  }, [flatOptions, search]);

  const selectedOption = flatOptions.find(opt => opt.value === value);

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setOpen(false);
    setSearch("");
  };

  // Keyboard navigation
  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex(prev => prev > 0 ? prev - 1 : prev);
          break;
        case "Enter":
          e.preventDefault();
          if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
            handleSelect(filteredOptions[highlightedIndex].value);
          }
          break;
        case "Escape":
          setOpen(false);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, highlightedIndex, filteredOptions]);

  // Click outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sizeClasses = {
    sm: "py-1.5 px-3 text-sm",
    md: "py-2.5 px-4 text-sm",
    lg: "py-3 px-4 text-base",
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className={cn(
          "w-full flex items-center justify-between gap-2 rounded-lg border bg-white dark:bg-gray-900 transition-colors",
          sizeClasses[size],
          error
            ? "border-error-500 focus:ring-error-500/20"
            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600",
          disabled && "opacity-50 cursor-not-allowed",
          open && "ring-2 ring-brand-500 border-brand-500"
        )}
      >
        <span className={cn(
          "flex-1 text-left truncate",
          !selectedOption && "text-gray-400"
        )}>
          {selectedOption?.label || placeholder}
        </span>
        <div className="flex items-center gap-1">
          {clearable && selectedOption && !disabled && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                onChange?.("");
              }}
              className="p-0.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
            >
              <CloseIcon className="h-4 w-4" />
            </span>
          )}
          {loading ? (
            <Spinner className="h-4 w-4" />
          ) : (
            open ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />
          )}
        </div>
      </button>

      {open && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
          {searchable && (
            <div className="p-2 border-b border-gray-100 dark:border-gray-800">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setHighlightedIndex(-1);
                  }}
                  placeholder="Search..."
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  autoFocus
                />
              </div>
            </div>
          )}

          <div className="max-h-60 overflow-y-auto py-1">
            {loading ? (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                {loadingMessage}
              </div>
            ) : filteredOptions.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                {noOptionsMessage}
              </div>
            ) : isSelectGroupArray(options) ? (
              options.map((group, gIdx) => {
                const groupFiltered = group.options.filter(opt => 
                  !search || opt.label.toLowerCase().includes(search.toLowerCase())
                );
                if (groupFiltered.length === 0) return null;
                return (
                  <div key={gIdx}>
                    <div className="px-4 py-1.5 text-xs font-semibold text-gray-500 uppercase bg-gray-50 dark:bg-gray-800">
                      {group.label}
                    </div>
                    {groupFiltered.map((option) => (
                      <OptionItem
                        key={option.value}
                        option={option}
                        selected={value === option.value}
                        highlighted={highlightedIndex === flatOptions.indexOf(option)}
                        onSelect={() => handleSelect(option.value)}
                        onMouseEnter={() => setHighlightedIndex(flatOptions.indexOf(option))}
                      />
                    ))}
                  </div>
                );
              })
            ) : (
              filteredOptions.map((option, idx) => (
                <OptionItem
                  key={option.value}
                  option={option}
                  selected={value === option.value}
                  highlighted={highlightedIndex === idx}
                  onSelect={() => handleSelect(option.value)}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Multi Select Component
function AdvancedSelectMultiple({
  value = [],
  onChange,
  options,
  placeholder = "Select...",
  disabled = false,
  loading = false,
  searchable = true,
  clearable = true,
  maxSelected,
  noOptionsMessage = "No options found",
  loadingMessage = "Loading...",
  className,
  size = "md",
  error = false,
}: AdvancedSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const selectedValues = Array.isArray(value) ? value : [];

  const flatOptions = React.useMemo(() => {
    if (isSelectGroupArray(options)) {
      return options.flatMap(group => group.options);
    }
    return options;
  }, [options]);

  const filteredOptions = React.useMemo(() => {
    if (!search) return flatOptions;
    const query = search.toLowerCase();
    return flatOptions.filter(opt => 
      opt.label.toLowerCase().includes(query) ||
      opt.description?.toLowerCase().includes(query)
    );
  }, [flatOptions, search]);

  const selectedOptions = flatOptions.filter(opt => selectedValues.includes(opt.value));

  const handleSelect = (optionValue: string) => {
    const newValue = selectedValues.includes(optionValue)
      ? selectedValues.filter(v => v !== optionValue)
      : maxSelected && selectedValues.length >= maxSelected
        ? selectedValues
        : [...selectedValues, optionValue];
    onChange?.(newValue);
    setSearch("");
  };

  const handleRemove = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(selectedValues.filter(v => v !== optionValue));
  };

  // Keyboard navigation
  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex(prev => prev > 0 ? prev - 1 : prev);
          break;
        case "Enter":
          e.preventDefault();
          if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
            handleSelect(filteredOptions[highlightedIndex].value);
          }
          break;
        case "Escape":
          setOpen(false);
          break;
        case "Backspace":
          if (!search && selectedValues.length > 0) {
            onChange?.(selectedValues.slice(0, -1));
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, highlightedIndex, filteredOptions, selectedValues, search, onChange]);

  // Click outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sizeClasses = {
    sm: "py-1.5 px-3 text-sm min-h-[36px]",
    md: "py-2 px-3 text-sm min-h-[42px]",
    lg: "py-2.5 px-4 text-base min-h-[48px]",
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className={cn(
          "w-full flex flex-wrap items-center gap-1.5 rounded-lg border bg-white dark:bg-gray-900 transition-colors",
          sizeClasses[size],
          error
            ? "border-error-500 focus:ring-error-500/20"
            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600",
          disabled && "opacity-50 cursor-not-allowed",
          open && "ring-2 ring-brand-500 border-brand-500"
        )}
      >
        {selectedOptions.length > 0 ? (
          selectedOptions.map(opt => (
            <span
              key={opt.value}
              className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 rounded"
            >
              {opt.icon && <span className="w-4 h-4">{opt.icon}</span>}
              {opt.label}
              <span
                onClick={(e) => handleRemove(opt.value, e)}
                className="ml-0.5 hover:text-brand-900 cursor-pointer"
              >
                <XIcon className="h-3 w-3" />
              </span>
            </span>
          ))
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
        <div className="flex items-center gap-1 ml-auto">
          {clearable && selectedOptions.length > 0 && !disabled && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                onChange?.([]);
              }}
              className="p-0.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
            >
              <CloseIcon className="h-4 w-4" />
            </span>
          )}
          {loading ? (
            <Spinner className="h-4 w-4" />
          ) : (
            open ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />
          )}
        </div>
      </button>

      {open && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
          {searchable && (
            <div className="p-2 border-b border-gray-100 dark:border-gray-800">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setHighlightedIndex(-1);
                  }}
                  placeholder="Search..."
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  autoFocus
                />
              </div>
            </div>
          )}

          {maxSelected && selectedValues.length >= maxSelected && (
            <div className="px-4 py-2 text-xs text-amber-600 bg-amber-50 dark:bg-amber-900/20 border-b border-amber-100 dark:border-amber-900">
              Maximum {maxSelected} selections allowed
            </div>
          )}

          <div className="max-h-60 overflow-y-auto py-1">
            {loading ? (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                {loadingMessage}
              </div>
            ) : filteredOptions.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                {noOptionsMessage}
              </div>
            ) : isSelectGroupArray(options) ? (
              options.map((group, gIdx) => {
                const groupFiltered = group.options.filter(opt => 
                  !search || opt.label.toLowerCase().includes(search.toLowerCase())
                );
                if (groupFiltered.length === 0) return null;
                return (
                  <div key={gIdx}>
                    <div className="px-4 py-1.5 text-xs font-semibold text-gray-500 uppercase bg-gray-50 dark:bg-gray-800">
                      {group.label}
                    </div>
                    {groupFiltered.map((option) => (
                      <OptionItem
                        key={option.value}
                        option={option}
                        selected={selectedValues.includes(option.value)}
                        highlighted={highlightedIndex === flatOptions.indexOf(option)}
                        onSelect={() => handleSelect(option.value)}
                        onMouseEnter={() => setHighlightedIndex(flatOptions.indexOf(option))}
                        multiple
                      />
                    ))}
                  </div>
                );
              })
            ) : (
              filteredOptions.map((option, idx) => (
                <OptionItem
                  key={option.value}
                  option={option}
                  selected={selectedValues.includes(option.value)}
                  highlighted={highlightedIndex === idx}
                  onSelect={() => handleSelect(option.value)}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  multiple
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Option Item Component
function OptionItem({
  option,
  selected,
  highlighted,
  onSelect,
  onMouseEnter,
  multiple = false,
}: {
  option: SelectOption;
  selected: boolean;
  highlighted: boolean;
  onSelect: () => void;
  onMouseEnter: () => void;
  multiple?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={onMouseEnter}
      disabled={option.disabled}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-colors",
        option.disabled && "opacity-50 cursor-not-allowed",
        highlighted && "bg-gray-50 dark:bg-gray-800",
        !highlighted && "hover:bg-gray-50 dark:hover:bg-gray-800"
      )}
    >
      {multiple && (
        <span
          className={cn(
            "flex items-center justify-center w-4 h-4 border rounded transition-colors",
            selected
              ? "bg-brand-500 border-brand-500"
              : "border-gray-300 dark:border-gray-600"
          )}
        >
          {selected && <CheckLineIcon className="h-3 w-3 text-white" />}
        </span>
      )}
      {option.icon && <span className="w-5 h-5">{option.icon}</span>}
      <div className="flex-1 min-w-0">
        <div className={cn("truncate", selected && "font-medium")}>{option.label}</div>
        {option.description && (
          <div className="text-xs text-gray-500 truncate">{option.description}</div>
        )}
      </div>
      {!multiple && selected && (
        <CheckLineIcon className="h-4 w-4 text-brand-500 shrink-0" />
      )}
    </button>
  );
}

// Main Export
export function AdvancedSelect(props: AdvancedSelectProps) {
  if (props.multiple) {
    return <AdvancedSelectMultiple {...props} />;
  }
  return <AdvancedSelectSingle {...props} />;
}

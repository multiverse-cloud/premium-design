"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export type FieldType = 
  | "text"
  | "email"
  | "password"
  | "number"
  | "textarea"
  | "select"
  | "multiselect"
  | "checkbox"
  | "radio"
  | "switch"
  | "date"
  | "datetime"
  | "time"
  | "color"
  | "range"
  | "file"
  | "url"
  | "phone"
  | "search";

export interface FieldOption {
  label: string;
  value: string;
}

export interface FieldValidation {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  patternMessage?: string;
}

export interface FormField {
  id: string;
  type: FieldType;
  name: string;
  label: string;
  placeholder?: string;
  defaultValue?: unknown;
  options?: FieldOption[];
  validation?: FieldValidation;
  helpText?: string;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  cols?: number; // Grid column span (1-12)
}

export interface FormSection {
  id: string;
  title?: string;
  description?: string;
  fields: FormField[];
}

export interface FormSchema {
  sections: FormSection[];
}

export interface FormBuilderProps {
  schema: FormSchema;
  onSubmit?: (data: Record<string, unknown>) => void;
  onChange?: (data: Record<string, unknown>) => void;
  defaultValues?: Record<string, unknown>;
  submitLabel?: string;
  resetLabel?: string;
  className?: string;
}

// Render a single field based on type
function FieldRenderer({
  field,
  value,
  onChange,
  error,
}: {
  field: FormField;
  value: unknown;
  onChange: (value: unknown) => void;
  error?: string;
}) {
  const baseClasses = "w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-colors";
  const errorClasses = "border-error-500 focus:ring-error-500/50 focus:border-error-500";
  const disabledClasses = "opacity-50 cursor-not-allowed";

  const handleChange = (newValue: unknown) => {
    onChange(newValue);
  };

  const renderInput = () => {
    switch (field.type) {
      case "text":
      case "email":
      case "password":
      case "number":
      case "url":
      case "phone":
      case "search":
        return (
          <input
            type={field.type === "password" ? "password" : field.type === "phone" ? "tel" : field.type}
            name={field.name}
            value={value as string || ""}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={field.placeholder}
            disabled={field.disabled}
            readOnly={field.readOnly}
            className={cn(baseClasses, error && errorClasses, field.disabled && disabledClasses)}
          />
        );

      case "textarea":
        return (
          <textarea
            name={field.name}
            value={value as string || ""}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={field.placeholder}
            disabled={field.disabled}
            readOnly={field.readOnly}
            rows={4}
            className={cn(baseClasses, "resize-none", error && errorClasses, field.disabled && disabledClasses)}
          />
        );

      case "select":
        return (
          <select
            name={field.name}
            value={value as string || ""}
            onChange={(e) => handleChange(e.target.value)}
            disabled={field.disabled}
            className={cn(baseClasses, error && errorClasses, field.disabled && disabledClasses)}
          >
            <option value="">{field.placeholder || "Select an option"}</option>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case "multiselect":
        const selectedValues = (value as string[]) || [];
        return (
          <div className={cn(baseClasses, "p-0 overflow-hidden", error && errorClasses, field.disabled && disabledClasses)}>
            <div className="flex flex-wrap gap-2 p-2">
              {selectedValues.map((val) => (
                <span
                  key={val}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-sm rounded"
                >
                  {field.options?.find(o => o.value === val)?.label || val}
                  <button
                    type="button"
                    onClick={() => handleChange(selectedValues.filter((v) => v !== val))}
                    className="hover:text-brand-900"
                    disabled={field.disabled}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
            <select
              value=""
              onChange={(e) => {
                if (e.target.value && !selectedValues.includes(e.target.value)) {
                  handleChange([...selectedValues, e.target.value]);
                }
              }}
              disabled={field.disabled}
              className="w-full px-4 py-2 bg-transparent border-t border-gray-100 dark:border-gray-700"
            >
              <option value="">{field.placeholder || "Add an option..."}</option>
              {field.options?.filter(o => !selectedValues.includes(o.value)).map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        );

      case "checkbox":
        return (
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={value as boolean || false}
              onChange={(e) => handleChange(e.target.checked)}
              disabled={field.disabled}
              className="w-5 h-5 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">{field.placeholder || field.label}</span>
          </label>
        );

      case "switch":
        return (
          <label className="flex items-center gap-3 cursor-pointer">
            <div className={cn(
              "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
              value ? "bg-brand-500" : "bg-gray-300 dark:bg-gray-600"
            )}>
              <span className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                value ? "translate-x-6" : "translate-x-1"
              )} />
            </div>
            <input
              type="checkbox"
              checked={value as boolean || false}
              onChange={(e) => handleChange(e.target.checked)}
              disabled={field.disabled}
              className="sr-only"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">{field.placeholder || field.label}</span>
          </label>
        );

      case "radio":
        return (
          <div className="space-y-2">
            {field.options?.map((opt) => (
              <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name={field.name}
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={(e) => handleChange(e.target.value)}
                  disabled={field.disabled}
                  className="w-5 h-5 border-gray-300 text-brand-500 focus:ring-brand-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{opt.label}</span>
              </label>
            ))}
          </div>
        );

      case "date":
      case "datetime":
      case "time":
        const inputType = field.type === "datetime" ? "datetime-local" : field.type;
        return (
          <input
            type={inputType}
            name={field.name}
            value={value as string || ""}
            onChange={(e) => handleChange(e.target.value)}
            disabled={field.disabled}
            className={cn(baseClasses, error && errorClasses, field.disabled && disabledClasses)}
          />
        );

      case "color":
        return (
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={value as string || "#3b82f6"}
              onChange={(e) => handleChange(e.target.value)}
              disabled={field.disabled}
              className="w-12 h-12 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer"
            />
            <input
              type="text"
              value={value as string || "#3b82f6"}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="#000000"
              disabled={field.disabled}
              className={cn(baseClasses, "flex-1 uppercase", error && errorClasses, field.disabled && disabledClasses)}
            />
          </div>
        );

      case "range":
        return (
          <div className="space-y-2">
            <input
              type="range"
              name={field.name}
              value={value as number || 0}
              onChange={(e) => handleChange(Number(e.target.value))}
              min={field.validation?.min || 0}
              max={field.validation?.max || 100}
              disabled={field.disabled}
              className="w-full accent-brand-500"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{field.validation?.min || 0}</span>
              <span className="font-medium text-gray-900 dark:text-white">{typeof value === 'number' ? value : 0}</span>
              <span>{field.validation?.max || 100}</span>
            </div>
          </div>
        );

      case "file":
        return (
          <div className={cn(
            "border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center",
            error && "border-error-500"
          )}>
            <input
              type="file"
              name={field.name}
              onChange={(e) => handleChange(e.target.files?.[0] || null)}
              disabled={field.disabled}
              className="hidden"
              id={`file-${field.id}`}
            />
            <label
              htmlFor={`file-${field.id}`}
              className="cursor-pointer"
            >
              <svg className="w-8 h-8 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <span className="text-sm text-gray-500">
                {value ? (value as File).name : "Click to upload or drag and drop"}
              </span>
            </label>
          </div>
        );

      default:
        return (
          <input
            type="text"
            name={field.name}
            value={value as string || ""}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={field.placeholder}
            disabled={field.disabled}
            className={cn(baseClasses, error && errorClasses, field.disabled && disabledClasses)}
          />
        );
    }
  };

  if (field.type === "checkbox" || field.type === "switch") {
    return (
      <div className="space-y-1">
        {renderInput()}
        {field.helpText && (
          <p className="text-sm text-gray-500">{field.helpText}</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {field.label}
        {field.validation?.required && <span className="text-error-500 ml-1">*</span>}
      </label>
      {renderInput()}
      {field.helpText && (
        <p className="text-sm text-gray-500">{field.helpText}</p>
      )}
      {error && (
        <p className="text-sm text-error-500">{error}</p>
      )}
    </div>
  );
}

// Validate a single field
function validateField(field: FormField, value: unknown): string | undefined {
  if (!field.validation) return undefined;

  const { required, min, max, minLength, maxLength, pattern, patternMessage } = field.validation;

  // Required check
  if (required) {
    if (value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0)) {
      return `${field.label} is required`;
    }
  }

  // Skip other validations if empty and not required
  if (value === undefined || value === null || value === "") return undefined;

  // String validations
  if (typeof value === "string") {
    if (minLength !== undefined && value.length < minLength) {
      return `${field.label} must be at least ${minLength} characters`;
    }
    if (maxLength !== undefined && value.length > maxLength) {
      return `${field.label} must be at most ${maxLength} characters`;
    }
    if (pattern) {
      const regex = new RegExp(pattern);
      if (!regex.test(value)) {
        return patternMessage || `${field.label} is invalid`;
      }
    }
  }

  // Number validations
  if (typeof value === "number") {
    if (min !== undefined && value < min) {
      return `${field.label} must be at least ${min}`;
    }
    if (max !== undefined && value > max) {
      return `${field.label} must be at most ${max}`;
    }
  }

  return undefined;
}

// Main Form Builder Component
export function FormBuilder({
  schema,
  onSubmit,
  onChange,
  defaultValues = {},
  submitLabel = "Submit",
  resetLabel = "Reset",
  className,
}: FormBuilderProps) {
  const [values, setValues] = React.useState<Record<string, unknown>>(() => {
    const initial: Record<string, unknown> = {};
    schema.sections.forEach(section => {
      section.fields.forEach(field => {
        initial[field.name] = field.defaultValue ?? defaultValues[field.name] ?? 
          (field.type === "checkbox" || field.type === "switch" ? false : "");
      });
    });
    return initial;
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

  const handleChange = (name: string, value: unknown) => {
    const newValues = { ...values, [name]: value };
    setValues(newValues);
    onChange?.(newValues);

    // Clear error when field is changed
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleBlur = (name: string, field: FormField) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate on blur
    const error = validateField(field, values[name]);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Record<string, string> = {};
    let hasErrors = false;

    schema.sections.forEach(section => {
      section.fields.forEach(field => {
        const error = validateField(field, values[field.name]);
        if (error) {
          newErrors[field.name] = error;
          hasErrors = true;
        }
      });
    });

    setErrors(newErrors);
    setTouched(
      schema.sections.reduce((acc, section) => ({
        ...acc,
        ...section.fields.reduce((fAcc, field) => ({ ...fAcc, [field.name]: true }), {})
      }), {})
    );

    if (!hasErrors) {
      onSubmit?.(values);
    }
  };

  const handleReset = () => {
    const initial: Record<string, unknown> = {};
    schema.sections.forEach(section => {
      section.fields.forEach(field => {
        initial[field.name] = field.defaultValue ?? 
          (field.type === "checkbox" || field.type === "switch" ? false : "");
      });
    });
    setValues(initial);
    setErrors({});
    setTouched({});
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-8", className)}>
      {schema.sections.map((section, sectionIndex) => (
        <div key={section.id} className="space-y-6">
          {/* Section Header */}
          {(section.title || section.description) && (
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              {section.title && (
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {section.title}
                </h3>
              )}
              {section.description && (
                <p className="mt-1 text-sm text-gray-500">
                  {section.description}
                </p>
              )}
            </div>
          )}

          {/* Section Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {section.fields.map((field) => (
              <div
                key={field.id}
                className={cn(
                  field.cols ? `md:col-span-${Math.min(field.cols, 12)}` : ""
                )}
                style={field.cols ? { gridColumn: `span ${Math.min(field.cols, 12)}` } : undefined}
              >
                <FieldRenderer
                  field={field}
                  value={values[field.name]}
                  onChange={(value) => handleChange(field.name, value)}
                  error={touched[field.name] ? errors[field.name] : undefined}
                />
              </div>
            ))}
          </div>

          {/* Section separator */}
          {sectionIndex < schema.sections.length - 1 && (
            <div className="border-t border-gray-100 dark:border-gray-800" />
          )}
        </div>
      ))}

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          {resetLabel}
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 text-sm font-medium bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

// Helper function to create form schema
export function createFormSchema(sections: FormSection[]): FormSchema {
  return { sections };
}

// Helper function to create a field
export function createField(
  type: FieldType,
  name: string,
  label: string,
  options?: Partial<FormField>
): FormField {
  return {
    id: `field-${name}-${Date.now()}`,
    type,
    name,
    label,
    ...options,
  };
}

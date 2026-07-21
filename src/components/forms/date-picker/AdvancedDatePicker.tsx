"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "@/icons";

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface DatePickerProps {
  selected?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  format?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  showTime?: boolean;
  className?: string;
}

export interface DateRangePickerProps {
  selected?: DateRange;
  onChange?: (range: DateRange) => void;
  placeholder?: string;
  format?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  showTime?: boolean;
  presets?: boolean;
  className?: string;
}

// Helper functions
const getDaysInMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  return {
    daysInMonth: lastDay.getDate(),
    startingDay: firstDay.getDay(),
    year,
    month,
  };
};

const isSameDay = (d1: Date, d2: Date) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

const formatDate = (date: Date, format: string = "MMM DD, YYYY") => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const fullMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  return format
    .replace("MMMM", fullMonths[date.getMonth()])
    .replace("MMM", months[date.getMonth()])
    .replace("MM", String(date.getMonth() + 1).padStart(2, "0"))
    .replace("DD", String(date.getDate()).padStart(2, "0"))
    .replace("YYYY", String(date.getFullYear()))
    .replace("HH", String(date.getHours()).padStart(2, "0"))
    .replace("mm", String(date.getMinutes()).padStart(2, "0"));
};

const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Calendar Component
function CalendarPicker({
  selectedDate,
  onSelect,
  minDate,
  maxDate,
  onMonthChange,
}: {
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  onMonthChange?: (date: Date) => void;
}) {
  const [viewDate, setViewDate] = React.useState(selectedDate || new Date());
  const { daysInMonth, startingDay, year, month } = getDaysInMonth(viewDate);

  const isDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const handlePrevMonth = () => {
    const newDate = new Date(year, month - 1, 1);
    setViewDate(newDate);
    onMonthChange?.(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(year, month + 1, 1);
    setViewDate(newDate);
    onMonthChange?.(newDate);
  };

  const days = [];

  // Empty cells
  for (let i = 0; i < startingDay; i++) {
    days.push(<div key={`empty-${i}`} className="w-9 h-9" />);
  }

  // Days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const isSelected = selectedDate && isSameDay(date, selectedDate);
    const isToday = isSameDay(date, new Date());
    const disabled = isDisabled(date);

    days.push(
      <button
        key={day}
        onClick={() => !disabled && onSelect(date)}
        disabled={disabled}
        className={cn(
          "w-9 h-9 flex items-center justify-center text-sm rounded-lg transition-colors",
          isSelected && "bg-brand-500 text-white font-medium",
          !isSelected && isToday && "border-2 border-brand-500 text-brand-600 font-medium",
          !isSelected && !isToday && !disabled && "hover:bg-gray-100 dark:hover:bg-gray-800",
          disabled && "opacity-40 cursor-not-allowed"
        )}
      >
        {day}
      </button>
    );
  }

  return (
    <div className="p-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={handlePrevMonth}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <span className="text-sm font-semibold">
          {monthNames[month]} {year}
        </span>
        <button
          onClick={handleNextMonth}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {dayNames.map((name) => (
          <div key={name} className="w-9 h-8 flex items-center justify-center text-xs font-medium text-gray-500">
            {name}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1">
        {days}
      </div>
    </div>
  );
}

// Time Picker
function TimePicker({
  value,
  onChange,
}: {
  value: Date;
  onChange: (date: Date) => void;
}) {
  const hours = Array.from({ length: 12 }, (_, i) => i);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);
  
  const [hour, setHour] = React.useState(value.getHours() % 12 || 12);
  const [minute, setMinute] = React.useState(Math.floor(value.getMinutes() / 5) * 5);
  const [period, setPeriod] = React.useState(value.getHours() >= 12 ? "PM" : "AM");

  React.useEffect(() => {
    let h = hour;
    if (period === "PM" && hour !== 12) h += 12;
    if (period === "AM" && hour === 12) h = 0;
    const newDate = new Date(value);
    newDate.setHours(h);
    newDate.setMinutes(minute);
    onChange(newDate);
  }, [hour, minute, period]);

  return (
    <div className="p-3 border-t border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-2">
        {/* Hours */}
        <div className="flex-1">
          <label className="text-xs text-gray-500 mb-1 block">Hour</label>
          <select
            value={hour}
            onChange={(e) => setHour(Number(e.target.value))}
            className="w-full px-2 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm"
          >
            {hours.map((h) => (
              <option key={h} value={h === 0 ? 12 : h}>
                {h === 0 ? 12 : h}
              </option>
            ))}
          </select>
        </div>

        <span className="text-lg text-gray-400 mt-5">:</span>

        {/* Minutes */}
        <div className="flex-1">
          <label className="text-xs text-gray-500 mb-1 block">Min</label>
          <select
            value={minute}
            onChange={(e) => setMinute(Number(e.target.value))}
            className="w-full px-2 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm"
          >
            {minutes.map((m) => (
              <option key={m} value={m}>
                {String(m).padStart(2, "0")}
              </option>
            ))}
          </select>
        </div>

        {/* AM/PM */}
        <div className="flex-1">
          <label className="text-xs text-gray-500 mb-1 block">AM/PM</label>
          <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <button
              onClick={() => setPeriod("AM")}
              className={cn(
                "flex-1 px-2 py-1.5 text-sm font-medium transition-colors",
                period === "AM" ? "bg-brand-500 text-white" : "bg-white dark:bg-gray-800"
              )}
            >
              AM
            </button>
            <button
              onClick={() => setPeriod("PM")}
              className={cn(
                "flex-1 px-2 py-1.5 text-sm font-medium transition-colors",
                period === "PM" ? "bg-brand-500 text-white" : "bg-white dark:bg-gray-800"
              )}
            >
              PM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Single Date Picker
export function DatePicker({
  selected = null,
  onChange,
  placeholder = "Select date",
  format = "MMM DD, YYYY",
  minDate,
  maxDate,
  disabled = false,
  showTime = false,
  className,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(selected);
  const [viewDate, setViewDate] = React.useState<Date>(selectedDate || new Date());
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (date: Date) => {
    if (showTime) {
      const newDate = new Date(date);
      if (selectedDate) {
        newDate.setHours(selectedDate.getHours());
        newDate.setMinutes(selectedDate.getMinutes());
      }
      setSelectedDate(newDate);
    } else {
      setSelectedDate(date);
      onChange?.(date);
      setIsOpen(false);
    }
  };

  const handleTimeChange = (date: Date) => {
    setSelectedDate(date);
    onChange?.(date);
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-left transition-colors",
          disabled && "opacity-50 cursor-not-allowed",
          !disabled && "hover:border-gray-300 dark:hover:border-gray-600"
        )}
      >
        <CalendarIcon className="w-5 h-5 text-gray-400" />
        <span className={cn("flex-1", !selectedDate && "text-gray-400")}>
          {selectedDate ? formatDate(selectedDate, format) : placeholder}
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-50 top-full left-0 mt-2 bg-white dark:bg-gray-900 rounded-xl shadow-premium border border-gray-200 dark:border-gray-700 animate-fade-in-up">
          <CalendarPicker
            selectedDate={selectedDate}
            onSelect={handleSelect}
            minDate={minDate}
            maxDate={maxDate}
            onMonthChange={setViewDate}
          />
          {showTime && selectedDate && (
            <TimePicker value={selectedDate} onChange={handleTimeChange} />
          )}
          <div className="flex items-center justify-end gap-2 p-3 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={() => { setSelectedDate(null); onChange?.(null); setIsOpen(false); }}
              className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Clear
            </button>
            <button
              onClick={() => {
                if (!selectedDate) {
                  handleSelect(new Date());
                } else {
                  setIsOpen(false);
                }
              }}
              className="px-3 py-1.5 text-sm font-medium bg-brand-500 text-white rounded-lg hover:bg-brand-600"
            >
              {selectedDate ? "Done" : "Select Today"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Date Range Picker
export function DateRangePicker({
  selected = { start: null, end: null },
  onChange,
  placeholder = "Select date range",
  format = "MMM DD, YYYY",
  minDate,
  maxDate,
  disabled = false,
  showTime = false,
  presets = true,
  className,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [range, setRange] = React.useState<DateRange>(selected);
  const [selecting, setSelecting] = React.useState<"start" | "end">("start");
  const [viewDate, setViewDate] = React.useState(new Date());
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (date: Date) => {
    if (selecting === "start") {
      setRange({ start: date, end: null });
      setSelecting("end");
    } else {
      if (range.start && date < range.start) {
        setRange({ start: date, end: range.start });
      } else {
        setRange({ ...range, end: date });
      }
      if (!showTime) {
        const newRange = { 
          start: range.start && date < range.start ? date : range.start, 
          end: range.start && date < range.start ? range.start : date 
        };
        onChange?.(newRange);
        setSelecting("start");
        setIsOpen(false);
      }
    }
  };

  const handlePreset = (preset: { label: string; days: number }) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - preset.days);
    const newRange = { start, end };
    setRange(newRange);
    onChange?.(newRange);
    setIsOpen(false);
  };

  const presetsList = [
    { label: "Today", days: 0 },
    { label: "Yesterday", days: 1 },
    { label: "Last 7 days", days: 6 },
    { label: "Last 30 days", days: 29 },
    { label: "This month", days: new Date().getDate() - 1 },
    { label: "Last month", days: new Date().getDate() + 29 },
  ];

  const getDisplayValue = () => {
    if (range.start && range.end) {
      return `${formatDate(range.start, format)} - ${formatDate(range.end, format)}`;
    }
    if (range.start) {
      return `${formatDate(range.start, format)} - Select end`;
    }
    return placeholder;
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-left transition-colors",
          disabled && "opacity-50 cursor-not-allowed",
          !disabled && "hover:border-gray-300 dark:hover:border-gray-600"
        )}
      >
        <CalendarIcon className="w-5 h-5 text-gray-400" />
        <span className={cn("flex-1", !range.start && "text-gray-400")}>
          {getDisplayValue()}
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-50 top-full left-0 mt-2 bg-white dark:bg-gray-900 rounded-xl shadow-premium border border-gray-200 dark:border-gray-700 animate-fade-in-up">
          <div className="flex">
            {/* Presets */}
            {presets && (
              <div className="w-40 border-r border-gray-100 dark:border-gray-800 p-3">
                <div className="text-xs font-medium text-gray-500 mb-2">Quick select</div>
                {presetsList.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => handlePreset(preset)}
                    className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            )}

            {/* Calendar */}
            <CalendarPicker
              selectedDate={selecting === "start" ? range.start : range.end}
              onSelect={handleSelect}
              minDate={minDate}
              maxDate={maxDate}
              onMonthChange={setViewDate}
            />
          </div>

          {/* Selected range display */}
          <div className="p-3 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2 text-sm">
              <div className="flex-1">
                <div className="text-xs text-gray-500">Start</div>
                <div className="font-medium">
                  {range.start ? formatDate(range.start, "MMM DD, YYYY") : "—"}
                </div>
              </div>
              <div className="text-gray-400">→</div>
              <div className="flex-1">
                <div className="text-xs text-gray-500">End</div>
                <div className="font-medium">
                  {range.end ? formatDate(range.end, "MMM DD, YYYY") : "—"}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 p-3 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={() => { setRange({ start: null, end: null }); onChange?.({ start: null, end: null }); setIsOpen(false); }}
              className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Clear
            </button>
            <button
              onClick={() => {
                if (!range.start) {
                  handleSelect(new Date());
                } else if (!range.end) {
                  handleSelect(new Date());
                } else {
                  setIsOpen(false);
                }
              }}
              className="px-3 py-1.5 text-sm font-medium bg-brand-500 text-white rounded-lg hover:bg-brand-600"
            >
              {range.start && range.end ? "Done" : range.start ? "Select End" : "Select Start"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

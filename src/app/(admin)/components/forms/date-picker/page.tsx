"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/data-display/card/Card";
import { DatePicker, DateRangePicker } from "@/components/forms/date-picker/AdvancedDatePicker";
import { ToastProvider, useToastHelpers } from "@/components/overlay/toast/Toast";

function DatePickerDemo() {
  const toast = useToastHelpers();
  const [singleDate, setSingleDate] = useState<Date | null>(null);
  const [dateWithTime, setDateWithTime] = useState<Date | null>(null);
  const [dateRange, setDateRange] = useState({ start: null as Date | null, end: null as Date | null });

  const handleSingleChange = (date: Date | null) => {
    setSingleDate(date);
    if (date) {
      toast.success("Date Selected", date.toLocaleDateString("en-US", { 
        weekday: "long", 
        year: "numeric", 
        month: "long", 
        day: "numeric" 
      }));
    }
  };

  const handleRangeChange = (range: { start: Date | null; end: Date | null }) => {
    setDateRange(range);
    if (range.start && range.end) {
      const days = Math.ceil((range.end.getTime() - range.start.getTime()) / (1000 * 60 * 60 * 24));
      toast.success("Range Selected", `${days} day${days !== 1 ? "s" : ""} selected`);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Date Picker</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Single date, date range, with time picker, and presets
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Single Date */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Single Date Picker</h3>
            <p className="text-sm text-gray-500">Select a single date</p>
          </CardHeader>
          <CardContent>
            <DatePicker
              selected={singleDate}
              onChange={handleSingleChange}
              placeholder="Select a date"
            />
            {singleDate && (
              <div className="mt-3 text-sm text-gray-500">
                Selected: <span className="font-medium text-gray-900 dark:text-white">
                  {singleDate.toLocaleDateString("en-US", { 
                    weekday: "short", 
                    year: "numeric", 
                    month: "short", 
                    day: "numeric" 
                  })}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* With Time */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Date with Time</h3>
            <p className="text-sm text-gray-500">Select date and time</p>
          </CardHeader>
          <CardContent>
            <DatePicker
              selected={dateWithTime}
              onChange={setDateWithTime}
              placeholder="Select date and time"
              showTime
            />
            {dateWithTime && (
              <div className="mt-3 text-sm text-gray-500">
                Selected: <span className="font-medium text-gray-900 dark:text-white">
                  {dateWithTime.toLocaleDateString("en-US", { 
                    weekday: "short", 
                    month: "short", 
                    day: "numeric",
                    year: "numeric"
                  })}
                  {" at "}
                  {dateWithTime.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit"
                  })}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Date Range */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Date Range Picker</h3>
            <p className="text-sm text-gray-500">Select a date range with presets</p>
          </CardHeader>
          <CardContent>
            <DateRangePicker
              selected={dateRange}
              onChange={handleRangeChange}
              placeholder="Select date range"
              presets
            />
            {dateRange.start && (
              <div className="mt-3 text-sm text-gray-500">
                {dateRange.end ? (
                  <>
                    From: <span className="font-medium text-gray-900 dark:text-white">
                      {dateRange.start.toLocaleDateString()}
                    </span>
                    {" to "}
                    <span className="font-medium text-gray-900 dark:text-white">
                      {dateRange.end.toLocaleDateString()}
                    </span>
                    {" "}
                    ({Math.ceil((dateRange.end.getTime() - dateRange.start.getTime()) / (1000 * 60 * 60 * 24))} days)
                  </>
                ) : (
                  <>
                    Start: <span className="font-medium text-gray-900 dark:text-white">
                      {dateRange.start.toLocaleDateString()}
                    </span>
                    {" (select end date)"}
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Without Presets */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Without Presets</h3>
            <p className="text-sm text-gray-500">Clean date range picker</p>
          </CardHeader>
          <CardContent>
            <DateRangePicker
              selected={{ start: null, end: null }}
              onChange={() => {}}
              placeholder="Select date range"
              presets={false}
            />
          </CardContent>
        </Card>

        {/* Disabled */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Disabled State</h3>
            <p className="text-sm text-gray-500">Date picker is disabled</p>
          </CardHeader>
          <CardContent>
            <DatePicker
              selected={new Date()}
              onChange={() => {}}
              disabled
            />
          </CardContent>
        </Card>

        {/* With Min/Max */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">With Min/Max Date</h3>
            <p className="text-sm text-gray-500">Only dates within range are selectable</p>
          </CardHeader>
          <CardContent>
            <DatePicker
              selected={singleDate}
              onChange={handleSingleChange}
              minDate={new Date()}
              maxDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
              placeholder="Select date (next 7 days only)"
            />
            <p className="mt-2 text-xs text-gray-500">Only dates within the next 7 days are selectable</p>
          </CardContent>
        </Card>
      </div>

      {/* Features */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Features</h3>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Single date selection
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Date range selection
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Time picker
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Quick presets
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Min/max date
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Disabled state
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Dark mode
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Click outside to close
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Usage Example */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Usage Example</h3>
        </CardHeader>
        <CardContent>
          <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm overflow-x-auto">
{`import { DatePicker, DateRangePicker } from "@/components/forms/date-picker";

// Single date
<DatePicker
  selected={date}
  onChange={setDate}
  placeholder="Select date"
  showTime={false}
/>

// Date with time
<DatePicker
  selected={date}
  onChange={setDate}
  showTime
/>

// Date range with presets
<DateRangePicker
  selected={range}
  onChange={setRange}
  presets={true}
/>

// With min/max date
<DatePicker
  selected={date}
  onChange={setDate}
  minDate={new Date()}
  maxDate={maxDate}
/>`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}

export default function DatePickerPage() {
  return (
    <ToastProvider position="top-right">
      <DatePickerDemo />
    </ToastProvider>
  );
}

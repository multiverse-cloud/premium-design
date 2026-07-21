"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/data-display/card/Card";
import { DatePicker } from "@/components/forms/date-picker/DatePicker";
import { FormField } from "@/components/forms/form-field/FormField";

export default function DatePickerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Date Picker</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Date picker component for selecting dates
        </p>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Date Picker Examples</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField label="Select date">
            <DatePicker placeholder="Choose date..." />
          </FormField>
          
          <FormField label="With value">
            <DatePicker placeholder="Choose date..." defaultValue="2024-01-15" />
          </FormField>
        </CardContent>
      </Card>
    </div>
  );
}

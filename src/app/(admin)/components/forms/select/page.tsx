"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/data-display/card/Card";
import { Select, SelectItem } from "@/components/forms/select/Select";
import { FormField } from "@/components/forms/form-field/FormField";

export default function SelectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Select</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Dropdown select component
        </p>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Select Examples</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField label="Select an option">
            <Select placeholder="Choose...">
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3">Option 3</SelectItem>
            </Select>
          </FormField>
          
          <FormField label="Select with value">
            <Select defaultValue="option2">
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3">Option 3</SelectItem>
            </Select>
          </FormField>
        </CardContent>
      </Card>
    </div>
  );
}

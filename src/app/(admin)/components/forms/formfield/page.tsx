"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/data-display/card/Card";
import { FormField } from "@/components/forms/form-field/FormField";
import { Input } from "@/components/forms/input/Input";

export default function FormFieldPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Form Field</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Wrapper component for form inputs with labels and helper text
        </p>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Form Field Examples</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField label="Default field">
            <Input placeholder="Enter text..." />
          </FormField>
          
          <FormField label="Required field" required>
            <Input placeholder="Required field" />
          </FormField>
          
          <FormField label="Field with helper" helperText="This is a helpful hint">
            <Input placeholder="With helper text" />
          </FormField>
          
          <FormField label="Field with error" error="This field is required">
            <Input placeholder="Error state" />
          </FormField>
        </CardContent>
      </Card>
    </div>
  );
}

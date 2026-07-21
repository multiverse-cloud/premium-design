"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/data-display/card/Card";
import { Textarea } from "@/components/forms/textarea/Textarea";
import { FormField } from "@/components/forms/form-field/FormField";

export default function TextareaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Textarea</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Multi-line text input component
        </p>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Textarea Examples</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField label="Default Textarea">
            <Textarea placeholder="Enter description..." />
          </FormField>
          
          <FormField label="Disabled Textarea">
            <Textarea placeholder="Disabled" disabled />
          </FormField>
          
          <FormField label="Textarea with Error">
            <Textarea placeholder="Error state" error />
          </FormField>
        </CardContent>
      </Card>
    </div>
  );
}

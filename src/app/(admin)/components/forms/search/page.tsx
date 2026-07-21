"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/data-display/card/Card";
import { SearchInput } from "@/components/forms/search-input/SearchInput";
import { FormField } from "@/components/forms/form-field/FormField";

export default function SearchInputPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Search Input</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Search input with icon
        </p>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Search Input Examples</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField label="Search">
            <SearchInput placeholder="Search..." />
          </FormField>
          
          <FormField label="Search with value">
            <SearchInput placeholder="Search..." defaultValue="Search term" />
          </FormField>
        </CardContent>
      </Card>
    </div>
  );
}

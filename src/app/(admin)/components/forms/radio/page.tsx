"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/data-display/card/Card";
import { Radio, RadioGroup } from "@/components/forms/radio/Radio";

export default function RadioPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Radio</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Radio input component for single selection from options
        </p>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Radio Examples</h3>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup label="Select an option">
            <Radio label="Option A" value="a" name="demo" />
            <Radio label="Option B" value="b" name="demo" />
            <Radio label="Option C" value="c" name="demo" />
          </RadioGroup>
          
          <RadioGroup label="Disabled radio group">
            <Radio label="Disabled A" value="a" name="demo2" disabled />
            <Radio label="Disabled B" value="b" name="demo2" disabled />
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
}

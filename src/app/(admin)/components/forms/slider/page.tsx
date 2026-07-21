"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/data-display/card/Card";
import { Slider } from "@/components/forms/slider/Slider";

export default function SliderPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Slider</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Slider component for selecting values
        </p>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Slider Examples</h3>
        </CardHeader>
        <CardContent className="space-y-8">
          <div>
            <p className="text-sm font-medium mb-2">Default Slider</p>
            <Slider defaultValue={[50]} max={100} />
          </div>
          
          <div>
            <p className="text-sm font-medium mb-2">Slider with range</p>
            <Slider defaultValue={[25, 75]} max={100} />
          </div>
          
          <div>
            <p className="text-sm font-medium mb-2">Disabled Slider</p>
            <Slider defaultValue={[50]} max={100} disabled />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

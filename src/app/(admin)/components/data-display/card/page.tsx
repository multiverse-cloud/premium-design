"use client";

import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/data-display/card/Card";
import { Button } from "@/components/ui/button/Button";

export default function CardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Card</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Container component for grouping content
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Card Title</h3>
            <p className="text-sm text-gray-500">Card description</p>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              This is the card content area. You can put any content here including text, images, or other components.
            </p>
          </CardContent>
          <CardFooter>
            <Button size="sm">Action</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              Simple card with only content
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

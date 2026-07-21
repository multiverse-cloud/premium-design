"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/data-display/card/Card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/data-display/tabs/Tabs";

export default function TabsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Tabs</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Tabbed interface component
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <p className="text-gray-600 dark:text-gray-400 py-4">
                This is the overview tab content.
              </p>
            </TabsContent>
            <TabsContent value="analytics">
              <p className="text-gray-600 dark:text-gray-400 py-4">
                Analytics data would appear here.
              </p>
            </TabsContent>
            <TabsContent value="reports">
              <p className="text-gray-600 dark:text-gray-400 py-4">
                Reports would appear here.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

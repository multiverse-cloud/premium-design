"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/data-display/card/Card";
import { Pagination } from "@/components/navigation/pagination/Pagination";

export default function PaginationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Pagination</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Pagination component for navigating through pages
        </p>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Pagination Examples</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div>
              <p className="text-sm font-medium mb-2">Default</p>
              <Pagination
                currentPage={3}
                totalPages={10}
                onPageChange={(page) => console.log("Page:", page)}
              />
            </div>
            
            <div>
              <p className="text-sm font-medium mb-2">First page</p>
              <Pagination
                currentPage={1}
                totalPages={10}
                onPageChange={(page) => console.log("Page:", page)}
              />
            </div>
            
            <div>
              <p className="text-sm font-medium mb-2">Last page</p>
              <Pagination
                currentPage={10}
                totalPages={10}
                onPageChange={(page) => console.log("Page:", page)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

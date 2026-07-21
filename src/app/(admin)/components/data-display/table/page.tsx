"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/data-display/card/Card";
import { Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell } from "@/components/data-display/table/Table";
import { Badge } from "@/components/ui/badge/Badge";

export default function TablePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Table</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Data table component for displaying structured data
        </p>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Users Table</h3>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Email</TableHeaderCell>
                <TableHeaderCell>Role</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell variant="muted">john@example.com</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell><Badge color="success">Active</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Jane Smith</TableCell>
                <TableCell variant="muted">jane@example.com</TableCell>
                <TableCell>Editor</TableCell>
                <TableCell><Badge color="warning">Pending</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bob Wilson</TableCell>
                <TableCell variant="muted">bob@example.com</TableCell>
                <TableCell>Viewer</TableCell>
                <TableCell><Badge color="error">Inactive</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

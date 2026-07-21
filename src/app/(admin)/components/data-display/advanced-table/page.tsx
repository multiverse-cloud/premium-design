"use client";

import React, { useState } from "react";
import { AdvancedTable, Column } from "@/components/data-display/advanced-table/AdvancedTable";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { 
  EditIcon, 
  TrashBinIcon, 
  EyeIcon, 
  CopyIcon, 
  DownloadIcon
} from "@/icons";

interface User {
  id: string | number;
  name: string;
  email: string;
  role: string;
  status: "active" | "pending" | "inactive";
  department: string;
  joinDate: string;
  projects: number;
}

const sampleUsers: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "active", department: "Engineering", joinDate: "2023-01-15", projects: 12 },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Developer", status: "active", department: "Engineering", joinDate: "2023-02-20", projects: 8 },
  { id: 3, name: "Carol Williams", email: "carol@example.com", role: "Designer", status: "pending", department: "Design", joinDate: "2023-03-10", projects: 5 },
  { id: 4, name: "David Brown", email: "david@example.com", role: "Manager", status: "active", department: "Operations", joinDate: "2022-11-05", projects: 15 },
  { id: 5, name: "Emma Davis", email: "emma@example.com", role: "Developer", status: "inactive", department: "Engineering", joinDate: "2022-08-22", projects: 3 },
  { id: 6, name: "Frank Miller", email: "frank@example.com", role: "Analyst", status: "active", department: "Finance", joinDate: "2023-04-18", projects: 7 },
  { id: 7, name: "Grace Lee", email: "grace@example.com", role: "Designer", status: "active", department: "Design", joinDate: "2023-05-25", projects: 9 },
  { id: 8, name: "Henry Wilson", email: "henry@example.com", role: "Developer", status: "pending", department: "Engineering", joinDate: "2023-06-12", projects: 4 },
  { id: 9, name: "Ivy Taylor", email: "ivy@example.com", role: "Manager", status: "active", department: "Marketing", joinDate: "2022-09-30", projects: 11 },
  { id: 10, name: "Jack Anderson", email: "jack@example.com", role: "Admin", status: "active", department: "Operations", joinDate: "2022-07-14", projects: 6 },
  { id: 11, name: "Karen Thomas", email: "karen@example.com", role: "Analyst", status: "inactive", department: "Finance", joinDate: "2022-10-08", projects: 2 },
  { id: 12, name: "Leo Martinez", email: "leo@example.com", role: "Developer", status: "active", department: "Engineering", joinDate: "2023-07-01", projects: 10 },
  { id: 13, name: "Mia Garcia", email: "mia@example.com", role: "Designer", status: "active", department: "Design", joinDate: "2023-08-15", projects: 8 },
  { id: 14, name: "Noah Rodriguez", email: "noah@example.com", role: "Manager", status: "pending", department: "Operations", joinDate: "2023-09-22", projects: 5 },
  { id: 15, name: "Olivia Lopez", email: "olivia@example.com", role: "Developer", status: "active", department: "Engineering", joinDate: "2023-10-30", projects: 3 },
];

const statusColors = {
  active: "success" as const,
  pending: "warning" as const,
  inactive: "error" as const,
};

const roleColors: Record<string, "primary" | "info" | "success" | "warning" | "gray"> = {
  Admin: "primary",
  Developer: "info",
  Designer: "success",
  Manager: "warning",
  Analyst: "gray",
};

export default function AdvancedTablePage() {
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const [loading, setLoading] = useState(false);

  const columns: Column<User>[] = [
    {
      key: "name",
      title: "Name",
      sortable: true,
      filterable: true,
      render: (value) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900 flex items-center justify-center text-brand-600 dark:text-brand-400 font-medium">
            {String(value).split(" ").map(n => n[0]).join("")}
          </div>
          <span className="font-medium">{String(value)}</span>
        </div>
      ),
    },
    {
      key: "email",
      title: "Email",
      sortable: true,
      filterable: true,
      render: (value) => (
        <span className="text-gray-500 dark:text-gray-400">{String(value)}</span>
      ),
    },
    {
      key: "role",
      title: "Role",
      sortable: true,
      filterable: true,
      filterType: "select",
      filterOptions: [
        { label: "Admin", value: "Admin" },
        { label: "Developer", value: "Developer" },
        { label: "Designer", value: "Designer" },
        { label: "Manager", value: "Manager" },
        { label: "Analyst", value: "Analyst" },
      ],
      render: (value) => (
        <Badge color={roleColors[String(value)] || "gray"}>
          {String(value)}
        </Badge>
      ),
    },
    {
      key: "status",
      title: "Status",
      sortable: true,
      filterable: true,
      filterType: "select",
      filterOptions: [
        { label: "Active", value: "active" },
        { label: "Pending", value: "pending" },
        { label: "Inactive", value: "inactive" },
      ],
      render: (value) => (
        <Badge color={statusColors[value as keyof typeof statusColors] || "gray"}>
          {String(value).charAt(0).toUpperCase() + String(value).slice(1)}
        </Badge>
      ),
    },
    {
      key: "department",
      title: "Department",
      sortable: true,
      filterable: true,
      filterType: "select",
      filterOptions: [
        { label: "Engineering", value: "Engineering" },
        { label: "Design", value: "Design" },
        { label: "Operations", value: "Operations" },
        { label: "Finance", value: "Finance" },
        { label: "Marketing", value: "Marketing" },
      ],
    },
    {
      key: "projects",
      title: "Projects",
      sortable: true,
      align: "center",
      render: (value) => (
        <div className="flex items-center justify-center gap-2">
          <div className="w-8 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-500 rounded-full"
              style={{ width: `${(Number(value) / 15) * 100}%` }}
            />
          </div>
          <span className="text-sm font-medium">{String(value)}</span>
        </div>
      ),
    },
    {
      key: "joinDate",
      title: "Join Date",
      sortable: true,
      filterable: true,
    },
  ];

  const rowActions = [
    {
      label: "View Details",
      icon: <EyeIcon className="h-4 w-4" />,
      onClick: (row: User) => console.log("View", row),
    },
    {
      label: "Edit",
      icon: <EditIcon className="h-4 w-4" />,
      onClick: (row: User) => console.log("Edit", row),
    },
    {
      label: "Duplicate",
      icon: <CopyIcon className="h-4 w-4" />,
      onClick: (row: User) => console.log("Duplicate", row),
    },
    {
      label: "Delete",
      icon: <TrashBinIcon className="h-4 w-4" />,
      variant: "danger" as const,
      onClick: (row: User) => console.log("Delete", row),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Advanced Table</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Feature-rich data table with sorting, filtering, pagination, row selection, and expandable rows
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setLoading(true)}
          disabled={loading}
        >
          {loading ? "Loading..." : "Simulate Loading"}
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setLoading(false)}
        >
          Stop Loading
        </Button>
      </div>

      <AdvancedTable
        columns={columns}
        data={sampleUsers}
        title="Team Members"
        subtitle="Manage your team members and their account permissions"
        selectable
        sortable
        filterable
        searchable
        pagination
        pageSize={10}
        expandable
        expandContent={(row) => (
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-500">Full Name</p>
              <p className="font-medium">{row.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="font-medium">{row.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Department</p>
              <p className="font-medium">{row.department}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Join Date</p>
              <p className="font-medium">{row.joinDate}</p>
            </div>
          </div>
        )}
        rowActions={rowActions}
        loading={loading}
        onSelectionChange={setSelectedIds}
        bulkActions={[
          {
            label: "Delete",
            icon: <TrashBinIcon className="h-4 w-4" />,
            onClick: (ids) => console.log("Delete", ids),
          },
          {
            label: "Export",
            icon: <DownloadIcon className="h-4 w-4" />,
            onClick: (ids) => console.log("Export", ids),
          },
        ]}
      />

      {selectedIds.length > 0 && (
        <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded-lg p-4">
          <p className="text-sm font-medium text-brand-700 dark:text-brand-300">
            Selected {selectedIds.length} item{selectedIds.length > 1 ? "s" : ""}
          </p>
        </div>
      )}
    </div>
  );
}

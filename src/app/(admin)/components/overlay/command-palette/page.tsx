"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/data-display/card/Card";
import { Button } from "@/components/ui/button/Button";
import { CommandPalette, useCommandPalette, CommandItem } from "@/components/overlay/command-palette/CommandPalette";

// Icons
const HomeIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const BellIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const FileIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

const CopyIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
  </svg>
);

const ExportIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
);

// Demo items
const demoItems: CommandItem[] = [
  {
    id: "dashboard",
    label: "Go to Dashboard",
    description: "Navigate to the main dashboard",
    icon: <HomeIcon />,
    category: "Navigation",
    shortcut: ["G", "D"],
    action: () => console.log("Navigate to Dashboard"),
  },
  {
    id: "analytics",
    label: "Go to Analytics",
    description: "View analytics and reports",
    icon: <ChartIcon />,
    category: "Navigation",
    shortcut: ["G", "A"],
    action: () => console.log("Navigate to Analytics"),
  },
  {
    id: "users",
    label: "Go to Users",
    description: "Manage user accounts",
    icon: <UserIcon />,
    category: "Navigation",
    shortcut: ["G", "U"],
    action: () => console.log("Navigate to Users"),
  },
  {
    id: "settings",
    label: "Go to Settings",
    description: "Configure application settings",
    icon: <SettingsIcon />,
    category: "Navigation",
    shortcut: ["G", "S"],
    action: () => console.log("Navigate to Settings"),
  },
  {
    id: "notifications",
    label: "View Notifications",
    description: "See recent notifications",
    icon: <BellIcon />,
    category: "Navigation",
    shortcut: ["N"],
    action: () => console.log("View Notifications"),
  },
  {
    id: "create-project",
    label: "Create New Project",
    description: "Start a new project",
    icon: <PlusIcon />,
    category: "Actions",
    shortcut: ["C"],
    action: () => console.log("Create Project"),
  },
  {
    id: "search",
    label: "Search Everything",
    description: "Search across all content",
    icon: <SearchIcon />,
    category: "Actions",
    shortcut: ["/"],
    action: () => console.log("Search"),
  },
  {
    id: "export-data",
    label: "Export Data",
    description: "Download data as CSV or Excel",
    icon: <DownloadIcon />,
    category: "Actions",
    shortcut: ["E"],
    action: () => console.log("Export Data"),
  },
  {
    id: "duplicate",
    label: "Duplicate Selection",
    description: "Copy selected items",
    icon: <CopyIcon />,
    category: "Actions",
    shortcut: ["D"],
    action: () => console.log("Duplicate"),
  },
  {
    id: "delete",
    label: "Delete Selected",
    description: "Remove selected items permanently",
    icon: <TrashIcon />,
    category: "Actions",
    action: () => console.log("Delete"),
  },
  {
    id: "backup",
    label: "Backup Database",
    description: "Create a database backup",
    icon: <ExportIcon />,
    category: "Admin",
    action: () => console.log("Backup"),
  },
  {
    id: "files",
    label: "Manage Files",
    description: "Upload and manage files",
    icon: <FileIcon />,
    category: "Content",
    action: () => console.log("Manage Files"),
  },
];

export default function CommandPalettePage() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { open, setOpen } = useCommandPalette(demoItems);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Command Palette</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Quick command search with fuzzy matching and keyboard navigation
        </p>
      </div>

      {/* Manual Trigger */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Try It</h3>
          <p className="text-sm text-gray-500">Click the button or press ⌘K to open the command palette</p>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setIsOpen(true)}>
            Open Command Palette
          </Button>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Features</h3>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Fuzzy search with Fuse.js
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Keyboard navigation
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Grouped results by category
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Keyboard shortcuts display
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Command history
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Dark mode support
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Custom icons
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Disabled state
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Hover selection
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Available Commands */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Available Commands</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {demoItems.map(item => (
              <div 
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
              >
                <div className="flex items-center gap-3">
                  <span className="text-gray-400">{item.icon}</span>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
                {item.shortcut && (
                  <div className="flex items-center gap-1">
                    {item.shortcut.map((key, idx) => (
                      <kbd 
                        key={idx}
                        className="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-200 dark:bg-gray-700 rounded"
                      >
                        {key}
                      </kbd>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Command Palettes */}
      <CommandPalette
        open={isOpen}
        onOpenChange={setIsOpen}
        items={demoItems}
      />

      {open && (
        <CommandPalette
          open={open}
          onOpenChange={setOpen}
          items={demoItems}
        />
      )}
    </div>
  );
}

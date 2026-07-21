"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/data-display/card/Card";
import { KanbanBoard, KanbanColumn, KanbanCard } from "@/components/scheduling/kanban/KanbanBoard";
import { Button } from "@/components/ui/button/Button";
import { ToastProvider, useToastHelpers } from "@/components/overlay/toast/Toast";

// Sample data
const initialColumns: KanbanColumn[] = [
  {
    id: "backlog",
    title: "Backlog",
    color: "#6b7280",
    cards: [
      {
        id: "1",
        title: "Research competitor products",
        description: "Analyze top 5 competitors and document their features",
        priority: "low",
        tags: ["research", "ux"],
        assignee: { name: "Sarah Chen", color: "#8b5cf6" },
        dueDate: "Mar 15",
      },
      {
        id: "2",
        title: "Design system documentation",
        description: "Create comprehensive docs for all UI components",
        priority: "medium",
        tags: ["documentation"],
        assignee: { name: "Alex Kim", color: "#06b6d4" },
        comments: 3,
      },
    ],
  },
  {
    id: "todo",
    title: "To Do",
    color: "#3b82f6",
    cards: [
      {
        id: "3",
        title: "Implement user authentication",
        description: "Add OAuth2 and email/password login options",
        priority: "high",
        tags: ["backend", "security"],
        assignee: { name: "Mike Johnson", color: "#10b981" },
        dueDate: "Mar 20",
        comments: 5,
        attachments: 2,
      },
      {
        id: "4",
        title: "Create onboarding flow",
        description: "Design and implement new user onboarding",
        priority: "high",
        tags: ["ux", "frontend"],
        assignee: { name: "Emma Davis", color: "#f59e0b" },
        comments: 8,
      },
      {
        id: "5",
        title: "Setup CI/CD pipeline",
        priority: "medium",
        tags: ["devops"],
        assignee: { name: "Chris Lee", color: "#ef4444" },
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    color: "#f59e0b",
    cards: [
      {
        id: "6",
        title: "Build dashboard charts",
        description: "Implement line, bar, and pie charts for analytics",
        priority: "high",
        tags: ["frontend", "charts"],
        assignee: { name: "Sarah Chen", color: "#8b5cf6" },
        dueDate: "Mar 18",
        comments: 12,
        attachments: 4,
      },
      {
        id: "7",
        title: "API rate limiting",
        priority: "urgent",
        tags: ["backend", "security"],
        assignee: { name: "Mike Johnson", color: "#10b981" },
        dueDate: "Mar 16",
        comments: 6,
      },
    ],
    limit: 3,
  },
  {
    id: "review",
    title: "Code Review",
    color: "#8b5cf6",
    cards: [
      {
        id: "8",
        title: "Refactor database queries",
        description: "Optimize slow queries in the reports module",
        priority: "medium",
        tags: ["backend", "performance"],
        assignee: { name: "Alex Kim", color: "#06b6d4" },
        comments: 4,
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    color: "#10b981",
    cards: [
      {
        id: "9",
        title: "Setup project repository",
        priority: "low",
        assignee: { name: "Chris Lee", color: "#ef4444" },
      },
      {
        id: "10",
        title: "Create wireframes",
        priority: "medium",
        tags: ["design"],
        assignee: { name: "Emma Davis", color: "#f59e0b" },
        comments: 2,
      },
    ],
  },
];

function KanbanDemo() {
  const toast = useToastHelpers();
  const [columns, setColumns] = React.useState(initialColumns);

  const handleCardMove = (cardId: string, from: string, to: string, index: number) => {
    const fromColumn = columns.find(c => c.id === from);
    const toColumn = columns.find(c => c.id === to);
    const card = fromColumn?.cards.find(c => c.id === cardId);
    
    if (card) {
      toast.success(
        "Card Moved",
        `Moved "${card.title}" to ${toColumn?.title}`
      );
    }
  };

  const handleCardClick = (card: KanbanCard, columnId: string) => {
    toast.info(
      "Card Selected",
      `Viewing ${card.title} from ${columns.find(c => c.id === columnId)?.title}`
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Kanban Board</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Drag and drop cards between columns to manage your workflow
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Export
          </Button>
          <Button size="sm">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Card
          </Button>
        </div>
      </div>

      <KanbanBoard
        columns={columns}
        onCardMove={handleCardMove}
        onCardClick={handleCardClick}
      />

      {/* Features */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Features</h3>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Drag and drop cards
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Column limits
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Priority badges
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Assignee avatars
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Due dates
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Comments count
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Attachments count
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Tags/labels
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Collapsible columns
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Custom colors
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Add card buttons
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Dark mode support
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Card States */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Card with All Elements</h3>
          </CardHeader>
          <CardContent>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 max-w-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-error-100 text-error-600 dark:bg-error-900 dark:text-error-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                  urgent
                </span>
              </div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                Fix critical bug in checkout
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                Payment processing fails for orders over $1000
              </p>
              <div className="flex flex-wrap gap-1 mb-3">
                <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">bug</span>
                <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">urgent</span>
                <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">payment</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-purple-500 flex items-center justify-center text-xs font-medium text-white">JD</div>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                    Mar 16
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="flex items-center gap-1 text-xs">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                    6
                  </span>
                  <span className="flex items-center gap-1 text-xs">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                    </svg>
                    2
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Priority Levels</h3>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
                Low
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium bg-info-100 text-info-600 dark:bg-info-900 dark:text-info-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                </svg>
                Medium
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium bg-warning-100 text-warning-600 dark:bg-warning-900 dark:text-warning-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
                High
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium bg-error-100 text-error-600 dark:bg-error-900 dark:text-error-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                Urgent
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function KanbanPage() {
  return (
    <ToastProvider position="top-right">
      <KanbanDemo />
    </ToastProvider>
  );
}

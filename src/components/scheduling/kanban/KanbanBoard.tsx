"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  priority?: "low" | "medium" | "high" | "urgent";
  tags?: string[];
  assignee?: {
    name: string;
    avatar?: string;
    color?: string;
  };
  dueDate?: string;
  comments?: number;
  attachments?: number;
  [key: string]: unknown;
}

export interface KanbanColumn {
  id: string;
  title: string;
  color?: string;
  cards: KanbanCard[];
  limit?: number;
}

export interface KanbanBoardProps {
  columns: KanbanColumn[];
  onCardMove?: (cardId: string, fromColumn: string, toColumn: string, newIndex: number) => void;
  onCardClick?: (card: KanbanCard, columnId: string) => void;
  onColumnUpdate?: (column: KanbanColumn) => void;
  onCardUpdate?: (card: KanbanCard, columnId: string) => void;
  enableDragAndDrop?: boolean;
  maxHeight?: number;
  className?: string;
}

// Priority colors
const priorityColors = {
  low: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  medium: "bg-info-100 text-info-600 dark:bg-info-900 dark:text-info-400",
  high: "bg-warning-100 text-warning-600 dark:bg-warning-900 dark:text-warning-400",
  urgent: "bg-error-100 text-error-600 dark:bg-error-900 dark:text-error-400",
};

const priorityIcons = {
  low: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
    </svg>
  ),
  medium: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
    </svg>
  ),
  high: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
    </svg>
  ),
  urgent: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  ),
};

// Avatar component
function Avatar({ 
  name, 
  avatar, 
  color = "#3b82f6" 
}: { 
  name: string; 
  avatar?: string; 
  color?: string;
}) {
  const initials = name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (avatar) {
    return (
      <img 
        src={avatar} 
        alt={name} 
        className="w-7 h-7 rounded-full object-cover ring-2 ring-white dark:ring-gray-800"
      />
    );
  }

  return (
    <div 
      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium text-white ring-2 ring-white dark:ring-gray-800"
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}

// Kanban Card Component
function KanbanCardComponent({
  card,
  columnId,
  onClick,
  isDragging,
}: {
  card: KanbanCard;
  columnId: string;
  onClick?: () => void;
  isDragging?: boolean;
}) {
  return (
    <div
      className={cn(
        "group bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 cursor-pointer transition-all hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600",
        isDragging && "opacity-50 shadow-lg rotate-2"
      )}
      onClick={onClick}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("cardId", card.id);
        e.dataTransfer.setData("columnId", columnId);
      }}
    >
      {/* Priority Badge */}
      {card.priority && (
        <div className="flex items-center gap-2 mb-2">
          <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium", priorityColors[card.priority])}>
            {priorityIcons[card.priority]}
            {card.priority}
          </span>
        </div>
      )}

      {/* Title */}
      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1 line-clamp-2">
        {card.title}
      </h4>

      {/* Description */}
      {card.description && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
          {card.description}
        </p>
      )}

      {/* Tags */}
      {card.tags && card.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {card.tags.slice(0, 3).map((tag, idx) => (
            <span 
              key={idx}
              className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded"
            >
              {tag}
            </span>
          ))}
          {card.tags.length > 3 && (
            <span className="px-2 py-0.5 text-gray-500 text-xs">
              +{card.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3">
          {/* Assignee */}
          {card.assignee && (
            <Avatar 
              name={card.assignee.name} 
              avatar={card.assignee.avatar}
              color={card.assignee.color}
            />
          )}

          {/* Due Date */}
          {card.dueDate && (
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              {card.dueDate}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-gray-400">
          {card.comments !== undefined && card.comments > 0 && (
            <span className="flex items-center gap-1 text-xs">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
              {card.comments}
            </span>
          )}
          {card.attachments !== undefined && card.attachments > 0 && (
            <span className="flex items-center gap-1 text-xs">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
              </svg>
              {card.attachments}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// Kanban Column Component
function KanbanColumnComponent({
  column,
  onCardClick,
  onCardDrop,
  isDragOver,
  onDragOver,
  onDragLeave,
}: {
  column: KanbanColumn;
  onCardClick?: (card: KanbanCard) => void;
  onCardDrop?: (cardId: string, columnId: string) => void;
  isDragOver?: boolean;
  onDragOver?: () => void;
  onDragLeave?: () => void;
}) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <div
      className={cn(
        "flex-shrink-0 w-80 bg-gray-50 dark:bg-gray-900/50 rounded-xl transition-colors",
        isDragOver && "bg-brand-50 dark:bg-brand-900/20"
      )}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver?.();
      }}
      onDragLeave={onDragLeave}
      onDrop={(e) => {
        e.preventDefault();
        const cardId = e.dataTransfer.getData("cardId");
        onCardDrop?.(cardId, column.id);
      }}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          {column.color && (
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: column.color }}
            />
          )}
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {column.title}
          </h3>
          <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-full">
            {column.cards.length}
            {column.limit && `/${column.limit}`}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <svg 
              className={cn("w-4 h-4 text-gray-500 transition-transform", isCollapsed && "-rotate-90")} 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          <button className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Cards */}
      {!isCollapsed && (
        <div className="px-4 pb-4 space-y-3 overflow-y-auto" style={{ maxHeight: 500 }}>
          {column.cards.map((card) => (
            <KanbanCardComponent
              key={card.id}
              card={card}
              columnId={column.id}
              onClick={() => onCardClick?.(card)}
            />
          ))}
          
          {/* Add Card Button */}
          <button className="w-full p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 hover:border-brand-500 hover:text-brand-500 transition-colors flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add card
          </button>
        </div>
      )}
    </div>
  );
}

// Main Kanban Board Component
export function KanbanBoard({
  columns: initialColumns,
  onCardMove,
  onCardClick,
  onCardUpdate,
  enableDragAndDrop = true,
  maxHeight = 700,
  className,
}: KanbanBoardProps) {
  const [columns, setColumns] = React.useState(initialColumns);
  const [dragOverColumn, setDragOverColumn] = React.useState<string | null>(null);

  // Update columns when props change
  React.useEffect(() => {
    setColumns(initialColumns);
  }, [initialColumns]);

  const handleCardDrop = (cardId: string, toColumnId: string) => {
    if (!enableDragAndDrop) return;

    // Find the card and its original column
    let card: KanbanCard | undefined;
    let fromColumnId: string | undefined;
    
    for (const col of columns) {
      const found = col.cards.find(c => c.id === cardId);
      if (found) {
        card = found;
        fromColumnId = col.id;
        break;
      }
    }

    if (!card || !fromColumnId) return;

    // Remove card from original column
    setColumns(prev => {
      const newColumns = prev.map(col => ({
        ...col,
        cards: col.cards.filter(c => c.id !== cardId),
      }));

      // Add card to new column
      return newColumns.map(col => {
        if (col.id === toColumnId) {
          return {
            ...col,
            cards: [...col.cards, card!],
          };
        }
        return col;
      });
    });

    // Call the callback
    onCardMove?.(cardId, fromColumnId, toColumnId, 0);
    setDragOverColumn(null);
  };

  return (
    <div 
      className={cn("flex gap-4 overflow-x-auto pb-4", className)}
      style={{ maxHeight }}
    >
      {columns.map((column) => (
        <KanbanColumnComponent
          key={column.id}
          column={column}
          onCardClick={(card) => onCardClick?.(card, column.id)}
          onCardDrop={handleCardDrop}
          isDragOver={dragOverColumn === column.id}
          onDragOver={() => setDragOverColumn(column.id)}
          onDragLeave={() => setDragOverColumn(null)}
        />
      ))}

      {/* Add Column Button */}
      <button className="flex-shrink-0 w-80 h-fit p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-500 hover:border-brand-500 hover:text-brand-500 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors flex items-center justify-center gap-2">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Add Column
      </button>
    </div>
  );
}

"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { SearchIcon, CloseIcon } from "@/icons";

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  category?: string;
  shortcut?: string[];
  action: () => void;
  disabled?: boolean;
  keywords?: string[];
}

export interface CommandGroup {
  name: string;
  items: CommandItem[];
}

export interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groups?: CommandGroup[];
  items?: CommandItem[];
  placeholder?: string;
  emptyMessage?: string;
  maxHeight?: number;
  className?: string;
}

// Fuse.js for fuzzy search
type FuseType = typeof import("fuse.js").default;
let Fuse: FuseType | null = null;

async function loadFuse(): Promise<FuseType> {
  if (!Fuse) {
    const module = await import("fuse.js");
    Fuse = module.default;
  }
  return Fuse;
}

export function CommandPalette({
  open,
  onOpenChange,
  groups = [],
  items = [],
  placeholder = "Type a command or search...",
  emptyMessage = "No results found.",
  maxHeight = 400,
  className,
}: CommandPaletteProps) {
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [results, setResults] = React.useState<CommandItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  // All items flat
  const allItems = React.useMemo(() => {
    const flatItems = groups.flatMap(g => g.items).concat(items);
    return flatItems;
  }, [groups, items]);

  // Fuzzy search
  React.useEffect(() => {
    if (!query.trim()) {
      setResults(allItems.slice(0, 10));
      setSelectedIndex(0);
      return;
    }

    const search = async () => {
      setIsLoading(true);
      try {
        const FuseClass = await loadFuse();
        const fuse = new FuseClass(allItems, {
          keys: [
            { name: "label", weight: 0.4 },
            { name: "description", weight: 0.2 },
            { name: "keywords", weight: 0.2 },
            { name: "category", weight: 0.1 },
          ],
          threshold: 0.4,
          includeMatches: true,
        });

        const searchResults = fuse.search(query).slice(0, 10);
        setResults(searchResults.map(r => r.item));
        setSelectedIndex(0);
      } catch (error) {
        // Fallback to simple filter
        const filtered = allItems.filter(item =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase()) ||
          item.keywords?.some(k => k.toLowerCase().includes(query.toLowerCase()))
        );
        setResults(filtered.slice(0, 10));
        setSelectedIndex(0);
      }
      setIsLoading(false);
    };

    search();
  }, [query, allItems]);

  // Focus input when opened
  React.useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (results[selectedIndex] && !results[selectedIndex].disabled) {
          results[selectedIndex].action();
          onOpenChange(false);
        }
        break;
      case "Escape":
        e.preventDefault();
        onOpenChange(false);
        break;
    }
  };

  // Scroll selected item into view
  React.useEffect(() => {
    if (listRef.current) {
      const selectedEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      selectedEl?.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  // Group results by category
  const groupedResults = React.useMemo(() => {
    const grouped: { [key: string]: CommandItem[] } = {};
    
    results.forEach(item => {
      const category = item.category || "Actions";
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(item);
    });
    
    return grouped;
  }, [results]);

  // Flat index for navigation
  const getFlatIndex = (category: string, itemIndex: number) => {
    let index = 0;
    for (const [cat, catItems] of Object.entries(groupedResults)) {
      if (cat === category) {
        return index + itemIndex;
      }
      index += catItems.length;
    }
    return 0;
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Dialog */}
      <div className="relative flex items-start justify-center pt-[15vh] px-4">
        <div 
          className={cn(
            "relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-premium border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in-up",
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 border-b border-gray-100 dark:border-gray-800">
            <SearchIcon className="w-5 h-5 text-gray-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="flex-1 py-4 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 outline-none text-base"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <CloseIcon className="w-4 h-4 text-gray-400" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 rounded">
              <span>esc</span>
            </kbd>
          </div>

          {/* Results */}
          <div 
            ref={listRef}
            className="overflow-y-auto"
            style={{ maxHeight }}
          >
            {isLoading ? (
              <div className="px-4 py-8 text-center text-gray-500">
                <div className="inline-flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Searching...</span>
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                <p>{emptyMessage}</p>
                {query && (
                  <p className="mt-1 text-sm">
                    Try searching for something else
                  </p>
                )}
              </div>
            ) : (
              <div className="py-2">
                {Object.entries(groupedResults).map(([category, categoryItems]) => (
                  <div key={category}>
                    <div className="px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                      {category}
                    </div>
                    <div className="px-2">
                      {categoryItems.map((item, itemIndex) => {
                        const flatIndex = getFlatIndex(category, itemIndex);
                        const isSelected = selectedIndex === flatIndex;
                        
                        return (
                          <button
                            key={item.id}
                            data-index={flatIndex}
                            onClick={() => {
                              if (!item.disabled) {
                                item.action();
                                onOpenChange(false);
                              }
                            }}
                            onMouseEnter={() => setSelectedIndex(flatIndex)}
                            disabled={item.disabled}
                            className={cn(
                              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors",
                              isSelected && "bg-brand-50 dark:bg-brand-900/20",
                              item.disabled && "opacity-50 cursor-not-allowed"
                            )}
                          >
                            {item.icon && (
                              <span className={cn(
                                "shrink-0",
                                isSelected ? "text-brand-600 dark:text-brand-400" : "text-gray-400"
                              )}>
                                {item.icon}
                              </span>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className={cn(
                                "text-sm font-medium truncate",
                                isSelected ? "text-brand-600 dark:text-brand-400" : "text-gray-900 dark:text-white"
                              )}>
                                {item.label}
                              </p>
                              {item.description && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                  {item.description}
                                </p>
                              )}
                            </div>
                            {item.shortcut && item.shortcut.length > 0 && (
                              <div className="flex items-center gap-1 shrink-0">
                                {item.shortcut.map((key, idx) => (
                                  <kbd 
                                    key={idx}
                                    className="px-1.5 py-0.5 text-xs font-medium text-gray-400 bg-gray-100 dark:bg-gray-800 rounded"
                                  >
                                    {key}
                                  </kbd>
                                ))}
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-4 px-4 py-3 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">↓</kbd>
                <span>to navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">↵</kbd>
                <span>to select</span>
              </span>
            </div>
            <span>{results.length} results</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hook for managing command palette
export function useCommandPalette(items: CommandItem[], groups?: CommandGroup[]) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return {
    open,
    setOpen,
    CommandPaletteComponent: () => (
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        items={items}
        groups={groups}
      />
    ),
  };
}

"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { 
  ChevronUpIcon, 
  ChevronDownIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  SearchIcon,
  FilterIcon,
  XIcon,
  MoreDotIcon,
  SortAscIcon,
  SortDescIcon,
  RefreshIcon,
  DownloadIcon
} from "@/icons";
import { Checkbox } from "@/components/forms/checkbox/Checkbox";
import { Select, SelectItem } from "@/components/forms/select/Select";
import { Button } from "@/components/ui/button/Button";

// Types
export interface Column<T> {
  key: string;
  title: string;
  width?: string | number;
  minWidth?: string | number;
  sortable?: boolean;
  filterable?: boolean;
  filterType?: "text" | "select" | "date";
  filterOptions?: { label: string; value: string }[];
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
  sticky?: "left" | "right";
  align?: "left" | "center" | "right";
}

export interface SortConfig {
  key: string;
  direction: "asc" | "desc";
}

export interface FilterConfig {
  [key: string]: string;
}

export interface RowAction<T> {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: T) => void;
  variant?: "default" | "danger";
}

export interface AdvancedTableProps<T extends { id: string | number }> {
  columns: Column<T>[];
  data: T[];
  selectable?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  searchable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  rowActions?: RowAction<T>[];
  expandable?: boolean;
  expandContent?: (row: T) => React.ReactNode;
  loading?: boolean;
  emptyState?: React.ReactNode;
  onSort?: (sort: SortConfig | null) => void;
  onFilter?: (filter: FilterConfig) => void;
  onSearch?: (query: string) => void;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  onSelectionChange?: (selectedIds: (string | number)[]) => void;
  className?: string;
  title?: string;
  subtitle?: string;
  bulkActions?: {
    label: string;
    icon?: React.ReactNode;
    onClick: (selectedIds: (string | number)[]) => void;
  }[];
}

// Table Header Cell Component
function TableHeaderCell<T extends { id: string | number }>({
  column,
  sortConfig,
  onSort,
  onFilter,
  filterConfig,
}: {
  column: Column<T>;
  sortConfig: SortConfig | null;
  onSort: (key: string) => void;
  onFilter?: (key: string, value: string) => void;
  filterConfig: FilterConfig;
}) {
  const [filterOpen, setFilterOpen] = React.useState(false);
  
  const isSorted = sortConfig?.key === column.key;
  const sortIcon = isSorted 
    ? sortConfig?.direction === "asc" 
      ? <SortAscIcon className="h-4 w-4" />
      : <SortDescIcon className="h-4 w-4" />
    : <div className="h-4 w-4 opacity-30"><SortAscIcon className="h-4 w-4" /></div>;

  return (
    <th
      className={cn(
        "px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700",
        column.sticky === "left" && "sticky left-0 z-20 bg-gray-50 dark:bg-gray-800",
        column.sticky === "right" && "sticky right-0 z-20 bg-gray-50 dark:bg-gray-800",
        column.align === "center" && "text-center",
        column.align === "right" && "text-right"
      )}
      style={{ width: column.width, minWidth: column.minWidth }}
    >
      <div className="flex items-center gap-2">
        {column.sortable ? (
          <button
            onClick={() => onSort(column.key)}
            className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            {column.title}
            {sortIcon}
          </button>
        ) : (
          <span>{column.title}</span>
        )}
        
        {column.filterable && (
          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className={cn(
                "p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors",
                filterConfig[column.key] && "text-brand-500"
              )}
            >
              <FilterIcon className="h-3.5 w-3.5" />
            </button>
            
            {filterOpen && (
              <div className="absolute top-full left-0 mt-1 z-30">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2 min-w-[150px]">
                  {column.filterType === "select" && column.filterOptions ? (
                    <Select
                      value={filterConfig[column.key] || ""}
                      onValueChange={(value) => {
                        onFilter?.(column.key, value);
                        setFilterOpen(false);
                      }}
                      placeholder="Filter..."
                    >
                      <SelectItem value="">All</SelectItem>
                      {column.filterOptions.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </Select>
                  ) : (
                    <input
                      type="text"
                      placeholder="Filter..."
                      value={filterConfig[column.key] || ""}
                      onChange={(e) => onFilter?.(column.key, e.target.value)}
                      className="w-full px-2 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </th>
  );
}

// Main Advanced Table Component
function AdvancedTable<T extends { id: string | number }>({
  columns,
  data,
  selectable = false,
  sortable = true,
  filterable = true,
  searchable = true,
  pagination = true,
  pageSize: initialPageSize = 10,
  rowActions,
  expandable = false,
  expandContent,
  loading = false,
  emptyState,
  onSort,
  onFilter,
  onSearch,
  onPageChange,
  onPageSizeChange,
  onSelectionChange,
  className,
  title,
  subtitle,
  bulkActions,
}: AdvancedTableProps<T>) {
  // State
  const [sortConfig, setSortConfig] = React.useState<SortConfig | null>(null);
  const [filterConfig, setFilterConfig] = React.useState<FilterConfig>({});
  const [searchQuery, setSearchQuery] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(initialPageSize);
  const [selectedIds, setSelectedIds] = React.useState<(string | number)[]>([]);
  const [expandedRows, setExpandedRows] = React.useState<(string | number)[]>([]);
  const [actionMenuOpen, setActionMenuOpen] = React.useState<string | number | null>(null);

  // Sort handler
  const handleSort = (key: string) => {
    let newSort: SortConfig | null = null;
    
    if (sortConfig?.key === key) {
      if (sortConfig.direction === "asc") {
        newSort = { key, direction: "desc" };
      } else {
        newSort = null;
      }
    } else {
      newSort = { key, direction: "asc" };
    }
    
    setSortConfig(newSort);
    onSort?.(newSort);
  };

  // Filter handler
  const handleFilter = (key: string, value: string) => {
    const newFilter = { ...filterConfig };
    if (value) {
      newFilter[key] = value;
    } else {
      delete newFilter[key];
    }
    setFilterConfig(newFilter);
    setCurrentPage(1);
    onFilter?.(newFilter);
  };

  // Search handler with debounce
  const [debouncedSearch, setDebouncedSearch] = React.useState("");
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      onSearch?.(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  // Selection handlers
  const handleSelectAll = () => {
    if (selectedIds.length === filteredData.length) {
      setSelectedIds([]);
      onSelectionChange?.([]);
    } else {
      const allIds = filteredData.map(row => row.id);
      setSelectedIds(allIds);
      onSelectionChange?.(allIds);
    }
  };

  const handleSelectRow = (id: string | number) => {
    const newSelected = selectedIds.includes(id)
      ? selectedIds.filter(selectedId => selectedId !== id)
      : [...selectedIds, id];
    setSelectedIds(newSelected);
    onSelectionChange?.(newSelected);
  };

  // Expand handler
  const handleExpandRow = (id: string | number) => {
    setExpandedRows(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  // Filter and sort data
  const filteredData = React.useMemo(() => {
    let result = [...data];
    
    // Apply filters
    Object.entries(filterConfig).forEach(([key, value]) => {
      if (value) {
        result = result.filter(row => {
          const cellValue = String((row as Record<string, unknown>)[key] || "").toLowerCase();
          return cellValue.includes(value.toLowerCase());
        });
      }
    });
    
    // Apply search
    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      result = result.filter(row =>
        Object.values(row as Record<string, unknown>).some(val =>
          String(val || "").toLowerCase().includes(query)
        )
      );
    }
    
    // Apply sort
    if (sortConfig) {
      result.sort((a, b) => {
        const aVal = (a as Record<string, unknown>)[sortConfig.key];
        const bVal = (b as Record<string, unknown>)[sortConfig.key];
        
        if (aVal === bVal) return 0;
        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;
        
        const comparison = aVal < bVal ? -1 : 1;
        return sortConfig.direction === "asc" ? comparison : -comparison;
      });
    }
    
    return result;
  }, [data, filterConfig, debouncedSearch, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = pagination
    ? filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : filteredData;

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filterConfig, debouncedSearch]);

  // Active filters count
  const activeFiltersCount = Object.values(filterConfig).filter(Boolean).length;

  return (
    <div className={cn("bg-white dark:bg-gray-900 rounded-xl shadow-premium border border-gray-200 dark:border-gray-700 overflow-hidden", className)}>
      {/* Header */}
      {(title || searchable || filterable) && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between gap-4">
            <div>
              {title && (
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
              )}
              {subtitle && (
                <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              {searchable && (
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 w-64 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <XIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>
              )}
              
              <Button variant="outline" size="sm">
                <RefreshIcon className="h-4 w-4 mr-1" />
                Refresh
              </Button>
              
              <Button variant="outline" size="sm">
                <DownloadIcon className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
          </div>
          
          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs text-gray-500">Active filters:</span>
              {Object.entries(filterConfig).map(([key, value]) => {
                if (!value) return null;
                const column = columns.find(col => col.key === key);
                return (
                  <span
                    key={key}
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 rounded-full"
                  >
                    {column?.title}: {value}
                    <button
                      onClick={() => handleFilter(key, "")}
                      className="hover:text-brand-900"
                    >
                      <XIcon className="h-3 w-3" />
                    </button>
                  </span>
                );
              })}
              <button
                onClick={() => setFilterConfig({})}
                className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}

      {/* Bulk Actions Bar */}
      {selectedIds.length > 0 && bulkActions && (
        <div className="px-6 py-3 bg-brand-50 dark:bg-brand-900/20 border-b border-brand-200 dark:border-brand-800 flex items-center justify-between">
          <span className="text-sm font-medium text-brand-700 dark:text-brand-300">
            {selectedIds.length} item{selectedIds.length > 1 ? "s" : ""} selected
          </span>
          <div className="flex items-center gap-2">
            {bulkActions.map((action, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                onClick={() => action.onClick(selectedIds)}
              >
                {action.icon}
                {action.label}
              </Button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedIds([])}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              {selectable && (
                <th className="w-12 px-4 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <Checkbox
                    checked={selectedIds.length === paginatedData.length && paginatedData.length > 0}
                    onClick={handleSelectAll}
                  />
                </th>
              )}
              {expandable && (
                <th className="w-12 px-4 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700" />
              )}
              {columns.map(column => (
                <TableHeaderCell
                  key={column.key}
                  column={column}
                  sortConfig={sortable ? sortConfig : null}
                  onSort={handleSort}
                  onFilter={filterable ? handleFilter : undefined}
                  filterConfig={filterConfig}
                />
              ))}
              {rowActions && <th className="w-12 bg-gray-50 dark:bg-gray-800" />}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              // Loading skeleton
              Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx} className="border-b border-gray-100 dark:border-gray-800">
                  {selectable && <td className="px-4 py-4"><div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" /></td>}
                  {expandable && <td className="px-4 py-4"><div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" /></td>}
                  {columns.map(() => (
                    <td key={idx} className="px-4 py-4">
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" style={{ width: `${60 + (idx * 10) % 40}%` }} />
                    </td>
                  ))}
                  {rowActions && <td className="px-4 py-4"><div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" /></td>}
                </tr>
              ))
            ) : paginatedData.length === 0 ? (
              // Empty state
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0) + (rowActions ? 1 : 0)} className="px-6 py-16 text-center">
                  {emptyState || (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <SearchIcon className="h-8 w-8 text-gray-400" />
                      </div>
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">No results found</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {searchQuery || activeFiltersCount > 0
                          ? "Try adjusting your search or filter criteria"
                          : "No data available"}
                      </p>
                      {(searchQuery || activeFiltersCount > 0) && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSearchQuery("");
                            setFilterConfig({});
                          }}
                        >
                          Clear all filters
                        </Button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ) : (
              // Data rows
              paginatedData.map((row, rowIndex) => (
                <React.Fragment key={row.id}>
                  <tr
                    className={cn(
                      "border-b border-gray-100 dark:border-gray-800 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50",
                      selectedIds.includes(row.id) && "bg-brand-50/50 dark:bg-brand-900/10"
                    )}
                  >
                    {selectable && (
                      <td className="px-4 py-4">
                        <Checkbox
                          checked={selectedIds.includes(row.id)}
                          onClick={() => handleSelectRow(row.id)}
                        />
                      </td>
                    )}
                    {expandable && (
                      <td className="px-4 py-4">
                        <button
                          onClick={() => handleExpandRow(row.id)}
                          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                          <ChevronRightIcon
                            className={cn(
                              "h-4 w-4 transition-transform",
                              expandedRows.includes(row.id) && "rotate-90"
                            )}
                          />
                        </button>
                      </td>
                    )}
                    {columns.map(column => (
                      <td
                        key={column.key}
                        className={cn(
                          "px-4 py-4 text-sm text-gray-700 dark:text-gray-300",
                          column.sticky === "left" && "sticky left-0 bg-white dark:bg-gray-900",
                          column.sticky === "right" && "sticky right-0 bg-white dark:bg-gray-900",
                          column.align === "center" && "text-center",
                          column.align === "right" && "text-right"
                        )}
                      >
                        {column.render
                          ? column.render((row as Record<string, unknown>)[column.key], row, rowIndex)
                          : String((row as Record<string, unknown>)[column.key] ?? "")}
                      </td>
                    ))}
                    {rowActions && (
                      <td className="px-4 py-4 relative">
                        <button
                          onClick={() => setActionMenuOpen(actionMenuOpen === row.id ? null : row.id)}
                          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          <MoreDotIcon className="h-5 w-5" />
                        </button>
                        {actionMenuOpen === row.id && (
                          <>
                            <div
                              className="fixed inset-0 z-40"
                              onClick={() => setActionMenuOpen(null)}
                            />
                            <div className="absolute right-0 top-full mt-1 z-50 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 min-w-[140px]">
                              {rowActions.map((action, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => {
                                    action.onClick(row);
                                    setActionMenuOpen(null);
                                  }}
                                  className={cn(
                                    "w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800",
                                    action.variant === "danger" && "text-error-600"
                                  )}
                                >
                                  {action.icon}
                                  {action.label}
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </td>
                    )}
                  </tr>
                  {expandable && expandedRows.includes(row.id) && (
                    <tr className="bg-gray-50/50 dark:bg-gray-800/30">
                      <td colSpan={columns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0) + (rowActions ? 1 : 0)} className="px-4 py-6">
                        {expandContent?.(row)}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              Showing {filteredData.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to{" "}
              {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} results
            </span>
            <Select
              value={String(pageSize)}
              onValueChange={(value) => {
                const newSize = Number(value);
                setPageSize(newSize);
                setCurrentPage(1);
                onPageSizeChange?.(newSize);
              }}
              className="w-20"
            >
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </Select>
          </div>
          
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCurrentPage(1);
                onPageChange?.(1);
              }}
              disabled={currentPage === 1}
            >
              <ChevronsLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newPage = Math.max(1, currentPage - 1);
                setCurrentPage(newPage);
                onPageChange?.(newPage);
              }}
              disabled={currentPage === 1}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            
            {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
              let pageNum: number;
              if (totalPages <= 5) {
                pageNum = idx + 1;
              } else if (currentPage <= 3) {
                pageNum = idx + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + idx;
              } else {
                pageNum = currentPage - 2 + idx;
              }
              
              return (
                <Button
                  key={idx}
                  variant={currentPage === pageNum ? "solid" : "outline"}
                  size="sm"
                  onClick={() => {
                    setCurrentPage(pageNum);
                    onPageChange?.(pageNum);
                  }}
                >
                  {pageNum}
                </Button>
              );
            })}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newPage = Math.min(totalPages, currentPage + 1);
                setCurrentPage(newPage);
                onPageChange?.(newPage);
              }}
              disabled={currentPage === totalPages}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCurrentPage(totalPages);
                onPageChange?.(totalPages);
              }}
              disabled={currentPage === totalPages}
            >
              <ChevronsRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export { AdvancedTable };

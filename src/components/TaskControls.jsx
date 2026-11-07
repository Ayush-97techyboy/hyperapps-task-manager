import React from 'react';
import { Search, X, ArrowUpDown } from 'lucide-react';

export function TaskControls({
  currentFilter,
  onFilterChange,
  activeCount,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}) {
  const tabs = ['All', 'Active', 'Completed'];

  return (
    <div className="flex flex-col gap-4 py-2">
      {/* Top row: Status Tabs + Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter tasks by status"
          className="flex items-center p-1 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200/60 dark:border-gray-700/60"
        >
          {tabs.map((tab) => {
            const isActive = currentFilter === tab;
            return (
              <button
                key={tab}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => onFilterChange(tab)}
                className={`flex-1 sm:flex-initial px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-xs font-semibold'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-750 dark:hover:text-gray-200'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Counter: e.g. "3 tasks left" */}
        <span
          aria-live="polite"
          className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
        >
          <strong className="text-gray-800 dark:text-gray-200 font-semibold">
            {activeCount}
          </strong>{' '}
          {activeCount === 1 ? 'task left' : 'tasks left'}
        </span>
      </div>

      {/* Bottom row: Search input + Sort dropdown */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <label htmlFor="search-tasks-input" className="sr-only">
            Search tasks by title
          </label>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            id="search-tasks-input"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-850 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 shrink-0">
          <label
            htmlFor="sort-tasks-select"
            className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            Sort:
          </label>
          <select
            id="sort-tasks-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="flex-1 sm:flex-initial px-3 py-2 text-xs sm:text-sm font-medium rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-850 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="default">Default</option>
            <option value="dueDate">Due Date (Soonest first)</option>
            <option value="priority">Priority (High first)</option>
          </select>
        </div>
      </div>
    </div>
  );
}

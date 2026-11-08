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
    <div className="flex flex-col gap-3.5 py-1">
      {/* Top row: Status Tabs + Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
        {/* Segmented Filter Tabs (iOS / Pinterest style) */}
        <div
          role="tablist"
          aria-label="Filter tasks by status"
          className="flex items-center p-1 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/60 dark:border-slate-700/60 shadow-inner"
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
                className={`flex-1 sm:flex-initial px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Counter Badge (e.g. "3 tasks left") */}
        <span
          aria-live="polite"
          className="inline-flex items-center gap-1.5 self-start sm:self-auto px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border border-sky-100 dark:border-sky-900/40 text-xs font-semibold"
        >
          <strong className="font-bold">{activeCount}</strong>{' '}
          {activeCount === 1 ? 'task left' : 'tasks left'}
        </span>
      </div>

      {/* Bottom row: Search input + Sort dropdown */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
        {/* Search Input */}
        <div className="relative flex-1">
          <label htmlFor="search-tasks-input" className="sr-only">
            Search tasks by title
          </label>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            id="search-tasks-input"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm font-medium rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 shrink-0">
          <label
            htmlFor="sort-tasks-select"
            className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            Sort:
          </label>
          <select
            id="sort-tasks-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="flex-1 sm:flex-initial px-3 py-2 text-xs sm:text-sm font-semibold rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer shadow-xs"
          >
            <option value="default" className="dark:bg-slate-800">Default</option>
            <option value="dueDate" className="dark:bg-slate-800">Due Date (Soonest first)</option>
            <option value="priority" className="dark:bg-slate-800">Priority (High first)</option>
          </select>
        </div>
      </div>
    </div>
  );
}

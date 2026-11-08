import React from 'react';
import {
  Layers,
  Clock,
  Flag,
  RotateCcw,
  CheckSquare,
  Plus,
} from 'lucide-react';

export function BottomToolbar({
  currentFilter,
  onFilterChange,
  sortBy,
  onSortChange,
  onOpenAdd,
}) {
  return (
    <nav
      aria-label="Bottom Navigation & Actions"
      className="sticky bottom-0 z-20 mt-4 -mx-5 -mb-5 sm:-mx-7 sm:-mb-7 p-3 sm:p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 rounded-b-3xl sm:rounded-b-[36px] flex items-center justify-between gap-2 shadow-lg"
    >
      {/* Action Icons matching the bottom bar in reference */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* All Tasks / Layers (active cyan background when on All) */}
        <button
          type="button"
          onClick={() => {
            onFilterChange('All');
            onSortChange('default');
          }}
          aria-label="View all tasks"
          title="All Tasks"
          className={`p-2 rounded-xl transition-all cursor-pointer ${
            currentFilter === 'All' && sortBy === 'default'
              ? 'bg-cyan-500 text-white shadow-sm shadow-cyan-500/25'
              : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Layers className="w-5 h-5 stroke-[2]" />
        </button>

        {/* Due Date Sort (Clock icon) */}
        <button
          type="button"
          onClick={() => onSortChange(sortBy === 'dueDate' ? 'default' : 'dueDate')}
          aria-label="Sort by due date (soonest first)"
          title="Sort Soonest"
          className={`p-2 rounded-xl transition-all cursor-pointer ${
            sortBy === 'dueDate'
              ? 'bg-cyan-500 text-white shadow-sm shadow-cyan-500/25'
              : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Clock className="w-5 h-5 stroke-[2]" />
        </button>

        {/* Priority Sort (Flag icon) */}
        <button
          type="button"
          onClick={() => onSortChange(sortBy === 'priority' ? 'default' : 'priority')}
          aria-label="Sort by priority (High first)"
          title="Sort High Priority"
          className={`p-2 rounded-xl transition-all cursor-pointer ${
            sortBy === 'priority'
              ? 'bg-cyan-500 text-white shadow-sm shadow-cyan-500/25'
              : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Flag className="w-5 h-5 stroke-[2]" />
        </button>

        {/* Active Tasks filter (Sync / Repeat icon) */}
        <button
          type="button"
          onClick={() => onFilterChange(currentFilter === 'Active' ? 'All' : 'Active')}
          aria-label="Filter active tasks"
          title="Active Tasks"
          className={`p-2 rounded-xl transition-all cursor-pointer ${
            currentFilter === 'Active'
              ? 'bg-cyan-500 text-white shadow-sm shadow-cyan-500/25'
              : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <RotateCcw className="w-5 h-5 stroke-[2]" />
        </button>

        {/* Completed Tasks filter (Checked box icon) */}
        <button
          type="button"
          onClick={() => onFilterChange(currentFilter === 'Completed' ? 'All' : 'Completed')}
          aria-label="Filter completed tasks"
          title="Completed Tasks"
          className={`p-2 rounded-xl transition-all cursor-pointer ${
            currentFilter === 'Completed'
              ? 'bg-cyan-500 text-white shadow-sm shadow-cyan-500/25'
              : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <CheckSquare className="w-5 h-5 stroke-[2]" />
        </button>
      </div>

      {/* Vibrant Cyan / Turquoise ADD Action Button (exact match to reference) */}
      <button
        type="button"
        onClick={onOpenAdd}
        aria-label="Add new task"
        className="inline-flex items-center justify-center gap-1 px-5 sm:px-6 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-600 active:scale-95 text-white font-bold tracking-wider text-xs sm:text-sm uppercase shadow-md shadow-cyan-500/30 transition-all cursor-pointer shrink-0"
      >
        <Plus className="w-4 h-4 stroke-[3]" />
        ADD
      </button>
    </nav>
  );
}

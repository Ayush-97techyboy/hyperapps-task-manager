import React from 'react';
import { Plus } from 'lucide-react';

export function GoalsSection({
  activeCount,
  completedCount,
  onSelectFilter,
  onSelectSort,
  onOpenAdd,
}) {
  return (
    <div className="flex flex-col gap-2.5 pt-2">
      {/* Section Header: "Your Goals" + icon (exact match to screenshot) */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold tracking-tight text-slate-800 dark:text-slate-200">
          Your Goals
        </h2>
        <button
          type="button"
          onClick={onOpenAdd}
          aria-label="Add new goal or task"
          className="p-1 rounded-lg text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Horizontal Goals Carousel / Grid (exact cards from reference image) */}
      <div className="grid grid-cols-3 gap-2.5 overflow-x-auto pb-1">
        {/* Goal 1: Active Focus (Peach/Amber styling matching 'Facebook Design') */}
        <button
          type="button"
          onClick={() => onSelectFilter('Active')}
          className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-[#FFF4E5] dark:bg-amber-950/40 border border-[#FFE8CC] dark:border-amber-900/40 text-left transition-all hover:scale-[1.02] active:scale-98 cursor-pointer shadow-xs"
        >
          <span className="text-xl sm:text-2xl shrink-0" role="img" aria-label="Target">
            🎯
          </span>
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-bold text-amber-950 dark:text-amber-100 truncate">
              Daily Focus
            </h3>
            <p className="text-[11px] font-medium text-amber-700/80 dark:text-amber-300/80 truncate">
              {activeCount} active
            </p>
          </div>
        </button>

        {/* Goal 2: High Priority (Soft gray styling matching 'Workout Goals') */}
        <button
          type="button"
          onClick={() => onSelectSort('priority')}
          className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-[#F1F3F5] dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-left transition-all hover:scale-[1.02] active:scale-98 cursor-pointer shadow-xs"
        >
          <span className="text-xl sm:text-2xl shrink-0" role="img" aria-label="Muscle">
            💪
          </span>
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
              Priority Run
            </h3>
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">
              High first
            </p>
          </div>
        </button>

        {/* Goal 3: Completed Archive (Soft gray styling matching 'Studying Goals') */}
        <button
          type="button"
          onClick={() => onSelectFilter('Completed')}
          className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-[#F1F3F5] dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-left transition-all hover:scale-[1.02] active:scale-98 cursor-pointer shadow-xs"
        >
          <span className="text-xl sm:text-2xl shrink-0" role="img" aria-label="Notebook">
            📙
          </span>
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
              Completed
            </h3>
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">
              {completedCount} done
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}

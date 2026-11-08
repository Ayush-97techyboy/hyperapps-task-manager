import React from 'react';
import { CheckCircle2, Moon, Sun, Sparkles } from 'lucide-react';

export function Header({ theme, toggleTheme, totalCount, completedCount }) {
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <header className="flex flex-col gap-4 pb-2">
      {/* Top Sheet Handle (inspired by mobile sheet card design) */}
      <div 
        aria-hidden="true" 
        className="w-12 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 mx-auto"
      />

      <div className="flex items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-sky-500/25 shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Task Manager
              </h1>
              {percentage === 100 && totalCount > 0 && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                  <Sparkles className="w-3 h-3" /> Done
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              {completedCount} of {totalCount} completed ({percentage}%)
            </p>
          </div>
        </div>

        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={
            theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
          }
          className="w-10 h-10 rounded-2xl border border-slate-200/80 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-all focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer shadow-sm flex items-center justify-center shrink-0 active:scale-95"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-amber-400" aria-hidden="true" />
          ) : (
            <Moon className="w-5 h-5 text-slate-600" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Subtle Progress Bar */}
      <div 
        role="progressbar" 
        aria-valuenow={percentage} 
        aria-valuemin="0" 
        aria-valuemax="100"
        aria-label="Task completion progress"
        className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden"
      >
        <div 
          className="h-full bg-gradient-to-r from-sky-400 to-blue-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </header>
  );
}

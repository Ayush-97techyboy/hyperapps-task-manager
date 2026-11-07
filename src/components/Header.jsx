import React from 'react';
import { CheckSquare, Moon, Sun } from 'lucide-react';

export function Header({ theme, toggleTheme, totalCount, completedCount }) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
          <CheckSquare className="w-6 h-6" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Task Manager
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            {completedCount} of {totalCount} completed
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 self-end sm:self-auto">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={
            theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
          }
          className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-xs"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-amber-400" aria-hidden="true" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600" aria-hidden="true" />
          )}
        </button>
      </div>
    </header>
  );
}

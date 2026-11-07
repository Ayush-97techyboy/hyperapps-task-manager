import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export function ErrorState({ error, onRetry }) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-950/20"
    >
      <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 mb-3">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
        Failed to load tasks
      </h2>
      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 max-w-sm mb-5">
        {error || 'An unexpected error occurred while fetching your tasks.'}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors cursor-pointer"
      >
        <RefreshCw className="w-4 h-4" />
        Retry
      </button>
    </div>
  );
}

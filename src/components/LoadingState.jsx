import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingState() {
  return (
    <div
      role="status"
      aria-label="Loading tasks"
      className="flex flex-col items-center justify-center p-12 sm:p-16 text-center"
    >
      <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-3" />
      <h2 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200">
        Loading tasks...
      </h2>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
        Fetching starter data and synchronizing storage
      </p>
    </div>
  );
}

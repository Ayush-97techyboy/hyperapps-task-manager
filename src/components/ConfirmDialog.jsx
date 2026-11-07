import React, { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export function ConfirmDialog({ isOpen, task, onConfirm, onCancel }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen || !task) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn"
    >
      <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 sm:p-6 shadow-xl transition-all">
        <div className="flex items-center gap-3 text-red-600 dark:text-red-400 mb-3">
          <div className="p-2 rounded-xl bg-red-100 dark:bg-red-950/60">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h2 id="dialog-title" className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
            Delete Task?
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-5">
          Are you sure you want to delete{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            "{task.title}"
          </span>
          ? You will have 5 seconds to undo this action.
        </p>

        <div className="flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(task.id)}
            className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-xs transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

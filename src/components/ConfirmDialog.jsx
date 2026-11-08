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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn"
    >
      <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl transition-all">
        <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400 mb-3">
          <div className="p-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/50">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h2 id="dialog-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Delete Task?
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
          Are you sure you want to delete{' '}
          <strong className="font-bold text-slate-900 dark:text-white">
            "{task.title}"
          </strong>
          ? You will have 5 seconds to undo this action.
        </p>

        <div className="flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(task.id)}
            className="px-4 py-2 text-xs sm:text-sm font-bold rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20 transition-all cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

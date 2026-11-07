import React from 'react';
import { Undo2, X } from 'lucide-react';

export function UndoToast({ deletedTaskInfo, onUndo, onDismiss }) {
  if (!deletedTaskInfo) return null;

  return (
    <aside
      aria-label="Notification"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-xl border border-gray-800 dark:border-gray-200 animate-slideUp text-xs sm:text-sm"
    >
      <span className="truncate max-w-[200px] sm:max-w-[260px]">
        Deleted "
        <strong className="font-semibold">
          {deletedTaskInfo.task.title}
        </strong>
        "
      </span>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onUndo}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors cursor-pointer"
        >
          <Undo2 className="w-3.5 h-3.5" />
          Undo
        </button>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="p-1 rounded-md text-gray-400 hover:text-white dark:hover:text-gray-900 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}

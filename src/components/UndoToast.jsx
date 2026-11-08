import React from 'react';
import { Undo2, X } from 'lucide-react';

export function UndoToast({ deletedTaskInfo, onUndo, onDismiss }) {
  if (!deletedTaskInfo) return null;

  return (
    <aside
      aria-label="Notification"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xl border border-slate-800 dark:border-slate-200 animate-slideUp text-xs sm:text-sm"
    >
      <span className="truncate max-w-[200px] sm:max-w-[260px] font-medium">
        Deleted "
        <strong className="font-bold">
          {deletedTaskInfo.task.title}
        </strong>
        "
      </span>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onUndo}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold transition-all active:scale-95 cursor-pointer shadow-xs"
        >
          <Undo2 className="w-3.5 h-3.5" />
          Undo
        </button>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="p-1 rounded-lg text-slate-400 hover:text-white dark:hover:text-slate-900 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}

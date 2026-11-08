import React from 'react';
import { TaskItem } from './TaskItem';
import { ClipboardList, CheckCircle2 } from 'lucide-react';

export function TaskList({
  tasks,
  onToggle,
  onEditTitle,
  onRequestDelete,
  currentFilter,
  searchQuery,
}) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
        {currentFilter === 'Completed' ? (
          <div className="p-3.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 mb-3">
            <CheckCircle2 className="w-8 h-8" />
          </div>
        ) : (
          <div className="p-3.5 rounded-full bg-sky-50 dark:bg-sky-950/40 text-sky-500 mb-3">
            <ClipboardList className="w-8 h-8" />
          </div>
        )}
        <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200">
          {searchQuery
            ? 'No tasks found'
            : currentFilter === 'Completed'
            ? 'No completed tasks yet'
            : currentFilter === 'Active'
            ? 'No active tasks left'
            : 'No tasks yet'}
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-500 mt-1 max-w-xs font-medium">
          {searchQuery
            ? `No tasks match "${searchQuery}". Try a different keyword.`
            : currentFilter === 'Completed'
            ? 'Complete a task and it will appear here.'
            : currentFilter === 'Active'
            ? 'Nice work! You have finished all active tasks.'
            : 'Add your first task above to get started.'}
        </p>
      </div>
    );
  }

  return (
    <div
      role="list"
      aria-label="Tasks list"
      className="flex flex-col gap-2.5 sm:gap-3"
    >
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEditTitle={onEditTitle}
          onRequestDelete={onRequestDelete}
        />
      ))}
    </div>
  );
}

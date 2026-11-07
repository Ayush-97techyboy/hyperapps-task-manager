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
      <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-dashed border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
        {currentFilter === 'Completed' ? (
          <CheckCircle2 className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
        ) : (
          <ClipboardList className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
        )}
        <h3 className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300">
          {searchQuery
            ? 'No tasks found'
            : currentFilter === 'Completed'
            ? 'No completed tasks yet'
            : currentFilter === 'Active'
            ? 'No active tasks left'
            : 'No tasks yet'}
        </h3>
        <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 mt-1 max-w-xs">
          {searchQuery
            ? `No tasks match "${searchQuery}". Try a different keyword.`
            : currentFilter === 'Completed'
            ? 'Mark a task as complete and it will appear here.'
            : currentFilter === 'Active'
            ? 'Great job! You have cleared all pending tasks.'
            : 'Add your first task above to get organized.'}
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

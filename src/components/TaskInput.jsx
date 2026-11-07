import React, { useState } from 'react';
import { Plus, Calendar, AlertCircle } from 'lucide-react';

export function TaskInput({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    const trimmed = title.trim();
    if (!trimmed) {
      setError('Task title is required and cannot be empty or only spaces.');
      return;
    }

    const result = onAddTask({
      title: trimmed,
      priority,
      dueDate: dueDate || null,
    });

    if (result && !result.success) {
      setError(result.error);
      return;
    }

    // Reset form upon successful submission
    setTitle('');
    setPriority('Medium');
    setDueDate('');
    setError('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-gray-850 border border-gray-200 dark:border-gray-800 shadow-sm transition-all"
    >
      <div className="flex flex-col gap-3">
        {/* Main title input */}
        <div className="relative">
          <label htmlFor="task-title-input" className="sr-only">
            Task title
          </label>
          <input
            id="task-title-input"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError('');
            }}
            onKeyDown={handleKeyDown}
            placeholder="Add a new task... (Press Enter to save)"
            className={`w-full px-4 py-3 text-sm sm:text-base rounded-xl border bg-gray-50/70 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
              error
                ? 'border-red-400 dark:border-red-500 focus:ring-red-400'
                : 'border-gray-200 dark:border-gray-700 focus:ring-blue-500'
            }`}
          />
        </div>

        {/* Validation error display */}
        {error && (
          <div
            role="alert"
            className="flex items-center gap-2 text-xs sm:text-sm text-red-600 dark:text-red-400 font-medium animate-fadeIn"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Controls row: Priority + Due Date + Add Button */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-3">
            {/* Priority Selector */}
            <div className="flex items-center gap-1.5">
              <label
                htmlFor="priority-select"
                className="text-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Priority:
              </label>
              <select
                id="priority-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="px-2.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {/* Optional Due Date */}
            <div className="flex items-center gap-1.5">
              <label
                htmlFor="due-date-input"
                className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1"
              >
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                Due:
              </label>
              <input
                id="due-date-input"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="px-2.5 py-1.5 text-xs sm:text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Add Task Button */}
          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white shadow-sm shadow-blue-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
}

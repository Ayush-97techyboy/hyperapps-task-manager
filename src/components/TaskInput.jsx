import React, { useState } from 'react';
import { Plus, Calendar, AlertCircle, AlignLeft, Flag } from 'lucide-react';

export function TaskInput({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showDesc, setShowDesc] = useState(false);
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

    const payload = {
      title: trimmed,
      priority,
      dueDate: dueDate || null,
    };
    if (description.trim()) {
      payload.description = description.trim();
    }

    const result = onAddTask(payload);

    if (result && !result.success) {
      setError(result.error);
      return;
    }

    // Reset form upon successful submission (default priority resets to 'Medium')
    setTitle('');
    setDescription('');
    setShowDesc(false);
    setPriority('Medium');
    setDueDate('');
    setError('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 sm:p-5 rounded-3xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/70 shadow-xs transition-all flex flex-col gap-3"
    >
      {/* Task Title Input */}
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
          className={`w-full px-4 py-3 text-sm sm:text-base font-medium rounded-2xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 transition-all shadow-xs ${
            error
              ? 'border-rose-400 dark:border-rose-500 focus:ring-rose-400'
              : 'border-slate-200/90 dark:border-slate-700/90 focus:ring-sky-500'
          }`}
        />
      </div>

      {/* Validation error display */}
      {error && (
        <div
          role="alert"
          className="flex items-center gap-2 text-xs sm:text-sm text-rose-600 dark:text-rose-400 font-semibold px-1"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Optional Description / Sub-detail (Collapsible) */}
      {showDesc ? (
        <div className="relative animate-fadeIn">
          <label htmlFor="task-description-input" className="sr-only">
            Task details or subtasks
          </label>
          <textarea
            id="task-description-input"
            rows="2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add details, notes, or subtasks... (optional)"
            className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200/90 dark:border-slate-700/90 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
          />
        </div>
      ) : null}

      {/* Bottom Bar: Quick Controls & Cyan "ADD" Button (matching Pinterest reference) */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Priority Selector */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-xs">
            <Flag className="w-3.5 h-3.5 text-amber-500" />
            <label htmlFor="priority-select" className="sr-only">
              Priority:
            </label>
            <select
              id="priority-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer pr-1"
            >
              <option value="Low" className="dark:bg-slate-800">Low</option>
              <option value="Medium" className="dark:bg-slate-800">Medium</option>
              <option value="High" className="dark:bg-slate-800">High</option>
            </select>
          </div>

          {/* Optional Due Date */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-sky-500" />
            <label htmlFor="due-date-input" className="sr-only">
              Due:
            </label>
            <input
              id="due-date-input"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="bg-transparent focus:outline-none text-xs cursor-pointer"
            />
          </div>

          {/* Toggle Description Button */}
          <button
            type="button"
            onClick={() => setShowDesc(!showDesc)}
            aria-label="Toggle task notes"
            className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
              showDesc || description
                ? 'bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300 border-sky-200 dark:border-sky-800'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <AlignLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Details</span>
          </button>
        </div>

        {/* Vibrant Cyan / Sky ADD Button (inspired by Pinterest reference) */}
        <button
          type="submit"
          aria-label="Add task"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-2.5 text-xs sm:text-sm font-bold tracking-wider uppercase rounded-xl bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 active:scale-95 text-white shadow-md shadow-sky-500/25 transition-all focus:outline-none focus:ring-2 focus:ring-sky-400 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          ADD
        </button>
      </div>
    </form>
  );
}

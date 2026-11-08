import React, { useState, useRef, useEffect } from 'react';
import {
  Calendar,
  Trash2,
  Edit2,
  Check,
  X,
  AlertTriangle,
} from 'lucide-react';
import { formatDueDate, isTaskOverdue } from '../utils/taskUtils';

const PRIORITY_BADGES = {
  High: 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border-rose-200 dark:border-rose-900/60',
  Medium: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200 dark:border-amber-900/60',
  Low: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/60',
};

export function TaskItem({
  task,
  onToggle,
  onEditTitle,
  onRequestDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editError, setEditError] = useState('');
  const editInputRef = useRef(null);

  const isOverdue = isTaskOverdue(task);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditing]);

  const handleStartEdit = () => {
    setEditTitle(task.title);
    setEditError('');
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    const trimmed = editTitle.trim();
    if (!trimmed) {
      setEditError('Title cannot be blank.');
      return;
    }
    const result = onEditTitle(task.id, trimmed);
    if (result && !result.success) {
      setEditError(result.error);
      return;
    }
    setIsEditing(false);
    setEditError('');
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditError('');
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancelEdit();
    }
  };

  return (
    <div
      className={`group relative flex flex-col p-3.5 sm:p-4 rounded-2xl border transition-all ${
        task.completed
          ? 'bg-slate-50/50 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/60 opacity-70'
          : 'bg-white dark:bg-slate-850/90 border-slate-200/90 dark:border-slate-700/80 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600'
      }`}
    >
      <div className="flex items-start gap-3.5">
        {/* Circular Checkbox (Inspired by Pinterest / iOS checklist style) */}
        <label
          htmlFor={`task-chk-${task.id}`}
          className="pt-0.5 relative flex items-center justify-center cursor-pointer select-none shrink-0"
        >
          <input
            id={`task-chk-${task.id}`}
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            aria-label={`Mark "${task.title}" as ${
              task.completed ? 'incomplete' : 'complete'
            }`}
            className="sr-only"
          />
          <div
            className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${
              task.completed
                ? 'bg-sky-500 border-sky-500 text-white shadow-xs'
                : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 group-hover:border-sky-400'
            }`}
          >
            {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </div>
        </label>

        {/* Content area: Title, Details, Metadata */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <input
                  ref={editInputRef}
                  type="text"
                  value={editTitle}
                  onChange={(e) => {
                    setEditTitle(e.target.value);
                    if (editError) setEditError('');
                  }}
                  onKeyDown={handleKeyDown}
                  aria-label="Edit task title"
                  className="w-full px-3 py-1.5 text-sm font-medium rounded-xl border border-sky-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  aria-label="Save title"
                  className="p-1.5 rounded-xl bg-sky-500 text-white hover:bg-sky-600 cursor-pointer shrink-0 shadow-xs"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  aria-label="Cancel editing"
                  className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
              {editError && (
                <p className="text-xs text-rose-500 font-semibold">
                  {editError}
                </p>
              )}
              <span className="text-[11px] text-slate-400">
                Press Enter to save · Escape to cancel
              </span>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {/* Task Title */}
              <span
                onClick={handleStartEdit}
                title="Click to edit title"
                className={`text-sm sm:text-base font-semibold tracking-tight break-words cursor-pointer select-text transition-colors ${
                  task.completed
                    ? 'line-through text-slate-400 dark:text-slate-500'
                    : 'text-slate-900 dark:text-slate-100 hover:text-sky-600 dark:hover:text-sky-400'
                }`}
              >
                {task.title}
              </span>

              {/* Optional Description / Sub-note (if present) */}
              {task.description && (
                <p
                  className={`text-xs break-words line-clamp-2 ${
                    task.completed
                      ? 'text-slate-400/80 dark:text-slate-500/80 line-through'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {task.description}
                </p>
              )}

              {/* Metadata Badges: Priority + Due Date + Overdue */}
              <div className="flex flex-wrap items-center gap-2 pt-0.5 text-xs">
                {/* Priority Badge */}
                <span
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-bold border tracking-wide uppercase ${
                    PRIORITY_BADGES[task.priority] || PRIORITY_BADGES.Medium
                  }`}
                >
                  {task.priority}
                </span>

                {/* Due Date with Calendar Icon */}
                {task.dueDate && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    <Calendar className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                    {formatDueDate(task.dueDate)}
                  </span>
                )}

                {/* Overdue Badge */}
                {isOverdue && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-300 dark:border-rose-900 animate-pulse">
                    <AlertTriangle className="w-3 h-3" />
                    Overdue
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action buttons (Edit & Delete) */}
        {!isEditing && (
          <div className="flex items-center gap-1 shrink-0 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={handleStartEdit}
              aria-label={`Edit task "${task.title}"`}
              className="p-1.5 rounded-xl text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onRequestDelete(task)}
              aria-label={`Delete task "${task.title}"`}
              className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

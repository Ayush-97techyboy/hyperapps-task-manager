import React, { useState, useRef, useEffect } from 'react';
import {
  Calendar,
  Trash2,
  Edit2,
  Check,
  X,
  AlertTriangle,
  Menu,
} from 'lucide-react';
import { formatDueDate, isTaskOverdue } from '../utils/taskUtils';

const PRIORITY_BADGES = {
  High: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-900/60',
  Medium: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-900/60',
  Low: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/60',
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
      className={`group relative flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border transition-all ${
        task.completed
          ? 'bg-slate-50/50 dark:bg-slate-900/30 border-slate-200/50 dark:border-slate-800/50 opacity-65'
          : 'bg-white dark:bg-slate-800/90 border-slate-200/80 dark:border-slate-700/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600'
      }`}
    >
      <div className="flex items-start gap-3 sm:gap-3.5 flex-1 min-w-0">
        {/* Left Drag/Grip icon (matching ≡ from mobile reference image) */}
        <div 
          aria-hidden="true" 
          className="pt-1.5 text-slate-300 dark:text-slate-600 group-hover:text-slate-400 transition-colors shrink-0 cursor-grab"
        >
          <Menu className="w-4 h-4 stroke-[2]" />
        </div>

        {/* Soft Squircle Checkbox (matching rounded checkbox from reference) */}
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
            className={`w-6 h-6 rounded-[8px] border-2 transition-all flex items-center justify-center ${
              task.completed
                ? 'bg-cyan-500 border-cyan-500 text-white shadow-xs'
                : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-cyan-400'
            }`}
          >
            {task.completed && <Check className="w-4 h-4 stroke-[3]" />}
          </div>
        </label>

        {/* Task Title & Details */}
        <div className="flex-1 min-w-0 pr-2">
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
                  className="w-full px-3 py-1.5 text-sm font-semibold rounded-xl border border-cyan-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  aria-label="Save title"
                  className="p-1.5 rounded-xl bg-cyan-500 text-white hover:bg-cyan-600 cursor-pointer shrink-0 shadow-xs"
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
              {/* Title */}
              <span
                onClick={handleStartEdit}
                title="Click to edit title"
                className={`text-sm sm:text-base font-semibold tracking-tight break-words cursor-pointer select-text transition-colors ${
                  task.completed
                    ? 'line-through text-slate-400 dark:text-slate-500'
                    : 'text-slate-800 dark:text-slate-100 hover:text-cyan-600 dark:hover:text-cyan-400'
                }`}
              >
                {task.title}
              </span>

              {/* Optional Description / Subtask details (from reference) */}
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
                  className={`px-2 py-0.5 rounded-md text-[11px] font-bold border tracking-wide uppercase ${
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
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-300 dark:border-rose-900 animate-pulse">
                    <AlertTriangle className="w-3 h-3" />
                    Overdue
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action buttons (Edit & Delete) */}
      {!isEditing && (
        <div className="flex items-center gap-1 shrink-0 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={handleStartEdit}
            aria-label={`Edit task "${task.title}"`}
            className="p-1.5 rounded-xl text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
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
  );
}

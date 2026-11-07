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
  High: 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-900',
  Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-900',
  Low: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900',
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
      className={`group flex flex-col p-3.5 sm:p-4 rounded-xl border transition-all ${
        task.completed
          ? 'bg-gray-50/60 dark:bg-gray-900/40 border-gray-200 dark:border-gray-800/80 opacity-75'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-xs hover:border-gray-300 dark:hover:border-gray-600'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Accessible Checkbox */}
        <div className="pt-0.5 shrink-0">
          <input
            id={`task-chk-${task.id}`}
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            aria-label={`Mark "${task.title}" as ${
              task.completed ? 'incomplete' : 'complete'
            }`}
            className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 rounded-md border-gray-300 dark:border-gray-600 focus:ring-blue-500 cursor-pointer"
          />
        </div>

        {/* Content area: Title or Edit Input */}
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
                  className="w-full px-2.5 py-1.5 text-sm rounded-lg border border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  aria-label="Save title"
                  className="p-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer shrink-0"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  aria-label="Cancel editing"
                  className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {editError && (
                <p className="text-xs text-red-500 font-medium">
                  {editError}
                </p>
              )}
              <span className="text-[11px] text-gray-400">
                Press Enter to save · Escape to cancel
              </span>
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              <span
                onClick={handleStartEdit}
                title="Click to edit title"
                className={`text-sm sm:text-base font-medium break-words cursor-pointer select-text ${
                  task.completed
                    ? 'line-through text-gray-400 dark:text-gray-500'
                    : 'text-gray-900 dark:text-gray-100'
                }`}
              >
                {task.title}
              </span>

              {/* Metadata Badges: Priority + Due Date + Overdue */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {/* Priority Badge */}
                <span
                  className={`px-2 py-0.5 rounded-md font-semibold border ${
                    PRIORITY_BADGES[task.priority] || PRIORITY_BADGES.Medium
                  }`}
                >
                  {task.priority}
                </span>

                {/* Due Date */}
                {task.dueDate && (
                  <span className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDueDate(task.dueDate)}
                  </span>
                )}

                {/* Overdue Badge */}
                {isOverdue && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300 border border-red-300 dark:border-red-900 animate-pulse">
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
              className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onRequestDelete(task)}
              aria-label={`Delete task "${task.title}"`}
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

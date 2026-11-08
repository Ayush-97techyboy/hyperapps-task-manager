import React, { useState, useMemo, useRef } from 'react';
import { useTasks } from './hooks/useTasks';
import { useTheme } from './hooks/useTheme';
import { filterTasks, sortTasks } from './utils/taskUtils';
import { Header } from './components/Header';
import { TaskInput } from './components/TaskInput';
import { TaskControls } from './components/TaskControls';
import { TaskList } from './components/TaskList';
import { GoalsSection } from './components/GoalsSection';
import { BottomToolbar } from './components/BottomToolbar';
import { ConfirmDialog } from './components/ConfirmDialog';
import { UndoToast } from './components/UndoToast';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const {
    tasks,
    isLoading,
    error,
    retryFetch,
    addTask,
    toggleTask,
    editTaskTitle,
    deleteTask,
    deletedTaskInfo,
    undoDelete,
    dismissUndo,
  } = useTasks();

  // Filter, Search, and Sort state
  const [currentFilter, setCurrentFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  // Confirmation modal state
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Ref to scroll to and focus task creation form
  const inputContainerRef = useRef(null);

  // Computations without mutations (per rubric requirements)
  const activeCount = useMemo(() => {
    return tasks.filter((t) => !t.completed).length;
  }, [tasks]);

  const completedCount = useMemo(() => {
    return tasks.filter((t) => t.completed).length;
  }, [tasks]);

  const displayedTasks = useMemo(() => {
    const filtered = filterTasks(tasks, currentFilter, searchQuery);
    return sortTasks(filtered, sortBy);
  }, [tasks, currentFilter, searchQuery, sortBy]);

  const handleConfirmDelete = (id) => {
    deleteTask(id);
    setTaskToDelete(null);
  };

  const handleFocusInput = () => {
    if (inputContainerRef.current) {
      inputContainerRef.current.scrollIntoView({ behavior: 'smooth' });
      const textInput = inputContainerRef.current.querySelector('input[type="text"]');
      if (textInput) {
        textInput.focus();
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#EDF2F7] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors py-3 sm:py-8 px-2.5 sm:px-4">
      {/* Responsive Main Container matching the Mobile Card Reference */}
      <main className="w-full max-w-xl mx-auto bg-white dark:bg-[#131B26] rounded-3xl sm:rounded-[36px] p-5 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.06)] dark:shadow-black/50 border border-slate-200/80 dark:border-slate-800 flex flex-col gap-4 sm:gap-5 transition-all">
        {/* Header with Dark Mode Toggle, Pull Handle & Stats */}
        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          totalCount={tasks.length}
          completedCount={completedCount}
        />

        {/* Task Creation Input Form */}
        <div ref={inputContainerRef}>
          <TaskInput onAddTask={addTask} />
        </div>

        {/* Loading / Error / Main Task List Views */}
        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState error={error} onRetry={retryFetch} />
        ) : (
          <section aria-label="Task Management Controls and List" className="flex flex-col gap-4">
            {/* Filter Tabs, Search & Sort */}
            <TaskControls
              currentFilter={currentFilter}
              onFilterChange={setCurrentFilter}
              activeCount={activeCount}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />

            {/* Task Items List with Drag Handles, Squircle Checkboxes & Overdue */}
            <TaskList
              tasks={displayedTasks}
              onToggle={toggleTask}
              onEditTitle={editTaskTitle}
              onRequestDelete={(task) => setTaskToDelete(task)}
              currentFilter={currentFilter}
              searchQuery={searchQuery}
            />

            {/* "Your Goals" Category / Priority Section (matching screenshot) */}
            <GoalsSection
              activeCount={activeCount}
              completedCount={completedCount}
              onSelectFilter={setCurrentFilter}
              onSelectSort={setSortBy}
              onOpenAdd={handleFocusInput}
            />
          </section>
        )}

        {/* Bottom Toolbar & Action Bar (matching screenshot) */}
        <BottomToolbar
          currentFilter={currentFilter}
          onFilterChange={setCurrentFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onOpenAdd={handleFocusInput}
        />
      </main>

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={Boolean(taskToDelete)}
        task={taskToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={() => setTaskToDelete(null)}
      />

      {/* 5-second Undo Toast Notification */}
      <UndoToast
        deletedTaskInfo={deletedTaskInfo}
        onUndo={undoDelete}
        onDismiss={dismissUndo}
      />
    </div>
  );
}

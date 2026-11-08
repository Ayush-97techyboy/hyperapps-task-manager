import React, { useState, useMemo } from 'react';
import { useTasks } from './hooks/useTasks';
import { useTheme } from './hooks/useTheme';
import { filterTasks, sortTasks } from './utils/taskUtils';
import { Header } from './components/Header';
import { TaskInput } from './components/TaskInput';
import { TaskControls } from './components/TaskControls';
import { TaskList } from './components/TaskList';
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

  return (
    <div className="min-h-screen bg-slate-100/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors py-4 sm:py-10 px-3 sm:px-6">
      <main className="w-full max-w-xl mx-auto bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl sm:rounded-[36px] p-5 sm:p-7 shadow-xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-200/80 dark:border-slate-800 flex flex-col gap-5">
        {/* Header with Dark Mode Toggle, Pull Handle & Stats */}
        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          totalCount={tasks.length}
          completedCount={completedCount}
        />

        {/* Task Creation Input */}
        <TaskInput onAddTask={addTask} />

        {/* Loading / Error / Main Task List Views */}
        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState error={error} onRetry={retryFetch} />
        ) : (
          <section aria-label="Task Management Controls and List" className="flex flex-col gap-3.5">
            <TaskControls
              currentFilter={currentFilter}
              onFilterChange={setCurrentFilter}
              activeCount={activeCount}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />

            <TaskList
              tasks={displayedTasks}
              onToggle={toggleTask}
              onEditTitle={editTaskTitle}
              onRequestDelete={(task) => setTaskToDelete(task)}
              currentFilter={currentFilter}
              searchQuery={searchQuery}
            />
          </section>
        )}
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

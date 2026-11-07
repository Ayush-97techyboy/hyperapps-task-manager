import { useState, useEffect, useCallback, useRef } from 'react';

const TASKS_STORAGE_KEY = 'hyperapps_tasks';

function getInitialTasks() {
  try {
    const cached = localStorage.getItem(TASKS_STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch {
    localStorage.removeItem(TASKS_STORAGE_KEY);
  }
  return null;
}

export function useTasks() {
  const [initialData] = useState(getInitialTasks);
  const [tasks, setTasks] = useState(() => initialData || []);
  const [isLoading, setIsLoading] = useState(() => initialData === null);
  const [error, setError] = useState(null);

  // 5-second Undo state tracking
  const [deletedTaskInfo, setDeletedTaskInfo] = useState(null);
  const undoTimerRef = useRef(null);

  // Synchronize tasks to localStorage whenever tasks state updates (after initial load)
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (!isLoading && !error) {
      try {
        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
      } catch (err) {
        console.error('Failed to save tasks to localStorage:', err);
      }
    }
  }, [tasks, isLoading, error]);

  // Fetch tasks from tasks.json (used on first load if no localStorage cache, or on retry)
  const fetchTasksFromServer = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const baseUrl = import.meta.env.BASE_URL || '/';
      const fetchUrl = `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}tasks.json`;
      const response = await fetch(fetchUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('Invalid JSON format: expected an array of tasks.');
      }
      setTasks(data);
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(data));
      setIsLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to load tasks from server.');
      setIsLoading(false);
    }
  }, []);

  // Initial load: fetch from server only if no cache was found on mount
  useEffect(() => {
    if (initialData !== null) return;

    let isCancelled = false;

    async function initialFetch() {
      try {
        const baseUrl = import.meta.env.BASE_URL || '/';
        const fetchUrl = `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}tasks.json`;
        const response = await fetch(fetchUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Invalid JSON format: expected an array of tasks.');
        }
        if (!isCancelled) {
          setTasks(data);
          localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(data));
          setIsLoading(false);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message || 'Failed to load tasks from server.');
          setIsLoading(false);
        }
      }
    }

    initialFetch();

    return () => {
      isCancelled = true;
    };
  }, [initialData]);

  // Clean up any pending undo timer on unmount
  useEffect(() => {
    return () => {
      if (undoTimerRef.current) {
        clearTimeout(undoTimerRef.current);
      }
    };
  }, []);

  // Task Operations
  const addTask = useCallback(({ title, priority = 'Medium', dueDate = null }) => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      return { success: false, error: 'Task title cannot be blank.' };
    }

    const newTask = {
      id: Date.now(),
      title: trimmedTitle,
      priority: priority || 'Medium',
      dueDate: dueDate || null,
      completed: false,
    };

    setTasks((prev) => [newTask, ...prev]);
    return { success: true, task: newTask };
  }, []);

  const toggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  const editTaskTitle = useCallback((id, newTitle) => {
    const trimmed = newTitle.trim();
    if (!trimmed) {
      return { success: false, error: 'Title cannot be blank.' };
    }
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: trimmed } : t))
    );
    return { success: true };
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => {
      const targetIndex = prev.findIndex((t) => t.id === id);
      if (targetIndex === -1) return prev;

      const targetTask = prev[targetIndex];

      // Prepare 5-second undo toast
      if (undoTimerRef.current) {
        clearTimeout(undoTimerRef.current);
      }

      setDeletedTaskInfo({
        task: targetTask,
        index: targetIndex,
      });

      undoTimerRef.current = setTimeout(() => {
        setDeletedTaskInfo(null);
      }, 5000);

      return prev.filter((t) => t.id !== id);
    });
  }, []);

  const undoDelete = useCallback(() => {
    if (!deletedTaskInfo) return;

    if (undoTimerRef.current) {
      clearTimeout(undoTimerRef.current);
    }

    setTasks((prev) => {
      const copy = [...prev];
      const { task, index } = deletedTaskInfo;
      // Reinsert at original position or append
      const insertAt = Math.min(Math.max(0, index), copy.length);
      copy.splice(insertAt, 0, task);
      return copy;
    });

    setDeletedTaskInfo(null);
  }, [deletedTaskInfo]);

  const dismissUndo = useCallback(() => {
    if (undoTimerRef.current) {
      clearTimeout(undoTimerRef.current);
    }
    setDeletedTaskInfo(null);
  }, []);

  return {
    tasks,
    isLoading,
    error,
    retryFetch: fetchTasksFromServer,
    addTask,
    toggleTask,
    editTaskTitle,
    deleteTask,
    deletedTaskInfo,
    undoDelete,
    dismissUndo,
  };
}

/**
 * Priority rank mapping: High -> 3, Medium -> 2, Low -> 1
 */
export const PRIORITY_RANK = {
  High: 3,
  Medium: 2,
  Low: 1,
};

/**
 * Checks if a task is overdue.
 * A task is overdue ONLY if:
 * 1. It is not completed (!task.completed)
 * 2. It has a valid dueDate
 * 3. The dueDate is strictly before today's date (comparing YYYY-MM-DD strings)
 *
 * @param {Object} task
 * @param {string} [currentDateStr] - YYYY-MM-DD format for deterministic testing
 */
export function isTaskOverdue(task, currentDateStr) {
  if (!task || task.completed || !task.dueDate) return false;

  const todayStr =
    currentDateStr || new Date().toISOString().split('T')[0];

  return task.dueDate < todayStr;
}

/**
 * Formats a YYYY-MM-DD date string to a human-readable format.
 * Example: '2026-01-15' -> 'Jan 15, 2026'
 */
export function formatDueDate(dateStr) {
  if (!dateStr) return '';
  try {
    const [year, month, day] = dateStr.split('-');
    if (!year || !month || !day) return dateStr;
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

/**
 * Filters tasks based on status and search query.
 *
 * @param {Array} tasks
 * @param {'All'|'Active'|'Completed'} filter
 * @param {string} searchQuery
 */
export function filterTasks(tasks, filter = 'All', searchQuery = '') {
  const query = searchQuery.trim().toLowerCase();

  return tasks.filter((task) => {
    // 1. Status Filter
    if (filter === 'Active' && task.completed) return false;
    if (filter === 'Completed' && !task.completed) return false;

    // 2. Search Query (case-insensitive matching on title)
    if (query && !task.title.toLowerCase().includes(query)) {
      return false;
    }

    return true;
  });
}

/**
 * Sorts tasks based on the selected sortBy option:
 * - 'dueDate': soonest first, tasks with no date (null/empty) placed last
 * - 'priority': High -> Medium -> Low
 * - 'default': preserves original task order
 *
 * @param {Array} tasks
 * @param {'dueDate'|'priority'|'default'} sortBy
 */
export function sortTasks(tasks, sortBy = 'default') {
  const copy = [...tasks];

  if (sortBy === 'dueDate') {
    return copy.sort((a, b) => {
      // If neither has dueDate, preserve relative order
      if (!a.dueDate && !b.dueDate) return 0;
      // Tasks with no dueDate always go to the end
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      // Compare YYYY-MM-DD strings directly (soonest first)
      return a.dueDate.localeCompare(b.dueDate);
    });
  }

  if (sortBy === 'priority') {
    return copy.sort((a, b) => {
      const rankA = PRIORITY_RANK[a.priority] || 0;
      const rankB = PRIORITY_RANK[b.priority] || 0;
      return rankB - rankA; // High (3) first
    });
  }

  return copy;
}

import { describe, it, expect } from 'vitest';
import {
  isTaskOverdue,
  filterTasks,
  sortTasks,
  formatDueDate,
} from './taskUtils';

const STARTER_DATA = [
  {
    id: 1,
    title: 'Set up project repo',
    priority: 'High',
    dueDate: '2026-01-10',
    completed: true,
  },
  {
    id: 2,
    title: 'Design login screen',
    priority: 'Medium',
    dueDate: '2027-03-12',
    completed: false,
  },
  {
    id: 3,
    title: 'Write API docs',
    priority: 'Low',
    dueDate: '2027-04-20',
    completed: false,
  },
  {
    id: 4,
    title: 'Fix checkout bug',
    priority: 'High',
    dueDate: '2026-01-15',
    completed: false,
  },
  {
    id: 5,
    title: 'Plan team outing',
    priority: 'Low',
    dueDate: null,
    completed: true,
  },
];

describe('Assessment Requirement Verification with Starter Data', () => {
  const CURRENT_DATE = '2026-11-08';

  it('verifies active task counter equals 3 tasks left', () => {
    const activeTasks = filterTasks(STARTER_DATA, 'Active');
    expect(activeTasks.length).toBe(3);
    const activeIds = activeTasks.map((t) => t.id);
    expect(activeIds).toEqual([2, 3, 4]);
  });

  it('verifies ONLY "Fix checkout bug" shows Overdue in starter data', () => {
    const overdueTasks = STARTER_DATA.filter((task) =>
      isTaskOverdue(task, CURRENT_DATE)
    );
    expect(overdueTasks.length).toBe(1);
    expect(overdueTasks[0].title).toBe('Fix checkout bug');
    expect(overdueTasks[0].id).toBe(4);

    // Task 1 is past due (2026-01-10) but completed=true, so NOT overdue
    expect(isTaskOverdue(STARTER_DATA[0], CURRENT_DATE)).toBe(false);
  });

  it('verifies sorting All tab by due date matches exact prompt order', () => {
    const sorted = sortTasks(STARTER_DATA, 'dueDate');
    const titles = sorted.map((t) => t.title);

    expect(titles).toEqual([
      'Set up project repo', // 2026-01-10
      'Fix checkout bug', // 2026-01-15
      'Design login screen', // 2027-03-12
      'Write API docs', // 2027-04-20
      'Plan team outing', // null (no date last)
    ]);
  });

  it('sorts tasks correctly by priority (High first)', () => {
    const sorted = sortTasks(STARTER_DATA, 'priority');
    const priorities = sorted.map((t) => t.priority);
    expect(priorities).toEqual(['High', 'High', 'Medium', 'Low', 'Low']);
  });

  it('filters correctly by Completed status', () => {
    const completed = filterTasks(STARTER_DATA, 'Completed');
    expect(completed.length).toBe(2);
    expect(completed.map((t) => t.id)).toEqual([1, 5]);
  });

  it('searches by title case-insensitively and combines with status filter', () => {
    // Search 'screen'
    const searchResult = filterTasks(STARTER_DATA, 'All', 'ScReEn');
    expect(searchResult.length).toBe(1);
    expect(searchResult[0].title).toBe('Design login screen');

    // Search 'bug' when looking at Completed tab -> should be 0 because it is Active
    const emptyResult = filterTasks(STARTER_DATA, 'Completed', 'bug');
    expect(emptyResult.length).toBe(0);

    // Search 'bug' when looking at Active tab -> should find it
    const activeBug = filterTasks(STARTER_DATA, 'Active', 'bug');
    expect(activeBug.length).toBe(1);
  });

  it('formats dates properly', () => {
    expect(formatDueDate('2026-01-15')).toBe('Jan 15, 2026');
    expect(formatDueDate(null)).toBe('');
  });
});

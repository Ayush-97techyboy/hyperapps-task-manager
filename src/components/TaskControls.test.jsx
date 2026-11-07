import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskControls } from './TaskControls';

describe('TaskControls Component (React Testing Library)', () => {
  it('renders filter tabs, active counter, search input, and sort dropdown', () => {
    const handleFilterChange = vi.fn();
    const handleSearchChange = vi.fn();
    const handleSortChange = vi.fn();

    render(
      <TaskControls
        currentFilter="All"
        onFilterChange={handleFilterChange}
        activeCount={3}
        searchQuery=""
        onSearchChange={handleSearchChange}
        sortBy="default"
        onSortChange={handleSortChange}
      />
    );

    // Filter tabs exist
    expect(screen.getByRole('tab', { name: 'All' })).toBeDefined();
    expect(screen.getByRole('tab', { name: 'Active' })).toBeDefined();
    expect(screen.getByRole('tab', { name: 'Completed' })).toBeDefined();

    // Counter shows "3 tasks left"
    expect(screen.getByText('3')).toBeDefined();
    expect(screen.getByText(/tasks left/i)).toBeDefined();

    // Search input exists
    const searchInput = screen.getByPlaceholderText(/search tasks/i);
    expect(searchInput).toBeDefined();

    // Sort select exists
    const sortSelect = screen.getByLabelText(/sort:/i);
    expect(sortSelect).toBeDefined();
  });

  it('triggers onFilterChange when a tab is clicked', () => {
    const handleFilterChange = vi.fn();

    render(
      <TaskControls
        currentFilter="All"
        onFilterChange={handleFilterChange}
        activeCount={3}
        searchQuery=""
        onSearchChange={vi.fn()}
        sortBy="default"
        onSortChange={vi.fn()}
      />
    );

    const activeTab = screen.getByRole('tab', { name: 'Active' });
    fireEvent.click(activeTab);
    expect(handleFilterChange).toHaveBeenCalledWith('Active');
  });

  it('triggers onSearchChange when typing into search input', () => {
    const handleSearchChange = vi.fn();

    render(
      <TaskControls
        currentFilter="All"
        onFilterChange={vi.fn()}
        activeCount={3}
        searchQuery=""
        onSearchChange={handleSearchChange}
        sortBy="default"
        onSortChange={vi.fn()}
      />
    );

    const searchInput = screen.getByPlaceholderText(/search tasks/i);
    fireEvent.change(searchInput, { target: { value: 'checkout' } });
    expect(handleSearchChange).toHaveBeenCalledWith('checkout');
  });

  it('triggers onSortChange when sort dropdown selection changes', () => {
    const handleSortChange = vi.fn();

    render(
      <TaskControls
        currentFilter="All"
        onFilterChange={vi.fn()}
        activeCount={3}
        searchQuery=""
        onSearchChange={vi.fn()}
        sortBy="default"
        onSortChange={handleSortChange}
      />
    );

    const sortSelect = screen.getByLabelText(/sort:/i);
    fireEvent.change(sortSelect, { target: { value: 'dueDate' } });
    expect(handleSortChange).toHaveBeenCalledWith('dueDate');
  });
});

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskInput } from './TaskInput';

describe('TaskInput Component (React Testing Library)', () => {
  it('renders input, priority select, and due date picker', () => {
    render(<TaskInput onAddTask={vi.fn()} />);

    expect(screen.getByPlaceholderText(/add a new task/i)).toBeDefined();
    expect(screen.getByLabelText(/priority:/i)).toBeDefined();
    expect(screen.getByLabelText(/due:/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /add task/i })).toBeDefined();
  });

  it('shows validation error when attempting to submit empty or whitespace title', () => {
    const handleAdd = vi.fn();
    render(<TaskInput onAddTask={handleAdd} />);

    const submitBtn = screen.getByRole('button', { name: /add task/i });
    fireEvent.click(submitBtn);

    expect(screen.getByRole('alert')).toBeDefined();
    expect(
      screen.getByText(/task title is required and cannot be empty/i)
    ).toBeDefined();
    expect(handleAdd).not.toHaveBeenCalled();

    // Type only spaces and submit
    const input = screen.getByPlaceholderText(/add a new task/i);
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(submitBtn);

    expect(handleAdd).not.toHaveBeenCalled();
  });

  it('submits on Enter key when title is provided', () => {
    const handleAdd = vi.fn().mockReturnValue({ success: true });
    render(<TaskInput onAddTask={handleAdd} />);

    const input = screen.getByPlaceholderText(/add a new task/i);
    fireEvent.change(input, { target: { value: 'Complete the presentation' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(handleAdd).toHaveBeenCalledWith({
      title: 'Complete the presentation',
      priority: 'Medium',
      dueDate: null,
    });
  });
});

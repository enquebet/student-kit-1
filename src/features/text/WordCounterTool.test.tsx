import React from 'react';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import WordCounterTool from './WordCounterTool';

// Mock ToolShell because we just want to test the inner content
vi.mock('@/components/tools/ToolShell', () => ({
  ToolShell: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('WordCounterTool', () => {
  it('counts words and characters correctly', () => {
    render(<WordCounterTool />);
    
    // Find the textarea
    const textarea = screen.getByPlaceholderText(/Start typing/i);
    
    // Type text
    fireEvent.change(textarea, { target: { value: 'Hello world! This is a test.' } });
    
    // Check results
    expect(screen.getByText('6')).toBeInTheDocument(); // Words
    expect(screen.getByText('28')).toBeInTheDocument(); // Characters (including spaces)
  });
});

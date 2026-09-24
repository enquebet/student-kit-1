import React from 'react';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import JsonFormatterTool from './JsonFormatterTool';

vi.mock('@/components/tools/ToolShell', () => ({
  ToolShell: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('JsonFormatterTool', () => {
  it('formats JSON string', () => {
    render(<JsonFormatterTool />);
    
    // Using test-id or placeholder
    const textarea = screen.getByPlaceholderText(/Paste your JSON here/i);
    
    fireEvent.change(textarea, { target: { value: '{"test":1}' } });
    
    const formatBtn = screen.getByText('Format');
    fireEvent.click(formatBtn);
    
    // Result should be in the document
    expect(screen.getByPlaceholderText(/Formatted JSON will appear here/i)).toHaveValue('{\n  "test": 1\n}');
  });
});

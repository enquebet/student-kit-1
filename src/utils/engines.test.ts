import { describe, it, expect } from 'vitest';
import { textEngines, mathEngines, devEngines } from './engines';

describe('Text Engines', () => {
  it('counts words correctly', () => {
    expect(textEngines.countWords('hello world')).toBe(2);
    expect(textEngines.countWords('  hello   world  ')).toBe(2);
    expect(textEngines.countWords('')).toBe(0);
  });
  
  it('counts chars correctly', () => {
    expect(textEngines.countChars('hello')).toBe(5);
  });
});

describe('Math Engines', () => {
  it('calculates average', () => {
    expect(mathEngines.calculateAverage([10, 20, 30])).toBe(20);
  });
  
  it('calculates compound interest correctly', () => {
    const amount = mathEngines.calculateCompoundInterest(1000, 5, 10, 12);
    expect(amount).toBeCloseTo(1647.009, 2);
  });
});

describe('Dev Engines', () => {
  it('validates JSON', () => {
    expect(devEngines.isValidJson('{"a": 1}')).toBe(true);
    expect(devEngines.isValidJson('{a: 1}')).toBe(false);
  });
  
  it('formats JSON', () => {
    expect(devEngines.formatJson('{"a":1}')).toBe('{\n  "a": 1\n}');
  });
});

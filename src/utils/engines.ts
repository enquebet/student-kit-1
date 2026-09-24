// Core calculation engines for Flagship tools

export const textEngines = {
  countWords: (text: string) => text.trim() ? text.trim().split(/\s+/).length : 0,
  countChars: (text: string) => text.length,
  readingTime: (text: string) => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    return Math.ceil(words / 200);
  },
  toUpper: (text: string) => text.toUpperCase(),
  toLower: (text: string) => text.toLowerCase(),
};

export const mathEngines = {
  calculateAverage: (nums: number[]) => nums.length === 0 ? 0 : nums.reduce((a,b)=>a+b,0) / nums.length,
  calculateCompoundInterest: (p: number, r: number, t: number, n: number) => {
    return p * Math.pow((1 + (r / 100) / n), n * t);
  }
};

export const devEngines = {
  isValidJson: (str: string) => {
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  },
  formatJson: (str: string) => {
    try {
      return JSON.stringify(JSON.parse(str), null, 2);
    } catch {
      return null;
    }
  }
};

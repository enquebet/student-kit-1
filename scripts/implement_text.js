import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const generateTextTool = (m) => {
  return `import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Copy, Trash2 } from 'lucide-react';

export default function ${m.compName}() {
  const [input, setInput] = useState('');
  ${m.extraState || ''}
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };
  
  ${m.calcLogic}

  return (
    <ToolShell 
      title="${m.title}" 
      description="${m.desc}" 
      category="text"
      seoTitle="${m.seoTitle}"
      seoDescription="${m.seoDesc}"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Input Text</h2>
            <button onClick={() => setInput('')} className="text-gray-400 hover:text-red-500 transition-colors" title="Clear input">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          ${m.extraUi || ''}
          
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full flex-1 min-h-[250px] p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none text-gray-700"
            placeholder="Type or paste your text here..."
          />
        </div>
        
        <div className="bg-slate-900 rounded-2xl p-6 flex flex-col h-full text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -mr-10 -mt-10 pointer-events-none"></div>
          
          <div className="flex justify-between items-center mb-4 relative z-10">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Result</h2>
            <button onClick={copyToClipboard} className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm" title="Copy to clipboard">
              <Copy className="w-4 h-4" /> Copy
            </button>
          </div>
          
          ${m.resultUi || `
          <textarea
            readOnly
            value={result}
            className="w-full flex-1 min-h-[250px] p-4 bg-slate-800/50 border border-slate-700 rounded-xl outline-none resize-none text-slate-200 relative z-10 font-mono text-sm"
            placeholder="Result will appear here..."
          />`}
          
          ${m.auxiliaryResults || ''}
        </div>
      </div>
    </ToolShell>
  );
}
`;
};

const textTools = {
  'character-counter': {
    compName: 'CharacterCounterTool',
    title: 'Character Counter',
    desc: 'Count characters with and without spaces.',
    seoTitle: 'Character Counter | Count Characters & Spaces | StudentKit',
    seoDesc: 'Count characters, spaces, and letters in any text. Free online character counter.',
    calcLogic: `
      const charsWithSpaces = input.length;
      const charsWithoutSpaces = input.replace(/\\s/g, '').length;
      const spaces = charsWithSpaces - charsWithoutSpaces;
      const result = input; // not used in output box directly
    `,
    resultUi: `
      <div className="flex-1 flex flex-col justify-center items-center relative z-10 gap-8">
        <div className="text-center">
          <div className="text-6xl font-extrabold text-white">{charsWithSpaces}</div>
          <div className="text-slate-400 font-medium mt-2">Characters (with spaces)</div>
        </div>
        
        <div className="grid grid-cols-2 gap-8 w-full border-t border-slate-700 pt-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">{charsWithoutSpaces}</div>
            <div className="text-slate-400 text-sm mt-1">Without Spaces</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">{spaces}</div>
            <div className="text-slate-400 text-sm mt-1">Space Characters</div>
          </div>
        </div>
      </div>
    `
  },
  'case-converter': {
    compName: 'CaseConverterTool',
    title: 'Case Converter',
    desc: 'Convert text case (UPPER, lower, Title, etc).',
    seoTitle: 'Case Converter | UPPERCASE & lowercase | StudentKit',
    seoDesc: 'Convert text to uppercase, lowercase, title case, camel case, and more.',
    extraState: `const [caseType, setCaseType] = useState('upper');`,
    extraUi: `
      <div className="mb-4">
        <select value={caseType} onChange={(e) => setCaseType(e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none text-sm font-semibold">
          <option value="upper">UPPERCASE</option>
          <option value="lower">lowercase</option>
          <option value="title">Title Case</option>
          <option value="sentence">Sentence case.</option>
          <option value="camel">camelCase</option>
          <option value="pascal">PascalCase</option>
          <option value="snake">snake_case</option>
          <option value="kebab">kebab-case</option>
        </select>
      </div>
    `,
    calcLogic: `
      let result = '';
      if (input) {
        switch(caseType) {
          case 'upper': result = input.toUpperCase(); break;
          case 'lower': result = input.toLowerCase(); break;
          case 'title': result = input.toLowerCase().replace(/(?:^|\\s|-)\\w/g, match => match.toUpperCase()); break;
          case 'sentence': result = input.toLowerCase().replace(/(^\\s*\\w|[\\.!?]\\s*\\w)/g, match => match.toUpperCase()); break;
          case 'camel': result = input.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()); break;
          case 'pascal': result = input.toLowerCase().replace(/(?:^|[^a-zA-Z0-9]+)(.)/g, (m, chr) => chr.toUpperCase()); break;
          case 'snake': result = input.toLowerCase().replace(/\\W+/g, ' ').trim().replace(/\\s+/g, '_'); break;
          case 'kebab': result = input.toLowerCase().replace(/\\W+/g, ' ').trim().replace(/\\s+/g, '-'); break;
        }
      }
    `
  },
  'remove-duplicate-lines': {
    compName: 'RemoveDuplicateLinesTool',
    title: 'Duplicate Line Remover',
    desc: 'Remove duplicate lines from text.',
    seoTitle: 'Remove Duplicate Lines | Text Tool | StudentKit',
    seoDesc: 'Easily remove duplicate lines and empty lines from your text lists.',
    calcLogic: `
      const lines = input.split('\\n');
      const uniqueLines = [...new Set(lines)];
      const result = uniqueLines.join('\\n');
      const removedCount = lines.length - uniqueLines.length;
    `,
    auxiliaryResults: `
      <div className="mt-4 text-xs font-semibold text-blue-400 bg-blue-500/10 inline-block px-2 py-1 rounded relative z-10 self-start">
        Removed {removedCount} duplicate lines
      </div>
    `
  },
  'text-sorter': {
    compName: 'TextSorterTool',
    title: 'Text Sorter',
    desc: 'Sort lines alphabetically or by length.',
    seoTitle: 'Text Line Sorter | Alphabetical | StudentKit',
    seoDesc: 'Sort text lines alphabetically (A-Z, Z-A) or by string length quickly.',
    extraState: `const [sortType, setSortType] = useState('az');`,
    extraUi: `
      <div className="mb-4">
        <select value={sortType} onChange={(e) => setSortType(e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none text-sm font-semibold">
          <option value="az">Alphabetical (A - Z)</option>
          <option value="za">Alphabetical (Z - A)</option>
          <option value="lengthAsc">Length (Shortest to Longest)</option>
          <option value="lengthDesc">Length (Longest to Shortest)</option>
        </select>
      </div>
    `,
    calcLogic: `
      const lines = input.split('\\n');
      let sorted = [...lines];
      if (sortType === 'az') sorted.sort((a, b) => a.localeCompare(b));
      if (sortType === 'za') sorted.sort((a, b) => b.localeCompare(a));
      if (sortType === 'lengthAsc') sorted.sort((a, b) => a.length - b.length);
      if (sortType === 'lengthDesc') sorted.sort((a, b) => b.length - a.length);
      const result = sorted.join('\\n');
    `
  },
  'text-cleaner': {
    compName: 'TextCleanerTool',
    title: 'Text Cleaner',
    desc: 'Remove extra spaces and empty lines.',
    seoTitle: 'Text Cleaner | Remove Extra Spaces | StudentKit',
    seoDesc: 'Clean up messy text by removing double spaces, empty lines, and trailing spaces.',
    calcLogic: `
      const result = input.split('\\n')
        .map(line => line.trim().replace(/\\s{2,}/g, ' '))
        .filter(line => line.length > 0)
        .join('\\n');
    `
  },
  'find-replace': {
    compName: 'FindReplaceTool',
    title: 'Find and Replace',
    desc: 'Find and replace text efficiently.',
    seoTitle: 'Find and Replace Text Online | StudentKit',
    seoDesc: 'Search for text strings and replace them with new values instantly.',
    extraState: `const [find, setFind] = useState('');\n  const [replace, setReplace] = useState('');\n  const [matchCase, setMatchCase] = useState(false);`,
    extraUi: `
      <div className="flex flex-col gap-3 mb-4">
        <input type="text" value={find} onChange={e=>setFind(e.target.value)} placeholder="Find..." className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none text-sm" />
        <input type="text" value={replace} onChange={e=>setReplace(e.target.value)} placeholder="Replace with..." className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none text-sm" />
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input type="checkbox" checked={matchCase} onChange={e=>setMatchCase(e.target.checked)} />
          Match Case
        </label>
      </div>
    `,
    calcLogic: `
      let result = input;
      if (find !== '') {
        const flags = matchCase ? 'g' : 'gi';
        try {
          const regex = new RegExp(find.replace(/[.*+?^\\$\\{\\}()|[\\]\\\\]/g, '\\\\$&'), flags);
          result = input.replace(regex, replace);
        } catch(e) {}
      }
    `
  },
  'text-reverser': {
    compName: 'TextReverserTool',
    title: 'Text Reverser',
    desc: 'Reverse text characters or words.',
    seoTitle: 'Text Reverser | Reverse String Online | StudentKit',
    seoDesc: 'Reverse the order of characters, words, or lines in a text string.',
    extraState: `const [revType, setRevType] = useState('chars');`,
    extraUi: `
      <div className="mb-4">
        <select value={revType} onChange={(e) => setRevType(e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none text-sm font-semibold">
          <option value="chars">Reverse Characters</option>
          <option value="words">Reverse Words</option>
          <option value="lines">Reverse Lines</option>
        </select>
      </div>
    `,
    calcLogic: `
      let result = '';
      if (input) {
        if (revType === 'chars') result = input.split('').reverse().join('');
        if (revType === 'words') result = input.split(' ').reverse().join(' ');
        if (revType === 'lines') result = input.split('\\n').reverse().join('\\n');
      }
    `
  },
  'reading-time': {
    compName: 'ReadingTimeTool',
    title: 'Reading Time Calculator',
    desc: 'Calculate estimated reading and speaking time.',
    seoTitle: 'Reading Time Calculator | StudentKit',
    seoDesc: 'Find out how long it takes to read your text or speech based on word count.',
    calcLogic: `
      const words = input.trim() === '' ? 0 : input.trim().split(/\\s+/).length;
      const readMins = Math.ceil(words / 238); // avg adult reading speed 238 wpm
      const speakMins = Math.ceil(words / 130); // avg speaking speed 130 wpm
      const result = input;
    `,
    resultUi: `
      <div className="flex-1 flex flex-col justify-center items-center relative z-10 gap-8">
        <div className="grid grid-cols-2 gap-8 w-full">
          <div className="text-center">
            <div className="text-4xl font-extrabold text-white">~{readMins} min</div>
            <div className="text-slate-400 font-medium mt-2 text-sm">Silent Reading Time</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-extrabold text-white">~{speakMins} min</div>
            <div className="text-slate-400 font-medium mt-2 text-sm">Speaking Time</div>
          </div>
        </div>
        <div className="mt-4 text-slate-500 text-xs">Based on {words} words.</div>
      </div>
    `
  },
  'lorem-ipsum': {
    compName: 'LoremIpsumTool',
    title: 'Lorem Ipsum Generator',
    desc: 'Generate placeholder text for designs.',
    seoTitle: 'Lorem Ipsum Generator | StudentKit',
    seoDesc: 'Generate dummy placeholder text for your websites and designs.',
    extraState: `const [paragraphs, setParagraphs] = useState(3);`,
    extraUi: `
      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-700 mb-2">Number of Paragraphs</label>
        <input type="number" min="1" max="50" value={paragraphs} onChange={e=>setParagraphs(parseInt(e.target.value)||1)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none text-sm" />
      </div>
    `,
    calcLogic: `
      const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
      
      let result = '';
      for(let i = 0; i < paragraphs; i++) {
        result += lorem + '\\n\\n';
      }
      result = result.trim();
    `
  }
};

Object.entries(textTools).forEach(([slug, m]) => {
  const filePath = path.join(rootDir, 'src', 'features', 'text', `${m.compName}.tsx`);
  const content = generateTextTool(m);
  fs.writeFileSync(filePath, content);
});

console.log('Text tools implemented.');

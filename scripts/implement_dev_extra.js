import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const generateDevTextTool = (m) => {
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
      category="developer"
      seoTitle="${m.seoTitle}"
      seoDescription="${m.seoDesc}"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Input</h2>
            <button onClick={() => setInput('')} className="text-gray-400 hover:text-red-500 transition-colors" title="Clear input">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          ${m.extraUi || ''}
          
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full flex-1 min-h-[250px] p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none text-gray-700 font-mono text-sm"
            placeholder="Type or paste here..."
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

const devTools = {
  'json-to-csv': {
    compName: 'JsonToCsvTool',
    title: 'JSON to CSV Converter',
    desc: 'Convert JSON arrays to CSV format.',
    seoTitle: 'JSON to CSV Converter | Online Data Tool | StudentKit',
    seoDesc: 'Easily convert JSON objects and arrays into comma-separated values (CSV) format.',
    calcLogic: `
      let result = '';
      if (input.trim()) {
        try {
          const parsed = JSON.parse(input);
          let arr = Array.isArray(parsed) ? parsed : [parsed];
          if (arr.length > 0) {
            const keys = Object.keys(arr[0]);
            result = keys.join(',') + '\\n';
            arr.forEach(obj => {
              result += keys.map(k => {
                let val = obj[k];
                if (typeof val === 'object' && val !== null) val = JSON.stringify(val);
                if (typeof val === 'string') return '"' + val.replace(/"/g, '""') + '"';
                return val;
              }).join(',') + '\\n';
            });
          }
        } catch(e: any) {
          result = 'Error parsing JSON: ' + e.message;
        }
      }
    `
  },
  'csv-to-json': {
    compName: 'CsvToJsonTool',
    title: 'CSV to JSON Converter',
    desc: 'Convert CSV data to JSON format.',
    seoTitle: 'CSV to JSON Converter | Online Data Tool | StudentKit',
    seoDesc: 'Easily convert comma-separated values (CSV) format into JSON arrays.',
    calcLogic: `
      let result = '';
      if (input.trim()) {
        try {
          const lines = input.split('\\n').filter(l => l.trim().length > 0);
          if (lines.length > 0) {
            const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
            const jsonArr = [];
            for (let i = 1; i < lines.length; i++) {
              const obj: any = {};
              // simplistic CSV splitting that ignores commas inside quotes
              const vals = lines[i].match(/(".*?"|[^",\\s]+)(?=\\s*,|\\s*$)/g) || lines[i].split(',');
              headers.forEach((h, idx) => {
                let val = vals[idx] ? vals[idx].trim().replace(/^"|"$/g, '') : '';
                if (!isNaN(Number(val)) && val !== '') val = Number(val) as any;
                obj[h] = val;
              });
              jsonArr.push(obj);
            }
            result = JSON.stringify(jsonArr, null, 2);
          }
        } catch(e: any) {
          result = 'Error converting CSV: ' + e.message;
        }
      }
    `
  },
  'sql-formatter': {
    compName: 'SqlFormatterTool',
    title: 'SQL Formatter',
    desc: 'Format SQL queries locally.',
    seoTitle: 'SQL Formatter | Format SQL Code | StudentKit',
    seoDesc: 'Beautify your SQL code locally in the browser with this fast SQL formatter.',
    calcLogic: `
      // Very basic rudimentary SQL formatting since we are not pulling heavy libs
      let result = '';
      if (input) {
        result = input
          .replace(/\\s+/g, ' ')
          .replace(/ (SELECT|FROM|WHERE|AND|OR|ORDER BY|GROUP BY|LEFT JOIN|RIGHT JOIN|INNER JOIN|JOIN|ON|LIMIT|OFFSET|HAVING) /gi, '\\n$1 ')
          .replace(/,(?=[^ ])/g, ', ')
          .trim();
      }
    `
  },
  'timestamp-converter': {
    compName: 'TimestampConverterTool',
    title: 'Timestamp Converter',
    desc: 'Convert Unix timestamps to human-readable dates.',
    seoTitle: 'Unix Timestamp Converter | StudentKit',
    seoDesc: 'Convert epoch Unix timestamps to human-readable dates locally.',
    calcLogic: `
      let result = '';
      if (input) {
        let ts = parseInt(input);
        if (!isNaN(ts)) {
           if (input.length <= 10) ts *= 1000; // seconds to ms
           const d = new Date(ts);
           result = \`Local: \${d.toLocaleString()}\\nUTC:   \${d.toUTCString()}\\nISO:   \${d.toISOString()}\`;
        } else {
           result = 'Invalid timestamp';
        }
      }
    `,
    extraUi: `
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2">Enter a Unix timestamp (seconds or milliseconds).</p>
      </div>
    `
  }
};

Object.entries(devTools).forEach(([slug, m]) => {
  const filePath = path.join(rootDir, 'src', 'features', 'developer', `${m.compName}.tsx`);
  const content = generateDevTextTool(m);
  fs.writeFileSync(filePath, content);
});

console.log('Dev Extra tools implemented.');

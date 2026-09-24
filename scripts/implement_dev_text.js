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
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Input Text</h2>
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
  'base64-encoder': {
    compName: 'Base64EncoderTool',
    title: 'Base64 Encoder',
    desc: 'Encode text to Base64.',
    seoTitle: 'Base64 Encoder | Fast Online Text to Base64 | StudentKit',
    seoDesc: 'Convert plain text to Base64 encoded string securely in your browser.',
    calcLogic: `
      let result = '';
      try {
        result = input ? btoa(unescape(encodeURIComponent(input))) : '';
      } catch (e) {
        result = 'Error encoding text';
      }
    `
  },
  'base64-decoder': {
    compName: 'Base64DecoderTool',
    title: 'Base64 Decoder',
    desc: 'Decode Base64 to text.',
    seoTitle: 'Base64 Decoder | Decode Base64 to Text | StudentKit',
    seoDesc: 'Decode Base64 strings to plain text securely in your browser.',
    calcLogic: `
      let result = '';
      try {
        result = input ? decodeURIComponent(escape(atob(input))) : '';
      } catch (e) {
        result = 'Invalid Base64 string';
      }
    `
  },
  'url-encoder': {
    compName: 'UrlEncoderTool',
    title: 'URL Encoder',
    desc: 'Encode text for URLs.',
    seoTitle: 'URL Encoder | Online URL Encode Tool | StudentKit',
    seoDesc: 'Encode text strings with URL encoding (percent-encoding) for safe use in web addresses.',
    calcLogic: `
      let result = '';
      try {
        result = input ? encodeURIComponent(input) : '';
      } catch (e) {
        result = 'Error encoding text';
      }
    `
  },
  'url-decoder': {
    compName: 'UrlDecoderTool',
    title: 'URL Decoder',
    desc: 'Decode URL-encoded text.',
    seoTitle: 'URL Decoder | Decode URL Entities | StudentKit',
    seoDesc: 'Decode URL-encoded strings back to their original plain text format.',
    calcLogic: `
      let result = '';
      try {
        result = input ? decodeURIComponent(input) : '';
      } catch (e) {
        result = 'Invalid URL encoded string';
      }
    `
  },
  'html-encoder': {
    compName: 'HtmlEncoderTool',
    title: 'HTML Encoder / Decoder',
    desc: 'Encode and decode HTML entities.',
    seoTitle: 'HTML Entity Encoder and Decoder | StudentKit',
    seoDesc: 'Encode HTML characters into entities or decode entities back into plain text.',
    extraState: `const [mode, setMode] = useState<'encode'|'decode'>('encode');`,
    extraUi: `
      <div className="mb-4">
        <select value={mode} onChange={(e) => setMode(e.target.value as any)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none text-sm font-semibold">
          <option value="encode">Encode HTML Entities</option>
          <option value="decode">Decode HTML Entities</option>
        </select>
      </div>
    `,
    calcLogic: `
      let result = '';
      if (input) {
        if (mode === 'encode') {
          result = input.replace(/[\u00A0-\u9999<>\&]/g, (i) => '&#'+i.charCodeAt(0)+';');
        } else {
          try {
            const doc = new DOMParser().parseFromString(input, "text/html");
            result = doc.documentElement.textContent || '';
          } catch(e) {
            result = 'Error decoding text';
          }
        }
      }
    `
  },
  'json-validator': {
    compName: 'JsonValidatorTool',
    title: 'JSON Validator',
    desc: 'Validate JSON and find syntax errors.',
    seoTitle: 'JSON Validator | Format and Check JSON | StudentKit',
    seoDesc: 'Check your JSON code for syntax errors. Free browser-based JSON validator.',
    calcLogic: `
      let result = '';
      let isValid = false;
      if (input.trim() === '') {
        result = '';
      } else {
        try {
          JSON.parse(input);
          result = 'Valid JSON ✅';
          isValid = true;
        } catch (e: any) {
          result = 'Invalid JSON ❌\\n\\n' + e.message;
        }
      }
    `,
    auxiliaryResults: `
      <div className={\`mt-4 px-4 py-3 rounded-lg font-bold text-sm inline-block \${isValid ? 'bg-green-500/20 text-green-400' : (input ? 'bg-red-500/20 text-red-400' : 'hidden')}\`}>
        {isValid ? 'Ready to use!' : 'Fix errors to continue'}
      </div>
    `
  },
  'css-minifier': {
    compName: 'CssMinifierTool',
    title: 'CSS Minifier',
    desc: 'Minify CSS code locally.',
    seoTitle: 'CSS Minifier | Compress CSS Online | StudentKit',
    seoDesc: 'Minify your CSS stylesheets instantly to reduce file size and improve loading times.',
    calcLogic: `
      let result = '';
      if (input) {
        result = input
          .replace(/\\/\\*.*?\\*\\//g, '') // remove comments
          .replace(/\\s+/g, ' ') // collapse whitespace
          .replace(/\\s*([{}:;,>+~])\\s*/g, '$1') // remove spaces around syntax
          .replace(/;}/g, '}') // remove trailing semicolon
          .trim();
      }
    `
  },
  'javascript-minifier': {
    compName: 'JavascriptMinifierTool',
    title: 'JavaScript Minifier',
    desc: 'Minify JavaScript code locally (Basic).',
    seoTitle: 'JavaScript Minifier | Compress JS Code | StudentKit',
    seoDesc: 'Quickly minify your JavaScript code by removing comments and unnecessary whitespace.',
    calcLogic: `
      let result = '';
      if (input) {
        // Basic minification: removes single line and multi line comments, then collapses spaces.
        // Not a full AST-based minifier, but good enough for a simple tool.
        result = input
          .replace(/\\/\\*[\\s\\S]*?\\*\\//g, '')
          .replace(/\\/\\/.*/g, '')
          .replace(/\\s+/g, ' ')
          .replace(/\\s*([{}:;,=+\\-*/%<>&|!()?])\\s*/g, '$1')
          .trim();
      }
    `
  },
  'uuid-generator': {
    compName: 'UuidGeneratorTool',
    title: 'UUID Generator',
    desc: 'Generate random UUIDs securely.',
    seoTitle: 'UUID Generator | Online GUID Generator | StudentKit',
    seoDesc: 'Generate cryptographically secure v4 UUIDs / GUIDs instantly.',
    extraState: `const [count, setCount] = useState(5);`,
    extraUi: `
      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-700 mb-2">Number of UUIDs</label>
        <input type="number" min="1" max="100" value={count} onChange={e=>setCount(parseInt(e.target.value)||1)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none text-sm" />
      </div>
      <button onClick={() => setInput(Date.now().toString())} className="w-full py-3 mb-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
        Regenerate UUIDs
      </button>
    `,
    calcLogic: `
      let result = '';
      // We use the input just as a trigger to re-render, we don't actually use its text value
      const generateUUIDs = () => {
        let text = '';
        for(let i=0; i<count; i++){
           text += crypto.randomUUID() + '\\n';
        }
        return text;
      };
      
      // Memoize or just run on render
      React.useEffect(() => {
         setInput('trigger');
      }, []);
      
      if (input) {
         result = generateUUIDs();
      }
    `,
    // Hack: The default template uses a textarea for input, which doesn't make sense for UUID.
    // I'll hide it with CSS for this specific tool.
    resultUi: `
          <textarea
            readOnly
            value={result}
            className="w-full flex-1 min-h-[250px] p-4 bg-slate-800/50 border border-slate-700 rounded-xl outline-none resize-none text-slate-200 relative z-10 font-mono text-sm"
          />
          <style>{\`textarea[placeholder="Type or paste here..."] { display: none; }\`}</style>
    `
  }
};

Object.entries(devTools).forEach(([slug, m]) => {
  const filePath = path.join(rootDir, 'src', 'features', 'developer', `${m.compName}.tsx`);
  const content = generateDevTextTool(m);
  fs.writeFileSync(filePath, content);
});

console.log('Dev Text tools implemented.');

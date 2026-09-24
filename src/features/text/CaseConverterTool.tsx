import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Copy, Trash2 } from 'lucide-react';

export default function CaseConverterTool() {
  const [input, setInput] = useState('');
  const [caseType, setCaseType] = useState('upper');
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };
  
  
      let result = '';
      if (input) {
        switch(caseType) {
          case 'upper': result = input.toUpperCase(); break;
          case 'lower': result = input.toLowerCase(); break;
          case 'title': result = input.toLowerCase().replace(/(?:^|\s|-)\w/g, match => match.toUpperCase()); break;
          case 'sentence': result = input.toLowerCase().replace(/(^\s*\w|[\.!?]\s*\w)/g, match => match.toUpperCase()); break;
          case 'camel': result = input.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()); break;
          case 'pascal': result = input.toLowerCase().replace(/(?:^|[^a-zA-Z0-9]+)(.)/g, (m, chr) => chr.toUpperCase()); break;
          case 'snake': result = input.toLowerCase().replace(/\W+/g, ' ').trim().replace(/\s+/g, '_'); break;
          case 'kebab': result = input.toLowerCase().replace(/\W+/g, ' ').trim().replace(/\s+/g, '-'); break;
        }
      }
    

  return (
    <ToolShell 
      title="Case Converter" 
      description="Convert text case (UPPER, lower, Title, etc)." 
      category="text"
      seoTitle="Case Converter | UPPERCASE & lowercase | StudentKit"
      seoDescription="Convert text to uppercase, lowercase, title case, camel case, and more."
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Input Text</h2>
            <button onClick={() => setInput('')} className="text-gray-400 hover:text-red-500 transition-colors" title="Clear input">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          
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
          
          
          <textarea
            readOnly
            value={result}
            className="w-full flex-1 min-h-[250px] p-4 bg-slate-800/50 border border-slate-700 rounded-xl outline-none resize-none text-slate-200 relative z-10 font-mono text-sm"
            placeholder="Result will appear here..."
          />
          
          
        </div>
      </div>
    </ToolShell>
  );
}

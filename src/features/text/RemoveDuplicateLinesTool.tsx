import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Copy, Trash2 } from 'lucide-react';

export default function RemoveDuplicateLinesTool() {
  const [input, setInput] = useState('');
  
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };
  
  
      const lines = input.split('\n');
      const uniqueLines = [...new Set(lines)];
      const result = uniqueLines.join('\n');
      const removedCount = lines.length - uniqueLines.length;
    

  return (
    <ToolShell 
      title="Duplicate Line Remover" 
      description="Remove duplicate lines from text." 
      category="text"
      seoTitle="Remove Duplicate Lines | Text Tool | StudentKit"
      seoDescription="Easily remove duplicate lines and empty lines from your text lists."
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Input Text</h2>
            <button onClick={() => setInput('')} className="text-gray-400 hover:text-red-500 transition-colors" title="Clear input">
              <Trash2 className="w-4 h-4" />
            </button>
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
          
          
      <div className="mt-4 text-xs font-semibold text-blue-400 bg-blue-500/10 inline-block px-2 py-1 rounded relative z-10 self-start">
        Removed {removedCount} duplicate lines
      </div>
    
        </div>
      </div>
    </ToolShell>
  );
}

import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Copy, Trash2 } from 'lucide-react';

export default function CharacterCounterTool() {
  const [input, setInput] = useState('');
  
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };
  
  
      const charsWithSpaces = input.length;
      const charsWithoutSpaces = input.replace(/\s/g, '').length;
      const spaces = charsWithSpaces - charsWithoutSpaces;
      const result = input; // not used in output box directly
    

  return (
    <ToolShell 
      title="Character Counter" 
      description="Count characters with and without spaces." 
      category="text"
      seoTitle="Character Counter | Count Characters & Spaces | StudentKit"
      seoDescription="Count characters, spaces, and letters in any text. Free online character counter."
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
    
          
          
        </div>
      </div>
    </ToolShell>
  );
}

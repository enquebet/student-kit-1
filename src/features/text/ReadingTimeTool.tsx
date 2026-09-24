import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Copy, Trash2 } from 'lucide-react';

export default function ReadingTimeTool() {
  const [input, setInput] = useState('');
  
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };
  
  
      const words = input.trim() === '' ? 0 : input.trim().split(/\s+/).length;
      const readMins = Math.ceil(words / 238); // avg adult reading speed 238 wpm
      const speakMins = Math.ceil(words / 130); // avg speaking speed 130 wpm
      const result = input;
    

  return (
    <ToolShell 
      title="Reading Time Calculator" 
      description="Calculate estimated reading and speaking time." 
      category="text"
      seoTitle="Reading Time Calculator | StudentKit"
      seoDescription="Find out how long it takes to read your text or speech based on word count."
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
    
          
          
        </div>
      </div>
    </ToolShell>
  );
}

import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function UrlEncoderTool() {
  const [input, setInput] = useState('https://example.com/?q=hello world & test=123');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const process = () => {
    try {
      if (mode === 'encode') {
        return encodeURIComponent(input);
      } else {
        return decodeURIComponent(input);
      }
    } catch (e) {
      return "Error processing input.";
    }
  };

  const output = process();

  return (
    <ToolShell title="URL Encoder / Decoder" description="Encode or decode strings for safe URL transmission." category="network" seoTitle="URL Encoder & Decoder | URL Component" seoDescription="Safely URL encode or URL decode text strings online. Essential tool for web developers to escape special characters.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
            <button onClick={() => setMode('encode')} className={`flex-1 py-3 rounded-md font-bold text-sm ${mode === 'encode' ? 'bg-white shadow text-blue-700' : 'text-gray-600'}`}>Encode</button>
            <button onClick={() => setMode('decode')} className={`flex-1 py-3 rounded-md font-bold text-sm ${mode === 'decode' ? 'bg-white shadow text-blue-700' : 'text-gray-600'}`}>Decode</button>
        </div>

        <div className="mb-6">
           <label className="block text-sm font-bold text-gray-700 mb-2">Input Text</label>
           <textarea 
             value={input} 
             onChange={(e) => setInput(e.target.value)}
             className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-mono min-h-[120px]"
             placeholder="Enter text to process..."
           />
        </div>

        <div>
           <label className="block text-sm font-bold text-gray-700 mb-2">Result</label>
           <textarea 
             readOnly
             value={output} 
             className="w-full p-4 border rounded-xl bg-gray-50 text-blue-800 font-mono font-medium min-h-[120px]"
           />
        </div>

      </div>
    </ToolShell>
  );
}

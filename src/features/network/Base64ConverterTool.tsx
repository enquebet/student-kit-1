import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function Base64ConverterTool() {
  const [input, setInput] = useState('Hello World!');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const process = () => {
    try {
      if (mode === 'encode') {
        return btoa(unescape(encodeURIComponent(input)));
      } else {
        return decodeURIComponent(escape(atob(input)));
      }
    } catch (e) {
      return "Invalid Base64 input.";
    }
  };

  const output = process();

  return (
    <ToolShell title="Base64 Converter" description="Encode and decode text to and from Base64 format." category="network" seoTitle="Base64 Encoder & Decoder" seoDescription="Free online Base64 encoder and decoder tool. Convert plain text into base64 format or decode base64 strings safely.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
            <button onClick={() => setMode('encode')} className={`flex-1 py-3 rounded-md font-bold text-sm ${mode === 'encode' ? 'bg-white shadow text-emerald-700' : 'text-gray-600'}`}>Encode to Base64</button>
            <button onClick={() => setMode('decode')} className={`flex-1 py-3 rounded-md font-bold text-sm ${mode === 'decode' ? 'bg-white shadow text-emerald-700' : 'text-gray-600'}`}>Decode from Base64</button>
        </div>

        <div className="mb-6">
           <label className="block text-sm font-bold text-gray-700 mb-2">Input String</label>
           <textarea 
             value={input} 
             onChange={(e) => setInput(e.target.value)}
             className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-mono min-h-[150px]"
             placeholder="Enter text..."
           />
        </div>

        <div>
           <label className="block text-sm font-bold text-gray-700 mb-2">Result</label>
           <textarea 
             readOnly
             value={output} 
             className="w-full p-4 border rounded-xl bg-gray-50 text-emerald-800 font-mono font-medium min-h-[150px]"
           />
        </div>

      </div>
    </ToolShell>
  );
}

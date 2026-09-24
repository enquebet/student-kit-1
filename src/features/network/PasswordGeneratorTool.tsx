import React, { useState, useEffect } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function PasswordGeneratorTool() {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  
  const [password, setPassword] = useState('');

  const generate = () => {
    let charset = '';
    if (upper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) charset += '0123456789';
    if (symbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    if (charset === '') return;

    let res = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
       res += charset[array[i] % charset.length];
    }
    setPassword(res);
  };

  useEffect(() => {
     generate();
  // eslint-disable-next-line
  }, [length, upper, lower, numbers, symbols]);

  return (
    <ToolShell title="Password Generator" description="Generate secure, random passwords with customizable parameters." category="network" seoTitle="Secure Password Generator | Random Passwords" seoDescription="Generate extremely secure and random passwords directly in your browser. Customize length, symbols, and numbers.">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="bg-slate-800 p-8 rounded-xl text-center mb-8 relative group">
           <div className="text-3xl md:text-4xl font-mono font-black text-emerald-400 break-all tracking-wide selection:bg-emerald-700">
               {password || 'Select options...'}
           </div>
        </div>

        <button onClick={generate} className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors mb-8 shadow-sm">
           Regenerate Password
        </button>

        <div className="grid sm:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl border">
           <div className="sm:col-span-2">
             <div className="flex justify-between mb-2">
                 <label className="font-bold text-gray-700">Password Length</label>
                 <span className="font-bold text-emerald-700">{length}</span>
             </div>
             <input type="range" min="8" max="64" value={length} onChange={(e) => setLength(parseInt(e.target.value))} className="w-full accent-emerald-600" />
           </div>
           
           <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-100 rounded">
             <input type="checkbox" checked={upper} onChange={(e) => setUpper(e.target.checked)} className="w-5 h-5 accent-emerald-600" />
             <span className="font-bold text-gray-700">Uppercase (A-Z)</span>
           </label>
           <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-100 rounded">
             <input type="checkbox" checked={lower} onChange={(e) => setLower(e.target.checked)} className="w-5 h-5 accent-emerald-600" />
             <span className="font-bold text-gray-700">Lowercase (a-z)</span>
           </label>
           <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-100 rounded">
             <input type="checkbox" checked={numbers} onChange={(e) => setNumbers(e.target.checked)} className="w-5 h-5 accent-emerald-600" />
             <span className="font-bold text-gray-700">Numbers (0-9)</span>
           </label>
           <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-100 rounded">
             <input type="checkbox" checked={symbols} onChange={(e) => setSymbols(e.target.checked)} className="w-5 h-5 accent-emerald-600" />
             <span className="font-bold text-gray-700">Symbols (@#$%)</span>
           </label>
        </div>

      </div>
    </ToolShell>
  );
}

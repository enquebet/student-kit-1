import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function RandomNumberGeneratorTool() {
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [count, setCount] = useState('1');
  const [results, setResults] = useState<number[]>([]);

  const generate = () => {
    const minVal = parseInt(min) || 0;
    const maxVal = parseInt(max) || 100;
    const c = Math.min(parseInt(count) || 1, 1000); // limit to 1000
    
    if (minVal >= maxVal) return;
    
    const arr = [];
    for(let i=0; i<c; i++){
       arr.push(Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal);
    }
    setResults(arr);
  };

  return (
    <ToolShell title="Random Number Generator" description="Generate random numbers securely." category="everyday" seoTitle="Random Number Generator | 1 to 100 | StudentKit" seoDescription="Generate completely random numbers within any custom range instantly.">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 space-y-4">
           <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Minimum Value</label>
              <input type="number" value={min} onChange={e=>setMin(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" />
           </div>
           <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Maximum Value</label>
              <input type="number" value={max} onChange={e=>setMax(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" />
           </div>
           <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">How many numbers?</label>
              <input type="number" min="1" max="1000" value={count} onChange={e=>setCount(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" />
           </div>
           <button onClick={generate} className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
             Generate
           </button>
        </div>
        <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white h-[400px] flex flex-col">
           <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Results</h2>
           <div className="flex-1 overflow-y-auto pr-2">
              {results.length > 0 ? (
                 <div className="flex flex-wrap gap-3">
                    {results.map((r,i) => (
                       <div key={i} className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-xl font-bold font-mono">{r}</div>
                    ))}
                 </div>
              ) : (
                 <p className="text-slate-500 font-medium">Click generate to see results.</p>
              )}
           </div>
        </div>
      </div>
    </ToolShell>
  );
}

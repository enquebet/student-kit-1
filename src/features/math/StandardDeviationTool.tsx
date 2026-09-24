import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function StandardDeviationTool() {
  const [input, setInput] = useState('10, 12, 23, 23, 16, 23, 21, 16');
  const [type, setType] = useState<'population' | 'sample'>('sample');

  const calculate = () => {
    if (!input.trim()) return null;
    const nums = input.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
    if (nums.length < 2) return null; // Need at least 2 for sample

    const n = nums.length;
    const mean = nums.reduce((a, b) => a + b, 0) / n;
    
    const squaredDiffs = nums.map(x => Math.pow(x - mean, 2));
    const sumSquaredDiffs = squaredDiffs.reduce((a, b) => a + b, 0);

    const variance = type === 'population' ? (sumSquaredDiffs / n) : (sumSquaredDiffs / (n - 1));
    const stdDev = Math.sqrt(variance);
    
    return { n, mean, variance, stdDev };
  };

  const res = calculate();

  return (
    <ToolShell title="Standard Deviation Calculator" description="Calculate population or sample standard deviation." category="math" seoTitle="Standard Deviation Calculator | Population & Sample" seoDescription="Calculate standard deviation, variance, and mean for any dataset. Supports both sample and population calculations.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg mb-6">
            <button onClick={() => setType('sample')} className={`flex-1 py-3 rounded-md font-bold text-sm ${type === 'sample' ? 'bg-white shadow text-purple-700' : 'text-gray-600'}`}>Sample</button>
            <button onClick={() => setType('population')} className={`flex-1 py-3 rounded-md font-bold text-sm ${type === 'population' ? 'bg-white shadow text-purple-700' : 'text-gray-600'}`}>Population</button>
        </div>

        <div className="mb-6">
           <label className="block text-sm font-bold text-gray-700 mb-2">Dataset (comma or space separated)</label>
           <textarea 
             value={input} 
             onChange={(e) => setInput(e.target.value)}
             className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none font-mono min-h-[120px]"
             placeholder="e.g. 2.4, 3.1, 5.5, 4.2"
           />
        </div>

        {res ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
             <div className="bg-gray-50 p-4 rounded-xl border text-center">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Count (N)</div>
                <div className="text-xl font-black text-gray-800">{res.n}</div>
             </div>
             <div className="bg-gray-50 p-4 rounded-xl border text-center">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Mean</div>
                <div className="text-xl font-black text-gray-800">{parseFloat(res.mean.toFixed(6))}</div>
             </div>
             <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 text-center">
                <div className="text-xs font-bold text-purple-800 uppercase tracking-wider mb-1">Variance</div>
                <div className="text-xl font-black text-purple-600">{parseFloat(res.variance.toFixed(6))}</div>
             </div>
             <div className="bg-purple-600 p-4 rounded-xl border border-purple-700 text-center shadow-md">
                <div className="text-xs font-bold text-purple-100 uppercase tracking-wider mb-1">Std Dev</div>
                <div className="text-2xl font-black text-white">{parseFloat(res.stdDev.toFixed(6))}</div>
             </div>
          </div>
        ) : (
          <div className="bg-gray-50 p-6 rounded-xl border text-center text-gray-500 font-bold">
             Enter at least two numbers to calculate.
          </div>
        )}
      </div>
    </ToolShell>
  );
}

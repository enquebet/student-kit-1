import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function VarianceCalculatorTool() {
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
    
    return { n, mean, variance, stdDev, sumSquaredDiffs };
  };

  const res = calculate();

  return (
    <ToolShell title="Variance Calculator" description="Calculate variance (σ²) of a dataset." category="math" seoTitle="Variance Calculator | Sample & Population Variance" seoDescription="Find the variance and standard deviation of any data set. Supports both sample variance (s²) and population variance (σ²).">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg mb-6">
            <button onClick={() => setType('sample')} className={`flex-1 py-3 rounded-md font-bold text-sm ${type === 'sample' ? 'bg-white shadow text-pink-700' : 'text-gray-600'}`}>Sample Variance (s²)</button>
            <button onClick={() => setType('population')} className={`flex-1 py-3 rounded-md font-bold text-sm ${type === 'population' ? 'bg-white shadow text-pink-700' : 'text-gray-600'}`}>Population Variance (σ²)</button>
        </div>

        <div className="mb-6">
           <label className="block text-sm font-bold text-gray-700 mb-2">Dataset (comma or space separated)</label>
           <textarea 
             value={input} 
             onChange={(e) => setInput(e.target.value)}
             className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-pink-500 outline-none font-mono min-h-[120px]"
             placeholder="e.g. 2.4, 3.1, 5.5, 4.2"
           />
        </div>

        {res ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
             <div className="bg-gray-50 p-4 rounded-xl border text-center">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Sum of Sq. (SS)</div>
                <div className="text-xl font-black text-gray-800">{parseFloat(res.sumSquaredDiffs.toFixed(4))}</div>
             </div>
             <div className="bg-gray-50 p-4 rounded-xl border text-center">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Mean (μ)</div>
                <div className="text-xl font-black text-gray-800">{parseFloat(res.mean.toFixed(4))}</div>
             </div>
             <div className="bg-pink-50 p-4 rounded-xl border border-pink-100 text-center">
                <div className="text-xs font-bold text-pink-800 uppercase tracking-wider mb-1">Std Dev ({type === 'population' ? 'σ' : 's'})</div>
                <div className="text-xl font-black text-pink-600">{parseFloat(res.stdDev.toFixed(4))}</div>
             </div>
             <div className="bg-pink-600 p-4 rounded-xl border border-pink-700 text-center shadow-md">
                <div className="text-xs font-bold text-pink-100 uppercase tracking-wider mb-1">Variance</div>
                <div className="text-2xl font-black text-white">{parseFloat(res.variance.toFixed(4))}</div>
             </div>
          </div>
        ) : (
          <div className="bg-gray-50 p-6 rounded-xl border text-center text-gray-500 font-bold">
             Enter at least two numbers to calculate variance.
          </div>
        )}
      </div>
    </ToolShell>
  );
}

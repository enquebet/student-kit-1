import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function AverageCalculatorTool() {
  const [input, setInput] = useState('10, 20, 30, 40, 50');

  const calculate = () => {
    if (!input.trim()) return null;
    const nums = input.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
    if (nums.length === 0) return null;

    const sum = nums.reduce((a, b) => a + b, 0);
    const avg = sum / nums.length;
    
    return { count: nums.length, sum, avg };
  };

  const res = calculate();

  return (
    <ToolShell title="Average Calculator" description="Calculate the average (mean) of a dataset." category="math" seoTitle="Average Calculator | Find Mean Value" seoDescription="Quickly calculate the average (mean) of a dataset. Just paste your numbers separated by commas or spaces.">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="mb-6">
           <label className="block text-sm font-bold text-gray-700 mb-2">Dataset (comma or space separated)</label>
           <textarea 
             value={input} 
             onChange={(e) => setInput(e.target.value)}
             className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-mono min-h-[120px]"
             placeholder="1, 2, 3, 4, 5..."
           />
        </div>

        {res ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
             <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 text-center">
                <div className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-2">Count</div>
                <div className="text-3xl font-black text-emerald-600">{res.count}</div>
             </div>
             <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 text-center">
                <div className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-2">Sum</div>
                <div className="text-3xl font-black text-emerald-600">{res.sum}</div>
             </div>
             <div className="bg-emerald-600 p-6 rounded-xl border border-emerald-700 text-center shadow-md">
                <div className="text-sm font-bold text-emerald-100 uppercase tracking-wider mb-2">Average (Mean)</div>
                <div className="text-4xl font-black text-white">{parseFloat(res.avg.toFixed(6))}</div>
             </div>
          </div>
        ) : (
          <div className="bg-gray-50 p-6 rounded-xl border text-center text-gray-500 font-bold">
             Enter numbers to calculate average.
          </div>
        )}
      </div>
    </ToolShell>
  );
}

import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function PercentageChangeTool() {
  const [oldVal, setOldVal] = useState('100');
  const [newVal, setNewVal] = useState('120');

  const calculate = () => {
    const v1 = parseFloat(oldVal);
    const v2 = parseFloat(newVal);
    
    if (!isNaN(v1) && !isNaN(v2) && v1 !== 0) {
      const diff = v2 - v1;
      const pct = (diff / Math.abs(v1)) * 100;
      
      const type = pct > 0 ? 'Increase' : pct < 0 ? 'Decrease' : 'No Change';
      const colorClass = pct > 0 ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : pct < 0 ? 'text-rose-700 bg-rose-50 border-rose-200' : 'text-gray-700 bg-gray-50 border-gray-200';
      const titleColor = pct > 0 ? 'text-emerald-800' : pct < 0 ? 'text-rose-800' : 'text-gray-800';

      return {
         type,
         colorClass,
         titleColor,
         diff: Math.abs(diff).toLocaleString(undefined, { maximumFractionDigits: 4 }),
         pct: Math.abs(pct).toLocaleString(undefined, { maximumFractionDigits: 4 })
      };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Percentage Change" description="Calculate the percentage increase or decrease between two numbers." category="math" seoTitle="Percentage Change Calculator | Increase & Decrease" seoDescription="Calculate the percentage change (increase or decrease) between an old value and a new value easily.">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Original Value</label>
            <input type="number" value={oldVal} onChange={(e) => setOldVal(e.target.value)} className="w-full p-4 text-xl border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">New Value</label>
            <input type="number" value={newVal} onChange={(e) => setNewVal(e.target.value)} className="w-full p-4 text-xl border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" step="any" />
          </div>
        </div>

        {res ? (
          <div className={`p-8 rounded-xl border text-center ${res.colorClass}`}>
            <h3 className={`text-sm font-bold uppercase tracking-wider mb-2 ${res.titleColor}`}>Percentage {res.type}</h3>
            <div className="text-6xl font-black mb-4">
                {res.pct}<span className="text-4xl">%</span>
            </div>
            <div className="text-sm font-bold opacity-70">
                Absolute difference of {res.diff}
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 p-8 rounded-xl border text-center text-sm font-bold text-gray-500">
            Enter valid numbers (Original value cannot be zero).
          </div>
        )}
      </div>
    </ToolShell>
  );
}

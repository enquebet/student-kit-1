import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function InflationCalculatorTool() {
  const [amount, setAmount] = useState('100');
  const [rate, setRate] = useState('3.0');
  const [years, setYears] = useState('10');
  const [mode, setMode] = useState<'future' | 'past'>('future');

  const calculate = () => {
    const a = parseFloat(amount);
    const r = parseFloat(rate) / 100;
    const y = parseFloat(years);

    if (a >= 0 && !isNaN(r) && y > 0) {
      let result = 0;
      if (mode === 'future') {
        // Value of money eroding due to inflation over time (purchasing power loss)
        // or price of a good inflating. Typically we calculate what it costs to buy the same basket.
        result = a * Math.pow(1 + r, y);
      } else {
        // What a basket cost in the past
        result = a / Math.pow(1 + r, y);
      }
      
      return result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Inflation Calculator" description="Estimate the future or past value of money based on inflation rates." category="finance" seoTitle="Inflation Calculator | Time Value of Money" seoDescription="Calculate purchasing power and the time value of money by simulating average inflation rates over years.">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="flex bg-gray-100 p-1 rounded-lg mb-8">
            <button onClick={() => setMode('future')} className={`flex-1 py-2 rounded-md font-bold text-sm ${mode === 'future' ? 'bg-white shadow text-slate-700' : 'text-gray-600'}`}>Future Value</button>
            <button onClick={() => setMode('past')} className={`flex-1 py-2 rounded-md font-bold text-sm ${mode === 'past' ? 'bg-white shadow text-slate-700' : 'text-gray-600'}`}>Past Value</button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Base Amount ($)</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-slate-500 outline-none" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Avg Inflation (%)</label>
            <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-slate-500 outline-none" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Years</label>
            <input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-slate-500 outline-none" min="1" step="1" />
          </div>
        </div>

        {res && (
          <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 text-center">
             <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">
                Equivalent Purchasing Power
             </h3>
             <div className="text-5xl font-black text-slate-700">
                 ${res}
             </div>
             <p className="text-sm text-slate-500 mt-2 font-medium">
               What ${amount} is equivalent to {mode === 'future' ? `in ${years} years` : `${years} years ago`} at {rate}% annual inflation.
             </p>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

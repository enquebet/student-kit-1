import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function PercentageCalculatorTool() {
  const [mode, setMode] = useState<'of' | 'is'>('of');
  const [val1, setVal1] = useState('20');
  const [val2, setVal2] = useState('150');

  const calculate = () => {
     const v1 = parseFloat(val1);
     const v2 = parseFloat(val2);
     if (!isNaN(v1) && !isNaN(v2)) {
        if (mode === 'of') {
           // v1% of v2
           return { text: `What is ${v1}% of ${v2}?`, result: ((v1 / 100) * v2).toLocaleString(undefined, { maximumFractionDigits: 4 }), unit: '' };
        } else {
           // v1 is what % of v2
           if (v2 !== 0) {
              return { text: `${v1} is what % of ${v2}?`, result: ((v1 / v2) * 100).toLocaleString(undefined, { maximumFractionDigits: 4 }), unit: '%' };
           }
        }
     }
     return null;
  }

  const res = calculate();

  return (
    <ToolShell title="Percentage Calculator" description="Easily calculate percentages, such as finding X% of Y or what % X is of Y." category="math" seoTitle="Percentage Calculator | Find % of a Number" seoDescription="Free online percentage calculator. Find what X% of Y is, or find out what percentage one number is of another.">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="flex bg-gray-100 p-1 rounded-lg mb-8">
            <button onClick={() => setMode('of')} className={`flex-1 py-3 rounded-md font-bold text-sm ${mode === 'of' ? 'bg-white shadow text-emerald-700' : 'text-gray-600'}`}>What is X% of Y?</button>
            <button onClick={() => setMode('is')} className={`flex-1 py-3 rounded-md font-bold text-sm ${mode === 'is' ? 'bg-white shadow text-emerald-700' : 'text-gray-600'}`}>X is what % of Y?</button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Value X</label>
            <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full p-4 text-xl border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Value Y</label>
            <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full p-4 text-xl border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500" step="any" />
          </div>
        </div>

        {res && (
          <div className="bg-emerald-50 p-8 rounded-xl border border-emerald-100 text-center">
            <h3 className="text-sm font-bold text-emerald-800 mb-2">{res.text}</h3>
            <div className="text-6xl font-black text-emerald-700">
                {res.result}<span className="text-4xl">{res.unit}</span>
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

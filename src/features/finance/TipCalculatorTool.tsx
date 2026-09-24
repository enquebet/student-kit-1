import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function TipCalculatorTool() {
  const [bill, setBill] = useState('50');
  const [tipPct, setTipPct] = useState('20');
  const [split, setSplit] = useState('2');

  const calculate = () => {
    const b = parseFloat(bill);
    const tPct = parseFloat(tipPct);
    const s = parseInt(split);

    if (b > 0 && tPct >= 0 && s > 0) {
      const tipTotal = b * (tPct / 100);
      const total = b + tipTotal;
      const perPerson = total / s;
      const tipPerPerson = tipTotal / s;

      return {
        tipTotal: tipTotal.toFixed(2),
        total: total.toFixed(2),
        perPerson: perPerson.toFixed(2),
        tipPerPerson: tipPerPerson.toFixed(2)
      };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Tip Calculator" description="Calculate tip amounts and split bills evenly among friends." category="finance" seoTitle="Tip Calculator | Bill Splitter" seoDescription="Easily calculate restaurant tips and split the total bill evenly among multiple people.">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Bill Amount ($)</label>
            <input type="number" value={bill} onChange={(e) => setBill(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-violet-500 outline-none" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Tip %</label>
            <input type="number" value={tipPct} onChange={(e) => setTipPct(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-violet-500 outline-none" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Split Between</label>
            <input type="number" value={split} onChange={(e) => setSplit(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-violet-500 outline-none" min="1" step="1" />
          </div>
        </div>

        {res && (
          <div className="bg-violet-50 p-6 rounded-xl border border-violet-100">
             <div className="text-center mb-6">
                <div className="text-sm font-bold text-violet-800 uppercase tracking-wider mb-2">Total Per Person</div>
                <div className="text-5xl font-black text-violet-700">
                    ${res.perPerson}
                </div>
             </div>
             
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center border-t border-violet-200 pt-6">
                <div>
                   <div className="text-xs font-bold text-gray-500 uppercase mb-1">Total Bill</div>
                   <div className="text-lg font-bold text-violet-900">${res.total}</div>
                </div>
                <div>
                   <div className="text-xs font-bold text-gray-500 uppercase mb-1">Total Tip</div>
                   <div className="text-lg font-bold text-violet-900">${res.tipTotal}</div>
                </div>
                <div className="col-span-2 md:col-span-1">
                   <div className="text-xs font-bold text-gray-500 uppercase mb-1">Tip Per Person</div>
                   <div className="text-lg font-bold text-violet-900">${res.tipPerPerson}</div>
                </div>
             </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function RoiCalculatorTool() {
  const [invested, setInvested] = useState('10000');
  const [returned, setReturned] = useState('12500');

  const calculate = () => {
    const i = parseFloat(invested);
    const r = parseFloat(returned);

    if (!isNaN(i) && !isNaN(r) && i !== 0) {
      const profit = r - i;
      const roi = (profit / Math.abs(i)) * 100;

      return {
        profit: profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        roi: roi.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        isPositive: profit >= 0
      };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="ROI Calculator" description="Calculate your Return on Investment and net profit." category="finance" seoTitle="ROI Calculator | Return on Investment" seoDescription="Calculate Return on Investment (ROI) and net profit effortlessly with this free finance tool.">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Amount Invested ($)</label>
            <input type="number" value={invested} onChange={(e) => setInvested(e.target.value)} className="w-full p-4 text-xl border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Amount Returned ($)</label>
            <input type="number" value={returned} onChange={(e) => setReturned(e.target.value)} className="w-full p-4 text-xl border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" step="any" />
          </div>
        </div>

        {res && (
          <div className={`p-8 rounded-xl border text-center ${res.isPositive ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-rose-50 border-rose-100 text-rose-800'}`}>
             <h3 className="text-sm font-bold uppercase tracking-wider mb-2">Return on Investment (ROI)</h3>
             <div className={`text-6xl font-black mb-4 ${res.isPositive ? 'text-emerald-700' : 'text-rose-700'}`}>
                 {res.roi}%
             </div>
             <div className="text-xl font-bold">
                 Net Profit: ${res.profit}
             </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

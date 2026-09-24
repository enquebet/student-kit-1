import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function CompoundInterestTool() {
  const [initial, setInitial] = useState('10000');
  const [monthly, setMonthly] = useState('500');
  const [rate, setRate] = useState('7');
  const [years, setYears] = useState('10');

  const calculate = () => {
    const P = parseFloat(initial);
    const PMT = parseFloat(monthly);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(years);
    const n = 12; // Compounded monthly

    if (P >= 0 && PMT >= 0 && r >= 0 && t > 0) {
      // Future Value of Initial Investment
      const fvPrincipal = P * Math.pow(1 + r/n, n*t);
      // Future Value of Series
      let fvSeries = 0;
      if (r > 0) {
        fvSeries = PMT * ((Math.pow(1 + r/n, n*t) - 1) / (r/n));
      } else {
        fvSeries = PMT * n * t;
      }
      
      const totalValue = fvPrincipal + fvSeries;
      const totalContributions = P + (PMT * n * t);
      const totalInterest = totalValue - totalContributions;

      return {
        totalValue: totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        totalContributions: totalContributions.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        totalInterest: totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Compound Interest Calculator" description="Calculate the future value of your investments with compounding interest." category="finance" seoTitle="Compound Interest Calculator | Investment Growth" seoDescription="Calculate future value, total interest, and investment growth over time with our free compound interest calculator.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Initial Investment ($)</label>
            <input type="number" value={initial} onChange={(e) => setInitial(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Monthly Contribution ($)</label>
            <input type="number" value={monthly} onChange={(e) => setMonthly(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Estimated Interest Rate (%)</label>
            <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Years to Grow</label>
            <input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" min="1" step="any" />
          </div>
        </div>

        {res && (
          <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
             <div className="text-center mb-6">
                <div className="text-sm font-bold text-indigo-800 uppercase tracking-wider mb-2">Future Investment Value</div>
                <div className="text-5xl font-black text-indigo-700">
                    ${res.totalValue}
                </div>
             </div>
             
             <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                   <div className="text-xs font-bold text-gray-500 uppercase mb-1">Total Contributions</div>
                   <div className="text-xl font-bold text-indigo-900">${res.totalContributions}</div>
                </div>
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                   <div className="text-xs font-bold text-gray-500 uppercase mb-1">Total Interest Earned</div>
                   <div className="text-xl font-bold text-indigo-900">${res.totalInterest}</div>
                </div>
             </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function SimpleInterestTool() {
  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('5');
  const [time, setTime] = useState('3');
  const [timeUnit, setTimeUnit] = useState<'years' | 'months'>('years');

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);

    if (isNaN(p) || isNaN(r) || isNaN(t)) return null;

    let timeInYears = t;
    if (timeUnit === 'months') {
       timeInYears = t / 12;
    }

    const interest = (p * r * timeInYears) / 100;
    const total = p + interest;

    return { interest, total, principal: p };
  };

  const res = calculate();

  return (
    <ToolShell title="Simple Interest Calculator" description="Calculate simple interest and total amount." category="math" seoTitle="Simple Interest Calculator | Find Interest & Total" seoDescription="Calculate simple interest quickly. Enter principal, rate, and time to find the total interest and final amount.">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
           <div className="sm:col-span-2">
             <label className="block text-sm font-bold text-gray-700 mb-2">Principal Amount ($)</label>
             <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-lg font-bold" />
           </div>

           <div>
             <label className="block text-sm font-bold text-gray-700 mb-2">Annual Interest Rate (%)</label>
             <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-lg font-bold" />
           </div>

           <div>
             <label className="block text-sm font-bold text-gray-700 mb-2">Time Period</label>
             <div className="flex gap-2">
                <input type="number" value={time} onChange={(e) => setTime(e.target.value)} className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-lg font-bold" />
                <select value={timeUnit} onChange={(e) => setTimeUnit(e.target.value as any)} className="p-4 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-teal-500 outline-none font-bold cursor-pointer">
                   <option value="years">Years</option>
                   <option value="months">Months</option>
                </select>
             </div>
           </div>
        </div>

        {res ? (
          <div className="bg-teal-50 p-6 rounded-xl border border-teal-100">
             <div className="grid sm:grid-cols-3 gap-6">
                <div className="text-center">
                   <div className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-2">Principal</div>
                   <div className="text-xl font-bold text-teal-700">${res.principal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                </div>
                <div className="text-center">
                   <div className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-2">Total Interest</div>
                   <div className="text-xl font-bold text-teal-700">+ ${res.interest.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                </div>
                <div className="text-center sm:col-span-3 mt-4 pt-4 border-t border-teal-200">
                   <div className="text-sm font-bold text-teal-900 uppercase tracking-wider mb-2">Total Amount</div>
                   <div className="text-4xl font-black text-teal-800">${res.total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                </div>
             </div>
          </div>
        ) : (
          <div className="bg-gray-50 p-6 rounded-xl border text-center text-gray-500 font-bold">
             Enter valid numbers to calculate.
          </div>
        )}

      </div>
    </ToolShell>
  );
}

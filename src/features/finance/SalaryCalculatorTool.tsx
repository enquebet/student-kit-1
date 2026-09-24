import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function SalaryCalculatorTool() {
  const [amount, setAmount] = useState('25');
  const [period, setPeriod] = useState<'hourly'|'weekly'|'monthly'|'annual'>('hourly');
  const [hours, setHours] = useState('40');

  const calculate = () => {
    const val = parseFloat(amount);
    const hpw = parseFloat(hours);

    if (val > 0 && hpw > 0) {
      let annual = 0;
      if (period === 'hourly') annual = val * hpw * 52;
      else if (period === 'weekly') annual = val * 52;
      else if (period === 'monthly') annual = val * 12;
      else if (period === 'annual') annual = val;

      const monthly = annual / 12;
      const weekly = annual / 52;
      const daily = weekly / 5; // Assuming 5 work days
      const hourly = weekly / hpw;

      return {
        annual: annual.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        monthly: monthly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        weekly: weekly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        daily: daily.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        hourly: hourly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Salary Calculator" description="Convert your salary between hourly, daily, weekly, monthly, and annual rates." category="finance" seoTitle="Salary Converter Calculator | Hourly to Annual" seoDescription="Convert your income between hourly, weekly, monthly, and annual salaries. Easy and fast pay calculator.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Pay Amount ($)</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Per</label>
            <select value={period} onChange={(e) => setPeriod(e.target.value as any)} className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-teal-500 outline-none">
               <option value="hourly">Hour</option>
               <option value="weekly">Week</option>
               <option value="monthly">Month</option>
               <option value="annual">Year</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Hours Per Week</label>
            <input type="number" value={hours} onChange={(e) => setHours(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" min="1" step="any" />
          </div>
        </div>

        {res && (
          <div className="bg-teal-50 p-6 rounded-xl border border-teal-100">
             <div className="text-center mb-6">
                <div className="text-sm font-bold text-teal-800 uppercase tracking-wider mb-2">Gross Annual Salary</div>
                <div className="text-5xl font-black text-teal-700">
                    ${res.annual}
                </div>
             </div>
             
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                   <div className="text-xs font-bold text-gray-500 uppercase mb-1">Monthly</div>
                   <div className="text-lg font-bold text-teal-900">${res.monthly}</div>
                </div>
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                   <div className="text-xs font-bold text-gray-500 uppercase mb-1">Weekly</div>
                   <div className="text-lg font-bold text-teal-900">${res.weekly}</div>
                </div>
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                   <div className="text-xs font-bold text-gray-500 uppercase mb-1">Daily (5 days)</div>
                   <div className="text-lg font-bold text-teal-900">${res.daily}</div>
                </div>
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                   <div className="text-xs font-bold text-gray-500 uppercase mb-1">Hourly</div>
                   <div className="text-lg font-bold text-teal-900">${res.hourly}</div>
                </div>
             </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

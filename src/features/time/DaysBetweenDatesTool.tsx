import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function DaysBetweenDatesTool() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const calculate = () => {
    if (start && end) {
      const d1 = new Date(`${start}T00:00:00`);
      const d2 = new Date(`${end}T00:00:00`);
      const diffTime = Math.abs(d2.getTime() - d1.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const diffWeeks = (diffDays / 7).toFixed(1);
      
      let years = Math.abs(d2.getFullYear() - d1.getFullYear());
      let months = Math.abs(d2.getMonth() - d1.getMonth());
      if (d2 < d1 && months > 0) { years--; months = 12 - months; }
      
      return { days: diffDays, weeks: diffWeeks, years, months };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Days Between Dates" description="Calculate the exact number of days, weeks, and years between two dates." category="time" seoTitle="Days Between Dates Calculator | Time Utility" seoDescription="Find exactly how many days, weeks, or years are between two specific calendar dates.">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Start Date</label>
            <input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">End Date</label>
            <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
        </div>

        {res && (
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-center">
             <div className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-2">Total Difference</div>
             <div className="text-5xl font-black text-blue-700 mb-4">
                 {res.days} <span className="text-2xl text-blue-500">days</span>
             </div>
             
             <div className="flex flex-wrap justify-center gap-4 mt-4 border-t border-blue-200 pt-4">
                <div className="px-4 border-r border-blue-200">
                   <div className="text-2xl font-bold text-blue-900">{res.weeks}</div>
                   <div className="text-xs font-bold text-blue-600 uppercase">Weeks</div>
                </div>
                <div className="px-4">
                   <div className="text-2xl font-bold text-blue-900">{res.years}y, {res.months}m</div>
                   <div className="text-xs font-bold text-blue-600 uppercase">Approx. Years & Months</div>
                </div>
             </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

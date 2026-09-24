import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function DaysBetweenDatesTool() {
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  
  let days = 0;
  if (date1 && date2) {
     const d1 = new Date(date1);
     const d2 = new Date(date2);
     if (!isNaN(d1.getTime()) && !isNaN(d2.getTime())) {
        const diff = Math.abs(d2.getTime() - d1.getTime());
        days = Math.ceil(diff / (1000 * 3600 * 24));
     }
  }

  return (
    <ToolShell title="Days Between Dates" description="Calculate days between two dates." category="everyday" seoTitle="Days Between Two Dates Calculator | StudentKit" seoDescription="Find out exactly how many days are between two specific dates in history.">
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 space-y-6">
           <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Start Date</label>
              <input type="date" value={date1} onChange={e=>setDate1(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" />
           </div>
           <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">End Date</label>
              <input type="date" value={date2} onChange={e=>setDate2(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" />
           </div>
        </div>
        <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white flex flex-col justify-center items-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -mr-10 -mt-10 pointer-events-none"></div>
           <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 relative z-10">Difference</h2>
           <div className="relative z-10 text-center">
              {date1 && date2 ? (
                 <div className="flex flex-col items-center gap-2">
                    <div className="text-6xl font-extrabold text-white tracking-tight">{days}</div>
                    <div className="text-xl text-blue-400 font-bold">Days</div>
                    <div className="text-sm text-slate-400 mt-4">({(days/7).toFixed(1)} weeks or {(days/30.44).toFixed(1)} months)</div>
                 </div>
              ) : (
                 <span className="text-xl text-slate-500 font-medium">Select dates</span>
              )}
           </div>
        </div>
      </div>
    </ToolShell>
  );
}

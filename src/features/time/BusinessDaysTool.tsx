import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function BusinessDaysTool() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const calculate = () => {
    if (!start || !end) return null;
    let d1 = new Date(`${start}T00:00:00`);
    let d2 = new Date(`${end}T00:00:00`);
    
    if (d1 > d2) {
      const temp = d1;
      d1 = d2;
      d2 = temp;
    }

    let count = 0;
    let curr = new Date(d1);
    
    while (curr <= d2) {
      const day = curr.getDay();
      // Exclude Sunday (0) and Saturday (6)
      if (day !== 0 && day !== 6) {
        count++;
      }
      curr.setDate(curr.getDate() + 1);
    }
    
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Inclusive

    return { businessDays: count, totalDays: diffDays };
  };

  const res = calculate();

  return (
    <ToolShell title="Business Days Calculator" description="Calculate the number of working days between two dates, excluding weekends." category="time" seoTitle="Business Days Calculator | Work Day Counter" seoDescription="Calculate exactly how many business or working days exist between two dates, automatically excluding weekends.">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Start Date</label>
            <input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">End Date</label>
            <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
        </div>

        {res && (
          <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 text-center">
             <div className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-2">Total Business Days</div>
             <div className="text-5xl font-black text-emerald-700 mb-4">
                 {res.businessDays}
             </div>
             <p className="text-sm font-medium text-emerald-600">
                Out of {res.totalDays} total calendar days (inclusive).
             </p>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

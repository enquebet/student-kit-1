import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function MarksPercentageCalculatorTool() {
  const [obtained, setObtained] = useState('');
  const [total, setTotal] = useState('');
  
  const o = parseFloat(obtained);
  const t = parseFloat(total);
  const percentage = (!isNaN(o) && !isNaN(t) && t > 0) ? (o / t) * 100 : 0;

  return (
    <ToolShell title="Marks Percentage Calculator" description="Calculate percentage of marks." category="student" seoTitle="Marks Percentage Calculator | StudentKit" seoDescription="Quickly calculate your exam marks percentage.">
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 space-y-4">
           <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Marks Obtained</label>
              <input type="number" value={obtained} onChange={e=>setObtained(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" placeholder="e.g. 420" />
           </div>
           <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Total Marks</label>
              <input type="number" value={total} onChange={e=>setTotal(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" placeholder="e.g. 500" />
           </div>
        </div>
        <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white flex flex-col justify-center items-center relative overflow-hidden h-48 md:h-auto">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -mr-10 -mt-10 pointer-events-none"></div>
           <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 relative z-10">Percentage</h2>
           <div className="text-6xl font-extrabold text-white tracking-tight relative z-10">
             {percentage > 0 ? `${percentage.toFixed(2)}%` : '0.00%'}
           </div>
        </div>
      </div>
    </ToolShell>
  );
}

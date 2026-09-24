import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function PercentageToCgpaTool() {
  const [perc, setPerc] = useState('');
  const val = parseFloat(perc);
  const cgpa = isNaN(val) ? 0 : val / 9.5;

  return (
    <ToolShell title="Percentage to CGPA" description="Convert Percentage to CGPA." category="student" seoTitle="Percentage to CGPA Converter | StudentKit" seoDescription="Convert your academic percentage to a 10-point CGPA scale instantly.">
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 flex flex-col justify-center">
           <label className="block text-sm font-bold text-gray-700 mb-2">Enter Percentage (%)</label>
           <input type="number" min="0" max="100" step="1" value={perc} onChange={e=>setPerc(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-2xl font-mono" placeholder="e.g. 85" />
        </div>
        <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white flex flex-col justify-center items-center relative overflow-hidden h-48 md:h-auto">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -mr-10 -mt-10 pointer-events-none"></div>
           <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 relative z-10">CGPA (Out of 10)</h2>
           <div className="text-6xl font-extrabold text-white tracking-tight relative z-10">
             {cgpa > 0 ? cgpa.toFixed(2) : '0.00'}
           </div>
        </div>
      </div>
    </ToolShell>
  );
}

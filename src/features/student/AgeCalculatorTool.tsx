import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function AgeCalculatorTool() {
  const [dob, setDob] = useState('');
  
  let years = 0, months = 0, days = 0;
  if (dob) {
     const d = new Date(dob);
     const today = new Date();
     if (!isNaN(d.getTime())) {
        years = today.getFullYear() - d.getFullYear();
        months = today.getMonth() - d.getMonth();
        days = today.getDate() - d.getDate();
        if (days < 0) {
           months--;
           days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        }
        if (months < 0) {
           years--;
           months += 12;
        }
     }
  }

  return (
    <ToolShell title="Age Calculator" description="Calculate exact age from Date of Birth." category="student" seoTitle="Exact Age Calculator Online | StudentKit" seoDescription="Calculate your exact age in years, months, and days online instantly.">
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 flex flex-col justify-center">
           <label className="block text-sm font-bold text-gray-700 mb-2">Date of Birth</label>
           <input type="date" value={dob} onChange={e=>setDob(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" />
        </div>
        <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white flex flex-col justify-center items-center relative overflow-hidden h-48 md:h-auto">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -mr-10 -mt-10 pointer-events-none"></div>
           <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 relative z-10">Exact Age</h2>
           {dob ? (
              <div className="flex gap-4 text-center relative z-10">
                 <div>
                    <div className="text-4xl font-extrabold text-white">{years}</div>
                    <div className="text-sm text-slate-400 font-bold uppercase tracking-wider">Years</div>
                 </div>
                 <div className="text-4xl font-extrabold text-slate-600">/</div>
                 <div>
                    <div className="text-4xl font-extrabold text-white">{months}</div>
                    <div className="text-sm text-slate-400 font-bold uppercase tracking-wider">Months</div>
                 </div>
                 <div className="text-4xl font-extrabold text-slate-600">/</div>
                 <div>
                    <div className="text-4xl font-extrabold text-white">{days}</div>
                    <div className="text-sm text-slate-400 font-bold uppercase tracking-wider">Days</div>
                 </div>
              </div>
           ) : (
              <span className="text-xl text-slate-500 font-medium relative z-10">Enter Date of Birth</span>
           )}
        </div>
      </div>
    </ToolShell>
  );
}

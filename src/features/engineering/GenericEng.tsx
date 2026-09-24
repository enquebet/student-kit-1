import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function GenericEng({ title, desc }: { title: string, desc: string }) {
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('');
  
  const calc = () => {
    let r = 0;
    if (val1 && val2) {
       r = (parseFloat(val1) || 0) * (parseFloat(val2) || 0);
    }
    return r;
  }

  return (
    <ToolShell title={title} description={desc} category="engineering" seoTitle={title + " | StudentKit"} seoDescription={"Use the " + title + " to perform fast local calculations."}>
       <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 space-y-4">
           <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Input 1</label>
              <input type="number" value={val1} onChange={e=>setVal1(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" placeholder="0" />
           </div>
           <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Input 2</label>
              <input type="number" value={val2} onChange={e=>setVal2(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" placeholder="0" />
           </div>
        </div>
        <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white flex flex-col justify-center items-center relative overflow-hidden h-48 md:h-auto">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -mr-10 -mt-10 pointer-events-none"></div>
           <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 relative z-10">Result</h2>
           <div className="text-4xl md:text-5xl font-extrabold text-white tracking-tight relative z-10 break-all text-center px-4">
             {calc().toFixed(2)}
           </div>
           <p className="text-xs text-slate-500 mt-4 relative z-10">* This is a generic handler proxy for complex engineering tools.</p>
        </div>
      </div>
    </ToolShell>
  );
}

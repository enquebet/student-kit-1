import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function FileSizeConverterTool() {
  const [bytes, setBytes] = useState('1048576');
  
  let val = parseFloat(bytes);
  if (isNaN(val)) val = 0;
  
  const kb = val / 1024;
  const mb = kb / 1024;
  const gb = mb / 1024;
  const tb = gb / 1024;

  return (
    <ToolShell title="File Size Converter" description="Convert bytes to KB, MB, GB, TB." category="file" seoTitle="File Size Converter | Bytes to MB | StudentKit" seoDescription="Quickly convert file sizes between bytes, kilobytes, megabytes, and gigabytes.">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 max-w-2xl mx-auto">
         <label className="block text-sm font-bold text-gray-700 mb-2">Input Size (Bytes)</label>
         <input type="number" value={bytes} onChange={e=>setBytes(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-lg font-mono mb-8" />
         
         <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex justify-between items-center">
               <span className="font-bold text-blue-800">Kilobytes (KB)</span>
               <span className="font-mono text-blue-900">{Number(kb.toPrecision(7))} KB</span>
            </div>
            <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex justify-between items-center">
               <span className="font-bold text-green-800">Megabytes (MB)</span>
               <span className="font-mono text-green-900">{Number(mb.toPrecision(7))} MB</span>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 flex justify-between items-center">
               <span className="font-bold text-purple-800">Gigabytes (GB)</span>
               <span className="font-mono text-purple-900">{Number(gb.toPrecision(7))} GB</span>
            </div>
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex justify-between items-center">
               <span className="font-bold text-orange-800">Terabytes (TB)</span>
               <span className="font-mono text-orange-900">{Number(tb.toPrecision(7))} TB</span>
            </div>
         </div>
      </div>
    </ToolShell>
  );
}

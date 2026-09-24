import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function TimeCalculatorTool() {
  const [baseTime, setBaseTime] = useState('12:00');
  const [op, setOp] = useState<'add' | 'sub'>('add');
  const [hours, setHours] = useState('1');
  const [minutes, setMinutes] = useState('30');

  const calculate = () => {
    if (!baseTime) return null;
    const [hStr, mStr] = baseTime.split(':');
    
    // We use a fixed date to perform relative math securely
    const d = new Date('2024-01-01T00:00:00');
    d.setHours(parseInt(hStr, 10));
    d.setMinutes(parseInt(mStr, 10));

    let dh = parseInt(hours) || 0;
    let dm = parseInt(minutes) || 0;

    if (op === 'add') {
      d.setHours(d.getHours() + dh);
      d.setMinutes(d.getMinutes() + dm);
    } else {
      d.setHours(d.getHours() - dh);
      d.setMinutes(d.getMinutes() - dm);
    }

    return {
       time24: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
       time12: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
    };
  };

  const res = calculate();

  return (
    <ToolShell title="Time Calculator" description="Add or subtract hours and minutes to/from a specific time." category="time" seoTitle="Time Calculator | Add & Subtract Hours/Minutes" seoDescription="Easily add or subtract hours and minutes from any given time of day to find out the exact future or past time.">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="grid md:grid-cols-2 gap-8 mb-8 items-center">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Base Time</label>
            <input type="time" value={baseTime} onChange={(e) => setBaseTime(e.target.value)} className="w-full p-4 text-xl border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none text-center" />
          </div>
          
          <div className="bg-gray-50 p-4 rounded-xl border">
             <div className="flex gap-2 mb-4">
                 <button onClick={() => setOp('add')} className={`flex-1 py-2 rounded-md font-bold text-sm ${op === 'add' ? 'bg-cyan-600 text-white shadow' : 'bg-gray-200 text-gray-600'}`}>Add (+)</button>
                 <button onClick={() => setOp('sub')} className={`flex-1 py-2 rounded-md font-bold text-sm ${op === 'sub' ? 'bg-rose-600 text-white shadow' : 'bg-gray-200 text-gray-600'}`}>Subtract (-)</button>
             </div>
             
             <div className="flex gap-4">
                <div className="flex-1">
                   <label className="block text-xs font-bold text-gray-500 uppercase mb-1 text-center">Hours</label>
                   <input type="number" value={hours} onChange={(e) => setHours(e.target.value)} className="w-full p-2 text-center border rounded-lg" min="0" />
                </div>
                <div className="flex-1">
                   <label className="block text-xs font-bold text-gray-500 uppercase mb-1 text-center">Minutes</label>
                   <input type="number" value={minutes} onChange={(e) => setMinutes(e.target.value)} className="w-full p-2 text-center border rounded-lg" min="0" />
                </div>
             </div>
          </div>
        </div>

        {res && (
          <div className="bg-cyan-50 p-8 rounded-xl border border-cyan-100 text-center">
             <h3 className="text-sm font-bold text-cyan-800 uppercase tracking-wider mb-2">Resulting Time</h3>
             <div className="text-5xl font-black text-cyan-700 mb-2">
                 {res.time12}
             </div>
             <div className="text-lg font-bold text-cyan-600/70">
                 {res.time24} (24-hour)
             </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

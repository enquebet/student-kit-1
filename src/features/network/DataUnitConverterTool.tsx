import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

const units = [
  { label: 'Bits (b)', val: 1 },
  { label: 'Bytes (B)', val: 8 },
  { label: 'Kilobytes (KB)', val: 8 * 1024 },
  { label: 'Megabytes (MB)', val: 8 * 1024 ** 2 },
  { label: 'Gigabytes (GB)', val: 8 * 1024 ** 3 },
  { label: 'Terabytes (TB)', val: 8 * 1024 ** 4 },
  { label: 'Petabytes (PB)', val: 8 * 1024 ** 5 }
];

export default function DataUnitConverterTool() {
  const [amount, setAmount] = useState('1');
  const [fromUnit, setFromUnit] = useState(units[3].val.toString()); // MB

  const calculate = () => {
    const val = parseFloat(amount);
    const multiplier = parseFloat(fromUnit);
    
    if (!isNaN(val) && !isNaN(multiplier)) {
       const bits = val * multiplier;
       
       return units.map(u => ({
          label: u.label,
          result: (bits / u.val).toLocaleString(undefined, { maximumFractionDigits: 6 })
       }));
    }
    return [];
  };

  const results = calculate();

  return (
    <ToolShell title="Data Unit Converter" description="Convert between Bits, Bytes, KB, MB, GB, TB, etc." category="network" seoTitle="Data Unit Converter | Bytes, Megabytes to Gigabytes" seoDescription="Convert digital storage units quickly. Translate Bits, Bytes, Kilobytes, Megabytes, Gigabytes, and Terabytes (base 1024).">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="flex-1 p-4 text-xl border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" min="0" step="any" />
            <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="flex-1 p-4 text-xl border rounded-lg bg-white focus:ring-2 focus:ring-teal-500 outline-none cursor-pointer">
               {units.map((u, i) => (
                  <option key={i} value={u.val}>{u.label}</option>
               ))}
            </select>
        </div>

        {results.length > 0 && (
          <div className="bg-gray-50 border rounded-xl overflow-hidden shadow-sm">
             <div className="bg-teal-600 text-white px-4 py-3 text-sm font-bold uppercase tracking-wider text-center">
                 Conversions (Base 1024)
             </div>
             <div className="divide-y">
                {results.map((r, i) => (
                   <div key={i} className="flex justify-between p-4 bg-white hover:bg-teal-50 transition-colors">
                      <div className="font-bold text-gray-500">{r.label}</div>
                      <div className="font-mono font-bold text-gray-900">{r.result}</div>
                   </div>
                ))}
             </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

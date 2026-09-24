import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function CircleCalculatorTool() {
  const [radius, setRadius] = useState('5');

  const calculate = () => {
    const r = parseFloat(radius);
    if (r > 0) {
      return {
        diameter: (r * 2).toFixed(2),
        area: (Math.PI * r * r).toFixed(2),
        circumference: (2 * Math.PI * r).toFixed(2)
      };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Circle Calculator" description="Calculate the area, circumference, and diameter of a circle." category="math" seoTitle="Circle Calculator | Area, Circumference & Diameter" seoDescription="Calculate circle properties easily. Enter the radius to find the diameter, total area, and circumference instantly.">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-sm border text-center">
        
        <div className="mb-8">
            <label className="block text-sm font-bold text-gray-700 mb-2">Radius (r)</label>
            <input type="number" value={radius} onChange={(e) => setRadius(e.target.value)} className="w-full max-w-xs p-4 text-center border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-xl font-bold" min="0" step="any" />
        </div>

        {res && (
          <div className="grid gap-4">
             <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex justify-between items-center">
                <div className="text-sm font-bold text-indigo-800 uppercase tracking-wider">Diameter (d)</div>
                <div className="text-2xl font-black text-indigo-700">{res.diameter}</div>
             </div>
             <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex justify-between items-center">
                <div className="text-sm font-bold text-indigo-800 uppercase tracking-wider">Area (A)</div>
                <div className="text-2xl font-black text-indigo-700">{res.area}</div>
             </div>
             <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex justify-between items-center">
                <div className="text-sm font-bold text-indigo-800 uppercase tracking-wider">Circumference (C)</div>
                <div className="text-2xl font-black text-indigo-700">{res.circumference}</div>
             </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

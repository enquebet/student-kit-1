import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function TriangleCalculatorTool() {
  const [base, setBase] = useState('3');
  const [height, setHeight] = useState('4');

  const calculate = () => {
    const b = parseFloat(base);
    const h = parseFloat(height);
    if (b > 0 && h > 0) {
      const hyp = Math.sqrt(b*b + h*h);
      const area = 0.5 * b * h;
      const perim = b + h + hyp;
      
      const angRadA = Math.atan(h/b);
      const angA = angRadA * (180/Math.PI);
      const angB = 90 - angA;

      return {
         hyp: hyp.toFixed(2),
         area: area.toFixed(2),
         perim: perim.toFixed(2),
         angA: angA.toFixed(2),
         angB: angB.toFixed(2)
      };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Right Triangle Calculator" description="Calculate area, perimeter, hypotenuse, and angles of a right-angled triangle." category="math" seoTitle="Right Triangle Calculator | Area, Perimeter & Angles" seoDescription="Easily calculate the properties of a right-angled triangle including hypotenuse length, area, perimeter, and internal angles.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Base (b)</label>
            <input type="number" value={base} onChange={(e) => setBase(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-fuchsia-500 outline-none" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Height (h)</label>
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-fuchsia-500 outline-none" min="0" step="any" />
          </div>
        </div>

        {res && (
          <div className="grid sm:grid-cols-2 gap-4">
             <div className="bg-fuchsia-50 p-4 rounded-xl border border-fuchsia-100 text-center">
                <div className="text-xs font-bold text-fuchsia-800 uppercase tracking-wider mb-1">Hypotenuse</div>
                <div className="text-2xl font-black text-fuchsia-700">{res.hyp}</div>
             </div>
             <div className="bg-fuchsia-50 p-4 rounded-xl border border-fuchsia-100 text-center">
                <div className="text-xs font-bold text-fuchsia-800 uppercase tracking-wider mb-1">Area</div>
                <div className="text-2xl font-black text-fuchsia-700">{res.area}</div>
             </div>
             <div className="bg-fuchsia-50 p-4 rounded-xl border border-fuchsia-100 text-center">
                <div className="text-xs font-bold text-fuchsia-800 uppercase tracking-wider mb-1">Perimeter</div>
                <div className="text-2xl font-black text-fuchsia-700">{res.perim}</div>
             </div>
             <div className="bg-white p-4 rounded-xl border border-gray-200 text-center shadow-sm">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Other Angles</div>
                <div className="text-2xl font-black text-gray-800">{res.angA}° / {res.angB}°</div>
             </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

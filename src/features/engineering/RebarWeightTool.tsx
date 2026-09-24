import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function RebarWeightTool() {
  const [diameter, setDiameter] = useState('10'); // mm
  const [length, setLength] = useState('6'); // meters
  const [quantity, setQuantity] = useState('100'); // pieces

  const calculate = () => {
    const d = parseFloat(diameter);
    const l = parseFloat(length);
    const q = parseFloat(quantity);

    if (d > 0 && l > 0 && q > 0) {
      // Formula for rebar weight in kg/m: D^2 / 162
      const weightPerMeter = Math.pow(d, 2) / 162.28; 
      const totalWeightKg = weightPerMeter * l * q;
      const totalWeightTonnes = totalWeightKg / 1000;
      
      const totalLength = l * q;

      return {
        unitWeight: weightPerMeter.toFixed(3),
        totalKg: totalWeightKg.toLocaleString(undefined, { maximumFractionDigits: 1 }),
        totalTonnes: totalWeightTonnes.toLocaleString(undefined, { maximumFractionDigits: 3 }),
        totalLength: totalLength.toLocaleString()
      };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Rebar Weight Calculator" description="Calculate the total weight and length of steel reinforcement bars." category="engineering" seoTitle="Rebar Weight Calculator | Steel Reinforcement" seoDescription="Free civil engineering calculator for steel rebar. Calculate total weight in kg and tonnes based on diameter, length, and quantity.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Bar Diameter (d) in mm</label>
            <input type="number" value={diameter} onChange={(e) => setDiameter(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Length per Bar in meters</label>
            <input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Total Quantity (Pieces)</label>
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full p-3 border rounded-lg" min="1" step="1" />
          </div>
        </div>

        {res && (
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center mb-6">
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                   <div className="text-xs font-bold text-gray-500 uppercase">Unit Weight</div>
                   <div className="text-2xl font-bold text-slate-800 mt-2">{res.unitWeight} <span className="text-base text-slate-500">kg/m</span></div>
                </div>
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                   <div className="text-xs font-bold text-gray-500 uppercase">Total Length</div>
                   <div className="text-2xl font-bold text-slate-800 mt-2">{res.totalLength} <span className="text-base text-slate-500">meters</span></div>
                </div>
             </div>
             
             <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-lg text-center shadow-sm">
                <h3 className="text-sm font-bold text-indigo-800 uppercase tracking-wider mb-2">Total Steel Weight</h3>
                <div className="text-5xl font-black text-indigo-700 mb-2">
                    {res.totalKg} <span className="text-2xl text-indigo-500">kg</span>
                </div>
                <div className="text-lg font-bold text-indigo-600/70">
                    or {res.totalTonnes} metric tonnes
                </div>
             </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

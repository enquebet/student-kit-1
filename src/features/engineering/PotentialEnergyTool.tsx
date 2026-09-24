import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function PotentialEnergyTool() {
  const [mass, setMass] = useState('10'); // kg
  const [height, setHeight] = useState('5'); // m
  const [gravity, setGravity] = useState('9.81'); // m/s2

  const calculate = () => {
    const m = parseFloat(mass);
    const h = parseFloat(height);
    const g = parseFloat(gravity);

    if (m >= 0 && !isNaN(h) && g > 0) {
      // PE = mgh
      const peJoules = m * g * h;
      const peKj = peJoules / 1000;

      return {
        joules: peJoules.toLocaleString(undefined, { maximumFractionDigits: 2 }),
        kj: peKj.toLocaleString(undefined, { maximumFractionDigits: 4 })
      };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Potential Energy Calculator" description="Calculate the gravitational potential energy of an object." category="engineering" seoTitle="Gravitational Potential Energy Calculator | PE = mgh" seoDescription="Calculate gravitational potential energy in Joules (J) given mass, height, and gravity. Free physics calculator.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Mass (m) in kg</label>
            <input type="number" value={mass} onChange={(e) => setMass(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Height (h) in meters</label>
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full p-3 border rounded-lg" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Gravity (g) in m/s²</label>
            <input type="number" value={gravity} onChange={(e) => setGravity(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
            <div className="text-xs text-gray-500 mt-1">Earth avg ≈ 9.81 m/s²</div>
          </div>
        </div>

        {res && (
          <div className="bg-indigo-50 p-8 rounded-xl border border-indigo-100 text-center">
            <h3 className="text-sm font-bold text-indigo-800 uppercase tracking-wider mb-2">Gravitational Potential Energy (PE)</h3>
            <div className="text-5xl font-black text-indigo-700 flex items-baseline justify-center gap-2 mb-2">
                {res.joules} <span className="text-2xl text-indigo-500">J</span>
            </div>
            <div className="text-lg font-bold text-indigo-600/70">
                or {res.kj} kJ
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function FlowRateTool() {
  const [mode, setMode] = useState<'rate' | 'velocity' | 'diameter'>('rate');
  
  const [rate, setRate] = useState('0.1'); // m3/s
  const [velocity, setVelocity] = useState('2'); // m/s
  const [diameter, setDiameter] = useState('0.25'); // meters

  const calculate = () => {
    const Q = parseFloat(rate);
    const v = parseFloat(velocity);
    const D = parseFloat(diameter);

    // Area A = pi * (D/2)^2 = pi * D^2 / 4
    // Q = A * v
    if (mode === 'rate' && !isNaN(v) && !isNaN(D) && D > 0) {
      const A = Math.PI * Math.pow(D / 2, 2);
      return { val: (A * v).toFixed(4), unit: 'm³/s' };
    } else if (mode === 'velocity' && !isNaN(Q) && !isNaN(D) && D > 0) {
      const A = Math.PI * Math.pow(D / 2, 2);
      return { val: (Q / A).toFixed(4), unit: 'm/s' };
    } else if (mode === 'diameter' && !isNaN(Q) && !isNaN(v) && v > 0) {
      const A = Q / v;
      // A = pi * D^2 / 4 => D = sqrt(4A / pi)
      const calculatedD = Math.sqrt((4 * A) / Math.PI);
      return { val: calculatedD.toFixed(4), unit: 'm' };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Pipe Flow Rate Calculator" description="Calculate volumetric flow rate, velocity, or pipe diameter using the continuity equation (Q = A × v)." category="engineering" seoTitle="Pipe Flow Rate Calculator | Continuity Equation" seoDescription="Calculate volumetric flow rate (Q), flow velocity (v), or pipe internal diameter (D) for fluid mechanics.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="flex flex-col sm:flex-row bg-gray-100 p-1 rounded-lg mb-8 gap-1">
            <button onClick={() => setMode('rate')} className={`flex-1 py-2 rounded-md font-bold text-sm ${mode === 'rate' ? 'bg-white shadow text-indigo-700' : 'text-gray-600'}`}>Find Flow Rate (Q)</button>
            <button onClick={() => setMode('velocity')} className={`flex-1 py-2 rounded-md font-bold text-sm ${mode === 'velocity' ? 'bg-white shadow text-indigo-700' : 'text-gray-600'}`}>Find Velocity (v)</button>
            <button onClick={() => setMode('diameter')} className={`flex-1 py-2 rounded-md font-bold text-sm ${mode === 'diameter' ? 'bg-white shadow text-indigo-700' : 'text-gray-600'}`}>Find Diameter (D)</button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {mode !== 'rate' && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Volumetric Flow Rate (Q) in m³/s</label>
              <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
            </div>
          )}
          {mode !== 'velocity' && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Flow Velocity (v) in m/s</label>
              <input type="number" value={velocity} onChange={(e) => setVelocity(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
            </div>
          )}
          {mode !== 'diameter' && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Pipe Internal Diameter (D) in meters</label>
              <input type="number" value={diameter} onChange={(e) => setDiameter(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
            </div>
          )}
        </div>

        {res && (
          <div className="bg-indigo-50 p-8 rounded-xl border border-indigo-100 text-center">
            <h3 className="text-sm font-bold text-indigo-800 uppercase tracking-wider mb-2">Calculated {mode}</h3>
            <div className="text-5xl font-black text-indigo-700 flex items-baseline justify-center gap-2">
                {res.val} <span className="text-2xl text-indigo-500">{res.unit}</span>
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

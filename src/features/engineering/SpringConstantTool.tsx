import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function SpringConstantTool() {
  const [mode, setMode] = useState<'force' | 'constant' | 'displacement'>('force');
  
  const [force, setForce] = useState('100'); // Newtons
  const [constant, setConstant] = useState('500'); // N/m
  const [displacement, setDisplacement] = useState('0.2'); // meters

  const calculate = () => {
    const F = parseFloat(force);
    const k = parseFloat(constant);
    const x = parseFloat(displacement);

    // F = kx
    if (mode === 'force' && !isNaN(k) && !isNaN(x)) {
      return { val: (k * x).toFixed(2), unit: 'N' };
    } else if (mode === 'constant' && !isNaN(F) && !isNaN(x) && x !== 0) {
      return { val: (F / x).toFixed(2), unit: 'N/m' };
    } else if (mode === 'displacement' && !isNaN(F) && !isNaN(k) && k !== 0) {
      return { val: (F / k).toFixed(4), unit: 'm' };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Spring Constant Calculator" description="Calculate spring force, constant, or displacement using Hooke's Law (F = kx)." category="engineering" seoTitle="Spring Constant Calculator | F=kx" seoDescription="Calculate spring force, spring constant (k), or displacement with this free Hooke's Law calculator for mechanical springs.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="flex flex-col sm:flex-row bg-gray-100 p-1 rounded-lg mb-8 gap-1">
            <button onClick={() => setMode('force')} className={`flex-1 py-2 rounded-md font-bold text-sm ${mode === 'force' ? 'bg-white shadow text-indigo-700' : 'text-gray-600'}`}>Find Force (F)</button>
            <button onClick={() => setMode('constant')} className={`flex-1 py-2 rounded-md font-bold text-sm ${mode === 'constant' ? 'bg-white shadow text-indigo-700' : 'text-gray-600'}`}>Find Constant (k)</button>
            <button onClick={() => setMode('displacement')} className={`flex-1 py-2 rounded-md font-bold text-sm ${mode === 'displacement' ? 'bg-white shadow text-indigo-700' : 'text-gray-600'}`}>Find Displacement (x)</button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {mode !== 'force' && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Force (F) in Newtons</label>
              <input type="number" value={force} onChange={(e) => setForce(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
            </div>
          )}
          {mode !== 'constant' && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Spring Constant (k) in N/m</label>
              <input type="number" value={constant} onChange={(e) => setConstant(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
            </div>
          )}
          {mode !== 'displacement' && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Displacement (x) in meters</label>
              <input type="number" value={displacement} onChange={(e) => setDisplacement(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
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

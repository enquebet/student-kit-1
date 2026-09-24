import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function HookesLawTool() {
  const [stress, setStress] = useState(''); // MPa
  const [strain, setStrain] = useState(''); // unitless
  const [modulus, setModulus] = useState('200'); // GPa (Steel approx)
  
  const [mode, setMode] = useState<'stress' | 'strain' | 'modulus'>('stress');

  const calculate = () => {
    const s = parseFloat(stress); // MPa
    const e = parseFloat(strain); 
    const E = parseFloat(modulus) * 1000; // convert GPa to MPa for calculation

    if (mode === 'stress' && !isNaN(e) && !isNaN(E)) {
      return { val: (E * e).toFixed(2), unit: 'MPa' };
    } else if (mode === 'strain' && !isNaN(s) && !isNaN(E) && E !== 0) {
      return { val: (s / E).toExponential(4), unit: '' };
    } else if (mode === 'modulus' && !isNaN(s) && !isNaN(e) && e !== 0) {
      return { val: ((s / e) / 1000).toFixed(2), unit: 'GPa' };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Hooke's Law Calculator" description="Calculate Stress, Strain, or Young's Modulus for linear elastic materials." category="engineering" seoTitle="Hooke's Law Calculator | Stress & Strain" seoDescription="Calculate stress (MPa), strain, and Young's Modulus (GPa) using Hooke's Law for elastic materials.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="flex bg-gray-100 p-1 rounded-lg mb-8">
            <button onClick={() => setMode('stress')} className={`flex-1 py-2 rounded-md font-bold text-sm ${mode === 'stress' ? 'bg-white shadow text-indigo-700' : 'text-gray-600'}`}>Find Stress (σ)</button>
            <button onClick={() => setMode('strain')} className={`flex-1 py-2 rounded-md font-bold text-sm ${mode === 'strain' ? 'bg-white shadow text-indigo-700' : 'text-gray-600'}`}>Find Strain (ε)</button>
            <button onClick={() => setMode('modulus')} className={`flex-1 py-2 rounded-md font-bold text-sm ${mode === 'modulus' ? 'bg-white shadow text-indigo-700' : 'text-gray-600'}`}>Find Modulus (E)</button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {mode !== 'stress' && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Stress (σ) in MPa</label>
              <input type="number" value={stress} onChange={(e) => setStress(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
            </div>
          )}
          {mode !== 'strain' && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Strain (ε) unitless</label>
              <input type="number" value={strain} onChange={(e) => setStrain(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
            </div>
          )}
          {mode !== 'modulus' && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Young's Modulus (E) in GPa</label>
              <input type="number" value={modulus} onChange={(e) => setModulus(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
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

import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function SpecificHeatCapacityTool() {
  const [mode, setMode] = useState<'heat' | 'mass' | 'specificHeat' | 'deltaT'>('heat');
  
  const [heat, setHeat] = useState('4184'); // J
  const [mass, setMass] = useState('1'); // kg
  const [specificHeat, setSpecificHeat] = useState('4184'); // J/(kg*K)
  const [deltaT, setDeltaT] = useState('1'); // K or C

  const calculate = () => {
    const Q = parseFloat(heat);
    const m = parseFloat(mass);
    const c = parseFloat(specificHeat);
    const dT = parseFloat(deltaT);

    // Q = m * c * dT
    if (mode === 'heat' && !isNaN(m) && !isNaN(c) && !isNaN(dT)) {
      return { val: (m * c * dT).toFixed(2), unit: 'J', label: 'Heat Energy (Q)' };
    } else if (mode === 'mass' && !isNaN(Q) && !isNaN(c) && !isNaN(dT) && (c * dT) !== 0) {
      return { val: (Q / (c * dT)).toFixed(4), unit: 'kg', label: 'Mass (m)' };
    } else if (mode === 'specificHeat' && !isNaN(Q) && !isNaN(m) && !isNaN(dT) && (m * dT) !== 0) {
      return { val: (Q / (m * dT)).toFixed(2), unit: 'J/(kg·K)', label: 'Specific Heat Capacity (c)' };
    } else if (mode === 'deltaT' && !isNaN(Q) && !isNaN(m) && !isNaN(c) && (m * c) !== 0) {
      return { val: (Q / (m * c)).toFixed(4), unit: '°C or K', label: 'Temperature Change (ΔT)' };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Specific Heat Capacity Calculator" description="Calculate heat energy, mass, specific heat, or temperature change using Q = mcΔT." category="engineering" seoTitle="Specific Heat Capacity Calculator | Q = mcΔT" seoDescription="Free thermodynamics calculator for specific heat capacity. Calculate heat energy transfer using the formula Q = mcΔT.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="grid grid-cols-2 sm:grid-cols-4 bg-gray-100 p-1 rounded-lg mb-8 gap-1">
            <button onClick={() => setMode('heat')} className={`py-2 rounded-md font-bold text-xs md:text-sm ${mode === 'heat' ? 'bg-white shadow text-indigo-700' : 'text-gray-600'}`}>Find Q</button>
            <button onClick={() => setMode('mass')} className={`py-2 rounded-md font-bold text-xs md:text-sm ${mode === 'mass' ? 'bg-white shadow text-indigo-700' : 'text-gray-600'}`}>Find m</button>
            <button onClick={() => setMode('specificHeat')} className={`py-2 rounded-md font-bold text-xs md:text-sm ${mode === 'specificHeat' ? 'bg-white shadow text-indigo-700' : 'text-gray-600'}`}>Find c</button>
            <button onClick={() => setMode('deltaT')} className={`py-2 rounded-md font-bold text-xs md:text-sm ${mode === 'deltaT' ? 'bg-white shadow text-indigo-700' : 'text-gray-600'}`}>Find ΔT</button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {mode !== 'heat' && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Heat Energy (Q) in Joules</label>
              <input type="number" value={heat} onChange={(e) => setHeat(e.target.value)} className="w-full p-3 border rounded-lg" step="any" />
            </div>
          )}
          {mode !== 'mass' && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Mass (m) in kg</label>
              <input type="number" value={mass} onChange={(e) => setMass(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
            </div>
          )}
          {mode !== 'specificHeat' && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Specific Heat (c) in J/(kg·K)</label>
              <input type="number" value={specificHeat} onChange={(e) => setSpecificHeat(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
            </div>
          )}
          {mode !== 'deltaT' && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Temp Change (ΔT) in °C or K</label>
              <input type="number" value={deltaT} onChange={(e) => setDeltaT(e.target.value)} className="w-full p-3 border rounded-lg" step="any" />
            </div>
          )}
        </div>

        {res && (
          <div className="bg-indigo-50 p-8 rounded-xl border border-indigo-100 text-center">
            <h3 className="text-sm font-bold text-indigo-800 uppercase tracking-wider mb-2">Calculated {res.label}</h3>
            <div className="text-5xl font-black text-indigo-700 flex items-baseline justify-center gap-2">
                {res.val} <span className="text-2xl text-indigo-500">{res.unit}</span>
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

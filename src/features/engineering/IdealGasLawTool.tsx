import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function IdealGasLawTool() {
  const [mode, setMode] = useState<'pressure' | 'volume' | 'moles' | 'temperature'>('pressure');
  
  const [pressure, setPressure] = useState('101325'); // Pa
  const [volume, setVolume] = useState('0.0224'); // m3
  const [moles, setMoles] = useState('1'); // mol
  const [temperature, setTemperature] = useState('273.15'); // K

  // R = Universal Gas Constant (J / (mol K))
  const R = 8.314462618; 

  const calculate = () => {
    const P = parseFloat(pressure);
    const V = parseFloat(volume);
    const n = parseFloat(moles);
    const T = parseFloat(temperature);

    // PV = nRT
    if (mode === 'pressure' && !isNaN(V) && !isNaN(n) && !isNaN(T) && V > 0) {
      return { val: (n * R * T) / V, unit: 'Pa', label: 'Pressure (P)' };
    } else if (mode === 'volume' && !isNaN(P) && !isNaN(n) && !isNaN(T) && P > 0) {
      return { val: (n * R * T) / P, unit: 'm³', label: 'Volume (V)' };
    } else if (mode === 'moles' && !isNaN(P) && !isNaN(V) && !isNaN(T) && T > 0) {
      return { val: (P * V) / (R * T), unit: 'mol', label: 'Moles (n)' };
    } else if (mode === 'temperature' && !isNaN(P) && !isNaN(V) && !isNaN(n) && n > 0) {
      return { val: (P * V) / (n * R), unit: 'K', label: 'Temperature (T)' };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Ideal Gas Law Calculator" description="Calculate Pressure, Volume, Moles, or Temperature using the Ideal Gas Law equation (PV = nRT)." category="engineering" seoTitle="Ideal Gas Law Calculator | PV = nRT" seoDescription="Free Ideal Gas Law calculator. Solve for Pressure (Pa), Volume (m³), Moles (n), or Temperature (K) using PV = nRT.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="grid grid-cols-2 sm:grid-cols-4 bg-gray-100 p-1 rounded-lg mb-8 gap-1">
            <button onClick={() => setMode('pressure')} className={`py-2 rounded-md font-bold text-xs md:text-sm ${mode === 'pressure' ? 'bg-white shadow text-indigo-700' : 'text-gray-600'}`}>Find P</button>
            <button onClick={() => setMode('volume')} className={`py-2 rounded-md font-bold text-xs md:text-sm ${mode === 'volume' ? 'bg-white shadow text-indigo-700' : 'text-gray-600'}`}>Find V</button>
            <button onClick={() => setMode('moles')} className={`py-2 rounded-md font-bold text-xs md:text-sm ${mode === 'moles' ? 'bg-white shadow text-indigo-700' : 'text-gray-600'}`}>Find n</button>
            <button onClick={() => setMode('temperature')} className={`py-2 rounded-md font-bold text-xs md:text-sm ${mode === 'temperature' ? 'bg-white shadow text-indigo-700' : 'text-gray-600'}`}>Find T</button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {mode !== 'pressure' && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Pressure (P) in Pascals</label>
              <input type="number" value={pressure} onChange={(e) => setPressure(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
            </div>
          )}
          {mode !== 'volume' && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Volume (V) in m³</label>
              <input type="number" value={volume} onChange={(e) => setVolume(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
            </div>
          )}
          {mode !== 'moles' && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Amount (n) in Moles</label>
              <input type="number" value={moles} onChange={(e) => setMoles(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
            </div>
          )}
          {mode !== 'temperature' && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Temperature (T) in Kelvin</label>
              <input type="number" value={temperature} onChange={(e) => setTemperature(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
            </div>
          )}
        </div>

        {res && (
          <div className="bg-indigo-50 p-8 rounded-xl border border-indigo-100 text-center">
            <h3 className="text-sm font-bold text-indigo-800 uppercase tracking-wider mb-2">Calculated {res.label}</h3>
            <div className="text-5xl font-black text-indigo-700 flex items-baseline justify-center gap-2">
                {res.val.toLocaleString(undefined, { maximumFractionDigits: 4 })} <span className="text-2xl text-indigo-500">{res.unit}</span>
            </div>
            <p className="text-xs text-indigo-700/70 mt-4 font-medium">Using Universal Gas Constant (R) = 8.314 J/(mol·K)</p>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

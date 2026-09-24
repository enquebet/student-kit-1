import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function BuoyancyForceTool() {
  const [density, setDensity] = useState('1025'); // kg/m3 (Seawater)
  const [volume, setVolume] = useState('2'); // m3
  const [gravity, setGravity] = useState('9.81'); // m/s2

  const calculate = () => {
    const rho = parseFloat(density);
    const V = parseFloat(volume);
    const g = parseFloat(gravity);

    if (rho > 0 && V > 0 && g > 0) {
      // F_b = rho * V * g
      const forceNewtons = rho * V * g;
      const forceKn = forceNewtons / 1000;
      const displacedMass = rho * V;

      return {
        newtons: forceNewtons.toLocaleString(undefined, { maximumFractionDigits: 0 }),
        kn: forceKn.toLocaleString(undefined, { maximumFractionDigits: 2 }),
        mass: displacedMass.toLocaleString(undefined, { maximumFractionDigits: 1 })
      };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Buoyancy Force Calculator" description="Calculate the upward buoyant force using Archimedes' principle." category="engineering" seoTitle="Buoyancy Force Calculator | Archimedes Principle" seoDescription="Calculate buoyant force (Newtons) and displaced fluid mass based on fluid density and displaced volume using Archimedes' principle.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Fluid Density (ρ) in kg/m³</label>
            <input type="number" value={density} onChange={(e) => setDensity(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
            <div className="text-xs text-gray-500 mt-1">Fresh water ≈ 1000, Seawater ≈ 1025</div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Displaced Volume (V) in m³</label>
            <input type="number" value={volume} onChange={(e) => setVolume(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Gravity (g) in m/s²</label>
            <input type="number" value={gravity} onChange={(e) => setGravity(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
          </div>
        </div>

        {res && (
          <div className="bg-cyan-50 p-8 rounded-xl border border-cyan-100 text-center">
            <h3 className="text-sm font-bold text-cyan-800 uppercase tracking-wider mb-2">Buoyant Force (F_b)</h3>
            <div className="text-5xl font-black text-cyan-700 flex items-baseline justify-center gap-2 mb-2">
                {res.newtons} <span className="text-2xl text-cyan-500">N</span>
            </div>
            <div className="text-lg font-bold text-cyan-600/70 mb-4">
                or {res.kn} kN
            </div>
            
            <div className="pt-4 border-t border-cyan-200 mt-4">
               <span className="text-sm text-cyan-800 font-medium">Mass of Displaced Fluid: </span>
               <span className="text-sm text-cyan-900 font-bold">{res.mass} kg</span>
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

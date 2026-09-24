import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function ReynoldsNumberTool() {
  const [density, setDensity] = useState('1000'); // kg/m3 (water approx)
  const [velocity, setVelocity] = useState('2'); // m/s
  const [diameter, setDiameter] = useState('0.1'); // m
  const [viscosity, setViscosity] = useState('0.001'); // Pa*s (dynamic viscosity of water)

  const calculate = () => {
    const rho = parseFloat(density);
    const v = parseFloat(velocity);
    const D = parseFloat(diameter);
    const mu = parseFloat(viscosity);

    if (rho > 0 && v > 0 && D > 0 && mu > 0) {
      // Re = (rho * v * D) / mu
      const Re = (rho * v * D) / mu;
      
      let flowState = '';
      let colorClass = '';
      
      if (Re < 2000) {
          flowState = 'Laminar Flow';
          colorClass = 'text-emerald-600';
      } else if (Re >= 2000 && Re <= 4000) {
          flowState = 'Transient (Transitional) Flow';
          colorClass = 'text-amber-600';
      } else {
          flowState = 'Turbulent Flow';
          colorClass = 'text-red-600';
      }

      return { Re: Re, flowState, colorClass };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Reynolds Number Calculator" description="Calculate the Reynolds Number to predict if fluid flow is laminar or turbulent." category="engineering" seoTitle="Reynolds Number Calculator | Fluid Mechanics" seoDescription="Free fluid mechanics calculator. Calculate Reynolds number (Re) for pipe flow to determine if flow is laminar, transitional, or turbulent.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Fluid Density (ρ) in kg/m³</label>
            <input type="number" value={density} onChange={(e) => setDensity(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Fluid Velocity (v) in m/s</label>
            <input type="number" value={velocity} onChange={(e) => setVelocity(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Pipe Diameter (D) in meters</label>
            <input type="number" value={diameter} onChange={(e) => setDiameter(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Dynamic Viscosity (μ) in Pa·s</label>
            <input type="number" value={viscosity} onChange={(e) => setViscosity(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
            <div className="text-xs text-gray-500 mt-1">Water at 20°C ≈ 0.001 Pa·s</div>
          </div>
        </div>

        {res && (
          <div className="bg-indigo-50 p-8 rounded-xl border border-indigo-100 text-center">
            <h3 className="text-sm font-bold text-indigo-800 uppercase tracking-wider mb-2">Reynolds Number (Re)</h3>
            <div className="text-5xl font-black text-indigo-700 mb-4">
                {res.Re.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
            <div className={`text-xl font-bold ${res.colorClass}`}>
                {res.flowState}
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

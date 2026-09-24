import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function HeatConductionTool() {
  const [conductivity, setConductivity] = useState('205'); // W/(mK) (Aluminum)
  const [area, setArea] = useState('1'); // m2
  const [t1, setT1] = useState('100'); // C or K
  const [t2, setT2] = useState('20'); // C or K
  const [thickness, setThickness] = useState('0.05'); // m

  const calculate = () => {
    const k = parseFloat(conductivity);
    const A = parseFloat(area);
    const T1 = parseFloat(t1);
    const T2 = parseFloat(t2);
    const d = parseFloat(thickness);

    if (k > 0 && A > 0 && d > 0 && !isNaN(T1) && !isNaN(T2)) {
      // Q_dot = k * A * (T1 - T2) / d
      const deltaT = Math.abs(T1 - T2);
      const heatRate = (k * A * deltaT) / d;

      return {
        watts: heatRate.toLocaleString(undefined, { maximumFractionDigits: 2 }),
        kW: (heatRate / 1000).toLocaleString(undefined, { maximumFractionDigits: 4 })
      };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Heat Conduction Calculator" description="Calculate heat transfer rate through a material using Fourier's Law." category="engineering" seoTitle="Heat Conduction Calculator | Fourier's Law" seoDescription="Calculate the rate of heat transfer (Watts) through a solid material using Fourier's Law of thermal conduction.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Thermal Conductivity (k) in W/(m·K)</label>
            <input type="number" value={conductivity} onChange={(e) => setConductivity(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
            <div className="text-xs text-gray-500 mt-1">e.g., Aluminum ≈ 205, Wood ≈ 0.15</div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Surface Area (A) in m²</label>
            <input type="number" value={area} onChange={(e) => setArea(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Hot Side Temperature (T₁)</label>
            <input type="number" value={t1} onChange={(e) => setT1(e.target.value)} className="w-full p-3 border rounded-lg" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Cold Side Temperature (T₂)</label>
            <input type="number" value={t2} onChange={(e) => setT2(e.target.value)} className="w-full p-3 border rounded-lg" step="any" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-1">Material Thickness (d) in meters</label>
            <input type="number" value={thickness} onChange={(e) => setThickness(e.target.value)} className="w-full p-3 border rounded-lg max-w-xs" min="0" step="any" />
          </div>
        </div>

        {res && (
          <div className="bg-orange-50 p-8 rounded-xl border border-orange-100 text-center">
            <h3 className="text-sm font-bold text-orange-800 uppercase tracking-wider mb-2">Heat Transfer Rate (Q)</h3>
            <div className="text-5xl font-black text-orange-700 flex items-baseline justify-center gap-2 mb-2">
                {res.watts} <span className="text-2xl text-orange-500">W</span>
            </div>
            <div className="text-lg font-bold text-orange-600/70">
                or {res.kW} kW
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

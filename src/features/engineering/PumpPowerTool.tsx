import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function PumpPowerTool() {
  const [flowRate, setFlowRate] = useState('0.1'); // m3/s
  const [head, setHead] = useState('20'); // meters
  const [density, setDensity] = useState('1000'); // kg/m3
  const [efficiency, setEfficiency] = useState('75'); // %

  const calculate = () => {
    const Q = parseFloat(flowRate);
    const H = parseFloat(head);
    const rho = parseFloat(density);
    const eta = parseFloat(efficiency) / 100;
    const g = 9.81;

    if (Q > 0 && H > 0 && rho > 0 && eta > 0 && eta <= 1) {
      // Hydraulic Power (Ph) = rho * g * Q * H
      const hydPowerWatts = rho * g * Q * H;
      const hydPowerKw = hydPowerWatts / 1000;
      
      // Shaft Power (Ps) = Ph / eta
      const shaftPowerKw = hydPowerKw / eta;
      
      // 1 kW = 1.34102 HP
      const shaftPowerHp = shaftPowerKw * 1.34102;

      return {
        hydraulicKw: hydPowerKw.toFixed(2),
        shaftKw: shaftPowerKw.toFixed(2),
        shaftHp: shaftPowerHp.toFixed(2)
      };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Pump Hydraulic Power Calculator" description="Calculate the hydraulic and shaft power required for a fluid pump." category="engineering" seoTitle="Pump Power Calculator | Shaft & Hydraulic Power" seoDescription="Calculate required pump shaft power (kW and HP) based on flow rate, total head, fluid density, and pump efficiency.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Volumetric Flow Rate (Q) in m³/s</label>
            <input type="number" value={flowRate} onChange={(e) => setFlowRate(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Total Dynamic Head (H) in meters</label>
            <input type="number" value={head} onChange={(e) => setHead(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Fluid Density (ρ) in kg/m³</label>
            <input type="number" value={density} onChange={(e) => setDensity(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Pump Efficiency (η) in %</label>
            <input type="number" value={efficiency} onChange={(e) => setEfficiency(e.target.value)} className="w-full p-3 border rounded-lg" min="1" max="100" step="any" />
          </div>
        </div>

        {res && (
          <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                <div className="bg-white p-4 rounded-lg border">
                   <div className="text-xs font-bold text-gray-500 uppercase">Hydraulic Power</div>
                   <div className="text-2xl font-bold text-indigo-700 mt-2">{res.hydraulicKw} kW</div>
                   <div className="text-xs text-gray-400 mt-1">Power imparted to fluid</div>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                   <div className="text-xs font-bold text-gray-500 uppercase">Required Shaft Power</div>
                   <div className="text-2xl font-bold text-indigo-700 mt-2">{res.shaftKw} kW</div>
                   <div className="text-sm font-bold text-indigo-500 mt-1">or {res.shaftHp} HP</div>
                   <div className="text-xs text-gray-400 mt-1">Motor output needed</div>
                </div>
             </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Calculator } from 'lucide-react';

export default function WireGaugeConverterTool() {
  const [awg, setAwg] = useState('12');

  const calculate = () => {
    const awgVal = parseFloat(awg);
    
    if (!isNaN(awgVal)) {
      // For AWG > 0. (0, 00, 000 etc represented as 0, -1, -2)
      // Standard formula: d = 0.127 * 92^((36 - AWG)/39) mm
      const diameter = 0.127 * Math.pow(92, (36 - awgVal) / 39);
      const area = (Math.PI / 4) * Math.pow(diameter, 2);
      
      // Resistance approx for Copper at 20C (ohm/km)
      // R = rho * L / A, rho = 1.724e-8 ohm*m, L = 1000m
      const resistance = (1.724e-8 * 1000) / (area * 1e-6);

      return {
        diameter: diameter.toFixed(4),
        area: area.toFixed(4),
        resistance: resistance.toFixed(2)
      };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="AWG to Metric Converter" description="Convert American Wire Gauge (AWG) to Diameter (mm) and Cross-Sectional Area (mm²)." category="engineering" seoTitle="AWG to Metric Converter | Wire Gauge to mm²" seoDescription="Instantly convert AWG to mm, mm², and calculate copper wire resistance per kilometer.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="mb-8">
          <label className="block text-sm font-bold text-gray-700 mb-2">American Wire Gauge (AWG)</label>
          <input 
            type="number" 
            value={awg} 
            onChange={(e) => setAwg(e.target.value)} 
            className="w-full p-4 text-xl font-bold border rounded-xl bg-gray-50 focus:bg-white" 
            placeholder="e.g. 12" 
          />
          <p className="text-xs text-gray-500 mt-2">Enter negative numbers for gauges larger than 0 (e.g., -1 for 00, -2 for 000).</p>
        </div>

        {res && (
          <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
            <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2"><Calculator className="w-5 h-5"/> Metric Equivalents</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-xs font-bold text-gray-500 uppercase">Diameter</div>
                <div className="text-2xl font-bold text-indigo-700">{res.diameter} mm</div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-xs font-bold text-gray-500 uppercase">Cross-Sectional Area</div>
                <div className="text-2xl font-bold text-indigo-700">{res.area} mm²</div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-xs font-bold text-gray-500 uppercase">Copper Resistance</div>
                <div className="text-xl font-bold text-indigo-700">{res.resistance} Ω/km</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

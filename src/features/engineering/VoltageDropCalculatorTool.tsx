import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Calculator } from 'lucide-react';

export default function VoltageDropCalculatorTool() {
  const [voltage, setVoltage] = useState('12');
  const [current, setCurrent] = useState('10');
  const [distance, setDistance] = useState('50'); // meters
  const [material, setMaterial] = useState<'copper' | 'aluminum'>('copper');
  const [crossSection, setCrossSection] = useState('2.5'); // mm^2

  const calculate = () => {
    const V = parseFloat(voltage);
    const I = parseFloat(current);
    const L = parseFloat(distance);
    const A = parseFloat(crossSection);

    if (V > 0 && I > 0 && L > 0 && A > 0) {
      // Resistivity at 20C (ohm * mm^2 / m)
      const rho = material === 'copper' ? 0.01724 : 0.0282;
      
      // Total wire length is 2 * L (return path) for DC / Single Phase
      const R = (rho * 2 * L) / A;
      const vDrop = I * R;
      const vDropPercent = (vDrop / V) * 100;
      const vEnd = V - vDrop;

      return {
        vDrop: vDrop.toFixed(2),
        vDropPercent: vDropPercent.toFixed(2),
        vEnd: vEnd.toFixed(2),
        resistance: R.toFixed(4)
      };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Voltage Drop Calculator" description="Calculate voltage drop over wire length for DC and single-phase AC circuits." category="engineering" seoTitle="Voltage Drop Calculator | Wire Size & Distance" seoDescription="Free voltage drop calculator. Calculate end voltage, percentage drop, and total resistance for copper and aluminum wires.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Source Voltage (V)</label>
            <input type="number" value={voltage} onChange={(e) => setVoltage(e.target.value)} className="w-full p-3 border rounded-lg" min="0" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Current Load (Amps)</label>
            <input type="number" value={current} onChange={(e) => setCurrent(e.target.value)} className="w-full p-3 border rounded-lg" min="0" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">One-way Distance (Meters)</label>
            <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} className="w-full p-3 border rounded-lg" min="0" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Wire Cross-section (mm²)</label>
            <input type="number" value={crossSection} onChange={(e) => setCrossSection(e.target.value)} className="w-full p-3 border rounded-lg" min="0" />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">Conductor Material</label>
          <div className="flex gap-4">
            <button onClick={() => setMaterial('copper')} className={`flex-1 py-3 rounded-lg font-bold ${material === 'copper' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Copper</button>
            <button onClick={() => setMaterial('aluminum')} className={`flex-1 py-3 rounded-lg font-bold ${material === 'aluminum' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Aluminum</button>
          </div>
        </div>

        {res && (
          <div className="mt-8 bg-indigo-50 p-6 rounded-xl border border-indigo-100">
            <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2"><Calculator className="w-5 h-5"/> Results</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-xs font-bold text-gray-500 uppercase">Voltage Drop</div>
                <div className="text-2xl font-bold text-red-600">{res.vDrop} V</div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-xs font-bold text-gray-500 uppercase">Percentage Drop</div>
                <div className="text-2xl font-bold text-red-600">{res.vDropPercent}%</div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-xs font-bold text-gray-500 uppercase">Voltage at End</div>
                <div className="text-2xl font-bold text-green-600">{res.vEnd} V</div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-xs font-bold text-gray-500 uppercase">Total Wire Resistance</div>
                <div className="text-xl font-bold text-indigo-700">{res.resistance} Ω</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

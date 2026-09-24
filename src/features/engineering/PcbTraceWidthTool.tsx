import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Calculator } from 'lucide-react';

export default function PcbTraceWidthTool() {
  const [current, setCurrent] = useState('1'); // Amps
  const [thickness, setThickness] = useState('1'); // oz/ft2
  const [tempRise, setTempRise] = useState('10'); // deg C
  const [layer, setLayer] = useState<'external' | 'internal'>('external');

  const calculate = () => {
    const I = parseFloat(current);
    const th = parseFloat(thickness); // in oz/ft^2
    const dT = parseFloat(tempRise);

    if (I > 0 && th > 0 && dT > 0) {
      // IPC-2221 Standards
      const k = layer === 'external' ? 0.048 : 0.024;
      
      // Area in sq mils
      const areaMils2 = Math.pow(I / (k * Math.pow(dT, 0.44)), 1 / 0.725);
      
      // Convert thickness oz/ft2 to mils (1 oz/ft2 = 1.37 mils)
      const thicknessMils = th * 1.378;
      
      const widthMils = areaMils2 / thicknessMils;
      const widthMm = widthMils * 0.0254; // 1 mil = 0.0254 mm

      return {
        widthMils: widthMils.toFixed(2),
        widthMm: widthMm.toFixed(3),
        areaMils: areaMils2.toFixed(2)
      };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="PCB Trace Width Calculator" description="Calculate required PCB trace width using the IPC-2221 standard." category="engineering" seoTitle="PCB Trace Width Calculator | IPC-2221 Standard" seoDescription="Calculate required PCB trace width for external and internal layers based on current, temperature rise, and copper thickness.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="flex gap-4 mb-6">
          <button onClick={() => setLayer('external')} className={`flex-1 py-3 rounded-lg font-bold ${layer === 'external' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>External Layer</button>
          <button onClick={() => setLayer('internal')} className={`flex-1 py-3 rounded-lg font-bold ${layer === 'internal' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Internal Layer</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Current (Amps)</label>
            <input type="number" value={current} onChange={(e) => setCurrent(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="e.g. 1" min="0" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Copper Thickness (oz/ft²)</label>
            <select value={thickness} onChange={(e) => setThickness(e.target.value)} className="w-full p-3 border rounded-lg bg-white">
              <option value="0.5">0.5 oz (0.7 mil)</option>
              <option value="1">1.0 oz (1.37 mil)</option>
              <option value="2">2.0 oz (2.74 mil)</option>
              <option value="3">3.0 oz (4.11 mil)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Max Temperature Rise (°C)</label>
            <input type="number" value={tempRise} onChange={(e) => setTempRise(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="e.g. 10" min="0" />
          </div>
        </div>

        {res && (
          <div className="mt-8 bg-indigo-50 p-6 rounded-xl border border-indigo-100">
            <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2"><Calculator className="w-5 h-5"/> Calculated Minimum Trace Width</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-xs font-bold text-gray-500 uppercase">Width (mils)</div>
                <div className="text-2xl font-bold text-indigo-700">{res.widthMils} mil</div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-xs font-bold text-gray-500 uppercase">Width (mm)</div>
                <div className="text-2xl font-bold text-indigo-700">{res.widthMm} mm</div>
              </div>
              <div className="bg-white p-4 rounded-lg border col-span-2">
                <div className="text-xs font-bold text-gray-500 uppercase">Cross-Sectional Area</div>
                <div className="text-xl font-bold text-indigo-700">{res.areaMils} mil²</div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">Based on IPC-2221 formulas. Suitable for up to 35 Amps.</p>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

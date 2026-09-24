import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Calculator } from 'lucide-react';

export default function AntennaLengthTool() {
  const [freq, setFreq] = useState('144'); // MHz
  
  const calculate = () => {
    const f = parseFloat(freq);
    if (f > 0) {
      // Wavelength in meters = 300 / f(MHz) (approx for RF)
      // Dipole (Half-wave) length in feet approx: 468 / f(MHz)
      // Monopole (Quarter-wave) length in feet approx: 234 / f(MHz)
      
      const dipoleFeet = 468 / f;
      const dipoleMeters = 143 / f;
      
      const monopoleFeet = 234 / f;
      const monopoleMeters = 71.5 / f;

      return {
        dipole: { ft: dipoleFeet.toFixed(2), m: dipoleMeters.toFixed(2) },
        monopole: { ft: monopoleFeet.toFixed(2), m: monopoleMeters.toFixed(2) }
      };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Antenna Length Calculator" description="Calculate the physical length of half-wave dipole and quarter-wave monopole antennas." category="engineering" seoTitle="Antenna Length Calculator | Dipole & Monopole" seoDescription="Calculate required antenna lengths for ham radio, CB, or any RF frequency. Free half-wave dipole and quarter-wave monopole calculator.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="max-w-xs mx-auto mb-8">
          <label className="block text-sm font-bold text-gray-700 mb-1">Target Frequency</label>
          <div className="flex items-center gap-2">
            <input type="number" value={freq} onChange={(e) => setFreq(e.target.value)} className="flex-1 p-3 border rounded-lg text-xl" placeholder="e.g. 144" min="0" />
            <span className="font-bold text-gray-500 w-12">MHz</span>
          </div>
        </div>

        {res && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 text-center">
              <h3 className="text-lg font-bold text-indigo-900 mb-4">Half-Wave Dipole</h3>
              <div className="text-3xl font-bold text-indigo-700 mb-2">{res.dipole.ft} ft</div>
              <div className="text-xl font-medium text-indigo-600/70">{res.dipole.m} m</div>
              <p className="text-xs text-indigo-800 mt-4 opacity-70">Total length end-to-end</p>
            </div>
            
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 text-center">
              <h3 className="text-lg font-bold text-emerald-900 mb-4">Quarter-Wave Monopole</h3>
              <div className="text-3xl font-bold text-emerald-700 mb-2">{res.monopole.ft} ft</div>
              <div className="text-xl font-medium text-emerald-600/70">{res.monopole.m} m</div>
              <p className="text-xs text-emerald-800 mt-4 opacity-70">Vertical radiator length</p>
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

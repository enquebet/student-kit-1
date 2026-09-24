import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Calculator } from 'lucide-react';

export default function HighPassFilterTool() {
  const [type, setType] = useState<'RC' | 'RL'>('RC');
  const [resistance, setResistance] = useState('1000');
  const [capacitance, setCapacitance] = useState('1'); // uF
  const [inductance, setInductance] = useState('10'); // mH

  const calculate = () => {
    const R = parseFloat(resistance);
    const C = parseFloat(capacitance) * 1e-6; // convert uF to F
    const L = parseFloat(inductance) * 1e-3; // convert mH to H

    if (R > 0) {
      let fc = 0;
      if (type === 'RC' && C > 0) {
        fc = 1 / (2 * Math.PI * R * C);
      } else if (type === 'RL' && L > 0) {
        fc = R / (2 * Math.PI * L);
      } else {
        return null;
      }
      return { cutoff: fc };
    }
    return null;
  };

  const res = calculate();

  const formatFreq = (f: number) => {
    if (f >= 1e6) return `${(f / 1e6).toFixed(3)} MHz`;
    if (f >= 1e3) return `${(f / 1e3).toFixed(3)} kHz`;
    return `${f.toFixed(2)} Hz`;
  };

  return (
    <ToolShell title="High-Pass Filter Calculator" description="Calculate the cut-off frequency of passive RC and RL high-pass filters." category="engineering" seoTitle="High-Pass Filter Calculator | RC & RL Circuits" seoDescription="Calculate the -3dB cut-off frequency for passive high-pass filters. Free online tool for RC and RL circuits.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        <div className="flex gap-4 mb-6">
          <button onClick={() => setType('RC')} className={`flex-1 py-3 rounded-lg font-bold ${type === 'RC' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>RC Filter</button>
          <button onClick={() => setType('RL')} className={`flex-1 py-3 rounded-lg font-bold ${type === 'RL' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>RL Filter</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Resistance (R)</label>
            <div className="flex items-center gap-2">
              <input type="number" value={resistance} onChange={(e) => setResistance(e.target.value)} className="flex-1 p-3 border rounded-lg" placeholder="e.g. 1000" min="0" />
              <span className="w-12 text-gray-500 font-bold">Ω</span>
            </div>
          </div>
          
          {type === 'RC' ? (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Capacitance (C)</label>
              <div className="flex items-center gap-2">
                <input type="number" value={capacitance} onChange={(e) => setCapacitance(e.target.value)} className="flex-1 p-3 border rounded-lg" placeholder="e.g. 1" min="0" />
                <span className="w-12 text-gray-500 font-bold">µF</span>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Inductance (L)</label>
              <div className="flex items-center gap-2">
                <input type="number" value={inductance} onChange={(e) => setInductance(e.target.value)} className="flex-1 p-3 border rounded-lg" placeholder="e.g. 10" min="0" />
                <span className="w-12 text-gray-500 font-bold">mH</span>
              </div>
            </div>
          )}
        </div>

        {res && (
          <div className="mt-8 bg-indigo-50 p-6 rounded-xl border border-indigo-100">
            <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2"><Calculator className="w-5 h-5"/> Result</h3>
            <div className="bg-white p-6 rounded-lg border text-center">
              <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Cut-off Frequency (f_c)</div>
              <div className="text-4xl font-bold text-indigo-700">{formatFreq(res.cutoff)}</div>
              <p className="text-xs text-gray-500 mt-3 font-medium">Signals above this frequency are passed, while lower frequencies are attenuated (-3dB point).</p>
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

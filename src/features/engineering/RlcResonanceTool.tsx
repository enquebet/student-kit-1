import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Calculator } from 'lucide-react';

export default function RlcResonanceTool() {
  const [type, setType] = useState<'series' | 'parallel'>('series');
  const [resistance, setResistance] = useState('10');
  const [capacitance, setCapacitance] = useState('1'); // uF
  const [inductance, setInductance] = useState('10'); // mH

  const calculate = () => {
    const R = parseFloat(resistance);
    const C = parseFloat(capacitance) * 1e-6;
    const L = parseFloat(inductance) * 1e-3;

    if (R > 0 && C > 0 && L > 0) {
      const fRes = 1 / (2 * Math.PI * Math.sqrt(L * C));
      let Q = 0;
      
      if (type === 'series') {
        Q = (1 / R) * Math.sqrt(L / C);
      } else {
        Q = R * Math.sqrt(C / L);
      }
      
      const bandwidth = fRes / Q;

      return {
        frequency: fRes,
        qFactor: Q,
        bandwidth: bandwidth
      };
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
    <ToolShell title="RLC Resonance Calculator" description="Calculate resonant frequency, Q factor, and bandwidth for series and parallel RLC circuits." category="engineering" seoTitle="RLC Resonance Calculator | Resonant Frequency & Q Factor" seoDescription="Free RLC circuit calculator. Find resonant frequency, quality factor (Q), and bandwidth for series and parallel circuits.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        <div className="flex gap-4 mb-6">
          <button onClick={() => setType('series')} className={`flex-1 py-3 rounded-lg font-bold ${type === 'series' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Series RLC</button>
          <button onClick={() => setType('parallel')} className={`flex-1 py-3 rounded-lg font-bold ${type === 'parallel' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Parallel RLC</button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Resistance (R)</label>
            <div className="flex items-center gap-2">
              <input type="number" value={resistance} onChange={(e) => setResistance(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="10" min="0" />
              <span className="font-bold text-gray-500">Ω</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Inductance (L)</label>
            <div className="flex items-center gap-2">
              <input type="number" value={inductance} onChange={(e) => setInductance(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="10" min="0" />
              <span className="font-bold text-gray-500">mH</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Capacitance (C)</label>
            <div className="flex items-center gap-2">
              <input type="number" value={capacitance} onChange={(e) => setCapacitance(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="1" min="0" />
              <span className="font-bold text-gray-500">µF</span>
            </div>
          </div>
        </div>

        {res && (
          <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
            <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2"><Calculator className="w-5 h-5"/> Circuit Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border text-center md:col-span-3">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Resonant Frequency (f₀)</div>
                <div className="text-4xl font-bold text-indigo-700">{formatFreq(res.frequency)}</div>
              </div>
              <div className="bg-white p-4 rounded-lg border text-center">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Quality Factor (Q)</div>
                <div className="text-2xl font-bold text-indigo-700">{res.qFactor.toFixed(3)}</div>
              </div>
              <div className="bg-white p-4 rounded-lg border text-center col-span-2">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Bandwidth (Δf)</div>
                <div className="text-2xl font-bold text-indigo-700">{formatFreq(res.bandwidth)}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

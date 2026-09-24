import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Calculator } from 'lucide-react';

export default function Timer555CalculatorTool() {
  const [mode, setMode] = useState<'astable' | 'monostable'>('astable');
  const [r1, setR1] = useState('1000');
  const [r2, setR2] = useState('10000');
  const [c1, setC1] = useState('10');

  const calculateAstable = () => {
    const R1 = parseFloat(r1);
    const R2 = parseFloat(r2);
    const C = parseFloat(c1) * 1e-6; // uF to F
    
    if (R1 > 0 && R2 > 0 && C > 0) {
      const tHigh = 0.693 * (R1 + R2) * C;
      const tLow = 0.693 * R2 * C;
      const period = tHigh + tLow;
      const frequency = 1 / period;
      const dutyCycle = (tHigh / period) * 100;

      return {
        tHigh: (tHigh * 1000).toFixed(2), // ms
        tLow: (tLow * 1000).toFixed(2),
        frequency: frequency.toFixed(2),
        dutyCycle: dutyCycle.toFixed(1)
      };
    }
    return null;
  };

  const calculateMonostable = () => {
    const R1 = parseFloat(r1);
    const C = parseFloat(c1) * 1e-6;
    
    if (R1 > 0 && C > 0) {
      const tHigh = 1.1 * R1 * C;
      return {
        tHigh: (tHigh * 1000).toFixed(2)
      };
    }
    return null;
  };

  const astableRes = mode === 'astable' ? calculateAstable() : null;
  const monoRes = mode === 'monostable' ? calculateMonostable() : null;

  return (
    <ToolShell title="555 Timer Calculator" description="Calculate frequencies, duty cycles, and pulse widths for 555 timer circuits." category="engineering" seoTitle="555 Timer Calculator | Astable & Monostable" seoDescription="Free 555 timer calculator for astable and monostable circuits. Calculate frequency, duty cycle, and pulse widths instantly.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        <div className="flex gap-4 mb-6">
          <button onClick={() => setMode('astable')} className={`flex-1 py-3 rounded-lg font-bold ${mode === 'astable' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Astable Mode</button>
          <button onClick={() => setMode('monostable')} className={`flex-1 py-3 rounded-lg font-bold ${mode === 'monostable' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Monostable Mode</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">R1 (Ohms)</label>
            <input type="number" value={r1} onChange={(e) => setR1(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="e.g. 1000" />
          </div>
          {mode === 'astable' && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">R2 (Ohms)</label>
              <input type="number" value={r2} onChange={(e) => setR2(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="e.g. 10000" />
            </div>
          )}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">C1 (Microfarads - µF)</label>
            <input type="number" value={c1} onChange={(e) => setC1(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="e.g. 10" />
          </div>
        </div>

        {astableRes && (
          <div className="mt-8 bg-indigo-50 p-6 rounded-xl border border-indigo-100">
            <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2"><Calculator className="w-5 h-5"/> Astable Results</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-xs font-bold text-gray-500 uppercase">Frequency (f)</div>
                <div className="text-xl font-bold text-indigo-700">{astableRes.frequency} Hz</div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-xs font-bold text-gray-500 uppercase">Duty Cycle</div>
                <div className="text-xl font-bold text-indigo-700">{astableRes.dutyCycle} %</div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-xs font-bold text-gray-500 uppercase">Time High (t1)</div>
                <div className="text-xl font-bold text-indigo-700">{astableRes.tHigh} ms</div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-xs font-bold text-gray-500 uppercase">Time Low (t2)</div>
                <div className="text-xl font-bold text-indigo-700">{astableRes.tLow} ms</div>
              </div>
            </div>
          </div>
        )}

        {monoRes && (
          <div className="mt-8 bg-indigo-50 p-6 rounded-xl border border-indigo-100">
            <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2"><Calculator className="w-5 h-5"/> Monostable Results</h3>
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-xs font-bold text-gray-500 uppercase">Output Pulse Width (T)</div>
              <div className="text-2xl font-bold text-indigo-700">{monoRes.tHigh} ms</div>
              <div className="text-sm text-gray-500 mt-2">Formula: T = 1.1 × R1 × C1</div>
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

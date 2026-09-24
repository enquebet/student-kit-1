import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Calculator } from 'lucide-react';

export default function RlTimeConstantTool() {
  const [resistance, setResistance] = useState('');
  const [inductance, setInductance] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const r = parseFloat(resistance);
    // Convert mH to Henrys
    const l = parseFloat(inductance) * 1e-3;
    
    if (!isNaN(r) && !isNaN(l) && r > 0 && l > 0) {
      setResult(l / r);
    } else {
      setResult(null);
    }
  };

  return (
    <ToolShell title="RL Time Constant Calculator" description="Calculate the time constant (tau) of an RL circuit." category="engineering" seoTitle="RL Time Constant Calculator | Tau Formula | StudentKit" seoDescription="Calculate the time constant (τ) of a resistor-inductor (RL) circuit. Free tool for electronics engineering students.">
      <div className="max-w-2xl mx-auto space-y-8">
        
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resistance (R)</label>
              <div className="flex items-center gap-2">
                <input type="number" value={resistance} onChange={(e) => setResistance(e.target.value)} className="flex-1 p-2 border rounded-md" placeholder="Ohms (Ω)" min="0" step="any" />
                <span className="text-gray-500 w-8 font-medium">Ω</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Inductance (L)</label>
              <div className="flex items-center gap-2">
                <input type="number" value={inductance} onChange={(e) => setInductance(e.target.value)} className="flex-1 p-2 border rounded-md" placeholder="Millihenrys (mH)" min="0" step="any" />
                <span className="text-gray-500 w-8 font-medium">mH</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end items-center border-t pt-6">
            <button onClick={calculate} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 font-medium">
              <Calculator className="w-4 h-4" /> Calculate τ (Tau)
            </button>
          </div>
        </div>

        {result !== null && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-8 text-center shadow-sm">
            <h3 className="text-lg font-medium text-emerald-900 mb-2">Time Constant (τ)</h3>
            <div className="text-5xl font-bold text-emerald-600 tracking-tight flex justify-center items-baseline gap-2">
              {result < 0.001 ? (result * 1000).toPrecision(4).replace(/\.0+$/, '') : result.toPrecision(4).replace(/\.0+$/, '')} 
              <span className="text-2xl text-emerald-700">{result < 0.001 ? 'ms' : 'seconds'}</span>
            </div>
          </div>
        )}

        <div className="prose max-w-none bg-white p-8 rounded-xl border">
          <h2>RL Time Constant (τ)</h2>
          <p>The RL time constant, also called tau (τ), is a measure of the time it takes for current to reach its maximum steady-state value in a circuit containing an inductor and a resistor.</p>
          
          <div className="bg-gray-50 p-6 rounded-lg border my-6 text-center">
             <div className="text-2xl font-bold text-gray-800 font-mono">τ = L / R</div>
          </div>
          
          <p>Unlike capacitors where voltage takes time to build up, in inductors, it is the <strong>current</strong> that takes time to build up. When voltage is applied, the inductor opposes the change in current. After 5 time constants, the current is considered to have reached its steady-state maximum (determined by V/R).</p>
        </div>
      </div>
    </ToolShell>
  );
}

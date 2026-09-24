import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Calculator } from 'lucide-react';

export default function RcTimeConstantTool() {
  const [resistance, setResistance] = useState('');
  const [capacitance, setCapacitance] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const r = parseFloat(resistance);
    // Convert uF to Farads
    const c = parseFloat(capacitance) * 1e-6;
    
    if (!isNaN(r) && !isNaN(c) && r > 0 && c > 0) {
      setResult(r * c);
    } else {
      setResult(null);
    }
  };

  return (
    <ToolShell title="RC Time Constant Calculator" description="Calculate the time constant (tau) of an RC circuit." category="engineering" seoTitle="RC Time Constant Calculator | Tau Formula | StudentKit" seoDescription="Calculate the time constant (τ) of a resistor-capacitor (RC) circuit. Free tool for electronics engineering students.">
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Capacitance (C)</label>
              <div className="flex items-center gap-2">
                <input type="number" value={capacitance} onChange={(e) => setCapacitance(e.target.value)} className="flex-1 p-2 border rounded-md" placeholder="Microfarads (μF)" min="0" step="any" />
                <span className="text-gray-500 w-8 font-medium">μF</span>
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
            
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
               <div className="bg-white/60 p-3 rounded-lg border border-emerald-200">
                  <div className="text-xs text-emerald-800 font-bold uppercase">1τ (63.2%)</div>
                  <div className="font-mono mt-1 text-sm">{result < 0.001 ? (result * 1000).toPrecision(3) + 'ms' : result.toPrecision(3) + 's'}</div>
               </div>
               <div className="bg-white/60 p-3 rounded-lg border border-emerald-200">
                  <div className="text-xs text-emerald-800 font-bold uppercase">3τ (95.0%)</div>
                  <div className="font-mono mt-1 text-sm">{result < 0.001 ? (result * 3000).toPrecision(3) + 'ms' : (result * 3).toPrecision(3) + 's'}</div>
               </div>
               <div className="bg-white/60 p-3 rounded-lg border border-emerald-200">
                  <div className="text-xs text-emerald-800 font-bold uppercase">5τ (99.3%)</div>
                  <div className="font-mono mt-1 text-sm">{result < 0.001 ? (result * 5000).toPrecision(3) + 'ms' : (result * 5).toPrecision(3) + 's'}</div>
               </div>
               <div className="bg-white/60 p-3 rounded-lg border border-emerald-200">
                  <div className="text-xs text-emerald-800 font-bold uppercase">Cutoff Freq</div>
                  <div className="font-mono mt-1 text-sm">{ (1 / (2 * Math.PI * result)).toPrecision(3) } Hz</div>
               </div>
            </div>
          </div>
        )}

        <div className="prose max-w-none bg-white p-8 rounded-xl border">
          <h2>RC Time Constant (τ)</h2>
          <p>The RC time constant, also called tau (τ), is a measure of the time it takes for a capacitor to charge or discharge through a resistor.</p>
          
          <div className="bg-gray-50 p-6 rounded-lg border my-6 text-center">
             <div className="text-2xl font-bold text-gray-800 font-mono">τ = R × C</div>
          </div>
          
          <p>When a DC voltage is applied to an RC circuit:</p>
          <ul>
             <li>After <strong>1 time constant (1τ)</strong>, the capacitor charges to approximately 63.2% of the supply voltage.</li>
             <li>After <strong>5 time constants (5τ)</strong>, the capacitor is considered fully charged (99.3%).</li>
          </ul>
          <p>The same applies to discharging, where after 1τ it discharges down to 36.8% of its initial voltage, and is fully discharged after 5τ.</p>
        </div>
      </div>
    </ToolShell>
  );
}

import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Calculator } from 'lucide-react';

export default function CurrentDividerCalculatorTool() {
  const [iin, setIin] = useState('');
  const [rx, setRx] = useState('');
  const [rtotal, setRtotal] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const it = parseFloat(iin);
    const r_branch = parseFloat(rx);
    const r_t = parseFloat(rtotal);
    
    if (!isNaN(it) && !isNaN(r_branch) && !isNaN(r_t) && r_branch > 0) {
      setResult(it * (r_t / r_branch));
    } else {
      setResult(null);
    }
  };

  return (
    <ToolShell title="Current Divider Calculator" description="Calculate the current flowing through a specific branch in a parallel circuit." category="engineering" seoTitle="Current Divider Calculator | Ix Formula | StudentKit" seoDescription="Free online current divider calculator. Calculate branch current (Ix) based on total current (It), branch resistance (Rx), and total parallel resistance (Rt).">
      <div className="max-w-2xl mx-auto space-y-8">
        
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Input Current (I<sub>t</sub>)</label>
              <div className="flex items-center gap-2">
                <input type="number" value={iin} onChange={(e) => setIin(e.target.value)} className="flex-1 p-2 border rounded-md" placeholder="Amperes" step="any" />
                <span className="text-gray-500 w-8 font-medium">A</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Parallel Resistance (R<sub>t</sub>)</label>
              <div className="flex items-center gap-2">
                <input type="number" value={rtotal} onChange={(e) => setRtotal(e.target.value)} className="flex-1 p-2 border rounded-md" placeholder="Ohms" min="0" step="any" />
                <span className="text-gray-500 w-8 font-medium">Ω</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resistance of Branch of Interest (R<sub>x</sub>)</label>
              <div className="flex items-center gap-2">
                <input type="number" value={rx} onChange={(e) => setRx(e.target.value)} className="flex-1 p-2 border rounded-md" placeholder="Ohms" min="0" step="any" />
                <span className="text-gray-500 w-8 font-medium">Ω</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end items-center border-t pt-6">
            <button onClick={calculate} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 font-medium">
              <Calculator className="w-4 h-4" /> Calculate I<sub>x</sub>
            </button>
          </div>
        </div>

        {result !== null && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-8 text-center shadow-sm">
            <h3 className="text-lg font-medium text-emerald-900 mb-2">Branch Current (I<sub>x</sub>)</h3>
            <div className="text-5xl font-bold text-emerald-600 tracking-tight flex justify-center items-baseline gap-2">
              {result.toPrecision(5).replace(/\.0+$/, '')} <span className="text-3xl text-emerald-700">A</span>
            </div>
          </div>
        )}

        <div className="prose max-w-none bg-white p-8 rounded-xl border">
          <h2>Current Divider Rule</h2>
          <p>A current divider is a simple linear circuit that produces an output current (I<sub>x</sub>) that is a fraction of its input current (I<sub>t</sub>). Current division refers to the splitting of current between the branches of the divider.</p>
          
          <div className="bg-gray-50 p-6 rounded-lg border my-6 text-center">
             <div className="text-2xl font-bold text-gray-800 font-mono">I<sub>x</sub> = I<sub>t</sub> × (R<sub>t</sub> / R<sub>x</sub>)</div>
          </div>
          
          <p>In a parallel circuit, current takes the path of least resistance. Therefore, the branch with the lowest resistance will have the highest current flowing through it.</p>
          <p><strong>Note:</strong> If you only know the individual branch resistances (e.g., R1 and R2), you must first calculate the total equivalent parallel resistance (R<sub>t</sub> = (R1 × R2) / (R1 + R2)) before using this formula.</p>
        </div>
      </div>
    </ToolShell>
  );
}

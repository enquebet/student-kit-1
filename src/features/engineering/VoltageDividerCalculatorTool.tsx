import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Calculator } from 'lucide-react';

export default function VoltageDividerCalculatorTool() {
  const [vin, setVin] = useState('');
  const [r1, setR1] = useState('');
  const [r2, setR2] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const v = parseFloat(vin);
    const res1 = parseFloat(r1);
    const res2 = parseFloat(r2);
    
    if (!isNaN(v) && !isNaN(res1) && !isNaN(res2) && (res1 + res2) > 0) {
      setResult(v * (res2 / (res1 + res2)));
    } else {
      setResult(null);
    }
  };

  return (
    <ToolShell title="Voltage Divider Calculator" description="Calculate the output voltage of a two-resistor voltage divider circuit." category="engineering" seoTitle="Voltage Divider Calculator | Vout Formula | StudentKit" seoDescription="Free online voltage divider calculator. Calculate the output voltage (Vout) based on input voltage (Vin) and two resistor values (R1, R2).">
      <div className="max-w-2xl mx-auto space-y-8">
        
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Input Voltage (V<sub>in</sub>)</label>
              <div className="flex items-center gap-2">
                <input type="number" value={vin} onChange={(e) => setVin(e.target.value)} className="flex-1 p-2 border rounded-md" placeholder="Volts" step="any" />
                <span className="text-gray-500 w-8 font-medium">V</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resistor 1 (R<sub>1</sub>)</label>
              <div className="flex items-center gap-2">
                <input type="number" value={r1} onChange={(e) => setR1(e.target.value)} className="flex-1 p-2 border rounded-md" placeholder="Ohms" min="0" step="any" />
                <span className="text-gray-500 w-8 font-medium">Ω</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resistor 2 (R<sub>2</sub>) - Output measured across R2</label>
              <div className="flex items-center gap-2">
                <input type="number" value={r2} onChange={(e) => setR2(e.target.value)} className="flex-1 p-2 border rounded-md" placeholder="Ohms" min="0" step="any" />
                <span className="text-gray-500 w-8 font-medium">Ω</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end items-center border-t pt-6">
            <button onClick={calculate} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 font-medium">
              <Calculator className="w-4 h-4" /> Calculate V<sub>out</sub>
            </button>
          </div>
        </div>

        {result !== null && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-8 text-center shadow-sm">
            <h3 className="text-lg font-medium text-emerald-900 mb-2">Output Voltage (V<sub>out</sub>)</h3>
            <div className="text-5xl font-bold text-emerald-600 tracking-tight flex justify-center items-baseline gap-2">
              {result.toPrecision(5).replace(/\.0+$/, '')} <span className="text-3xl text-emerald-700">V</span>
            </div>
          </div>
        )}

        <div className="prose max-w-none bg-white p-8 rounded-xl border">
          <h2>How a Voltage Divider Works</h2>
          <p>A voltage divider is a simple linear circuit that produces an output voltage (V<sub>out</sub>) that is a fraction of its input voltage (V<sub>in</sub>). Voltage division is the result of distributing the input voltage among the components of the divider.</p>
          
          <div className="bg-gray-50 p-6 rounded-lg border my-6 text-center">
             <div className="text-2xl font-bold text-gray-800 font-mono">V<sub>out</sub> = V<sub>in</sub> × [R<sub>2</sub> / (R<sub>1</sub> + R<sub>2</sub>)]</div>
          </div>
          
          <p>This calculator assumes the output is measured across R<sub>2</sub> and that there is no load connected to the output (an ideal, unloaded voltage divider). If a load is connected in parallel with R<sub>2</sub>, the effective resistance of the lower half of the divider decreases, which will lower the actual V<sub>out</sub>.</p>
        </div>
      </div>
    </ToolShell>
  );
}

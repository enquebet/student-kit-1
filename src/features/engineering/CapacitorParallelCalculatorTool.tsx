import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Plus, Trash2, Calculator } from 'lucide-react';

export default function CapacitorParallelCalculatorTool() {
  const [capacitors, setCapacitors] = useState([{ id: '1', value: '' }, { id: '2', value: '' }]);
  const [result, setResult] = useState<number | null>(null);

  const addCapacitor = () => {
    setCapacitors([...capacitors, { id: Math.random().toString(), value: '' }]);
  };

  const removeCapacitor = (id: string) => {
    if (capacitors.length > 1) {
      setCapacitors(capacitors.filter(c => c.id !== id));
    }
  };

  const updateCapacitor = (id: string, value: string) => {
    setCapacitors(capacitors.map(c => c.id === id ? { ...c, value } : c));
  };

  const calculate = () => {
    let total = 0;
    capacitors.forEach(c => {
      const val = parseFloat(c.value);
      if (!isNaN(val)) total += val;
    });
    setResult(total);
  };

  return (
    <ToolShell title="Parallel Capacitor Calculator" description="Calculate the total equivalent capacitance of multiple capacitors connected in parallel." category="engineering" seoTitle="Parallel Capacitor Calculator | Equivalent Capacitance | StudentKit" seoDescription="Free online calculator to find the total equivalent capacitance of capacitors in parallel. Just enter the values and get instant results.">
      <div className="max-w-2xl mx-auto space-y-8">
        
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="space-y-4">
            {capacitors.map((c, index) => (
              <div key={c.id} className="flex items-center gap-4">
                <label className="font-medium text-gray-700 w-8 text-right">C{index + 1}</label>
                <div className="flex-1 flex items-center gap-2">
                  <input type="number" value={c.value} onChange={(e) => updateCapacitor(c.id, e.target.value)} className="flex-1 p-2 border rounded-md" placeholder={`Capacitor ${index + 1} value`} />
                  <span className="text-gray-500 font-medium">F/μF</span>
                </div>
                <button onClick={() => removeCapacitor(c.id)} disabled={capacitors.length <= 1} className="p-2 text-red-500 hover:bg-red-50 rounded-md disabled:opacity-50 disabled:cursor-not-allowed">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
             <p className="text-xs text-gray-500 text-center">Note: Keep all units consistent (e.g., all in μF or all in pF).</p>
          </div>

          <div className="mt-6 flex justify-between items-center border-t pt-6">
            <button onClick={addCapacitor} className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium">
              <Plus className="w-4 h-4" /> Add Capacitor
            </button>
            <button onClick={calculate} className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 font-medium">
              <Calculator className="w-4 h-4" /> Calculate Total
            </button>
          </div>
        </div>

        {result !== null && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-8 text-center shadow-sm">
            <h3 className="text-lg font-medium text-emerald-900 mb-2">Equivalent Capacitance (C<sub>eq</sub>)</h3>
            <div className="text-5xl font-bold text-emerald-600 tracking-tight flex justify-center items-baseline gap-2">
              {result.toPrecision(5).replace(/\.0+$/, '')}
            </div>
             <p className="text-emerald-700 text-sm mt-2">in the same unit as your inputs</p>
          </div>
        )}

        <div className="prose max-w-none bg-white p-8 rounded-xl border">
          <h2>Capacitors in Parallel</h2>
          <p>When capacitors are connected in parallel, the total equivalent capacitance is simply the sum of the individual capacitance values. The formula is identical to the formula for resistors in <strong>series</strong>.</p>
          <div className="bg-gray-50 p-6 rounded-lg border my-6 text-center">
             <div className="text-2xl font-bold text-gray-800 font-mono">C<sub>eq</sub> = C<sub>1</sub> + C<sub>2</sub> + ... + C<sub>n</sub></div>
          </div>
          <p><strong>Note:</strong> Connecting capacitors in parallel increases the total capacitance, but the working voltage of the combination is limited to the voltage rating of the lowest-rated capacitor in the parallel circuit.</p>
        </div>
      </div>
    </ToolShell>
  );
}

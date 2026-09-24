import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Plus, Trash2, Calculator } from 'lucide-react';

export default function ParallelResistorCalculatorTool() {
  const [resistors, setResistors] = useState([{ id: '1', value: '' }, { id: '2', value: '' }]);
  const [result, setResult] = useState<number | null>(null);

  const addResistor = () => {
    setResistors([...resistors, { id: Math.random().toString(), value: '' }]);
  };

  const removeResistor = (id: string) => {
    if (resistors.length > 1) {
      setResistors(resistors.filter(r => r.id !== id));
    }
  };

  const updateResistor = (id: string, value: string) => {
    setResistors(resistors.map(r => r.id === id ? { ...r, value } : r));
  };

  const calculate = () => {
    let inverseSum = 0;
    let hasValid = false;
    resistors.forEach(r => {
      const val = parseFloat(r.value);
      if (!isNaN(val) && val > 0) {
        inverseSum += (1 / val);
        hasValid = true;
      }
    });
    
    if (hasValid && inverseSum > 0) {
      setResult(1 / inverseSum);
    } else {
      setResult(null);
    }
  };

  return (
    <ToolShell title="Parallel Resistor Calculator" description="Calculate the total equivalent resistance of multiple resistors connected in parallel." category="engineering" seoTitle="Parallel Resistor Calculator | Equivalent Resistance | StudentKit" seoDescription="Free online calculator to find the total equivalent resistance of resistors in parallel. Just enter the values and get instant results.">
      <div className="max-w-2xl mx-auto space-y-8">
        
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="space-y-4">
            {resistors.map((r, index) => (
              <div key={r.id} className="flex items-center gap-4">
                <label className="font-medium text-gray-700 w-8 text-right">R{index + 1}</label>
                <div className="flex-1 flex items-center gap-2">
                  <input type="number" value={r.value} onChange={(e) => updateResistor(r.id, e.target.value)} className="flex-1 p-2 border rounded-md" placeholder={`Resistor ${index + 1} value (must be > 0)`} min="0.001" step="any" />
                  <span className="text-gray-500 font-medium">Ω</span>
                </div>
                <button onClick={() => removeResistor(r.id)} disabled={resistors.length <= 1} className="p-2 text-red-500 hover:bg-red-50 rounded-md disabled:opacity-50 disabled:cursor-not-allowed">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center border-t pt-6">
            <button onClick={addResistor} className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium">
              <Plus className="w-4 h-4" /> Add Resistor
            </button>
            <button onClick={calculate} className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 font-medium">
              <Calculator className="w-4 h-4" /> Calculate Total
            </button>
          </div>
        </div>

        {result !== null && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-8 text-center shadow-sm">
            <h3 className="text-lg font-medium text-emerald-900 mb-2">Equivalent Resistance (R<sub>eq</sub>)</h3>
            <div className="text-5xl font-bold text-emerald-600 tracking-tight flex justify-center items-baseline gap-2">
              {result.toPrecision(5).replace(/\.0+$/, '')} <span className="text-3xl text-emerald-700">Ω</span>
            </div>
          </div>
        )}

        <div className="prose max-w-none bg-white p-8 rounded-xl border">
          <h2>Resistors in Parallel</h2>
          <p>When resistors are connected in parallel, the voltage across each resistor is the same. The total equivalent resistance (R<sub>eq</sub>) is calculated using the sum of the reciprocals of the individual resistances.</p>
          <div className="bg-gray-50 p-6 rounded-lg border my-6 text-center">
             <div className="text-xl md:text-2xl font-bold text-gray-800 font-mono">1/R<sub>eq</sub> = 1/R<sub>1</sub> + 1/R<sub>2</sub> + ... + 1/R<sub>n</sub></div>
          </div>
          <p><strong>Note:</strong> The total equivalent resistance of a parallel circuit is always <em>less</em> than the resistance of the smallest individual resistor in the parallel network.</p>
        </div>
      </div>
    </ToolShell>
  );
}

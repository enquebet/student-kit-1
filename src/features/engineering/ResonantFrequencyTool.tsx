import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Calculator } from 'lucide-react';

export default function ResonantFrequencyTool() {
  const [inductance, setInductance] = useState('');
  const [capacitance, setCapacitance] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    // Convert mH to Henrys
    const l = parseFloat(inductance) * 1e-3;
    // Convert uF to Farads
    const c = parseFloat(capacitance) * 1e-6;
    
    if (!isNaN(l) && !isNaN(c) && l > 0 && c > 0) {
      setResult(1 / (2 * Math.PI * Math.sqrt(l * c)));
    } else {
      setResult(null);
    }
  };

  return (
    <ToolShell title="LC Resonant Frequency Calculator" description="Calculate the resonant frequency of an LC circuit." category="engineering" seoTitle="LC Resonant Frequency Calculator | StudentKit" seoDescription="Calculate the resonant frequency of an LC circuit given the inductance and capacitance.">
      <div className="max-w-2xl mx-auto space-y-8">
        
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Inductance (L)</label>
              <div className="flex items-center gap-2">
                <input type="number" value={inductance} onChange={(e) => setInductance(e.target.value)} className="flex-1 p-2 border rounded-md" placeholder="Millihenrys (mH)" min="0" step="any" />
                <span className="text-gray-500 w-8 font-medium">mH</span>
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
              <Calculator className="w-4 h-4" /> Calculate Frequency
            </button>
          </div>
        </div>

        {result !== null && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-8 text-center shadow-sm">
            <h3 className="text-lg font-medium text-emerald-900 mb-2">Resonant Frequency (f)</h3>
            <div className="text-5xl font-bold text-emerald-600 tracking-tight flex justify-center items-baseline gap-2">
              {result > 1000 ? (result / 1000).toPrecision(5).replace(/\.0+$/, '') : result.toPrecision(5).replace(/\.0+$/, '')} 
              <span className="text-2xl text-emerald-700">{result > 1000 ? 'kHz' : 'Hz'}</span>
            </div>
          </div>
        )}

        <div className="prose max-w-none bg-white p-8 rounded-xl border">
          <h2>LC Circuit Resonance</h2>
          <p>An LC circuit (also called a resonant circuit, tank circuit, or tuned circuit) is an idealized electrical circuit consisting of an inductor (L) and a capacitor (C) connected together. When connected together, they can act as an electrical resonator, storing energy oscillating at the circuit's resonant frequency.</p>
          
          <div className="bg-gray-50 p-6 rounded-lg border my-6 text-center">
             <div className="text-2xl font-bold text-gray-800 font-mono">f = 1 / (2π√(LC))</div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}

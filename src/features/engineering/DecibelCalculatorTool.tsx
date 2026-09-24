import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Calculator } from 'lucide-react';

export default function DecibelCalculatorTool() {
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('');
  const [type, setType] = useState<'power' | 'voltage'>('power');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const v1 = parseFloat(val1);
    const v2 = parseFloat(val2); // Reference value
    
    if (!isNaN(v1) && !isNaN(v2) && v1 > 0 && v2 > 0) {
      if (type === 'power') {
          // Power ratio: 10 * log10(P1/P2)
          setResult(10 * Math.log10(v1 / v2));
      } else {
          // Amplitude/Voltage ratio: 20 * log10(V1/V2)
          setResult(20 * Math.log10(v1 / v2));
      }
    } else {
      setResult(null);
    }
  };

  return (
    <ToolShell title="Decibel (dB) Calculator" description="Calculate the decibel ratio for power or voltage/amplitude." category="engineering" seoTitle="Decibel (dB) Calculator | Power & Voltage Ratio | StudentKit" seoDescription="Calculate dB for power ratios (10 log) and voltage/amplitude ratios (20 log).">
      <div className="max-w-2xl mx-auto space-y-8">
        
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex justify-center gap-2 mb-6">
            <button onClick={() => setType('power')} className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${type === 'power' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>Power Ratio (10 log)</button>
            <button onClick={() => setType('voltage')} className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${type === 'voltage' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>Voltage/Amplitude (20 log)</button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Value 1 (e.g., Output)</label>
              <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full p-2 border rounded-md" min="0" step="any" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Value 2 (Reference / Input)</label>
              <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full p-2 border rounded-md" min="0" step="any" />
            </div>
          </div>

          <div className="mt-6 flex justify-end items-center border-t pt-6">
            <button onClick={calculate} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 font-medium">
              <Calculator className="w-4 h-4" /> Calculate dB
            </button>
          </div>
        </div>

        {result !== null && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-8 text-center shadow-sm">
            <h3 className="text-lg font-medium text-emerald-900 mb-2">Decibel Ratio</h3>
            <div className="text-5xl font-bold text-emerald-600 tracking-tight flex justify-center items-baseline gap-2">
              {result > 0 ? '+' : ''}{result.toPrecision(4).replace(/\.0+$/, '')} <span className="text-3xl text-emerald-700">dB</span>
            </div>
            <p className="text-emerald-700 font-medium mt-2">
                {result > 0 ? 'Gain (Amplification)' : result < 0 ? 'Loss (Attenuation)' : 'Unity (No Change)'}
            </p>
          </div>
        )}

        <div className="prose max-w-none bg-white p-8 rounded-xl border">
          <h2>Understanding Decibels (dB)</h2>
          <p>The decibel (dB) is a logarithmic unit used to express the ratio of two values of a physical quantity, often power or intensity.</p>
          
          <h3>Power Quantities (Power, Intensity)</h3>
          <p>When expressing a ratio of power, the factor is 10:</p>
          <div className="bg-gray-50 p-4 rounded-lg border text-center font-mono font-bold">
             L<sub>dB</sub> = 10 × log<sub>10</sub>(P<sub>1</sub> / P<sub>0</sub>)
          </div>
          <p className="text-sm text-gray-600 mt-2">Rule of thumb: A factor of 2 in power is approximately +3 dB. A factor of 10 is exactly +10 dB.</p>
          
          <h3 className="mt-6">Root-Power Quantities (Voltage, Current, Pressure)</h3>
          <p>Since power is proportional to the square of voltage or current (P = V²/R), the factor becomes 20 for these quantities:</p>
          <div className="bg-gray-50 p-4 rounded-lg border text-center font-mono font-bold">
             L<sub>dB</sub> = 20 × log<sub>10</sub>(V<sub>1</sub> / V<sub>0</sub>)
          </div>
          <p className="text-sm text-gray-600 mt-2">Rule of thumb: A factor of 2 in voltage is approximately +6 dB. A factor of 10 is exactly +20 dB.</p>
        </div>
      </div>
    </ToolShell>
  );
}

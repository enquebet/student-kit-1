import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Calculator } from 'lucide-react';

export default function OpampCalculatorTool() {
  const [type, setType] = useState<'inverting' | 'non-inverting'>('non-inverting');
  const [r1, setR1] = useState(''); // Input resistor
  const [rf, setRf] = useState(''); // Feedback resistor
  const [vin, setVin] = useState('');
  const [result, setResult] = useState<{ gain: number, vout?: number } | null>(null);

  const calculate = () => {
    const res1 = parseFloat(r1);
    const resF = parseFloat(rf);
    const v = parseFloat(vin); // Optional
    
    if (!isNaN(res1) && !isNaN(resF) && res1 > 0) {
      let gain = 0;
      if (type === 'inverting') {
          gain = -(resF / res1);
      } else {
          gain = 1 + (resF / res1);
      }
      
      let vout = undefined;
      if (!isNaN(v)) {
          vout = v * gain;
      }
      
      setResult({ gain, vout });
    } else {
      setResult(null);
    }
  };

  return (
    <ToolShell title="Op-Amp Gain Calculator" description="Calculate the voltage gain and output voltage of inverting and non-inverting operational amplifiers." category="engineering" seoTitle="Op-Amp Gain Calculator | Inverting & Non-Inverting | StudentKit" seoDescription="Calculate voltage gain (Av) and output voltage (Vout) for basic operational amplifier (op-amp) circuits.">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex justify-center gap-2 mb-8">
            <button onClick={() => setType('non-inverting')} className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${type === 'non-inverting' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>Non-Inverting Amplifier</button>
            <button onClick={() => setType('inverting')} className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${type === 'inverting' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>Inverting Amplifier</button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Input Resistor (R<sub>1</sub>)</label>
                    <div className="flex items-center gap-2">
                        <input type="number" value={r1} onChange={(e) => setR1(e.target.value)} className="flex-1 p-2 border rounded-md" min="0" step="any" />
                        <span className="text-gray-500 w-8 font-medium">Ω</span>
                    </div>
                 </div>
                 
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Feedback Resistor (R<sub>f</sub>)</label>
                    <div className="flex items-center gap-2">
                        <input type="number" value={rf} onChange={(e) => setRf(e.target.value)} className="flex-1 p-2 border rounded-md" min="0" step="any" />
                        <span className="text-gray-500 w-8 font-medium">Ω</span>
                    </div>
                 </div>
              </div>
              
              <div className="space-y-4 border-t md:border-t-0 md:border-l pt-6 md:pt-0 md:pl-6">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Input Voltage (V<sub>in</sub>) <span className="text-gray-400 font-normal">Optional</span></label>
                    <div className="flex items-center gap-2">
                        <input type="number" value={vin} onChange={(e) => setVin(e.target.value)} className="flex-1 p-2 border rounded-md" step="any" />
                        <span className="text-gray-500 w-8 font-medium">V</span>
                    </div>
                 </div>
                 <div className="text-sm text-gray-500 pt-2">
                     <p>Formula for {type}:</p>
                     <p className="font-mono font-bold text-indigo-700 mt-1">
                         {type === 'inverting' ? 'A = -(Rf / R1)' : 'A = 1 + (Rf / R1)'}
                     </p>
                 </div>
              </div>
          </div>

          <div className="mt-8 flex justify-center items-center border-t pt-6">
            <button onClick={calculate} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-2 rounded-md hover:bg-indigo-700 font-medium">
              <Calculator className="w-4 h-4" /> Calculate Gain
            </button>
          </div>
        </div>

        {result !== null && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-8 shadow-sm">
            <div className={`grid gap-6 ${result.vout !== undefined ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
               <div className="text-center">
                  <h3 className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-2">Voltage Gain (A<sub>v</sub>)</h3>
                  <div className="text-5xl font-bold text-emerald-600 tracking-tight font-mono">
                     {result.gain.toPrecision(5).replace(/\.0+$/, '')} 
                  </div>
                  {result.gain < 0 && <p className="text-xs font-medium text-emerald-700 mt-2">Signal is inverted (180° phase shift)</p>}
               </div>
               
               {result.vout !== undefined && (
                   <div className="text-center md:border-l border-emerald-200">
                      <h3 className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-2">Output Voltage (V<sub>out</sub>)</h3>
                      <div className="text-5xl font-bold text-emerald-600 tracking-tight flex justify-center items-baseline gap-1 font-mono">
                         {result.vout.toPrecision(5).replace(/\.0+$/, '')} <span className="text-2xl text-emerald-700">V</span>
                      </div>
                   </div>
               )}
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

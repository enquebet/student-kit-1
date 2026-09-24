import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Calculator } from 'lucide-react';

export default function TransformerCalculatorTool() {
  const [np, setNp] = useState('');
  const [ns, setNs] = useState('');
  const [vp, setVp] = useState('');
  const [ip, setIp] = useState('');
  
  const [result, setResult] = useState<{ vs: number, is: number, ratio: number } | null>(null);

  const calculate = () => {
    const turnsP = parseFloat(np);
    const turnsS = parseFloat(ns);
    const voltP = parseFloat(vp);
    const currP = parseFloat(ip);
    
    if (!isNaN(turnsP) && !isNaN(turnsS) && turnsP > 0 && turnsS > 0) {
      const ratio = turnsP / turnsS;
      let voltS = 0;
      let currS = 0;
      
      if (!isNaN(voltP)) voltS = voltP / ratio;
      if (!isNaN(currP)) currS = currP * ratio; // Current is inversely proportional to voltage
      
      setResult({ vs: voltS, is: currS, ratio });
    } else {
      setResult(null);
    }
  };

  return (
    <ToolShell title="Transformer Calculator" description="Calculate voltage, current, and turns ratio for ideal transformers." category="engineering" seoTitle="Transformer Calculator | Turns Ratio, Voltage & Current | StudentKit" seoDescription="Calculate primary/secondary voltage, current, and turns ratio for an ideal electrical transformer.">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="grid md:grid-cols-2 gap-8">
              
              {/* Primary Side */}
              <div className="space-y-4">
                 <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider border-b pb-2">Primary Side</h3>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Turns (N<sub>p</sub>) *</label>
                    <input type="number" value={np} onChange={(e) => setNp(e.target.value)} className="w-full p-2 border rounded-md" min="1" step="any" required />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Voltage (V<sub>p</sub>)</label>
                    <div className="flex items-center gap-2">
                        <input type="number" value={vp} onChange={(e) => setVp(e.target.value)} className="flex-1 p-2 border rounded-md" step="any" />
                        <span className="text-gray-500 w-8 font-medium">V</span>
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current (I<sub>p</sub>)</label>
                    <div className="flex items-center gap-2">
                        <input type="number" value={ip} onChange={(e) => setIp(e.target.value)} className="flex-1 p-2 border rounded-md" step="any" />
                        <span className="text-gray-500 w-8 font-medium">A</span>
                    </div>
                 </div>
              </div>

              {/* Secondary Side */}
              <div className="space-y-4">
                 <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider border-b pb-2">Secondary Side</h3>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Turns (N<sub>s</sub>) *</label>
                    <input type="number" value={ns} onChange={(e) => setNs(e.target.value)} className="w-full p-2 border rounded-md" min="1" step="any" required />
                 </div>
                 <p className="text-sm text-gray-500 italic mt-6">* Turns are required to calculate ratio.</p>
              </div>

          </div>

          <div className="mt-6 flex justify-end items-center border-t pt-6">
            <button onClick={calculate} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 font-medium">
              <Calculator className="w-4 h-4" /> Calculate Secondary
            </button>
          </div>
        </div>

        {result !== null && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-8 shadow-sm">
            <h3 className="text-lg font-medium text-emerald-900 mb-6 text-center">Results (Ideal Transformer)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-white/60 p-4 rounded-lg border border-emerald-200 text-center">
                  <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">Turns Ratio (N<sub>p</sub>:N<sub>s</sub>)</div>
                  <div className="text-2xl font-bold text-emerald-700 font-mono">{result.ratio.toPrecision(4).replace(/\.0+$/, '')} : 1</div>
                  <div className="text-xs font-medium text-emerald-700 mt-1 uppercase">
                      {result.ratio > 1 ? 'Step-Down' : result.ratio < 1 ? 'Step-Up' : 'Isolation'}
                  </div>
               </div>
               
               {result.vs > 0 && (
                   <div className="bg-white/60 p-4 rounded-lg border border-emerald-200 text-center">
                      <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">Secondary Voltage (V<sub>s</sub>)</div>
                      <div className="text-2xl font-bold text-emerald-700 font-mono">{result.vs.toPrecision(5).replace(/\.0+$/, '')} V</div>
                   </div>
               )}
               
               {result.is > 0 && (
                   <div className="bg-white/60 p-4 rounded-lg border border-emerald-200 text-center">
                      <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">Secondary Current (I<sub>s</sub>)</div>
                      <div className="text-2xl font-bold text-emerald-700 font-mono">{result.is.toPrecision(5).replace(/\.0+$/, '')} A</div>
                   </div>
               )}
            </div>
          </div>
        )}

        <div className="prose max-w-none bg-white p-8 rounded-xl border">
          <h2>Transformer Principles</h2>
          <p>An ideal transformer obeys the following relationship between voltage (V), current (I), and the number of turns (N) on its primary (p) and secondary (s) coils:</p>
          
          <div className="bg-gray-50 p-6 rounded-lg border my-6 text-center">
             <div className="text-xl font-bold text-gray-800 font-mono">V<sub>p</sub> / V<sub>s</sub> = N<sub>p</sub> / N<sub>s</sub> = I<sub>s</sub> / I<sub>p</sub></div>
          </div>
          
          <ul>
             <li><strong>Step-Up Transformer:</strong> N<sub>s</sub> &gt; N<sub>p</sub>. Voltage increases, current decreases.</li>
             <li><strong>Step-Down Transformer:</strong> N<sub>p</sub> &gt; N<sub>s</sub>. Voltage decreases, current increases.</li>
             <li><strong>Isolation Transformer:</strong> N<sub>p</sub> = N<sub>s</sub>. Voltage and current stay the same, used for safety.</li>
          </ul>
          <p><em>Note: This calculator assumes an ideal transformer (100% efficiency). Real transformers have losses (copper losses, core losses) so the output power is always slightly less than the input power.</em></p>
        </div>
      </div>
    </ToolShell>
  );
}

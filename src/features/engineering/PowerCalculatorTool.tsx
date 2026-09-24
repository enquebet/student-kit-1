import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Calculator } from 'lucide-react';

export default function PowerCalculatorTool() {
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [powerFactor, setPowerFactor] = useState('1'); // 1 for DC or purely resistive AC
  const [isAc, setIsAc] = useState(false);
  const [result, setResult] = useState<{ real: number, apparent?: number, reactive?: number } | null>(null);

  const calculate = () => {
    const v = parseFloat(voltage);
    const i = parseFloat(current);
    const pf = parseFloat(powerFactor);
    
    if (!isNaN(v) && !isNaN(i)) {
      if (isAc) {
          if (isNaN(pf) || pf < 0 || pf > 1) {
              alert("Power Factor must be between 0 and 1");
              return;
          }
          const s = v * i; // Apparent power (VA)
          const p = s * pf; // Real power (W)
          // Reactive power Q = sqrt(S^2 - P^2)
          const q = Math.sqrt(Math.max(0, s*s - p*p)); // VAr
          setResult({ real: p, apparent: s, reactive: q });
      } else {
          setResult({ real: v * i });
      }
    } else {
      setResult(null);
    }
  };

  return (
    <ToolShell title="Electrical Power Calculator" description="Calculate real, apparent, and reactive electrical power for DC and AC circuits." category="engineering" seoTitle="Electrical Power Calculator | AC & DC Power | StudentKit" seoDescription="Free online electrical power calculator. Calculate Watts (W), Volt-Amperes (VA), and Volt-Amperes Reactive (VAR) for both DC and single-phase AC circuits.">
      <div className="max-w-2xl mx-auto space-y-8">
        
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex justify-center gap-2 mb-6">
            <button onClick={() => setIsAc(false)} className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${!isAc ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>DC Circuit</button>
            <button onClick={() => setIsAc(true)} className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${isAc ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>AC Circuit (Single Phase)</button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Voltage (V)</label>
              <div className="flex items-center gap-2">
                <input type="number" value={voltage} onChange={(e) => setVoltage(e.target.value)} className="flex-1 p-2 border rounded-md" placeholder="Volts" step="any" />
                <span className="text-gray-500 w-8 font-medium">V</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current (I)</label>
              <div className="flex items-center gap-2">
                <input type="number" value={current} onChange={(e) => setCurrent(e.target.value)} className="flex-1 p-2 border rounded-md" placeholder="Amperes" step="any" />
                <span className="text-gray-500 w-8 font-medium">A</span>
              </div>
            </div>
            
            {isAc && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Power Factor (pf or cos φ)</label>
                  <input type="number" value={powerFactor} onChange={(e) => setPowerFactor(e.target.value)} className="w-full p-2 border rounded-md" placeholder="0.0 to 1.0" min="0" max="1" step="0.01" />
                  <p className="text-xs text-gray-500 mt-1">Usually between 0.8 and 1.0 for typical loads.</p>
                </div>
            )}
          </div>

          <div className="mt-6 flex justify-end items-center border-t pt-6">
            <button onClick={calculate} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 font-medium">
              <Calculator className="w-4 h-4" /> Calculate Power
            </button>
          </div>
        </div>

        {result !== null && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-8 shadow-sm">
            <div className={`grid gap-6 ${isAc ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1'}`}>
               <div className="text-center">
                  <h3 className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-2">Real Power (P)</h3>
                  <div className="text-4xl font-bold text-emerald-600 tracking-tight flex justify-center items-baseline gap-1">
                     {result.real > 1000 ? (result.real / 1000).toPrecision(4).replace(/\.0+$/, '') : result.real.toPrecision(4).replace(/\.0+$/, '')} 
                     <span className="text-xl text-emerald-700">{result.real > 1000 ? 'kW' : 'W'}</span>
                  </div>
               </div>
               
               {isAc && result.apparent !== undefined && (
                   <div className="text-center md:border-l md:border-r border-emerald-200">
                      <h3 className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-2">Apparent Power (S)</h3>
                      <div className="text-4xl font-bold text-emerald-600 tracking-tight flex justify-center items-baseline gap-1">
                         {result.apparent > 1000 ? (result.apparent / 1000).toPrecision(4).replace(/\.0+$/, '') : result.apparent.toPrecision(4).replace(/\.0+$/, '')} 
                         <span className="text-xl text-emerald-700">{result.apparent > 1000 ? 'kVA' : 'VA'}</span>
                      </div>
                   </div>
               )}
               
               {isAc && result.reactive !== undefined && (
                   <div className="text-center">
                      <h3 className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-2">Reactive Power (Q)</h3>
                      <div className="text-4xl font-bold text-emerald-600 tracking-tight flex justify-center items-baseline gap-1">
                         {result.reactive > 1000 ? (result.reactive / 1000).toPrecision(4).replace(/\.0+$/, '') : result.reactive.toPrecision(4).replace(/\.0+$/, '')} 
                         <span className="text-xl text-emerald-700">{result.reactive > 1000 ? 'kVAr' : 'VAr'}</span>
                      </div>
                   </div>
               )}
            </div>
          </div>
        )}

        <div className="prose max-w-none bg-white p-8 rounded-xl border">
          <h2>Power Formulas</h2>
          
          <h3>DC Circuits</h3>
          <p>In a direct current (DC) circuit, power is simply the product of voltage and current.</p>
          <ul>
              <li><strong>Real Power (P):</strong> P = V × I (measured in Watts)</li>
          </ul>

          <h3>AC Circuits (Single-Phase)</h3>
          <p>In alternating current (AC) circuits, the voltage and current may be out of phase, leading to three different types of power:</p>
          <ul>
             <li><strong>Apparent Power (S):</strong> The combination of real and reactive power. S = V<sub>RMS</sub> × I<sub>RMS</sub> (measured in Volt-Amperes or VA)</li>
             <li><strong>Real/Active Power (P):</strong> The actual power consumed by the load. P = S × cos(φ) (measured in Watts or W)</li>
             <li><strong>Reactive Power (Q):</strong> Power that flows back and forth that does no useful work. Q = S × sin(φ) (measured in Volt-Amperes Reactive or VAR)</li>
          </ul>
          <p>The term <code>cos(φ)</code> is known as the <strong>Power Factor (pf)</strong>.</p>
        </div>
      </div>
    </ToolShell>
  );
}

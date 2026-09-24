import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Calculator } from 'lucide-react';

export default function PwmCalculatorTool() {
  const [frequency, setFrequency] = useState('');
  const [dutyCycle, setDutyCycle] = useState('');
  const [vHigh, setVHigh] = useState('5.0');
  const [vLow, setVLow] = useState('0.0');
  const [result, setResult] = useState<{ period: number, timeHigh: number, timeLow: number, vAvg: number } | null>(null);

  const calculate = () => {
    const f = parseFloat(frequency);
    const dc = parseFloat(dutyCycle);
    const vh = parseFloat(vHigh);
    const vl = parseFloat(vLow);
    
    if (!isNaN(f) && !isNaN(dc) && !isNaN(vh) && !isNaN(vl) && f > 0 && dc >= 0 && dc <= 100) {
      const period = 1 / f;
      const tHigh = period * (dc / 100);
      const tLow = period - tHigh;
      const vAvg = (vh * (dc / 100)) + (vl * (1 - (dc / 100)));
      
      setResult({ period, timeHigh: tHigh, timeLow: tLow, vAvg });
    } else {
      setResult(null);
    }
  };

  const formatTime = (t: number) => {
      if (t === 0) return '0 s';
      if (t < 0.000001) return `${(t * 1000000000).toPrecision(4).replace(/\.0+$/, '')} ns`;
      if (t < 0.001) return `${(t * 1000000).toPrecision(4).replace(/\.0+$/, '')} μs`;
      if (t < 1) return `${(t * 1000).toPrecision(4).replace(/\.0+$/, '')} ms`;
      return `${t.toPrecision(4).replace(/\.0+$/, '')} s`;
  };

  return (
    <ToolShell title="PWM Calculator" description="Calculate Pulse Width Modulation (PWM) timing, average voltage, and duty cycle parameters." category="engineering" seoTitle="PWM Calculator | Duty Cycle & Average Voltage | StudentKit" seoDescription="Calculate PWM period, time high, time low, and average voltage for electronics and microcontroller projects.">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider border-b pb-2">Timing</h3>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                <div className="flex items-center gap-2">
                    <input type="number" value={frequency} onChange={(e) => setFrequency(e.target.value)} className="flex-1 p-2 border rounded-md" placeholder="e.g. 1000" min="0" step="any" />
                    <span className="text-gray-500 w-8 font-medium">Hz</span>
                </div>
                </div>
                
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duty Cycle</label>
                <div className="flex items-center gap-2">
                    <input type="number" value={dutyCycle} onChange={(e) => setDutyCycle(e.target.value)} className="flex-1 p-2 border rounded-md" placeholder="e.g. 50" min="0" max="100" step="any" />
                    <span className="text-gray-500 w-8 font-medium">%</span>
                </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider border-b pb-2">Voltage levels</h3>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logic High Voltage</label>
                <div className="flex items-center gap-2">
                    <input type="number" value={vHigh} onChange={(e) => setVHigh(e.target.value)} className="flex-1 p-2 border rounded-md" placeholder="e.g. 5.0" step="any" />
                    <span className="text-gray-500 w-8 font-medium">V</span>
                </div>
                </div>
                
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logic Low Voltage</label>
                <div className="flex items-center gap-2">
                    <input type="number" value={vLow} onChange={(e) => setVLow(e.target.value)} className="flex-1 p-2 border rounded-md" placeholder="e.g. 0.0" step="any" />
                    <span className="text-gray-500 w-8 font-medium">V</span>
                </div>
                </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end items-center border-t pt-6">
            <button onClick={calculate} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 font-medium">
              <Calculator className="w-4 h-4" /> Calculate PWM
            </button>
          </div>
        </div>

        {result !== null && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-8 shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
               <div className="bg-white/60 p-4 rounded-lg border border-emerald-200">
                  <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">Period (T)</div>
                  <div className="text-xl font-bold text-emerald-700 font-mono">{formatTime(result.period)}</div>
               </div>
               <div className="bg-white/60 p-4 rounded-lg border border-emerald-200">
                  <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">Time High (t<sub>on</sub>)</div>
                  <div className="text-xl font-bold text-emerald-700 font-mono">{formatTime(result.timeHigh)}</div>
               </div>
               <div className="bg-white/60 p-4 rounded-lg border border-emerald-200">
                  <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">Time Low (t<sub>off</sub>)</div>
                  <div className="text-xl font-bold text-emerald-700 font-mono">{formatTime(result.timeLow)}</div>
               </div>
               <div className="bg-emerald-600 p-4 rounded-lg shadow-inner">
                  <div className="text-xs font-bold text-emerald-100 uppercase tracking-wider mb-1">Average Voltage</div>
                  <div className="text-2xl font-bold text-white font-mono">{result.vAvg.toPrecision(4).replace(/\.0+$/, '')} V</div>
               </div>
            </div>
            
            {/* Visualizer */}
            <div className="mt-8 pt-8 border-t border-emerald-200">
               <div className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-4 text-center">Waveform Preview</div>
               <div className="h-16 w-full flex items-end relative overflow-hidden">
                   {/* Generate a repeating waveform visualization */}
                   {[0,1,2].map(i => (
                       <div key={i} className="flex h-full" style={{ width: '33.333%' }}>
                           {result.timeHigh > 0 && (
                               <div className="h-full border-t-4 border-l-4 border-emerald-500" style={{ width: `${parseFloat(dutyCycle)}%` }}></div>
                           )}
                           {result.timeLow > 0 && (
                               <div className="h-0 border-b-4 border-r-4 border-emerald-500" style={{ width: `${100 - parseFloat(dutyCycle)}%` }}></div>
                           )}
                       </div>
                   ))}
               </div>
               <div className="flex justify-between text-xs text-emerald-700 mt-2 font-mono">
                   <span>0s</span>
                   <span>T</span>
                   <span>2T</span>
                   <span>3T</span>
               </div>
            </div>
          </div>
        )}

        <div className="prose max-w-none bg-white p-8 rounded-xl border">
          <h2>Pulse Width Modulation (PWM)</h2>
          <p>PWM is a technique for getting analog results with digital means. Digital control is used to create a square wave, a signal switched between on and off.</p>
          
          <h3>Formulas</h3>
          <ul>
             <li><strong>Period (T):</strong> <code>1 / Frequency</code></li>
             <li><strong>Time High (t<sub>on</sub>):</strong> <code>Period × (Duty Cycle / 100)</code></li>
             <li><strong>Time Low (t<sub>off</sub>):</strong> <code>Period - Time High</code></li>
             <li><strong>Average Voltage:</strong> <code>(V<sub>high</sub> × Duty Cycle) + (V<sub>low</sub> × (1 - Duty Cycle))</code></li>
          </ul>
        </div>
      </div>
    </ToolShell>
  );
}

import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { ArrowLeftRight } from 'lucide-react';

export default function PeriodFrequencyTool() {
  const [val, setVal] = useState('');
  const [mode, setMode] = useState<'p2f' | 'f2p'>('p2f'); 

  const calculate = () => {
    const v = parseFloat(val);
    if (!isNaN(v) && v > 0) {
      return 1 / v;
    }
    return null;
  };

  const result = calculate();

  const swap = () => {
      setMode(mode === 'p2f' ? 'f2p' : 'p2f');
      setVal(result ? result.toString() : '');
  };

  return (
    <ToolShell title="Period to Frequency Calculator" description="Convert Time Period (seconds) to Frequency (Hz)." category="engineering" seoTitle="Period to Frequency Calculator | s to Hz | StudentKit" seoDescription="Convert period to frequency (seconds to Hertz) instantly. Free online electronics calculator.">
      <div className="max-w-2xl mx-auto space-y-8">
        
        <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
          <div className="flex justify-center items-center gap-4 mb-8">
             <div className={`text-lg font-bold px-4 py-2 rounded-lg ${mode === 'p2f' ? 'bg-indigo-100 text-indigo-800' : 'text-gray-500'}`}>
                Period (s)
             </div>
             <button onClick={swap} className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-transform active:rotate-180" aria-label="Swap conversion direction">
                 <ArrowLeftRight className="w-6 h-6 text-gray-700" />
             </button>
             <div className={`text-lg font-bold px-4 py-2 rounded-lg ${mode === 'f2p' ? 'bg-indigo-100 text-indigo-800' : 'text-gray-500'}`}>
                Frequency (Hz)
             </div>
          </div>

          <div className="max-w-xs mx-auto">
             <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Enter {mode === 'p2f' ? 'Period' : 'Frequency'}
             </label>
             <div className="flex items-center gap-2">
                <input 
                    type="number" 
                    value={val} 
                    onChange={(e) => setVal(e.target.value)} 
                    className="flex-1 p-3 text-xl border rounded-md shadow-sm" 
                    placeholder={mode === 'p2f' ? "e.g. 0.016" : "e.g. 60"}
                    min="0" step="any" 
                />
                <span className="text-gray-500 font-bold w-12 text-left">
                   {mode === 'p2f' ? 's' : 'Hz'}
                </span>
             </div>
          </div>

          {result !== null && (
             <div className="mt-10 p-6 bg-emerald-50 border border-emerald-100 rounded-xl">
                 <div className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-2">
                    Result ({mode === 'p2f' ? 'Frequency' : 'Period'})
                 </div>
                 <div className="text-4xl font-bold text-emerald-600 font-mono">
                    {result.toPrecision(5).replace(/\.0+$/, '')} 
                    <span className="text-2xl ml-2">{mode === 'p2f' ? 'Hz' : 's'}</span>
                 </div>
                 
                 <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-emerald-800 font-medium">
                    {mode === 'p2f' && result > 1000 && (
                        <>
                           <span>= {(result / 1000).toPrecision(4).replace(/\.0+$/, '')} kHz</span>
                           {result > 1000000 && <span>= {(result / 1000000).toPrecision(4).replace(/\.0+$/, '')} MHz</span>}
                        </>
                    )}
                    {mode === 'f2p' && result < 1 && (
                        <>
                           <span>= {(result * 1000).toPrecision(4).replace(/\.0+$/, '')} ms</span>
                        </>
                    )}
                 </div>
             </div>
          )}
        </div>

        <div className="prose max-w-none bg-white p-8 rounded-xl border">
          <h2>Converting Period to Frequency</h2>
          <p>The period is the duration of time of one cycle in a repeating event. Frequency is the number of occurrences of a repeating event per unit of time.</p>
          
          <div className="bg-gray-50 p-6 rounded-lg border my-6 text-center">
             <div className="text-2xl font-bold text-gray-800 font-mono">f = 1 / T</div>
          </div>
          
          <p>Where:</p>
          <ul>
            <li><strong>f</strong> is the frequency in Hertz (Hz)</li>
            <li><strong>T</strong> is the period in seconds (s)</li>
          </ul>
        </div>
      </div>
    </ToolShell>
  );
}

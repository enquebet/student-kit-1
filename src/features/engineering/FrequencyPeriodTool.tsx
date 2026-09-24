import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { ArrowLeftRight } from 'lucide-react';

export default function FrequencyPeriodTool() {
  const [val, setVal] = useState('');
  const [mode, setMode] = useState<'f2p' | 'p2f'>('f2p'); // frequency to period or period to frequency

  const calculate = () => {
    const v = parseFloat(val);
    if (!isNaN(v) && v > 0) {
      return 1 / v;
    }
    return null;
  };

  const result = calculate();

  const swap = () => {
      setMode(mode === 'f2p' ? 'p2f' : 'f2p');
      setVal(result ? result.toString() : '');
  };

  return (
    <ToolShell title="Frequency & Period Calculator" description="Convert between Frequency (Hz) and Period (seconds)." category="engineering" seoTitle="Frequency to Period Calculator | Hz to Seconds | StudentKit" seoDescription="Convert frequency to period (Hz to s) and period to frequency (s to Hz) instantly with this free calculator.">
      <div className="max-w-2xl mx-auto space-y-8">
        
        <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
          <div className="flex justify-center items-center gap-4 mb-8">
             <div className={`text-lg font-bold px-4 py-2 rounded-lg ${mode === 'f2p' ? 'bg-indigo-100 text-indigo-800' : 'text-gray-500'}`}>
                Frequency (Hz)
             </div>
             <button onClick={swap} className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-transform active:rotate-180" aria-label="Swap conversion direction">
                 <ArrowLeftRight className="w-6 h-6 text-gray-700" />
             </button>
             <div className={`text-lg font-bold px-4 py-2 rounded-lg ${mode === 'p2f' ? 'bg-indigo-100 text-indigo-800' : 'text-gray-500'}`}>
                Period (s)
             </div>
          </div>

          <div className="max-w-xs mx-auto">
             <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Enter {mode === 'f2p' ? 'Frequency' : 'Period'}
             </label>
             <div className="flex items-center gap-2">
                <input 
                    type="number" 
                    value={val} 
                    onChange={(e) => setVal(e.target.value)} 
                    className="flex-1 p-3 text-xl border rounded-md shadow-sm" 
                    placeholder="e.g. 60" 
                    min="0" step="any" 
                />
                <span className="text-gray-500 font-bold w-12 text-left">
                   {mode === 'f2p' ? 'Hz' : 's'}
                </span>
             </div>
          </div>

          {result !== null && (
             <div className="mt-10 p-6 bg-emerald-50 border border-emerald-100 rounded-xl">
                 <div className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-2">
                    Result ({mode === 'f2p' ? 'Period' : 'Frequency'})
                 </div>
                 <div className="text-4xl font-bold text-emerald-600 font-mono">
                    {result.toPrecision(5).replace(/\.0+$/, '')} 
                    <span className="text-2xl ml-2">{mode === 'f2p' ? 's' : 'Hz'}</span>
                 </div>
                 
                 {/* Helpful scaling conversions */}
                 <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-emerald-800 font-medium">
                    {mode === 'f2p' && result < 1 && (
                        <>
                           <span>= {(result * 1000).toPrecision(4).replace(/\.0+$/, '')} ms</span>
                           {result < 0.001 && <span>= {(result * 1000000).toPrecision(4).replace(/\.0+$/, '')} μs</span>}
                        </>
                    )}
                    {mode === 'p2f' && result > 1000 && (
                        <>
                           <span>= {(result / 1000).toPrecision(4).replace(/\.0+$/, '')} kHz</span>
                           {result > 1000000 && <span>= {(result / 1000000).toPrecision(4).replace(/\.0+$/, '')} MHz</span>}
                        </>
                    )}
                 </div>
             </div>
          )}
        </div>

        <div className="prose max-w-none bg-white p-8 rounded-xl border">
          <h2>Frequency and Period Relationship</h2>
          <p>Frequency and period have a simple inverse relationship. They represent two different ways of looking at a repeating event (like a wave or a cycle).</p>
          
          <div className="grid md:grid-cols-2 gap-6 my-6 text-center">
             <div className="bg-gray-50 p-6 rounded-lg border">
                <div className="text-2xl font-bold text-gray-800 font-mono">T = 1 / f</div>
                <p className="mt-2 text-sm text-gray-600">Period (T) is the time taken for one complete cycle.</p>
             </div>
             <div className="bg-gray-50 p-6 rounded-lg border">
                <div className="text-2xl font-bold text-gray-800 font-mono">f = 1 / T</div>
                <p className="mt-2 text-sm text-gray-600">Frequency (f) is the number of cycles per second.</p>
             </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}

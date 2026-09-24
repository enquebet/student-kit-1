import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { ArrowLeftRight } from 'lucide-react';

export default function WavelengthFrequencyTool() {
  const [val, setVal] = useState('300');
  const [mode, setMode] = useState<'f2w' | 'w2f'>('f2w'); 

  // Speed of light in vacuum
  const c = 299792458; // m/s

  const calculate = () => {
    const v = parseFloat(val);
    if (!isNaN(v) && v > 0) {
      if (mode === 'f2w') {
        // MHz to Hz
        const freqHz = v * 1e6;
        return c / freqHz;
      } else {
        // meters to frequency in Hz, return in MHz
        const freqHz = c / v;
        return freqHz / 1e6;
      }
    }
    return null;
  };

  const result = calculate();

  const swap = () => {
      setMode(mode === 'f2w' ? 'w2f' : 'f2w');
      setVal(result ? result.toFixed(3) : '');
  };

  return (
    <ToolShell title="Wavelength & Frequency Calculator" description="Convert between electromagnetic wavelength and frequency." category="engineering" seoTitle="Wavelength to Frequency Calculator | Speed of Light" seoDescription="Convert frequency (MHz) to wavelength (meters) and vice versa. Free RF and optics calculator.">
      <div className="max-w-2xl mx-auto space-y-8">
        
        <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
          <div className="flex justify-center items-center gap-4 mb-8">
             <div className={`text-sm md:text-lg font-bold px-4 py-2 rounded-lg ${mode === 'f2w' ? 'bg-indigo-100 text-indigo-800' : 'text-gray-500'}`}>
                Frequency (MHz)
             </div>
             <button onClick={swap} className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-transform active:rotate-180" aria-label="Swap conversion direction">
                 <ArrowLeftRight className="w-6 h-6 text-gray-700" />
             </button>
             <div className={`text-sm md:text-lg font-bold px-4 py-2 rounded-lg ${mode === 'w2f' ? 'bg-indigo-100 text-indigo-800' : 'text-gray-500'}`}>
                Wavelength (m)
             </div>
          </div>

          <div className="max-w-xs mx-auto">
             <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Enter {mode === 'f2w' ? 'Frequency' : 'Wavelength'}
             </label>
             <div className="flex items-center gap-2">
                <input 
                    type="number" 
                    value={val} 
                    onChange={(e) => setVal(e.target.value)} 
                    className="flex-1 p-3 text-xl border rounded-md shadow-sm" 
                    placeholder={mode === 'f2w' ? "e.g. 300" : "e.g. 1"}
                    min="0" step="any" 
                />
                <span className="text-gray-500 font-bold w-12 text-left">
                   {mode === 'f2w' ? 'MHz' : 'm'}
                </span>
             </div>
          </div>

          {result !== null && (
             <div className="mt-10 p-6 bg-indigo-50 border border-indigo-100 rounded-xl">
                 <div className="text-sm font-bold text-indigo-800 uppercase tracking-wider mb-2">
                    Result ({mode === 'f2w' ? 'Wavelength' : 'Frequency'})
                 </div>
                 <div className="text-4xl font-bold text-indigo-700">
                    {result.toFixed(4)} 
                    <span className="text-2xl ml-2 text-indigo-500">{mode === 'f2w' ? 'm' : 'MHz'}</span>
                 </div>
                 {mode === 'f2w' && (
                     <div className="mt-4 text-sm font-medium text-indigo-800/70">
                         = {(result * 100).toFixed(2)} cm
                     </div>
                 )}
             </div>
          )}
        </div>
      </div>
    </ToolShell>
  );
}

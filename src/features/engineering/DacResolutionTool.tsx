import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Calculator } from 'lucide-react';

export default function DacResolutionTool() {
  const [bits, setBits] = useState('10');
  const [vref, setVref] = useState('5.0');
  const [result, setResult] = useState<{ steps: number, resolution: number } | null>(null);

  const calculate = () => {
    const b = parseInt(bits);
    const v = parseFloat(vref);
    
    if (!isNaN(b) && !isNaN(v) && b > 0 && b <= 32 && v > 0) {
      const steps = Math.pow(2, b);
      const res = v / steps;
      setResult({ steps, resolution: res });
    } else {
      setResult(null);
    }
  };

  return (
    <ToolShell title="DAC Resolution Calculator" description="Calculate the step size and voltage resolution of a Digital-to-Analog Converter." category="engineering" seoTitle="DAC Resolution Calculator | Step Size & LSB | StudentKit" seoDescription="Calculate DAC resolution, number of output levels, and Least Significant Bit (LSB) step voltage for digital-to-analog converters.">
      <div className="max-w-2xl mx-auto space-y-8">
        
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resolution (Bits)</label>
              <div className="flex items-center gap-2">
                <input type="number" value={bits} onChange={(e) => setBits(e.target.value)} className="flex-1 p-2 border rounded-md" placeholder="e.g. 12" min="1" max="32" step="1" />
                <span className="text-gray-500 w-8 font-medium">bits</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reference Voltage (V<sub>ref</sub>)</label>
              <div className="flex items-center gap-2">
                <input type="number" value={vref} onChange={(e) => setVref(e.target.value)} className="flex-1 p-2 border rounded-md" placeholder="e.g. 3.3" min="0" step="any" />
                <span className="text-gray-500 w-8 font-medium">V</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end items-center border-t pt-6">
            <button onClick={calculate} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 font-medium">
              <Calculator className="w-4 h-4" /> Calculate Resolution
            </button>
          </div>
        </div>

        {result !== null && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-8 shadow-sm">
            <div className="grid md:grid-cols-2 gap-8">
               <div className="text-center md:border-r border-blue-200">
                  <h3 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-2">Discrete Output Levels</h3>
                  <div className="text-4xl font-bold text-blue-600 tracking-tight flex justify-center items-baseline gap-1 font-mono">
                     {result.steps.toLocaleString()}
                  </div>
                  <p className="text-xs text-blue-700 mt-2 font-medium">(2<sup>{bits}</sup>)</p>
               </div>
               
               <div className="text-center">
                  <h3 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-2">Step Voltage (1 LSB)</h3>
                  <div className="text-4xl font-bold text-blue-600 tracking-tight flex justify-center items-baseline gap-1">
                     {result.resolution < 0.001 ? (result.resolution * 1000000).toPrecision(4).replace(/\.0+$/, '') : (result.resolution * 1000).toPrecision(4).replace(/\.0+$/, '')} 
                     <span className="text-xl text-blue-700">{result.resolution < 0.001 ? 'μV' : 'mV'}</span>
                  </div>
                  <p className="text-xs text-blue-700 mt-2 font-medium">({result.resolution.toPrecision(4)} V)</p>
               </div>
            </div>
          </div>
        )}

        <div className="prose max-w-none bg-white p-8 rounded-xl border">
          <h2>DAC Resolution Explained</h2>
          <p>A Digital-to-Analog Converter (DAC) takes a digital number and converts it into an analog voltage output. The resolution of the DAC determines how many discrete voltage steps it can produce.</p>
          
          <h3>Formulas</h3>
          <ul>
             <li><strong>Number of Levels:</strong> <code>2<sup>N</sup></code> (where N is the number of bits)</li>
             <li><strong>Step Size (Resolution / LSB):</strong> <code>V<sub>ref</sub> / 2<sup>N</sup></code></li>
          </ul>
          
          <p>The step size is the smallest voltage change the DAC can output. Mathematically, it is identical to ADC resolution.</p>
        </div>
      </div>
    </ToolShell>
  );
}

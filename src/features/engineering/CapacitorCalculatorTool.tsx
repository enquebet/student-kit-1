import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Search } from 'lucide-react';

export default function CapacitorCalculatorTool() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState<{ pF: number, nF: number, uF: number, tol?: string, error?: string } | null>(null);

  const calculate = () => {
    const c = code.trim().toUpperCase();
    if (!c) {
      setResult(null);
      return;
    }

    // Match patterns like 104, 104J, 473K
    const match = c.match(/^(\d{2})(\d)([A-Z])?$/);
    
    if (match) {
        const sig = parseInt(match[1]);
        const mult = parseInt(match[2]);
        const tolChar = match[3];
        
        let pF = sig * Math.pow(10, mult);
        let nF = pF / 1000;
        let uF = nF / 1000;
        
        let tol = undefined;
        const tolMap: Record<string, string> = {
            'B': '±0.1 pF', 'C': '±0.25 pF', 'D': '±0.5 pF', 'F': '±1%',
            'G': '±2%', 'J': '±5%', 'K': '±10%', 'M': '±20%', 'Z': '+80%, -20%'
        };
        if (tolChar && tolMap[tolChar]) {
            tol = tolMap[tolChar];
        }
        
        setResult({ pF, nF, uF, tol });
        return;
    }

    setResult({ pF: 0, nF: 0, uF: 0, error: 'Unrecognized capacitor code format. Use 3 digits, optionally followed by a letter (e.g. 104, 473K).' });
  };

  return (
    <ToolShell title="Capacitor Code Calculator" description="Read the capacitance value from a standard 3-digit ceramic or film capacitor code." category="engineering" seoTitle="Capacitor Code Calculator | 104, 473 Meaning | StudentKit" seoDescription="Decode ceramic and film capacitor codes easily. Enter the 3-digit code to get the value in picofarads, nanofarads, and microfarads.">
      <div className="max-w-2xl mx-auto space-y-8">
        
        <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
          <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Enter Capacitor Code</label>
          <div className="flex max-w-sm mx-auto shadow-sm rounded-lg overflow-hidden border focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
             <input 
                type="text" 
                value={code} 
                onChange={(e) => { setCode(e.target.value); setResult(null); }} 
                className="w-full p-4 font-mono text-2xl text-center uppercase focus:outline-none" 
                placeholder="e.g. 104, 473K" 
                maxLength={5}
                onKeyDown={(e) => e.key === 'Enter' && calculate()}
             />
             <button onClick={calculate} className="bg-indigo-50 px-6 text-indigo-600 hover:bg-indigo-100 transition-colors">
                <Search className="w-6 h-6" />
             </button>
          </div>
          
          {result && !result.error && (
             <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                     <div className="text-xl font-bold text-emerald-600 font-mono">{result.pF} pF</div>
                     <div className="text-xs text-emerald-800 uppercase font-bold mt-1 tracking-wider">Picofarads</div>
                 </div>
                 <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                     <div className="text-xl font-bold text-blue-600 font-mono">{result.nF} nF</div>
                     <div className="text-xs text-blue-800 uppercase font-bold mt-1 tracking-wider">Nanofarads</div>
                 </div>
                 <div className="p-4 bg-purple-50 border border-purple-100 rounded-xl">
                     <div className="text-xl font-bold text-purple-600 font-mono">{result.uF} μF</div>
                     <div className="text-xs text-purple-800 uppercase font-bold mt-1 tracking-wider">Microfarads</div>
                 </div>
                 {result.tol && (
                     <div className="col-span-1 md:col-span-3 p-3 bg-gray-50 border rounded-xl text-gray-700 font-medium text-sm">
                         Tolerance: {result.tol}
                     </div>
                 )}
             </div>
          )}
          {result && result.error && (
             <div className="mt-8 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
                 {result.error}
             </div>
          )}
        </div>

        <div className="prose max-w-none bg-white p-8 rounded-xl border">
          <h2>Reading Capacitor Codes</h2>
          <p>Small capacitors, such as ceramic or film capacitors, often use a 3-digit shorthand code to indicate their capacitance value in <strong>picofarads (pF)</strong>.</p>
          
          <h3>How to read the code:</h3>
          <ul>
             <li>The first two digits represent the significant figures.</li>
             <li>The third digit represents the multiplier (number of zeros to add).</li>
          </ul>
          
          <p><strong>Example: 104</strong></p>
          <ul>
             <li>Significant figures: 10</li>
             <li>Multiplier: 4 (add four zeros)</li>
             <li>Result: 100,000 pF</li>
             <li>Which equals 100 nF or 0.1 μF</li>
          </ul>

          <h3>Tolerance Letters</h3>
          <p>A letter at the end of the code indicates the tolerance of the capacitor. Common letters include:</p>
          <ul>
             <li><strong>J</strong>: ±5%</li>
             <li><strong>K</strong>: ±10%</li>
             <li><strong>M</strong>: ±20%</li>
          </ul>
        </div>
      </div>
    </ToolShell>
  );
}

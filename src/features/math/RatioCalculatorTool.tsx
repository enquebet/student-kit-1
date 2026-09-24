import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function RatioCalculatorTool() {
  const [a, setA] = useState('1');
  const [b, setB] = useState('2');
  const [c, setC] = useState('4');
  const [d, setD] = useState('');

  const handleSolve = () => {
    const valA = parseFloat(a);
    const valB = parseFloat(b);
    const valC = parseFloat(c);
    const valD = parseFloat(d);

    if (d === '' && !isNaN(valA) && !isNaN(valB) && !isNaN(valC)) {
       setD(((valB * valC) / valA).toString());
    } else if (c === '' && !isNaN(valA) && !isNaN(valB) && !isNaN(valD)) {
       setC(((valA * valD) / valB).toString());
    } else if (b === '' && !isNaN(valA) && !isNaN(valC) && !isNaN(valD)) {
       setB(((valA * valD) / valC).toString());
    } else if (a === '' && !isNaN(valB) && !isNaN(valC) && !isNaN(valD)) {
       setA(((valB * valC) / valD).toString());
    }
  };

  const clear = () => {
     setA(''); setB(''); setC(''); setD('');
  };

  return (
    <ToolShell title="Ratio Calculator" description="Solve ratios and proportions (A : B = C : D)." category="math" seoTitle="Ratio Calculator | Solve Proportions" seoDescription="Free online ratio calculator. Solve proportions by leaving one value empty.">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-sm border text-center">
        
        <p className="text-gray-500 mb-8 font-medium text-sm">Enter three values and leave one empty to solve.</p>

        <div className="flex items-center justify-center gap-4 mb-8">
           <input type="number" value={a} onChange={(e) => setA(e.target.value)} className="w-24 text-center text-xl font-bold p-4 border-2 rounded-xl focus:border-blue-500 focus:ring-2 outline-none" placeholder="A" />
           <span className="text-2xl font-black text-gray-400">:</span>
           <input type="number" value={b} onChange={(e) => setB(e.target.value)} className="w-24 text-center text-xl font-bold p-4 border-2 rounded-xl focus:border-blue-500 focus:ring-2 outline-none" placeholder="B" />
           
           <span className="text-3xl font-black text-gray-800 mx-2">=</span>
           
           <input type="number" value={c} onChange={(e) => setC(e.target.value)} className="w-24 text-center text-xl font-bold p-4 border-2 rounded-xl focus:border-blue-500 focus:ring-2 outline-none" placeholder="C" />
           <span className="text-2xl font-black text-gray-400">:</span>
           <input type="number" value={d} onChange={(e) => setD(e.target.value)} className="w-24 text-center text-xl font-bold p-4 border-2 rounded-xl focus:border-blue-500 focus:ring-2 outline-none" placeholder="D" />
        </div>

        <div className="flex gap-4">
           <button onClick={clear} className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl transition-colors">Clear</button>
           <button onClick={handleSolve} className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">Solve</button>
        </div>

      </div>
    </ToolShell>
  );
}

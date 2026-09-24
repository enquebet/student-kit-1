import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function PythagoreanTheoremTool() {
  const [mode, setMode] = useState<'hyp' | 'legA' | 'legB'>('hyp');
  
  const [legA, setLegA] = useState('3');
  const [legB, setLegB] = useState('4');
  const [hypC, setHypC] = useState('5');

  const calculate = () => {
    let a = parseFloat(legA);
    let b = parseFloat(legB);
    let c = parseFloat(hypC);

    if (mode === 'hyp' && !isNaN(a) && !isNaN(b)) {
       return { label: 'Hypotenuse (c)', val: Math.sqrt(a*a + b*b).toFixed(3) };
    }
    if (mode === 'legA' && !isNaN(b) && !isNaN(c) && c > b) {
       return { label: 'Leg (a)', val: Math.sqrt(c*c - b*b).toFixed(3) };
    }
    if (mode === 'legB' && !isNaN(a) && !isNaN(c) && c > a) {
       return { label: 'Leg (b)', val: Math.sqrt(c*c - a*a).toFixed(3) };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Pythagorean Theorem Calculator" description="Solve for the hypotenuse or a missing leg of a right triangle using a² + b² = c²." category="math" seoTitle="Pythagorean Theorem Calculator | a² + b² = c²" seoDescription="Free Pythagorean theorem calculator. Solve for the hypotenuse or a missing side leg of any right-angled triangle.">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="flex flex-wrap bg-gray-100 p-1 rounded-lg mb-8 gap-1">
            <button onClick={() => setMode('hyp')} className={`flex-1 py-2 px-2 rounded-md font-bold text-sm ${mode === 'hyp' ? 'bg-white shadow text-violet-700' : 'text-gray-600'}`}>Find Hypotenuse (c)</button>
            <button onClick={() => setMode('legA')} className={`flex-1 py-2 px-2 rounded-md font-bold text-sm ${mode === 'legA' ? 'bg-white shadow text-violet-700' : 'text-gray-600'}`}>Find Leg (a)</button>
            <button onClick={() => setMode('legB')} className={`flex-1 py-2 px-2 rounded-md font-bold text-sm ${mode === 'legB' ? 'bg-white shadow text-violet-700' : 'text-gray-600'}`}>Find Leg (b)</button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {mode !== 'legA' && (
             <div>
               <label className="block text-sm font-bold text-gray-700 mb-1">Leg (a)</label>
               <input type="number" value={legA} onChange={(e) => setLegA(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
             </div>
          )}
          {mode !== 'legB' && (
             <div>
               <label className="block text-sm font-bold text-gray-700 mb-1">Leg (b)</label>
               <input type="number" value={legB} onChange={(e) => setLegB(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
             </div>
          )}
          {mode !== 'hyp' && (
             <div>
               <label className="block text-sm font-bold text-gray-700 mb-1">Hypotenuse (c)</label>
               <input type="number" value={hypC} onChange={(e) => setHypC(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
             </div>
          )}
        </div>

        {res ? (
          <div className="bg-violet-50 p-8 rounded-xl border border-violet-100 text-center">
            <h3 className="text-sm font-bold text-violet-800 uppercase tracking-wider mb-2">Calculated {res.label}</h3>
            <div className="text-5xl font-black text-violet-700">
                {res.val}
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 p-8 rounded-xl border text-center text-sm font-bold text-gray-500">
            Invalid inputs. Ensure hypotenuse (c) is greater than the leg.
          </div>
        )}
      </div>
    </ToolShell>
  );
}

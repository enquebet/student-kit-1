import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function QuadraticEquationTool() {
  const [a, setA] = useState('1');
  const [b, setB] = useState('-3');
  const [c, setC] = useState('2');

  const calculate = () => {
    const valA = parseFloat(a);
    const valB = parseFloat(b);
    const valC = parseFloat(c);

    if (isNaN(valA) || isNaN(valB) || isNaN(valC)) return null;
    if (valA === 0) return { error: "Coefficient 'a' cannot be 0." };

    const discriminant = valB * valB - 4 * valA * valC;
    
    let root1, root2;
    if (discriminant > 0) {
      root1 = (-valB + Math.sqrt(discriminant)) / (2 * valA);
      root2 = (-valB - Math.sqrt(discriminant)) / (2 * valA);
      return { type: 'real', root1, root2, discriminant };
    } else if (discriminant === 0) {
      root1 = -valB / (2 * valA);
      return { type: 'equal', root1, discriminant };
    } else {
      const real = -valB / (2 * valA);
      const imaginary = Math.sqrt(-discriminant) / (2 * valA);
      return { type: 'complex', real, imaginary, discriminant };
    }
  };

  const res = calculate();

  return (
    <ToolShell title="Quadratic Equation Solver" description="Solve quadratic equations in the form ax² + bx + c = 0." category="math" seoTitle="Quadratic Equation Solver | ax² + bx + c = 0" seoDescription="Solve quadratic equations instantly. Enter coefficients a, b, and c to find the real or complex roots.">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="text-center mb-8">
           <div className="text-3xl font-black font-serif italic text-gray-800">
             ax² + bx + c = 0
           </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
           <div className="flex items-center gap-2">
              <input type="number" value={a} onChange={(e) => setA(e.target.value)} className="w-20 text-center text-xl font-bold p-3 border rounded-xl focus:ring-2 outline-none" />
              <span className="text-xl font-bold italic text-gray-600">x²</span>
           </div>
           <span className="text-2xl font-bold text-gray-400">+</span>
           <div className="flex items-center gap-2">
              <input type="number" value={b} onChange={(e) => setB(e.target.value)} className="w-20 text-center text-xl font-bold p-3 border rounded-xl focus:ring-2 outline-none" />
              <span className="text-xl font-bold italic text-gray-600">x</span>
           </div>
           <span className="text-2xl font-bold text-gray-400">+</span>
           <input type="number" value={c} onChange={(e) => setC(e.target.value)} className="w-20 text-center text-xl font-bold p-3 border rounded-xl focus:ring-2 outline-none" />
           <span className="text-2xl font-bold text-gray-400">=</span>
           <span className="text-2xl font-bold text-gray-600">0</span>
        </div>

        {res && !res.error && (
          <div className="bg-sky-50 p-6 rounded-xl border border-sky-100">
             <div className="text-sm font-bold text-sky-800 uppercase tracking-wider mb-4 text-center">
                Discriminant (Δ) = {parseFloat(res.discriminant.toFixed(4))}
             </div>
             
             {res.type === 'real' && (
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-white p-4 rounded-xl border text-center shadow-sm">
                      <div className="text-gray-500 font-bold mb-1">Root 1 (x₁)</div>
                      <div className="text-2xl font-black text-sky-700">{parseFloat(res.root1.toFixed(6))}</div>
                   </div>
                   <div className="bg-white p-4 rounded-xl border text-center shadow-sm">
                      <div className="text-gray-500 font-bold mb-1">Root 2 (x₂)</div>
                      <div className="text-2xl font-black text-sky-700">{parseFloat(res.root2.toFixed(6))}</div>
                   </div>
                </div>
             )}

             {res.type === 'equal' && (
                <div className="bg-white p-4 rounded-xl border text-center shadow-sm">
                   <div className="text-gray-500 font-bold mb-1">Repeated Root (x)</div>
                   <div className="text-3xl font-black text-sky-700">{parseFloat(res.root1.toFixed(6))}</div>
                </div>
             )}

             {res.type === 'complex' && (
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-white p-4 rounded-xl border text-center shadow-sm">
                      <div className="text-gray-500 font-bold mb-1">Root 1 (x₁)</div>
                      <div className="text-xl font-black text-sky-700">{parseFloat(res.real.toFixed(4))} + {parseFloat(res.imaginary.toFixed(4))}i</div>
                   </div>
                   <div className="bg-white p-4 rounded-xl border text-center shadow-sm">
                      <div className="text-gray-500 font-bold mb-1">Root 2 (x₂)</div>
                      <div className="text-xl font-black text-sky-700">{parseFloat(res.real.toFixed(4))} - {parseFloat(res.imaginary.toFixed(4))}i</div>
                   </div>
                </div>
             )}
          </div>
        )}

        {res?.error && (
           <div className="bg-red-50 text-red-600 p-4 rounded-xl font-bold text-center border border-red-200">
             {res.error}
           </div>
        )}
      </div>
    </ToolShell>
  );
}

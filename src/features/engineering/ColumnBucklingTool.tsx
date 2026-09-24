import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function ColumnBucklingTool() {
  const [modulus, setModulus] = useState('200'); // GPa (Steel)
  const [inertia, setInertia] = useState('1000'); // cm4
  const [length, setLength] = useState('3'); // meters
  const [kFactor, setKFactor] = useState('1.0'); // Pinned-Pinned

  const calculate = () => {
    const E = parseFloat(modulus) * 1e9; // GPa to Pa (N/m2)
    const I = parseFloat(inertia) * 1e-8; // cm4 to m4
    const L = parseFloat(length);
    const K = parseFloat(kFactor);

    if (E > 0 && I > 0 && L > 0 && K > 0) {
      // Pcr = (pi^2 * E * I) / (K * L)^2
      const effectiveLength = K * L;
      const pcrNewtons = (Math.pow(Math.PI, 2) * E * I) / Math.pow(effectiveLength, 2);
      
      const pcrKn = pcrNewtons / 1000;

      return {
        kn: pcrKn.toLocaleString(undefined, { maximumFractionDigits: 1 }),
        newtons: pcrNewtons.toExponential(3)
      };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Column Buckling Calculator" description="Calculate critical buckling load (Pcr) for an ideal column using Euler's formula." category="engineering" seoTitle="Column Buckling Calculator | Euler's Formula" seoDescription="Calculate the critical buckling load of a structural column based on length, effective length factor (K), Young's modulus, and Moment of Inertia.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Young's Modulus (E) in GPa</label>
            <input type="number" value={modulus} onChange={(e) => setModulus(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Area Moment of Inertia (I) in cm⁴</label>
            <input type="number" value={inertia} onChange={(e) => setInertia(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Column Length (L) in meters</label>
            <input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Effective Length Factor (K)</label>
            <select value={kFactor} onChange={(e) => setKFactor(e.target.value)} className="w-full p-3 border rounded-lg bg-white">
              <option value="1.0">1.0 (Pinned-Pinned)</option>
              <option value="0.5">0.5 (Fixed-Fixed)</option>
              <option value="0.7">0.7 (Pinned-Fixed)</option>
              <option value="2.0">2.0 (Fixed-Free)</option>
            </select>
          </div>
        </div>

        {res && (
          <div className="bg-rose-50 p-8 rounded-xl border border-rose-100 text-center">
            <h3 className="text-sm font-bold text-rose-800 uppercase tracking-wider mb-2">Critical Buckling Load (P_cr)</h3>
            <div className="text-5xl font-black text-rose-700 flex items-baseline justify-center gap-2 mb-2">
                {res.kn} <span className="text-2xl text-rose-500">kN</span>
            </div>
            <div className="text-sm font-bold text-rose-600/70">
                or {res.newtons} N
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

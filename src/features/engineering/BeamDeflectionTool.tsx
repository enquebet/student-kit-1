import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function BeamDeflectionTool() {
  const [force, setForce] = useState('1000'); // N
  const [length, setLength] = useState('2'); // m
  const [modulus, setModulus] = useState('200'); // GPa (Steel)
  const [inertia, setInertia] = useState('500'); // cm4

  const calculate = () => {
    const F = parseFloat(force);
    const L = parseFloat(length);
    const E = parseFloat(modulus) * 1e9; // GPa to Pa (N/m2)
    const I = parseFloat(inertia) * 1e-8; // cm4 to m4

    if (F > 0 && L > 0 && E > 0 && I > 0) {
      // delta = (F * L^3) / (3 * E * I)
      const deflectionMeters = (F * Math.pow(L, 3)) / (3 * E * I);
      const deflectionMm = deflectionMeters * 1000;

      return { val: deflectionMm.toFixed(3) };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Cantilever Beam Deflection Calculator" description="Calculate maximum deflection for a cantilever beam with an end load." category="engineering" seoTitle="Cantilever Beam Deflection Calculator | Structural Engineering" seoDescription="Free structural calculator for cantilever beam deflection. Calculate max deflection for a point load applied at the free end.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Point Load at Free End (F) in Newtons</label>
            <input type="number" value={force} onChange={(e) => setForce(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Beam Length (L) in meters</label>
            <input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Young's Modulus (E) in GPa</label>
            <input type="number" value={modulus} onChange={(e) => setModulus(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
            <div className="text-xs text-gray-500 mt-1">Steel ≈ 200 GPa, Aluminum ≈ 69 GPa</div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Area Moment of Inertia (I) in cm⁴</label>
            <input type="number" value={inertia} onChange={(e) => setInertia(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
          </div>
        </div>

        {res && (
          <div className="bg-indigo-50 p-8 rounded-xl border border-indigo-100 text-center">
            <h3 className="text-sm font-bold text-indigo-800 uppercase tracking-wider mb-2">Maximum Deflection (δ_max)</h3>
            <div className="text-5xl font-black text-indigo-700 flex items-baseline justify-center gap-2">
                {res.val} <span className="text-2xl text-indigo-500">mm</span>
            </div>
            <p className="text-xs text-indigo-700 mt-4">Occurs at the free end of the beam.</p>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

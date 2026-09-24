import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Calculator } from 'lucide-react';

export default function CoaxialImpedanceTool() {
  const [dOuter, setDOuter] = useState('10');
  const [dInner, setDInner] = useState('3');
  const [er, setEr] = useState('2.3'); // Polyethylene default

  const calculate = () => {
    const D = parseFloat(dOuter);
    const d = parseFloat(dInner);
    const dielectric = parseFloat(er);

    if (D > 0 && d > 0 && D > d && dielectric > 0) {
      // Z0 = (138 / sqrt(er)) * log10(D / d)
      const z0 = (138 / Math.sqrt(dielectric)) * Math.log10(D / d);
      
      // Capacitance approx: C = 24.13 * er / log10(D/d)  (pF/m) -> actually it's 55.6 * er / ln(D/d)
      // Let's use standard: C = 55.686 * er / ln(D/d) in pF/m
      const capacitance = (55.686 * dielectric) / Math.log(D / d);

      // Inductance: L = 200 * ln(D/d) in nH/m
      const inductance = 200 * Math.log(D / d);
      
      // Cutoff frequency approx: fc = 11.8 / (sqrt(er) * pi * ((D+d)/2))
      // Wait, standard fc = 7.5 / (sqrt(er) * (D + d)) GHz if D and d are in cm. Let's assume mm.
      // fc = 75 / (sqrt(er) * (D/10 + d/10)) in GHz -> fc = 750 / (sqrt(er)*(D+d)) GHz
      const fc = 750 / (Math.sqrt(dielectric) * (D + d));

      return {
        impedance: z0.toFixed(2),
        capacitance: capacitance.toFixed(2),
        inductance: inductance.toFixed(2),
        cutoff: fc.toFixed(2)
      };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Coaxial Cable Impedance Calculator" description="Calculate the characteristic impedance of a coaxial cable." category="engineering" seoTitle="Coaxial Cable Impedance Calculator | Z0 Formula" seoDescription="Calculate coaxial cable characteristic impedance, capacitance, inductance, and cutoff frequency.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Inner Dia. of Shield (D)</label>
            <input type="number" value={dOuter} onChange={(e) => setDOuter(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="mm" min="0" />
            <div className="text-xs text-gray-500 mt-1">Units don't matter as long as D and d match.</div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Outer Dia. of Core (d)</label>
            <input type="number" value={dInner} onChange={(e) => setDInner(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="mm" min="0" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Dielectric Constant (εr)</label>
            <select value={er} onChange={(e) => setEr(e.target.value)} className="w-full p-3 border rounded-lg bg-white">
              <option value="1.0">Air (1.0)</option>
              <option value="2.1">PTFE / Teflon (2.1)</option>
              <option value="2.3">Polyethylene / PE (2.3)</option>
              <option value="2.56">Polystyrene (2.56)</option>
              <option value="4.5">FR-4 (4.5)</option>
            </select>
          </div>
        </div>

        {res && (
          <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
            <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2"><Calculator className="w-5 h-5"/> Coax Parameters</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border col-span-2">
                <div className="text-xs font-bold text-gray-500 uppercase">Characteristic Impedance (Z₀)</div>
                <div className="text-3xl font-bold text-indigo-700">{res.impedance} Ω</div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-xs font-bold text-gray-500 uppercase">Capacitance</div>
                <div className="text-xl font-bold text-indigo-700">{res.capacitance} pF/m</div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-xs font-bold text-gray-500 uppercase">Inductance</div>
                <div className="text-xl font-bold text-indigo-700">{res.inductance} nH/m</div>
              </div>
              <div className="bg-white p-4 rounded-lg border col-span-2">
                <div className="text-xs font-bold text-gray-500 uppercase">Approx Cut-off Frequency (assuming dimensions in mm)</div>
                <div className="text-xl font-bold text-indigo-700">{res.cutoff} GHz</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

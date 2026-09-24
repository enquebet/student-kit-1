import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function KineticEnergyTool() {
  const [mass, setMass] = useState('1000'); // kg
  const [velocity, setVelocity] = useState('20'); // m/s

  const calculate = () => {
    const m = parseFloat(mass);
    const v = parseFloat(velocity);

    if (m >= 0 && v >= 0) {
      // KE = 0.5 * m * v^2
      const keJoules = 0.5 * m * Math.pow(v, 2);
      const keKj = keJoules / 1000;

      return {
        joules: keJoules.toLocaleString(undefined, { maximumFractionDigits: 2 }),
        kj: keKj.toLocaleString(undefined, { maximumFractionDigits: 4 })
      };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Kinetic Energy Calculator" description="Calculate the kinetic energy of a moving object using its mass and velocity." category="engineering" seoTitle="Kinetic Energy Calculator | KE = 1/2 mv²" seoDescription="Free physics calculator to find the kinetic energy of an object in Joules (J) and Kilojoules (kJ).">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Mass (m) in kg</label>
            <input type="number" value={mass} onChange={(e) => setMass(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Velocity (v) in m/s</label>
            <input type="number" value={velocity} onChange={(e) => setVelocity(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
          </div>
        </div>

        {res && (
          <div className="bg-indigo-50 p-8 rounded-xl border border-indigo-100 text-center">
            <h3 className="text-sm font-bold text-indigo-800 uppercase tracking-wider mb-2">Kinetic Energy (KE)</h3>
            <div className="text-5xl font-black text-indigo-700 flex items-baseline justify-center gap-2 mb-2">
                {res.joules} <span className="text-2xl text-indigo-500">J</span>
            </div>
            <div className="text-lg font-bold text-indigo-600/70">
                or {res.kj} kJ
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

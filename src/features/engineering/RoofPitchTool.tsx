import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function RoofPitchTool() {
  const [run, setRun] = useState('12'); // horizontal distance
  const [rise, setRise] = useState('6'); // vertical height

  const calculate = () => {
    const runVal = parseFloat(run);
    const riseVal = parseFloat(rise);

    if (runVal > 0 && riseVal >= 0) {
      // Rafter length (hypotenuse)
      const rafter = Math.sqrt(Math.pow(runVal, 2) + Math.pow(riseVal, 2));
      
      // Pitch is standard X/12 format. If run is not 12, normalize it.
      const pitchValue = (riseVal / runVal) * 12;

      // Angle in degrees
      const angleRad = Math.atan(riseVal / runVal);
      const angleDeg = angleRad * (180 / Math.PI);

      return {
        rafter: rafter.toFixed(3),
        pitch: pitchValue.toFixed(1),
        angle: angleDeg.toFixed(2)
      };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Roof Pitch Calculator" description="Calculate roof pitch, rafter length, and slope angle." category="engineering" seoTitle="Roof Pitch & Rafter Length Calculator" seoDescription="Free carpentry and civil engineering calculator to find roof pitch (X/12 format), exact rafter length, and slope angle in degrees.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Run (Horizontal Distance)</label>
            <input type="number" value={run} onChange={(e) => setRun(e.target.value)} className="w-full p-3 border rounded-lg bg-gray-50" min="0.001" step="any" placeholder="e.g. 12" />
            <div className="text-xs text-gray-500 mt-1">Measured from wall to center ridge</div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Rise (Vertical Height)</label>
            <input type="number" value={rise} onChange={(e) => setRise(e.target.value)} className="w-full p-3 border rounded-lg bg-gray-50" min="0" step="any" placeholder="e.g. 6" />
            <div className="text-xs text-gray-500 mt-1">Vertical height from top plate to ridge</div>
          </div>
        </div>

        {res && (
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-lg border text-center shadow-sm">
                   <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Roof Pitch</div>
                   <div className="text-4xl font-bold text-slate-800">
                      {res.pitch}<span className="text-2xl text-slate-400">/12</span>
                   </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border text-center shadow-sm">
                   <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Slope Angle</div>
                   <div className="text-4xl font-bold text-slate-800">
                      {res.angle}°
                   </div>
                </div>

                <div className="bg-white p-6 rounded-lg border text-center shadow-sm border-indigo-200">
                   <div className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-2">Rafter Length</div>
                   <div className="text-4xl font-bold text-indigo-700">
                      {res.rafter}
                   </div>
                   <div className="text-[10px] text-gray-400 mt-2 leading-tight">Same unit as inputs. Excludes overhangs.</div>
                </div>
             </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

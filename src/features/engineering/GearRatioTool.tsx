import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Settings } from 'lucide-react';

export default function GearRatioTool() {
  const [drivingTeeth, setDrivingTeeth] = useState('20');
  const [drivenTeeth, setDrivenTeeth] = useState('40');
  const [drivingRpm, setDrivingRpm] = useState('1000');

  const calculate = () => {
    const t1 = parseFloat(drivingTeeth);
    const t2 = parseFloat(drivenTeeth);
    const rpm1 = parseFloat(drivingRpm);

    if (t1 > 0 && t2 > 0) {
      const ratio = t2 / t1;
      const rpm2 = rpm1 / ratio;

      return {
        ratio: ratio.toFixed(3),
        rpmOut: isNaN(rpm2) ? 0 : rpm2.toFixed(2),
        speedState: ratio > 1 ? 'Reduction (Torque Increase)' : ratio < 1 ? 'Overdrive (Speed Increase)' : '1:1 (Direct Drive)'
      };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Gear Ratio & RPM Calculator" description="Calculate mechanical gear ratios and output speeds for simple gear trains." category="engineering" seoTitle="Gear Ratio Calculator | RPM & Torque Reduction" seoDescription="Calculate gear ratios, driven gear RPM, and torque multipliers for mechanical gear trains. Free mechanical engineering calculator.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 border-b pb-2">Driving Gear (Input)</h3>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Number of Teeth</label>
              <input type="number" value={drivingTeeth} onChange={(e) => setDrivingTeeth(e.target.value)} className="w-full p-3 border rounded-lg bg-gray-50" min="1" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Input Speed (RPM)</label>
              <input type="number" value={drivingRpm} onChange={(e) => setDrivingRpm(e.target.value)} className="w-full p-3 border rounded-lg bg-gray-50" min="0" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 border-b pb-2">Driven Gear (Output)</h3>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Number of Teeth</label>
              <input type="number" value={drivenTeeth} onChange={(e) => setDrivenTeeth(e.target.value)} className="w-full p-3 border rounded-lg bg-gray-50" min="1" />
            </div>
          </div>
        </div>

        {res && (
          <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
            <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2"><Settings className="w-5 h-5"/> Output Characteristics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border text-center">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Gear Ratio</div>
                <div className="text-4xl font-bold text-indigo-700">{res.ratio}:1</div>
                <div className="text-sm font-medium text-indigo-600/70 mt-2">{res.speedState}</div>
              </div>
              <div className="bg-white p-4 rounded-lg border text-center">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Output Speed (RPM)</div>
                <div className="text-4xl font-bold text-indigo-700">{res.rpmOut}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

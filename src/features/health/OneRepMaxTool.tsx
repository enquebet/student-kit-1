import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function OneRepMaxTool() {
  const [weight, setWeight] = useState('100');
  const [reps, setReps] = useState('5');
  const [formula, setFormula] = useState<'epley' | 'brzycki'>('epley');

  const calculate = () => {
    const w = parseFloat(weight);
    const r = parseFloat(reps);

    if (w > 0 && r > 0) {
      let oneRm = 0;
      
      if (r === 1) {
        oneRm = w;
      } else if (formula === 'epley') {
        // Epley: W * (1 + r / 30)
        oneRm = w * (1 + r / 30);
      } else {
        // Brzycki: W * (36 / (37 - r))
        oneRm = w * (36 / (37 - r));
      }

      return {
        max: Math.round(oneRm),
        p95: Math.round(oneRm * 0.95),
        p90: Math.round(oneRm * 0.90),
        p85: Math.round(oneRm * 0.85),
        p80: Math.round(oneRm * 0.80),
        p75: Math.round(oneRm * 0.75),
        p70: Math.round(oneRm * 0.70),
      };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="One Rep Max Calculator" description="Calculate your 1-rep maximum for lifting using standard formulas." category="health" seoTitle="One Rep Max Calculator | 1RM Weightlifting" seoDescription="Calculate your one rep max (1RM) based on weight lifted and repetitions performed. Includes Epley and Brzycki formulas.">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Weight Lifted</label>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-rose-500 outline-none" min="0" step="any" placeholder="kg or lbs" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Repetitions Performed</label>
            <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-rose-500 outline-none" min="1" max="30" step="1" />
          </div>
        </div>
        
        <div className="mb-8">
            <label className="block text-sm font-bold text-gray-700 mb-2">Formula</label>
            <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="formula" value="epley" checked={formula === 'epley'} onChange={() => setFormula('epley')} className="w-4 h-4 text-rose-600 focus:ring-rose-500" />
                    <span className="text-sm font-medium">Epley (General)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="formula" value="brzycki" checked={formula === 'brzycki'} onChange={() => setFormula('brzycki')} className="w-4 h-4 text-rose-600 focus:ring-rose-500" />
                    <span className="text-sm font-medium">Brzycki (Max 10 reps)</span>
                </label>
            </div>
        </div>

        {res && (
          <div className="space-y-6">
             <div className="bg-rose-50 p-6 rounded-xl border border-rose-100 text-center">
                <h3 className="text-sm font-bold text-rose-800 uppercase tracking-wider mb-2">Estimated 1 Rep Max</h3>
                <div className="text-6xl font-black text-rose-700">
                    {res.max}
                </div>
             </div>
             
             <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
                <div className="bg-gray-50 px-4 py-3 border-b text-sm font-bold text-gray-700 uppercase tracking-wider text-center">
                    Percentages of 1RM
                </div>
                <div className="divide-y text-center">
                    <div className="grid grid-cols-2 p-3 hover:bg-gray-50 transition-colors">
                        <div className="font-bold text-gray-500">95% (2 Reps)</div>
                        <div className="font-bold text-gray-900">{res.p95}</div>
                    </div>
                    <div className="grid grid-cols-2 p-3 hover:bg-gray-50 transition-colors">
                        <div className="font-bold text-gray-500">90% (3-4 Reps)</div>
                        <div className="font-bold text-gray-900">{res.p90}</div>
                    </div>
                    <div className="grid grid-cols-2 p-3 hover:bg-gray-50 transition-colors">
                        <div className="font-bold text-gray-500">85% (5-6 Reps)</div>
                        <div className="font-bold text-gray-900">{res.p85}</div>
                    </div>
                    <div className="grid grid-cols-2 p-3 hover:bg-gray-50 transition-colors">
                        <div className="font-bold text-gray-500">80% (7-8 Reps)</div>
                        <div className="font-bold text-gray-900">{res.p80}</div>
                    </div>
                    <div className="grid grid-cols-2 p-3 hover:bg-gray-50 transition-colors">
                        <div className="font-bold text-gray-500">75% (9-10 Reps)</div>
                        <div className="font-bold text-gray-900">{res.p75}</div>
                    </div>
                </div>
             </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

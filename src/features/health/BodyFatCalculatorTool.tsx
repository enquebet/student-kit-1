import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function BodyFatCalculatorTool() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState('175'); // cm
  const [neck, setNeck] = useState('40'); // cm
  const [waist, setWaist] = useState('90'); // cm
  const [hip, setHip] = useState('100'); // cm

  const calculate = () => {
    const h = parseFloat(height);
    const n = parseFloat(neck);
    const w = parseFloat(waist);
    const hipVal = parseFloat(hip);

    if (h > 0 && n > 0 && w > 0) {
      let bf = 0;
      if (gender === 'male') {
        // Men: 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450
        const val = 1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h);
        bf = (495 / val) - 450;
      } else {
        if (hipVal > 0) {
           // Women: 495 / (1.29579 - 0.35004 * log10(waist + hip - neck) + 0.22100 * log10(height)) - 450
           const val = 1.29579 - 0.35004 * Math.log10(w + hipVal - n) + 0.22100 * Math.log10(h);
           bf = (495 / val) - 450;
        }
      }

      if (!isNaN(bf) && bf > 0 && bf < 80) {
        let category = '';
        if (gender === 'male') {
           if (bf < 6) category = 'Essential fat';
           else if (bf < 14) category = 'Athletes';
           else if (bf < 18) category = 'Fitness';
           else if (bf < 25) category = 'Average';
           else category = 'Obese';
        } else {
           if (bf < 14) category = 'Essential fat';
           else if (bf < 21) category = 'Athletes';
           else if (bf < 25) category = 'Fitness';
           else if (bf < 32) category = 'Average';
           else category = 'Obese';
        }

        return {
          percentage: bf.toFixed(1),
          category
        };
      }
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Body Fat Calculator" description="Estimate body fat percentage using the US Navy circumferences method." category="health" seoTitle="Body Fat Calculator | US Navy Method" seoDescription="Estimate your body fat percentage quickly using height, waist, neck, and hip circumferences (US Navy Method).">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="flex bg-gray-100 p-1 rounded-lg mb-8 gap-1">
            <button onClick={() => setGender('male')} className={`flex-1 py-2 rounded-md font-bold text-sm ${gender === 'male' ? 'bg-white shadow text-blue-700' : 'text-gray-600'}`}>Male</button>
            <button onClick={() => setGender('female')} className={`flex-1 py-2 rounded-md font-bold text-sm ${gender === 'female' ? 'bg-white shadow text-blue-700' : 'text-gray-600'}`}>Female</button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Height (cm)</label>
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Neck Circumference (cm)</label>
            <input type="number" value={neck} onChange={(e) => setNeck(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Waist Circumference (cm)</label>
            <input type="number" value={waist} onChange={(e) => setWaist(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" min="0" step="any" />
            <div className="text-xs text-gray-500 mt-1">Measure at the navel</div>
          </div>
          {gender === 'female' && (
             <div>
               <label className="block text-sm font-bold text-gray-700 mb-1">Hip Circumference (cm)</label>
               <input type="number" value={hip} onChange={(e) => setHip(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" min="0" step="any" />
               <div className="text-xs text-gray-500 mt-1">Measure at the widest point</div>
             </div>
          )}
        </div>

        {res && (
          <div className="bg-blue-50 p-8 rounded-xl border border-blue-100 text-center">
            <h3 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-2">Estimated Body Fat</h3>
            <div className="text-6xl font-black text-blue-700 flex items-baseline justify-center gap-1 mb-2">
                {res.percentage}<span className="text-3xl">%</span>
            </div>
            <div className="text-lg font-bold text-blue-900 uppercase">
                {res.category}
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

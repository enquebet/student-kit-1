import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function MacroCalculatorTool() {
  const [calories, setCalories] = useState('2000');
  const [split, setSplit] = useState('balanced'); // balanced, lowcarb, highcarb, keto

  const calculate = () => {
    const cal = parseFloat(calories);
    
    if (cal > 0) {
      let pPct = 0, cPct = 0, fPct = 0;

      if (split === 'balanced') {
        pPct = 0.30; cPct = 0.40; fPct = 0.30;
      } else if (split === 'lowcarb') {
        pPct = 0.40; cPct = 0.20; fPct = 0.40;
      } else if (split === 'highcarb') {
        pPct = 0.30; cPct = 0.50; fPct = 0.20;
      } else if (split === 'keto') {
        pPct = 0.20; cPct = 0.05; fPct = 0.75;
      }

      // Calories per macro
      const pCal = cal * pPct;
      const cCal = cal * cPct;
      const fCal = cal * fPct;

      // Grams (Protein: 4 kcal/g, Carbs: 4 kcal/g, Fat: 9 kcal/g)
      return {
        protein: Math.round(pCal / 4),
        carbs: Math.round(cCal / 4),
        fat: Math.round(fCal / 9),
        pPct: Math.round(pPct * 100),
        cPct: Math.round(cPct * 100),
        fPct: Math.round(fPct * 100)
      };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Macro Calculator" description="Calculate daily macronutrient targets based on a calorie goal and chosen diet split." category="health" seoTitle="Macro Calculator | Protein, Carbs, Fat Split" seoDescription="Calculate your daily macronutrients (macros). Split your daily calories into exact grams of protein, carbs, and fats based on your diet plan.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Target Calories (kcal)</label>
            <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" min="500" step="50" />
            <div className="text-xs text-gray-500 mt-1">Daily energy intake goal</div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Macronutrient Split</label>
            <select value={split} onChange={(e) => setSplit(e.target.value)} className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer">
              <option value="balanced">Balanced (30% P / 40% C / 30% F)</option>
              <option value="lowcarb">Low Carb (40% P / 20% C / 40% F)</option>
              <option value="highcarb">High Carb (30% P / 50% C / 20% F)</option>
              <option value="keto">Keto (20% P / 5% C / 75% F)</option>
            </select>
          </div>
        </div>

        {res && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
             <div className="bg-red-50 p-6 rounded-xl border border-red-100 text-center">
                <div className="text-xs font-bold text-red-800 uppercase tracking-wider mb-2">Protein ({res.pPct}%)</div>
                <div className="text-4xl font-black text-red-700">
                    {res.protein}g
                </div>
                <div className="text-xs text-red-600/70 mt-2 font-medium">{res.protein * 4} kcal</div>
             </div>
             
             <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-center">
                <div className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-2">Carbs ({res.cPct}%)</div>
                <div className="text-4xl font-black text-blue-700">
                    {res.carbs}g
                </div>
                <div className="text-xs text-blue-600/70 mt-2 font-medium">{res.carbs * 4} kcal</div>
             </div>

             <div className="bg-amber-50 p-6 rounded-xl border border-amber-100 text-center">
                <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">Fats ({res.fPct}%)</div>
                <div className="text-4xl font-black text-amber-700">
                    {res.fat}g
                </div>
                <div className="text-xs text-amber-600/70 mt-2 font-medium">{res.fat * 9} kcal</div>
             </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

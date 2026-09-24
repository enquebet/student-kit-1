import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function TdeeCalculatorTool() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState('25');
  const [weightKg, setWeightKg] = useState('70');
  const [heightCm, setHeightCm] = useState('175');
  const [activity, setActivity] = useState('1.2');

  const calculate = () => {
    const w = parseFloat(weightKg);
    const h = parseFloat(heightCm);
    const a = parseFloat(age);
    const act = parseFloat(activity);

    if (w > 0 && h > 0 && a > 0 && act > 0) {
      // Mifflin-St Jeor Equation
      // Men: 10 * weight(kg) + 6.25 * height(cm) - 5 * age(y) + 5
      // Women: 10 * weight(kg) + 6.25 * height(cm) - 5 * age(y) - 161
      
      let bmr = (10 * w) + (6.25 * h) - (5 * a);
      if (gender === 'male') {
        bmr += 5;
      } else {
        bmr -= 161;
      }

      const tdee = bmr * act;

      return {
        bmr: Math.round(bmr).toLocaleString(),
        tdee: Math.round(tdee).toLocaleString(),
        cut: Math.round(tdee - 500).toLocaleString(),
        bulk: Math.round(tdee + 500).toLocaleString(),
      };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="TDEE Calculator" description="Calculate your Total Daily Energy Expenditure and resting metabolic rate." category="health" seoTitle="TDEE Calculator | Total Daily Energy Expenditure" seoDescription="Find out exactly how many calories you burn each day. Calculate your BMR and TDEE based on the Mifflin-St Jeor equation.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="flex bg-gray-100 p-1 rounded-lg mb-8 gap-1">
            <button onClick={() => setGender('male')} className={`flex-1 py-2 rounded-md font-bold text-sm ${gender === 'male' ? 'bg-white shadow text-indigo-700' : 'text-gray-600'}`}>Male</button>
            <button onClick={() => setGender('female')} className={`flex-1 py-2 rounded-md font-bold text-sm ${gender === 'female' ? 'bg-white shadow text-indigo-700' : 'text-gray-600'}`}>Female</button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Age (years)</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" min="1" step="1" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Weight (kg)</label>
            <input type="number" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Height (cm)</label>
            <input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" min="0" step="any" />
          </div>
        </div>
        
        <div className="mb-8">
            <label className="block text-sm font-bold text-gray-700 mb-1">Activity Level</label>
            <select value={activity} onChange={(e) => setActivity(e.target.value)} className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer">
              <option value="1.2">Sedentary (office job, little to no exercise)</option>
              <option value="1.375">Light Exercise (1-3 days/week)</option>
              <option value="1.55">Moderate Exercise (3-5 days/week)</option>
              <option value="1.725">Heavy Exercise (6-7 days/week)</option>
              <option value="1.9">Athlete (2x per day / physical job)</option>
            </select>
        </div>

        {res && (
          <div className="space-y-4">
             <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 text-center">
                <h3 className="text-sm font-bold text-indigo-800 uppercase tracking-wider mb-2">Maintenance Calories (TDEE)</h3>
                <div className="text-5xl font-black text-indigo-700 flex items-baseline justify-center gap-2">
                    {res.tdee} <span className="text-2xl text-indigo-500">kcal</span>
                </div>
                <div className="text-sm font-bold text-indigo-500 mt-2">
                    BMR: {res.bmr} kcal/day
                </div>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 text-center">
                   <div className="text-xs font-bold text-emerald-800 uppercase mb-1">Cutting Goal</div>
                   <div className="text-2xl font-bold text-emerald-700">{res.cut} kcal</div>
                </div>
                <div className="bg-rose-50 p-4 rounded-lg border border-rose-100 text-center">
                   <div className="text-xs font-bold text-rose-800 uppercase mb-1">Bulking Goal</div>
                   <div className="text-2xl font-bold text-rose-700">{res.bulk} kcal</div>
                </div>
             </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

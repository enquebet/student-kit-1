import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function BmiCalculatorTool() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  
  // Metric
  const [weightKg, setWeightKg] = useState('70');
  const [heightCm, setHeightCm] = useState('175');

  // Imperial
  const [weightLbs, setWeightLbs] = useState('150');
  const [heightFt, setHeightFt] = useState('5');
  const [heightIn, setHeightIn] = useState('9');

  const calculate = () => {
    let bmi = 0;
    
    if (unit === 'metric') {
      const kg = parseFloat(weightKg);
      const m = parseFloat(heightCm) / 100;
      if (kg > 0 && m > 0) {
        bmi = kg / (m * m);
      }
    } else {
      const lbs = parseFloat(weightLbs);
      const inches = (parseFloat(heightFt) * 12) + parseFloat(heightIn);
      if (lbs > 0 && inches > 0) {
        bmi = (lbs / (inches * inches)) * 703;
      }
    }

    if (bmi > 0) {
      let category = '';
      let colorClass = '';
      
      if (bmi < 18.5) {
        category = 'Underweight';
        colorClass = 'text-blue-600 bg-blue-50 border-blue-200';
      } else if (bmi >= 18.5 && bmi < 25) {
        category = 'Normal weight';
        colorClass = 'text-emerald-700 bg-emerald-50 border-emerald-200';
      } else if (bmi >= 25 && bmi < 30) {
        category = 'Overweight';
        colorClass = 'text-amber-700 bg-amber-50 border-amber-200';
      } else {
        category = 'Obese';
        colorClass = 'text-rose-700 bg-rose-50 border-rose-200';
      }

      return {
        bmi: bmi.toFixed(1),
        category,
        colorClass
      };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="BMI Calculator" description="Calculate your Body Mass Index (BMI) and determine your weight category." category="health" seoTitle="BMI Calculator | Check Body Mass Index" seoDescription="Free BMI calculator to check your Body Mass Index and weight category using metric or imperial units.">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="flex bg-gray-100 p-1 rounded-lg mb-8">
            <button onClick={() => setUnit('metric')} className={`flex-1 py-2 rounded-md font-bold text-sm ${unit === 'metric' ? 'bg-white shadow text-teal-700' : 'text-gray-600'}`}>Metric (kg/cm)</button>
            <button onClick={() => setUnit('imperial')} className={`flex-1 py-2 rounded-md font-bold text-sm ${unit === 'imperial' ? 'bg-white shadow text-teal-700' : 'text-gray-600'}`}>Imperial (lbs/ft)</button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {unit === 'metric' ? (
             <>
               <div>
                 <label className="block text-sm font-bold text-gray-700 mb-1">Weight (kg)</label>
                 <input type="number" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" min="0" step="any" />
               </div>
               <div>
                 <label className="block text-sm font-bold text-gray-700 mb-1">Height (cm)</label>
                 <input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" min="0" step="any" />
               </div>
             </>
          ) : (
             <>
               <div>
                 <label className="block text-sm font-bold text-gray-700 mb-1">Weight (lbs)</label>
                 <input type="number" value={weightLbs} onChange={(e) => setWeightLbs(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" min="0" step="any" />
               </div>
               <div className="flex gap-2">
                 <div className="flex-1">
                   <label className="block text-sm font-bold text-gray-700 mb-1">Height (ft)</label>
                   <input type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" min="0" step="1" />
                 </div>
                 <div className="flex-1">
                   <label className="block text-sm font-bold text-gray-700 mb-1">Inches</label>
                   <input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" min="0" max="11" step="any" />
                 </div>
               </div>
             </>
          )}
        </div>

        {res && (
          <div className={`p-8 rounded-xl border text-center ${res.colorClass}`}>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-2">Your BMI Is</h3>
            <div className="text-6xl font-black mb-2">
                {res.bmi}
            </div>
            <div className="text-xl font-bold uppercase">
                {res.category}
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Calendar } from 'lucide-react';

export default function DateDifferenceCalculatorTool() {
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  
  const [result, setResult] = useState<{
    days: number,
    weeks: number,
    months: number,
    years: number
  } | null>(null);

  const calculate = () => {
    if (!date1 || !date2) return;
    
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    
    // Ensure d1 is the earlier date
    const start = d1 < d2 ? d1 : d2;
    const end = d1 < d2 ? d2 : d1;
    
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Approximate months and years for simple display
    let diffMonths = (end.getFullYear() - start.getFullYear()) * 12;
    diffMonths -= start.getMonth();
    diffMonths += end.getMonth();
    
    const diffYears = end.getFullYear() - start.getFullYear();
    
    setResult({
      days: diffDays,
      weeks: Math.floor(diffDays / 7),
      months: diffMonths,
      years: diffYears
    });
  };

  return (
    <ToolShell title="Date Difference Calculator" description="Calculate the exact number of days, weeks, months, and years between two dates." category="everyday" seoTitle="Date Difference Calculator | Days Between Dates | StudentKit" seoDescription="Find out exactly how many days, weeks, months, or years are between two dates with this free online date difference calculator.">
      <div className="max-w-2xl mx-auto space-y-8">
        
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Start Date</label>
              <input 
                type="date" 
                value={date1} 
                onChange={(e) => setDate1(e.target.value)} 
                className="w-full p-4 border rounded-xl text-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">End Date</label>
              <input 
                type="date" 
                value={date2} 
                onChange={(e) => setDate2(e.target.value)} 
                className="w-full p-4 border rounded-xl text-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
              />
            </div>
          </div>

          <div className="mt-8 flex justify-center border-t pt-8">
            <button 
              onClick={calculate} 
              disabled={!date1 || !date2}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Calendar className="w-5 h-5" /> Calculate Difference
            </button>
          </div>
        </div>

        {result !== null && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="bg-white p-6 rounded-xl border shadow-sm text-center">
                 <div className="text-4xl font-black text-indigo-600 mb-1">{result.days}</div>
                 <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">Days</div>
             </div>
             <div className="bg-white p-6 rounded-xl border shadow-sm text-center">
                 <div className="text-4xl font-black text-blue-600 mb-1">{result.weeks}</div>
                 <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">Weeks</div>
             </div>
             <div className="bg-white p-6 rounded-xl border shadow-sm text-center">
                 <div className="text-4xl font-black text-emerald-600 mb-1">{result.months}</div>
                 <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">Months</div>
             </div>
             <div className="bg-white p-6 rounded-xl border shadow-sm text-center">
                 <div className="text-4xl font-black text-purple-600 mb-1">{result.years}</div>
                 <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">Years</div>
             </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

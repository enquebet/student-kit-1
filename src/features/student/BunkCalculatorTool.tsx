import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Calculator } from 'lucide-react';

export default function BunkCalculatorTool() {
  const [totalClasses, setTotalClasses] = useState<string>('');
  const [attendedClasses, setAttendedClasses] = useState<string>('');
  const [targetPercentage, setTargetPercentage] = useState<string>('75');
  const [result, setResult] = useState<{ message: string; safeToBunk: number; needsToAttend: number } | null>(null);

  const calculate = () => {
    const total = parseInt(totalClasses);
    const attended = parseInt(attendedClasses);
    const target = parseFloat(targetPercentage);

    if (isNaN(total) || isNaN(attended) || isNaN(target) || total <= 0 || attended < 0 || target <= 0 || target > 100) {
      setResult({ message: 'Please enter valid positive numbers. Total classes must be > 0 and attended cannot exceed total if strictly checked, but calculating anyway.', safeToBunk: 0, needsToAttend: 0 });
      return;
    }

    if (attended > total) {
      setResult({ message: 'Attended classes cannot be greater than total classes conducted.', safeToBunk: 0, needsToAttend: 0 });
      return;
    }

    const currentPercentage = (attended / total) * 100;
    
    // Formula: (attended + required) / (total + required) = target / 100
    // required * (1 - target/100) = total * (target/100) - attended
    
    if (currentPercentage >= target) {
      // Safe to bunk
      // (attended) / (total + bunk) = target / 100
      // bunk = (attended * 100 / target) - total
      let safeBunk = Math.floor((attended * 100) / target) - total;
      if (safeBunk < 0) safeBunk = 0;
      setResult({ message: `Your current attendance is ${currentPercentage.toFixed(2)}%. You are above the target.`, safeToBunk: safeBunk, needsToAttend: 0 });
    } else {
      // Needs to attend
      let required = Math.ceil(((target * total) - (100 * attended)) / (100 - target));
      if (target === 100 && currentPercentage < 100) {
          setResult({ message: `Your current attendance is ${currentPercentage.toFixed(2)}%. You can never reach 100% since you have already missed classes.`, safeToBunk: 0, needsToAttend: -1 });
          return;
      }
      setResult({ message: `Your current attendance is ${currentPercentage.toFixed(2)}%. You are below the target.`, safeToBunk: 0, needsToAttend: required });
    }
  };

  return (
    <ToolShell title="Bunk Calculator" description="Find out how many classes you can skip without your attendance falling below the required percentage." category="student" seoTitle="Bunk Calculator | Attendance Calculator | StudentKit" seoDescription="Calculate how many classes you can safely bunk or how many you need to attend to maintain your target attendance percentage.">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Classes Conducted</label>
            <input type="number" value={totalClasses} onChange={(e) => setTotalClasses(e.target.value)} className="w-full p-2 border rounded-md" placeholder="e.g. 50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Classes Attended</label>
            <input type="number" value={attendedClasses} onChange={(e) => setAttendedClasses(e.target.value)} className="w-full p-2 border rounded-md" placeholder="e.g. 40" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Attendance Percentage (%)</label>
            <input type="number" value={targetPercentage} onChange={(e) => setTargetPercentage(e.target.value)} className="w-full p-2 border rounded-md" placeholder="75" />
          </div>
          
          <button onClick={calculate} className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            <Calculator className="w-4 h-4" /> Calculate
          </button>
        </div>

        {result && (
          <div className={`rounded-xl p-6 shadow-sm border text-center ${result.safeToBunk > 0 ? 'bg-emerald-50 border-emerald-100' : result.needsToAttend > 0 ? 'bg-amber-50 border-amber-100' : 'bg-gray-50 border-gray-200'}`}>
            <p className="text-gray-700 mb-2">{result.message}</p>
            {result.safeToBunk > 0 && (
              <div>
                <p className="text-lg font-medium text-emerald-800">You can safely bunk</p>
                <p className="text-4xl font-bold text-emerald-600 my-2">{result.safeToBunk}</p>
                <p className="text-emerald-800">more classes.</p>
              </div>
            )}
            {result.needsToAttend > 0 && (
              <div>
                <p className="text-lg font-medium text-amber-800">You need to attend</p>
                <p className="text-4xl font-bold text-amber-600 my-2">{result.needsToAttend}</p>
                <p className="text-amber-800">more consecutive classes to reach your target.</p>
              </div>
            )}
            {result.needsToAttend === -1 && (
                <p className="text-lg font-medium text-red-600 mt-2">Target impossible to reach.</p>
            )}
          </div>
        )}
      </div>
    </ToolShell>
  );
}

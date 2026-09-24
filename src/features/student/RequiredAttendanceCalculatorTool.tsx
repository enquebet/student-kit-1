import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Calculator } from 'lucide-react';

export default function RequiredAttendanceCalculatorTool() {
  const [totalClassesInSemester, setTotalClassesInSemester] = useState<string>('');
  const [targetPercentage, setTargetPercentage] = useState<string>('75');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const total = parseInt(totalClassesInSemester);
    const target = parseFloat(targetPercentage);

    if (!isNaN(total) && !isNaN(target) && target > 0 && target <= 100) {
      setResult(Math.ceil((target / 100) * total));
    } else {
      setResult(null);
    }
  };

  return (
    <ToolShell title="Required Attendance Calculator" description="Calculate the minimum number of classes you need to attend in a semester to meet a target percentage." category="student" seoTitle="Required Attendance Calculator | StudentKit" seoDescription="Find out exactly how many classes you must attend in a semester to achieve your target attendance percentage.">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Classes in Semester</label>
            <input type="number" value={totalClassesInSemester} onChange={(e) => setTotalClassesInSemester(e.target.value)} className="w-full p-2 border rounded-md" placeholder="e.g. 40" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Percentage (%)</label>
            <input type="number" value={targetPercentage} onChange={(e) => setTargetPercentage(e.target.value)} className="w-full p-2 border rounded-md" placeholder="75" />
          </div>
          
          <button onClick={calculate} className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            <Calculator className="w-4 h-4" /> Calculate Minimum Classes
          </button>
        </div>

        {result !== null && (
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-8 text-center shadow-sm">
            <p className="text-lg font-medium text-emerald-800 mb-2">You must attend at least</p>
            <div className="text-5xl font-bold text-emerald-600 tracking-tight">{result}</div>
            <p className="text-emerald-700 mt-2">classes out of {totalClassesInSemester} to maintain {targetPercentage}%.</p>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

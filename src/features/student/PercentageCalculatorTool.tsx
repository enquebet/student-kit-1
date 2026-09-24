import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Calculator } from 'lucide-react';

export default function PercentageCalculatorTool() {
  const [val1, setVal1] = useState<string>('');
  const [val2, setVal2] = useState<string>('');
  const [result1, setResult1] = useState<number | null>(null);

  const [val3, setVal3] = useState<string>('');
  const [val4, setVal4] = useState<string>('');
  const [result2, setResult2] = useState<number | null>(null);

  const calculate1 = () => {
    const a = parseFloat(val1);
    const b = parseFloat(val2);
    if (!isNaN(a) && !isNaN(b)) {
      setResult1((a / 100) * b);
    }
  };

  const calculate2 = () => {
    const a = parseFloat(val3);
    const b = parseFloat(val4);
    if (!isNaN(a) && !isNaN(b) && b !== 0) {
      setResult2((a / b) * 100);
    }
  };

  return (
    <ToolShell title="Percentage Calculator" description="Calculate percentages quickly. Find what % one number is of another, or calculate a percentage of a number." category="student" seoTitle="Percentage Calculator | StudentKit" seoDescription="Calculate percentages easily. Find what percent X is of Y, or what X% of Y is.">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">What is X% of Y?</h2>
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-medium text-gray-700">What is</span>
            <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-24 p-2 border rounded-md" placeholder="20" />
            <span className="font-medium text-gray-700">% of</span>
            <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-32 p-2 border rounded-md" placeholder="150" />
            <button onClick={calculate1} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Calculate
            </button>
          </div>
          {result1 !== null && (
            <div className="mt-4 p-4 bg-indigo-50 text-indigo-900 rounded-lg text-xl font-bold">
              {val1}% of {val2} is <span className="text-indigo-600">{result1.toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">X is what percent of Y?</h2>
          <div className="flex flex-wrap items-center gap-4">
            <input type="number" value={val3} onChange={(e) => setVal3(e.target.value)} className="w-24 p-2 border rounded-md" placeholder="30" />
            <span className="font-medium text-gray-700">is what percent of</span>
            <input type="number" value={val4} onChange={(e) => setVal4(e.target.value)} className="w-32 p-2 border rounded-md" placeholder="150" />
            <button onClick={calculate2} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Calculate
            </button>
          </div>
          {result2 !== null && (
            <div className="mt-4 p-4 bg-indigo-50 text-indigo-900 rounded-lg text-xl font-bold">
              {val3} is <span className="text-indigo-600">{result2.toLocaleString(undefined, { maximumFractionDigits: 4 })}%</span> of {val4}
            </div>
          )}
        </div>

        <div className="prose max-w-none mt-12 bg-white p-8 rounded-xl border">
          <h2>Understanding Percentages</h2>
          <p>A percentage is a number or ratio expressed as a fraction of 100. It is often denoted using the percent sign, "%".</p>
          <h3>Formulas</h3>
          <ul>
            <li><strong>Finding a percentage of a number:</strong> <code>(P / 100) × V</code> (where P is the percentage and V is the value)</li>
            <li><strong>Finding what percentage one number is of another:</strong> <code>(V1 / V2) × 100</code></li>
          </ul>
        </div>
      </div>
    </ToolShell>
  );
}

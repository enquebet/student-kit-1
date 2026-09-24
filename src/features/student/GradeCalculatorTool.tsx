import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Plus, Trash2, Calculator } from 'lucide-react';

interface Assessment {
  id: string;
  name: string;
  grade: string;
  weight: string;
}

export default function GradeCalculatorTool() {
  const [assessments, setAssessments] = useState<Assessment[]>([
    { id: '1', name: 'Midterm', grade: '85', weight: '30' },
    { id: '2', name: 'Assignment 1', grade: '90', weight: '20' }
  ]);
  const [result, setResult] = useState<{ currentGrade: number; totalWeight: number } | null>(null);

  const addAssessment = () => {
    setAssessments([...assessments, { id: Math.random().toString(), name: `Assessment ${assessments.length + 1}`, grade: '', weight: '' }]);
  };

  const removeAssessment = (id: string) => {
    setAssessments(assessments.filter(a => a.id !== id));
  };

  const updateAssessment = (id: string, field: keyof Assessment, value: string) => {
    setAssessments(assessments.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const calculate = () => {
    let earned = 0;
    let totalW = 0;

    assessments.forEach(a => {
      const g = parseFloat(a.grade);
      const w = parseFloat(a.weight);
      if (!isNaN(g) && !isNaN(w)) {
        earned += (g * w) / 100;
        totalW += w;
      }
    });

    if (totalW > 0) {
      // Current grade is based on the weights calculated so far (normalized to 100%)
      setResult({
        currentGrade: (earned / totalW) * 100,
        totalWeight: totalW
      });
    } else {
      setResult(null);
    }
  };

  return (
    <ToolShell title="Grade Calculator" description="Calculate your current course grade based on weighted assignments and exams." category="student" seoTitle="Grade Calculator | Weighted Grade Calculator | StudentKit" seoDescription="Free online grade calculator. Calculate your current class grade based on assignments, tests, and their respective weights.">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="grid grid-cols-12 gap-4 mb-4 text-sm font-medium text-gray-700 px-1">
            <div className="col-span-6">Assessment Name</div>
            <div className="col-span-3">Grade (%)</div>
            <div className="col-span-2">Weight (%)</div>
            <div className="col-span-1"></div>
          </div>
          
          <div className="space-y-3">
            {assessments.map((a) => (
              <div key={a.id} className="grid grid-cols-12 gap-4 items-center">
                <input type="text" value={a.name} onChange={(e) => updateAssessment(a.id, 'name', e.target.value)} className="col-span-6 p-2 border rounded-md" placeholder="e.g. Midterm" />
                <input type="number" value={a.grade} onChange={(e) => updateAssessment(a.id, 'grade', e.target.value)} className="col-span-3 p-2 border rounded-md" placeholder="e.g. 85" />
                <input type="number" value={a.weight} onChange={(e) => updateAssessment(a.id, 'weight', e.target.value)} className="col-span-2 p-2 border rounded-md" placeholder="e.g. 20" />
                <button onClick={() => removeAssessment(a.id)} className="col-span-1 p-2 text-red-500 hover:bg-red-50 rounded-md flex justify-center" aria-label="Remove">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-between items-center border-t pt-6">
            <button onClick={addAssessment} className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium">
              <Plus className="w-4 h-4" /> Add Row
            </button>
            <button onClick={calculate} className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 font-medium">
              <Calculator className="w-4 h-4" /> Calculate Grade
            </button>
          </div>
        </div>

        {result && (
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-xl p-8 text-center shadow-sm">
            <h3 className="text-lg font-medium text-indigo-900 mb-2">Your Current Grade</h3>
            <div className="text-5xl font-bold text-indigo-600 tracking-tight">{result.currentGrade.toFixed(2)}%</div>
            <p className="text-indigo-700 mt-4 max-w-lg mx-auto">
              Based on {result.totalWeight}% of the course completed. 
              {result.totalWeight > 100 && <span className="block text-red-600 mt-2 font-bold">Warning: Total weight exceeds 100%!</span>}
              {result.totalWeight < 100 && <span className="block mt-2">You have {100 - result.totalWeight}% of your grade left to earn.</span>}
            </p>
          </div>
        )}

        <div className="prose max-w-none mt-12 bg-white p-8 rounded-xl border">
          <h2>How Weighted Grades Work</h2>
          <p>In many classes, your final grade isn't just a simple average of all your assignments. Instead, different types of assignments are worth different percentages (weights) of your final grade.</p>
          <p><strong>Formula:</strong></p>
          <p><code>Current Grade = Sum of (Grade × Weight) / Sum of Weights Completed</code></p>
          <p>For example, if your midterm is worth 30% and you got an 80%, and your final is worth 70% and you got a 90%, your overall grade would be: <code>(80 × 0.3) + (90 × 0.7) = 24 + 63 = 87%</code>.</p>
        </div>
      </div>
    </ToolShell>
  );
}

import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Plus, Trash2, Calculator } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  credits: number;
  gradePoints: number;
}

export default function SgpaCalculatorTool() {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', name: 'Subject 1', credits: 3, gradePoints: 9 },
    { id: '2', name: 'Subject 2', credits: 4, gradePoints: 8 }
  ]);
  const [sgpa, setSgpa] = useState<number | null>(null);

  const addSubject = () => {
    setSubjects([...subjects, { id: Math.random().toString(), name: `Subject ${subjects.length + 1}`, credits: 3, gradePoints: 10 }]);
  };

  const removeSubject = (id: string) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };

  const updateSubject = (id: string, field: keyof Subject, value: string | number) => {
    setSubjects(subjects.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const calculate = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    subjects.forEach(s => {
      totalCredits += s.credits;
      totalPoints += (s.gradePoints * s.credits);
    });
    setSgpa(totalCredits > 0 ? totalPoints / totalCredits : 0);
  };

  return (
    <ToolShell title="SGPA Calculator" description="Calculate your Semester Grade Point Average (SGPA) based on credits and grade points." category="student" seoTitle="SGPA Calculator | Calculate Semester GPA | StudentKit" seoDescription="Free online SGPA calculator. Quickly calculate your Semester Grade Point Average by entering credits and grade points for each subject.">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="grid grid-cols-12 gap-4 mb-4 text-sm font-medium text-gray-700 px-1">
             <div className="col-span-6">Subject</div>
             <div className="col-span-3">Credits</div>
             <div className="col-span-2">Grade Points (1-10)</div>
             <div className="col-span-1"></div>
          </div>
          <div className="space-y-4">
            {subjects.map((subject) => (
              <div key={subject.id} className="grid grid-cols-12 gap-4 items-center">
                <input type="text" value={subject.name} onChange={(e) => updateSubject(subject.id, 'name', e.target.value)} className="col-span-6 p-2 border rounded-md" placeholder="Subject Name" />
                <input type="number" min="1" max="10" value={subject.credits} onChange={(e) => updateSubject(subject.id, 'credits', parseFloat(e.target.value) || 0)} className="col-span-3 p-2 border rounded-md" placeholder="Credits" />
                <input type="number" min="0" max="10" value={subject.gradePoints} onChange={(e) => updateSubject(subject.id, 'gradePoints', parseFloat(e.target.value) || 0)} className="col-span-2 p-2 border rounded-md" placeholder="Points" />
                <button onClick={() => removeSubject(subject.id)} className="col-span-1 p-2 text-red-500 hover:bg-red-50 rounded-md flex justify-center" aria-label="Remove Subject">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-between items-center border-t pt-6">
            <button onClick={addSubject} className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium">
              <Plus className="w-4 h-4" /> Add Subject
            </button>
            <button onClick={calculate} className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 font-medium">
              <Calculator className="w-4 h-4" /> Calculate SGPA
            </button>
          </div>
        </div>

        {sgpa !== null && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-8 text-center shadow-sm">
            <h3 className="text-lg font-medium text-emerald-900 mb-2">Your SGPA</h3>
            <div className="text-5xl font-bold text-emerald-600 tracking-tight">{sgpa.toFixed(2)}</div>
            <p className="text-emerald-700 mt-4 max-w-lg mx-auto">Based on {subjects.reduce((acc, s) => acc + s.credits, 0)} total credits.</p>
          </div>
        )}

        <div className="prose max-w-none mt-12 bg-white p-8 rounded-xl border">
          <h2>How to Calculate SGPA</h2>
          <p>The Semester Grade Point Average (SGPA) is the weighted average of the grade points obtained in all subjects by the student during the semester.</p>
          <p><strong>Formula:</strong></p>
          <p><code>SGPA = (Sum of (Credits × Grade Points)) / (Total Credits in Semester)</code></p>
          <p>Enter the credits assigned to each subject and the grade points you earned (usually on a 10-point scale) to find your SGPA.</p>
        </div>
      </div>
    </ToolShell>
  );
}

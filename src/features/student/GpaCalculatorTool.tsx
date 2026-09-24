import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Plus, Trash2, Calculator } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

const GRADE_POINTS: Record<string, number> = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'F': 0.0
};

export default function GpaCalculatorTool() {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: 'Course 1', credits: 3, grade: 'A' },
    { id: '2', name: 'Course 2', credits: 3, grade: 'B' }
  ]);
  const [gpa, setGpa] = useState<number | null>(null);

  const addCourse = () => {
    setCourses([...courses, { id: Math.random().toString(), name: `Course ${courses.length + 1}`, credits: 3, grade: 'A' }]);
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof Course, value: string | number) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const calculate = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    courses.forEach(c => {
      totalCredits += c.credits;
      totalPoints += (GRADE_POINTS[c.grade] || 0) * c.credits;
    });
    setGpa(totalCredits > 0 ? totalPoints / totalCredits : 0);
  };

  return (
    <ToolShell title="GPA Calculator" description="Calculate your Grade Point Average based on course credits and letter grades." category="student" seoTitle="GPA Calculator | StudentKit" seoDescription="Calculate your GPA easily with our free online GPA calculator. Add courses, credits, and letter grades to find your current academic standing.">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="flex gap-4 items-center">
                <input type="text" value={course.name} onChange={(e) => updateCourse(course.id, 'name', e.target.value)} className="flex-1 p-2 border rounded-md" placeholder="Course Name" />
                <input type="number" min="1" max="10" value={course.credits} onChange={(e) => updateCourse(course.id, 'credits', parseFloat(e.target.value) || 0)} className="w-24 p-2 border rounded-md" placeholder="Credits" />
                <select value={course.grade} onChange={(e) => updateCourse(course.id, 'grade', e.target.value)} className="w-24 p-2 border rounded-md">
                  {Object.keys(GRADE_POINTS).map(g => <option key={g} value={g}>{g}</option>)}
                </select>
                <button onClick={() => removeCourse(course.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-md" aria-label="Remove Course">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-between items-center border-t pt-6">
            <button onClick={addCourse} className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium">
              <Plus className="w-4 h-4" /> Add Course
            </button>
            <button onClick={calculate} className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 font-medium">
              <Calculator className="w-4 h-4" /> Calculate GPA
            </button>
          </div>
        </div>

        {gpa !== null && (
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-xl p-8 text-center shadow-sm">
            <h3 className="text-lg font-medium text-indigo-900 mb-2">Your Semester GPA</h3>
            <div className="text-5xl font-bold text-indigo-600 tracking-tight">{gpa.toFixed(2)}</div>
            <p className="text-indigo-700 mt-4 max-w-lg mx-auto">Based on {courses.reduce((acc, c) => acc + c.credits, 0)} total credits calculated on a standard 4.0 scale.</p>
          </div>
        )}

        <div className="prose max-w-none mt-12 bg-white p-8 rounded-xl border">
          <h2>How to Calculate Your GPA</h2>
          <p>Your Grade Point Average (GPA) is a standard way of measuring academic achievement in the US. It is calculated by dividing the total number of grade points earned by the total number of credit hours attempted.</p>
          <h3>Standard 4.0 Scale</h3>
          <ul>
            <li><strong>A+ / A:</strong> 4.0 points</li>
            <li><strong>A-:</strong> 3.7 points</li>
            <li><strong>B+:</strong> 3.3 points</li>
            <li><strong>B:</strong> 3.0 points</li>
            <li><strong>B-:</strong> 2.7 points</li>
            <li><strong>C+:</strong> 2.3 points</li>
            <li><strong>C:</strong> 2.0 points</li>
            <li><strong>C-:</strong> 1.7 points</li>
            <li><strong>D+:</strong> 1.3 points</li>
            <li><strong>D:</strong> 1.0 point</li>
            <li><strong>F:</strong> 0.0 points</li>
          </ul>
        </div>
      </div>
    </ToolShell>
  );
}

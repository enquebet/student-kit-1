import React, { useState, useEffect } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Plus, Trash2, Copy, RefreshCw, Save, Download, Sparkles, Check } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  credits: number;
  grade: number; // point value (e.g., 4.0)
}

interface Semester {
  id: string;
  name: string;
  subjects: Subject[];
}

const DEFAULT_GRADES = [
  { label: 'O / A+ (10)', value: 10 },
  { label: 'A (9)', value: 9 },
  { label: 'B+ (8)', value: 8 },
  { label: 'B (7)', value: 7 },
  { label: 'C (6)', value: 6 },
  { label: 'F (0)', value: 0 },
];

export default function CgpaCalculatorTool() {
  const [semesters, setSemesters] = useState<Semester[]>([
    { id: 'sem-1', name: 'Semester 1', subjects: [{ id: 'sub-1', name: '', credits: 3, grade: 10 }] }
  ]);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('studentkit_cgpa_data');
    if (saved) {
      try {
        setSemesters(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const saveToLocal = () => {
    localStorage.setItem('studentkit_cgpa_data', JSON.stringify(semesters));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const loadExample = () => {
    setSemesters([
      {
        id: 'sem-1', name: 'Semester 1', subjects: [
          { id: 'sub-11', name: 'Mathematics I', credits: 4, grade: 9 },
          { id: 'sub-12', name: 'Physics', credits: 4, grade: 8 },
          { id: 'sub-13', name: 'Programming in C', credits: 3, grade: 10 },
        ]
      },
      {
        id: 'sem-2', name: 'Semester 2', subjects: [
          { id: 'sub-21', name: 'Mathematics II', credits: 4, grade: 9 },
          { id: 'sub-22', name: 'Data Structures', credits: 4, grade: 9 },
          { id: 'sub-23', name: 'Digital Logic Design', credits: 3, grade: 8 },
        ]
      }
    ]);
  };

  const addSemester = () => {
    const newId = `sem-${Date.now()}`;
    setSemesters([...semesters, {
      id: newId,
      name: `Semester ${semesters.length + 1}`,
      subjects: [{ id: `sub-${Date.now()}`, name: '', credits: 3, grade: 10 }]
    }]);
  };

  const removeSemester = (id: string) => {
    if (semesters.length === 1) return;
    setSemesters(semesters.filter(s => s.id !== id));
  };

  const addSubject = (semId: string) => {
    setSemesters(semesters.map(s => {
      if (s.id !== semId) return s;
      return {
        ...s,
        subjects: [...s.subjects, { id: `sub-${Date.now()}`, name: '', credits: 3, grade: 10 }]
      };
    }));
  };

  const removeSubject = (semId: string, subId: string) => {
    setSemesters(semesters.map(s => {
      if (s.id !== semId) return s;
      if (s.subjects.length === 1) return s;
      return {
        ...s,
        subjects: s.subjects.filter(sub => sub.id !== subId)
      };
    }));
  };

  const updateSubject = (semId: string, subId: string, field: keyof Subject, value: any) => {
    setSemesters(semesters.map(s => {
      if (s.id !== semId) return s;
      return {
        ...s,
        subjects: s.subjects.map(sub => {
          if (sub.id !== subId) return sub;
          return { ...sub, [field]: value };
        })
      };
    }));
  };

  const updateSemesterName = (semId: string, name: string) => {
    setSemesters(semesters.map(s => s.id === semId ? { ...s, name } : s));
  };

  // Calculations
  const calculateSGPA = (subjects: Subject[]) => {
    let pts = 0;
    let cr = 0;
    subjects.forEach(s => {
      pts += s.grade * s.credits;
      cr += s.credits;
    });
    return cr > 0 ? (pts / cr) : 0;
  };

  let totalPoints = 0;
  let totalCredits = 0;
  semesters.forEach(s => {
    s.subjects.forEach(sub => {
      totalPoints += sub.grade * sub.credits;
      totalCredits += sub.credits;
    });
  });
  const cgpa = totalCredits > 0 ? (totalPoints / totalCredits) : 0;

  return (
    <ToolShell 
      title="Advanced CGPA Calculator" 
      description="Calculate your Cumulative Grade Point Average (CGPA) and Semester GPA (SGPA) across multiple terms with a beautiful interface." 
      category="student"
      seoTitle="Free CGPA & SGPA Calculator Online | StudentKit"
      seoDescription="Calculate your Cumulative Grade Point Average accurately. Add multiple semesters, track credits, and visualize your academic performance."
      relatedTools={[
        { title: 'Attendance Calculator', slug: 'attendance-calculator', desc: 'Find out how many classes you can afford to miss.' },
        { title: 'Percentage to CGPA Converter', slug: 'percentage-to-cgpa', desc: 'Convert marks percentage to a standard 10-point CGPA.' },
      ]}
      faqs={[
        { q: 'What is the difference between SGPA and CGPA?', a: 'SGPA (Semester Grade Point Average) is your performance for a single semester, while CGPA (Cumulative Grade Point Average) is the average of all semesters completed so far.' },
        { q: 'How is CGPA calculated?', a: 'CGPA is calculated by dividing the total grade points earned in all semesters by the total credit hours attempted. Formula: Total Grade Points / Total Credits.' },
        { q: 'Does this tool save my data?', a: 'If you click "Save Locally", your semesters and grades are stored entirely within your browser\'s local storage. We never upload your data.' }
      ]}
      article={
        <>
          <h2>Understanding Your CGPA</h2>
          <p>Your Cumulative Grade Point Average (CGPA) is an educational grading system used to measure overall academic performance. It provides a standardized way for universities and employers to evaluate your academic consistency.</p>
          <h3>The CGPA Formula</h3>
          <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm mb-4">
            CGPA = Σ(Semester Credits × SGPA) / Σ(Total Credits)
          </div>
          <p>Simply adding up your SGPAs and dividing by the number of semesters is <strong>incorrect</strong> unless every semester has the exact same number of credits. Our calculator correctly weights each subject by its credit value to ensure 100% accuracy.</p>
        </>
      }
    >
      <div className="flex flex-col md:flex-row gap-8">
        
        <div className="flex-1 space-y-6">
          {/* Top Control Bar with Google Style Neon Buttons */}
          <div className="flex flex-wrap justify-between items-center bg-white p-4 rounded-2xl border border-gray-200 shadow-xs gap-3">
            <div className="flex items-center space-x-2.5">
              <button 
                onClick={loadExample} 
                className="google-neon-btn-rgb px-4 py-1.5 text-xs text-slate-700 cursor-pointer border border-gray-300 hover:border-gray-400"
              >
                Load Sample Data
              </button>
              <button 
                onClick={() => setSemesters([{ id: 'sem-1', name: 'Semester 1', subjects: [{ id: 'sub-1', name: '', credits: 3, grade: 10 }] }])} 
                className="text-xs font-semibold text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-full bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Reset
              </button>
            </div>

            <button 
              onClick={saveToLocal} 
              className={`px-4 py-1.5 text-xs font-semibold rounded-full flex items-center space-x-1.5 transition-all cursor-pointer border ${
                saveSuccess ? 'google-neon-btn-green border-emerald-700' : 'google-neon-btn-primary border-blue-700'
              }`}
            >
              {saveSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Saved to Browser!</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Locally</span>
                </>
              )}
            </button>
          </div>

          {semesters.map((sem) => {
            const semSgpa = calculateSGPA(sem.subjects);

            return (
              <div key={sem.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:border-blue-300 transition-all">
                <div className="bg-slate-50/80 border-b border-gray-200/80 p-4 flex justify-between items-center">
                  <input 
                    type="text" 
                    value={sem.name}
                    onChange={(e) => updateSemesterName(sem.id, e.target.value)}
                    className="font-bold text-base text-gray-900 bg-transparent border-none focus:ring-0 p-0 placeholder-gray-400"
                    placeholder="Semester Name"
                  />
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">SGPA</div>
                      <div className="font-extrabold text-blue-600 text-base">{semSgpa.toFixed(2)}</div>
                    </div>
                    {semesters.length > 1 && (
                      <button 
                        onClick={() => removeSemester(sem.id)} 
                        className="text-gray-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                        title="Delete Semester"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="p-4 space-y-3">
                  <div className="grid grid-cols-12 gap-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider px-2">
                    <div className="col-span-5 md:col-span-6">Subject</div>
                    <div className="col-span-3 md:col-span-2">Credits</div>
                    <div className="col-span-3 md:col-span-3">Grade</div>
                    <div className="col-span-1"></div>
                  </div>
                  
                  {sem.subjects.map((sub) => (
                    <div key={sub.id} className="grid grid-cols-12 gap-3 items-center group">
                      <div className="col-span-5 md:col-span-6">
                        <input 
                          type="text" 
                          value={sub.name}
                          onChange={(e) => updateSubject(sem.id, sub.id, 'name', e.target.value)}
                          placeholder="Subject Name (Optional)"
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-colors"
                        />
                      </div>
                      <div className="col-span-3 md:col-span-2">
                        <input 
                          type="number" 
                          min="0"
                          step="0.5"
                          value={sub.credits}
                          onChange={(e) => updateSubject(sem.id, sub.id, 'credits', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-colors"
                        />
                      </div>
                      <div className="col-span-3 md:col-span-3">
                        <select 
                          value={sub.grade}
                          onChange={(e) => updateSubject(sem.id, sub.id, 'grade', parseFloat(e.target.value))}
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-colors bg-white font-medium"
                        >
                          {DEFAULT_GRADES.map(g => (
                            <option key={g.label} value={g.value}>{g.label}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-span-1 flex justify-end">
                        <button 
                          onClick={() => removeSubject(sem.id, sub.id)}
                          className="text-gray-300 hover:text-red-500 opacity-60 group-hover:opacity-100 transition-opacity p-1 rounded"
                          disabled={sem.subjects.length === 1}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <button 
                    onClick={() => addSubject(sem.id)}
                    className="mt-2 text-xs text-blue-600 font-semibold hover:text-blue-700 flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50/40 hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Subject</span>
                  </button>
                </div>
              </div>
            );
          })}

          <button 
            onClick={addSemester}
            className="w-full py-3.5 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 font-semibold hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/40 transition-all flex items-center justify-center space-x-2 text-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Another Semester</span>
          </button>
        </div>

        {/* Sidebar Summary with Google-Style RGB Glow Border Card */}
        <div className="w-full md:w-80 shrink-0">
          <div className="sticky top-20 space-y-6">
            
            {/* Google RGB Neon Container for the Results Card */}
            <div className="google-rgb-border p-1 shadow-xl">
              <div className="bg-gradient-to-br from-[#1a73e8] via-[#174ea6] to-[#0d3674] rounded-[0.85rem] p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-200 text-xs font-semibold uppercase tracking-wider">Cumulative GPA</span>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </div>
                
                <div className="text-5xl font-black tracking-tight mb-5">
                  {cgpa.toFixed(2)}
                </div>
                
                <div className="space-y-3 pt-4 border-t border-blue-400/30 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">Total Credits</span>
                    <span className="font-bold text-sm">{totalCredits}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">Total Semesters</span>
                    <span className="font-bold text-sm">{semesters.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">Est. Percentage</span>
                    <span className="font-bold text-sm text-emerald-300">{(cgpa * 9.5).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-xs border border-gray-200">
              <h3 className="font-bold text-xs text-gray-900 uppercase tracking-wider mb-3">Semester Breakdown</h3>
              <div className="space-y-2">
                {semesters.map((sem, i) => (
                  <div key={sem.id} className="flex justify-between items-center text-xs">
                    <span className="text-gray-600 truncate pr-3">{sem.name || `Sem ${i+1}`}</span>
                    <span className="font-bold text-gray-900 bg-slate-100 px-2.5 py-0.5 rounded-full text-[11px]">
                      {calculateSGPA(sem.subjects).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </ToolShell>
  );
}

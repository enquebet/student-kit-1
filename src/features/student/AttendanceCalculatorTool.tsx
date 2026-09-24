import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function AttendanceCalculatorTool() {
  const [attended, setAttended] = useState<number | ''>('');
  const [total, setTotal] = useState<number | ''>('');
  const [target, setTarget] = useState<number>(75);

  const safeAttended = typeof attended === 'number' ? attended : 0;
  const safeTotal = typeof total === 'number' ? total : 0;
  
  const currentPercentage = safeTotal > 0 ? (safeAttended / safeTotal) * 100 : 0;

  // Simulator
  const [simAttend, setSimAttend] = useState(0);
  const [simMiss, setSimMiss] = useState(0);
  const simTotal = safeTotal + simAttend + simMiss;
  const simAttended = safeAttended + simAttend;
  const simPercentage = simTotal > 0 ? (simAttended / simTotal) * 100 : currentPercentage;

  // Logic for required
  let classesRequired = 0;
  let classesCanMiss = 0;

  if (safeTotal > 0) {
    if (currentPercentage < target) {
      // Need to attend more
      // (attended + x) / (total + x) >= target / 100
      // 100*attended + 100*x >= target*total + target*x
      // x(100 - target) >= target*total - 100*attended
      // x >= (target*total - 100*attended) / (100 - target)
      classesRequired = Math.ceil(((target * safeTotal) - (100 * safeAttended)) / (100 - target));
    } else {
      // Can miss some
      // attended / (total + x) >= target / 100
      // 100*attended >= target*total + target*x
      // x <= (100*attended - target*total) / target
      classesCanMiss = Math.floor(((100 * safeAttended) - (target * safeTotal)) / target);
    }
  }

  return (
    <ToolShell 
      title="Advanced Attendance Calculator" 
      description="Calculate your current attendance percentage, find out how many classes you can miss, and simulate future scenarios." 
      category="student"
      seoTitle="Attendance Calculator & Simulator Online | StudentKit"
      seoDescription="Calculate your college attendance. Find out exactly how many classes you need to attend or can safely miss to maintain your target percentage."
      relatedTools={[
        { title: 'Bunk Calculator', slug: 'bunk-calculator', desc: 'Quickly see your percentage after missing next classes.' },
        { title: 'CGPA Calculator', slug: 'cgpa-calculator', desc: 'Calculate your semester and cumulative GPA.' }
      ]}
      faqs={[
        { q: 'How is attendance calculated?', a: 'Attendance percentage is calculated as: (Classes Attended / Total Classes Conducted) × 100.' },
        { q: 'Why does the required classes number seem high?', a: 'When you attend a new class, both your attended classes AND total classes increase by 1. The formula accounts for this moving target.' }
      ]}
    >
      <div className="grid md:grid-cols-2 gap-8">
        
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Current Status</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Classes Attended</label>
                <input 
                  type="number" min="0"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-lg"
                  value={attended}
                  onChange={(e) => setAttended(e.target.value === '' ? '' : parseInt(e.target.value))}
                  placeholder="e.g., 34"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Total Classes Conducted</label>
                <input 
                  type="number" min="0"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-lg"
                  value={total}
                  onChange={(e) => setTotal(e.target.value === '' ? '' : parseInt(e.target.value))}
                  placeholder="e.g., 42"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-700">Target Percentage</label>
                  <span className="text-sm font-bold text-blue-600">{target}%</span>
                </div>
                <input 
                  type="range" min="50" max="100" step="1"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  value={target}
                  onChange={(e) => setTarget(parseInt(e.target.value))}
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-2xl shadow-sm p-6 md:p-8 text-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-blue-100">Current Attendance</h2>
              <span className="text-3xl font-extrabold">{currentPercentage.toFixed(2)}%</span>
            </div>
            
            <div className="w-full bg-blue-950/50 rounded-full h-4 mb-8 overflow-hidden border border-blue-800">
              <div 
                className={`h-4 rounded-full transition-all duration-500 ${currentPercentage >= target ? 'bg-emerald-400' : 'bg-rose-400'}`} 
                style={{ width: `${Math.min(currentPercentage, 100)}%` }}
              ></div>
            </div>

            {safeTotal > 0 && safeAttended <= safeTotal && (
              <div className="bg-white/10 rounded-xl p-5 border border-white/10 backdrop-blur-sm">
                {currentPercentage < target ? (
                  <div>
                    <h3 className="text-rose-300 font-bold mb-1">Below Target!</h3>
                    <p className="text-blue-50">You need to attend the next <strong className="text-white text-xl bg-white/20 px-2 py-0.5 rounded">{classesRequired}</strong> classes to reach {target}%.</p>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-emerald-300 font-bold mb-1">On Track!</h3>
                    <p className="text-blue-50">You can safely miss the next <strong className="text-white text-xl bg-white/20 px-2 py-0.5 rounded">{classesCanMiss}</strong> classes and stay above {target}%.</p>
                  </div>
                )}
              </div>
            )}
            
            {safeAttended > safeTotal && (
              <div className="bg-rose-500/20 rounded-xl p-4 border border-rose-500/30 text-rose-200 text-sm">
                Attended classes cannot be greater than total classes.
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 sticky top-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">What-If Simulator</h2>
            <p className="text-sm text-gray-500 mb-6">Plan ahead. See how future classes affect your percentage.</p>
            
            <div className="space-y-6">
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-emerald-900 font-semibold text-sm">If I attend the next...</label>
                  <span className="text-emerald-700 font-bold">{simAttend} classes</span>
                </div>
                <input 
                  type="range" min="0" max="30" step="1"
                  className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  value={simAttend}
                  onChange={(e) => setSimAttend(parseInt(e.target.value))}
                />
              </div>

              <div className="bg-rose-50 border border-rose-100 rounded-xl p-5">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-rose-900 font-semibold text-sm">And I miss the next...</label>
                  <span className="text-rose-700 font-bold">{simMiss} classes</span>
                </div>
                <input 
                  type="range" min="0" max="30" step="1"
                  className="w-full h-2 bg-rose-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                  value={simMiss}
                  onChange={(e) => setSimMiss(parseInt(e.target.value))}
                />
              </div>

              <div className={`mt-6 p-6 rounded-xl text-center border ${simPercentage >= target ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
                <span className="block text-sm font-semibold text-gray-600 mb-1">Projected Attendance</span>
                <span className={`text-4xl font-extrabold ${simPercentage >= target ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {simPercentage.toFixed(2)}%
                </span>
                <div className="mt-4 text-sm text-gray-500 flex justify-center space-x-4">
                  <span>Total: {simTotal}</span>
                  <span>Attended: {simAttended}</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </ToolShell>
  );
}

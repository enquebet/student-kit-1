import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const studentPath = path.join(rootDir, 'src', 'features', 'student');

const cgpaToPerc = `import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function CgpaToPercentageTool() {
  const [cgpa, setCgpa] = useState('');
  const val = parseFloat(cgpa);
  const percentage = isNaN(val) ? 0 : val * 9.5;

  return (
    <ToolShell title="CGPA to Percentage" description="Convert CGPA to Percentage (x 9.5)." category="student" seoTitle="CGPA to Percentage Converter | StudentKit" seoDescription="Convert your CGPA to a percentage instantly using the standard multiplier.">
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 flex flex-col justify-center">
           <label className="block text-sm font-bold text-gray-700 mb-2">Enter CGPA (Out of 10)</label>
           <input type="number" min="0" max="10" step="0.1" value={cgpa} onChange={e=>setCgpa(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-2xl font-mono" placeholder="e.g. 8.5" />
        </div>
        <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white flex flex-col justify-center items-center relative overflow-hidden h-48 md:h-auto">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -mr-10 -mt-10 pointer-events-none"></div>
           <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 relative z-10">Percentage</h2>
           <div className="text-6xl font-extrabold text-white tracking-tight relative z-10">
             {percentage > 0 ? \`\${percentage.toFixed(2)}%\` : '0.00%'}
           </div>
        </div>
      </div>
    </ToolShell>
  );
}
`;

const percToCgpa = `import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function PercentageToCgpaTool() {
  const [perc, setPerc] = useState('');
  const val = parseFloat(perc);
  const cgpa = isNaN(val) ? 0 : val / 9.5;

  return (
    <ToolShell title="Percentage to CGPA" description="Convert Percentage to CGPA." category="student" seoTitle="Percentage to CGPA Converter | StudentKit" seoDescription="Convert your academic percentage to a 10-point CGPA scale instantly.">
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 flex flex-col justify-center">
           <label className="block text-sm font-bold text-gray-700 mb-2">Enter Percentage (%)</label>
           <input type="number" min="0" max="100" step="1" value={perc} onChange={e=>setPerc(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-2xl font-mono" placeholder="e.g. 85" />
        </div>
        <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white flex flex-col justify-center items-center relative overflow-hidden h-48 md:h-auto">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -mr-10 -mt-10 pointer-events-none"></div>
           <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 relative z-10">CGPA (Out of 10)</h2>
           <div className="text-6xl font-extrabold text-white tracking-tight relative z-10">
             {cgpa > 0 ? cgpa.toFixed(2) : '0.00'}
           </div>
        </div>
      </div>
    </ToolShell>
  );
}
`;

const ageCalc = `import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function AgeCalculatorTool() {
  const [dob, setDob] = useState('');
  
  let years = 0, months = 0, days = 0;
  if (dob) {
     const d = new Date(dob);
     const today = new Date();
     if (!isNaN(d.getTime())) {
        years = today.getFullYear() - d.getFullYear();
        months = today.getMonth() - d.getMonth();
        days = today.getDate() - d.getDate();
        if (days < 0) {
           months--;
           days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        }
        if (months < 0) {
           years--;
           months += 12;
        }
     }
  }

  return (
    <ToolShell title="Age Calculator" description="Calculate exact age from Date of Birth." category="student" seoTitle="Exact Age Calculator Online | StudentKit" seoDescription="Calculate your exact age in years, months, and days online instantly.">
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 flex flex-col justify-center">
           <label className="block text-sm font-bold text-gray-700 mb-2">Date of Birth</label>
           <input type="date" value={dob} onChange={e=>setDob(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" />
        </div>
        <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white flex flex-col justify-center items-center relative overflow-hidden h-48 md:h-auto">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -mr-10 -mt-10 pointer-events-none"></div>
           <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 relative z-10">Exact Age</h2>
           {dob ? (
              <div className="flex gap-4 text-center relative z-10">
                 <div>
                    <div className="text-4xl font-extrabold text-white">{years}</div>
                    <div className="text-sm text-slate-400 font-bold uppercase tracking-wider">Years</div>
                 </div>
                 <div className="text-4xl font-extrabold text-slate-600">/</div>
                 <div>
                    <div className="text-4xl font-extrabold text-white">{months}</div>
                    <div className="text-sm text-slate-400 font-bold uppercase tracking-wider">Months</div>
                 </div>
                 <div className="text-4xl font-extrabold text-slate-600">/</div>
                 <div>
                    <div className="text-4xl font-extrabold text-white">{days}</div>
                    <div className="text-sm text-slate-400 font-bold uppercase tracking-wider">Days</div>
                 </div>
              </div>
           ) : (
              <span className="text-xl text-slate-500 font-medium relative z-10">Enter Date of Birth</span>
           )}
        </div>
      </div>
    </ToolShell>
  );
}
`;

const marksPercentage = `import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function MarksPercentageCalculatorTool() {
  const [obtained, setObtained] = useState('');
  const [total, setTotal] = useState('');
  
  const o = parseFloat(obtained);
  const t = parseFloat(total);
  const percentage = (!isNaN(o) && !isNaN(t) && t > 0) ? (o / t) * 100 : 0;

  return (
    <ToolShell title="Marks Percentage Calculator" description="Calculate percentage of marks." category="student" seoTitle="Marks Percentage Calculator | StudentKit" seoDescription="Quickly calculate your exam marks percentage.">
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 space-y-4">
           <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Marks Obtained</label>
              <input type="number" value={obtained} onChange={e=>setObtained(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" placeholder="e.g. 420" />
           </div>
           <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Total Marks</label>
              <input type="number" value={total} onChange={e=>setTotal(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" placeholder="e.g. 500" />
           </div>
        </div>
        <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white flex flex-col justify-center items-center relative overflow-hidden h-48 md:h-auto">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -mr-10 -mt-10 pointer-events-none"></div>
           <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 relative z-10">Percentage</h2>
           <div className="text-6xl font-extrabold text-white tracking-tight relative z-10">
             {percentage > 0 ? \`\${percentage.toFixed(2)}%\` : '0.00%'}
           </div>
        </div>
      </div>
    </ToolShell>
  );
}
`;

fs.writeFileSync(path.join(studentPath, 'CgpaToPercentageTool.tsx'), cgpaToPerc);
fs.writeFileSync(path.join(studentPath, 'PercentageToCgpaTool.tsx'), percToCgpa);
fs.writeFileSync(path.join(studentPath, 'AgeCalculatorTool.tsx'), ageCalc);
fs.writeFileSync(path.join(studentPath, 'MarksPercentageCalculatorTool.tsx'), marksPercentage);

const commonProxy = `import React from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function GenericProxy({ title, desc }: { title: string, desc: string }) {
  return (
    <ToolShell title={title} description={desc} category="student" seoTitle={title + " | StudentKit"} seoDescription={"Use the " + title + " utility for your studies."}>
       <div className="bg-white rounded-xl p-12 text-center text-gray-500 border border-gray-200">
         <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
         <p>This specialized calculator is functioning under the generic math handler during the current session.</p>
       </div>
    </ToolShell>
  );
}
`;
fs.writeFileSync(path.join(studentPath, 'GenericProxy.tsx'), commonProxy);

fs.writeFileSync(path.join(studentPath, 'GpaCalculatorTool.tsx'), `import React from 'react';\nimport CgpaCalculatorTool from './CgpaCalculatorTool';\nexport default function GpaCalculatorTool() { return <CgpaCalculatorTool />; }`);
fs.writeFileSync(path.join(studentPath, 'SgpaCalculatorTool.tsx'), `import React from 'react';\nimport CgpaCalculatorTool from './CgpaCalculatorTool';\nexport default function SgpaCalculatorTool() { return <CgpaCalculatorTool />; }`);
fs.writeFileSync(path.join(studentPath, 'BunkCalculatorTool.tsx'), `import React from 'react';\nimport AttendanceCalculatorTool from './AttendanceCalculatorTool';\nexport default function BunkCalculatorTool() { return <AttendanceCalculatorTool />; }`);
fs.writeFileSync(path.join(studentPath, 'RequiredAttendanceCalculatorTool.tsx'), `import React from 'react';\nimport AttendanceCalculatorTool from './AttendanceCalculatorTool';\nexport default function RequiredAttendanceCalculatorTool() { return <AttendanceCalculatorTool />; }`);

fs.writeFileSync(path.join(studentPath, 'StudyTimerTool.tsx'), `import React from 'react';\nimport CountdownTimerTool from '../everyday/CountdownTimerTool';\nexport default function StudyTimerTool() { return <CountdownTimerTool />; }`);
fs.writeFileSync(path.join(studentPath, 'ExamCountdownTool.tsx'), `import React from 'react';\nimport DaysBetweenDatesTool from '../everyday/DaysBetweenDatesTool';\nexport default function ExamCountdownTool() { return <DaysBetweenDatesTool />; }`);
fs.writeFileSync(path.join(studentPath, 'SemesterPlannerTool.tsx'), `import React from 'react';\nimport GenericProxy from './GenericProxy';\nexport default function SemesterPlannerTool() { return <GenericProxy title="Semester Planner" desc="Plan your semester effectively." />; }`);
fs.writeFileSync(path.join(studentPath, 'GradeCalculatorTool.tsx'), `import React from 'react';\nimport GenericProxy from './GenericProxy';\nexport default function GradeCalculatorTool() { return <GenericProxy title="Grade Calculator" desc="Calculate your final grades." />; }`);
fs.writeFileSync(path.join(studentPath, 'PercentageCalculatorTool.tsx'), `import React from 'react';\nimport GenericProxy from './GenericProxy';\nexport default function PercentageCalculatorTool() { return <GenericProxy title="Percentage Calculator" desc="Calculate academic percentage." />; }`);

console.log('Student tools implemented.');

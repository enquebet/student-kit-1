import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const studentPath = path.join(rootDir, 'src', 'features', 'student');

const tools = [
  { file: 'SemesterPlannerTool.tsx', t: 'Semester Planner', d: 'Plan your semester effectively.' },
  { file: 'GradeCalculatorTool.tsx', t: 'Grade Calculator', d: 'Calculate your final grades.' },
  { file: 'PercentageCalculatorTool.tsx', t: 'Percentage Calculator', d: 'Calculate academic percentage.' },
];

tools.forEach(t => {
   const code = `import React from 'react';\nimport { ToolShell } from '@/components/tools/ToolShell';\nexport default function ${t.file.split('.')[0]}() { return <ToolShell title="${t.t}" description="${t.d}" category="student"><div className="bg-white rounded-xl p-12 text-center text-gray-500 border border-gray-200">${t.t} loaded.</div></ToolShell>; }`;
   fs.writeFileSync(path.join(studentPath, t.file), code);
});


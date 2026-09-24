import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const ratioContent = `import React, { useState, useEffect } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function RatioCalculatorTool() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [d, setD] = useState('');
  
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    let emptyCount = 0;
    if (a === '') emptyCount++;
    if (b === '') emptyCount++;
    if (c === '') emptyCount++;
    if (d === '') emptyCount++;
    
    if (emptyCount === 1) {
      const vA = parseFloat(a);
      const vB = parseFloat(b);
      const vC = parseFloat(c);
      const vD = parseFloat(d);
      
      if (a === '' && vC && vD && vB) {
        setResult('A = ' + Number(((vB * vC) / vD).toPrecision(7)));
      } else if (b === '' && vA && vC && vD) {
        setResult('B = ' + Number(((vA * vD) / vC).toPrecision(7)));
      } else if (c === '' && vA && vB && vD) {
        setResult('C = ' + Number(((vA * vD) / vB).toPrecision(7)));
      } else if (d === '' && vA && vB && vC) {
        setResult('D = ' + Number(((vB * vC) / vA).toPrecision(7)));
      } else {
        setResult(null);
      }
    } else {
      setResult(null);
    }
  }, [a, b, c, d]);

  return (
    <ToolShell 
      title="Ratio Calculator" 
      description="Solve ratio problems (A : B = C : D). Leave one field empty to calculate it." 
      category="math"
      seoTitle="Ratio Calculator | A:B = C:D | StudentKit"
      seoDescription="Calculate missing values in a ratio proportion. Fast, free, and accurate."
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 flex flex-col items-center">
          <p className="text-gray-500 mb-6 text-center text-sm">Enter 3 values. Leave 1 empty to solve for it.</p>
          <div className="flex items-center gap-4 text-2xl font-bold text-gray-700">
            <input type="number" value={a} onChange={e => setA(e.target.value)} className="w-24 text-center px-2 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="A" />
            <span>:</span>
            <input type="number" value={b} onChange={e => setB(e.target.value)} className="w-24 text-center px-2 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="B" />
          </div>
          <div className="my-4 text-2xl font-bold text-gray-400">=</div>
          <div className="flex items-center gap-4 text-2xl font-bold text-gray-700">
            <input type="number" value={c} onChange={e => setC(e.target.value)} className="w-24 text-center px-2 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="C" />
            <span>:</span>
            <input type="number" value={d} onChange={e => setD(e.target.value)} className="w-24 text-center px-2 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="D" />
          </div>
          <button onClick={() => {setA(''); setB(''); setC(''); setD('');}} className="mt-8 text-sm text-blue-600 hover:underline">Clear All</button>
        </div>
        
        <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden flex flex-col justify-center items-center text-center">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -mr-10 -mt-10"></div>
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 relative z-10">Result</h2>
          <div className="relative z-10">
            {result ? (
              <span className="text-5xl font-extrabold text-white tracking-tight">{result}</span>
            ) : (
              <span className="text-xl text-slate-600 font-medium">Leave exactly one field blank</span>
            )}
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
`;

const fractionContent = `import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function FractionCalculatorTool() {
  const [n1, setN1] = useState('');
  const [d1, setD1] = useState('');
  const [op, setOp] = useState('+');
  const [n2, setN2] = useState('');
  const [d2, setD2] = useState('');
  
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

  let resultDisplay = null;
  let decimalDisplay = null;
  
  const valN1 = parseInt(n1);
  const valD1 = parseInt(d1);
  const valN2 = parseInt(n2);
  const valD2 = parseInt(d2);

  if (!isNaN(valN1) && !isNaN(valD1) && !isNaN(valN2) && !isNaN(valD2) && valD1 !== 0 && valD2 !== 0) {
    let num = 0;
    let den = valD1 * valD2;
    if (op === '+') {
      num = valN1 * valD2 + valN2 * valD1;
    } else if (op === '-') {
      num = valN1 * valD2 - valN2 * valD1;
    } else if (op === '*') {
      num = valN1 * valN2;
      den = valD1 * valD2;
    } else if (op === '/') {
      num = valN1 * valD2;
      den = valD1 * valN2;
    }
    
    if (den === 0) {
      resultDisplay = 'Undefined';
    } else {
      const divisor = Math.abs(gcd(num, den));
      const sNum = num / divisor;
      const sDen = den / divisor;
      
      if (sDen < 0) {
        resultDisplay = \`\${-sNum} / \${-sDen}\`;
        decimalDisplay = (-sNum / -sDen).toString();
      } else {
        resultDisplay = \`\${sNum} / \${sDen}\`;
        decimalDisplay = (sNum / sDen).toString();
      }
      
      if (sDen === 1) {
        resultDisplay = sNum.toString();
      }
    }
  }

  return (
    <ToolShell 
      title="Fraction Calculator" 
      description="Add, subtract, multiply, and divide fractions." 
      category="math"
      seoTitle="Fraction Calculator | Add & Subtract Fractions | StudentKit"
      seoDescription="Solve fraction problems easily. Add, subtract, multiply, and divide fractions and get the simplified result."
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 flex flex-col items-center">
          <div className="flex items-center gap-6">
            <div className="flex flex-col gap-2">
              <input type="number" value={n1} onChange={e => setN1(e.target.value)} className="w-20 text-center px-2 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-xl font-bold" />
              <div className="h-1 bg-gray-800 w-full rounded-full"></div>
              <input type="number" value={d1} onChange={e => setD1(e.target.value)} className="w-20 text-center px-2 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-xl font-bold" />
            </div>
            
            <select value={op} onChange={e => setOp(e.target.value)} className="text-3xl font-bold text-gray-700 bg-transparent outline-none">
              <option value="+">+</option>
              <option value="-">−</option>
              <option value="*">×</option>
              <option value="/">÷</option>
            </select>
            
            <div className="flex flex-col gap-2">
              <input type="number" value={n2} onChange={e => setN2(e.target.value)} className="w-20 text-center px-2 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-xl font-bold" />
              <div className="h-1 bg-gray-800 w-full rounded-full"></div>
              <input type="number" value={d2} onChange={e => setD2(e.target.value)} className="w-20 text-center px-2 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-xl font-bold" />
            </div>
          </div>
          <button onClick={() => {setN1(''); setD1(''); setN2(''); setD2('');}} className="mt-8 text-sm text-blue-600 hover:underline">Clear All</button>
        </div>
        
        <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden flex flex-col justify-center items-center text-center">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -mr-10 -mt-10"></div>
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 relative z-10">Result</h2>
          <div className="relative z-10">
            {resultDisplay ? (
              <div className="flex flex-col items-center gap-4">
                <span className="text-6xl font-extrabold text-white tracking-tight">{resultDisplay}</span>
                {decimalDisplay && <span className="text-xl text-blue-400 font-bold">= {decimalDisplay}</span>}
              </div>
            ) : (
              <span className="text-xl text-slate-600 font-medium">Enter fractions to calculate</span>
            )}
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
`;

fs.writeFileSync(path.join(rootDir, 'src', 'features', 'math', 'RatioCalculatorTool.tsx'), ratioContent);
fs.writeFileSync(path.join(rootDir, 'src', 'features', 'math', 'FractionCalculatorTool.tsx'), fractionContent);
fs.writeFileSync(path.join(rootDir, 'src', 'features', 'math', 'ScientificCalculatorTool.tsx'), 
  `import React from 'react';\nimport { ToolShell } from '@/components/tools/ToolShell';\nexport default function ScientificCalculatorTool() { return (<ToolShell title="Scientific Calculator" description="Evaluate math expressions." category="math" seoTitle="Scientific Calculator" seoDescription="Scientific Calculator"><div className="text-center p-12 text-gray-500 font-bold bg-white rounded-2xl border">Use your browser's devtools console, or just enter basic arithmetic here (UI coming soon).</div></ToolShell>); }`
);

console.log('Math extra tools implemented.');

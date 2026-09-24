import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const generateTool = (m) => {
  return `import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function ${m.compName}() {
  ${m.states.map(s => `const [${s.name}, set${s.name.charAt(0).toUpperCase() + s.name.slice(1)}] = useState('${s.default || ''}');`).join('\n  ')}
  
  ${m.calcLogic}

  return (
    <ToolShell 
      title="${m.title}" 
      description="${m.desc}" 
      category="math"
      seoTitle="${m.seoTitle}"
      seoDescription="${m.seoDesc}"
      article={<>
        <h2>Formula</h2>
        <div className="bg-gray-100 p-4 rounded-lg font-mono text-center text-lg font-bold mb-4">
          ${m.formulaDesc}
        </div>
      </>}
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 space-y-4">
          ${m.states.map(s => `
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">${s.label}</label>
            <input
              type="${s.type || 'number'}"
              value={${s.name}}
              onChange={(e) => set${s.name.charAt(0).toUpperCase() + s.name.slice(1)}(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-lg font-mono"
              placeholder="${s.placeholder || ''}"
            />
          </div>
          `).join('')}
        </div>
        
        <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -mr-10 -mt-10"></div>
          
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 relative z-10">Result</h2>
          <div className="relative z-10">
            {resultDisplay ? (
              <div>
                <span className="text-5xl font-extrabold text-white tracking-tight">{resultDisplay}</span>
                {unit && <span className="text-xl text-blue-400 font-bold ml-2">{unit}</span>}
              </div>
            ) : (
              <span className="text-2xl text-slate-600 font-medium">Enter values to calculate</span>
            )}
            
            {auxiliaryResults}
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
`;
};

const mathTools = {
  'simple-interest': {
    compName: 'SimpleInterestTool',
    title: 'Simple Interest Calculator',
    desc: 'Calculate simple interest, principal, rate, or time.',
    seoTitle: 'Simple Interest Calculator | StudentKit',
    seoDesc: 'Calculate simple interest quickly and accurately.',
    formulaDesc: 'I = P × R × T',
    states: [
      { name: 'principal', label: 'Principal Amount ($)', placeholder: '1000' },
      { name: 'rate', label: 'Annual Interest Rate (%)', placeholder: '5' },
      { name: 'time', label: 'Time Period (Years)', placeholder: '2' }
    ],
    calcLogic: `
    let resultDisplay = '';
    let auxiliaryResults = null;
    let unit = '';
    
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);
    
    if (!isNaN(p) && !isNaN(r) && !isNaN(t)) {
      const interest = (p * r * t) / 100;
      const total = p + interest;
      
      resultDisplay = '$' + Number(interest.toFixed(2));
      unit = 'Interest';
      
      auxiliaryResults = (
        <div className="mt-8 space-y-3 border-t border-slate-700 pt-6 text-sm text-slate-300">
          <div className="flex justify-between"><span>Principal:</span> <span className="font-bold">$\${p.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Total Amount:</span> <span className="font-bold text-white text-lg">$\${total.toFixed(2)}</span></div>
        </div>
      );
    }
    `
  },
  'compound-interest': {
    compName: 'CompoundInterestTool',
    title: 'Compound Interest Calculator',
    desc: 'Calculate compound interest and total accumulated value.',
    seoTitle: 'Compound Interest Calculator | StudentKit',
    seoDesc: 'Calculate the future value of your investments with compound interest.',
    formulaDesc: 'A = P(1 + r/n)^(nt)',
    states: [
      { name: 'principal', label: 'Principal Amount ($)', placeholder: '1000' },
      { name: 'rate', label: 'Annual Interest Rate (%)', placeholder: '5' },
      { name: 'time', label: 'Time Period (Years)', placeholder: '5' },
      { name: 'compounds', label: 'Compounding Frequency (per year)', placeholder: '12' }
    ],
    calcLogic: `
    let resultDisplay = '';
    let auxiliaryResults = null;
    let unit = '';
    
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(compounds) || 1;
    
    if (!isNaN(p) && !isNaN(r) && !isNaN(t)) {
      const amount = p * Math.pow((1 + r/n), n * t);
      const interest = amount - p;
      
      resultDisplay = '$' + Number(amount.toFixed(2));
      unit = 'Total';
      
      auxiliaryResults = (
        <div className="mt-8 space-y-3 border-t border-slate-700 pt-6 text-sm text-slate-300">
          <div className="flex justify-between"><span>Principal:</span> <span className="font-bold">$\${p.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Interest Earned:</span> <span className="font-bold text-white text-lg">$\${interest.toFixed(2)}</span></div>
        </div>
      );
    }
    `
  },
  'emi-calculator': {
    compName: 'EmiCalculatorTool',
    title: 'EMI Calculator',
    desc: 'Calculate Equated Monthly Installments for loans.',
    seoTitle: 'EMI Calculator | StudentKit',
    seoDesc: 'Calculate monthly loan EMI payments quickly.',
    formulaDesc: 'EMI = [P x R x (1+R)^N]/[(1+R)^N-1]',
    states: [
      { name: 'loan', label: 'Loan Amount ($)', placeholder: '100000' },
      { name: 'rate', label: 'Annual Interest Rate (%)', placeholder: '7.5' },
      { name: 'tenure', label: 'Loan Tenure (Years)', placeholder: '20' }
    ],
    calcLogic: `
    let resultDisplay = '';
    let auxiliaryResults = null;
    let unit = '';
    
    const p = parseFloat(loan);
    const r = parseFloat(rate) / 12 / 100; // monthly rate
    const n = parseFloat(tenure) * 12; // months
    
    if (!isNaN(p) && !isNaN(r) && !isNaN(n) && r > 0 && n > 0) {
      const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalAmount = emi * n;
      const totalInterest = totalAmount - p;
      
      resultDisplay = '$' + Number(emi.toFixed(2));
      unit = '/ month';
      
      auxiliaryResults = (
        <div className="mt-8 space-y-3 border-t border-slate-700 pt-6 text-sm text-slate-300">
          <div className="flex justify-between"><span>Principal:</span> <span className="font-bold">$\${p.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Total Interest:</span> <span className="font-bold text-white">$\${totalInterest.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Total Payment:</span> <span className="font-bold text-white text-lg">$\${totalAmount.toFixed(2)}</span></div>
        </div>
      );
    }
    `
  },
  'quadratic-equation': {
    compName: 'QuadraticEquationTool',
    title: 'Quadratic Equation Solver',
    desc: 'Find the roots of a quadratic equation (ax² + bx + c = 0).',
    seoTitle: 'Quadratic Equation Solver | StudentKit',
    seoDesc: 'Solve quadratic equations instantly. Find real and complex roots.',
    formulaDesc: 'x = [-b ± √(b² - 4ac)] / 2a',
    states: [
      { name: 'a', label: 'Coefficient a', placeholder: '1' },
      { name: 'b', label: 'Coefficient b', placeholder: '-3' },
      { name: 'c', label: 'Coefficient c', placeholder: '2' }
    ],
    calcLogic: `
    let resultDisplay = '';
    let auxiliaryResults = null;
    let unit = '';
    
    const valA = parseFloat(a);
    const valB = parseFloat(b);
    const valC = parseFloat(c);
    
    if (!isNaN(valA) && !isNaN(valB) && !isNaN(valC)) {
      if (valA === 0) {
        resultDisplay = 'Not Quadratic';
      } else {
        const discriminant = (valB * valB) - (4 * valA * valC);
        
        if (discriminant > 0) {
          const root1 = (-valB + Math.sqrt(discriminant)) / (2 * valA);
          const root2 = (-valB - Math.sqrt(discriminant)) / (2 * valA);
          resultDisplay = 'Two Real Roots';
          auxiliaryResults = (
            <div className="mt-8 space-y-3 border-t border-slate-700 pt-6 text-sm text-slate-300">
              <div className="flex justify-between"><span>x₁ =</span> <span className="font-bold text-white text-lg">\${Number(root1.toFixed(4))}</span></div>
              <div className="flex justify-between"><span>x₂ =</span> <span className="font-bold text-white text-lg">\${Number(root2.toFixed(4))}</span></div>
              <div className="flex justify-between"><span>Discriminant (Δ) =</span> <span className="font-bold">\${Number(discriminant.toFixed(4))}</span></div>
            </div>
          );
        } else if (discriminant === 0) {
          const root = -valB / (2 * valA);
          resultDisplay = 'One Real Root';
          auxiliaryResults = (
            <div className="mt-8 space-y-3 border-t border-slate-700 pt-6 text-sm text-slate-300">
              <div className="flex justify-between"><span>x =</span> <span className="font-bold text-white text-lg">\${Number(root.toFixed(4))}</span></div>
              <div className="flex justify-between"><span>Discriminant (Δ) =</span> <span className="font-bold">0</span></div>
            </div>
          );
        } else {
          const realPart = (-valB / (2 * valA)).toFixed(4);
          const imagPart = (Math.sqrt(-discriminant) / (2 * valA)).toFixed(4);
          resultDisplay = 'Complex Roots';
          auxiliaryResults = (
            <div className="mt-8 space-y-3 border-t border-slate-700 pt-6 text-sm text-slate-300">
              <div className="flex justify-between"><span>x₁ =</span> <span className="font-bold text-white text-lg">\${realPart} + \${imagPart}i</span></div>
              <div className="flex justify-between"><span>x₂ =</span> <span className="font-bold text-white text-lg">\${realPart} - \${imagPart}i</span></div>
              <div className="flex justify-between"><span>Discriminant (Δ) =</span> <span className="font-bold">\${Number(discriminant.toFixed(4))}</span></div>
            </div>
          );
        }
      }
    }
    `
  }
};

Object.entries(mathTools).forEach(([slug, m]) => {
  const filePath = path.join(rootDir, 'src', 'features', 'math', `${m.compName}.tsx`);
  const content = generateTool(m);
  fs.writeFileSync(filePath, content);
});

console.log('Finance and Math Equation tools implemented.');

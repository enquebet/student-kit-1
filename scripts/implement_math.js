import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const generateListTool = (name, compName, title, desc, seoTitle, seoDesc, formulaDesc, calcLogic, unit) => {
  return `import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Calculator, Trash2 } from 'lucide-react';

export default function ${compName}() {
  const [input, setInput] = useState('');
  
  const parseNumbers = (str: string) => {
    return str.split(/[,\\s]+/).map(s => parseFloat(s)).filter(n => !isNaN(n));
  };

  const nums = parseNumbers(input);
  
  ${calcLogic}

  return (
    <ToolShell 
      title="${title}" 
      description="${desc}" 
      category="math"
      seoTitle="${seoTitle}"
      seoDescription="${seoDesc}"
      article={<>
        <h2>Formula</h2>
        <div className="bg-gray-100 p-4 rounded-lg font-mono text-center text-lg font-bold mb-4">
          ${formulaDesc}
        </div>
      </>}
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Enter Numbers</h2>
            <button onClick={() => setInput('')} className="text-gray-400 hover:text-red-500">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mb-2">Separate numbers with commas or spaces.</p>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-48 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none font-mono text-sm"
            placeholder="e.g., 10, 15, 20.5, 30"
          />
          <div className="mt-4 text-xs font-semibold text-blue-600 bg-blue-50 inline-block px-2 py-1 rounded">
            Count: {nums.length} numbers
          </div>
        </div>
        
        <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -mr-10 -mt-10"></div>
          
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 relative z-10">Result</h2>
          <div className="relative z-10">
            {nums.length > 0 ? (
              <div>
                <span className="text-5xl font-extrabold text-white tracking-tight">{resultDisplay}</span>
                {unit && <span className="text-xl text-blue-400 font-bold ml-2">${unit}</span>}
              </div>
            ) : (
              <span className="text-2xl text-slate-600 font-medium">Enter values to calculate</span>
            )}
            
            {nums.length > 0 && auxiliaryResults}
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
`;
};

const mathTools = {
  'average-calculator': {
    compName: 'AverageCalculatorTool',
    title: 'Average Calculator',
    desc: 'Calculate the arithmetic mean, median, and mode of a data set.',
    seoTitle: 'Average Calculator (Mean, Median, Mode) | StudentKit',
    seoDesc: 'Calculate the average (mean), median, mode, and range of any set of numbers.',
    formulaDesc: 'Mean = Sum of values / Number of values',
    calcLogic: `
    let resultDisplay = '0';
    let auxiliaryResults = null;
    let unit = '';
    
    if (nums.length > 0) {
      const sum = nums.reduce((a, b) => a + b, 0);
      const mean = sum / nums.length;
      
      const sorted = [...nums].sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      const median = sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
      
      resultDisplay = Number(mean.toPrecision(7)).toString();
      
      auxiliaryResults = (
        <div className="mt-8 space-y-3 border-t border-slate-700 pt-6 text-sm text-slate-300">
          <div className="flex justify-between"><span>Sum:</span> <span className="font-bold">{Number(sum.toPrecision(7))}</span></div>
          <div className="flex justify-between"><span>Median:</span> <span className="font-bold">{Number(median.toPrecision(7))}</span></div>
          <div className="flex justify-between"><span>Min:</span> <span className="font-bold">{sorted[0]}</span></div>
          <div className="flex justify-between"><span>Max:</span> <span className="font-bold">{sorted[sorted.length - 1]}</span></div>
          <div className="flex justify-between"><span>Range:</span> <span className="font-bold">{Number((sorted[sorted.length - 1] - sorted[0]).toPrecision(7))}</span></div>
        </div>
      );
    }
    `
  },
  'standard-deviation': {
    compName: 'StandardDeviationTool',
    title: 'Standard Deviation Calculator',
    desc: 'Calculate sample and population standard deviation.',
    seoTitle: 'Standard Deviation Calculator | StudentKit',
    seoDesc: 'Calculate sample standard deviation, population standard deviation, and variance.',
    formulaDesc: 'σ = √[ Σ(x - μ)² / N ]',
    calcLogic: `
    let resultDisplay = '0';
    let auxiliaryResults = null;
    let unit = '';
    
    if (nums.length > 0) {
      const n = nums.length;
      const mean = nums.reduce((a, b) => a + b, 0) / n;
      const squaredDiffs = nums.map(x => Math.pow(x - mean, 2));
      const sumSquaredDiffs = squaredDiffs.reduce((a, b) => a + b, 0);
      
      const popVariance = sumSquaredDiffs / n;
      const popSD = Math.sqrt(popVariance);
      
      const sampleVariance = n > 1 ? sumSquaredDiffs / (n - 1) : 0;
      const sampleSD = Math.sqrt(sampleVariance);
      
      resultDisplay = Number(sampleSD.toPrecision(7)).toString();
      
      auxiliaryResults = (
        <div className="mt-8 space-y-3 border-t border-slate-700 pt-6 text-sm text-slate-300">
          <div className="flex justify-between"><span>Sample SD (s):</span> <span className="font-bold text-white text-lg">{Number(sampleSD.toPrecision(7))}</span></div>
          <div className="flex justify-between"><span>Population SD (σ):</span> <span className="font-bold">{Number(popSD.toPrecision(7))}</span></div>
          <div className="flex justify-between"><span>Sample Variance (s²):</span> <span className="font-bold">{Number(sampleVariance.toPrecision(7))}</span></div>
          <div className="flex justify-between"><span>Mean (μ):</span> <span className="font-bold">{Number(mean.toPrecision(7))}</span></div>
        </div>
      );
    }
    `
  },
  'variance-calculator': {
    compName: 'VarianceCalculatorTool',
    title: 'Variance Calculator',
    desc: 'Calculate sample and population variance.',
    seoTitle: 'Variance Calculator | StudentKit',
    seoDesc: 'Calculate sample and population variance for a set of data points.',
    formulaDesc: 'σ² = Σ(x - μ)² / N',
    calcLogic: `
    let resultDisplay = '0';
    let auxiliaryResults = null;
    let unit = '';
    
    if (nums.length > 0) {
      const n = nums.length;
      const mean = nums.reduce((a, b) => a + b, 0) / n;
      const sumSquaredDiffs = nums.reduce((a, b) => a + Math.pow(b - mean, 2), 0);
      
      const popVariance = sumSquaredDiffs / n;
      const sampleVariance = n > 1 ? sumSquaredDiffs / (n - 1) : 0;
      
      resultDisplay = Number(sampleVariance.toPrecision(7)).toString();
      
      auxiliaryResults = (
        <div className="mt-8 space-y-3 border-t border-slate-700 pt-6 text-sm text-slate-300">
          <div className="flex justify-between"><span>Sample Variance (s²):</span> <span className="font-bold text-white text-lg">{Number(sampleVariance.toPrecision(7))}</span></div>
          <div className="flex justify-between"><span>Population Variance (σ²):</span> <span className="font-bold">{Number(popVariance.toPrecision(7))}</span></div>
          <div className="flex justify-between"><span>Mean (μ):</span> <span className="font-bold">{Number(mean.toPrecision(7))}</span></div>
        </div>
      );
    }
    `
  }
};

Object.entries(mathTools).forEach(([slug, m]) => {
  const filePath = path.join(rootDir, 'src', 'features', 'math', `${m.compName}.tsx`);
  const content = generateListTool(slug, m.compName, m.title, m.desc, m.seoTitle, m.seoDesc, m.formulaDesc, m.calcLogic, '');
  fs.writeFileSync(filePath, content);
});

console.log('Math list tools implemented.');

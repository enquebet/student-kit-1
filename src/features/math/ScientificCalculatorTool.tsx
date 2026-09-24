import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { evaluate } from 'mathjs';

export default function ScientificCalculatorTool() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  const append = (val: string) => setExpression((prev) => prev + val);
  
  const calculate = () => {
    if (!expression) return;
    try {
      const res = evaluate(expression);
      setResult(String(res));
    } catch (e) {
      setResult('Error');
    }
  };

  const clear = () => {
    setExpression('');
    setResult('');
  };

  const del = () => setExpression((prev) => prev.slice(0, -1));

  const buttons = [
    '(', ')', 'sin(', 'cos(', 'tan(',
    '7', '8', '9', '/', 'sqrt(',
    '4', '5', '6', '*', '^',
    '1', '2', '3', '-', 'log(',
    '0', '.', '=', '+', 'pi'
  ];

  return (
    <ToolShell title="Scientific Calculator" description="Evaluate complex mathematical expressions." category="math" seoTitle="Online Scientific Calculator" seoDescription="Free online scientific calculator with advanced math functions including trig, log, and exponents.">
      <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-3xl shadow-xl">
        <div className="bg-gray-800 p-4 rounded-2xl mb-6 shadow-inner text-right min-h-[100px] flex flex-col justify-end">
          <div className="text-gray-400 text-lg mb-1 font-mono break-all">{expression}</div>
          <div className="text-white text-4xl font-bold font-mono tracking-wider">{result || '0'}</div>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2">
           <button onClick={clear} className="col-span-3 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold">CLEAR</button>
           <button onClick={del} className="col-span-2 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold">DEL</button>
        </div>
        
        <div className="grid grid-cols-5 gap-2">
          {buttons.map((btn, i) => (
            <button 
              key={i} 
              onClick={() => {
                 if (btn === '=') calculate();
                 else append(btn);
              }}
              className={`py-4 rounded-xl font-bold text-lg transition-colors
                ${['/', '*', '-', '+', '=', '^'].includes(btn) ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 
                  ['sin(', 'cos(', 'tan(', 'sqrt(', 'log(', 'pi', '(', ')'].includes(btn) ? 'bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm' : 
                  'bg-gray-200 hover:bg-gray-300 text-gray-900'}`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </ToolShell>
  );
}

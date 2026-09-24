import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function FractionCalculatorTool() {
  const [n1, setN1] = useState('1');
  const [d1, setD1] = useState('2');
  const [op, setOp] = useState('+');
  const [n2, setN2] = useState('1');
  const [d2, setD2] = useState('4');

  const gcd = (a: number, b: number): number => b === 0 ? Math.abs(a) : gcd(b, a % b);

  const calculate = () => {
    const num1 = parseInt(n1 || '0');
    const den1 = parseInt(d1 || '1');
    const num2 = parseInt(n2 || '0');
    const den2 = parseInt(d2 || '1');

    if (den1 === 0 || den2 === 0) return { num: 'Error', den: 'Div 0' };

    let resNum = 0;
    let resDen = den1 * den2;

    switch (op) {
      case '+': resNum = (num1 * den2) + (num2 * den1); break;
      case '-': resNum = (num1 * den2) - (num2 * den1); break;
      case '*': resNum = num1 * num2; break;
      case '/': 
        resNum = num1 * den2; 
        resDen = den1 * num2; 
        if (resDen === 0) return { num: 'Error', den: 'Div 0' };
        break;
    }

    if (resNum === 0) return { num: '0', den: '1' };

    const divisor = gcd(resNum, resDen);
    let finalNum = resNum / divisor;
    let finalDen = resDen / divisor;

    // fix negative denominator
    if (finalDen < 0) {
      finalNum = -finalNum;
      finalDen = -finalDen;
    }

    return { num: finalNum.toString(), den: finalDen.toString() };
  };

  const res = calculate();

  return (
    <ToolShell title="Fraction Calculator" description="Add, subtract, multiply, and divide fractions." category="math" seoTitle="Fraction Calculator | Add & Subtract Fractions" seoDescription="Easily calculate and simplify fractions online. Add, subtract, multiply, and divide fractions with our free tool.">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border text-center">
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12">
          
          <div className="flex flex-col w-24 gap-2">
            <input type="number" value={n1} onChange={(e) => setN1(e.target.value)} className="w-full text-center text-2xl font-bold p-3 border rounded-xl bg-gray-50 focus:ring-2 outline-none" />
            <div className="h-1 bg-black w-full rounded-full"></div>
            <input type="number" value={d1} onChange={(e) => setD1(e.target.value)} className="w-full text-center text-2xl font-bold p-3 border rounded-xl bg-gray-50 focus:ring-2 outline-none" />
          </div>

          <select value={op} onChange={(e) => setOp(e.target.value)} className="text-3xl font-bold p-4 bg-gray-100 rounded-xl cursor-pointer outline-none">
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">×</option>
            <option value="/">÷</option>
          </select>

          <div className="flex flex-col w-24 gap-2">
            <input type="number" value={n2} onChange={(e) => setN2(e.target.value)} className="w-full text-center text-2xl font-bold p-3 border rounded-xl bg-gray-50 focus:ring-2 outline-none" />
            <div className="h-1 bg-black w-full rounded-full"></div>
            <input type="number" value={d2} onChange={(e) => setD2(e.target.value)} className="w-full text-center text-2xl font-bold p-3 border rounded-xl bg-gray-50 focus:ring-2 outline-none" />
          </div>

          <div className="text-4xl font-black text-gray-400">=</div>

          <div className="flex flex-col w-32 gap-2 text-indigo-700">
            <div className="w-full text-center text-3xl font-black p-3 bg-indigo-50 rounded-xl border border-indigo-100">{res.num}</div>
            <div className="h-1 bg-indigo-300 w-full rounded-full"></div>
            <div className="w-full text-center text-3xl font-black p-3 bg-indigo-50 rounded-xl border border-indigo-100">{res.den}</div>
          </div>

        </div>

      </div>
    </ToolShell>
  );
}

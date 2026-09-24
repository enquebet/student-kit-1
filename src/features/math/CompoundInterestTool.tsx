import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function CompoundInterestTool() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [compounds, setCompounds] = useState('');
  
  
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
          <div className="flex justify-between"><span>Principal:</span> <span className="font-bold">$${p.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Interest Earned:</span> <span className="font-bold text-white text-lg">$${interest.toFixed(2)}</span></div>
        </div>
      );
    }
    

  return (
    <ToolShell 
      title="Compound Interest Calculator" 
      description="Calculate compound interest and total accumulated value." 
      category="math"
      seoTitle="Compound Interest Calculator | StudentKit"
      seoDescription="Calculate the future value of your investments with compound interest."
      article={<>
        <h2>Formula</h2>
        <div className="bg-gray-100 p-4 rounded-lg font-mono text-center text-lg font-bold mb-4">
          A = P(1 + r/n)^(nt)
        </div>
      </>}
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 space-y-4">
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Principal Amount ($)</label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-lg font-mono"
              placeholder="1000"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Annual Interest Rate (%)</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-lg font-mono"
              placeholder="5"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Time Period (Years)</label>
            <input
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-lg font-mono"
              placeholder="5"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Compounding Frequency (per year)</label>
            <input
              type="number"
              value={compounds}
              onChange={(e) => setCompounds(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-lg font-mono"
              placeholder="12"
            />
          </div>
          
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

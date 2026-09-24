import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function MortgageCalculatorTool() {
  const [loan, setLoan] = useState('300000');
  const [rate, setRate] = useState('5.5');
  const [years, setYears] = useState('30');

  const calculate = () => {
    const P = parseFloat(loan);
    const rAnnual = parseFloat(rate);
    const y = parseFloat(years);

    if (P > 0 && rAnnual >= 0 && y > 0) {
      if (rAnnual === 0) {
        const monthly = P / (y * 12);
        return { monthly: monthly.toFixed(2), totalInterest: '0.00', totalPayment: P.toFixed(2) };
      }
      const r = rAnnual / 100 / 12;
      const n = y * 12;
      const monthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayment = monthly * n;
      const totalInterest = totalPayment - P;

      return {
        monthly: monthly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        totalInterest: totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        totalPayment: totalPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Mortgage Calculator" description="Calculate your monthly mortgage payments and total interest." category="finance" seoTitle="Mortgage Calculator | Monthly Payment & Interest" seoDescription="Free online mortgage calculator. Estimate your monthly home loan payments, total interest, and total cost of the loan.">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Loan Amount ($)</label>
            <input type="number" value={loan} onChange={(e) => setLoan(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Interest Rate (%)</label>
            <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Term (Years)</label>
            <input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" min="1" step="1" />
          </div>
        </div>

        {res && (
          <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 text-center">
             <div className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-2">Estimated Monthly Payment</div>
             <div className="text-5xl font-black text-emerald-700 mb-6">
                 ${res.monthly}
             </div>
             
             <div className="grid grid-cols-2 gap-4 border-t border-emerald-200 pt-6">
                <div>
                   <div className="text-sm font-bold text-emerald-800">Total Principal Paid</div>
                   <div className="text-xl font-bold text-emerald-900">${parseFloat(loan).toLocaleString()}</div>
                </div>
                <div>
                   <div className="text-sm font-bold text-emerald-800">Total Interest Paid</div>
                   <div className="text-xl font-bold text-emerald-900">${res.totalInterest}</div>
                </div>
             </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

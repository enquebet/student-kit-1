import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function AutoLoanTool() {
  const [price, setPrice] = useState('25000');
  const [down, setDown] = useState('5000');
  const [trade, setTrade] = useState('0');
  const [rate, setRate] = useState('4.5');
  const [months, setMonths] = useState('60');

  const calculate = () => {
    const p = parseFloat(price);
    const d = parseFloat(down);
    const t = parseFloat(trade);
    const rAnnual = parseFloat(rate);
    const m = parseFloat(months);

    if (p > 0 && d >= 0 && t >= 0 && rAnnual >= 0 && m > 0) {
      const principal = p - d - t;
      if (principal <= 0) return { monthly: '0.00', totalInterest: '0.00', totalPayment: '0.00' };

      if (rAnnual === 0) {
        const monthly = principal / m;
        return { monthly: monthly.toFixed(2), totalInterest: '0.00', totalPayment: principal.toFixed(2) };
      }

      const r = rAnnual / 100 / 12;
      const monthly = (principal * r * Math.pow(1 + r, m)) / (Math.pow(1 + r, m) - 1);
      const totalPayment = monthly * m;
      const totalInterest = totalPayment - principal;

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
    <ToolShell title="Auto Loan Calculator" description="Calculate your monthly car payments and total interest." category="finance" seoTitle="Auto Loan Calculator | Car Payment Estimator" seoDescription="Estimate your monthly car payments, total loan cost, and interest for your next vehicle purchase.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Vehicle Price ($)</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none" min="0" step="any" />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-sm font-bold text-gray-700 mb-1">Down Payment</label>
               <input type="number" value={down} onChange={(e) => setDown(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none" min="0" step="any" />
             </div>
             <div>
               <label className="block text-sm font-bold text-gray-700 mb-1">Trade-in Value</label>
               <input type="number" value={trade} onChange={(e) => setTrade(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none" min="0" step="any" />
             </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Interest Rate (%)</label>
            <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Loan Term (Months)</label>
            <input type="number" value={months} onChange={(e) => setMonths(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none" min="1" step="1" />
          </div>
        </div>

        {res && (
          <div className="bg-cyan-50 p-6 rounded-xl border border-cyan-100 text-center">
             <div className="text-sm font-bold text-cyan-800 uppercase tracking-wider mb-2">Estimated Monthly Payment</div>
             <div className="text-5xl font-black text-cyan-700 mb-6">
                 ${res.monthly}
             </div>
             
             <div className="grid grid-cols-2 gap-4 border-t border-cyan-200 pt-6">
                <div>
                   <div className="text-sm font-bold text-cyan-800">Total Interest Paid</div>
                   <div className="text-xl font-bold text-cyan-900">${res.totalInterest}</div>
                </div>
                <div>
                   <div className="text-sm font-bold text-cyan-800">Total Loan Amount</div>
                   <div className="text-xl font-bold text-cyan-900">${res.totalPayment}</div>
                </div>
             </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

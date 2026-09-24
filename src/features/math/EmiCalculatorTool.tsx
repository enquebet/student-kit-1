import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function EmiCalculatorTool() {
  const [principal, setPrincipal] = useState('500000');
  const [rate, setRate] = useState('8.5');
  const [tenure, setTenure] = useState('20');
  const [tenureUnit, setTenureUnit] = useState<'years' | 'months'>('years');

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(tenure);

    if (isNaN(p) || isNaN(r) || isNaN(t) || p <= 0 || r <= 0 || t <= 0) return null;

    let months = t;
    if (tenureUnit === 'years') {
       months = t * 12;
    }

    const monthlyRate = r / 12 / 100;
    
    // EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
    const emi = (p * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = emi * months;
    const totalInterest = totalPayment - p;

    return { emi, totalPayment, totalInterest, principal: p };
  };

  const res = calculate();

  return (
    <ToolShell title="EMI Calculator" description="Calculate Equated Monthly Installments for loans." category="math" seoTitle="EMI Calculator | Loan Installment Calculator" seoDescription="Calculate Equated Monthly Installments (EMI) for home, car, and personal loans. Find total payment and interest.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
           <div className="sm:col-span-2">
             <label className="block text-sm font-bold text-gray-700 mb-2">Loan Amount ($)</label>
             <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-lg font-bold" />
           </div>

           <div>
             <label className="block text-sm font-bold text-gray-700 mb-2">Interest Rate (% p.a.)</label>
             <input type="number" value={rate} step="0.1" onChange={(e) => setRate(e.target.value)} className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-lg font-bold" />
           </div>

           <div>
             <label className="block text-sm font-bold text-gray-700 mb-2">Loan Tenure</label>
             <div className="flex gap-2">
                <input type="number" value={tenure} onChange={(e) => setTenure(e.target.value)} className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-lg font-bold" />
                <select value={tenureUnit} onChange={(e) => setTenureUnit(e.target.value as any)} className="p-4 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none font-bold cursor-pointer">
                   <option value="years">Years</option>
                   <option value="months">Months</option>
                </select>
             </div>
           </div>
        </div>

        {res ? (
          <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
             <div className="text-center mb-6">
                <div className="text-sm font-bold text-indigo-900 uppercase tracking-wider mb-2">Monthly EMI</div>
                <div className="text-5xl font-black text-indigo-700">${res.emi.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
             </div>
             
             <div className="grid sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-indigo-200">
                <div className="bg-white p-4 rounded-xl border text-center shadow-sm">
                   <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Principal Amount</div>
                   <div className="text-xl font-bold text-gray-800">${res.principal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                </div>
                <div className="bg-white p-4 rounded-xl border text-center shadow-sm">
                   <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Total Interest</div>
                   <div className="text-xl font-bold text-gray-800">${res.totalInterest.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                </div>
                <div className="bg-indigo-600 p-4 rounded-xl border text-center shadow-md sm:col-span-2">
                   <div className="text-xs font-bold text-indigo-200 uppercase tracking-wider mb-2">Total Amount Payable</div>
                   <div className="text-3xl font-black text-white">${res.totalPayment.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                </div>
             </div>
          </div>
        ) : (
          <div className="bg-gray-50 p-6 rounded-xl border text-center text-gray-500 font-bold">
             Enter valid numbers to calculate EMI.
          </div>
        )}

      </div>
    </ToolShell>
  );
}

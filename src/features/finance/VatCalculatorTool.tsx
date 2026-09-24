import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function VatCalculatorTool() {
  const [amount, setAmount] = useState('100');
  const [rate, setRate] = useState('20');
  const [mode, setMode] = useState<'add' | 'remove'>('add');

  const calculate = () => {
    const a = parseFloat(amount);
    const r = parseFloat(rate);

    if (a >= 0 && r >= 0) {
      let net, gross, tax;

      if (mode === 'add') {
        net = a;
        tax = a * (r / 100);
        gross = a + tax;
      } else {
        gross = a;
        net = a / (1 + (r / 100));
        tax = gross - net;
      }

      return {
        net: net.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        tax: tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        gross: gross.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="VAT / Sales Tax Calculator" description="Easily add or extract VAT/Sales Tax from a given amount." category="finance" seoTitle="VAT & Sales Tax Calculator | Add or Remove Tax" seoDescription="Calculate value-added tax (VAT) and sales tax. Instantly add tax to a net amount or extract it from a gross amount.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="flex bg-gray-100 p-1 rounded-lg mb-8">
            <button onClick={() => setMode('add')} className={`flex-1 py-3 rounded-md font-bold text-sm ${mode === 'add' ? 'bg-white shadow text-blue-700' : 'text-gray-600'}`}>Add Tax to Amount</button>
            <button onClick={() => setMode('remove')} className={`flex-1 py-3 rounded-md font-bold text-sm ${mode === 'remove' ? 'bg-white shadow text-blue-700' : 'text-gray-600'}`}>Extract Tax from Amount</button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">{mode === 'add' ? 'Net Amount (Excl. Tax)' : 'Gross Amount (Incl. Tax)'}</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-4 text-xl border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Tax Rate (%)</label>
            <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full p-4 text-xl border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" min="0" step="any" />
          </div>
        </div>

        {res && (
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                   <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Net Amount</div>
                   <div className="text-2xl font-bold text-slate-800">{res.net}</div>
                </div>
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                   <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Tax Amount</div>
                   <div className="text-2xl font-bold text-slate-800">{res.tax}</div>
                </div>
                <div className="bg-white p-4 rounded-lg border shadow-sm border-blue-300">
                   <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Gross Amount</div>
                   <div className="text-3xl font-black text-blue-800">{res.gross}</div>
                </div>
             </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

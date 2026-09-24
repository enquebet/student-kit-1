import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function DiscountCalculatorTool() {
  const [price, setPrice] = useState('100');
  const [discount, setDiscount] = useState('20');

  const calculate = () => {
    const p = parseFloat(price);
    const d = parseFloat(discount);

    if (p >= 0 && d >= 0) {
      const saved = p * (d / 100);
      const final = p - saved;

      return {
        final: final.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        saved: saved.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Discount Calculator" description="Calculate final price and savings after a percentage discount." category="finance" seoTitle="Discount Calculator | Sale Price Savings" seoDescription="Find out how much you save on sale items. Calculate the exact final price after a percentage discount is applied.">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Original Price ($)</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-4 text-xl border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Discount (%)</label>
            <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} className="w-full p-4 text-xl border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none" min="0" step="any" />
          </div>
        </div>

        {res && (
          <div className="bg-pink-50 p-8 rounded-xl border border-pink-100 text-center">
             <h3 className="text-sm font-bold text-pink-800 uppercase tracking-wider mb-2">Final Price</h3>
             <div className="text-6xl font-black text-pink-700 mb-4">
                 ${res.final}
             </div>
             <div className="text-xl font-bold text-pink-900">
                 You Save: ${res.saved}
             </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

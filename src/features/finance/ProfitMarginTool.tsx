import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function ProfitMarginTool() {
  const [cost, setCost] = useState('50');
  const [revenue, setRevenue] = useState('75');

  const calculate = () => {
    const c = parseFloat(cost);
    const r = parseFloat(revenue);

    if (c >= 0 && r >= 0) {
      const profit = r - c;
      let margin = 0;
      let markup = 0;
      
      if (r > 0) margin = (profit / r) * 100;
      if (c > 0) markup = (profit / c) * 100;

      return {
        profit: profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        margin: margin.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        markup: markup.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Profit Margin Calculator" description="Calculate gross profit, margin percentage, and markup percentage." category="finance" seoTitle="Profit Margin Calculator | Gross Profit & Markup" seoDescription="Calculate business profit margins, markups, and gross profit directly from your costs and revenue.">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Cost ($)</label>
            <input type="number" value={cost} onChange={(e) => setCost(e.target.value)} className="w-full p-4 text-xl border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Revenue / Selling Price ($)</label>
            <input type="number" value={revenue} onChange={(e) => setRevenue(e.target.value)} className="w-full p-4 text-xl border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" min="0" step="any" />
          </div>
        </div>

        {res && (
          <div className="grid md:grid-cols-3 gap-4 text-center">
             <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                <div className="text-xs font-bold text-orange-800 uppercase tracking-wider mb-2">Gross Profit</div>
                <div className="text-3xl font-black text-orange-700">${res.profit}</div>
             </div>
             <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                <div className="text-xs font-bold text-orange-800 uppercase tracking-wider mb-2">Margin</div>
                <div className="text-3xl font-black text-orange-700">{res.margin}%</div>
             </div>
             <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                <div className="text-xs font-bold text-orange-800 uppercase tracking-wider mb-2">Markup</div>
                <div className="text-3xl font-black text-orange-700">{res.markup}%</div>
             </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

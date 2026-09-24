import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Calculator } from 'lucide-react';

export default function BatteryRuntimeTool() {
  const [capacity, setCapacity] = useState('');
  const [current, setCurrent] = useState('');
  const [peukert, setPeukert] = useState('1.0'); // 1.0 for ideal (Lithium is close to 1), higher for Lead-Acid
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const c = parseFloat(capacity);
    const i = parseFloat(current);
    const k = parseFloat(peukert);
    
    if (!isNaN(c) && !isNaN(i) && !isNaN(k) && c > 0 && i > 0 && k >= 1) {
      if (k === 1) {
          // Ideal calculation
          setResult(c / i);
      } else {
          // Peukert's Law: t = H * (C/(I*H))^k
          // Using standard rating time H = 20 hours (common for lead-acid)
          const h = 20; 
          const t = h * Math.pow(c / (i * h), k);
          setResult(t);
      }
    } else {
      setResult(null);
    }
  };

  const formatTime = (hours: number) => {
      const h = Math.floor(hours);
      const m = Math.round((hours - h) * 60);
      if (h === 0) return `${m} minutes`;
      if (m === 0) return `${h} hours`;
      return `${h} hours, ${m} minutes`;
  };

  return (
    <ToolShell title="Battery Runtime Calculator" description="Estimate how long a battery will last under a specific load." category="engineering" seoTitle="Battery Runtime Calculator | StudentKit" seoDescription="Calculate estimated battery life and runtime based on capacity (mAh/Ah) and load current. Supports Peukert's Law for lead-acid batteries.">
      <div className="max-w-2xl mx-auto space-y-8">
        
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Battery Capacity</label>
              <div className="flex items-center gap-2">
                <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} className="flex-1 p-2 border rounded-md" placeholder="e.g. 2000" min="0" step="any" />
                <span className="text-gray-500 w-12 font-medium text-sm">mAh (or Ah)</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Load Current</label>
              <div className="flex items-center gap-2">
                <input type="number" value={current} onChange={(e) => setCurrent(e.target.value)} className="flex-1 p-2 border rounded-md" placeholder="e.g. 500" min="0" step="any" />
                <span className="text-gray-500 w-12 font-medium text-sm">mA (or A)</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Make sure capacity and current units match (e.g., mAh with mA, or Ah with A).</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Peukert's Exponent (k)</label>
              <input type="number" value={peukert} onChange={(e) => setPeukert(e.target.value)} className="w-full p-2 border rounded-md" placeholder="1.0" min="1" step="0.05" />
              <p className="text-xs text-gray-500 mt-1">Leave as 1.0 for Lithium-ion/ideal. Use 1.1-1.3 for Lead-Acid.</p>
            </div>
          </div>

          <div className="mt-6 flex justify-end items-center border-t pt-6">
            <button onClick={calculate} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 font-medium">
              <Calculator className="w-4 h-4" /> Calculate Runtime
            </button>
          </div>
        </div>

        {result !== null && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-8 text-center shadow-sm">
            <h3 className="text-lg font-medium text-emerald-900 mb-2">Estimated Runtime</h3>
            <div className="text-4xl font-bold text-emerald-600 tracking-tight mb-2">
              {formatTime(result)}
            </div>
            <div className="text-sm font-medium text-emerald-700 font-mono">
               ({result.toPrecision(4)} hours)
            </div>
            
            <div className="mt-4 text-xs text-emerald-800 bg-emerald-200/50 p-3 rounded-lg">
               <strong>Safety Note:</strong> Real-world runtime is often 20-30% less due to battery aging, temperature, voltage droop, and efficiency losses in regulators.
            </div>
          </div>
        )}

        <div className="prose max-w-none bg-white p-8 rounded-xl border">
          <h2>Battery Capacity vs Load</h2>
          <p>The simplest way to calculate battery runtime is the ideal formula:</p>
          <div className="bg-gray-50 p-4 rounded-lg border text-center font-mono font-bold">
             Runtime (hours) = Capacity / Load Current
          </div>
          <p>For example, a 2000 mAh battery supplying 500 mA of current will theoretically last 4 hours (2000 / 500 = 4).</p>
          
          <h3>Peukert's Law</h3>
          <p>For some battery chemistries, especially Lead-Acid, the capacity of the battery effectively decreases as the rate of discharge increases. Peukert's Law models this non-linear relationship.</p>
          <ul>
             <li><strong>Lithium-ion / LiPo:</strong> k ≈ 1.00 to 1.05 (Nearly ideal)</li>
             <li><strong>Lead-Acid (AGM/Gel):</strong> k ≈ 1.1 to 1.3</li>
          </ul>
        </div>
      </div>
    </ToolShell>
  );
}

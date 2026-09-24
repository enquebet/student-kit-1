import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function ConcreteVolumeTool() {
  const [shape, setShape] = useState<'slab' | 'column'>('slab');
  
  // Slab
  const [length, setLength] = useState('10');
  const [width, setWidth] = useState('10');
  
  // Column
  const [diameter, setDiameter] = useState('1');
  
  // Common
  const [depth, setDepth] = useState('0.5'); // feet
  
  // Standard 80lb bag yields approx 0.6 cubic feet

  const calculate = () => {
    const d = parseFloat(depth);
    if (d > 0) {
      let volCuFt = 0;
      
      if (shape === 'slab') {
        const l = parseFloat(length);
        const w = parseFloat(width);
        if (l > 0 && w > 0) {
           volCuFt = l * w * d;
        }
      } else {
        const dia = parseFloat(diameter);
        if (dia > 0) {
           const radius = dia / 2;
           volCuFt = Math.PI * Math.pow(radius, 2) * d;
        }
      }

      if (volCuFt > 0) {
        const volCuYards = volCuFt / 27;
        const bags80lb = Math.ceil(volCuFt / 0.6);
        const bags60lb = Math.ceil(volCuFt / 0.45);

        return {
           cuYards: volCuYards.toFixed(2),
           cuFt: volCuFt.toFixed(2),
           bags80: bags80lb,
           bags60: bags60lb
        };
      }
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Concrete Volume Calculator" description="Calculate required concrete volume in cubic yards and number of bags needed." category="engineering" seoTitle="Concrete Volume Calculator | Yards & Bags Estimator" seoDescription="Calculate concrete volume for slabs, footings, and columns in cubic yards and find out how many 80lb or 60lb bags you need.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="flex gap-4 mb-6">
            <button onClick={() => setShape('slab')} className={`flex-1 py-3 rounded-lg font-bold ${shape === 'slab' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                Rectangular Slab / Footing
            </button>
            <button onClick={() => setShape('column')} className={`flex-1 py-3 rounded-lg font-bold ${shape === 'column' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                Circular Column / Hole
            </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {shape === 'slab' ? (
             <>
               <div>
                 <label className="block text-sm font-bold text-gray-700 mb-1">Length (feet)</label>
                 <input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
               </div>
               <div>
                 <label className="block text-sm font-bold text-gray-700 mb-1">Width (feet)</label>
                 <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
               </div>
             </>
          ) : (
             <div>
                 <label className="block text-sm font-bold text-gray-700 mb-1">Diameter (feet)</label>
                 <input type="number" value={diameter} onChange={(e) => setDiameter(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
             </div>
          )}
          <div>
             <label className="block text-sm font-bold text-gray-700 mb-1">Depth / Thickness (feet)</label>
             <input type="number" value={depth} onChange={(e) => setDepth(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
             <div className="text-xs text-gray-500 mt-1">Hint: 4 inches = 0.33 feet, 6 inches = 0.5 feet</div>
          </div>
        </div>

        {res && (
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
             <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 text-center">Required Concrete</h3>
             
             <div className="text-center mb-8">
                <div className="text-5xl font-black text-slate-800 flex items-baseline justify-center gap-2">
                    {res.cuYards} <span className="text-2xl text-slate-500">yd³</span>
                </div>
                <div className="text-lg font-bold text-slate-500 mt-2">
                    or {res.cuFt} Cubic Feet
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border text-center shadow-sm">
                   <div className="text-3xl font-bold text-indigo-700">{res.bags80}</div>
                   <div className="text-xs font-bold text-gray-500 uppercase mt-1">80 lb Bags</div>
                </div>
                <div className="bg-white p-4 rounded-lg border text-center shadow-sm">
                   <div className="text-3xl font-bold text-indigo-700">{res.bags60}</div>
                   <div className="text-xs font-bold text-gray-500 uppercase mt-1">60 lb Bags</div>
                </div>
             </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

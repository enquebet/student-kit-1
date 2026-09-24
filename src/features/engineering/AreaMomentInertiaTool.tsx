import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Square, Circle } from 'lucide-react';

export default function AreaMomentInertiaTool() {
  const [shape, setShape] = useState<'rect' | 'circle' | 'hollow_rect'>('rect');
  
  // Rect
  const [b, setB] = useState('10');
  const [h, setH] = useState('20');
  
  // Circle
  const [d, setD] = useState('10');
  
  // Hollow Rect
  const [bInner, setBInner] = useState('8');
  const [hInner, setHInner] = useState('18');

  const calculate = () => {
    const base = parseFloat(b);
    const height = parseFloat(h);
    const diam = parseFloat(d);
    const bIn = parseFloat(bInner);
    const hIn = parseFloat(hInner);

    if (shape === 'rect' && base > 0 && height > 0) {
      return {
        ix: (base * Math.pow(height, 3)) / 12,
        iy: (height * Math.pow(base, 3)) / 12
      };
    } else if (shape === 'circle' && diam > 0) {
      const i = (Math.PI * Math.pow(diam, 4)) / 64;
      return { ix: i, iy: i };
    } else if (shape === 'hollow_rect' && base > 0 && height > 0 && bIn > 0 && hIn > 0) {
      return {
        ix: ((base * Math.pow(height, 3)) - (bIn * Math.pow(hIn, 3))) / 12,
        iy: ((height * Math.pow(base, 3)) - (hIn * Math.pow(bIn, 3))) / 12
      };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Area Moment of Inertia Calculator" description="Calculate the area moment of inertia (Ix, Iy) for standard cross-sections." category="engineering" seoTitle="Area Moment of Inertia Calculator | Structural Cross Sections" seoDescription="Calculate area moment of inertia for rectangles, circles, and hollow sections. Free structural engineering calculator.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="flex gap-4 mb-8">
            <button onClick={() => setShape('rect')} className={`flex-1 py-3 rounded-lg font-bold flex items-center justify-center gap-2 ${shape === 'rect' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                <Square className="w-5 h-5"/> Solid Rectangle
            </button>
            <button onClick={() => setShape('hollow_rect')} className={`flex-1 py-3 rounded-lg font-bold flex items-center justify-center gap-2 ${shape === 'hollow_rect' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                <Square className="w-5 h-5"/> Hollow Rectangle
            </button>
            <button onClick={() => setShape('circle')} className={`flex-1 py-3 rounded-lg font-bold flex items-center justify-center gap-2 ${shape === 'circle' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                <Circle className="w-5 h-5"/> Solid Circle
            </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {(shape === 'rect' || shape === 'hollow_rect') && (
            <>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Outer Base (b)</label>
                  <input type="number" value={b} onChange={(e) => setB(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Outer Height (h)</label>
                  <input type="number" value={h} onChange={(e) => setH(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
                </div>
            </>
          )}
          {shape === 'hollow_rect' && (
            <>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Inner Base</label>
                  <input type="number" value={bInner} onChange={(e) => setBInner(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Inner Height</label>
                  <input type="number" value={hInner} onChange={(e) => setHInner(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
                </div>
            </>
          )}
          {shape === 'circle' && (
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-1">Diameter (d)</label>
              <input type="number" value={d} onChange={(e) => setD(e.target.value)} className="w-full p-3 border rounded-lg max-w-xs" min="0" step="any" />
            </div>
          )}
        </div>

        {res && (
          <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
             <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white p-4 rounded-lg border">
                   <div className="text-xs font-bold text-gray-500 uppercase">Moment of Inertia (I_x)</div>
                   <div className="text-2xl font-bold text-indigo-700 mt-2">{res.ix.toExponential(4)}</div>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                   <div className="text-xs font-bold text-gray-500 uppercase">Moment of Inertia (I_y)</div>
                   <div className="text-2xl font-bold text-indigo-700 mt-2">{res.iy.toExponential(4)}</div>
                </div>
             </div>
             <p className="text-xs text-center text-gray-500 mt-4">Units are Length⁴ (e.g. mm⁴ or in⁴ depending on your inputs)</p>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

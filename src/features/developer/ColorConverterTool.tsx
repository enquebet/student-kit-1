import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function ColorConverterTool() {
  const [hex, setHex] = useState('#3B82F6');
  
  const hexToRgb = (h: string) => {
    const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
    return res ? `rgb(${parseInt(res[1], 16)}, ${parseInt(res[2], 16)}, ${parseInt(res[3], 16)})` : 'Invalid HEX';
  };
  
  const hexToHsl = (h: string) => {
    let res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
    if (!res) return 'Invalid HEX';
    let r = parseInt(res[1], 16) / 255;
    let g = parseInt(res[2], 16) / 255;
    let b = parseInt(res[3], 16) / 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let hVal = 0, sVal = 0, lVal = (max + min) / 2;
    if(max !== min){
        let d = max - min;
        sVal = lVal > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: hVal = (g - b) / d + (g < b ? 6 : 0); break;
            case g: hVal = (b - r) / d + 2; break;
            case b: hVal = (r - g) / d + 4; break;
        }
        hVal /= 6;
    }
    return `hsl(${Math.round(hVal * 360)}, ${Math.round(sVal * 100)}%, ${Math.round(lVal * 100)}%)`;
  };

  return (
    <ToolShell title="Color Converter" description="Convert between HEX, RGB, and HSL." category="developer" seoTitle="Color Converter | HEX, RGB, HSL | StudentKit" seoDescription="Convert colors easily between HEX, RGB, and HSL formats.">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-2xl mx-auto">
         <div className="flex items-center gap-8 mb-8">
            <div className="w-32 h-32 rounded-2xl shadow-inner border border-gray-200" style={{ backgroundColor: hex.startsWith('#') ? hex : '#fff' }}></div>
            <div className="flex-1">
               <label className="block text-sm font-bold text-gray-700 mb-2">HEX Color</label>
               <input type="text" value={hex} onChange={e=>setHex(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-mono uppercase" />
            </div>
         </div>
         
         <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">RGB</label>
              <div className="w-full px-4 py-3 bg-gray-100 rounded-lg font-mono text-gray-800">{hexToRgb(hex)}</div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">HSL</label>
              <div className="w-full px-4 py-3 bg-gray-100 rounded-lg font-mono text-gray-800">{hexToHsl(hex)}</div>
            </div>
         </div>
      </div>
    </ToolShell>
  );
}

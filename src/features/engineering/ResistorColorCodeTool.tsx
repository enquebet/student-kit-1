import React, { useState, useEffect } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

const colorValues: Record<string, { val: number, multi: number, tol: number | null }> = {
  black: { val: 0, multi: 1, tol: null },
  brown: { val: 1, multi: 10, tol: 1 },
  red: { val: 2, multi: 100, tol: 2 },
  orange: { val: 3, multi: 1000, tol: null },
  yellow: { val: 4, multi: 10000, tol: null },
  green: { val: 5, multi: 100000, tol: 0.5 },
  blue: { val: 6, multi: 1000000, tol: 0.25 },
  violet: { val: 7, multi: 10000000, tol: 0.1 },
  grey: { val: 8, multi: 100000000, tol: 0.05 },
  white: { val: 9, multi: 1000000000, tol: null },
  gold: { val: -1, multi: 0.1, tol: 5 },
  silver: { val: -1, multi: 0.01, tol: 10 }
};

const band123Colors = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];
const multiplierColors = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white', 'gold', 'silver'];
const toleranceColors = ['brown', 'red', 'green', 'blue', 'violet', 'grey', 'gold', 'silver'];
const tempColors = ['brown', 'red', 'orange', 'yellow', 'blue', 'violet'];

export default function ResistorColorCodeTool() {
  const [bandCount, setBandCount] = useState<4 | 5 | 6>(4);
  const [band1, setBand1] = useState('brown');
  const [band2, setBand2] = useState('black');
  const [band3, setBand3] = useState('black'); // Only for 5/6 band
  const [multiplier, setMultiplier] = useState('red');
  const [tolerance, setTolerance] = useState('gold');
  const [temp, setTemp] = useState('brown'); // Only for 6 band

  const [result, setResult] = useState<{ resistance: number, tolerance: number, temp?: string } | null>(null);

  useEffect(() => {
    let base = 0;
    if (bandCount === 4) {
      base = (colorValues[band1].val * 10) + colorValues[band2].val;
    } else {
      base = (colorValues[band1].val * 100) + (colorValues[band2].val * 10) + colorValues[band3].val;
    }
    
    const res = base * colorValues[multiplier].multi;
    const tol = colorValues[tolerance].tol || 0;
    
    let tempStr = undefined;
    if (bandCount === 6) {
        const tempValues: Record<string, string> = {
            'brown': '100 ppm/K', 'red': '50 ppm/K', 'orange': '15 ppm/K',
            'yellow': '25 ppm/K', 'blue': '10 ppm/K', 'violet': '5 ppm/K'
        };
        tempStr = tempValues[temp];
    }
    
    setResult({ resistance: res, tolerance: tol, temp: tempStr });
  }, [bandCount, band1, band2, band3, multiplier, tolerance, temp]);

  const formatResistance = (r: number) => {
    if (r >= 1000000) return `${(r / 1000000).toPrecision(4).replace(/\.0+$/, '')} MΩ`;
    if (r >= 1000) return `${(r / 1000).toPrecision(4).replace(/\.0+$/, '')} kΩ`;
    return `${r.toPrecision(4).replace(/\.0+$/, '')} Ω`;
  };

  const getColorHex = (c: string) => {
    const map: Record<string, string> = {
      black: '#000000', brown: '#8B4513', red: '#FF0000', orange: '#FFA500',
      yellow: '#FFFF00', green: '#008000', blue: '#0000FF', violet: '#EE82EE',
      grey: '#808080', white: '#FFFFFF', gold: '#FFD700', silver: '#C0C0C0'
    };
    return map[c];
  };

  return (
    <ToolShell title="Resistor Color Code Calculator" description="Calculate the resistance value of 4, 5, and 6-band resistors based on their color bands." category="engineering" seoTitle="Resistor Color Code Calculator | 4, 5, 6 Band | StudentKit" seoDescription="Easy to use resistor color code calculator for 4-band, 5-band, and 6-band resistors. Find resistance, tolerance, and temperature coefficient instantly.">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <div className="flex justify-center gap-2 mb-8">
            <button onClick={() => setBandCount(4)} className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${bandCount === 4 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>4 Band</button>
            <button onClick={() => setBandCount(5)} className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${bandCount === 5 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>5 Band</button>
            <button onClick={() => setBandCount(6)} className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${bandCount === 6 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>6 Band</button>
          </div>

          {/* Resistor Visualization */}
          <div className="flex justify-center items-center py-12">
            <div className="h-4 w-16 bg-gray-400 rounded-l-sm"></div>
            <div className="relative h-24 w-64 bg-[#e8d5b5] rounded-xl flex items-center justify-evenly px-2 shadow-inner border border-[#d4c1a0]">
              <div className="h-full w-4" style={{ backgroundColor: getColorHex(band1) }}></div>
              <div className="h-full w-4" style={{ backgroundColor: getColorHex(band2) }}></div>
              {bandCount >= 5 && <div className="h-full w-4" style={{ backgroundColor: getColorHex(band3) }}></div>}
              <div className="h-full w-4" style={{ backgroundColor: getColorHex(multiplier) }}></div>
              <div className="h-full w-4" style={{ backgroundColor: getColorHex(tolerance) }}></div>
              {bandCount === 6 && <div className="h-full w-4" style={{ backgroundColor: getColorHex(temp) }}></div>}
            </div>
            <div className="h-4 w-16 bg-gray-400 rounded-r-sm"></div>
          </div>

          {result && (
            <div className="text-center my-8">
              <div className="text-5xl font-bold text-gray-900 tracking-tight flex justify-center items-baseline gap-2">
                {formatResistance(result.resistance)}
                <span className="text-2xl text-gray-500 font-normal">±{result.tolerance}%</span>
              </div>
              {result.temp && <div className="text-gray-500 mt-2 font-medium">{result.temp}</div>}
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-8">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">1st Band</label>
              <select value={band1} onChange={(e) => setBand1(e.target.value)} className="w-full p-2 border rounded-md capitalize font-medium" style={{borderLeftColor: getColorHex(band1), borderLeftWidth: '8px'}}>
                {band123Colors.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">2nd Band</label>
              <select value={band2} onChange={(e) => setBand2(e.target.value)} className="w-full p-2 border rounded-md capitalize font-medium" style={{borderLeftColor: getColorHex(band2), borderLeftWidth: '8px'}}>
                {band123Colors.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            {bandCount >= 5 && (
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">3rd Band</label>
                <select value={band3} onChange={(e) => setBand3(e.target.value)} className="w-full p-2 border rounded-md capitalize font-medium" style={{borderLeftColor: getColorHex(band3), borderLeftWidth: '8px'}}>
                  {band123Colors.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Multiplier</label>
              <select value={multiplier} onChange={(e) => setMultiplier(e.target.value)} className="w-full p-2 border rounded-md capitalize font-medium" style={{borderLeftColor: getColorHex(multiplier), borderLeftWidth: '8px'}}>
                {multiplierColors.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Tolerance</label>
              <select value={tolerance} onChange={(e) => setTolerance(e.target.value)} className="w-full p-2 border rounded-md capitalize font-medium" style={{borderLeftColor: getColorHex(tolerance), borderLeftWidth: '8px'}}>
                {toleranceColors.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            {bandCount === 6 && (
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Temp Coeff</label>
                <select value={temp} onChange={(e) => setTemp(e.target.value)} className="w-full p-2 border rounded-md capitalize font-medium" style={{borderLeftColor: getColorHex(temp), borderLeftWidth: '8px'}}>
                  {tempColors.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            )}
          </div>
        </div>

        <div className="prose max-w-none bg-white p-8 rounded-xl border">
          <h2>Reading Resistor Color Codes</h2>
          <p>Electronic color codes are used to indicate the values or ratings of electronic components, usually for resistors.</p>
          
          <div className="grid md:grid-cols-3 gap-6 my-6">
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="text-lg font-bold mt-0">4-Band Resistors</h3>
              <p className="text-sm">The most common type. The first two bands indicate significant digits, the third is the multiplier, and the fourth is the tolerance.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="text-lg font-bold mt-0">5-Band Resistors</h3>
              <p className="text-sm">Used for higher precision resistors. The first three bands indicate significant digits, the fourth is the multiplier, and the fifth is tolerance.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="text-lg font-bold mt-0">6-Band Resistors</h3>
              <p className="text-sm">Used for high precision resistors requiring temperature stability. Identical to 5-band, with an added 6th band for temperature coefficient.</p>
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}

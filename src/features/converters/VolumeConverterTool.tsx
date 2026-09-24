import React, { useState, useEffect } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { ArrowRightLeft, Copy } from 'lucide-react';

export default function VolumeConverterTool() {
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('');
  const [unit1, setUnit1] = useState('l');
  const [unit2, setUnit2] = useState('ml');
  const [lastEdited, setLastEdited] = useState<'1' | '2'>('1');

  const units = [
  {
    "id": "l",
    "name": "Liters"
  },
  {
    "id": "ml",
    "name": "Milliliters"
  },
  {
    "id": "cubm",
    "name": "Cubic Meters"
  },
  {
    "id": "gal",
    "name": "US Gallons"
  },
  {
    "id": "floz",
    "name": "US Fluid Ounces"
  }
];

  const convert = (value: string, fromUnit: string, toUnit: string) => {
    if (!value || value.trim() === '') return '';
    
    let val = parseFloat(value);
    if (isNaN(val)) return '';
    const toBase = {"l":1,"ml":0.001,"cubm":1000,"gal":3.78541,"floz":0.0295735};
    const baseVal = val * toBase[fromUnit];
    const res = baseVal / toBase[toUnit];
    return Number(res.toPrecision(7)).toString();
    
  };

  useEffect(() => {
    if (lastEdited === '1') {
      setVal2(convert(val1, unit1, unit2));
    } else {
      setVal1(convert(val2, unit2, unit1));
    }
  }, [val1, val2, unit1, unit2, lastEdited]);

  const handleSwap = () => {
    const tempUnit = unit1;
    setUnit1(unit2);
    setUnit2(tempUnit);
    
    const tempVal = val1;
    setVal1(val2);
    setVal2(tempVal);
    setLastEdited('1');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <ToolShell 
      title="Volume Converter" 
      description="Convert volumes between liters, milliliters, cubic meters, gallons, and fluid ounces." 
      category="converters"
      seoTitle="Volume Converter | Free Online | StudentKit"
      seoDescription="Convert liters to gallons, cubic meters to fluid ounces, and more."
    >
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
        
        <div className="flex flex-col md:flex-row items-center gap-6">
          
          <div className="w-full flex-1 space-y-3">
            <label className="block text-sm font-bold text-gray-700">From</label>
            <div className="flex gap-2">
              <input 
                type="number" 
                value={val1} 
                onChange={(e) => { setVal1(e.target.value); setLastEdited('1'); }}
                className="w-2/3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-lg font-mono"
                placeholder="0.0"
              />
              <select 
                value={unit1} 
                onChange={(e) => { setUnit1(e.target.value); setLastEdited('1'); }}
                className="w-1/3 px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-semibold text-gray-700"
              >
                {units.map(u => (
                  <option key={u.id} value={u.id}>{u.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-center items-center mt-6 md:mt-8">
            <button 
              onClick={handleSwap}
              className="p-3 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-full transition-colors shadow-sm"
              title="Swap units"
            >
              <ArrowRightLeft className="w-5 h-5" />
            </button>
          </div>

          <div className="w-full flex-1 space-y-3">
            <label className="block text-sm font-bold text-gray-700">To</label>
            <div className="flex gap-2">
              <input 
                type="number" 
                value={val2} 
                onChange={(e) => { setVal2(e.target.value); setLastEdited('2'); }}
                className="w-2/3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-lg font-mono"
                placeholder="0.0"
              />
              <select 
                value={unit2} 
                onChange={(e) => { setUnit2(e.target.value); setLastEdited('2'); }}
                className="w-1/3 px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-semibold text-gray-700"
              >
                {units.map(u => (
                  <option key={u.id} value={u.id}>{u.name}</option>
                ))}
              </select>
            </div>
          </div>

        </div>

      </div>
    </ToolShell>
  );
}

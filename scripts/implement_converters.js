import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const converters = {
  'length-converter': {
    name: 'Length Converter',
    desc: 'Convert lengths between meters, kilometers, centimeters, millimeters, miles, yards, feet, and inches.',
    seoTitle: 'Length Converter | Fast & Free | StudentKit',
    seoDescription: 'Convert lengths and distances instantly. Supports meters, miles, feet, inches, centimeters, and more.',
    units: [
      { id: 'm', name: 'Meters' },
      { id: 'km', name: 'Kilometers' },
      { id: 'cm', name: 'Centimeters' },
      { id: 'mm', name: 'Millimeters' },
      { id: 'mi', name: 'Miles' },
      { id: 'yd', name: 'Yards' },
      { id: 'ft', name: 'Feet' },
      { id: 'in', name: 'Inches' }
    ],
    // Conversion factors to a base unit (e.g. meters)
    toBase: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.344, yd: 0.9144, ft: 0.3048, in: 0.0254 },
    category: 'converters',
    compName: 'LengthConverterTool'
  },
  'weight-converter': {
    name: 'Weight Converter',
    desc: 'Convert weights between kilograms, grams, milligrams, metric tons, pounds, and ounces.',
    seoTitle: 'Weight & Mass Converter | Free Online | StudentKit',
    seoDescription: 'Convert between kg, lbs, grams, ounces, and tons instantly.',
    units: [
      { id: 'kg', name: 'Kilograms' },
      { id: 'g', name: 'Grams' },
      { id: 'mg', name: 'Milligrams' },
      { id: 't', name: 'Metric Tons' },
      { id: 'lb', name: 'Pounds' },
      { id: 'oz', name: 'Ounces' }
    ],
    toBase: { kg: 1, g: 0.001, mg: 0.000001, t: 1000, lb: 0.45359237, oz: 0.028349523125 },
    category: 'converters',
    compName: 'WeightConverterTool'
  },
  'temperature-converter': {
    name: 'Temperature Converter',
    desc: 'Convert temperatures between Celsius, Fahrenheit, and Kelvin.',
    seoTitle: 'Temperature Converter (C, F, K) | StudentKit',
    seoDescription: 'Convert temperatures between Celsius, Fahrenheit, and Kelvin scales instantly.',
    units: [
      { id: 'c', name: 'Celsius' },
      { id: 'f', name: 'Fahrenheit' },
      { id: 'k', name: 'Kelvin' }
    ],
    isTemp: true,
    category: 'converters',
    compName: 'TemperatureConverterTool'
  },
  'area-converter': {
    name: 'Area Converter',
    desc: 'Convert areas between square meters, square kilometers, square feet, square yards, acres, and hectares.',
    seoTitle: 'Area Converter | StudentKit',
    seoDescription: 'Convert square meters to square feet, acres to hectares, and more.',
    units: [
      { id: 'sqm', name: 'Square Meters' },
      { id: 'sqkm', name: 'Square Kilometers' },
      { id: 'sqft', name: 'Square Feet' },
      { id: 'sqyd', name: 'Square Yards' },
      { id: 'ac', name: 'Acres' },
      { id: 'ha', name: 'Hectares' }
    ],
    toBase: { sqm: 1, sqkm: 1000000, sqft: 0.092903, sqyd: 0.836127, ac: 4046.86, ha: 10000 },
    category: 'converters',
    compName: 'AreaConverterTool'
  },
  'volume-converter': {
    name: 'Volume Converter',
    desc: 'Convert volumes between liters, milliliters, cubic meters, gallons, and fluid ounces.',
    seoTitle: 'Volume Converter | Free Online | StudentKit',
    seoDescription: 'Convert liters to gallons, cubic meters to fluid ounces, and more.',
    units: [
      { id: 'l', name: 'Liters' },
      { id: 'ml', name: 'Milliliters' },
      { id: 'cubm', name: 'Cubic Meters' },
      { id: 'gal', name: 'US Gallons' },
      { id: 'floz', name: 'US Fluid Ounces' }
    ],
    toBase: { l: 1, ml: 0.001, cubm: 1000, gal: 3.78541, floz: 0.0295735 },
    category: 'converters',
    compName: 'VolumeConverterTool'
  },
  'speed-converter': {
    name: 'Speed Converter',
    desc: 'Convert speeds between meters per second, kilometers per hour, miles per hour, and knots.',
    seoTitle: 'Speed Converter | km/h to mph | StudentKit',
    seoDescription: 'Convert km/h to mph, m/s to knots, and other speed units instantly.',
    units: [
      { id: 'ms', name: 'Meters per Second' },
      { id: 'kmh', name: 'Kilometers per Hour' },
      { id: 'mph', name: 'Miles per Hour' },
      { id: 'kn', name: 'Knots' }
    ],
    toBase: { ms: 1, kmh: 0.277778, mph: 0.44704, kn: 0.514444 },
    category: 'converters',
    compName: 'SpeedConverterTool'
  },
  'time-converter': {
    name: 'Time Converter',
    desc: 'Convert time between milliseconds, seconds, minutes, hours, days, weeks, and years.',
    seoTitle: 'Time Converter | StudentKit',
    seoDescription: 'Convert seconds to minutes, hours to days, and more.',
    units: [
      { id: 'ms', name: 'Milliseconds' },
      { id: 's', name: 'Seconds' },
      { id: 'min', name: 'Minutes' },
      { id: 'h', name: 'Hours' },
      { id: 'd', name: 'Days' },
      { id: 'w', name: 'Weeks' },
      { id: 'y', name: 'Years' }
    ],
    toBase: { ms: 0.001, s: 1, min: 60, h: 3600, d: 86400, w: 604800, y: 31536000 },
    category: 'converters',
    compName: 'TimeConverterTool'
  }
};

Object.entries(converters).forEach(([slug, c]) => {
  const filePath = path.join(rootDir, 'src', 'features', c.category, `${c.compName}.tsx`);
  
  let calculateLogic = '';
  if (c.isTemp) {
    calculateLogic = `
    let val = parseFloat(value);
    if (isNaN(val)) return '';
    let c = 0;
    if (fromUnit === 'c') c = val;
    else if (fromUnit === 'f') c = (val - 32) * 5/9;
    else if (fromUnit === 'k') c = val - 273.15;
    
    let res = 0;
    if (toUnit === 'c') res = c;
    else if (toUnit === 'f') res = (c * 9/5) + 32;
    else if (toUnit === 'k') res = c + 273.15;
    
    return Number(res.toPrecision(7)).toString();
    `;
  } else {
    calculateLogic = `
    let val = parseFloat(value);
    if (isNaN(val)) return '';
    const toBase = ${JSON.stringify(c.toBase)};
    const baseVal = val * toBase[fromUnit];
    const res = baseVal / toBase[toUnit];
    return Number(res.toPrecision(7)).toString();
    `;
  }

  const content = `import React, { useState, useEffect } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { ArrowRightLeft, Copy } from 'lucide-react';

export default function ${c.compName}() {
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('');
  const [unit1, setUnit1] = useState('${c.units[0].id}');
  const [unit2, setUnit2] = useState('${c.units[1].id}');
  const [lastEdited, setLastEdited] = useState<'1' | '2'>('1');

  const units = ${JSON.stringify(c.units, null, 2)};

  const convert = (value: string, fromUnit: string, toUnit: string) => {
    if (!value || value.trim() === '') return '';
    ${calculateLogic}
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
      title="${c.name}" 
      description="${c.desc}" 
      category="${c.category}"
      seoTitle="${c.seoTitle}"
      seoDescription="${c.seoDescription}"
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
`;

  fs.writeFileSync(filePath, content);
});

console.log('Converters implemented.');

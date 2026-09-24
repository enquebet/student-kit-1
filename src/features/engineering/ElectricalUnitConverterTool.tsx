import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { ArrowRight } from 'lucide-react';

const units = [
  { id: 'pico', name: 'pico (p)', multiplier: 1e-12 },
  { id: 'nano', name: 'nano (n)', multiplier: 1e-9 },
  { id: 'micro', name: 'micro (μ)', multiplier: 1e-6 },
  { id: 'milli', name: 'milli (m)', multiplier: 1e-3 },
  { id: 'base', name: 'Base Unit', multiplier: 1 },
  { id: 'kilo', name: 'kilo (k)', multiplier: 1e3 },
  { id: 'mega', name: 'mega (M)', multiplier: 1e6 },
  { id: 'giga', name: 'giga (G)', multiplier: 1e9 }
];

export default function ElectricalUnitConverterTool() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('base');
  const [toUnit, setToUnit] = useState('milli');
  const [result, setResult] = useState<number | null>(null);

  const calculate = (vStr: string, from: string, to: string) => {
    const v = parseFloat(vStr);
    if (!isNaN(v)) {
        const fromMult = units.find(u => u.id === from)?.multiplier || 1;
        const toMult = units.find(u => u.id === to)?.multiplier || 1;
        // Convert to base, then to target
        const baseVal = v * fromMult;
        setResult(baseVal / toMult);
    } else {
        setResult(null);
    }
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      calculate(e.target.value, fromUnit, toUnit);
  };
  
  const handleFromChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFromUnit(e.target.value);
      calculate(value, e.target.value, toUnit);
  };

  const handleToChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setToUnit(e.target.value);
      calculate(value, fromUnit, e.target.value);
  };

  const swap = () => {
      const tempFrom = fromUnit;
      setFromUnit(toUnit);
      setToUnit(tempFrom);
      calculate(value, toUnit, tempFrom);
  };

  return (
    <ToolShell title="Electrical Unit Prefix Converter" description="Convert between standard engineering metric prefixes (milli, micro, kilo, mega, etc.)." category="engineering" seoTitle="Engineering Unit Prefix Converter | milli, micro, kilo | StudentKit" seoDescription="Convert electrical units across standard metric prefixes. Convert milli to micro, kilo to mega, etc.">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div className="bg-white rounded-xl shadow-sm border p-8">
           <div className="flex flex-col md:flex-row items-center gap-4">
              
              <div className="flex-1 w-full flex flex-col gap-2">
                 <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">From</label>
                 <div className="flex rounded-md shadow-sm border focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                     <input type="number" value={value} onChange={handleValueChange} className="w-full p-3 focus:outline-none bg-transparent" placeholder="Value" step="any" />
                     <select value={fromUnit} onChange={handleFromChange} className="bg-gray-50 border-l p-3 focus:outline-none min-w-[120px]">
                         {units.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                     </select>
                 </div>
              </div>

              <div className="pt-6">
                 <button onClick={swap} className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-transform active:scale-95 text-gray-600" aria-label="Swap units">
                    <ArrowRight className="w-5 h-5 hidden md:block" />
                    <ArrowRight className="w-5 h-5 block md:hidden rotate-90" />
                 </button>
              </div>

              <div className="flex-1 w-full flex flex-col gap-2">
                 <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">To</label>
                 <div className="flex rounded-md shadow-sm border focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 bg-gray-50">
                     <div className="w-full p-3 font-mono text-gray-900 font-bold overflow-x-auto whitespace-nowrap">
                         {result !== null ? result : '-'}
                     </div>
                     <select value={toUnit} onChange={handleToChange} className="bg-white border-l p-3 focus:outline-none min-w-[120px]">
                         {units.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                     </select>
                 </div>
              </div>
           </div>
        </div>

        <div className="prose max-w-none bg-white p-8 rounded-xl border">
          <h2>Engineering Metric Prefixes</h2>
          <p>In electrical engineering, values often span many orders of magnitude (e.g., from picofarads to gigahertz). Metric prefixes are used to make these numbers easier to read and write.</p>
          
          <div className="overflow-x-auto mt-6">
              <table className="min-w-full text-left text-sm">
                  <thead>
                      <tr className="border-b-2">
                          <th className="py-2 px-4">Prefix</th>
                          <th className="py-2 px-4">Symbol</th>
                          <th className="py-2 px-4">Multiplier</th>
                          <th className="py-2 px-4">Scientific</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr className="border-b"><td className="py-2 px-4">Giga</td><td className="py-2 px-4 font-bold">G</td><td className="py-2 px-4">1,000,000,000</td><td className="py-2 px-4 font-mono">10<sup>9</sup></td></tr>
                      <tr className="border-b"><td className="py-2 px-4">Mega</td><td className="py-2 px-4 font-bold">M</td><td className="py-2 px-4">1,000,000</td><td className="py-2 px-4 font-mono">10<sup>6</sup></td></tr>
                      <tr className="border-b"><td className="py-2 px-4">Kilo</td><td className="py-2 px-4 font-bold">k</td><td className="py-2 px-4">1,000</td><td className="py-2 px-4 font-mono">10<sup>3</sup></td></tr>
                      <tr className="border-b bg-gray-50"><td className="py-2 px-4">Base Unit</td><td className="py-2 px-4 font-bold">-</td><td className="py-2 px-4">1</td><td className="py-2 px-4 font-mono">10<sup>0</sup></td></tr>
                      <tr className="border-b"><td className="py-2 px-4">Milli</td><td className="py-2 px-4 font-bold">m</td><td className="py-2 px-4">0.001</td><td className="py-2 px-4 font-mono">10<sup>-3</sup></td></tr>
                      <tr className="border-b"><td className="py-2 px-4">Micro</td><td className="py-2 px-4 font-bold">μ</td><td className="py-2 px-4">0.000001</td><td className="py-2 px-4 font-mono">10<sup>-6</sup></td></tr>
                      <tr className="border-b"><td className="py-2 px-4">Nano</td><td className="py-2 px-4 font-bold">n</td><td className="py-2 px-4">0.000000001</td><td className="py-2 px-4 font-mono">10<sup>-9</sup></td></tr>
                      <tr className="border-b"><td className="py-2 px-4">Pico</td><td className="py-2 px-4 font-bold">p</td><td className="py-2 px-4">0.000000000001</td><td className="py-2 px-4 font-mono">10<sup>-12</sup></td></tr>
                  </tbody>
              </table>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}

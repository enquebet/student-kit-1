import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Calculator } from 'lucide-react';

export default function LedResistorCalculatorTool() {
  const [sourceVoltage, setSourceVoltage] = useState('');
  const [forwardVoltage, setForwardVoltage] = useState('');
  const [forwardCurrent, setForwardCurrent] = useState('');
  const [result, setResult] = useState<{ resistance: number; power: number } | null>(null);

  const calculate = () => {
    const vs = parseFloat(sourceVoltage);
    const vf = parseFloat(forwardVoltage);
    // Convert mA to A
    const if_A = parseFloat(forwardCurrent) / 1000;
    
    if (!isNaN(vs) && !isNaN(vf) && !isNaN(if_A) && if_A > 0) {
      if (vs <= vf) {
        // Not enough voltage
        setResult(null);
        alert("Source voltage must be greater than LED forward voltage.");
        return;
      }
      
      const r = (vs - vf) / if_A;
      const p = (vs - vf) * if_A; // Power dissipated by resistor
      setResult({ resistance: r, power: p });
    } else {
      setResult(null);
    }
  };

  const presetLeds = [
    { label: 'Red (Standard)', vf: 2.0, i: 20 },
    { label: 'Green (Standard)', vf: 2.2, i: 20 },
    { label: 'Blue (Standard)', vf: 3.3, i: 20 },
    { label: 'White (Standard)', vf: 3.3, i: 20 },
    { label: 'Yellow (Standard)', vf: 2.1, i: 20 }
  ];

  return (
    <ToolShell title="LED Resistor Calculator" description="Calculate the required series resistor and its power rating to safely drive an LED." category="engineering" seoTitle="LED Resistor Calculator | Series Resistor Value | StudentKit" seoDescription="Free online LED resistor calculator. Determine the correct series resistor value and power rating to prevent your LED from burning out.">
      <div className="max-w-4xl mx-auto space-y-8 flex flex-col md:flex-row gap-8 items-start">
        
        <div className="flex-1 w-full space-y-8">
            <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="space-y-4">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Source Voltage (V<sub>s</sub>)</label>
                <div className="flex items-center gap-2">
                    <input type="number" value={sourceVoltage} onChange={(e) => setSourceVoltage(e.target.value)} className="flex-1 p-2 border rounded-md" placeholder="e.g. 9 or 12" step="any" />
                    <span className="text-gray-500 w-8 font-medium">V</span>
                </div>
                </div>
                
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LED Forward Voltage (V<sub>f</sub>)</label>
                <div className="flex items-center gap-2">
                    <input type="number" value={forwardVoltage} onChange={(e) => setForwardVoltage(e.target.value)} className="flex-1 p-2 border rounded-md" placeholder="e.g. 2.0" min="0" step="any" />
                    <span className="text-gray-500 w-8 font-medium">V</span>
                </div>
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LED Forward Current (I<sub>f</sub>)</label>
                <div className="flex items-center gap-2">
                    <input type="number" value={forwardCurrent} onChange={(e) => setForwardCurrent(e.target.value)} className="flex-1 p-2 border rounded-md" placeholder="e.g. 20" min="0" step="any" />
                    <span className="text-gray-500 w-8 font-medium">mA</span>
                </div>
                </div>
            </div>

            <div className="mt-6 flex justify-end items-center border-t pt-6">
                <button onClick={calculate} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 font-medium">
                <Calculator className="w-4 h-4" /> Calculate Resistor
                </button>
            </div>
            </div>

            {result !== null && (
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-8 shadow-sm text-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                        <h3 className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-2">Required Resistance</h3>
                        <div className="text-4xl font-bold text-emerald-600 tracking-tight flex justify-center items-baseline gap-1">
                        {result.resistance.toPrecision(4).replace(/\.0+$/, '')} <span className="text-xl text-emerald-700">Ω</span>
                        </div>
                   </div>
                   <div>
                        <h3 className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-2">Resistor Power Dissipation</h3>
                        <div className="text-4xl font-bold text-emerald-600 tracking-tight flex justify-center items-baseline gap-1">
                        {result.power.toPrecision(3)} <span className="text-xl text-emerald-700">W</span>
                        </div>
                        <p className="text-xs mt-2 text-emerald-700 font-medium">Use a resistor rated for at least {(result.power * 2).toPrecision(2)}W for safety.</p>
                   </div>
                </div>
            </div>
            )}
        </div>

        <div className="w-full md:w-80 space-y-6">
           <div className="bg-white p-6 rounded-xl border">
              <h3 className="font-bold text-gray-900 mb-4">Quick Presets</h3>
              <div className="space-y-2">
                 {presetLeds.map(preset => (
                     <button key={preset.label} onClick={() => { setForwardVoltage(preset.vf.toString()); setForwardCurrent(preset.i.toString()); }} className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors text-sm">
                         <div className="font-medium text-gray-800">{preset.label}</div>
                         <div className="text-gray-500 mt-1">{preset.vf}V @ {preset.i}mA</div>
                     </button>
                 ))}
              </div>
           </div>
        </div>

      </div>
      
      <div className="max-w-4xl mx-auto mt-8 prose max-w-none bg-white p-8 rounded-xl border">
          <h2>Why do LEDs need a resistor?</h2>
          <p>LEDs (Light Emitting Diodes) have a non-linear current-voltage characteristic. Once the voltage exceeds their forward voltage (V<sub>f</sub>), their resistance drops drastically, and they will draw as much current as the power supply can provide. Without a series resistor to limit this current, the LED will burn out quickly.</p>
          
          <div className="bg-gray-50 p-6 rounded-lg border my-6 text-center">
             <div className="text-xl font-bold text-gray-800 font-mono">R = (V<sub>s</sub> - V<sub>f</sub>) / I<sub>f</sub></div>
          </div>
          
          <h3>Standard Resistor Values</h3>
          <p>Calculators often give exact resistance values (like 345Ω), but resistors are only manufactured in standard values (E-series). Always round <strong>up</strong> to the next standard value (e.g., 390Ω) to ensure the current stays safely below the LED's maximum rating, even if it makes the LED slightly dimmer.</p>
        </div>
    </ToolShell>
  );
}

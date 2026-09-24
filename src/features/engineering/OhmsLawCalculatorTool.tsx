import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Calculator, ArrowRight, Zap, Sparkles } from 'lucide-react';

export default function OhmsLawCalculatorTool() {
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [resistance, setResistance] = useState('');
  const [power, setPower] = useState('');
  const [mode, setMode] = useState<'v' | 'i' | 'r' | 'p'>('v');
  const [result, setResult] = useState<{ value: number; unit: string; formula: string } | null>(null);

  const calculate = () => {
    const v = parseFloat(voltage);
    const i = parseFloat(current);
    const r = parseFloat(resistance);
    
    if (mode === 'v') {
      if (!isNaN(i) && !isNaN(r)) {
        setResult({ value: i * r, unit: 'Volts (V)', formula: 'V = I × R' });
      }
    } else if (mode === 'i') {
      if (!isNaN(v) && !isNaN(r) && r !== 0) {
        setResult({ value: v / r, unit: 'Amperes (A)', formula: 'I = V / R' });
      }
    } else if (mode === 'r') {
      if (!isNaN(v) && !isNaN(i) && i !== 0) {
        setResult({ value: v / i, unit: 'Ohms (Ω)', formula: 'R = V / I' });
      }
    } else if (mode === 'p') {
      // Calculate Power from V and I, or V and R, or I and R
      if (!isNaN(v) && !isNaN(i)) {
          setResult({ value: v * i, unit: 'Watts (W)', formula: 'P = V × I' });
      } else if (!isNaN(v) && !isNaN(r) && r !== 0) {
          setResult({ value: (v * v) / r, unit: 'Watts (W)', formula: 'P = V² / R' });
      } else if (!isNaN(i) && !isNaN(r)) {
          setResult({ value: i * i * r, unit: 'Watts (W)', formula: 'P = I² × R' });
      }
    }
  };

  return (
    <ToolShell 
      title="Ohm's Law Calculator" 
      description="Calculate Voltage, Current, Resistance, or Power using Ohm's Law with instant circuit diagnostics." 
      category="engineering" 
      seoTitle="Ohm's Law Calculator | Voltage, Current, Resistance, Power | StudentKit" 
      seoDescription="Free Ohm's Law calculator. Calculate voltage (V), current (I), resistance (R), and power (P) in DC circuits with formulas and examples."
    >
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Calculator Card */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6 md:p-8">
          <div className="flex flex-wrap gap-2 mb-8">
            <button 
              onClick={() => setMode('v')} 
              className={`px-4 py-2 rounded-full font-semibold text-xs transition-all cursor-pointer border ${
                mode === 'v' ? 'google-neon-btn-primary border-blue-700' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-gray-200 hover:border-gray-300'
              }`}
            >
              Voltage (V)
            </button>
            <button 
              onClick={() => setMode('i')} 
              className={`px-4 py-2 rounded-full font-semibold text-xs transition-all cursor-pointer border ${
                mode === 'i' ? 'google-neon-btn-primary border-blue-700' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-gray-200 hover:border-gray-300'
              }`}
            >
              Current (I)
            </button>
            <button 
              onClick={() => setMode('r')} 
              className={`px-4 py-2 rounded-full font-semibold text-xs transition-all cursor-pointer border ${
                mode === 'r' ? 'google-neon-btn-primary border-blue-700' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-gray-200 hover:border-gray-300'
              }`}
            >
              Resistance (R)
            </button>
            <button 
              onClick={() => setMode('p')} 
              className={`px-4 py-2 rounded-full font-semibold text-xs transition-all cursor-pointer border ${
                mode === 'p' ? 'google-neon-btn-primary border-blue-700' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-gray-200 hover:border-gray-300'
              }`}
            >
              Power (P)
            </button>
          </div>

          <div className="space-y-4">
            {mode !== 'v' && mode !== 'p' && (
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Voltage (V)</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    value={voltage} 
                    onChange={(e) => setVoltage(e.target.value)} 
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" 
                    placeholder="e.g. 12" 
                  />
                  <span className="text-gray-500 font-bold text-xs w-8">V</span>
                </div>
              </div>
            )}
            
            {(mode === 'p') && (
              <div className="space-y-4">
                <p className="text-xs text-blue-600 bg-blue-50 p-2.5 rounded-lg border border-blue-100 font-medium">Enter any two known values below to compute electrical power.</p>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Voltage (V)</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      value={voltage} 
                      onChange={(e) => setVoltage(e.target.value)} 
                      className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" 
                      placeholder="Volts (optional if I and R present)" 
                    />
                    <span className="text-gray-500 font-bold text-xs w-8">V</span>
                  </div>
                </div>
              </div>
            )}

            {mode !== 'i' && (
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Current (I)</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    value={current} 
                    onChange={(e) => setCurrent(e.target.value)} 
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" 
                    placeholder="e.g. 2" 
                  />
                  <span className="text-gray-500 font-bold text-xs w-8">A</span>
                </div>
              </div>
            )}

            {mode !== 'r' && (
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Resistance (R)</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    value={resistance} 
                    onChange={(e) => setResistance(e.target.value)} 
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" 
                    placeholder="e.g. 6" 
                  />
                  <span className="text-gray-500 font-bold text-xs w-8">Ω</span>
                </div>
              </div>
            )}
            
            <div className="pt-2">
              <button 
                onClick={calculate} 
                className="w-full google-neon-btn-primary py-3 text-sm gap-2 cursor-pointer border border-blue-700 hover:border-blue-800"
              >
                <Calculator className="w-4 h-4" /> 
                <span>Calculate & Solve</span>
              </button>
            </div>
          </div>
        </div>

        {/* Result Container with Google RGB Glow Card */}
        {result !== null && (
          <div className="google-rgb-border p-1 shadow-lg animate-in fade-in-50 zoom-in-95">
            <div className="bg-white rounded-[0.85rem] p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Zap className="w-24 h-24 text-blue-600" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1a73e8] uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Calculated Electrical Output</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight">
                    {result.value.toPrecision(5).replace(/\.0+$/, '')}
                  </span>
                  <span className="text-xl font-bold text-blue-600">{result.unit}</span>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 text-gray-800 bg-slate-100 px-3.5 py-1.5 rounded-full font-mono text-xs border border-gray-200">
                  <span>Formula Applied:</span>
                  <span className="font-bold text-blue-700">{result.formula}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 text-sm text-gray-700 leading-relaxed shadow-xs">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Understanding Ohm's Law</h2>
          <p>Ohm's Law states that the current through a conductor between two points is directly proportional to the voltage across the two points. Introducing the constant of proportionality, the resistance, one arrives at the fundamental relationship:</p>
          
          <div className="bg-slate-50 p-5 rounded-xl border border-gray-200 my-5 text-center">
             <div className="text-2xl md:text-3xl font-black text-gray-900 font-mono tracking-wider">V = I × R</div>
          </div>

          <h3 className="font-bold text-gray-900 text-base mb-2">Core Electrical Parameters:</h3>
          <ul className="list-disc pl-5 space-y-1 mb-4">
            <li><strong>V (Voltage):</strong> Measured in Volts (V). The electrical potential difference.</li>
            <li><strong>I (Current):</strong> Measured in Amperes (A). The flow of electric charge.</li>
            <li><strong>R (Resistance):</strong> Measured in Ohms (Ω). The opposition to current flow.</li>
            <li><strong>P (Power):</strong> Measured in Watts (W). The energy consumption per unit of time (<code>P = V × I</code>).</li>
          </ul>
        </div>
      </div>
    </ToolShell>
  );
}

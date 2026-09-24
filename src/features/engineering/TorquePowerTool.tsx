import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Calculator } from 'lucide-react';

export default function TorquePowerTool() {
  const [mode, setMode] = useState<'power' | 'torque' | 'speed'>('power');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric'); // Metric: kW, Nm. Imperial: HP, lb-ft
  
  const [power, setPower] = useState('10');
  const [torque, setTorque] = useState('100');
  const [speed, setSpeed] = useState('1500'); // RPM

  const calculate = () => {
    const P = parseFloat(power);
    const T = parseFloat(torque);
    const N = parseFloat(speed);

    // Formulas:
    // Metric: P(kW) = T(Nm) * N(RPM) / 9548.8
    // Imperial: P(HP) = T(lb-ft) * N(RPM) / 5252
    const constant = unit === 'metric' ? 9548.8 : 5252;

    if (mode === 'power') {
      if (!isNaN(T) && !isNaN(N)) {
        return { result: (T * N) / constant, unit: unit === 'metric' ? 'kW' : 'HP' };
      }
    } else if (mode === 'torque') {
      if (!isNaN(P) && !isNaN(N) && N > 0) {
        return { result: (P * constant) / N, unit: unit === 'metric' ? 'Nm' : 'lb-ft' };
      }
    } else if (mode === 'speed') {
      if (!isNaN(P) && !isNaN(T) && T > 0) {
        return { result: (P * constant) / T, unit: 'RPM' };
      }
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Torque, Power & Speed Calculator" description="Calculate mechanical power, torque, or rotational speed for motors and engines." category="engineering" seoTitle="Torque to HP / kW Calculator | Mechanical Power" seoDescription="Convert between torque (Nm / lb-ft), power (kW / HP), and speed (RPM). Free mechanical engineering calculator for motors and engines.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
            <div className="flex bg-gray-100 p-1 rounded-lg">
                <button onClick={() => setMode('power')} className={`px-4 py-2 rounded-md font-bold text-sm ${mode === 'power' ? 'bg-white shadow text-indigo-700' : 'text-gray-600'}`}>Find Power</button>
                <button onClick={() => setMode('torque')} className={`px-4 py-2 rounded-md font-bold text-sm ${mode === 'torque' ? 'bg-white shadow text-indigo-700' : 'text-gray-600'}`}>Find Torque</button>
                <button onClick={() => setMode('speed')} className={`px-4 py-2 rounded-md font-bold text-sm ${mode === 'speed' ? 'bg-white shadow text-indigo-700' : 'text-gray-600'}`}>Find Speed</button>
            </div>
            
            <div className="flex bg-gray-100 p-1 rounded-lg">
                <button onClick={() => setUnit('metric')} className={`px-4 py-2 rounded-md font-bold text-sm ${unit === 'metric' ? 'bg-indigo-600 text-white' : 'text-gray-600'}`}>Metric (kW, Nm)</button>
                <button onClick={() => setUnit('imperial')} className={`px-4 py-2 rounded-md font-bold text-sm ${unit === 'imperial' ? 'bg-indigo-600 text-white' : 'text-gray-600'}`}>Imperial (HP, lb-ft)</button>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {mode !== 'power' && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Power ({unit === 'metric' ? 'kW' : 'HP'})</label>
              <input type="number" value={power} onChange={(e) => setPower(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
            </div>
          )}
          {mode !== 'torque' && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Torque ({unit === 'metric' ? 'Nm' : 'lb-ft'})</label>
              <input type="number" value={torque} onChange={(e) => setTorque(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
            </div>
          )}
          {mode !== 'speed' && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Speed (RPM)</label>
              <input type="number" value={speed} onChange={(e) => setSpeed(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
            </div>
          )}
        </div>

        {res && (
          <div className="bg-indigo-50 p-8 rounded-xl border border-indigo-100 text-center">
            <h3 className="text-sm font-bold text-indigo-800 uppercase tracking-wider mb-2">Calculated {mode}</h3>
            <div className="text-5xl font-black text-indigo-700 flex items-baseline justify-center gap-2">
                {res.result.toFixed(2)} <span className="text-2xl text-indigo-500">{res.unit}</span>
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

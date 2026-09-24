import React, { useState } from 'react';
import { ToolShell } from './ToolShell';

interface InputConfig {
  name: string;
  label: string;
  unit?: string;
  type?: 'number' | 'text';
}

interface OutputConfig {
  name: string;
  label: string;
  unit?: string;
}

interface GenericCalculatorProps {
  tool: { 
    name: string; 
    desc: string; 
    category: string;
    seoTitle?: string;
    seoDescription?: string;
    faqs?: {q: string, a: string}[];
  };
  inputs: InputConfig[];
  outputs: OutputConfig[];
  calculate: (values: Record<string, number>) => Record<string, number>;
  formulaDesc?: string;
}

export function GenericCalculator({ tool, inputs, outputs, calculate, formulaDesc }: GenericCalculatorProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, number> | null>(null);

  const handleCalculate = () => {
    const numValues: Record<string, number> = {};
    for (const [key, val] of Object.entries(values)) {
      numValues[key] = parseFloat(String(val || '0'));
    }
    const res = calculate(numValues);
    setResults(res);
  };

  const handleReset = () => {
    setValues({});
    setResults(null);
  };

  return (
    <ToolShell 
      title={tool.name} 
      description={tool.desc} 
      category={tool.category}
      seoTitle={tool.seoTitle}
      seoDescription={tool.seoDescription}
      faqs={tool.faqs}
      article={
        formulaDesc ? (
          <>
            <h3>Formula</h3>
            <div className="bg-gray-100 p-4 rounded-lg font-mono text-center text-lg font-bold mb-4">
              {formulaDesc}
            </div>
          </>
        ) : undefined
      }
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8 max-w-2xl">
        <div className="p-6 grid gap-5">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold text-gray-900">Enter Values</h2>
            <button 
              onClick={handleReset} 
              className="text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50/50 hover:bg-red-50 border border-red-200 px-3 py-1 rounded-full transition-colors cursor-pointer"
            >
              Clear
            </button>
          </div>
          {inputs.map(input => (
            <div key={input.name} className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1.5">{input.label}</label>
              <div className="relative">
                <input
                  type={input.type || 'number'}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-lg"
                  value={values[input.name] || ''}
                  onChange={(e) => setValues({ ...values, [input.name]: e.target.value })}
                  placeholder={`Enter ${input.label.toLowerCase()}`}
                />
                {input.unit && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">{input.unit}</span>}
              </div>
            </div>
          ))}
          <button 
            onClick={handleCalculate}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-base py-3.5 rounded-xl transition-all shadow-xs border border-blue-700 hover:border-blue-800 cursor-pointer"
          >
            Calculate Result
          </button>
        </div>

        {results && (
          <div className="bg-slate-900 p-8 border-t border-slate-800 text-white">
            <h3 className="font-bold text-slate-400 uppercase tracking-wider text-sm mb-6">Results</h3>
            <div className="grid gap-6">
              {outputs.map(out => (
                <div key={out.name} className="flex flex-col sm:flex-row justify-between sm:items-end border-b border-slate-800 pb-4">
                  <span className="text-slate-300 font-medium mb-1 sm:mb-0">{out.label}</span>
                  <div className="flex items-baseline space-x-2">
                    <span className="font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                      {Number.isFinite(results[out.name]) ? Number(results[out.name].toPrecision(6)).toString() : 'Invalid'}
                    </span>
                    <span className="text-blue-400 font-bold text-xl">{out.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const calculators = {
  'power-calculator': {
    compName: 'PowerCalculatorTool',
    category: 'engineering',
    toolDef: { 
      name: "Electrical Power Calculator", 
      desc: "Calculate electrical power using Voltage, Current, and Resistance. Based on Watt's Law.", 
      category: "engineering",
      seoTitle: "Electrical Power Calculator (Watts) | StudentKit",
      seoDescription: "Calculate real electrical power in Watts using Voltage, Current, or Resistance.",
      faqs: [
        { q: "What is Electrical Power?", a: "Power is the rate at which electrical energy is transferred by an electric circuit. The SI unit of power is the watt, one joule per second." },
        { q: "How is it calculated?", a: "The standard formula is P = V × I. If you don't know voltage or current, you can substitute Ohm's law to use P = I² × R or P = V² / R." }
      ]
    },
    inputs: [
      { name: 'v', label: 'Voltage', unit: 'V' },
      { name: 'i', label: 'Current', unit: 'A' },
    ],
    outputs: [
      { name: 'p', label: 'Power', unit: 'W' }
    ],
    formulaDesc: 'P = V × I',
    calculate: `(v) => ({ p: (v.v||0) * (v.i||0) })`
  },
  'percentage-calculator': {
    compName: 'PercentageCalculatorTool',
    category: 'math',
    toolDef: { 
      name: "Percentage Calculator", 
      desc: "Instantly calculate percentages, percentage changes, and percent differences.", 
      category: "math",
      seoTitle: "Percentage Calculator | Fast & Free | StudentKit",
      seoDescription: "Calculate percentages easily. Find what X% of Y is, or calculate percentage increases and decreases.",
      faqs: [
        { q: "What is a percentage?", a: "A percentage is a number or ratio expressed as a fraction of 100." }
      ]
    },
    inputs: [
      { name: 'percent', label: 'Percentage', unit: '%' },
      { name: 'total', label: 'Total Value', unit: '' },
    ],
    outputs: [
      { name: 'result', label: 'Result', unit: '' }
    ],
    formulaDesc: 'Result = (Percentage / 100) × Total Value',
    calculate: `(v) => ({ result: ((v.percent||0) / 100) * (v.total||0) })`
  },
  'rc-time-constant': {
    compName: 'RcTimeConstantTool',
    category: 'engineering',
    toolDef: { 
      name: "RC Time Constant Calculator", 
      desc: "Calculate the time constant (tau) of a resistor-capacitor (RC) circuit.", 
      category: "engineering",
      seoTitle: "RC Time Constant Calculator | StudentKit",
      seoDescription: "Calculate the RC time constant (τ) of a circuit. Understand charge and discharge times for capacitors.",
      faqs: [
        { q: "What is a time constant?", a: "In an RC circuit, the time constant (represented by the Greek letter tau, τ) is the time required to charge the capacitor, through the resistor, to 63.2% of full charge; or to discharge it to 36.8% of its initial voltage." }
      ]
    },
    inputs: [
      { name: 'r', label: 'Resistance', unit: 'Ω' },
      { name: 'c', label: 'Capacitance', unit: 'F' },
    ],
    outputs: [
      { name: 't', label: 'Time Constant (τ)', unit: 's' }
    ],
    formulaDesc: 'τ = R × C',
    calculate: `(v) => ({ t: (v.r||0) * (v.c||0) })`
  },
  'rl-time-constant': {
    compName: 'RlTimeConstantTool',
    category: 'engineering',
    toolDef: { 
      name: "RL Time Constant Calculator", 
      desc: "Calculate the time constant (tau) of a resistor-inductor (RL) circuit.", 
      category: "engineering"
    },
    inputs: [
      { name: 'r', label: 'Resistance', unit: 'Ω' },
      { name: 'l', label: 'Inductance', unit: 'H' },
    ],
    outputs: [
      { name: 't', label: 'Time Constant (τ)', unit: 's' }
    ],
    formulaDesc: 'τ = L / R',
    calculate: `(v) => ({ t: (v.r||0) ? (v.l||0) / (v.r||0) : 0 })`
  },
  'age-calculator': {
    compName: 'AgeCalculatorTool',
    category: 'student',
    toolDef: { 
      name: "Age Calculator", 
      desc: "Calculate your exact age in years based on your birth year.", 
      category: "student" 
    },
    inputs: [
      { name: 'year', label: 'Birth Year', unit: 'YYYY' }
    ],
    outputs: [
      { name: 'age', label: 'Estimated Age', unit: 'years' }
    ],
    formulaDesc: 'Age = Current Year - Birth Year',
    calculate: `(v) => ({ age: new Date().getFullYear() - (v.year||new Date().getFullYear()) })`
  },
  'simple-interest': {
    compName: 'SimpleInterestTool',
    category: 'math',
    toolDef: { 
      name: "Simple Interest Calculator", 
      desc: "Calculate simple interest and total amount for a loan or investment.", 
      category: "math" 
    },
    inputs: [
      { name: 'p', label: 'Principal', unit: '$' },
      { name: 'r', label: 'Rate (Annual)', unit: '%' },
      { name: 't', label: 'Time', unit: 'years' },
    ],
    outputs: [
      { name: 'i', label: 'Interest', unit: '$' },
      { name: 'total', label: 'Total Amount', unit: '$' }
    ],
    formulaDesc: 'I = (P × R × T) / 100',
    calculate: `(v) => {
      const i = ((v.p||0) * (v.r||0) * (v.t||0)) / 100;
      return { i, total: (v.p||0) + i };
    }`
  },
  'area-converter': {
    compName: 'AreaConverterTool',
    category: 'converters',
    toolDef: { name: "Area Converter", desc: "Convert square meters to square feet.", category: "converters" },
    inputs: [
      { name: 'sqm', label: 'Square Meters', unit: 'm²' }
    ],
    outputs: [
      { name: 'sqft', label: 'Square Feet', unit: 'ft²' }
    ],
    formulaDesc: 'ft² = m² × 10.7639',
    calculate: `(v) => ({ sqft: (v.sqm||0) * 10.7639 })`
  }
};

Object.entries(calculators).forEach(([slug, c]) => {
  const filePath = path.join(rootDir, 'src', 'features', c.category, `${c.compName}.tsx`);
  
  const content = `import React from 'react';
import { GenericCalculator } from '@/components/tools/GenericCalculator';

export default function ${c.compName}() {
  return (
    <GenericCalculator 
      tool={${JSON.stringify(c.toolDef, null, 2)}}
      inputs={${JSON.stringify(c.inputs, null, 2)}}
      outputs={${JSON.stringify(c.outputs, null, 2)}}
      formulaDesc="${c.formulaDesc}"
      calculate={${c.calculate}}
    />
  );
}
`;

  fs.writeFileSync(filePath, content);
});

console.log('Implemented functional calculators.');

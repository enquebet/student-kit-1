import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Search } from 'lucide-react';

export default function ResistorCalculatorTool() {
  const [smdCode, setSmdCode] = useState('');
  const [result, setResult] = useState<{ value: string; error?: string } | null>(null);

  const calculate = () => {
    const code = smdCode.trim().toUpperCase();
    if (!code) {
      setResult(null);
      return;
    }

    // EIA-96 lookup
    const eia96Map: Record<string, number> = {
      '01': 100, '02': 102, '03': 105, '04': 107, '05': 110, '06': 113, '07': 115, '08': 118, '09': 121, '10': 124,
      '11': 127, '12': 130, '13': 133, '14': 137, '15': 140, '16': 143, '17': 147, '18': 150, '19': 154, '20': 158,
      '21': 162, '22': 165, '23': 169, '24': 174, '25': 178, '26': 182, '27': 187, '28': 191, '29': 196, '30': 200,
      '31': 205, '32': 210, '33': 215, '34': 221, '35': 226, '36': 232, '37': 237, '38': 243, '39': 249, '40': 255,
      '41': 261, '42': 267, '43': 274, '44': 280, '45': 287, '46': 294, '47': 301, '48': 309, '49': 316, '50': 324,
      '51': 332, '52': 340, '53': 348, '54': 357, '55': 365, '56': 374, '57': 383, '58': 392, '59': 402, '60': 412,
      '61': 422, '62': 432, '63': 442, '64': 453, '65': 464, '66': 475, '67': 487, '68': 499, '69': 511, '70': 523,
      '71': 536, '72': 549, '73': 562, '74': 576, '75': 590, '76': 604, '77': 619, '78': 634, '79': 649, '80': 665,
      '81': 681, '82': 698, '83': 715, '84': 732, '85': 750, '86': 768, '87': 787, '88': 806, '89': 825, '90': 845,
      '91': 866, '92': 887, '93': 909, '94': 931, '95': 953, '96': 976
    };
    const eia96Mult: Record<string, number> = {
      'Z': 0.001, 'Y': 0.01, 'R': 0.01, 'X': 0.1, 'S': 0.1, 'A': 1, 'B': 10, 'H': 10, 'C': 100, 'D': 1000, 'E': 10000, 'F': 100000
    };

    const formatR = (r: number) => {
        if (r >= 1000000) return `${(r / 1000000).toPrecision(4).replace(/\.0+$/, '')} MΩ`;
        if (r >= 1000) return `${(r / 1000).toPrecision(4).replace(/\.0+$/, '')} kΩ`;
        return `${r.toPrecision(4).replace(/\.0+$/, '')} Ω`;
    };

    // 3 or 4 digit standard (e.g. 103, 4702)
    if (/^\d{3,4}$/.test(code)) {
      const digits = parseInt(code.slice(0, -1));
      const mult = parseInt(code.slice(-1));
      setResult({ value: formatR(digits * Math.pow(10, mult)) });
      return;
    }

    // R format (e.g. 4R7)
    if (/^\d*[R]\d*$/.test(code) && code !== 'R') {
      const val = parseFloat(code.replace('R', '.'));
      setResult({ value: formatR(val) });
      return;
    }

    // EIA-96 format (e.g. 01C)
    if (/^\d{2}[A-Z]$/.test(code)) {
      const numPart = code.slice(0, 2);
      const letterPart = code.slice(2, 3);
      if (eia96Map[numPart] && eia96Mult[letterPart]) {
         const val = eia96Map[numPart] * eia96Mult[letterPart];
         setResult({ value: formatR(val) });
         return;
      }
    }

    setResult({ value: '', error: 'Unrecognized SMD resistor code format.' });
  };

  return (
    <ToolShell title="SMD Resistor Code Calculator" description="Find the resistance value from an SMD resistor code (3-digit, 4-digit, or EIA-96)." category="engineering" seoTitle="SMD Resistor Code Calculator | 3-digit, 4-digit, EIA-96 | StudentKit" seoDescription="Decode SMD resistor markings instantly. Supports standard 3-digit, 4-digit, R-notation, and EIA-96 codes.">
      <div className="max-w-2xl mx-auto space-y-8">
        
        <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
          <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Enter SMD Code</label>
          <div className="flex max-w-sm mx-auto shadow-sm rounded-lg overflow-hidden border focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
             <input 
                type="text" 
                value={smdCode} 
                onChange={(e) => { setSmdCode(e.target.value); setResult(null); }} 
                className="w-full p-4 font-mono text-2xl text-center uppercase focus:outline-none" 
                placeholder="e.g. 103, 4R7, 01C" 
                maxLength={4}
                onKeyDown={(e) => e.key === 'Enter' && calculate()}
             />
             <button onClick={calculate} className="bg-indigo-50 px-6 text-indigo-600 hover:bg-indigo-100 transition-colors">
                <Search className="w-6 h-6" />
             </button>
          </div>
          
          {result && !result.error && (
             <div className="mt-8 p-6 bg-emerald-50 border border-emerald-100 rounded-xl">
                 <div className="text-4xl font-bold text-emerald-600">{result.value}</div>
             </div>
          )}
          {result && result.error && (
             <div className="mt-8 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
                 {result.error}
             </div>
          )}
        </div>

        <div className="prose max-w-none bg-white p-8 rounded-xl border">
          <h2>Reading SMD Resistor Codes</h2>
          <p>Surface Mount Device (SMD) resistors are too small to have standard color bands printed on them. Instead, a few different coding systems are used.</p>
          
          <h3>3 and 4 Digit System</h3>
          <p>The first 2 (or 3) digits indicate the significant figures, and the last digit indicates the multiplier (number of zeros to add). For example:</p>
          <ul>
             <li><code>103</code> = 10 followed by 3 zeros = 10,000 Ω = 10 kΩ</li>
             <li><code>4702</code> = 470 followed by 2 zeros = 47,000 Ω = 47 kΩ</li>
          </ul>

          <h3>R-Notation (Decimal Point)</h3>
          <p>For values less than 100 ohms, the letter 'R' is often used to indicate the position of a decimal point.</p>
          <ul>
             <li><code>4R7</code> = 4.7 Ω</li>
             <li><code>R22</code> = 0.22 Ω</li>
          </ul>

          <h3>EIA-96 System</h3>
          <p>This system uses a two-digit number to refer to a specific base value from the EIA-96 standard series, followed by a letter to indicate the multiplier. Example: <code>01C</code> = 10 kΩ.</p>
        </div>
      </div>
    </ToolShell>
  );
}

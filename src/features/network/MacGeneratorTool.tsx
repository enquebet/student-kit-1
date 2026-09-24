import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function MacGeneratorTool() {
  const [format, setFormat] = useState<'colon' | 'hyphen' | 'dot' | 'none'>('colon');
  const [caseType, setCaseType] = useState<'upper' | 'lower'>('upper');
  const [macs, setMacs] = useState<string[]>([]);
  const [count, setCount] = useState('5');

  const generate = () => {
    const num = parseInt(count) || 1;
    const limit = Math.min(Math.max(num, 1), 50); // limit 1-50
    const newMacs: string[] = [];

    for (let i = 0; i < limit; i++) {
      const hexDigits = "0123456789ABCDEF";
      let mac = "";
      for (let j = 0; j < 6; j++) {
        mac += hexDigits.charAt(Math.floor(Math.random() * 16));
        mac += hexDigits.charAt(Math.floor(Math.random() * 16));
      }

      if (caseType === 'lower') {
         mac = mac.toLowerCase();
      }

      let formatted = mac;
      if (format === 'colon') formatted = mac.match(/.{1,2}/g)?.join(':') || mac;
      if (format === 'hyphen') formatted = mac.match(/.{1,2}/g)?.join('-') || mac;
      if (format === 'dot') formatted = mac.match(/.{1,4}/g)?.join('.') || mac;

      newMacs.push(formatted);
    }
    setMacs(newMacs);
  };

  return (
    <ToolShell title="MAC Address Generator" description="Generate random MAC addresses with custom formatting." category="network" seoTitle="MAC Address Generator | Random MAC Creator" seoDescription="Generate valid random MAC addresses for networking and testing in various formats (colons, hyphens, dots).">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Format</label>
            <select value={format} onChange={(e) => setFormat(e.target.value as any)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-violet-500 outline-none">
              <option value="colon">Colon (XX:XX...)</option>
              <option value="hyphen">Hyphen (XX-XX...)</option>
              <option value="dot">Dot (XXXX.XXXX...)</option>
              <option value="none">None (XXXXXXXXXXXX)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Case</label>
            <select value={caseType} onChange={(e) => setCaseType(e.target.value as any)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-violet-500 outline-none">
              <option value="upper">Uppercase</option>
              <option value="lower">Lowercase</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Count (Max 50)</label>
            <input type="number" value={count} onChange={(e) => setCount(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-violet-500 outline-none" min="1" max="50" />
          </div>
        </div>

        <button onClick={generate} className="w-full py-4 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl transition-colors mb-8 shadow-sm">
          Generate MAC Addresses
        </button>

        {macs.length > 0 && (
          <div className="bg-gray-50 border rounded-xl p-4">
             <div className="flex flex-col gap-2 font-mono text-lg text-gray-800 text-center">
                {macs.map((mac, idx) => (
                   <div key={idx} className="bg-white p-2 rounded shadow-sm border">{mac}</div>
                ))}
             </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

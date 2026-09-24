import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function BandwidthCalculatorTool() {
  const [size, setSize] = useState('10');
  const [sizeUnit, setSizeUnit] = useState('GB');
  
  const [speed, setSpeed] = useState('100');
  const [speedUnit, setSpeedUnit] = useState('Mbps');

  const calculate = () => {
    const sz = parseFloat(size);
    const sp = parseFloat(speed);

    if (sz > 0 && sp > 0) {
      // Convert size to Megabits
      let sizeInMbits = sz;
      if (sizeUnit === 'KB') sizeInMbits = sz * 8 / 1024;
      if (sizeUnit === 'MB') sizeInMbits = sz * 8;
      if (sizeUnit === 'GB') sizeInMbits = sz * 8 * 1024;
      if (sizeUnit === 'TB') sizeInMbits = sz * 8 * 1024 * 1024;

      // Convert speed to Megabits per second
      let speedInMbits = sp;
      if (speedUnit === 'Kbps') speedInMbits = sp / 1000;
      if (speedUnit === 'Gbps') speedInMbits = sp * 1000;
      if (speedUnit === 'MB/s') speedInMbits = sp * 8;

      const seconds = sizeInMbits / speedInMbits;

      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = Math.floor(seconds % 60);

      let timeStr = '';
      if (h > 0) timeStr += `${h} hr `;
      if (m > 0 || h > 0) timeStr += `${m} min `;
      timeStr += `${s} sec`;

      return {
        seconds: seconds.toFixed(2),
        timeStr
      };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Bandwidth Calculator" description="Calculate file transfer times based on file size and connection speed." category="network" seoTitle="Bandwidth Calculator | File Transfer Time" seoDescription="Estimate how long it will take to download or upload a file based on its size and your internet connection speed.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
             <label className="block text-sm font-bold text-gray-700 mb-2">File Size</label>
             <div className="flex gap-2">
                 <input type="number" value={size} onChange={(e) => setSize(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none" min="0" step="any" />
                 <select value={sizeUnit} onChange={(e) => setSizeUnit(e.target.value)} className="p-3 border rounded-lg bg-white focus:ring-2 focus:ring-sky-500 outline-none">
                     <option value="KB">KB</option>
                     <option value="MB">MB</option>
                     <option value="GB">GB</option>
                     <option value="TB">TB</option>
                 </select>
             </div>
          </div>
          <div>
             <label className="block text-sm font-bold text-gray-700 mb-2">Transfer Speed</label>
             <div className="flex gap-2">
                 <input type="number" value={speed} onChange={(e) => setSpeed(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none" min="0" step="any" />
                 <select value={speedUnit} onChange={(e) => setSpeedUnit(e.target.value)} className="p-3 border rounded-lg bg-white focus:ring-2 focus:ring-sky-500 outline-none">
                     <option value="Kbps">Kbps</option>
                     <option value="Mbps">Mbps</option>
                     <option value="Gbps">Gbps</option>
                     <option value="MB/s">MB/s</option>
                 </select>
             </div>
          </div>
        </div>

        {res && (
          <div className="bg-sky-50 p-8 rounded-xl border border-sky-100 text-center">
             <h3 className="text-sm font-bold text-sky-800 uppercase tracking-wider mb-2">Estimated Transfer Time</h3>
             <div className="text-4xl md:text-5xl font-black text-sky-700 mb-2">
                 {res.timeStr}
             </div>
             <div className="text-sm font-bold text-sky-600/70">
                 ({res.seconds} total seconds)
             </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

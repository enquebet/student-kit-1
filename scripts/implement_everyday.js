import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const everydayPath = path.join(rootDir, 'src', 'features', 'everyday');

fs.writeFileSync(path.join(everydayPath, 'RandomNumberGeneratorTool.tsx'), `import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function RandomNumberGeneratorTool() {
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [count, setCount] = useState('1');
  const [results, setResults] = useState<number[]>([]);

  const generate = () => {
    const minVal = parseInt(min) || 0;
    const maxVal = parseInt(max) || 100;
    const c = Math.min(parseInt(count) || 1, 1000); // limit to 1000
    
    if (minVal >= maxVal) return;
    
    const arr = [];
    for(let i=0; i<c; i++){
       arr.push(Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal);
    }
    setResults(arr);
  };

  return (
    <ToolShell title="Random Number Generator" description="Generate random numbers securely." category="everyday" seoTitle="Random Number Generator | 1 to 100 | StudentKit" seoDescription="Generate completely random numbers within any custom range instantly.">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 space-y-4">
           <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Minimum Value</label>
              <input type="number" value={min} onChange={e=>setMin(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" />
           </div>
           <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Maximum Value</label>
              <input type="number" value={max} onChange={e=>setMax(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" />
           </div>
           <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">How many numbers?</label>
              <input type="number" min="1" max="1000" value={count} onChange={e=>setCount(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" />
           </div>
           <button onClick={generate} className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
             Generate
           </button>
        </div>
        <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white h-[400px] flex flex-col">
           <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Results</h2>
           <div className="flex-1 overflow-y-auto pr-2">
              {results.length > 0 ? (
                 <div className="flex flex-wrap gap-3">
                    {results.map((r,i) => (
                       <div key={i} className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-xl font-bold font-mono">{r}</div>
                    ))}
                 </div>
              ) : (
                 <p className="text-slate-500 font-medium">Click generate to see results.</p>
              )}
           </div>
        </div>
      </div>
    </ToolShell>
  );
}
`);

fs.writeFileSync(path.join(everydayPath, 'DaysBetweenDatesTool.tsx'), `import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function DaysBetweenDatesTool() {
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  
  let days = 0;
  if (date1 && date2) {
     const d1 = new Date(date1);
     const d2 = new Date(date2);
     if (!isNaN(d1.getTime()) && !isNaN(d2.getTime())) {
        const diff = Math.abs(d2.getTime() - d1.getTime());
        days = Math.ceil(diff / (1000 * 3600 * 24));
     }
  }

  return (
    <ToolShell title="Days Between Dates" description="Calculate days between two dates." category="everyday" seoTitle="Days Between Two Dates Calculator | StudentKit" seoDescription="Find out exactly how many days are between two specific dates in history.">
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 space-y-6">
           <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Start Date</label>
              <input type="date" value={date1} onChange={e=>setDate1(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" />
           </div>
           <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">End Date</label>
              <input type="date" value={date2} onChange={e=>setDate2(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" />
           </div>
        </div>
        <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white flex flex-col justify-center items-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -mr-10 -mt-10 pointer-events-none"></div>
           <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 relative z-10">Difference</h2>
           <div className="relative z-10 text-center">
              {date1 && date2 ? (
                 <div className="flex flex-col items-center gap-2">
                    <div className="text-6xl font-extrabold text-white tracking-tight">{days}</div>
                    <div className="text-xl text-blue-400 font-bold">Days</div>
                    <div className="text-sm text-slate-400 mt-4">({(days/7).toFixed(1)} weeks or {(days/30.44).toFixed(1)} months)</div>
                 </div>
              ) : (
                 <span className="text-xl text-slate-500 font-medium">Select dates</span>
              )}
           </div>
        </div>
      </div>
    </ToolShell>
  );
}
`);

fs.writeFileSync(path.join(everydayPath, 'DateDifferenceTool.tsx'), `import React from 'react';
import DaysBetweenDatesTool from './DaysBetweenDatesTool';
export default function DateDifferenceTool() {
  // Alias for DaysBetweenDatesTool
  return <DaysBetweenDatesTool />;
}
`);

fs.writeFileSync(path.join(everydayPath, 'StopwatchTool.tsx'), `import React, { useState, useEffect } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Play, Pause, Square, Flag } from 'lucide-react';

export default function StopwatchTool() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let interval: any;
    if (running) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return \`\${minutes.toString().padStart(2, '0')}:\${seconds.toString().padStart(2, '0')}.\${centiseconds.toString().padStart(2, '0')}\`;
  };

  return (
    <ToolShell title="Stopwatch" description="Browser-based stopwatch with lap functionality." category="everyday" seoTitle="Online Stopwatch Timer | StudentKit" seoDescription="A free online stopwatch timer with lap tracking.">
      <div className="max-w-2xl mx-auto bg-slate-900 rounded-3xl shadow-xl border border-slate-800 p-8 md:p-12 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none"></div>
        
        <div className="text-7xl md:text-8xl font-black font-mono tracking-tighter mb-12 relative z-10 text-white drop-shadow-lg">
          {formatTime(time)}
        </div>
        
        <div className="flex justify-center items-center gap-4 relative z-10 mb-8">
           {running ? (
             <button onClick={() => setRunning(false)} className="w-16 h-16 bg-yellow-500 hover:bg-yellow-600 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-lg">
               <Pause className="w-8 h-8 text-slate-900 fill-current" />
             </button>
           ) : (
             <button onClick={() => setRunning(true)} className="w-16 h-16 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-lg">
               <Play className="w-8 h-8 text-white fill-current translate-x-1" />
             </button>
           )}
           
           <button onClick={() => { if(running) setLaps([...laps, time]) }} disabled={!running} className="w-16 h-16 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:hover:bg-slate-800 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-lg">
             <Flag className="w-6 h-6 text-slate-300" />
           </button>
           
           <button onClick={() => { setRunning(false); setTime(0); setLaps([]); }} className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-lg">
             <Square className="w-6 h-6 text-white fill-current" />
           </button>
        </div>
        
        {laps.length > 0 && (
          <div className="bg-slate-800/50 rounded-2xl p-4 max-h-[200px] overflow-y-auto text-left relative z-10">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Laps</h3>
            {laps.map((lap, i) => (
               <div key={i} className="flex justify-between items-center py-2 px-2 border-b border-slate-700/50 last:border-0 font-mono text-sm">
                 <span className="text-slate-400">Lap {i + 1}</span>
                 <span className="font-bold text-slate-200">{formatTime(lap)}</span>
               </div>
            ))}
          </div>
        )}
      </div>
    </ToolShell>
  );
}
`);

fs.writeFileSync(path.join(everydayPath, 'CountdownTimerTool.tsx'), `import React, { useState, useEffect } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function CountdownTimerTool() {
  const [minutes, setMinutes] = useState('5');
  const [seconds, setSeconds] = useState('0');
  const [timeLeft, setTimeLeft] = useState(300);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval: any;
    if (running && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setRunning(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running, timeLeft]);

  const handleStart = () => {
    if (!running && timeLeft === 0) {
      // reset based on inputs
      const m = parseInt(minutes) || 0;
      const s = parseInt(seconds) || 0;
      setTimeLeft(m * 60 + s);
    }
    setRunning(true);
  };
  
  const handleReset = () => {
    setRunning(false);
    const m = parseInt(minutes) || 0;
    const s = parseInt(seconds) || 0;
    setTimeLeft(m * 60 + s);
  };

  const displayMins = Math.floor(timeLeft / 60);
  const displaySecs = timeLeft % 60;

  return (
    <ToolShell title="Countdown Timer" description="Simple countdown timer utility." category="everyday" seoTitle="Online Countdown Timer | StudentKit" seoDescription="Set a countdown timer for studying, cooking, or breaks online.">
      <div className="max-w-2xl mx-auto bg-slate-900 rounded-3xl shadow-xl border border-slate-800 p-8 md:p-12 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none"></div>
        
        <div className="flex justify-center gap-4 mb-8 relative z-10">
           <div className="flex flex-col items-center">
             <input type="number" min="0" value={minutes} onChange={e => {setMinutes(e.target.value); setRunning(false); setTimeLeft(parseInt(e.target.value)*60 + (parseInt(seconds)||0))}} disabled={running} className="w-20 px-2 py-2 bg-slate-800 border border-slate-700 rounded-lg text-center font-bold outline-none text-xl text-white" />
             <span className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-widest">Min</span>
           </div>
           <div className="text-3xl font-bold text-slate-500 mt-2">:</div>
           <div className="flex flex-col items-center">
             <input type="number" min="0" max="59" value={seconds} onChange={e => {setSeconds(e.target.value); setRunning(false); setTimeLeft((parseInt(minutes)||0)*60 + parseInt(e.target.value))}} disabled={running} className="w-20 px-2 py-2 bg-slate-800 border border-slate-700 rounded-lg text-center font-bold outline-none text-xl text-white" />
             <span className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-widest">Sec</span>
           </div>
        </div>

        <div className={\`text-8xl md:text-9xl font-black font-mono tracking-tighter mb-12 relative z-10 drop-shadow-lg \${timeLeft === 0 ? 'text-red-500 animate-pulse' : 'text-white'}\`}>
          {displayMins.toString().padStart(2, '0')}:{displaySecs.toString().padStart(2, '0')}
        </div>
        
        <div className="flex justify-center items-center gap-4 relative z-10">
           {running ? (
             <button onClick={() => setRunning(false)} className="w-16 h-16 bg-yellow-500 hover:bg-yellow-600 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-lg">
               <Pause className="w-8 h-8 text-slate-900 fill-current" />
             </button>
           ) : (
             <button onClick={handleStart} className="w-16 h-16 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-lg">
               <Play className="w-8 h-8 text-white fill-current translate-x-1" />
             </button>
           )}
           
           <button onClick={handleReset} className="w-16 h-16 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-lg">
             <RotateCcw className="w-6 h-6 text-slate-300" />
           </button>
        </div>
      </div>
    </ToolShell>
  );
}
`);

console.log('Everyday tools implemented.');

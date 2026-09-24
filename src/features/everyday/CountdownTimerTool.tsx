import React, { useState, useEffect } from 'react';
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

        <div className={`text-8xl md:text-9xl font-black font-mono tracking-tighter mb-12 relative z-10 drop-shadow-lg ${timeLeft === 0 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
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

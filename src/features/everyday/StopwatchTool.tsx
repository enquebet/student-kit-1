import React, { useState, useEffect } from 'react';
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
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
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

import React, { useState, useEffect } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function StudyTimerTool() {
  const [mode, setMode] = useState<'pomodoro' | 'shortBreak' | 'longBreak'>('pomodoro');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  const times = {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Could add notification sound here
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(times[mode]);
  };

  const switchMode = (newMode: 'pomodoro' | 'shortBreak' | 'longBreak') => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(times[newMode]);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <ToolShell title="Study Timer (Pomodoro)" description="Boost your productivity using the Pomodoro technique. Work in focused intervals separated by short breaks." category="student" seoTitle="Pomodoro Study Timer | StudentKit" seoDescription="Free online Pomodoro study timer to help you focus and increase productivity with 25-minute work intervals and short breaks.">
      <div className="max-w-xl mx-auto">
        <div className="bg-slate-900 rounded-3xl shadow-xl border border-slate-800 p-8 text-center">
          
          <div className="flex justify-center space-x-2 mb-8 bg-slate-800 p-1 rounded-full w-max mx-auto">
            <button onClick={() => switchMode('pomodoro')} className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${mode === 'pomodoro' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'}`}>Pomodoro</button>
            <button onClick={() => switchMode('shortBreak')} className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${mode === 'shortBreak' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'}`}>Short Break</button>
            <button onClick={() => switchMode('longBreak')} className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${mode === 'longBreak' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'}`}>Long Break</button>
          </div>

          <div className="text-8xl font-bold text-white tracking-tighter mb-12 font-mono tabular-nums">
            {formatTime(timeLeft)}
          </div>

          <div className="flex justify-center gap-4">
            <button 
              onClick={toggleTimer} 
              className={`flex items-center justify-center gap-2 w-32 py-4 rounded-xl font-bold text-lg transition-transform active:scale-95 ${isActive ? 'bg-rose-500 text-white hover:bg-rose-600' : 'bg-emerald-500 text-white hover:bg-emerald-600'}`}
            >
              {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isActive ? 'Pause' : 'Start'}
            </button>
            <button 
              onClick={resetTimer}
              className="flex items-center justify-center p-4 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              aria-label="Reset Timer"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="prose max-w-none mt-12 bg-white p-8 rounded-xl border">
          <h2>The Pomodoro Technique</h2>
          <p>The Pomodoro Technique is a time management method developed by Francesco Cirillo. It uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks.</p>
          <ol>
            <li>Decide on the task to be done.</li>
            <li>Set the pomodoro timer (traditionally to 25 minutes).</li>
            <li>Work on the task.</li>
            <li>End work when the timer rings and take a short break (5 minutes).</li>
            <li>If you have finished fewer than four pomodoros, go back to Step 2.</li>
            <li>After four pomodoros are done, take a long break (15–30 minutes).</li>
          </ol>
        </div>
      </div>
    </ToolShell>
  );
}

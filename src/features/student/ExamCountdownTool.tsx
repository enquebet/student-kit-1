import React, { useState, useEffect } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Calendar } from 'lucide-react';

export default function ExamCountdownTool() {
  const [examDate, setExamDate] = useState<string>('');
  const [examName, setExamName] = useState<string>('Final Exam');
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    if (!examDate) {
      setTimeLeft(null);
      return;
    }

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(examDate).getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [examDate]);

  return (
    <ToolShell title="Exam Countdown" description="Set a date for your upcoming exam and track exactly how much time you have left to prepare." category="student" seoTitle="Exam Countdown Timer | StudentKit" seoDescription="Track the days, hours, minutes, and seconds left until your exam with this free countdown timer.">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Exam Name</label>
            <input type="text" value={examName} onChange={(e) => setExamName(e.target.value)} className="w-full p-2 border rounded-md" placeholder="e.g., Biology 101 Final" />
          </div>
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Exam Date & Time</label>
            <input type="datetime-local" value={examDate} onChange={(e) => setExamDate(e.target.value)} className="w-full p-2 border rounded-md" />
          </div>
        </div>

        {timeLeft !== null && (
          <div className="bg-slate-900 rounded-xl p-8 text-center shadow-lg border border-slate-800">
            <h3 className="text-xl font-medium text-slate-300 mb-8 flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-400" /> {examName}
            </h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="text-4xl md:text-5xl font-bold text-white tracking-tight">{timeLeft.days}</div>
                <div className="text-xs font-medium text-slate-400 uppercase mt-2 tracking-wider">Days</div>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="text-4xl md:text-5xl font-bold text-white tracking-tight">{timeLeft.hours}</div>
                <div className="text-xs font-medium text-slate-400 uppercase mt-2 tracking-wider">Hours</div>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="text-4xl md:text-5xl font-bold text-white tracking-tight">{timeLeft.minutes}</div>
                <div className="text-xs font-medium text-slate-400 uppercase mt-2 tracking-wider">Minutes</div>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="text-4xl md:text-5xl font-bold text-indigo-400 tracking-tight">{timeLeft.seconds}</div>
                <div className="text-xs font-medium text-indigo-300 uppercase mt-2 tracking-wider">Seconds</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

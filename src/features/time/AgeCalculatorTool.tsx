import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function AgeCalculatorTool() {
  const [dob, setDob] = useState('');

  const calculate = () => {
    if (!dob) return null;
    const birth = new Date(`${dob}T00:00:00`);
    const today = new Date();
    today.setHours(0,0,0,0);
    
    if (birth > today) return null; // Future date

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const temp = new Date(today.getFullYear(), today.getMonth(), 0);
      days += temp.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((today.getTime() - birth.getTime()) / 86400000);

    return { years, months, days, totalDays };
  };

  const res = calculate();

  return (
    <ToolShell title="Age Calculator" description="Calculate your exact age in years, months, and days." category="time" seoTitle="Exact Age Calculator | Calculate Age from Date of Birth" seoDescription="Find out your exact age in years, months, days, and total lifetime days based on your birth date.">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="mb-8 max-w-sm mx-auto text-center">
            <label className="block text-sm font-bold text-gray-700 mb-2">Select Date of Birth</label>
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-violet-500 outline-none text-lg text-center" />
        </div>

        {res && (
          <div className="bg-violet-50 p-6 rounded-xl border border-violet-100 text-center">
             <div className="text-sm font-bold text-violet-800 uppercase tracking-wider mb-4">Your Exact Age Is</div>
             <div className="text-4xl md:text-5xl font-black text-violet-700 flex flex-wrap justify-center items-baseline gap-2 mb-6">
                 <div>{res.years} <span className="text-xl text-violet-500">years</span></div>
                 <div>{res.months} <span className="text-xl text-violet-500">months</span></div>
                 <div>{res.days} <span className="text-xl text-violet-500">days</span></div>
             </div>
             
             <div className="border-t border-violet-200 pt-4">
                <div className="text-sm font-medium text-violet-600">Total days alive:</div>
                <div className="text-2xl font-bold text-violet-900">{res.totalDays.toLocaleString()} days</div>
             </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

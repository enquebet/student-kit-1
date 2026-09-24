import React, { useState, useEffect } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function UnixTimestampTool() {
  const [timestamp, setTimestamp] = useState('');
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const now = Math.floor(Date.now() / 1000);
    setTimestamp(now.toString());
    
    // Format to YYYY-MM-DDThh:mm
    const tzoffset = (new Date()).getTimezoneOffset() * 60000; // offset in milliseconds
    const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 16);
    setDateStr(localISOTime);
  }, []);

  const getFromStamp = () => {
    const ts = parseInt(timestamp);
    if (!isNaN(ts)) {
      return new Date(ts * 1000).toLocaleString();
    }
    return 'Invalid timestamp';
  };

  const handleDateChange = (val: string) => {
     setDateStr(val);
  }
  const dateToStamp = () => {
     if (dateStr) {
       return Math.floor(new Date(dateStr).getTime() / 1000).toString();
     }
     return '--';
  }

  return (
    <ToolShell title="Unix Timestamp Converter" description="Convert Unix epoch timestamps to human-readable dates and vice versa." category="time" seoTitle="Unix Timestamp Converter | Epoch to Date" seoDescription="Fast tool to convert Unix Epoch timestamps into human readable local dates, and local dates back into timestamps.">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border space-y-8">
        
        {/* Stamp -> Date */}
        <div className="p-6 bg-slate-50 border rounded-xl">
           <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b pb-2">Timestamp to Date</h3>
           <div className="flex flex-col md:flex-row gap-4 items-center">
              <input type="number" value={timestamp} onChange={(e) => setTimestamp(e.target.value)} className="w-full md:w-1/2 p-3 border rounded-lg font-mono focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. 1700000000" />
              <div className="w-full md:w-1/2 p-3 bg-white border rounded-lg text-slate-700 font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                 {getFromStamp()}
              </div>
           </div>
        </div>

        {/* Date -> Stamp */}
        <div className="p-6 bg-slate-50 border rounded-xl">
           <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b pb-2">Date to Timestamp</h3>
           <div className="flex flex-col md:flex-row gap-4 items-center">
              <input type="datetime-local" value={dateStr} onChange={(e) => handleDateChange(e.target.value)} className="w-full md:w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              <div className="w-full md:w-1/2 p-3 bg-white border rounded-lg font-mono text-indigo-700 font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                 {dateToStamp()}
              </div>
           </div>
        </div>

      </div>
    </ToolShell>
  );
}

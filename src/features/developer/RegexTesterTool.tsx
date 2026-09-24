import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Search } from 'lucide-react';

export default function RegexTesterTool() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('');
  
  let matches: string[] = [];
  let error = '';
  
  try {
    if (pattern) {
      const regex = new RegExp(pattern, flags);
      const m = text.match(regex);
      if (m) matches = m;
    }
  } catch(e: any) {
    error = e.message;
  }

  return (
    <ToolShell title="Regex Tester" description="Test regular expressions against strings." category="developer" seoTitle="Regex Tester Online | StudentKit" seoDescription="Test and debug JavaScript regular expressions in real-time.">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex gap-2">
             <div className="bg-gray-100 border border-gray-300 rounded-lg flex items-center px-4 font-mono font-bold text-gray-500">/</div>
             <input type="text" value={pattern} onChange={e=>setPattern(e.target.value)} placeholder="Pattern (e.g. \d+)" className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono" />
             <div className="bg-gray-100 border border-gray-300 rounded-lg flex items-center px-4 font-mono font-bold text-gray-500">/</div>
             <input type="text" value={flags} onChange={e=>setFlags(e.target.value)} placeholder="Flags (e.g. g, i)" className="w-24 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono" />
          </div>
          {error && <div className="text-red-500 text-sm font-semibold">{error}</div>}
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
           <div className="flex flex-col h-full">
             <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Test String</h2>
             <textarea value={text} onChange={e=>setText(e.target.value)} className="w-full flex-1 min-h-[200px] p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none text-gray-700 font-mono text-sm" placeholder="Text to match against..."></textarea>
           </div>
           <div className="flex flex-col h-full bg-slate-900 rounded-xl p-4 text-white">
             <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Matches ({matches.length})</h2>
             <div className="flex-1 overflow-y-auto space-y-2">
                {matches.length === 0 ? <p className="text-slate-500 text-sm">No matches found.</p> : null}
                {matches.map((m, i) => (
                  <div key={i} className="bg-slate-800 p-2 rounded border border-slate-700 font-mono text-sm text-green-400 break-all">{m}</div>
                ))}
             </div>
           </div>
        </div>
      </div>
    </ToolShell>
  );
}

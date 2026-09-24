import React, { useState, useEffect } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function HashGeneratorTool() {
  const [input, setInput] = useState('');
  const [sha256, setSha256] = useState('');
  const [sha384, setSha384] = useState('');
  const [sha512, setSha512] = useState('');

  useEffect(() => {
    const generateHashes = async () => {
      if (!input) {
        setSha256(''); setSha384(''); setSha512(''); return;
      }
      try {
        const msgUint8 = new TextEncoder().encode(input);
        
        const hash256Buffer = await crypto.subtle.digest('SHA-256', msgUint8);
        const hash256Array = Array.from(new Uint8Array(hash256Buffer));
        setSha256(hash256Array.map(b => b.toString(16).padStart(2, '0')).join(''));

        const hash384Buffer = await crypto.subtle.digest('SHA-384', msgUint8);
        const hash384Array = Array.from(new Uint8Array(hash384Buffer));
        setSha384(hash384Array.map(b => b.toString(16).padStart(2, '0')).join(''));

        const hash512Buffer = await crypto.subtle.digest('SHA-512', msgUint8);
        const hash512Array = Array.from(new Uint8Array(hash512Buffer));
        setSha512(hash512Array.map(b => b.toString(16).padStart(2, '0')).join(''));
      } catch(e) {
        setSha256('Error');
      }
    };
    generateHashes();
  }, [input]);

  return (
    <ToolShell title="Hash Generator" description="Generate SHA-256 and other hashes." category="developer" seoTitle="Hash Generator | SHA256 & SHA512 | StudentKit" seoDescription="Generate secure SHA-256, SHA-384, and SHA-512 cryptographic hashes locally.">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col h-full">
           <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Input String</h2>
           <textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full flex-1 min-h-[250px] p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none resize-none text-gray-700 font-mono text-sm" placeholder="String to hash..."></textarea>
        </div>
        <div className="bg-slate-900 rounded-2xl p-6 flex flex-col text-white">
           <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Generated Hashes</h2>
           <div className="space-y-6">
              <div>
                <div className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-widest">SHA-256</div>
                <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 font-mono text-xs text-green-400 break-all">{sha256 || '...'}</div>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-widest">SHA-384</div>
                <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 font-mono text-xs text-blue-400 break-all">{sha384 || '...'}</div>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-widest">SHA-512</div>
                <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 font-mono text-xs text-purple-400 break-all">{sha512 || '...'}</div>
              </div>
           </div>
        </div>
      </div>
    </ToolShell>
  );
}

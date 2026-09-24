import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const regexTesterContent = `import React, { useState } from 'react';
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
             <input type="text" value={pattern} onChange={e=>setPattern(e.target.value)} placeholder="Pattern (e.g. \\d+)" className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono" />
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
`;

const hashGeneratorContent = `import React, { useState, useEffect } from 'react';
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
`;

const markdownPreviewContent = `import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function MarkdownPreviewTool() {
  const [input, setInput] = useState('# Hello Markdown\\n\\nType some **markdown** here to preview it.\\n\\n- List item 1\\n- List item 2');

  return (
    <ToolShell title="Markdown Previewer" description="Preview and test markdown locally." category="developer" seoTitle="Markdown Previewer Online | StudentKit" seoDescription="Write and preview GitHub-flavored markdown in real-time.">
      <div className="grid md:grid-cols-2 gap-4 h-[600px]">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
           <div className="bg-gray-100 p-2 border-b border-gray-200"><h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Editor</h2></div>
           <textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full flex-1 p-4 outline-none resize-none font-mono text-sm text-gray-800" placeholder="Type markdown here..."></textarea>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
           <div className="bg-gray-100 p-2 border-b border-gray-200"><h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Preview (Raw HTML rendered)</h2></div>
           <div className="p-4 flex-1 overflow-y-auto prose max-w-none text-sm">
             <div dangerouslySetInnerHTML={{__html: input.replace(/\\n/g, '<br/>').replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>').replace(/^# (.*$)/gim, '<h1>$1</h1>').replace(/^## (.*$)/gim, '<h2>$1</h2>')}} />
             <p className="text-xs text-gray-400 mt-10 italic">* Note: This is a simplified previewer for basic tags.</p>
           </div>
        </div>
      </div>
    </ToolShell>
  );
}
`;

const colorConverterContent = `import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function ColorConverterTool() {
  const [hex, setHex] = useState('#3B82F6');
  
  const hexToRgb = (h: string) => {
    const res = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(h);
    return res ? \`rgb(\${parseInt(res[1], 16)}, \${parseInt(res[2], 16)}, \${parseInt(res[3], 16)})\` : 'Invalid HEX';
  };
  
  const hexToHsl = (h: string) => {
    let res = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(h);
    if (!res) return 'Invalid HEX';
    let r = parseInt(res[1], 16) / 255;
    let g = parseInt(res[2], 16) / 255;
    let b = parseInt(res[3], 16) / 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let hVal = 0, sVal = 0, lVal = (max + min) / 2;
    if(max !== min){
        let d = max - min;
        sVal = lVal > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: hVal = (g - b) / d + (g < b ? 6 : 0); break;
            case g: hVal = (b - r) / d + 2; break;
            case b: hVal = (r - g) / d + 4; break;
        }
        hVal /= 6;
    }
    return \`hsl(\${Math.round(hVal * 360)}, \${Math.round(sVal * 100)}%, \${Math.round(lVal * 100)}%)\`;
  };

  return (
    <ToolShell title="Color Converter" description="Convert between HEX, RGB, and HSL." category="developer" seoTitle="Color Converter | HEX, RGB, HSL | StudentKit" seoDescription="Convert colors easily between HEX, RGB, and HSL formats.">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-2xl mx-auto">
         <div className="flex items-center gap-8 mb-8">
            <div className="w-32 h-32 rounded-2xl shadow-inner border border-gray-200" style={{ backgroundColor: hex.startsWith('#') ? hex : '#fff' }}></div>
            <div className="flex-1">
               <label className="block text-sm font-bold text-gray-700 mb-2">HEX Color</label>
               <input type="text" value={hex} onChange={e=>setHex(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-mono uppercase" />
            </div>
         </div>
         
         <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">RGB</label>
              <div className="w-full px-4 py-3 bg-gray-100 rounded-lg font-mono text-gray-800">{hexToRgb(hex)}</div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">HSL</label>
              <div className="w-full px-4 py-3 bg-gray-100 rounded-lg font-mono text-gray-800">{hexToHsl(hex)}</div>
            </div>
         </div>
      </div>
    </ToolShell>
  );
}
`;

fs.writeFileSync(path.join(rootDir, 'src', 'features', 'developer', 'RegexTesterTool.tsx'), regexTesterContent);
fs.writeFileSync(path.join(rootDir, 'src', 'features', 'developer', 'HashGeneratorTool.tsx'), hashGeneratorContent);
fs.writeFileSync(path.join(rootDir, 'src', 'features', 'developer', 'MarkdownPreviewTool.tsx'), markdownPreviewContent);
fs.writeFileSync(path.join(rootDir, 'src', 'features', 'developer', 'ColorConverterTool.tsx'), colorConverterContent);

console.log('Dev special tools implemented.');

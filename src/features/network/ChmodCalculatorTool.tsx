import React, { useState, useEffect } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function ChmodCalculatorTool() {
  const [perms, setPerms] = useState({
     owner: { r: true, w: true, x: false },
     group: { r: true, w: false, x: false },
     other: { r: true, w: false, x: false }
  });

  const [octal, setOctal] = useState('644');
  const [symbolic, setSymbolic] = useState('-rw-r--r--');

  useEffect(() => {
    let o = 0;
    if (perms.owner.r) o += 4;
    if (perms.owner.w) o += 2;
    if (perms.owner.x) o += 1;

    let g = 0;
    if (perms.group.r) g += 4;
    if (perms.group.w) g += 2;
    if (perms.group.x) g += 1;

    let oth = 0;
    if (perms.other.r) oth += 4;
    if (perms.other.w) oth += 2;
    if (perms.other.x) oth += 1;

    setOctal(`${o}${g}${oth}`);

    const sym = `-${perms.owner.r ? 'r' : '-'}${perms.owner.w ? 'w' : '-'}${perms.owner.x ? 'x' : '-'}${perms.group.r ? 'r' : '-'}${perms.group.w ? 'w' : '-'}${perms.group.x ? 'x' : '-'}${perms.other.r ? 'r' : '-'}${perms.other.w ? 'w' : '-'}${perms.other.x ? 'x' : '-'}`;
    setSymbolic(sym);

  }, [perms]);

  const togglePerm = (entity: 'owner'|'group'|'other', perm: 'r'|'w'|'x') => {
    setPerms(prev => ({
       ...prev,
       [entity]: {
         ...prev[entity],
         [perm]: !prev[entity][perm]
       }
    }));
  };

  return (
    <ToolShell title="CHMOD Calculator" description="Calculate Linux file permissions in octal and symbolic formats." category="network" seoTitle="CHMOD Calculator | Linux File Permissions" seoDescription="Interactive Linux CHMOD calculator to generate octal (e.g. 755) and symbolic (e.g. -rwxr-xr-x) file permissions.">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="grid grid-cols-3 gap-4 mb-8 text-center">
           <div className="bg-gray-50 border rounded-xl p-4">
              <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Owner</h3>
              <div className="flex flex-col gap-3">
                 <label className="flex items-center gap-2 cursor-pointer justify-center"><input type="checkbox" checked={perms.owner.r} onChange={() => togglePerm('owner','r')} className="w-5 h-5 accent-indigo-600" /> Read (4)</label>
                 <label className="flex items-center gap-2 cursor-pointer justify-center"><input type="checkbox" checked={perms.owner.w} onChange={() => togglePerm('owner','w')} className="w-5 h-5 accent-indigo-600" /> Write (2)</label>
                 <label className="flex items-center gap-2 cursor-pointer justify-center"><input type="checkbox" checked={perms.owner.x} onChange={() => togglePerm('owner','x')} className="w-5 h-5 accent-indigo-600" /> Execute (1)</label>
              </div>
           </div>
           <div className="bg-gray-50 border rounded-xl p-4">
              <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Group</h3>
              <div className="flex flex-col gap-3">
                 <label className="flex items-center gap-2 cursor-pointer justify-center"><input type="checkbox" checked={perms.group.r} onChange={() => togglePerm('group','r')} className="w-5 h-5 accent-indigo-600" /> Read (4)</label>
                 <label className="flex items-center gap-2 cursor-pointer justify-center"><input type="checkbox" checked={perms.group.w} onChange={() => togglePerm('group','w')} className="w-5 h-5 accent-indigo-600" /> Write (2)</label>
                 <label className="flex items-center gap-2 cursor-pointer justify-center"><input type="checkbox" checked={perms.group.x} onChange={() => togglePerm('group','x')} className="w-5 h-5 accent-indigo-600" /> Execute (1)</label>
              </div>
           </div>
           <div className="bg-gray-50 border rounded-xl p-4">
              <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Public</h3>
              <div className="flex flex-col gap-3">
                 <label className="flex items-center gap-2 cursor-pointer justify-center"><input type="checkbox" checked={perms.other.r} onChange={() => togglePerm('other','r')} className="w-5 h-5 accent-indigo-600" /> Read (4)</label>
                 <label className="flex items-center gap-2 cursor-pointer justify-center"><input type="checkbox" checked={perms.other.w} onChange={() => togglePerm('other','w')} className="w-5 h-5 accent-indigo-600" /> Write (2)</label>
                 <label className="flex items-center gap-2 cursor-pointer justify-center"><input type="checkbox" checked={perms.other.x} onChange={() => togglePerm('other','x')} className="w-5 h-5 accent-indigo-600" /> Execute (1)</label>
              </div>
           </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
           <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 text-center">
              <div className="text-xs font-bold text-indigo-800 uppercase tracking-wider mb-2">Octal Value</div>
              <div className="text-6xl font-black text-indigo-700">{octal}</div>
           </div>
           <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Symbolic Form</div>
              <div className="text-4xl font-mono font-black text-slate-700 mt-4">{symbolic}</div>
           </div>
        </div>

      </div>
    </ToolShell>
  );
}

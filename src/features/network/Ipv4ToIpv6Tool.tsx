import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function Ipv4ToIpv6Tool() {
  const [ipv4, setIpv4] = useState('192.168.1.1');

  const calculate = () => {
    const ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    
    if (ipPattern.test(ipv4)) {
       const parts = ipv4.split('.');
       const hex = parts.map(p => parseInt(p, 10).toString(16).padStart(2, '0'));
       
       const mapped = `::ffff:${hex[0]}${hex[1]}:${hex[2]}${hex[3]}`;
       
       return mapped;
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="IPv4 to IPv6 Converter" description="Convert an IPv4 address to an IPv4-mapped IPv6 address." category="network" seoTitle="IPv4 to IPv6 Converter Tool" seoDescription="Easily convert standard IPv4 addresses into IPv4-mapped IPv6 addresses.">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="mb-8">
           <label className="block text-sm font-bold text-gray-700 mb-2">IPv4 Address</label>
           <input type="text" value={ipv4} onChange={(e) => setIpv4(e.target.value)} className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none font-mono text-xl" placeholder="192.168.1.1" />
        </div>

        {res ? (
          <div className="bg-cyan-50 p-8 rounded-xl border border-cyan-100 text-center">
             <h3 className="text-sm font-bold text-cyan-800 uppercase tracking-wider mb-4">IPv4-Mapped IPv6 Address</h3>
             <div className="text-3xl sm:text-4xl font-mono font-black text-cyan-700 break-all">
                 {res}
             </div>
          </div>
        ) : (
          <div className="bg-gray-50 p-8 rounded-xl border text-center text-sm font-bold text-gray-500">
             Enter a valid IPv4 address.
          </div>
        )}
      </div>
    </ToolShell>
  );
}

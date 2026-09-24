import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function SubnetCalculatorTool() {
  const [ip, setIp] = useState('192.168.1.1');
  const [cidr, setCidr] = useState('24');

  const ipToInt = (ipAddress: string) => {
    return ipAddress.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
  };

  const intToIp = (intVal: number) => {
    return [
      (intVal >>> 24) & 255,
      (intVal >>> 16) & 255,
      (intVal >>> 8) & 255,
      intVal & 255
    ].join('.');
  };

  const calculate = () => {
    const ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    
    if (ipPattern.test(ip)) {
      const c = parseInt(cidr, 10);
      if (c >= 0 && c <= 32) {
        const ipInt = ipToInt(ip);
        // Handle c=0 case for JS bitwise 32-bit shift
        const maskInt = c === 0 ? 0 : (~((1 << (32 - c)) - 1)) >>> 0;
        const netInt = (ipInt & maskInt) >>> 0;
        const bcastInt = (netInt | (~maskInt >>> 0)) >>> 0;
        
        let hostMin = netInt + 1;
        let hostMax = bcastInt - 1;
        let totalHosts = Math.pow(2, 32 - c) - 2;

        if (c === 31) {
            hostMin = netInt;
            hostMax = bcastInt;
            totalHosts = 2;
        } else if (c === 32) {
            hostMin = netInt;
            hostMax = netInt;
            totalHosts = 1;
        }

        return {
          network: intToIp(netInt),
          broadcast: intToIp(bcastInt),
          netmask: intToIp(maskInt),
          hostMin: intToIp(hostMin),
          hostMax: intToIp(hostMax),
          totalHosts: totalHosts > 0 ? totalHosts.toLocaleString() : '0'
        };
      }
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Subnet Calculator" description="Calculate network, broadcast, and host ranges from an IPv4 address and CIDR." category="network" seoTitle="IPv4 Subnet Calculator | CIDR to IP Range" seoDescription="Calculate subnet masks, network addresses, broadcast addresses, and usable host IP ranges from a CIDR block.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-1">IPv4 Address</label>
            <input type="text" value={ip} onChange={(e) => setIp(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-mono" placeholder="192.168.1.1" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">CIDR Notation (/)</label>
            <input type="number" value={cidr} onChange={(e) => setCidr(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-mono" min="0" max="32" step="1" />
          </div>
        </div>

        {res ? (
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl overflow-hidden">
             <div className="p-4 bg-indigo-600 text-white font-bold text-center tracking-wider uppercase text-sm">
                 Subnet Details
             </div>
             <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">
                <div>
                   <div className="text-xs text-indigo-600 font-bold uppercase mb-1">Network Address</div>
                   <div className="text-xl font-mono font-bold text-gray-900">{res.network}</div>
                </div>
                <div>
                   <div className="text-xs text-indigo-600 font-bold uppercase mb-1">Broadcast Address</div>
                   <div className="text-xl font-mono font-bold text-gray-900">{res.broadcast}</div>
                </div>
                <div>
                   <div className="text-xs text-indigo-600 font-bold uppercase mb-1">Subnet Mask</div>
                   <div className="text-xl font-mono font-bold text-gray-900">{res.netmask}</div>
                </div>
                <div>
                   <div className="text-xs text-indigo-600 font-bold uppercase mb-1">Total Usable Hosts</div>
                   <div className="text-xl font-mono font-bold text-gray-900">{res.totalHosts}</div>
                </div>
                <div className="md:col-span-2 border-t border-indigo-200 pt-4 mt-2">
                   <div className="text-xs text-indigo-600 font-bold uppercase mb-1">Usable Host Range</div>
                   <div className="text-xl font-mono font-bold text-gray-900">{res.hostMin} - {res.hostMax}</div>
                </div>
             </div>
          </div>
        ) : (
          <div className="bg-gray-50 p-6 rounded-xl border text-center text-sm font-bold text-gray-500">
             Enter a valid IPv4 address and CIDR (0-32).
          </div>
        )}
      </div>
    </ToolShell>
  );
}

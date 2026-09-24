import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function JwtDecoderTool() {
  const [jwt, setJwt] = useState('');

  const decodeJwt = () => {
    if (!jwt || typeof jwt !== 'string') return null;
    const parts = jwt.split('.');
    if (parts.length !== 3) return { error: "Invalid JWT structure (requires 3 parts separated by dots)." };

    try {
      // Decode URL safe base64
      const b64Decode = (str: string) => {
        let b64 = str.replace(/-/g, '+').replace(/_/g, '/');
        while (b64.length % 4) b64 += '=';
        return decodeURIComponent(escape(atob(b64)));
      };

      const header = JSON.parse(b64Decode(parts[0]));
      const payload = JSON.parse(b64Decode(parts[1]));

      return {
         header: JSON.stringify(header, null, 2),
         payload: JSON.stringify(payload, null, 2),
         signature: parts[2]
      };
    } catch (e) {
      return { error: "Failed to decode Base64 JSON parts." };
    }
  };

  const res = decodeJwt();

  return (
    <ToolShell title="JWT Decoder" description="Decode JSON Web Tokens to inspect header and payload claims." category="network" seoTitle="JWT Decoder | JSON Web Token Parser" seoDescription="Decode and inspect JWT (JSON Web Tokens) easily. View header, payload claims, and signature details directly in your browser.">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <div className="mb-6">
           <label className="block text-sm font-bold text-gray-700 mb-2">Encoded JWT</label>
           <textarea 
             value={jwt} 
             onChange={(e) => setJwt(e.target.value)}
             className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-rose-500 outline-none font-mono text-sm min-h-[120px] break-all"
             placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
           />
        </div>

        {res && !res.error && (
          <div className="grid md:grid-cols-2 gap-6">
             <div>
                <label className="block text-sm font-bold text-rose-700 mb-2 uppercase tracking-wider">Header (Algorithm & Type)</label>
                <pre className="bg-gray-800 text-rose-300 p-4 rounded-xl overflow-x-auto font-mono text-sm">
                   {res.header}
                </pre>
             </div>
             <div>
                <label className="block text-sm font-bold text-violet-700 mb-2 uppercase tracking-wider">Payload (Data & Claims)</label>
                <pre className="bg-gray-800 text-violet-300 p-4 rounded-xl overflow-x-auto font-mono text-sm">
                   {res.payload}
                </pre>
             </div>
             <div className="md:col-span-2">
                <label className="block text-sm font-bold text-cyan-700 mb-2 uppercase tracking-wider">Signature</label>
                <div className="bg-gray-50 border p-4 rounded-xl font-mono text-cyan-800 break-all text-sm font-bold">
                   {res.signature}
                </div>
             </div>
          </div>
        )}

        {res?.error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl font-bold border border-red-200">
             {res.error}
          </div>
        )}

      </div>
    </ToolShell>
  );
}

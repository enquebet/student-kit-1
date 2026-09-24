import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function JwtDecoderTool() {
  const [token, setToken] = useState('');
  
  let header = null;
  let payload = null;
  let error = null;
  let isExpired = false;
  let expiresAt = null;

  try {
    if (token.trim()) {
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error('Invalid JWT format. Must contain 3 parts separated by dots.');
      
      header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
      payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      
      if (payload.exp) {
        expiresAt = new Date(payload.exp * 1000);
        isExpired = expiresAt < new Date();
      }
    }
  } catch (e: any) {
    error = e.message || 'Failed to decode token. Ensure it is a valid Base64Url string.';
  }

  return (
    <ToolShell 
      title="JWT Decoder" 
      description="Decode JSON Web Tokens (JWT) instantly in your browser to view the header and payload claims." 
      category="developer"
      seoTitle="Free JWT Decoder Online | Secure & Local | StudentKit"
      seoDescription="Decode JWTs securely in your browser. View header, payload, and expiration claims without sending your token to a server."
      relatedTools={[
        { title: 'JSON Formatter', slug: 'json-formatter', desc: 'Format and validate JSON payloads.' },
        { title: 'Base64 Decoder', slug: 'base64-decoder', desc: 'Decode standard Base64 strings.' }
      ]}
      article={
        <>
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex items-start space-x-3 mb-6">
            <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-amber-900 font-bold mt-0 mb-1">Important Security Notice</h3>
              <p className="text-amber-800 text-sm m-0">Decoding a JWT does not verify its signature. This tool only decodes the Base64Url encoded header and payload. To verify if the token is authentic and untampered, you must verify the signature on your backend using the secret key.</p>
            </div>
          </div>
          <h2>What is a JWT?</h2>
          <p>JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.</p>
          <p>A JWT consists of three parts separated by dots (<code>.</code>):</p>
          <ul>
            <li><strong>Header:</strong> Contains the type of token and the signing algorithm (e.g., HMAC SHA256 or RSA).</li>
            <li><strong>Payload (Claims):</strong> Contains the statements about an entity (typically, the user) and additional data.</li>
            <li><strong>Signature:</strong> Used to verify the message wasn't changed along the way.</li>
          </ul>
        </>
      }
    >
      <div className="space-y-6">
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-64">
          <div className="bg-gray-50 border-b border-gray-200 p-3 flex justify-between items-center">
            <span className="font-bold text-gray-700 text-sm uppercase tracking-wider">Encoded Token</span>
            <button onClick={() => setToken('')} className="text-xs text-red-600 hover:underline font-medium">Clear</button>
          </div>
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="flex-1 w-full p-4 font-mono text-sm focus:outline-none resize-none break-all text-gray-800 selection:bg-blue-200"
            placeholder="Paste a JWT here (e.g., eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
            spellCheck="false"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl font-medium">
            {error}
          </div>
        )}

        {!error && header && payload && (
          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="bg-slate-900 rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-slate-950 border-b border-slate-800 p-3">
                <span className="font-bold text-red-400 text-sm uppercase tracking-wider">Header</span>
              </div>
              <div className="p-4 overflow-auto">
                <pre className="text-red-300 font-mono text-sm leading-relaxed">{JSON.stringify(header, null, 2)}</pre>
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl shadow-sm overflow-hidden flex flex-col">
              <div className="bg-slate-950 border-b border-slate-800 p-3 flex justify-between items-center">
                <span className="font-bold text-purple-400 text-sm uppercase tracking-wider">Payload (Claims)</span>
                {payload.exp && (
                  <span className={`text-xs px-2 py-1 rounded font-bold ${isExpired ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400 flex items-center space-x-1'}`}>
                    {!isExpired && <CheckCircle2 className="w-3 h-3" />}
                    <span>{isExpired ? 'Token Expired' : 'Token Valid'}</span>
                  </span>
                )}
              </div>
              <div className="p-4 overflow-auto flex-1">
                <pre className="text-purple-300 font-mono text-sm leading-relaxed">{JSON.stringify(payload, null, 2)}</pre>
              </div>
              {expiresAt && (
                <div className="bg-slate-950 p-3 text-xs text-slate-400 border-t border-slate-800">
                  Expires: {expiresAt.toLocaleString()}
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </ToolShell>
  );
}

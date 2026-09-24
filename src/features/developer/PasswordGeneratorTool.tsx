import React, { useState, useEffect } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { RefreshCw, Copy, Check, ShieldCheck, ShieldAlert, Shield } from 'lucide-react';

export default function PasswordGeneratorTool() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let u = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let l = 'abcdefghijklmnopqrstuvwxyz';
    let n = '0123456789';
    let s = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (excludeAmbiguous) {
      const ambig = 'iIlL1oO0';
      const clean = (str: string) => str.split('').filter(c => !ambig.includes(c)).join('');
      u = clean(u);
      l = clean(l);
      n = clean(n);
    }

    let charset = '';
    if (uppercase) charset += u;
    if (lowercase) charset += l;
    if (numbers) charset += n;
    if (symbols) charset += s;

    if (!charset) {
      setPassword('Select at least one type!');
      return;
    }

    let newPassword = '';
    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);

    // Ensure at least one of each selected
    let mandatory = '';
    if (uppercase) mandatory += u[crypto.getRandomValues(new Uint32Array(1))[0] % u.length];
    if (lowercase) mandatory += l[crypto.getRandomValues(new Uint32Array(1))[0] % l.length];
    if (numbers) mandatory += n[crypto.getRandomValues(new Uint32Array(1))[0] % n.length];
    if (symbols) mandatory += s[crypto.getRandomValues(new Uint32Array(1))[0] % s.length];

    for (let i = mandatory.length; i < length; i++) {
      newPassword += charset[randomValues[i] % charset.length];
    }
    
    // Shuffle
    const pwArr = (mandatory + newPassword).split('');
    for (let i = pwArr.length - 1; i > 0; i--) {
      const j = crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1);
      [pwArr[i], pwArr[j]] = [pwArr[j], pwArr[i]];
    }

    setPassword(pwArr.join(''));
    setCopied(false);
  };

  useEffect(() => {
    generatePassword();
  }, [length, uppercase, lowercase, numbers, symbols, excludeAmbiguous]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Entropy calculation
  let poolSize = 0;
  if (uppercase) poolSize += excludeAmbiguous ? 23 : 26;
  if (lowercase) poolSize += excludeAmbiguous ? 24 : 26;
  if (numbers) poolSize += excludeAmbiguous ? 8 : 10;
  if (symbols) poolSize += 29;
  
  const entropy = poolSize > 0 ? length * Math.log2(poolSize) : 0;
  
  let strengthLabel = 'Very Weak';
  let strengthColor = 'text-red-500';
  let strengthBar = 'bg-red-500 w-1/5';
  let Icon = ShieldAlert;

  if (entropy > 100) {
    strengthLabel = 'Very Strong';
    strengthColor = 'text-emerald-500';
    strengthBar = 'bg-emerald-500 w-full';
    Icon = ShieldCheck;
  } else if (entropy > 80) {
    strengthLabel = 'Strong';
    strengthColor = 'text-emerald-400';
    strengthBar = 'bg-emerald-400 w-4/5';
    Icon = ShieldCheck;
  } else if (entropy > 60) {
    strengthLabel = 'Good';
    strengthColor = 'text-yellow-500';
    strengthBar = 'bg-yellow-500 w-3/5';
    Icon = Shield;
  } else if (entropy > 40) {
    strengthLabel = 'Weak';
    strengthColor = 'text-orange-500';
    strengthBar = 'bg-orange-500 w-2/5';
    Icon = ShieldAlert;
  }

  return (
    <ToolShell 
      title="Secure Password Generator" 
      description="Generate strong, secure passwords instantly using the browser's cryptographic API. No data is sent over the internet." 
      category="developer"
      seoTitle="Strong Random Password Generator | Privacy-First | StudentKit"
      seoDescription="Create highly secure, random passwords. Customize length and characters. 100% offline, processed locally using Web Crypto API."
      relatedTools={[
        { title: 'Hash Generator', slug: 'hash-generator', desc: 'Generate MD5, SHA-256 hashes.' },
        { title: 'UUID Generator', slug: 'uuid-generator', desc: 'Generate standard UUIDs.' }
      ]}
      article={
        <>
          <h2>Is it safe to use this generator?</h2>
          <p>Yes. This generator uses the <code>crypto.getRandomValues()</code> API built into modern web browsers. This provides cryptographically strong random values.</p>
          <p>Additionally, the code runs entirely in your browser window. The generated password is never transmitted to our servers or anywhere else over the internet.</p>
          <h3>What is Password Entropy?</h3>
          <p>Entropy is a measure of how unpredictable a password is. It calculates the number of possible combinations based on the length and the pool of characters used (e.g., lowercase, uppercase, numbers). An entropy above 80 bits is generally considered highly secure against brute-force attacks.</p>
        </>
      }
    >
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Output Area */}
        <div className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 pb-6 relative">
            <input 
              type="text" 
              readOnly 
              value={password}
              className="w-full text-center text-3xl sm:text-4xl font-mono bg-transparent border-none text-white tracking-widest focus:outline-none focus:ring-0 selection:bg-blue-500/30 break-all"
            />
            
            {/* Strength indicator */}
            <div className="mt-8 flex items-center justify-between border-t border-slate-700 pt-6">
              <div className="flex items-center space-x-3">
                <Icon className={`w-6 h-6 ${strengthColor}`} />
                <div>
                  <div className={`font-bold ${strengthColor}`}>{strengthLabel}</div>
                  <div className="text-xs text-slate-400 font-mono">{entropy.toFixed(0)} bits of entropy</div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={generatePassword}
                  className="flex items-center justify-center p-3 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
                  title="Regenerate"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
                <button 
                  onClick={copyToClipboard}
                  className={`flex items-center space-x-2 px-6 py-3 font-bold rounded-xl transition-all shadow-lg ${copied ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20'}`}
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  <span>{copied ? 'Copied!' : 'Copy Password'}</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="w-full h-1.5 bg-slate-800">
            <div className={`h-full transition-all duration-500 ${strengthBar}`}></div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="mb-8">
            <div className="flex justify-between items-end mb-4">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-1">Password Length</label>
                <span className="text-xs text-gray-500">Longer passwords are more secure.</span>
              </div>
              <span className="text-2xl font-extrabold text-blue-600 bg-blue-50 px-4 py-1 rounded-lg">{length}</span>
            </div>
            <input 
              type="range" 
              min="8" max="64" 
              value={length} 
              onChange={e => setLength(parseInt(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs font-medium text-gray-400 mt-2">
              <span>8</span>
              <span>32</span>
              <span>64</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Checkbox label="Uppercase (A-Z)" checked={uppercase} onChange={setUppercase} />
            <Checkbox label="Lowercase (a-z)" checked={lowercase} onChange={setLowercase} />
            <Checkbox label="Numbers (0-9)" checked={numbers} onChange={setNumbers} />
            <Checkbox label="Symbols (!@#$)" checked={symbols} onChange={setSymbols} />
            <div className="sm:col-span-2 mt-2">
              <Checkbox label="Exclude Ambiguous Characters (i, l, 1, L, o, 0, O)" checked={excludeAmbiguous} onChange={setExcludeAmbiguous} />
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}

function Checkbox({ label, checked, onChange }: { label: string, checked: boolean, onChange: (c: boolean) => void }) {
  return (
    <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${checked ? 'border-blue-600 bg-blue-50/30' : 'border-gray-200 hover:border-blue-300 bg-white'}`}>
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300" />
      <span className={`ml-3 font-medium ${checked ? 'text-blue-900' : 'text-gray-700'}`}>{label}</span>
    </label>
  );
}

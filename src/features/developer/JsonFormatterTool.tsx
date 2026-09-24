import React, { useState, useEffect } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Play, Minimize2, Copy, Download, Trash2, Check, AlertTriangle, Sparkles } from 'lucide-react';

export default function JsonFormatterTool() {
  const [input, setInput] = useState('{\n  "name": "StudentKit",\n  "version": "1.0.0",\n  "tools": 158,\n  "features": ["formatting", "validation", "client-side"]\n}');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [indent, setIndent] = useState<number>(2);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    handleFormat();
  }, [indent]);

  const handleFormat = () => {
    try {
      if (!input.trim()) {
        setOutput('');
        setError(null);
        return;
      }
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Invalid JSON syntax');
    }
  };

  const handleMinify = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Invalid JSON syntax');
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const lines = output ? output.split('\n').length : 0;

  return (
    <ToolShell 
      title="JSON Formatter & Validator" 
      description="Format, minify, and validate JSON data instantly in your browser. Features syntax error reporting and fast local processing." 
      category="developer"
      seoTitle="Free JSON Formatter & Validator Online | StudentKit"
      seoDescription="Format, minify, and validate JSON data securely in your browser. Instantly detect syntax errors. Supports custom indentation and downloading."
      relatedTools={[
        { title: 'JWT Decoder', slug: 'jwt-decoder', desc: 'Decode JSON Web Tokens instantly.' },
        { title: 'Base64 Encoder', slug: 'base64-encoder', desc: 'Encode and decode Base64 strings.' }
      ]}
      article={
        <>
          <h2>What is JSON?</h2>
          <p>JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write, and easy for machines to parse and generate.</p>
          <p>When working with APIs or configuration files, JSON is often transmitted in a minified state (all on one line) to save bandwidth. A formatter (or "beautifier") parses this compact string and adds appropriate line breaks and indentation so developers can read it.</p>
          <h3>Secure Local Validation</h3>
          <p>This tool uses your browser's native <code>JSON.parse()</code> engine to validate your payload. If you have a missing comma, trailing comma, or unescaped quote, the engine will immediately catch it and highlight the error without sending your potentially sensitive payload to a remote server.</p>
        </>
      }
    >
      <div className="google-rgb-card overflow-hidden mb-8 border border-gray-200/90 shadow-sm">
        
        {/* Toolbar */}
        <div className="bg-slate-50/90 border-b border-gray-200/90 p-3 md:px-5 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex items-center space-x-2.5">
            {/* Google Primary Neon Button */}
            <button 
              onClick={handleFormat} 
              className="google-neon-btn-primary px-4 py-1.5 text-xs gap-1.5 cursor-pointer border border-blue-700 hover:border-blue-800"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Format</span>
            </button>

            {/* Google Secondary RGB Neon Button */}
            <button 
              onClick={handleMinify} 
              className="google-neon-btn-rgb px-3.5 py-1.5 text-xs gap-1.5 text-slate-700 cursor-pointer border border-gray-300 hover:border-gray-400"
            >
              <Minimize2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>Minify</span>
            </button>

            <div className="h-5 w-px bg-gray-200 mx-1 hidden sm:block"></div>

            <select 
              value={indent} 
              onChange={(e) => setIndent(Number(e.target.value))}
              className="bg-white border border-gray-200 text-gray-700 text-xs font-semibold rounded-full px-3 py-1.5 focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value={2}>2 Spaces</option>
              <option value={4}>4 Spaces</option>
              <option value={8}>8 Spaces</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setInput('')} 
              className="flex items-center space-x-1 text-gray-600 hover:text-red-600 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 hover:border-red-200 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear</span>
            </button>

            <button 
              onClick={handleCopy} 
              disabled={!output || !!error} 
              className={`px-3.5 py-1.5 text-xs gap-1.5 font-semibold rounded-full flex items-center transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer border ${
                copied 
                  ? 'google-neon-btn-green border-emerald-700' 
                  : 'google-neon-btn-rgb text-slate-800 border-gray-300 hover:border-gray-400'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-blue-600" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            <button 
              onClick={handleDownload} 
              disabled={!output || !!error} 
              className="flex items-center space-x-1.5 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shadow-xs disabled:opacity-40 disabled:pointer-events-none hidden sm:flex cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-gray-500" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Editors */}
        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 h-[560px]">
          
          {/* Input */}
          <div className="flex flex-col h-full bg-white relative">
            <div className="absolute top-2.5 right-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-white/90 px-2 py-0.5 rounded-md border border-gray-100">
              Input Payload
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 w-full p-4 pt-9 font-mono text-xs focus:outline-none resize-none bg-transparent leading-relaxed text-slate-800"
              placeholder="Paste your JSON here..."
            />
          </div>

          {/* Output */}
          <div className="flex flex-col h-full bg-slate-900 text-slate-100 relative font-mono text-xs">
            <div className="absolute top-2.5 right-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700">
              {lines} Lines
            </div>
            
            {error ? (
              <div className="p-6 text-red-400 flex items-start space-x-3 bg-red-950/20 m-4 rounded-xl border border-red-900/50">
                <AlertTriangle className="w-5 h-5 shrink-0 text-red-400 mt-0.5" />
                <div className="text-xs">
                  <div className="font-bold mb-1">Syntax Validation Error:</div>
                  <div className="font-mono bg-red-950/50 p-2.5 rounded-lg border border-red-800/40 text-[11px] break-all">{error}</div>
                </div>
              </div>
            ) : (
              <textarea
                readOnly
                value={output}
                placeholder="Formatted JSON will appear here..."
                className="flex-1 p-4 pt-9 overflow-auto focus:outline-none text-emerald-400 font-mono text-xs leading-relaxed selection:bg-indigo-700 bg-transparent resize-none border-none outline-none"
              />
            )}
          </div>

        </div>

      </div>
    </ToolShell>
  );
}

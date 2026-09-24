import React, { useState, useRef } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Upload, Copy } from 'lucide-react';

export default function ImageToBase64Tool() {
  const [b64, setB64] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setB64(evt.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ToolShell title="Image to Base64" description="Convert images to Base64 strings." category="file" seoTitle="Image to Base64 Converter | StudentKit" seoDescription="Convert JPG, PNG, WebP images to Base64 encoded strings locally.">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 flex flex-col items-center justify-center border-dashed border-2">
           <Upload className="w-12 h-12 text-gray-400 mb-4" />
           <p className="font-bold text-gray-700 mb-4">Select an image file</p>
           <input type="file" ref={fileInputRef} onChange={handleFile} accept="image/*" className="hidden" />
           <button onClick={() => fileInputRef.current?.click()} className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">Browse Files</button>
        </div>
        <div className="bg-slate-900 rounded-2xl p-6 flex flex-col text-white h-[400px]">
           <div className="flex justify-between mb-4">
             <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Base64 Output</h2>
             <button onClick={() => navigator.clipboard.writeText(b64)} className="text-blue-400 hover:text-white flex gap-1 items-center text-sm"><Copy className="w-4 h-4"/> Copy</button>
           </div>
           <textarea readOnly value={b64} className="flex-1 p-4 bg-slate-800 border border-slate-700 rounded-xl font-mono text-xs text-slate-300 resize-none outline-none" placeholder="Base64 string will appear here..."></textarea>
        </div>
      </div>
    </ToolShell>
  );
}

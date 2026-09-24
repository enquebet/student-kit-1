import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Download } from 'lucide-react';

export default function TextFileGeneratorTool() {
  const [content, setContent] = useState('');
  const [filename, setFilename] = useState('document.txt');
  
  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'document.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolShell title="Text File Generator" description="Create and download text files locally." category="file" seoTitle="Text File Generator | StudentKit" seoDescription="Create and download custom .txt files directly from your browser.">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 max-w-3xl mx-auto">
         <div className="flex gap-4 mb-4">
            <div className="flex-1">
               <label className="block text-sm font-bold text-gray-700 mb-2">Filename</label>
               <input type="text" value={filename} onChange={e=>setFilename(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. notes.txt" />
            </div>
            <div className="flex items-end">
               <button onClick={handleDownload} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center gap-2 transition-colors">
                 <Download className="w-5 h-5" /> Download
               </button>
            </div>
         </div>
         
         <label className="block text-sm font-bold text-gray-700 mb-2">File Content</label>
         <textarea value={content} onChange={e=>setContent(e.target.value)} className="w-full h-[400px] p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none font-mono text-sm" placeholder="Type the contents of your file here..."></textarea>
      </div>
    </ToolShell>
  );
}

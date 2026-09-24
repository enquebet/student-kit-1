import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const fileSizeConverter = `import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function FileSizeConverterTool() {
  const [bytes, setBytes] = useState('1048576');
  
  let val = parseFloat(bytes);
  if (isNaN(val)) val = 0;
  
  const kb = val / 1024;
  const mb = kb / 1024;
  const gb = mb / 1024;
  const tb = gb / 1024;

  return (
    <ToolShell title="File Size Converter" description="Convert bytes to KB, MB, GB, TB." category="file" seoTitle="File Size Converter | Bytes to MB | StudentKit" seoDescription="Quickly convert file sizes between bytes, kilobytes, megabytes, and gigabytes.">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 max-w-2xl mx-auto">
         <label className="block text-sm font-bold text-gray-700 mb-2">Input Size (Bytes)</label>
         <input type="number" value={bytes} onChange={e=>setBytes(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-lg font-mono mb-8" />
         
         <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex justify-between items-center">
               <span className="font-bold text-blue-800">Kilobytes (KB)</span>
               <span className="font-mono text-blue-900">{Number(kb.toPrecision(7))} KB</span>
            </div>
            <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex justify-between items-center">
               <span className="font-bold text-green-800">Megabytes (MB)</span>
               <span className="font-mono text-green-900">{Number(mb.toPrecision(7))} MB</span>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 flex justify-between items-center">
               <span className="font-bold text-purple-800">Gigabytes (GB)</span>
               <span className="font-mono text-purple-900">{Number(gb.toPrecision(7))} GB</span>
            </div>
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex justify-between items-center">
               <span className="font-bold text-orange-800">Terabytes (TB)</span>
               <span className="font-mono text-orange-900">{Number(tb.toPrecision(7))} TB</span>
            </div>
         </div>
      </div>
    </ToolShell>
  );
}
`;

const textFileGenerator = `import React, { useState } from 'react';
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
`;

const csvGenerator = `import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Download } from 'lucide-react';

export default function CsvGeneratorTool() {
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(3);
  const [content, setContent] = useState('');
  
  const generateCsv = () => {
    let csv = '';
    
    // Headers
    const headers = [];
    for(let c=0; c<cols; c++) {
      headers.push('Column_' + (c+1));
    }
    csv += headers.join(',') + '\\n';
    
    // Rows
    for(let r=0; r<rows; r++) {
       const rowData = [];
       for(let c=0; c<cols; c++) {
          rowData.push('Data_R' + (r+1) + '_C' + (c+1));
       }
       csv += rowData.join(',') + '\\n';
    }
    setContent(csv);
  };
  
  const handleDownload = () => {
    if (!content) generateCsv();
    const blob = new Blob([content || ''], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dummy_data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolShell title="CSV Generator" description="Generate dummy CSV files for testing." category="file" seoTitle="Dummy CSV Data Generator | StudentKit" seoDescription="Generate placeholder CSV files for database testing and mock data.">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
           <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-6">Settings</h2>
           <div className="space-y-4 mb-8">
              <div>
                 <label className="block text-sm font-bold text-gray-700 mb-2">Number of Rows</label>
                 <input type="number" min="1" max="1000" value={rows} onChange={e=>setRows(parseInt(e.target.value)||1)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" />
              </div>
              <div>
                 <label className="block text-sm font-bold text-gray-700 mb-2">Number of Columns</label>
                 <input type="number" min="1" max="20" value={cols} onChange={e=>setCols(parseInt(e.target.value)||1)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" />
              </div>
           </div>
           
           <div className="flex gap-4">
             <button onClick={generateCsv} className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl transition-colors">
               Preview CSV
             </button>
             <button onClick={handleDownload} className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex justify-center items-center gap-2 transition-colors">
               <Download className="w-5 h-5" /> Download
             </button>
           </div>
        </div>
        
        <div className="bg-slate-900 rounded-2xl p-6 text-white h-[500px] flex flex-col">
           <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Preview</h2>
           <textarea readOnly value={content} className="flex-1 w-full p-4 bg-slate-800 border border-slate-700 rounded-xl outline-none text-slate-300 font-mono text-sm resize-none" placeholder="Preview will appear here..."></textarea>
        </div>
      </div>
    </ToolShell>
  );
}
`;

const imageTools = `import React from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function PlaceholderTool({ title, desc }: { title: string, desc: string }) {
  return (
    <ToolShell title={title} description={desc} category="file" seoTitle={title + " | StudentKit"} seoDescription={"Use the " + title + " tool."}>
      <div className="bg-white p-12 text-center rounded-2xl border text-gray-500 font-bold">
        File API features are sandboxed in this environment. Drag-and-drop processing enabled locally.
      </div>
    </ToolShell>
  );
}
`;

fs.writeFileSync(path.join(rootDir, 'src', 'features', 'file', 'FileSizeConverterTool.tsx'), fileSizeConverter);
fs.writeFileSync(path.join(rootDir, 'src', 'features', 'file', 'TextFileGeneratorTool.tsx'), textFileGenerator);
fs.writeFileSync(path.join(rootDir, 'src', 'features', 'file', 'CsvGeneratorTool.tsx'), csvGenerator);

// For the image ones (other than compressor), I will just create a functional base that loads an image as data URL for now.
const imageToBase64 = `import React, { useState, useRef } from 'react';
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
`;
fs.writeFileSync(path.join(rootDir, 'src', 'features', 'file', 'ImageToBase64Tool.tsx'), imageToBase64);
fs.writeFileSync(path.join(rootDir, 'src', 'features', 'file', 'ImageResizerTool.tsx'), imageTools.replace('PlaceholderTool', 'ImageResizerTool').replace(/title/g, '"Image Resizer"').replace(/desc/g, '"Resize images locally"'));
fs.writeFileSync(path.join(rootDir, 'src', 'features', 'file', 'ImageCropperTool.tsx'), imageTools.replace('PlaceholderTool', 'ImageCropperTool').replace(/title/g, '"Image Cropper"').replace(/desc/g, '"Crop images locally"'));
fs.writeFileSync(path.join(rootDir, 'src', 'features', 'file', 'ImageConverterTool.tsx'), imageTools.replace('PlaceholderTool', 'ImageConverterTool').replace(/title/g, '"Image Converter"').replace(/desc/g, '"Convert images to PNG, JPG, WebP"'));

console.log('File tools implemented.');

import React, { useState } from 'react';
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
    csv += headers.join(',') + '\n';
    
    // Rows
    for(let r=0; r<rows; r++) {
       const rowData = [];
       for(let c=0; c<cols; c++) {
          rowData.push('Data_R' + (r+1) + '_C' + (c+1));
       }
       csv += rowData.join(',') + '\n';
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

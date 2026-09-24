import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function MarkdownPreviewTool() {
  const [input, setInput] = useState('# Hello Markdown\n\nType some **markdown** here to preview it.\n\n- List item 1\n- List item 2');

  return (
    <ToolShell title="Markdown Previewer" description="Preview and test markdown locally." category="developer" seoTitle="Markdown Previewer Online | StudentKit" seoDescription="Write and preview GitHub-flavored markdown in real-time.">
      <div className="grid md:grid-cols-2 gap-4 h-[600px]">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
           <div className="bg-gray-100 p-2 border-b border-gray-200"><h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Editor</h2></div>
           <textarea value={input} onChange={e=>setInput(e.target.value)} className="w-full flex-1 p-4 outline-none resize-none font-mono text-sm text-gray-800" placeholder="Type markdown here..."></textarea>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
           <div className="bg-gray-100 p-2 border-b border-gray-200"><h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Preview (Raw HTML rendered)</h2></div>
           <div className="p-4 flex-1 overflow-y-auto prose max-w-none text-sm">
             <div dangerouslySetInnerHTML={{__html: input.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/^# (.*$)/gim, '<h1>$1</h1>').replace(/^## (.*$)/gim, '<h2>$1</h2>')}} />
             <p className="text-xs text-gray-400 mt-10 italic">* Note: This is a simplified previewer for basic tags.</p>
           </div>
        </div>
      </div>
    </ToolShell>
  );
}

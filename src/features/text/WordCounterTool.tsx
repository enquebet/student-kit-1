import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Copy, Trash2 } from 'lucide-react';

export default function WordCounterTool() {
  const [text, setText] = useState('');

  const cleanText = text.trim();
  const words = cleanText ? cleanText.split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, '').length;
  
  // Sentences: split by . ! ? followed by space or end of string
  const sentences = cleanText ? cleanText.split(/[.!?]+(?:\s+|$)/).filter(Boolean).length : 0;
  
  // Paragraphs: split by 2 or more newlines
  const paragraphs = cleanText ? cleanText.split(/\n\s*\n/).filter(Boolean).length : 0;
  
  const readingTime = Math.ceil(words / 238); // Average adult reading speed
  const speakingTime = Math.ceil(words / 130); // Average speaking speed
  
  const avgWordLength = words > 0 ? (charsNoSpaces / words).toFixed(1) : '0';

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <ToolShell 
      title="Advanced Word Counter" 
      description="Count words, characters, sentences, paragraphs, and estimate reading/speaking time instantly as you type." 
      category="text"
      seoTitle="Word Counter & Reading Time Estimator | StudentKit"
      seoDescription="Free online word counter. Get real-time stats for words, characters, sentences, paragraphs, and reading time. Works entirely in your browser."
      relatedTools={[
        { title: 'Case Converter', slug: 'case-converter', desc: 'Convert text to UPPERCASE, lowercase, Title Case, etc.' },
        { title: 'Text Cleaner', slug: 'text-cleaner', desc: 'Remove extra spaces, empty lines, and format text.' }
      ]}
      article={
        <>
          <h2>How does the Word Counter work?</h2>
          <p>This tool uses advanced regular expressions (regex) to analyze your text in real-time within your browser. It does not send your text to any server, ensuring complete privacy for sensitive documents or essays.</p>
          <ul>
            <li><strong>Words:</strong> Calculated by splitting the text at any whitespace character.</li>
            <li><strong>Sentences:</strong> Identified by looking for punctuation marks (periods, exclamation points, question marks) followed by a space or the end of the text.</li>
            <li><strong>Paragraphs:</strong> Detected by finding consecutive newline characters (e.g., pressing Enter twice).</li>
            <li><strong>Reading Time:</strong> Estimated based on an average adult reading speed of 238 words per minute.</li>
            <li><strong>Speaking Time:</strong> Estimated based on a conversational speaking speed of 130 words per minute, useful for timing presentations or speeches.</li>
          </ul>
        </>
      }
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Words" value={words} highlight />
        <StatCard label="Characters" value={chars} highlight />
        <StatCard label="Sentences" value={sentences} />
        <StatCard label="Paragraphs" value={paragraphs} />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard label="Without Spaces" value={charsNoSpaces} small />
        <StatCard label="Avg Word Length" value={avgWordLength} small />
        <StatCard label="Reading Time" value={`${readingTime}m`} small title={`${readingTime} minutes at 238 WPM`} />
        {/* <StatCard label="Speaking Time" value={`${speakingTime}m`} small title={`${speakingTime} minutes at 130 WPM`} /> */}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <span className="font-medium text-gray-700 text-sm px-2">Type or paste text below</span>
          <div className="flex space-x-2">
            <button 
              onClick={handleCopy}
              className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-white hover:text-blue-600 rounded-lg transition-colors border border-transparent hover:border-gray-200 shadow-sm"
              title="Copy to clipboard"
            >
              <Copy className="w-4 h-4" />
              <span className="hidden sm:inline">Copy</span>
            </button>
            <button 
              onClick={() => setText('')}
              className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-white hover:text-red-700 rounded-lg transition-colors border border-transparent hover:border-red-100 shadow-sm"
              title="Clear text"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          </div>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-96 p-6 text-gray-800 text-lg leading-relaxed focus:outline-none focus:ring-inset focus:ring-4 focus:ring-blue-500/20 resize-y"
          placeholder="Start typing..."
          spellCheck="false"
        />
      </div>
    </ToolShell>
  );
}

function StatCard({ label, value, highlight = false, small = false, title }: { label: string, value: string | number, highlight?: boolean, small?: boolean, title?: string }) {
  return (
    <div title={title} className={`bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center transition-transform hover:scale-105 ${highlight ? 'border-blue-200 bg-blue-50/30' : ''}`}>
      <span className={`${small ? 'text-2xl' : 'text-4xl'} font-extrabold ${highlight ? 'text-blue-600' : 'text-gray-900'} mb-1 tracking-tight`}>{value}</span>
      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</span>
    </div>
  );
}

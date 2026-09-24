import React, { useState, useRef } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function ImageCompressorTool() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedDataUrl, setCompressedDataUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.7);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalFile(file);
      setOriginalSize(file.size);
      compressImage(file, quality);
    }
  };

  const compressImage = (file: File, q: number) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);
        
        const dataUrl = canvas.toDataURL(file.type === 'image/png' ? 'image/webp' : 'image/jpeg', q);
        setCompressedDataUrl(dataUrl);
        
        // Estimate size
        const base64str = dataUrl.split(',')[1];
        const decoded = atob(base64str);
        setCompressedSize(decoded.length);
      };
    };
  };

  const handleQualityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuality = parseFloat(e.target.value);
    setQuality(newQuality);
    if (originalFile) {
      compressImage(originalFile, newQuality);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <ToolShell title="Image Compressor" description="Compress JPG and PNG images locally in your browser." category="file">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
        
        {!originalFile ? (
          <div 
            className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:bg-gray-50 hover:border-blue-400 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Click to upload an image</h3>
            <p className="text-sm text-gray-500">JPG, PNG, or WebP. Processed completely offline.</p>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
            />
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-900 truncate pr-4">{originalFile.name}</h3>
              <button 
                onClick={() => { setOriginalFile(null); setCompressedDataUrl(null); }}
                className="text-sm text-red-600 hover:underline shrink-0"
              >
                Start Over
              </button>
            </div>

            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Compression Level ({(quality * 100).toFixed(0)}%)</label>
                <span className="text-sm text-gray-500">Lower = Smaller size</span>
              </div>
              <input 
                type="range" min="0.1" max="1" step="0.05"
                value={quality} onChange={handleQualityChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-center">
                <span className="block text-xs font-semibold text-gray-500 uppercase mb-1">Original Size</span>
                <span className="text-2xl font-bold text-gray-900">{formatSize(originalSize)}</span>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center relative overflow-hidden">
                <span className="block text-xs font-semibold text-blue-600 uppercase mb-1">Compressed Size</span>
                <span className="text-2xl font-bold text-blue-700">{formatSize(compressedSize)}</span>
                {originalSize > 0 && (
                  <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                    -{((1 - compressedSize / originalSize) * 100).toFixed(0)}%
                  </span>
                )}
              </div>
            </div>

            {compressedDataUrl && (
              <div className="flex flex-col items-center">
                <img src={compressedDataUrl} alt="Compressed Preview" className="max-h-64 object-contain rounded-lg border border-gray-200 mb-6 shadow-sm" />
                
                <a 
                  href={compressedDataUrl} 
                  download={`compressed_${originalFile.name}`}
                  className="w-full sm:w-auto bg-blue-600 text-white font-medium px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center inline-block"
                >
                  Download Compressed Image
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolShell>
  );
}

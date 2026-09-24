import React, { useState, useRef } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Upload, Download, RefreshCw } from 'lucide-react';

export default function ImageFormatConverterTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [format, setFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/jpeg');
  const [quality, setQuality] = useState('0.92');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (!imageSrc || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      // Draw white background for transparent images converting to JPEG
      if (format === 'image/jpeg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      
      const ext = format.split('/')[1];
      const link = document.createElement('a');
      link.download = `converted-image.${ext}`;
      link.href = canvas.toDataURL(format, parseFloat(quality));
      link.click();
    };
    img.src = imageSrc;
  };

  return (
    <ToolShell title="Image Format Converter" description="Convert images between PNG, JPEG, and WEBP formats locally in your browser." category="file" seoTitle="Image Format Converter | PNG to JPG | StudentKit" seoDescription="Free online image format converter. Convert PNG to JPG, WEBP to PNG, and more. All processing is done locally on your device for privacy.">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {!imageSrc ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-emerald-300 rounded-3xl p-12 flex flex-col items-center justify-center bg-emerald-50/50 hover:bg-emerald-50 cursor-pointer transition-colors text-center"
          >
            <div className="bg-emerald-100 p-4 rounded-full mb-4">
              <Upload className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Select an Image</h3>
            <p className="text-gray-500 mb-6">Convert any image locally.</p>
            <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700">Browse Files</button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border p-6">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-900 flex items-center gap-2"><RefreshCw className="w-5 h-5 text-emerald-600"/> Conversion Settings</h3>
                <button onClick={() => setImageSrc(null)} className="text-sm text-red-600 font-medium hover:bg-red-50 px-3 py-1 rounded-md">Clear Image</button>
             </div>
             
             <div className="grid md:grid-cols-2 gap-8 items-start">
                 <div>
                    <img src={imageSrc} alt="Preview" className="w-full h-auto max-h-64 object-contain bg-gray-100 rounded-lg border" />
                 </div>

                 <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Convert To</label>
                        <select value={format} onChange={(e) => setFormat(e.target.value as any)} className="w-full p-3 border rounded-lg bg-gray-50">
                            <option value="image/jpeg">JPEG (.jpg)</option>
                            <option value="image/png">PNG (.png) - Supports Transparency</option>
                            <option value="image/webp">WEBP (.webp) - Modern & Efficient</option>
                        </select>
                    </div>
                    
                    {format !== 'image/png' && (
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Quality ({(parseFloat(quality) * 100).toFixed(0)}%)</label>
                            <input 
                                type="range" 
                                min="0.1" max="1" step="0.01" 
                                value={quality} 
                                onChange={(e) => setQuality(e.target.value)} 
                                className="w-full"
                            />
                        </div>
                    )}

                    <button onClick={handleDownload} className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 font-bold">
                        <Download className="w-5 h-5" /> Download Converted
                    </button>
                 </div>
             </div>
             
             {/* Hidden canvas for processing */}
             <canvas ref={canvasRef} className="hidden" />
          </div>
        )}
      </div>
    </ToolShell>
  );
}

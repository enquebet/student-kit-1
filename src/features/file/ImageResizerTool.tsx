import React, { useState, useRef } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Upload, Download, Image as ImageIcon } from 'lucide-react';

export default function ImageResizerTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState({ w: 0, h: 0 });
  const [targetWidth, setTargetWidth] = useState('');
  const [targetHeight, setTargetHeight] = useState('');
  const [maintainAspect, setMaintainAspect] = useState(true);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setOriginalSize({ w: img.width, h: img.height });
        setTargetWidth(img.width.toString());
        setTargetHeight(img.height.toString());
        setImageSrc(img.src);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleWidthChange = (val: string) => {
    setTargetWidth(val);
    if (maintainAspect && originalSize.w > 0) {
      const w = parseInt(val) || 0;
      const ratio = originalSize.h / originalSize.w;
      setTargetHeight(Math.round(w * ratio).toString());
    }
  };

  const handleHeightChange = (val: string) => {
    setTargetHeight(val);
    if (maintainAspect && originalSize.h > 0) {
      const h = parseInt(val) || 0;
      const ratio = originalSize.w / originalSize.h;
      setTargetWidth(Math.round(h * ratio).toString());
    }
  };

  const handleDownload = () => {
    if (!imageSrc || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      const w = parseInt(targetWidth) || originalSize.w;
      const h = parseInt(targetHeight) || originalSize.h;
      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(img, 0, 0, w, h);
      
      const link = document.createElement('a');
      link.download = 'resized-image.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    img.src = imageSrc;
  };

  return (
    <ToolShell title="Image Resizer" description="Resize images directly in your browser without uploading to any server." category="file" seoTitle="Free Image Resizer | Resize Photos Online | StudentKit" seoDescription="Quickly resize images and photos online. Fast, free, and secure - all processing happens locally in your browser.">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {!imageSrc ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-indigo-300 rounded-3xl p-12 flex flex-col items-center justify-center bg-indigo-50/50 hover:bg-indigo-50 cursor-pointer transition-colors text-center"
          >
            <div className="bg-indigo-100 p-4 rounded-full mb-4">
              <Upload className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Select an Image</h3>
            <p className="text-gray-500 mb-6">JPEG, PNG, WEBP supported.</p>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700">Browse Files</button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border p-6">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-900 flex items-center gap-2"><ImageIcon className="w-5 h-5 text-indigo-600"/> Edit Size</h3>
                <button onClick={() => setImageSrc(null)} className="text-sm text-red-600 font-medium hover:bg-red-50 px-3 py-1 rounded-md">Clear Image</button>
             </div>
             
             <div className="grid md:grid-cols-2 gap-8 items-start">
                 <div>
                    <img src={imageSrc} alt="Preview" className="w-full h-auto max-h-64 object-contain bg-gray-100 rounded-lg border" />
                    <div className="text-center mt-2 text-sm text-gray-500 font-medium">Original: {originalSize.w} × {originalSize.h} px</div>
                 </div>

                 <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">New Width (px)</label>
                        <input type="number" value={targetWidth} onChange={(e) => handleWidthChange(e.target.value)} className="w-full p-3 border rounded-lg" min="1" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">New Height (px)</label>
                        <input type="number" value={targetHeight} onChange={(e) => handleHeightChange(e.target.value)} className="w-full p-3 border rounded-lg" min="1" />
                    </div>
                    
                    <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 rounded-lg border">
                        <input type="checkbox" checked={maintainAspect} onChange={(e) => setMaintainAspect(e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                        <span className="text-sm font-medium text-gray-700">Maintain Aspect Ratio</span>
                    </label>

                    <button onClick={handleDownload} className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 font-bold">
                        <Download className="w-5 h-5" /> Download Resized Image
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

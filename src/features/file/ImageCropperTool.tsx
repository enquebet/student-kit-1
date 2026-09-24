import React, { useState, useRef } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';
import { Upload, Download, Crop } from 'lucide-react';

export default function ImageCropperTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState({ w: 0, h: 0 });
  
  // Crop margins in pixels
  const [top, setTop] = useState('0');
  const [right, setRight] = useState('0');
  const [bottom, setBottom] = useState('0');
  const [left, setLeft] = useState('0');
  
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
        setImageSrc(img.src);
        // Reset crop
        setTop('0'); setRight('0'); setBottom('0'); setLeft('0');
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (!imageSrc || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const t = parseInt(top) || 0;
    const r = parseInt(right) || 0;
    const b = parseInt(bottom) || 0;
    const l = parseInt(left) || 0;
    
    // Ensure valid crop
    if (t + b >= originalSize.h || l + r >= originalSize.w) {
        alert("Invalid crop dimensions. The margins overlap.");
        return;
    }

    const img = new Image();
    img.onload = () => {
      const newW = originalSize.w - l - r;
      const newH = originalSize.h - t - b;
      canvas.width = newW;
      canvas.height = newH;
      
      // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
      ctx.drawImage(img, l, t, newW, newH, 0, 0, newW, newH);
      
      const link = document.createElement('a');
      link.download = 'cropped-image.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    img.src = imageSrc;
  };

  // Safe parsed values for preview
  const tNum = parseInt(top) || 0;
  const rNum = parseInt(right) || 0;
  const bNum = parseInt(bottom) || 0;
  const lNum = parseInt(left) || 0;

  return (
    <ToolShell title="Basic Image Cropper" description="Crop images by setting pixel margins from the edges." category="file" seoTitle="Free Image Cropper | Crop Margins | StudentKit" seoDescription="Crop images online for free by setting top, right, bottom, and left pixel margins. Processed securely in your browser.">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {!imageSrc ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-indigo-300 rounded-3xl p-12 flex flex-col items-center justify-center bg-indigo-50/50 hover:bg-indigo-50 cursor-pointer transition-colors text-center"
          >
            <div className="bg-indigo-100 p-4 rounded-full mb-4">
              <Upload className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Select an Image to Crop</h3>
            <p className="text-gray-500 mb-6">Process images locally.</p>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700">Browse Files</button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border p-6">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-900 flex items-center gap-2"><Crop className="w-5 h-5 text-indigo-600"/> Margin Crop</h3>
                <button onClick={() => setImageSrc(null)} className="text-sm text-red-600 font-medium hover:bg-red-50 px-3 py-1 rounded-md">Clear Image</button>
             </div>
             
             <div className="grid md:grid-cols-2 gap-8 items-start">
                 <div className="relative border bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center min-h-[300px]">
                    {/* Simulated Crop Preview using CSS clip-path or absolute positioning */}
                    <div className="relative" style={{ 
                        width: '100%', 
                        height: '300px', 
                        backgroundImage: `url(${imageSrc})`, 
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}>
                        <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
                        <div className="absolute border-2 border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] pointer-events-none" 
                             style={{
                                 top: `${(tNum / originalSize.h) * 100}%`,
                                 bottom: `${(bNum / originalSize.h) * 100}%`,
                                 left: `${(lNum / originalSize.w) * 100}%`,
                                 right: `${(rNum / originalSize.w) * 100}%`,
                             }}>
                        </div>
                    </div>
                    <div className="absolute bottom-2 right-2 text-xs font-bold text-white bg-black/60 px-2 py-1 rounded">Preview is approximate</div>
                 </div>

                 <div className="space-y-6">
                    <p className="text-sm text-gray-600">Enter the number of pixels to cut off from each edge. Original size: {originalSize.w} × {originalSize.h}px</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Top Crop (px)</label>
                            <input type="number" value={top} onChange={(e) => setTop(e.target.value)} className="w-full p-2 border rounded-lg" min="0" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Bottom Crop (px)</label>
                            <input type="number" value={bottom} onChange={(e) => setBottom(e.target.value)} className="w-full p-2 border rounded-lg" min="0" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Left Crop (px)</label>
                            <input type="number" value={left} onChange={(e) => setLeft(e.target.value)} className="w-full p-2 border rounded-lg" min="0" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Right Crop (px)</label>
                            <input type="number" value={right} onChange={(e) => setRight(e.target.value)} className="w-full p-2 border rounded-lg" min="0" />
                        </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border text-center">
                       <div className="text-xs font-bold text-gray-500 uppercase">New Dimensions</div>
                       <div className="text-xl font-bold font-mono text-indigo-700">
                          {Math.max(0, originalSize.w - lNum - rNum)} × {Math.max(0, originalSize.h - tNum - bNum)} px
                       </div>
                    </div>

                    <button onClick={handleDownload} className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 font-bold">
                        <Download className="w-5 h-5" /> Download Cropped Image
                    </button>
                 </div>
             </div>
             
             <canvas ref={canvasRef} className="hidden" />
          </div>
        )}
      </div>
    </ToolShell>
  );
}

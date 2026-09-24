import React, { useState } from 'react';
import { ToolShell } from '@/components/tools/ToolShell';

export default function BrickEstimatorTool() {
  const [wallLength, setWallLength] = useState('10'); // m
  const [wallHeight, setWallHeight] = useState('2.5'); // m
  
  // Standard UK brick 215x65x102.5. We use face dimensions.
  const [brickLength, setBrickLength] = useState('215'); // mm
  const [brickHeight, setBrickHeight] = useState('65'); // mm
  const [mortarJoint, setMortarJoint] = useState('10'); // mm

  const calculate = () => {
    const wL = parseFloat(wallLength);
    const wH = parseFloat(wallHeight);
    const bL = parseFloat(brickLength);
    const bH = parseFloat(brickHeight);
    const mJ = parseFloat(mortarJoint);

    if (wL > 0 && wH > 0 && bL > 0 && bH > 0 && mJ >= 0) {
      // Wall area in square meters
      const wallArea = wL * wH;
      
      // Face area of one brick WITH mortar (in square meters)
      const brickWithMortarLengthM = (bL + mJ) / 1000;
      const brickWithMortarHeightM = (bH + mJ) / 1000;
      const brickArea = brickWithMortarLengthM * brickWithMortarHeightM;

      // Bricks needed
      const bricksReq = wallArea / brickArea;
      
      // Add 5% waste
      const wasteFactor = 1.05;
      const totalBricks = Math.ceil(bricksReq * wasteFactor);

      return {
        area: wallArea.toFixed(2),
        bricks: totalBricks.toLocaleString(),
        rawBricks: Math.ceil(bricksReq).toLocaleString()
      };
    }
    return null;
  };

  const res = calculate();

  return (
    <ToolShell title="Brick & Block Estimator" description="Estimate the number of bricks required for a wall based on dimensions and mortar joints." category="engineering" seoTitle="Brick Calculator | Wall Block Estimator" seoDescription="Calculate how many bricks or masonry blocks you need for a wall. Factors in mortar joint thickness and adds a 5% waste margin.">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        
        <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-6">Wall Dimensions</h3>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Wall Length (meters)</label>
            <input type="number" value={wallLength} onChange={(e) => setWallLength(e.target.value)} className="w-full p-3 border rounded-lg bg-gray-50" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Wall Height (meters)</label>
            <input type="number" value={wallHeight} onChange={(e) => setWallHeight(e.target.value)} className="w-full p-3 border rounded-lg bg-gray-50" min="0" step="any" />
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-6">Brick / Block Dimensions</h3>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Brick Length (mm)</label>
            <input type="number" value={brickLength} onChange={(e) => setBrickLength(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Brick Height (mm)</label>
            <input type="number" value={brickHeight} onChange={(e) => setBrickHeight(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Mortar Joint (mm)</label>
            <input type="number" value={mortarJoint} onChange={(e) => setMortarJoint(e.target.value)} className="w-full p-3 border rounded-lg" min="0" step="any" />
          </div>
        </div>

        {res && (
          <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
             <div className="text-center mb-6">
                <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">Total Wall Area</div>
                <div className="text-2xl font-bold text-amber-900">{res.area} m²</div>
             </div>
             
             <div className="bg-white p-6 rounded-lg text-center shadow-sm border border-amber-100">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Total Bricks Needed</h3>
                <div className="text-5xl font-black text-amber-700 mb-2">
                    {res.bricks}
                </div>
                <p className="text-xs text-amber-600/70 font-medium">Includes 5% allowance for breakages and waste. (Exact requirement: {res.rawBricks})</p>
             </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}

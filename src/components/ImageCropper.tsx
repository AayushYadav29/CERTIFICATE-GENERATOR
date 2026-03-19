import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import type { Area } from 'react-easy-crop';

interface ImageCropperProps {
  imageSrc: string;
  onCropComplete: (croppedImageUrl: string) => void;
  onCancel: () => void;
  aspectRatio?: number;
}

async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<string> {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve) => { image.onload = resolve; });

  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('No 2d context');

  ctx.drawImage(
    image,
    pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height,
    0, 0, pixelCrop.width, pixelCrop.height
  );
  return canvas.toDataURL('image/jpeg', 0.95);
}

export default function ImageCropper({
  imageSrc,
  onCropComplete,
  onCancel,
  aspectRatio = 3 / 4,
}: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropDone = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return;
    setIsProcessing(true);
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      onCropComplete(croppedImage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(2, 44, 40, 0.82)', backdropFilter: 'blur(6px)' }}
    >
      <div
        className="w-full max-w-lg overflow-hidden"
        style={{
          borderRadius: '20px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(20,184,166,0.2)',
          background: 'linear-gradient(180deg, #0a4f47 0%, #0d6b62 100%)',
        }}
      >
        {/* Header */}
        <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid rgba(94,234,212,0.15)' }}>
          <div className="flex items-center gap-3">
            <div style={{
              width: '40px', height: '40px', borderRadius: '10px',
              background: 'rgba(94,234,212,0.15)', border: '1px solid rgba(94,234,212,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5eead4" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
              </svg>
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '700', color: 'white', fontFamily:"'Lato', sans-serif" }}>
                Crop Your Photo
              </h3>
              <p style={{ margin: 0, fontSize: '12px', color: '#99f6e4', opacity: 0.85, fontFamily:"'Lato', sans-serif" }}>
                Drag to reposition · Scroll or slide to zoom
              </p>
            </div>
          </div>
        </div>

        {/* Cropper Area */}
        <div style={{ position: 'relative', width: '100%', height: '340px', background: '#011a17' }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropDone}
            cropShape="rect"
            showGrid={true}
            style={{
              containerStyle: { background: '#011a17' },
              cropAreaStyle: {
                border: '2px solid #14b8a6',
                boxShadow: '0 0 0 9999px rgba(0,26,23,0.72)',
              },
            }}
          />
        </div>

        {/* Zoom Control */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(94,234,212,0.1)' }}>
          <div className="flex items-center gap-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5eead4" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6" strokeLinecap="round"/>
            </svg>
            <input
              type="range"
              min={1}
              max={3}
              step={0.02}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              style={{ flex: 1, accentColor: '#14b8a6' }}
            />
            <span style={{ fontSize: '12px', color: '#5eead4', minWidth: '38px', textAlign: 'right', fontFamily:"'Lato', sans-serif" }}>
              {zoom.toFixed(1)}×
            </span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ padding: '16px 24px', display: 'flex', gap: '12px' }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1, padding: '12px', borderRadius: '12px', border: '1.5px solid rgba(94,234,212,0.25)',
              background: 'rgba(255,255,255,0.05)', color: '#99f6e4',
              fontWeight: '600', fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s',
              fontFamily: "'Lato', sans-serif",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isProcessing}
            style={{
              flex: 2, padding: '12px', borderRadius: '12px', border: 'none',
              background: isProcessing ? '#0a6b61' : 'linear-gradient(135deg, #0d9488, #14b8a6)',
              color: 'white', fontWeight: '700', fontSize: '14px', cursor: isProcessing ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              boxShadow: isProcessing ? 'none' : '0 4px 15px rgba(13,148,136,0.4)',
              fontFamily: "'Lato', sans-serif",
            }}
          >
            {isProcessing ? (
              <>
                <svg style={{ animation: 'spin 1s linear infinite' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.3"/>
                  <path d="M12 2a10 10 0 0110 10" strokeLinecap="round"/>
                </svg>
                Processing…
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
                Apply Crop & Use Photo
              </>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

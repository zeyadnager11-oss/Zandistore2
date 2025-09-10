
'use client';
import { useEffect, useRef, useState } from 'react';

export default function WatermarkedImage({ src, alt, width=600, height=600, coverBox=true, text='ZiStore' }) {
  const canvasRef = useRef(null);
  const [dataUrl, setDataUrl] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      const imageRatio = img.width / img.height;
      const canvasRatio = width / height;
      let drawWidth, drawHeight, dx, dy;
      if (imageRatio > canvasRatio) {
        drawHeight = height;
        drawWidth = imageRatio * drawHeight;
        dx = (width - drawWidth) / 2;
        dy = 0;
      } else {
        drawWidth = width;
        drawHeight = drawWidth / imageRatio;
        dx = 0;
        dy = (height - drawHeight) / 2;
      }
      ctx.drawImage(img, dx, dy, drawWidth, drawHeight);

      if (coverBox) {
        const boxW = Math.floor(width * 0.35);
        const boxH = Math.floor(height * 0.18);
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.fillRect(width - boxW - 8, height - boxH - 8, boxW, boxH);
      }

      ctx.save();
      ctx.translate(width/2, height/2);
      ctx.rotate(-Math.PI / 6);
      ctx.font = `${Math.floor(width * 0.09)}px sans-serif`;
      ctx.fillStyle = 'rgba(0,0,0,0.22)';
      ctx.textAlign = 'center';
      ctx.fillText(text, 0, 0);
      ctx.restore();

      ctx.font = `${Math.floor(width * 0.05)}px sans-serif`;
      ctx.fillStyle = 'rgba(0,0,0,0.65)';
      ctx.textAlign = 'right';
      ctx.fillText(text, width - 14, height - 18);

      setDataUrl(canvas.toDataURL('image/png'));
    };
    img.onerror = () => setDataUrl(null);
  }, [src, width, height, coverBox, text]);

  return (
    <>
      {!dataUrl && <div className="w-full h-full bg-gray-100 animate-pulse" aria-label="loading image" />}
      {dataUrl && <img src={dataUrl} alt={alt} className="w-full h-full object-cover" />}
      <canvas ref={canvasRef} className="hidden" />
    </>
  );
}

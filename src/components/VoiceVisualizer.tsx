import React, { useEffect, useRef } from 'react';

interface VoiceVisualizerProps {
  isActive: boolean;
  volume?: number;
}

const VoiceVisualizer: React.FC<VoiceVisualizerProps> = ({ isActive, volume = 0.5 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (isActive) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const baseRadius = 30;
        const maxRadius = 60;
        
        // Create pulsing effect
        const time = Date.now() * 0.005;
        const radius = baseRadius + (Math.sin(time) * volume * (maxRadius - baseRadius));
        
        // Draw outer ring
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.3 + volume * 0.7})`;
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Draw inner circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${0.1 + volume * 0.4})`;
        ctx.fill();
        
        // Draw center dot
        ctx.beginPath();
        ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#3B82F6';
        ctx.fill();
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }, [isActive, volume]);

  return (
    <div className="flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={120}
        height={120}
        className="rounded-full"
      />
    </div>
  );
};

export default VoiceVisualizer;
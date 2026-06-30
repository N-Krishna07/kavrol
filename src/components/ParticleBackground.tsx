import React, { useEffect, useRef, useState } from 'react';

interface ParticleBackgroundProps {
  theme: 'dark' | 'light';
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      alpha: number;
      originalAlpha: number;
      depth: number;
    }> = [];

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      setWindowSize({ width, height });
      initParticles(width, height);
    };

    const initParticles = (width: number, height: number) => {
      particles = [];
      const particleCount = Math.min(Math.floor((width * height) / 15000), 80);
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 2.5 + 1;
        const depth = Math.random() * 0.6 + 0.4; // 3D depth multiplier
        const alpha = Math.random() * 0.4 + 0.1;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          speedX: (Math.random() - 0.5) * 0.25,
          speedY: (Math.random() - 0.5) * 0.25,
          alpha,
          originalAlpha: alpha,
          depth,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    resizeCanvas();

    // Softly lerp mouse coordinates to make movement extra premium and smooth
    const animate = () => {
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render gradient orb backing
      const isDark = theme === 'dark';
      
      // Animated central lighting glow
      const time = Date.now() * 0.0005;
      const pulseX = Math.sin(time) * 100;
      const pulseY = Math.cos(time * 0.8) * 100;

      const gradient = ctx.createRadialGradient(
        canvas.width / 2 + pulseX + (mouse.x - canvas.width / 2) * 0.15,
        canvas.height / 2 + pulseY + (mouse.y - canvas.height / 2) * 0.15,
        50,
        canvas.width / 2 + pulseX,
        canvas.height / 2 + pulseY,
        Math.max(canvas.width, canvas.height) * 0.65
      );

      if (isDark) {
        gradient.addColorStop(0, 'rgba(16, 185, 129, 0.07)'); // Emerald soft center
        gradient.addColorStop(0.5, 'rgba(5, 46, 22, 0.02)');
        gradient.addColorStop(1, 'rgba(9, 9, 11, 0)');
      } else {
        gradient.addColorStop(0, 'rgba(34, 197, 94, 0.05)');
        gradient.addColorStop(0.6, 'rgba(240, 253, 244, 0.3)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render grid dots for structured "operating system" feel
      ctx.fillStyle = isDark ? 'rgba(34, 197, 94, 0.04)' : 'rgba(22, 163, 74, 0.03)';
      const gridSize = 40;
      const offsetX = (mouse.x * 0.015) % gridSize;
      const offsetY = (mouse.y * 0.015) % gridSize;
      for (let x = offsetX; x < canvas.width; x += gridSize) {
        for (let y = offsetY; y < canvas.height; y += gridSize) {
          ctx.fillRect(x, y, 1.5, 1.5);
        }
      }

      // Draw particle constellation
      const particleColor = isDark ? '34, 197, 94' : '22, 163, 74';
      particles.forEach((p, index) => {
        // Move particle
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap-around boundaries
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;

        // Apply mouse interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        let displayX = p.x + (dx * 0.04 * p.depth);
        let displayY = p.y + (dy * 0.04 * p.depth);

        // Enhance alpha if mouse is near
        let alpha = p.originalAlpha;
        if (dist < 180) {
          alpha = p.originalAlpha + (1 - dist / 180) * 0.35;
        }

        ctx.beginPath();
        ctx.arc(displayX, displayY, p.size * p.depth, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${alpha})`;
        ctx.fill();

        // Connect nearby particles for organic fintech neural feel
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const distBetween = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (distBetween < 100) {
            const lineAlpha = (1 - distBetween / 100) * 0.06 * (isDark ? 1 : 0.6);
            ctx.beginPath();
            ctx.moveTo(displayX, displayY);
            ctx.lineTo(p2.x + (mouse.x - p2.x) * 0.04 * p2.depth, p2.y + (mouse.y - p2.y) * 0.04 * p2.depth);
            ctx.strokeStyle = `rgba(${particleColor}, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      id="ambient-particle-stage"
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: theme === 'dark' ? 'screen' : 'multiply' }}
    />
  );
};

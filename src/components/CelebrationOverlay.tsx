import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  decay: number;
  gravity: number;
  rotation?: number;
  rotationSpeed?: number;
  isSparkle?: boolean;
}

interface CelebrationOverlayProps {
  trigger: number; // Changing/incrementing this triggers a burst
  type: 'Paid' | 'Protected';
}

export const CelebrationOverlay: React.FC<CelebrationOverlayProps> = ({ trigger, type }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (trigger === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to fit the parent container
    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      canvas.width = rect?.width || 400;
      canvas.height = rect?.height || 400;
    };

    resizeCanvas();

    const width = canvas.width;
    const height = canvas.height;

    // Spawn particles near the center
    const centerX = width / 2;
    const centerY = height / 2;

    const particles: Particle[] = [];

    if (type === 'Paid') {
      // Golden confetti & emerald bills shower: 100 colorful particles
      const colors = [
        '#10b981', // Emerald
        '#34d399', // Mint
        '#f59e0b', // Gold
        '#fbbf24', // Amber
        '#6ee7b7', // Bright teal
        '#ffffff', // White glow
      ];

      for (let i = 0; i < 120; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 8;
        particles.push({
          x: centerX + (Math.random() - 0.5) * 20,
          y: centerY + (Math.random() - 0.5) * 20,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (1 + Math.random() * 3), // shoot slightly upwards
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 4 + Math.random() * 6,
          alpha: 1,
          decay: 0.012 + Math.random() * 0.01,
          gravity: 0.15 + Math.random() * 0.1,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.2,
          isSparkle: Math.random() > 0.7,
        });
      }
    } else {
      // "Protected" - Shield Pulse! Cool cyan, mint, and deep emerald rings & sparkles
      const colors = [
        '#10b981', // Emerald
        '#34d399', // Mint
        '#06b6d4', // Cyan
        '#67e8f9', // Bright Cyan
        '#a7f3d0', // Light green
      ];

      // Spawn a ring of security pulses plus high-speed starburst sparkles
      for (let i = 0; i < 90; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 3 + Math.random() * 6;
        particles.push({
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed, // uniform outward burst
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 3 + Math.random() * 4,
          alpha: 1,
          decay: 0.018 + Math.random() * 0.015,
          gravity: 0.02, // very light gravity, floating outwards
          isSparkle: true,
        });
      }
    }

    particlesRef.current = [...particlesRef.current, ...particles];

    // Start/continue animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const activeParticles = particlesRef.current;
      for (let i = activeParticles.length - 1; i >= 0; i--) {
        const p = activeParticles[i];

        // Update positions
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.alpha -= p.decay;

        if (p.rotation !== undefined && p.rotationSpeed !== undefined) {
          p.rotation += p.rotationSpeed;
        }

        // Draw particle
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;

        if (type === 'Protected' || p.isSparkle) {
          // Draw a sparkling diamond/star
          ctx.translate(p.x, p.y);
          if (p.rotation !== undefined) ctx.rotate(p.rotation);
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.lineTo(p.size / 2, 0);
          ctx.lineTo(0, p.size);
          ctx.lineTo(-p.size / 2, 0);
          ctx.closePath();
          ctx.fill();

          // Add elegant outer glow for sparkles
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 10;
          ctx.fill();
        } else {
          // Draw standard spinning confetti rectangle/circle
          ctx.translate(p.x, p.y);
          if (p.rotation !== undefined) ctx.rotate(p.rotation);
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        }

        ctx.restore();

        // Remove dead particles
        if (p.alpha <= 0) {
          activeParticles.splice(i, 1);
        }
      }

      if (activeParticles.length > 0) {
        animationFrameIdRef.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    if (animationFrameIdRef.current === null) {
      animationFrameIdRef.current = requestAnimationFrame(animate);
    }

    return () => {
      // Optional cleanup
    };
  }, [trigger, type]);

  // Cancel animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-50 rounded-3xl"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

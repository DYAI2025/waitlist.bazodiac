import { useEffect, useRef } from 'react';

export default function CelestialHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);
    resize();

    const particles: Particle[] = [];
    const particleCount = 100;

    class Particle {
      x: number = 0;
      y: number = 0;
      baseAngle: number = Math.random() * Math.PI * 2;
      angle: number = Math.random() * Math.PI * 2;
      radius: number = Math.random() * 200 + 50;
      speed: number = Math.random() * 0.001 + 0.0005;
      size: number = Math.random() * 1.5 + 0.5;
      color: string = Math.random() > 0.3 ? '#D4AF37' : '#4B0082'; // Gold and Indigo

      update(prefersReducedMotion: boolean) {
        if (!prefersReducedMotion) {
           this.angle += this.speed * (Math.random() > 0.5 ? 1 : -1);
        }
        
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const mouseDist = Math.hypot(dx, dy);
        const mouseEffect = Math.max(0, (200 - mouseDist) / 200);

        this.x = width / 2 + Math.cos(this.angle) * this.radius + dx * mouseEffect * 0.2;
        this.y = height / 2 + Math.sin(this.angle) * this.radius + dy * mouseEffect * 0.2;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const render = () => {
      ctx.fillStyle = '#050505'; // Deep obsidian
      ctx.fillRect(0, 0, width, height);

      // Draw Atmospheric Glow
      const grad = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, height*0.6);
      grad.addColorStop(0, 'rgba(75, 0, 130, 0.05)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw Connections (Sigil motif)
      ctx.lineWidth = 0.3;
      for(let i = 0; i < particles.length; i++) {
        for(let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            if(dist < 120) {
              const alpha = (1 - dist/120) * 0.4;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
              ctx.stroke();
            }
        }
      }

      particles.forEach(p => {
        p.update(prefersReducedMotion);
        p.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden" id="celestial-canvas-container">
      <canvas 
        ref={canvasRef} 
        className="opacity-70"
      />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-obsidian/40 to-obsidian" />
    </div>
  );
}

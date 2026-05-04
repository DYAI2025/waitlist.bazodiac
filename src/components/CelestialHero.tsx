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

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const particles: Particle[] = [];
    const particleCount = 60;

    class Particle {
      x: number = 0;
      y: number = 0;
      angle: number = Math.random() * Math.PI * 2;
      radius: number = Math.random() * 150 + 100;
      speed: number = Math.random() * 0.002 + 0.0005;
      size: number = Math.random() * 1.5 + 0.5;
      color: string = Math.random() > 0.5 ? '#D4AF37' : '#1A1A2E';

      update() {
        this.angle += this.speed;
        this.x = width / 2 + Math.cos(this.angle) * this.radius;
        this.y = height / 2 + Math.sin(this.angle) * this.radius;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Add subtle glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const render = () => {
      if (prefersReducedMotion) {
        // Just draw static frame for reduced motion seekers
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => p.draw());
        return;
      }

      ctx.clearRect(0, 0, width, height);
      
      // Draw background atmospheric glow
      const grad = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, 400);
      grad.addColorStop(0, 'rgba(26, 26, 46, 0.1)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw connections
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for(let i = 0; i < particles.length; i++) {
        for(let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            if(dist < 150) {
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(212, 175, 55, ${1 - dist/150})`;
                ctx.stroke();
            }
        }
      }

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Reset shadow for performance
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" id="celestial-canvas-container">
      <canvas 
        ref={canvasRef} 
        className="opacity-60"
        style={{ filter: 'blur(0.5px)' }}
      />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-obsidian/40 to-obsidian" />
    </div>
  );
}

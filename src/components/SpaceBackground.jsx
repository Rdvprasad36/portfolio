import { useEffect, useRef } from 'react';

export default function SpaceBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let stars = [];
    let debris = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create stars
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2,
        alpha: Math.random(),
        speed: Math.random() * 0.3 + 0.05,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleDir: Math.random() > 0.5 ? 1 : -1,
      });
    }

    // Create debris (asteroids / floating shapes)
    for (let i = 0; i < 8; i++) {
      debris.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 20 + 8,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.2,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.01,
        sides: Math.floor(Math.random() * 3) + 4,
        alpha: Math.random() * 0.3 + 0.1,
        color: ['#555', '#443355', '#334455', '#336655'][Math.floor(Math.random() * 4)],
      });
    }

    const drawPolygon = (ctx, x, y, size, sides, rotation) => {
      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const angle = rotation + (Math.PI * 2 * i) / sides;
        const px = x + size * Math.cos(angle);
        const py = y + size * Math.sin(angle);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw gradient background
      const grad = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, canvas.width/2, canvas.height/2, canvas.width);
      grad.addColorStop(0, '#0D0D2B');
      grad.addColorStop(0.5, '#080820');
      grad.addColorStop(1, '#050510');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Nebula wisps
      ctx.save();
      ctx.globalAlpha = 0.04;
      const nebula = ctx.createRadialGradient(canvas.width*0.2, canvas.height*0.3, 0, canvas.width*0.2, canvas.height*0.3, 300);
      nebula.addColorStop(0, '#6B31BC');
      nebula.addColorStop(1, 'transparent');
      ctx.fillStyle = nebula;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const nebula2 = ctx.createRadialGradient(canvas.width*0.8, canvas.height*0.7, 0, canvas.width*0.8, canvas.height*0.7, 250);
      nebula2.addColorStop(0, '#00CFCF');
      nebula2.addColorStop(1, 'transparent');
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      // Draw & animate stars
      stars.forEach(s => {
        s.alpha += s.twinkleSpeed * s.twinkleDir;
        if (s.alpha >= 1 || s.alpha <= 0.1) s.twinkleDir *= -1;
        s.y += s.speed;
        if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; }

        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw debris
      debris.forEach(d => {
        d.x += d.speedX;
        d.y += d.speedY;
        d.rotation += d.rotSpeed;
        if (d.x < -50) d.x = canvas.width + 50;
        if (d.x > canvas.width + 50) d.x = -50;
        if (d.y < -50) d.y = canvas.height + 50;
        if (d.y > canvas.height + 50) d.y = -50;

        ctx.save();
        ctx.globalAlpha = d.alpha;
        ctx.strokeStyle = d.color;
        ctx.lineWidth = 1.5;
        drawPolygon(ctx, d.x, d.y, d.size, d.sides, d.rotation);
        ctx.stroke();
        ctx.restore();
      });

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none',
      }}
    />
  );
}

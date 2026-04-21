import { useEffect, useState } from 'react';

import { 
  motion } from 'framer-motion';
import Loading from './Loading';

const MotionDiv = motion.div;

export default function Intro({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  return (
    <MotionDiv
      className="intro-container"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0A0A1A',
        fontFamily: 'Courier New, monospace',
      }}
    >
      <Loading />
    </MotionDiv>
  );
}

function SnowCanvas() {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.inset = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const flakes = [];
    for (let i = 0; i < 100; i++) {
      flakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 4 + 1,
        speed: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.5,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      
      flakes.forEach(flake => {
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
        ctx.fill();
        
        flake.y += flake.speed;
        if (flake.y > canvas.height) flake.y = -flake.r;
        flake.x += Math.sin(flake.y * 0.01) * 0.5;
      });

      requestAnimationFrame(animate);
    }
    animate();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    return () => {
      document.body.removeChild(canvas);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return null;
}


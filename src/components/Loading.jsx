// framer-motion used for animations

import { motion as Motion } from 'framer-motion';

const starPositions = Array.from({ length: 50 }, (_, i) => ({
  top: `${(i * 137.5) % 100}%`,
  left: `${(i * 173.2) % 100}%`,
  width: `${(i % 4) + 1}px`,
  height: `${(i % 4) + 1}px`,
  duration: (i % 3) + 2,
  delay: (i % 5)
}));

export default function Loading() {
  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="loading-container"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        color: '#e0e0ff',
        fontFamily: 'Courier New, monospace',
        fontSize: '1.2rem',
        zIndex: 1,
        background: 'var(--au-space)',
      }}
    >
      {/* Snowfall background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none' }}>
        {starPositions.map((pos, index) => (
          <Motion.div
            key={index}
            className="star"
            style={{
              position: 'absolute',
              top: pos.top,
              left: pos.left,
              width: pos.width,
              height: pos.height,
              background: 'white',
              borderRadius: '50%',
              opacity: 0.8,
            }}
            animate={{
              y: [0, '100vh'],
              opacity: [0.8, 0.2, 0],
            }}
            transition={{
              duration: pos.duration,
              repeat: Infinity,
              delay: pos.delay,
            }}
          />
        ))}
      </div>

      <Motion.img 
        src="/white.png"
        alt="RDV Logo"
        style={{ width: '140px', height: '140px', marginBottom: '40px', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))' }}
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ 
          scale: { duration: 1.5, repeat: Infinity },
          rotate: { duration: 3, repeat: Infinity }
        }}
      />
      
      <Motion.div
        style={{ fontSize: '2.2rem', letterSpacing: '0.3em', margin: 0, textAlign: 'center', textShadow: '0 0 20px rgba(255,255,255,0.8)' }}
        animate={{ y: [0, -15, 0] }}
        transition={{ 
          y: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
        }}
      >
        R D V PRASAD PORTFOLIO
      </Motion.div>
      
      <Motion.div
        style={{ fontSize: '1.1rem', marginTop: '10px', opacity: 0.9, letterSpacing: '0.1em', textShadow: '0 0 10px rgba(255,255,255,0.6)' }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        FULL STACK DEVELOPER
      </Motion.div>
    </Motion.div>
  );
}


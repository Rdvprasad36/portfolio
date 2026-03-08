import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function IntroSequence({ onComplete }) {
  useEffect(() => {
    // 6.5 seconds total intro time for the ejection effect
    const timer = setTimeout(onComplete, 6500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000000', // Pure space black
        overflow: 'hidden'
      }}
    >
      {/* Floating stars in background */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ 
            duration: Math.random() * 3 + 2, 
            repeat: Infinity,
            delay: Math.random() * 5 
          }}
          style={{
            position: 'absolute',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
            background: 'white',
            borderRadius: '50%',
            opacity: 0.8,
            boxShadow: '0 0 4px white'
          }}
        />
      ))}

      {/* The Emergency Meeting Table Scene in the Background */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '500px',
        maxWidth: '90vw',
        pointerEvents: 'none',
        zIndex: 1
      }}>
        <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Dark dome/cave backdrop */}
          <path d="M40 220 C40 60, 360 60, 360 220 Z" fill="#0D111A" />
          <path d="M80 220 C80 100, 320 100, 320 220 Z" fill="#080B12" />
          
          {/* Shadow Entity Impostor Box */}
          <path d="M150 220 C150 110, 250 110, 250 220 Z" fill="#020305" />
          
          {/* Red Glowing Eye (The Star/Gleam) */}
          <polygon points="215,130 220,123 225,130 232,135 225,140 220,147 215,140 208,135" fill="#FF0000" filter="url(#glow)" />
          
          {/* Center Yellow Crewmate */}
          <g transform="translate(170, 140) scale(0.6)">
            <path d="M20 80 C20 40, 80 40, 80 80 L80 130 L20 130 Z" fill="#D4B82A" />
            <path d="M30 55 C30 45, 70 45, 70 55 L70 70 C70 80, 30 80, 30 70 Z" fill="#88D5E5" />
            <path d="M40 50 C40 47, 60 47, 60 50 L60 55 C60 58, 40 58, 40 55 Z" fill="#FFFFFF" opacity="0.6" />
          </g>

          {/* Left Red Crewmate */}
          <g transform="translate(90, 160) scale(0.6)">
            <path d="M20 80 C20 40, 80 40, 80 80 L80 130 L20 130 Z" fill="#901010" />
            <path d="M50 55 C50 45, 90 45, 90 55 L90 70 C90 80, 50 80, 50 70 Z" fill="#88D5E5" />
          </g>

          {/* Right Purple Crewmate */}
          <g transform="translate(250, 160) scale(0.6)">
            <path d="M20 80 C20 40, 80 40, 80 80 L80 130 L20 130 Z" fill="#4B2288" />
            <path d="M10 55 C10 45, 50 45, 50 55 L50 70 C50 80, 10 80, 10 70 Z" fill="#88D5E5" />
          </g>

          {/* Table Base */}
          <ellipse cx="200" cy="225" rx="80" ry="25" fill="#202A3D" />
          <ellipse cx="200" cy="220" rx="75" ry="20" fill="#151C2B" />
          
          {/* Button Console */}
          <rect x="165" y="210" width="70" height="15" rx="2" fill="#444" />
          <polygon points="175,210 225,210 235,225 165,225" fill="#555" />
          
          {/* Red Button */}
          <ellipse cx="200" cy="216" rx="20" ry="7" fill="#8B0000" />
          <ellipse cx="200" cy="214" rx="16" ry="5" fill="#C51111" />

          {/* Foreground Left Green (Facing away) */}
          <g transform="translate(100, 190) scale(0.7)">
            <path d="M20 80 C20 40, 80 40, 80 80 L80 120 C80 130, 20 130, 20 120 Z" fill="#0D511F" />
          </g>
          
          {/* Foreground Right Cyan (Facing away) */}
          <g transform="translate(230, 190) scale(0.7)">
            <path d="M20 80 C20 40, 80 40, 80 80 L80 120 C80 130, 20 130, 20 120 Z" fill="#1C5E6A" />
          </g>

          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
        </svg>
      </div>

      {/* Tumbling Ejected Crewmate (Brown with Red Beanie) */}
      <motion.div
        initial={{ y: '10vh', x: '-20vw', rotate: -60 }}
        animate={{ y: '15vh', x: '10vw', rotate: 180 }}
        transition={{ duration: 6, ease: "linear" }}
        style={{
          position: 'absolute',
          top: '50%',
          zIndex: 5,
        }}
      >
        <svg viewBox="0 0 100 120" width="100" height="100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Backpack */}
          <rect x="10" y="55" width="25" height="40" rx="8" fill="#603517" />
          {/* Body */}
          <ellipse cx="55" cy="70" rx="30" ry="38" fill="#80461B" />
          {/* Visor */}
          <ellipse cx="72" cy="60" rx="18" ry="14" fill="#88D5E5" opacity="0.9" />
          <ellipse cx="76" cy="56" rx="6" ry="4" fill="white" opacity="0.6" />
          {/* Legs floating up */}
          <ellipse cx="35" cy="100" rx="12" ry="15" fill="#80461B" transform="rotate(20 35 100)" />
          <ellipse cx="65" cy="105" rx="12" ry="15" fill="#80461B" transform="rotate(10 65 105)" />
          
          {/* Red Beanie Hat */}
          <path d="M40 33 C40 18, 70 18, 70 33 Z" fill="#C51111" />
          <rect x="36" y="30" width="38" height="8" rx="4" fill="#901010" />
          <ellipse cx="70" cy="20" rx="7" ry="7" fill="#C51111" />
        </svg>
      </motion.div>

      {/* The Text Layout - Typist Effect */}
      <div style={{ 
        position: 'absolute', 
        top: '35%', 
        transform: 'translateY(-50%)', 
        zIndex: 20, /* Ensure it appears above the tumbling crewmate */
        width: '100%', 
        textAlign: 'center',
        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 70%)', /* subtle dark back glow */
        padding: '40px 0'
      }}>
        
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.5, ease: "easeOut", delay: 1 }}
           style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
        >
          {/* Styled like the classic "was not the Impostor" text */}
          <motion.div
            initial={{ width: 0, opacity: 0, scale: 0.9 }}
            animate={{ width: '100%', opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut", delay: 1 }}
            className="mono-text"
            style={{ 
              fontSize: '36px', 
              color: '#FFFFFF', 
              letterSpacing: '2px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              maxWidth: '90vw',
              textShadow: '0 0 10px rgba(255,255,255,0.5)'
            }}
          >
            R D V Prasad's
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 2, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5, delay: 3 }}
            className="pixel-heading glow-red"
            style={{ 
              fontSize: '72px', 
              color: '#FFFFFF',
              textShadow: '6px 6px 0px #C51111, -3px -3px 0px #C51111, 3px -3px 0px #C51111, -3px 3px 0px #C51111, 0 0 40px rgba(197, 17, 17, 1)',
              letterSpacing: '8px',
              margin: '8px 0'
            }}
          >
            PORTFOLIO
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring", delay: 4 }}
            className="pixel-heading glow-yellow"
            style={{ 
              fontSize: '24px', 
              color: '#F5F557',
              letterSpacing: '5px',
              textShadow: '0 0 20px rgba(245, 245, 87, 0.8)'
            }}
          >
            AMONG US EDITION
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.8 }}
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        color: '#e0e0ff',
        fontFamily: 'Courier New, monospace',
        fontSize: '1.2rem',
        zIndex: 10001,
        background: 'var(--au-space)',
      }}
    >
      <motion.img 
        initial={{ scale: 0.3 }}
        animate={{ 
          scale: [1.2, 1.15, 1.1, 1.05, 1], 
          transition: { duration: 2, ease: 'easeOut', times: [0, 0.25, 0.5, 0.75, 1] }
        }}
        exit={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        src="/black.png"
        alt="RDV Logo"
        style={{ width: '140px', height: '140px', marginBottom: '40px', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))', borderRadius: '50%', objectFit: 'cover' }}
      />
      
      <motion.div
        initial={{ scale: 0.5, y: 20, opacity: 0 }}
        animate={{ 
          scale: [1.1, 1.05, 1], 
          y: 0, 
          opacity: 1 
        }}
        exit={{ scale: 1, y: -20, opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.4 }}
        style={{ fontSize: '2.2rem', letterSpacing: '0.3em', margin: 0, textAlign: 'center', textShadow: '0 0 20px rgba(255,255,255,0.8)' }}
      >
        R D V PRASAD PORTFOLIO
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2, delay: 0.8 }}
        style={{ fontSize: '1.1rem', marginTop: '10px', letterSpacing: '0.1em', textShadow: '0 0 10px rgba(255,255,255,0.6)' }}
      >
        FULL STACK DEVELOPER
      </motion.div>
    </motion.div>
  );
}

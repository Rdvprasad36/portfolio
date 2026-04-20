import { motion } from 'framer-motion';

export default function Loading() {
  const theme = document.documentElement.getAttribute('data-theme') || 'dark';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="loading-container"
      style={{
        position: 'fixed',
        inset: 0,
        background: theme === 'dark' ? 'var(--au-space)' : '#f8f9fa',
        color: 'var(--au-text)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        fontFamily: 'monospace',
        fontSize: '1.2rem'
      }}
    >
      <motion.img 
        src={theme === 'dark' ? '/white.png' : '/black.png'}
        alt="RDV Logo"
        style={{ width: '120px', height: '120px', marginBottom: '30px' }}
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ 
          scale: { duration: 1.5, repeat: Infinity },
          rotate: { duration: 3, repeat: Infinity }
        }}
      />
      <motion.div
        style={{ fontSize: '2rem', letterSpacing: '0.2em', margin: 0, textAlign: 'center' }}
        animate={{ y: [0, -15, 0] }}
        transition={{ 
          y: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
        }}
      >
        R D V PRASAD
      </motion.div>
      <motion.div
        style={{ fontSize: '1rem', marginTop: '15px', opacity: 0.8 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        PORTFOLIO
      </motion.div>
      <motion.div
        style={{ fontSize: '0.8rem', marginTop: '30px', opacity: 0.6 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
      >
        LOADING...
      </motion.div>
    </motion.div>
  );
}


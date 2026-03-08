import { motion } from 'framer-motion';

export default function ContactModal({ onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending report
    alert('Dead body reported! Message sent successfully.');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="au-panel"
        initial={{ scale: 0.5, opacity: 0, rotate: 5 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        exit={{ scale: 0.5, opacity: 0, rotate: -5 }}
        transition={{ type: 'spring', stiffness: 250, damping: 15 }}
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '600px', width: '100%', border: '4px solid #C51111', background: '#1A0D0D' }}
      >
        {/* Header Ribbon */}
        <div style={{ background: '#C51111', padding: '16px', textAlign: 'center' }}>
          <span className="pixel-heading" style={{ fontSize: '20px', color: 'white', textShadow: '3px 3px 0 #000' }}>
            REPORT BODY
          </span>
        </div>

        {/* Content */}
        <div style={{ padding: '32px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span className="pixel-text" style={{ color: '#ffaaaa', fontSize: '10px' }}>
              TRANSMIT INCIDENT DETAILS TO COMM RELAY
            </span>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label className="pixel-text" style={{ color: '#fff', fontSize: '10px' }}>YOUR ID TAG</label>
              <input
                type="text"
                required
                className="mono-text"
                placeholder="Crewmate Name / Email"
                style={{
                  background: 'rgba(0,0,0,0.5)', border: '2px solid rgba(197, 17, 17, 0.5)',
                  padding: '12px 16px', color: '#fff', fontSize: '16px',
                  outline: 'none', borderRadius: '4px'
                }}
                onFocus={e => e.target.style.borderColor = '#C51111'}
                onBlur={e => e.target.style.borderColor = 'rgba(197, 17, 17, 0.5)'}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label className="pixel-text" style={{ color: '#fff', fontSize: '10px' }}>INCIDENT LOG</label>
              <textarea
                rows={5}
                required
                className="mono-text"
                placeholder="Where was it? Who was there? Message..."
                style={{
                  background: 'rgba(0,0,0,0.5)', border: '2px solid rgba(197, 17, 17, 0.5)',
                  padding: '12px 16px', color: '#fff', fontSize: '16px',
                  outline: 'none', borderRadius: '4px', resize: 'vertical'
                }}
                onFocus={e => e.target.style.borderColor = '#C51111'}
                onBlur={e => e.target.style.borderColor = 'rgba(197, 17, 17, 0.5)'}
              />
            </div>

            <div style={{ marginTop: '16px', display: 'flex', gap: '16px' }}>
              
              <button
                type="button"
                onClick={onClose}
                style={{
                  flex: 1, background: 'transparent', border: '2px solid #555', color: '#ccc',
                  fontFamily: "'Press Start 2P', monospace", fontSize: '12px', padding: '16px', cursor: 'pointer',
                  borderRadius: '4px', transition: 'all 0.2s'
                }}
                onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.1)'; }}
                onMouseLeave={e => { e.target.style.background = 'transparent'; }}
              >
                CANCEL
              </button>

              <button
                type="submit"
                className="report-btn"
                style={{ flex: 2, fontSize: '14px' }}
              >
                SEND REPORT
              </button>
            </div>

          </form>

        </div>
      </motion.div>
    </div>
  );
}

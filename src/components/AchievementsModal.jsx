import { motion } from 'framer-motion';

const achievements = [
  {
    title: 'SIH GRAND FINALE (2024)',
    desc: 'Qualified and selected for Smart India Hackathon Grand Finale, demonstrating strong problem-solving skills and teamwork.',
    color: '#00CFCF',
    role: 'verified crewmate'
  },
  {
    title: 'QUANTUM VALLEY WINNER',
    desc: 'Top 5 Winner in College-Level Idea Presentation Hackathon Event.',
    color: '#F5F557',
    role: 'verified crewmate'
  },
  {
    title: 'AMAZON ML CHALLENGE',
    desc: 'Participant in the Amazon ML Challenge, showcasing applied machine learning expertise.',
    color: '#FF8400',
    role: 'suspect'
  }
];

export default function AchievementsModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="au-panel"
        initial={{ scale: 0.1, y: 300, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.1, y: 300, opacity: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '800px', width: '100%', overflow: 'hidden', border: '3px solid #C51111', background: '#0a0a0a' }}
      >
        {/* Header - Mega Red Alert */}
        <div
          style={{
            background: 'repeating-linear-gradient(45deg, #c51111, #c51111 20px, #880000 20px, #880000 40px)',
            padding: '24px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 4px 20px rgba(197, 17, 17, 0.5) inset',
            animation: 'redAlert 1.5s infinite alternate'
          }}
        >
          <span className="pixel-heading glow-red" style={{ fontSize: '24px', color: '#fff', letterSpacing: '4px', textShadow: '4px 4px 0 #000' }}>
            EMERGENCY MEETING
          </span>
        </div>

        {/* Body */}
        <div style={{ padding: '32px', position: 'relative' }}>
          
          <div className="pixel-text" style={{ textAlign: 'center', marginBottom: '32px', color: '#e0e0ff', fontSize: '10px', letterSpacing: '2px' }}>
            DISCUSS ACHIEVEMENT LOGS
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {achievements.map((ach, i) => (
              <motion.div
                key={ach.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 + 0.3 }}
                className="au-panel-light"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                  padding: '20px',
                  border: ach.role === 'suspect' ? '1px dashed #FF8400' : `1px solid ${ach.color}`,
                  background: ach.role === 'suspect' ? 'rgba(255,132,0,0.05)' : `rgba(0,0,0,0.6)`
                }}
              >
                {/* Character Icon Placeholder */}
                <div style={{ flexShrink: 0, width: '60px', height: '60px', borderRadius: '8px', background: ach.color, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '3px solid #222', boxShadow: `0 0 15px ${ach.color}66` }}>
                  <div style={{ width: '40px', height: '24px', background: '#7FE7FF', borderRadius: '12px', opacity: 0.9 }} />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div className="pixel-heading" style={{ fontSize: '14px', color: ach.color }}>
                      {ach.title}
                    </div>
                    {ach.role === 'verified crewmate' ? (
                      <span className="pixel-text" style={{ fontSize: '8px', color: '#27E240', background: 'rgba(39,226,64,0.1)', padding: '4px 8px', borderRadius: '4px', border: '1px solid #27E240' }}>
                        VERIFIED CREWMATE
                      </span>
                    ) : (
                      <span className="pixel-text" style={{ fontSize: '8px', color: '#FF8400', background: 'rgba(255,132,0,0.1)', padding: '4px 8px', borderRadius: '4px', border: '1px solid #FF8400' }}>
                        SUSPECT / VERIFYING...
                      </span>
                    )}
                  </div>
                  <p className="mono-text" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: '1.5' }}>
                    {ach.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Footer */}
        <div style={{ display: 'flex' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              background: '#C51111',
              color: 'white',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '14px',
              padding: '20px',
              cursor: 'pointer',
              border: 'none',
              borderTop: '2px solid rgba(0,0,0,0.5)',
              transition: 'background 0.2s',
              textShadow: '2px 2px 0 rgba(0,0,0,0.5)'
            }}
            onMouseEnter={e => { e.target.style.background = '#e01515'; }}
            onMouseLeave={e => { e.target.style.background = '#C51111'; }}
          >
            SKIP VOTE (CLOSE)
          </button>
        </div>

        <style>{`
          @keyframes redAlert {
            from { filter: brightness(0.8); }
            to { filter: brightness(1.2); }
          }
        `}</style>
      </motion.div>
    </div>
  );
}

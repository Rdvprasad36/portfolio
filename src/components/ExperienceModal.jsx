import { motion } from 'framer-motion';

export default function ExperienceModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="au-panel crt-monitor"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '800px', width: '100%', overflow: 'hidden', border: 'none', borderRadius: '12px' }}
      >
        {/* CRT Container inner */}
        <div style={{ padding: '24px', background: '#0a0a0a', position: 'relative', zIndex: 12, minHeight: '500px' }}>
          
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', borderBottom: '2px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
            <span className="pixel-heading" style={{ fontSize: '16px', color: '#ffaaaa' }}>
              SEC CAM: HALLWAY
            </span>
            <span className="pixel-text blink" style={{ color: '#ffaaaa', fontSize: '10px' }}>
              ● REC
            </span>
          </div>

          {/* Timestamp */}
          <div style={{ position: 'absolute', top: 24, left: '50%', transform: 'translateX(-50%)' }}>
            <span className="mono-text" style={{ fontSize: '18px', color: 'rgba(255,255,255,0.3)' }}>
              {new Date().toISOString().replace('T', ' ').slice(0, -5)}
            </span>
          </div>

          {/* Experience Feed */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', position: 'relative' }}>
            
            {/* VCR Noise Overlay applied locally */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5,
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,132,0,0.05) 2px, rgba(255,132,0,0.05) 4px)'
            }} />

            {[
              { 
                company: 'INTERNPRO', 
                role: 'AI/ML INTERN', 
                date: 'July 2024 – Aug 2024',
                tasks: ['Built an NLP-driven AI interview chatbot for automated screening.', 'Implemented core ML algorithms for candidate evaluation.']
              },
              { 
                company: 'GOOGLE', 
                role: 'ML INTERN', 
                date: 'Current',
                tasks: ['Completed 10-week virtual implementation of core machine learning.', 'Worked on scalable AI solutions and data processing pipelines.']
              },
              { 
                company: 'SAC CLUB', 
                role: 'CLUB MANAGER', 
                date: '2025 – Present',
                tasks: ['Lead logistics for flagship events like "Yuvatarang 2K26".', 'Managed team collaborations and event planning.']
              }
            ].map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 + (i * 0.2) }}
                className="au-panel-light"
                style={{ padding: '24px', background: 'rgba(255,132,0,0.05)', border: '1px solid rgba(255,132,0,0.3)', position: 'relative', zIndex: 10, marginBottom: '10px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid rgba(255,132,0,0.2)', paddingBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF8400', boxShadow: '0 0 10px #FF8400' }} />
                    <span className="pixel-heading glow-orange" style={{ fontSize: '14px', color: '#FF8400' }}>
                      {exp.company}
                    </span>
                  </div>
                  <span className="mono-text" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
                    {exp.date}
                  </span>
                </div>
                
                <div className="pixel-text" style={{ color: '#fff', fontSize: '12px', marginBottom: '20px', letterSpacing: '1px' }}>
                  ROLE: {exp.role}
                </div>

                <ul className="mono-text" style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                  {exp.tasks.map((task, j) => (
                    <li key={j} style={{ marginBottom: '12px', display: 'flex', gap: '12px', fontSize: '15px', color: 'rgba(255,255,255,0.8)' }}>
                      <span style={{ color: '#FF8400' }}>&gt;</span>
                      {task}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

          </div>


          {/* View controls */}
          <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24, display: 'flex', justifyContent: 'space-between' }}>
            <span className="pixel-text" style={{ fontSize: '8px', color: 'rgba(255,255,255,0.4)' }}>
              Cam 1 / 4
            </span>
            <button
              onClick={onClose}
              style={{
                background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.8)',
                fontFamily: "'Share Tech Mono', monospace", fontSize: '14px', padding: '4px 12px', cursor: 'pointer',
              }}
              onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.1)'; }}
              onMouseLeave={e => { e.target.style.background = 'transparent'; }}
            >
              [OFF]
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const projects = [
  {
    id: 1,
    title: 'STUDYXPERT AI',
    desc: 'Full-stack learning assistant platform built with TypeScript. Features personalized learning paths and real-time query resolution.',
    tech: ['TypeScript', 'Next.js', 'Node.js', 'Gemini API'],
    color: '#6B31BC',
    link: '#',
    status: 'completed'
  },
  {
    id: 2,
    title: 'BLINDGO',
    desc: 'Smart glasses for visually impaired audio navigation, providing real-time assistance and obstacle detection.',
    tech: ['Python', 'Computer Vision', 'NLP', 'Embedded Systems'],
    color: '#00CFCF',
    link: '#',
    status: 'completed'
  },
  {
    id: 3,
    title: 'BUSBUDDY',
    desc: 'Real-time bus tracking system for accessibility, ensuring smooth and predictable transit for all users.',
    tech: ['React', 'Node.js', 'Firebase', 'Google Maps API'],
    color: '#FF8400',
    link: '#',
    status: 'completed'
  }
];


export default function ProjectsModal({ onClose }) {
  const [downloadProgress, setDownloadProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="au-panel"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '700px', width: '100%', overflow: 'hidden' }}
      >
        {/* Header */}
        <div
          style={{
            background: 'linear-gradient(90deg, #1A0D2E, #36185E, #1A0D2E)',
            border: '1px solid #6B31BC',
            padding: '12px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span className="pixel-heading glow-purple" style={{ fontSize: '14px', color: '#6B31BC' }}>
            DOWNLOAD DATA
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span className="pixel-text blink" style={{ color: '#6B31BC', fontSize: '8px' }}>● COMMUNICATING</span>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '24px' }}>
          {/* Download Animation */}
          <div style={{ marginBottom: '32px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>
              {downloadProgress < 100 ? '📁 ➡️ 🖥️' : '✅ 🖥️'}
            </div>
            <div className="progress-bar" style={{ height: '24px', maxWidth: '400px', margin: '0 auto', background: '#0a0a0a' }}>
              <div
                className="progress-fill"
                style={{ width: `${downloadProgress}%`, background: 'linear-gradient(90deg, #4A1b8C, #6B31BC)', transition: 'width 0.1s linear' }}
              />
            </div>
            <div className="pixel-text" style={{ color: downloadProgress === 100 ? '#27E240' : '#e0e0ff', fontSize: '10px', marginTop: '12px' }}>
              {downloadProgress < 100 ? `Estimated Time: ${Math.max(1, Math.floor((100 - downloadProgress) / 20))}s...` : 'Download Complete.'}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {projects.map((proj, i) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: downloadProgress === 100 ? i * 0.2 : 1.5 }}
                className="au-panel-light"
                style={{
                  padding: '20px',
                  borderColor: `rgba(${parseInt(proj.color.slice(1,3),16)},${parseInt(proj.color.slice(3,5),16)},${parseInt(proj.color.slice(5,7),16)},0.3)`,
                  position: 'relative'
                }}
                whileHover={{ scale: 1.02, borderColor: proj.color }}
              >
                {/* File icon decoration */}
                <div style={{ position: 'absolute', top: 20, right: 20, opacity: 0.2, fontSize: '32px' }}>
                  📄
                </div>

                <div className="pixel-heading" style={{ color: proj.color, fontSize: '14px', marginBottom: '12px' }}>
                  {proj.title}
                </div>
                
                <p className="mono-text" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: '1.6', marginBottom: '16px', maxWidth: '85%' }}>
                  {proj.desc}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                  {proj.tech.map(t => (
                    <span key={t} style={{
                      padding: '4px 8px', background: 'rgba(0,0,0,0.5)', border: `1px solid ${proj.color}44`,
                      borderRadius: '4px', fontSize: '12px', fontFamily: "'Share Tech Mono', monospace", color: '#fff'
                    }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <a
                    href={proj.link}
                    className="pixel-text"
                    style={{
                      color: '#e0e0ff', textDecoration: 'none', borderBottom: `1px solid ${proj.color}`, paddingBottom: '2px', fontSize: '8px'
                    }}
                    onMouseEnter={e => e.target.style.color = proj.color}
                    onMouseLeave={e => e.target.style.color = '#e0e0ff'}
                  >
                    ACCESS LOG //
                  </a>
                  <span className="mono-text" style={{ fontSize: '12px', color: proj.status === 'completed' ? '#27E240' : '#F5F557' }}>
                    [{proj.status.toUpperCase()}]
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '12px 20px', background: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              background: 'transparent', border: '1px solid #6B31BC', color: '#6B31BC',
              fontFamily: "'Press Start 2P', monospace", fontSize: '10px', padding: '8px 20px', cursor: 'pointer', borderRadius: '4px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.target.style.background = 'rgba(107,49,188,0.2)'; }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; }}
          >
            CLOSE
          </button>
        </div>
      </motion.div>
    </div>
  );
}

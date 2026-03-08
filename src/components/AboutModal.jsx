import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

function StatBar({ label, value, max, color }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth((value / max) * 100), 400);
    return () => clearTimeout(t);
  }, [value, max]);

  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span className="mono-text" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px' }}>{label}</span>
        <span className="pixel-text" style={{ color, fontSize: '10px' }}>{value}{max === 10 ? '/10' : '%'}</span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${width}%`, background: `linear-gradient(90deg, ${color}88, ${color})` }}
        />
      </div>
    </div>
  );
}

export default function AboutModal({ onClose }) {
  const [scanLine, setScanLine] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanLine(prev => (prev >= 100 ? 0 : prev + 2));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="au-panel"
        initial={{ scale: 0.5, opacity: 0, rotateY: -30 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '640px', width: '100%', overflow: 'hidden' }}
      >
        {/* Header */}
        <div
          style={{
            background: 'linear-gradient(90deg, #001a1a, #004040, #001a1a)',
            border: '1px solid #00CFCF',
            padding: '12px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span className="pixel-heading glow-cyan" style={{ fontSize: '14px' }}>
            MEDBAY SCAN
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span className="pixel-text blink" style={{ color: '#00CFCF', fontSize: '8px' }}>● SCANNING</span>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
          {/* Scan line effect */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: `${scanLine}%`,
              width: '100%',
              height: '3px',
              background: 'linear-gradient(90deg, transparent, rgba(0,207,207,0.6), transparent)',
              pointerEvents: 'none',
              zIndex: 5,
            }}
          />

          {/* Name & Title */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ marginBottom: '24px', borderBottom: '1px solid rgba(0,207,207,0.2)', paddingBottom: '16px' }}
          >
            <div className="pixel-heading" style={{ fontSize: '18px', color: '#00CFCF', marginBottom: '8px' }}>
              RAPETI DURGA
            </div>
            <div className="pixel-heading" style={{ fontSize: '18px', color: '#00CFCF', marginBottom: '12px' }}>
              VENKATA PRASAD
            </div>
            <span className="badge">CREWMATE #041 — AI & DATA SCIENCE</span>
          </motion.div>

          {/* Vital signs => CGPA / GPA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="pixel-text" style={{ color: '#F5F557', fontSize: '9px', marginBottom: '16px', letterSpacing: '3px' }}>
              ► VITAL SIGNS
            </div>
            <StatBar label="CGPA" value={9.38} max={10} color="#00CFCF" />
            <StatBar label="10th GPA" value={10} max={10} color="#F5F557" />
            <StatBar label="INTEGRITY" value={98} max={100} color="#27E240" />
            <StatBar label="TASK EFFICIENCY" value={95} max={100} color="#FF8400" />
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{ marginTop: '24px' }}
          >
            <div className="pixel-text" style={{ color: '#F5F557', fontSize: '9px', marginBottom: '12px', letterSpacing: '3px' }}>
              ► MISSION LOGS — EDUCATION
            </div>
            <div
              className="au-panel-light"
              style={{ padding: '14px', marginBottom: '10px', borderColor: 'rgba(0,207,207,0.2)' }}
            >
              <div className="mono-text" style={{ color: '#00CFCF', fontSize: '16px', fontWeight: 'bold' }}>
                B.Tech — AI & Data Science
              </div>
              <div className="mono-text" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
                JNTU Kakinada | 2022–2026 | CGPA: 9.38
              </div>
            </div>
            <div
              className="au-panel-light"
              style={{ padding: '14px', borderColor: 'rgba(0,207,207,0.2)' }}
            >
              <div className="mono-text" style={{ color: '#00CFCF', fontSize: '16px', fontWeight: 'bold' }}>
                Intermediate — MPC
              </div>
              <div className="mono-text" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
                Board of Intermediate Education | 2020–2022 | 94%
              </div>
            </div>
          </motion.div>

          {/* Status */}
          <div
            style={{
              marginTop: '20px',
              padding: '10px',
              background: 'rgba(39,226,64,0.08)',
              border: '1px solid rgba(39,226,64,0.3)',
              borderRadius: '4px',
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: '20px' }}>✅</span>
            <span className="mono-text" style={{ color: '#27E240', fontSize: '16px' }}>
              SCAN COMPLETE — NO ANOMALIES DETECTED
            </span>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '12px 20px',
            background: 'rgba(0,0,0,0.3)',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: '1px solid #00CFCF',
              color: '#00CFCF',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '10px',
              padding: '8px 20px',
              cursor: 'pointer',
              borderRadius: '4px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.target.style.background = 'rgba(0,207,207,0.2)'; }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; }}
          >
            CLOSE
          </button>
        </div>
      </motion.div>
    </div>
  );
}

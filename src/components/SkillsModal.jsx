import { motion } from 'framer-motion';
import { useState } from 'react';

const techCategories = [
  {
    category: 'COMMON TASK: LANGUAGES',
    color: '#00CFCF',
    items: ['Python', 'C', 'C++', 'Java']
  },
  {
    category: 'WIRING (WEB)',
    color: '#F5F557',
    items: ['Next.js', 'Node.js', 'TypeScript', 'React', 'Tailwind CSS']
  },
  {
    category: 'CALIBRATE (AI)',
    color: '#6B31BC',
    items: ['NLP', 'Model Deployment', 'Deep Learning', 'Generative AI', 'LLMs', 'LangChain']
  },
  {
    category: 'REACTOR (TOOLS)',
    color: '#FF8400',
    items: ['Git', 'Docker', 'n8n Automation', 'VS Code', 'Google Cloud']
  }
];


const Wires = ({ color }) => (
  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '16px' }}>
    <div style={{ width: '40px', height: '40px', background: 'rgba(0,0,0,0.5)', border: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '20px', height: '10px', background: color, borderRadius: '2px' }} />
    </div>
    <div className="wire connected" style={{ flex: 1, height: '12px', background: color, boxShadow: `0 0 10px ${color}` }} />
    <div style={{ width: '40px', height: '40px', background: 'rgba(0,0,0,0.5)', border: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '20px', height: '10px', background: color, borderRadius: '2px' }} />
    </div>
  </div>
);

export default function SkillsModal({ onClose }) {
  const [fixed, setFixed] = useState(false);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="au-panel"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '800px', width: '100%', overflow: 'hidden' }}
      >
        {/* Header */}
        <div
          style={{
            background: 'linear-gradient(90deg, #1A1A00, #4D4D00, #1A1A00)',
            border: '1px solid #F5F557',
            padding: '12px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span className="pixel-heading glow-yellow" style={{ fontSize: '14px' }}>
            FIX WIRING
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span className="pixel-text blink" style={{ color: '#F5F557', fontSize: '8px' }}>● ELECTRICAL</span>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            <Wires color="#F5F557" />
            <Wires color="#00CFCF" />
            <Wires color="#6B31BC" />
            <Wires color="#FF8400" />
          </div>

          <div
            className="pixel-text"
            style={{ color: '#27E240', fontSize: '12px', textAlign: 'center', marginBottom: '24px', letterSpacing: '2px' }}
          >
            TASK COMPLETED: SYSTEMS ONLINE
          </div>

          {/* Tech Stack Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {techCategories.map((cat, i) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                className="au-panel-light"
                style={{
                  padding: '16px',
                  borderColor: `rgba(${parseInt(cat.color.slice(1,3),16)},${parseInt(cat.color.slice(3,5),16)},${parseInt(cat.color.slice(5,7),16)},0.3)`
                }}
              >
                <div
                  className="pixel-text"
                  style={{ color: cat.color, fontSize: '10px', marginBottom: '12px', letterSpacing: '2px', borderBottom: `1px solid ${cat.color}44`, paddingBottom: '8px' }}
                >
                  {cat.category}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {cat.items.map((item, j) => (
                    <motion.span
                      key={item}
                      whileHover={{ scale: 1.05, background: `${cat.color}33`, borderColor: cat.color }}
                      style={{
                        padding: '6px 10px',
                        background: 'rgba(0,0,0,0.4)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '4px',
                        fontSize: '14px',
                        fontFamily: "'Share Tech Mono', monospace",
                        color: '#e0e0ff',
                        transition: 'all 0.2s',
                        cursor: 'default'
                      }}
                    >
                      {item}
                    </motion.span>
                  ))}
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
              background: 'transparent', border: '1px solid #F5F557', color: '#F5F557',
              fontFamily: "'Press Start 2P', monospace", fontSize: '10px', padding: '8px 20px', cursor: 'pointer', borderRadius: '4px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.target.style.background = 'rgba(245,245,87,0.2)'; }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; }}
          >
            CLOSE
          </button>
        </div>
      </motion.div>
    </div>
  );
}

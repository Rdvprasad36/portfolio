import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolioInfo } from '../context/PortfolioContext';
import EditableText from '../components/EditableText';

export default function Experience() {
  const { data, isAdmin, updateSection, addExperience, deleteExperience } = usePortfolioInfo();
  const { experience } = data;

  const [insertIndex, setInsertIndex] = useState(-1);

  const addNew = () => {
    addExperience({
      role: "New Role",
      company: "New Company",
      date: "Date",
      points: ["Point 1", "Point 2"],
      tags: ["Tag 1"]
    }, insertIndex);
  };

  const handleUpdate = (index, field, value) => {
    const newExp = [...experience];
    if (field === 'points') {
        newExp[index][field] = value.split('\n');
    } else {
        newExp[index][field] = value;
    }
    updateSection('experience', newExp);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h2 className="pixel-heading" style={{ color: '#FF8400', fontSize: '28px', textAlign: 'center', margin: 0 }}>
          EXPERIENCE TIMELINE
        </h2>
        {isAdmin && (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <select 
              value={insertIndex} 
              onChange={(e) => setInsertIndex(parseInt(e.target.value))}
              style={{ background: '#131920', color: '#FF8400', border: '1px solid #FF8400', padding: '5px', borderRadius: '4px', fontFamily: "'Share Tech Mono', monospace" }}
            >
              <option value="-1">Insert at End</option>
              <option value="0">Insert at Start</option>
              {experience.map((_, i) => i > 0 && <option key={i} value={i}>Insert at Index {i}</option>)}
            </select>
            <motion.button
              whileHover={{ scale: 1.05, background: '#FF8400', color: '#FFF' }}
              whileTap={{ scale: 0.95 }}
              onClick={addNew}
              className="pixel-text"
              style={{
                background: 'transparent', border: '2px solid #FF8400', 
                color: '#FF8400', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer'
              }}
            >
              + ADD EXPERIENCE
            </motion.button>
          </div>
        )}
      </div>

      <div style={{ position: 'relative', paddingLeft: '40px', borderLeft: '4px solid #2C3A46' }}>
        {experience.map((exp, idx) => (
          <motion.div 
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            style={{ marginBottom: '50px', position: 'relative' }}
          >
            {/* Timeline dot */}
            <div style={{
              position: 'absolute', left: '-52px', top: '0',
              width: '20px', height: '20px', background: '#FF8400',
              borderRadius: '50%', border: '4px solid #131920', boxShadow: '0 0 10px #FF8400'
            }} />

            <div className="au-panel" style={{ padding: '24px', position: 'relative' }}>
              {isAdmin && (
                <button 
                  onClick={() => deleteExperience(exp.id)}
                  style={{
                    position: 'absolute', top: '10px', right: '10px', zIndex: 10,
                    background: '#FF4444', color: '#FFF', border: 'none', 
                    borderRadius: '4px', padding: '5px 8px', cursor: 'pointer', fontSize: '10px'
                  }}
                >
                  DELETE
                </button>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h3 className="pixel-heading" style={{ color: '#FFF', fontSize: '16px' }}>
                    <EditableText value={exp.role} onSave={(v) => handleUpdate(idx, 'role', v)} />
                  </h3>
                  <div className="pixel-text" style={{ color: '#FF8400', fontSize: '12px', marginTop: '5px' }}>
                    <EditableText value={exp.company} onSave={(v) => handleUpdate(idx, 'company', v)} />
                  </div>
                </div>
                <div className="mono-text" style={{ color: '#A0AAB2', fontSize: '12px', background: 'rgba(0,0,0,0.3)', padding: '4px 10px', borderRadius: '4px' }}>
                  <EditableText value={exp.date} onSave={(v) => handleUpdate(idx, 'date', v)} />
                </div>
              </div>

              <ul style={{ marginTop: '20px', color: '#E0E0E0', fontSize: '14px', lineHeight: '1.6', paddingLeft: '20px' }}>
                {exp.points.map((point, pIdx) => (
                  <li key={pIdx} style={{ marginBottom: '8px' }}>{point}</li>
                ))}
                {/* Points are editable as a block for simplicity */}
                <div style={{ marginTop: '10px', opacity: 0.5, fontSize: '10px' }}>
                   <EditableText multiline value={exp.points.join('\n')} onSave={(v) => handleUpdate(idx, 'points', v)} placeholder="Edit points (one per line)..." />
                </div>
              </ul>

              <div style={{ display: 'flex', gap: '8px', marginTop: '20px', flexWrap: 'wrap' }}>
                {exp.tags.map((tag, tIdx) => (
                  <span key={tIdx} style={{ background: '#1A242B', border: '1px solid #2C3A46', color: '#A0AAB2', padding: '4px 8px', borderRadius: '4px', fontSize: '10px' }}>{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

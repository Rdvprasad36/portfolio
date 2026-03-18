import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolioInfo } from '../context/PortfolioContext';
import EditableText from '../components/EditableText';

export default function Skills() {
  const { data, updateSection } = usePortfolioInfo();
  const { skillsDetailed } = data;

  const handleUpdate = (category, value) => {
    const newSkills = { ...skillsDetailed };
    newSkills[category] = value.split(',').map(s => s.trim()).filter(s => s);
    updateSection('skillsDetailed', newSkills);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}
    >
      <h2 className="pixel-heading" style={{ color: '#F5F557', fontSize: '28px', textAlign: 'center', marginBottom: '40px' }}>
        TECHNICAL ARSENAL
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {Object.entries(skillsDetailed).map(([category, skills]) => (
          <div key={category} className="au-panel" style={{ padding: '24px', position: 'relative' }}>
            <h3 className="pixel-heading" style={{ color: '#F5F557', fontSize: '14px', marginBottom: '20px' }}>
               {category.toUpperCase()}
            </h3>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {skills.map((skill, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05, y: -2 }}
                  style={{
                    padding: '10px 16px',
                    background: '#1A242B',
                    border: '2px solid #2C3A46',
                    borderRadius: '8px',
                    color: '#FFF',
                    fontSize: '12px',
                    fontFamily: "'Space Mono', monospace",
                    boxShadow: '0 4px 0 #000'
                  }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>

            <div style={{ marginTop: '20px', borderTop: '1px solid #2C3A46', paddingTop: '10px' }}>
                <span style={{ fontSize: '10px', color: '#637785' }}>Edit tags (comma separated):</span>
                <EditableText multiline value={skills.join(', ')} onSave={(v) => handleUpdate(category, v)} />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolioInfo } from '../context/PortfolioContext';
import EditableText from '../components/EditableText';

export default function Skills() {
  const { data, isAdmin, updateSection } = usePortfolioInfo();
  const { skillsDetailed } = data;

  const [insertIndex, setInsertIndex] = useState(-1);
  const [newCat, setNewCat] = useState('');

  const handleUpdate = (category, value) => {
    const newSkills = { ...skillsDetailed };
    newSkills[category] = value.split(',').map(s => s.trim()).filter(s => s);
    updateSection('skillsDetailed', newSkills);
  };

  const addNewCategory = () => {
    if (!newCat.trim()) return;
    const entries = Object.entries(skillsDetailed);
    if (insertIndex === -1 || insertIndex >= entries.length) {
      entries.push([newCat, ['New Skill']]);
    } else if (insertIndex === 0) {
      entries.unshift([newCat, ['New Skill']]);
    } else {
      entries.splice(insertIndex, 0, [newCat, ['New Skill']]);
    }
    updateSection('skillsDetailed', Object.fromEntries(entries));
    setNewCat('');
  };
  
  const deleteCategory = (catToDelete) => {
    const entries = Object.entries(skillsDetailed).filter(([k]) => k !== catToDelete);
    updateSection('skillsDetailed', Object.fromEntries(entries));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
        <h2 className="pixel-heading" style={{ color: '#F5F557', fontSize: '28px', textAlign: 'center', margin: 0 }}>
          TECHNICAL ARSENAL
        </h2>
        
        {isAdmin && (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input 
              type="text" 
              value={newCat} 
              onChange={e => setNewCat(e.target.value)} 
              placeholder="New Category Name"
              className="pixel-text"
              style={{ background: '#131920', color: '#F5F557', border: '1px solid #F5F557', padding: '8px', borderRadius: '4px' }}
            />
            <select 
              value={insertIndex} 
              onChange={(e) => setInsertIndex(parseInt(e.target.value))}
              style={{ background: '#131920', color: '#F5F557', border: '1px solid #F5F557', padding: '5px', borderRadius: '4px', fontFamily: "'Share Tech Mono', monospace" }}
            >
              <option value="-1">Insert at End</option>
              <option value="0">Insert at Start</option>
              {Object.keys(skillsDetailed).map((_, i) => i > 0 && <option key={i} value={i}>Insert at Index {i}</option>)}
            </select>
            <motion.button
              whileHover={{ scale: 1.05, background: '#F5F557', color: '#000' }}
              whileTap={{ scale: 0.95 }}
              onClick={addNewCategory}
              className="pixel-text"
              style={{
                background: 'transparent', border: '2px solid #F5F557', 
                color: '#F5F557', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer'
              }}
            >
              + ADD CATEGORY
            </motion.button>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {Object.entries(skillsDetailed).map(([category, skills]) => (
          <div key={category} className="au-panel" style={{ padding: '24px', position: 'relative' }}>
            {isAdmin && (
              <button 
                onClick={() => deleteCategory(category)}
                style={{
                  position: 'absolute', top: '10px', right: '10px', zIndex: 10,
                  background: '#FF4444', color: '#FFF', border: 'none', 
                  borderRadius: '4px', padding: '5px 8px', cursor: 'pointer', fontSize: '10px'
                }}
              >
                DELETE
              </button>
            )}
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

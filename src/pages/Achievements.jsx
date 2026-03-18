import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioInfo } from '../context/PortfolioContext';
import EditableText from '../components/EditableText';

export default function Achievements() {
  const { data, isAdmin, addAchievement, deleteAchievement } = usePortfolioInfo();
  const { achievements } = data;
  const [newText, setNewText] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (newText.trim()) {
      addAchievement(newText.trim());
      setNewText('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}
    >
       <h2 className="pixel-heading" style={{ color: '#27E240', fontSize: '28px', textAlign: 'center', marginBottom: '40px' }}>ACHIEVEMENTS</h2>
       
       <div className="au-panel" style={{ padding: '32px' }}>
          {isAdmin && (
            <form onSubmit={handleAdd} style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
               <input 
                 type="text" 
                 value={newText}
                 onChange={(e) => setNewText(e.target.value)}
                 placeholder="Enter new achievement..."
                 style={{
                   flex: 1, padding: '12px', background: 'rgba(0,0,0,0.3)', 
                   border: '2px solid #2C3A46', color: '#FFF', borderRadius: '4px'
                 }}
               />
               <motion.button 
                 whileHover={{ scale: 1.05, background: '#27E240', color: '#000' }}
                 type="submit"
                 className="pixel-text"
                 style={{ background: 'transparent', border: '2px solid #27E240', color: '#27E240', padding: '0 20px', borderRadius: '4px', cursor: 'pointer' }}
               >
                 ADD
               </motion.button>
            </form>
          )}

          <ul style={{ listStyleType: 'none', padding: 0, color: '#E0E0E0', fontSize: '16px', lineHeight: '2' }}>
            <AnimatePresence>
              {achievements.map((ach, idx) => (
                <motion.li 
                  key={idx + ach} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  style={{ 
                    marginBottom: '15px', padding: '15px', background: 'rgba(255,255,255,0.03)', 
                    borderRadius: '8px', border: '1px solid #2C3A46', display: 'flex', 
                    justifyContent: 'space-between', alignItems: 'center' 
                  }}
                >
                  <span>★ {ach}</span>
                  {isAdmin && (
                    <button 
                      onClick={() => deleteAchievement(idx)}
                      style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', fontSize: '12px' }}
                    >
                      REMOVE
                    </button>
                  )}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          {achievements.length === 0 && (
            <div className="pixel-text" style={{ textAlign: 'center', opacity: 0.5, padding: '40px' }}>
              NO LOGS FOUND.
            </div>
          )}
       </div>
    </motion.div>
  );
}

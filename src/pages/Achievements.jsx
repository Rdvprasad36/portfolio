import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioInfo } from '../context/PortfolioContext';
import EditableText from '../components/EditableText';

export default function Achievements() {
  const { data, isAdmin, updateSection } = usePortfolioInfo();
  const { achievements } = data; // Note: achievements is currently an array of strings. 
  // Let's support both strings and objects for compatibility.
  
  const handleUpdate = (index, value) => {
    const newArr = [...achievements];
    if (typeof newArr[index] === 'object') {
      newArr[index] = { ...newArr[index], text: value };
    } else {
      newArr[index] = value;
    }
    updateSection('achievements', newArr);
  };

  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newArr = [...achievements];
        const current = typeof newArr[index] === 'object' ? newArr[index] : { text: newArr[index] };
        newArr[index] = { ...current, image: reader.result };
        updateSection('achievements', newArr);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = () => {
    const text = prompt("Achievement Text:", "Winner of...");
    if (text) {
      updateSection('achievements', [...achievements, text]);
    }
  };

  const handleDelete = (index) => {
    if (window.confirm("Delete this log?")) {
      updateSection('achievements', achievements.filter((_, i) => i !== index));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto' }}
    >
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
         <h2 className="pixel-heading" style={{ color: '#27E240', fontSize: '28px', margin: 0 }}>ACHIEVEMENT LOGS</h2>
         {isAdmin && (
           <motion.button 
             whileHover={{ scale: 1.05, background: '#27E240', color: '#000' }}
             whileTap={{ scale: 0.95 }}
             onClick={handleAdd}
             className="pixel-text"
             style={{ 
               background: 'transparent', border: '2px solid #27E240', 
               color: '#27E240', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' 
             }}
           >
             + ADD RECORD
           </motion.button>
         )}
       </div>
       
       <div style={{ display: 'grid', gap: '20px' }}>
          <AnimatePresence>
            {achievements.map((ach, idx) => {
               const text = typeof ach === 'object' ? ach.text : ach;
               const image = typeof ach === 'object' ? ach.image : null;
               
               return (
                 <motion.div 
                   key={idx} 
                   layout
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                   className="au-panel"
                   style={{ 
                     display: 'flex', gap: '24px', alignItems: 'center', 
                     padding: '24px', position: 'relative', overflow: 'hidden'
                   }}
                 >
                   {/* Achievement Image */}
                   <div style={{ width: '80px', height: '80px', flexShrink: 0, background: '#1A242B', borderRadius: '12px', border: '2px solid #2C3A46', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                      {image ? (
                        <img src={image} alt="Log" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />
                      ) : (
                        <span style={{ fontSize: '24px' }}>🏆</span>
                      )}
                      {isAdmin && (
                        <label style={{ position: 'absolute', bottom: '-8px', right: '-8px', background: '#27E240', color: '#000', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '12px' }}>
                           📷
                           <input type="file" hidden accept="image/*" onChange={(e) => handleImageUpload(idx, e)} />
                        </label>
                      )}
                   </div>

                   <div style={{ flex: 1 }}>
                      <div className="mono-text" style={{ fontSize: '13px', color: '#88929b', marginBottom: '4px' }}>LOG RECORD #{idx + 1}</div>
                      <div className="pixel-heading" style={{ color: '#E0E0E0', fontSize: '13px', lineHeight: '1.6' }}>
                         {isAdmin ? (
                           <EditableText multiline value={text} onSave={(v) => handleUpdate(idx, v)} />
                         ) : (
                           text
                         )}
                      </div>
                   </div>

                   {isAdmin && (
                     <button 
                       onClick={() => handleDelete(idx)}
                       style={{ background: 'rgba(255,68,68,0.1)', border: '1px solid #ff4444', color: '#ff4444', borderRadius: '4px', padding: '6px 12px', cursor: 'pointer', fontSize: '10px' }}
                     >
                       DELETE
                     </button>
                   )}
                 </motion.div>
               );
            })}
          </AnimatePresence>

          {achievements.length === 0 && (
            <div className="pixel-text" style={{ textAlign: 'center', opacity: 0.5, padding: '100px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
              NO ACHIEVEMENT DATA FOUND IN DATABASE.
            </div>
          )}
       </div>
    </motion.div>
  );
}

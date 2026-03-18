import React, { useState, useEffect, useRef } from 'react';
import { usePortfolioInfo } from '../context/PortfolioContext';
import { motion } from 'framer-motion';

// A component that wraps text and allows editing it if the user is an admin
export default function EditableText({ 
  value, 
  onSave, 
  multiline = false, 
  className = "", 
  style = {},
  placeholder = "Enter text..."
}) {
  const { isAdmin } = usePortfolioInfo();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (tempValue !== value) {
      onSave(tempValue);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !multiline) {
      handleSave();
    }
    if (e.key === 'Escape') {
      setTempValue(value);
      setIsEditing(false);
    }
  };

  if (!isAdmin) {
    return <span className={className} style={style}>{value}</span>;
  }

  if (isEditing) {
    return (
      <div style={{ position: 'relative', display: 'inline-block', width: multiline ? '100%' : 'auto' }}>
        {multiline ? (
          <textarea
            ref={inputRef}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className={className}
            style={{ 
              ...style, 
              background: '#1A242B', 
              border: '1px solid #00CFCF', 
              color: '#FFF', 
              padding: '4px',
              borderRadius: '4px',
              width: '100%',
              minHeight: '100px',
              resize: 'vertical'
            }}
          />
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className={className}
            style={{ 
              ...style, 
              background: '#1A242B', 
              border: '1px solid #00CFCF', 
              color: '#FFF', 
              padding: '4px',
              borderRadius: '4px',
              width: '100%',
              minWidth: '200px'
            }}
          />
        )}
      </div>
    );
  }

  return (
    <motion.div 
      style={{ display: 'inline-block', position: 'relative', cursor: 'url(/target.png), pointer', ...style, border: '1px dashed transparent', padding: '2px', borderRadius: '4px' }}
      whileHover={{ borderColor: 'rgba(0, 207, 207, 0.5)', backgroundColor: 'rgba(0, 207, 207, 0.05)' }}
      onClick={() => setIsEditing(true)}
      title="Click to edit"
      className={className}
    >
      {value || <span style={{ opacity: 0.5 }}>{placeholder}</span>}
      <div style={{ position: 'absolute', top: -10, right: -10, background: '#00CFCF', color: '#000', fontSize: '8px', padding: '2px 4px', borderRadius: '4px', opacity: 0, transition: '0.2s' }} className="edit-badge">
        EDIT
      </div>
      <style>{`
        div:hover > .edit-badge { opacity: 1 !important; }
      `}</style>
    </motion.div>
  );
}

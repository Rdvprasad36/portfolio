import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolioInfo } from '../context/PortfolioContext';
import EditableText from '../components/EditableText';

export default function Projects() {
  const { data, isAdmin, updateSection, addProject, deleteProject } = usePortfolioInfo();
  const { projects } = data;

  const handleUpdate = (index, field, value) => {
    const newProjects = [...projects];
    if (field === 'tech') {
      newProjects[index][field] = value.split(',').map(t => t.trim()).filter(t => t);
    } else {
      newProjects[index][field] = value;
    }
    updateSection('projects', newProjects);
  };

  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleUpdate(index, 'image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addNew = () => {
    addProject({
      title: "New Project",
      description: "Project description goes here.",
      tech: ["Tech 1", "Tech 2"],
      link: "#",
      image: null
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}
    >
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
         <h2 className="pixel-heading" style={{ color: '#6B31BC', fontSize: '28px', margin: 0 }}>PROJECT LOGS</h2>
         {isAdmin && (
           <motion.button
             whileHover={{ scale: 1.05, background: '#6B31BC', color: '#FFF' }}
             whileTap={{ scale: 0.95 }}
             onClick={addNew}
             className="pixel-text"
             style={{
               background: 'transparent', border: '2px solid #6B31BC', 
               color: '#6B31BC', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer'
             }}
           >
             + ADD PROJECT
           </motion.button>
         )}
       </div>
       
       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
         {projects.map((proj, idx) => (
           <motion.div 
             key={proj.id || idx} 
             layout
             className="au-panel" 
             style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}
           >
              {isAdmin && (
                <button 
                  onClick={() => deleteProject(proj.id)}
                  style={{
                    position: 'absolute', top: '10px', right: '10px', zIndex: 10,
                    background: '#FF4444', color: '#FFF', border: 'none', 
                    borderRadius: '4px', padding: '5px 8px', cursor: 'pointer', fontSize: '10px'
                  }}
                >
                  DELETE
                </button>
              )}

              {/* Project Image */}
              <div style={{ height: '200px', background: '#0F1A24', position: 'relative', overflow: 'hidden' }}>
                {proj.image ? (
                  <img src={proj.image} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2C3A46', fontSize: '40px' }}>
                    📦
                  </div>
                )}
                {isAdmin && (
                  <label style={{
                    position: 'absolute', bottom: '10px', left: '10px', 
                    background: 'rgba(0,0,0,0.7)', color: '#FFF', padding: '4px 8px', 
                    borderRadius: '4px', cursor: 'pointer', fontSize: '10px'
                  }}>
                    UPLOAD IMAGE
                    <input type="file" hidden accept="image/*" onChange={(e) => handleImageUpload(idx, e)} />
                  </label>
                )}
              </div>

              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 className="pixel-heading" style={{ color: '#00CFCF', fontSize: '18px', marginBottom: '12px' }}>
                  <EditableText value={proj.title} onSave={(v) => handleUpdate(idx, 'title', v)} />
                </h3>
                <div className="mono-text" style={{ color: '#A0AAB2', fontSize: '14px', marginBottom: '20px', flex: 1 }}>
                  <EditableText multiline value={proj.description} onSave={(v) => handleUpdate(idx, 'description', v)} />
                </div>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                  {proj.tech.map((t, i) => (
                    <span key={i} style={{ background: 'rgba(107, 49, 188, 0.1)', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', color: '#B088FF', border: '1px solid #6B31BC' }}>{t}</span>
                  ))}
                </div>
                
                {isAdmin && (
                  <div style={{ fontSize: '10px', opacity: 0.5, marginBottom: '20px', color: '#637785' }}>
                    Edit tech (comma separated): <br/>
                    <EditableText value={proj.tech.join(', ')} onSave={(v) => handleUpdate(idx, 'tech', v)} />
                    <div style={{ marginTop: '10px' }}>
                      Link: <EditableText value={proj.link} onSave={(v) => handleUpdate(idx, 'link', v)} />
                    </div>
                  </div>
                )}

                <motion.a
                  href={proj.link === '#' ? undefined : proj.link}
                  target="_blank"
                  whileHover={{ scale: 1.02, background: '#00CFCF', color: '#000' }}
                  className="pixel-text"
                  style={{ 
                    color: '#00CFCF', textDecoration: 'none', display: 'block', 
                    textAlign: 'center', border: '2px solid #00CFCF', padding: '12px', 
                    borderRadius: '4px', transition: '0.2s', fontSize: '11px'
                  }}
                >
                  ACCESS DATA LOGS
                </motion.a>
              </div>
           </motion.div>
         ))}
       </div>
    </motion.div>
  );
}

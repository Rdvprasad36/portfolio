import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Crewmate from './Crewmate';
import { usePortfolioInfo } from '../context/PortfolioContext';
import EditableText from './EditableText';

const navButtons = [
  { color: '#00CFCF', label: 'ABOUT', path: '/' },
  { color: '#F5F557', label: 'SKILLS', path: '/skills' },
  { color: '#6B31BC', label: 'PROJECTS', path: '/projects' },
  { color: '#FF8400', label: 'EXPERIENCE', path: '/experience' },
  { color: '#27E240', label: 'ACHIEVEMENTS', path: '/achievements' },
  { color: '#FF2070', label: 'CONTACT', path: '/contact' },
];

function NavButton({ btn }) {
  const navigate = useNavigate();
  const playSound = () => {
    try {
      const audio = new Audio('/task-sound.mp3');
      audio.volume = 0.2;
      audio.play();
    } catch {}
  };

  return (
    <motion.div
      onClick={() => navigate(btn.path)}
      onMouseEnter={playSound}
      whileHover={{ scale: 1.02, filter: 'brightness(1.2)' }}
      whileTap={{ scale: 0.98 }}
      style={{
        background: '#1A242B',
        border: `3px solid #2C3A46`,
        borderRadius: '8px',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        height: '65px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Crewmate color={btn.color} size={30} label="" />
        <span className="pixel-heading" style={{ color: '#E0E0E0', fontSize: '11px' }}>
          {btn.label}
        </span>
      </div>
      <div style={{
background: '#333', 
        borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center'
      }}>
        <span className="pixel-text" style={{ fontSize: '12px', color: '#FFF' }}>? </span>
      </div>

    </motion.div>
  );
}

export default function NavigationHub() {
  const { data, isAdmin, updateProfile, addActivity, updateActivity, deleteActivity } = usePortfolioInfo();
  const { profile, recentActivities } = data;
  const [currentActivitySlide, setCurrentActivitySlide] = useState(0);

  const nextActivity = () => {
    if (recentActivities.length === 0) return;
    setCurrentActivitySlide((prev) => (prev + 1) % recentActivities.length);
  };

  const prevActivity = () => {
    if (recentActivities.length === 0) return;
    setCurrentActivitySlide((prev) => (prev - 1 + recentActivities.length) % recentActivities.length);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile('image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddActivity = () => {
    const title = prompt("Activity Title:", "New Milestone!");
    const date = prompt("Date:", "March 2026");
    const content = prompt("Content:", "Share your achievement...");
    if (title && content) {
      addActivity({ title, date, content });
    }
  };

  const handleEditActivity = (activity) => {
    const title = prompt("Edit Title:", activity.title);
    const date = prompt("Edit Date:", activity.date);
    const content = prompt("Edit Content:", activity.content);
    if (title && content) {
      updateActivity(activity.id, { title, date, content });
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'relative', zIndex: 10, minHeight: 'calc(100vh - 70px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '40px 20px',
      }}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        style={{
          width: '100%', maxWidth: '1100px', background: '#455A64',
          border: '14px solid #2B3A42', borderRadius: '24px',
          boxShadow: '0 30px 60px rgba(0,0,0,0.8)', padding: '24px',
          position: 'relative'
        }}
      >
        <div style={{
          background: '#1A212D', borderRadius: '16px', border: '4px solid #131821',
          padding: '32px', minHeight: '500px', display: 'flex', flexDirection: 'column'
        }}>
          <h2 className="pixel-heading" style={{ color: '#E0E0E0', textAlign: 'center', fontSize: '24px', marginBottom: '40px' }}>
            PORTFOLIO OVERVIEW
          </h2>

          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {/* Profile Side */}
            <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ position: 'relative', background: '#A6B6C1', padding: '12px', borderRadius: '16px', border: '6px solid #637785', boxShadow: '0 8px 0 #3D4A52' }}>
                <img src={profile.image || "/profile.jpg"} alt="Profile" style={{ width: '180px', height: '180px', borderRadius: '8px', objectFit: 'cover' }} />
                {isAdmin && (
                  <label style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', padding: '8px', borderRadius: '50%', cursor: 'pointer', color: '#FFF' }}>
                    📷
                    <input type="file" hidden accept="image/*" onChange={handlePhotoUpload} />
                  </label>
                )}
              </div>
              <div style={{ marginTop: '24px', textAlign: 'center', width: '100%' }}>
                <h3 className="pixel-heading" style={{ color: '#00CFCF', fontSize: '18px' }}>
                  <EditableText value={profile.name} onSave={(val) => updateProfile('name', val)} />
                </h3>
                <div className="mono-text" style={{ color: '#A0AAB2', fontSize: '14px', marginTop: '10px' }}>
                  <EditableText value={profile.role} onSave={(val) => updateProfile('role', val)} />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center', marginTop: '20px', color: '#88929b', fontSize: '12px', marginBottom: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>📞&nbsp;<EditableText value={profile.phone} onSave={(val) => updateProfile('phone', val)} /></div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>📧&nbsp;<EditableText value={profile.email} onSave={(val) => updateProfile('email', val)} /></div>
                </div>
                
                {/* Resume Download Button */}
                <motion.a
                  href="/resume.pdf"
                  download="resume.pdf"
                  whileHover={{ scale: 1.05, background: '#00CFCF', color: '#FFF' }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '10px',
                    padding: '12px 24px', background: 'transparent', border: '2px solid #00CFCF',
                    borderRadius: '8px', color: '#00CFCF', fontFamily: "'Press Start 2P', monospace",
                    fontSize: '10px', textDecoration: 'none', transition: 'all 0.3s'
                  }}
                >
                  <span style={{ fontSize: '16px' }}>📄</span> DOWNLOAD RESUME
                </motion.a>
              </div>
            </div>

            {/* About & Recent Activity Side */}
            <div style={{ flex: '1.5', minWidth: '350px', display: 'flex', flexDirection: 'column' }}>
              
              {/* Opportunities Badge */}
              <motion.div 
                animate={{ boxShadow: ['0 0 5px rgba(39, 226, 64, 0.4)', '0 0 15px rgba(39, 226, 64, 0.8)', '0 0 5px rgba(39, 226, 64, 0.4)'] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  alignSelf: 'flex-start', background: 'rgba(39, 226, 64, 0.1)', border: '1px solid #27E240',
                  color: '#27E240', padding: '6px 12px', borderRadius: '20px', fontSize: '10px',
                  fontFamily: "'Share Tech Mono', monospace", marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px'
                }}
              >
                <div style={{ width: 8, height: 8, background: '#27E240', borderRadius: '50%' }} className="blink" />
                AVAILABLE FOR NEW OPPORTUNITIES
              </motion.div>

              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '24px', borderRadius: '12px', border: '2px dashed #2C3A46', marginBottom: '24px' }}>
                <h4 className="pixel-text" style={{ color: '#00CFCF', marginBottom: '16px' }}>// OBJECTIVE SUMMARY</h4>
                <div className="mono-text" style={{ color: '#E0E0E0', fontSize: '14px', lineHeight: '1.8' }}>
                  <EditableText multiline value={profile.summary} onSave={(val) => updateProfile('summary', val)} />
                </div>
              </div>

              {/* Recent Activity Section */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h4 className="pixel-text" style={{ color: '#00CFCF' }}>// RECENT ACTIVITY LOGS</h4>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {isAdmin && (
                      <motion.button 
                        whileHover={{ scale: 1.1, background: 'rgba(39,226,64,0.2)' }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleAddActivity}
                        style={{ background: 'transparent', border: '1px solid #27E240', color: '#27E240', width: '30px', height: '30px', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
                      >
                        +
                      </motion.button>
                    )}
                    <motion.button 
                      whileHover={{ scale: 1.1, background: 'rgba(0,207,207,0.2)' }}
                      whileTap={{ scale: 0.9 }}
                      onClick={prevActivity}
                      style={{ background: 'transparent', border: '1px solid #00CFCF', color: '#00CFCF', width: '30px', height: '30px', borderRadius: '4px', cursor: 'pointer', fontFamily: "'Press Start 2P', monospace", fontSize: '10px' }}
                    >
                      &lt;
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.1, background: 'rgba(0,207,207,0.2)' }}
                      whileTap={{ scale: 0.9 }}
                      onClick={nextActivity}
                      style={{ background: 'transparent', border: '1px solid #00CFCF', color: '#00CFCF', width: '30px', height: '30px', borderRadius: '4px', cursor: 'pointer', fontFamily: "'Press Start 2P', monospace", fontSize: '10px' }}
                    >
                      &gt;
                    </motion.button>
                  </div>
                </div>

                <div style={{ background: '#1A242B', border: '2px solid #2C3A46', borderRadius: '12px', padding: '20px', position: 'relative', overflow: 'hidden', minHeight: '180px' }}>
                  {recentActivities.length > 0 ? (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={recentActivities[currentActivitySlide]?.id || 'empty'}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        style={{ width: '100%' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#3D4A52', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                              👨‍🚀
                            </div>
                            <div>
                              <div className="mono-text" style={{ color: '#FFF', fontWeight: 'bold' }}>{profile.name}</div>
                              <div className="mono-text" style={{ color: '#A0AAB2', fontSize: '12px' }}>{recentActivities[currentActivitySlide]?.date}</div>
                            </div>
                          </div>
                          {isAdmin && (
                            <div style={{ display: 'flex', gap: '8px' }}>
                               <button onClick={() => handleEditActivity(recentActivities[currentActivitySlide])} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}>✏️</button>
                               <button onClick={() => deleteActivity(recentActivities[currentActivitySlide].id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}>🗑️</button>
                            </div>
                          )}
                        </div>
                        <h5 className="pixel-heading" style={{ color: '#F5F557', fontSize: '12px', marginBottom: '10px' }}>
                          {recentActivities[currentActivitySlide]?.title}
                        </h5>
                        <p className="mono-text" style={{ color: '#E0E0E0', fontSize: '13px', lineHeight: '1.6' }}>
                          {recentActivities[currentActivitySlide]?.content}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  ) : (
                    <div className="pixel-text" style={{ color: '#888', textAlign: 'center', paddingTop: '60px' }}>NO RECENT ACTIVITIES</div>
                  )}
                </div>
              </div>

              {/* Grid of buttons - Moved to bottom after activities */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: 'auto', width: '100%' }}>
                {navButtons.slice(1).map(btn => (
                  <NavButton key={btn.path} btn={btn} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

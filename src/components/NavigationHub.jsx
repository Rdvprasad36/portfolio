import { motion } from 'framer-motion';
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
    } catch (e) {}
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
        width: '24px', height: '24px', background: 'rgba(255,255,255,0.9)', 
        borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center'
      }}>
        <span className="pixel-text" style={{ fontSize: '12px', color: '#1A242B' }}>?</span>
      </div>
    </motion.div>
  );
}

export default function NavigationHub() {
  const { data, updateProfile } = usePortfolioInfo();
  const { profile } = data;

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
              <div style={{ background: '#A6B6C1', padding: '12px', borderRadius: '16px', border: '6px solid #637785', boxShadow: '0 8px 0 #3D4A52' }}>
                <img src="/profile.jpg" alt="Profile" style={{ width: '180px', height: '180px', borderRadius: '8px', objectFit: 'cover' }} />
              </div>
              <div style={{ marginTop: '24px', textAlign: 'center', width: '100%' }}>
                <h3 className="pixel-heading" style={{ color: '#00CFCF', fontSize: '18px' }}>
                  <EditableText value={profile.name} onSave={(val) => updateProfile('name', val)} />
                </h3>
                <div className="mono-text" style={{ color: '#A0AAB2', fontSize: '14px', marginTop: '10px' }}>
                  <EditableText value={profile.role} onSave={(val) => updateProfile('role', val)} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '20px', color: '#88929b', fontSize: '12px' }}>
                  <div>📞 <EditableText value={profile.phone} onSave={(val) => updateProfile('phone', val)} /></div>
                  <div>📧 <EditableText value={profile.email} onSave={(val) => updateProfile('email', val)} /></div>
                  <div>📍 <EditableText value={profile.location} onSave={(val) => updateProfile('location', val)} /></div>
                </div>
              </div>
            </div>

            {/* About Side */}
            <div style={{ flex: '1.5', minWidth: '350px' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '24px', borderRadius: '12px', border: '2px dashed #2C3A46' }}>
                <h4 className="pixel-text" style={{ color: '#00CFCF', marginBottom: '16px' }}>// OBJECTIVE SUMMARY</h4>
                <div className="mono-text" style={{ color: '#E0E0E0', fontSize: '14px', lineHeight: '1.8' }}>
                  <EditableText multiline value={profile.summary} onSave={(val) => updateProfile('summary', val)} />
                </div>
              </div>

              {/* Grid of buttons to other pages */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '32px' }}>
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

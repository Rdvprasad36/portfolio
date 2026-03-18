import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminLoginModal from './AdminLoginModal';
import { usePortfolioInfo } from '../context/PortfolioContext';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin, logout, theme, toggleTheme } = usePortfolioInfo();
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const navLinks = [
    { label: 'OVERVIEW', path: '/' },
    { label: 'EXPERIENCE', path: '/experience' },
    { label: 'SKILLS', path: '/skills' },
    { label: 'PROJECTS', path: '/projects' },
    { label: 'ACHIEVEMENTS', path: '/achievements' },
    { label: 'CONTACT', path: '/contact' },
  ];

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '70px',
        background: theme === 'dark' ? 'rgba(10, 17, 22, 0.9)' : 'rgba(240, 245, 250, 0.9)', 
        backdropFilter: 'blur(8px)',
        borderBottom: theme === 'dark' ? '2px solid #2C3A46' : '2px solid #D0D7DE', 
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '0 40px', zIndex: 1000
      }}>
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}
          onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); navigate('/'); }}
        >
          <span className="pixel-heading glow-cyan" style={{ fontSize: '18px', color: theme === 'dark' ? '#FFF' : '#333' }}>RDV</span>
        </motion.div>

        {/* Navigation Links */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', justifyContent: 'center', flex: 2 }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <motion.a
                key={link.path}
                whileHover={{ y: -2, color: '#00CFCF' }}
                style={{
                  color: isActive ? '#00CFCF' : '#A0AAB2',
                  borderBottom: isActive ? '2px solid #00CFCF' : 'none',
                  paddingBottom: '4px',
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '10px', cursor: 'pointer', transition: 'color 0.2s',
                  textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px'
                }}
                onClick={() => navigate(link.path)}
              >
                {link.label}
              </motion.a>
            );
          })}
        </div>
        
        {/* Right Actions */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
          <motion.a
            href="/unnamed.pdf"
            download
            whileHover={{ scale: 1.05, background: '#FFF', color: '#131920' }}
            style={{
              border: '2px solid #00CFCF', padding: '8px 16px', borderRadius: '4px',
              color: '#00CFCF', fontFamily: "'Press Start 2P', monospace", fontSize: '9px',
              textDecoration: 'none', transition: 'all 0.2s'
            }}
          >
            RESUME
          </motion.a>
          
          <motion.div
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.9 }}
             onClick={toggleTheme}
             style={{ cursor: 'pointer', fontSize: '18px', color: theme === 'dark' ? '#F5F557' : '#555' }}
             title="Toggle Theme"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </motion.div>
          
          {isAdmin ? (
            <motion.button 
              whileHover={{ scale: 1.05, background: '#FF4444', color: '#FFF' }}
              style={{
                background: 'rgba(255, 68, 68, 0.1)', border: '2px solid #FF4444',
                padding: '8px 16px', borderRadius: '4px', color: '#FF4444',
                fontFamily: "'Press Start 2P', monospace", fontSize: '9px',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
              onClick={logout}
            >
              LOGOUT
            </motion.button>
          ) : (
            <motion.button 
              whileHover={{ scale: 1.05, background: '#FFF', color: '#131920' }}
              style={{
                background: 'transparent', border: '2px solid #00CFCF',
                padding: '8px 16px', borderRadius: '4px', color: '#00CFCF',
                fontFamily: "'Press Start 2P', monospace", fontSize: '9px',
                cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '6px'
              }}
              onClick={() => setShowAdminLogin(true)}
            >
              <span style={{ fontSize: '12px' }}>🚪</span> ADMIN LOGIN
            </motion.button>
          )}
        </div>
      </nav>
      <AdminLoginModal isOpen={showAdminLogin} onClose={() => setShowAdminLogin(false)} />
    </>
  );
}

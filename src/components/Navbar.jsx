import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminLoginModal from './AdminLoginModal';
import { usePortfolioInfo } from '../context/PortfolioContext';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
const { isAdmin, logout } = usePortfolioInfo();
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        background: 'rgba(10, 17, 22, 0.95)', 

        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '0 40px', zPr: 1000,
        zIndex: 1000
      }} className="px-6 md:px-12">
        
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}
          onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); navigate('/'); setIsMobileMenuOpen(false); }}
        >
          <motion.img 
            src="/white.png"
            alt="RDV Logo"
            style={{ width: '40px', height: '40px' }}
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          />
          <motion.span 
className="mono-text"


            style={{ fontSize: '18px', color: '#FFF', letterSpacing: '2px' }} 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            RDV.DEV
          </motion.span>

        </motion.div>

        {/* Navigation Links - Desktop View */}
        <div className="hidden md:flex" style={{ gap: '32px', alignItems: 'center', justifyContent: 'center', flex: 2 }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <div key={link.path} style={{ position: 'relative' }}>
                <motion.a
whileHover={{ scale: 1.05 }}
                  style={{
                    color: isActive ? '#FFF' : '#CCC',
                    fontFamily: 'monospace',
                    fontSize: '12px', cursor: 'pointer', transition: 'color 0.3s',
                    textDecoration: 'none', display: 'block', fontWeight: isActive ? 'bold' : 'normal',
                    padding: '8px 0'
                  }}
                  onClick={() => navigate(link.path)}
                >
                  {link.label}
                </motion.a>
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      height: '2px', background: '#00CFCF', borderRadius: '2px',
                      boxShadow: '0 0 8px rgba(0, 207, 207, 0.5)'
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
        
        {/* Right Actions */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>

          <motion.a
            href="/resume.pdf"
            download="resume.pdf"
            whileHover={{ scale: 1.05, background: '#00CFCF', color: '#FFF' }}
            whileTap={{ scale: 0.95 }}
            style={{
              border: '1px solid #00CFCF', padding: '10px 24px', borderRadius: '8px',
              color: '#00CFCF', fontFamily: "'Press Start 2P', monospace", fontSize: '10px',
              textDecoration: 'none', transition: 'all 0.3s', display: 'flex',
              alignItems: 'center', gap: '8px', fontWeight: 'bold'
            }}
            className="hidden md:flex"
          >
            📄 RESUME
          </motion.a>
          
          {isAdmin ? (
            <motion.button 
              whileHover={{ scale: 1.05, background: '#FF4444', color: '#FFF' }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'rgba(255, 68, 68, 0.1)', border: '1px solid #FF4444',
                padding: '10px 24px', borderRadius: '8px', color: '#FF4444',
                fontFamily: "'Press Start 2P', monospace", fontSize: '10px',
                cursor: 'pointer', transition: 'all 0.3s', display: 'flex',
                fontWeight: 'bold'
              }}
              className="hidden md:flex"
              onClick={logout}
            >
              LOGOUT
            </motion.button>
          ) : (
            <motion.button 
              whileHover={{ scale: 1.05, background: '#00CFCF', color: '#FFF' }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'transparent', border: '1px solid #00CFCF',
                padding: '10px 24px', borderRadius: '8px', color: '#00CFCF',
                fontFamily: "'Press Start 2P', monospace", fontSize: '10px',
                cursor: 'pointer', transition: 'all 0.3s', display: 'flex',
                fontWeight: 'bold'
              }}
              className="hidden md:flex"
              onClick={() => setShowAdminLogin(true)}
            >
              ADMIN
            </motion.button>
          )}

          {/* Hamburger Menu Icon */}
          <div className="md:hidden flex items-center">
            <motion.button 
              whileTap={{ scale: 0.8 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              style={{ background: 'transparent', border: 'none', color: '#FFF', fontSize: '28px', cursor: 'pointer' }}
            >
              {isMobileMenuOpen ? '✕' : '☰'}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-out Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(10, 17, 22, 0.98)',

              paddingTop: '100px', alignItems: 'center'
            }}
            className="md:hidden"
          >
            {navLinks.map((link, i) => {
              const isActive = location.pathname === link.path;
              return (
                <motion.div 
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  style={{ width: '80%', marginBottom: '20px' }}
                >
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '15px', color: isActive ? '#00CFCF' : '#A0AAB2',
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: '18px', textAlign: 'center', cursor: 'pointer',
                      background: isActive ? 'rgba(0, 207, 207, 0.1)' : 'transparent',
                      borderRadius: '12px', transition: 'all 0.2s',
                      fontWeight: isActive ? 'bold' : 'normal'
                    }}
                    onClick={() => {
                      navigate(link.path);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {link.label}
                  </motion.div>
                </motion.div>
              );
            })}

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ width: '80%', display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '40px' }}
            >
              <a
                href="/resume.pdf"
                download="resume.pdf"
                style={{
                  textAlign: 'center', border: '1px solid #00CFCF', padding: '15px', borderRadius: '30px',
                  color: '#00CFCF', fontFamily: "'Share Tech Mono', monospace", fontSize: '14px', textDecoration: 'none', fontWeight: 'bold'
                }}
              >
                DOWNLOAD RESUME
              </a>
              {isAdmin ? (
                <button 
                  style={{
                    background: 'rgba(255, 68, 68, 0.1)', border: '1px solid #FF4444',
                    padding: '15px', borderRadius: '30px', color: '#FF4444',
                    fontFamily: "'Share Tech Mono', monospace", fontSize: '14px', cursor: 'pointer', fontWeight: 'bold'
                  }}
                  onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                >
                  LOGOUT
                </button>
              ) : (
                <button 
                  style={{
                    background: 'transparent', border: '1px solid #00CFCF',
                    padding: '15px', borderRadius: '30px', color: '#00CFCF',
                    fontFamily: "'Share Tech Mono', monospace", fontSize: '14px', cursor: 'pointer', fontWeight: 'bold'
                  }}
                  onClick={() => { setShowAdminLogin(true); setIsMobileMenuOpen(false); }}
                >
                  ADMIN ACCESS
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AdminLoginModal isOpen={showAdminLogin} onClose={() => setShowAdminLogin(false)} />
    </>
  );
}

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminLoginModal from './AdminLoginModal';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'OVERVIEW', path: '/' },
    { label: 'PROJECTS', path: '/projects' },
    { label: 'POSTS & BLOGS', path: '/posts' },
    { label: 'CONTACT', path: '/contact' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 20 }}
        style={{
          position: 'absolute', 
          top: 0, 
          left: '5%',
          transform: 'translateX(-50%)',
          background: 'rgba(14, 13, 13, 0.95)', 
          borderRadius: '30px', 
          padding: '10px 24px', 
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.1)',
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between', 
          maxWidth: '90vw', 
          width: '10000px',
          backdropFilter: 'blur(20px)',
          fontFamily: 'Times New Roman, serif'
        }} 
        className="px-6 md:px-12"
      >
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}
          onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); navigate('/'); setIsMobileMenuOpen(false); }}
        >
          <motion.img 
            src="/white.png"
            alt="RDV Logo"
            style={{ width: '32px', height: '32px' }}
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          />
          <motion.span 
            className="mono-text"
            style={{ fontSize: '18px', color: '#FFF', letterSpacing: '2px', fontFamily: 'Times New Roman, serif' }} 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            RDV.DEV
          </motion.span>
        </motion.div>

        {/* Navigation Links - Desktop View */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <div key={link.path} style={{ position: 'relative' }}>
                <motion.a
                  whileHover={{ scale: 0.5, color: '#021cff' }}
                  style={{
                    color: isActive ? '#FFF' : '#CCC',
                    fontFamily: 'Times New Roman, serif',
                    fontSize: '14px', 
                    cursor: 'pointer', 
                    textDecoration: 'none', 
                    fontWeight: isActive ? 'bold' : 'normal',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => navigate(link.path)}
                >
                  {link.label}
                </motion.a>
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    style={{
                      position:'fixed', top: '100%', transform: 'translateX(-50%)',bottom: 0,
                      height: '1px', background: '#0e0e0e', borderRadius: '2px',
                      boxShadow: '0 0 12px rgba(1,44,255,0.6)'
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'rgba(255,255,255,0.1)', 
              border: '1px solid rgba(255,255,255,0.3)',
              padding: '12px 24px', 
              borderRadius: '12px', 
              color: 'white',
              fontFamily: 'serif', 
              fontSize: '14px',
              cursor: 'pointer', 
              fontWeight: 500
            }}
            className="hidden md:flex"
            onClick={() => navigate('/signin')}
          >
            SIGN IN
          </motion.button>


          {/* Hamburger Menu Icon */}
          <div className="md:hidden">
            <motion.button 
              whileTap={{ scale: 0.9, rotate: 90 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              style={{ 
                background: 'rgba(1,44,255,0.2)', 
                border: 'none', 
                color: '#FFF', 
                fontSize: '20px', 
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isMobileMenuOpen ? '✕' : '☰'}
            </motion.button>
          </div>
        </div>
      </motion.nav>

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
              paddingTop: '120px', 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px'
            }}
            className="md:hidden"
          >
            {navLinks.map((link, i) => {
              const isActive = location.pathname === link.path;
              return (
                <motion.div 
                  key={link.path}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ delay: i * 0.1 }}
                  style={{ width: '80%', maxWidth: '400px' }}
                >
                  <motion.a
                    href={link.path}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      padding: '16px 24px', 
                      color: isActive ? '#FFF' : '#CCC',
                      fontFamily: 'Times New Roman, serif',
                      fontSize: '16px', 
                      textAlign: 'center', 
                      cursor: 'pointer',
                      background: isActive ? 'rgba(1,44,255,0.2)' : 'rgba(255,255,255,0.05)',
                      borderRadius: '16px', 
                      border: isActive ? '2px solid #012cff' : '1px solid transparent',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none',
                      fontWeight: isActive ? 'bold' : 'normal'
                    }}
                  >
                    {link.label}
                  </motion.a>
                </motion.div>
              );
            })}

            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: navLinks.length * 0.1 + 0.2 }}
              style={{ width: '80%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '15px' }}
            >
              <motion.button 
                whileHover={{ scale: 1.02, boxShadow: '0 0 20px #012cff' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: 'rgba(1,44,255,0.1)', 
                  border: '2px solid #012cff',
                  padding: '12px 24px', 
                  borderRadius: '16px', 
                  color: '#012cff',
                  fontFamily: 'Times New Roman, serif', 
                  fontSize: '14px',
                  cursor: 'pointer', 
                  fontWeight: 600
                }}
                onClick={() => setShowAdminLogin(true)}
              >
                SIGN IN
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AdminLoginModal isOpen={showAdminLogin} onClose={() => setShowAdminLogin(false)} />
    </>
  );
}


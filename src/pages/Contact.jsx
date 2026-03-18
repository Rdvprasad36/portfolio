import React from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ padding: '80px 20px', textAlign: 'center' }}
    >
      <div className="au-panel" style={{ maxWidth: '600px', margin: '0 auto', padding: '40px' }}>
        <h2 className="pixel-heading" style={{ color: '#FF2070', fontSize: '24px', marginBottom: '30px' }}>EMERGENCY MEETING</h2>
        <p className="pixel-text" style={{ color: '#A0AAB2', lineHeight: '2', marginBottom: '40px' }}>
          HAVE A TASK FOR ME?<br/>
          OR FOUND SOMETHING SUS?
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
            <a href="mailto:rdvprasad36@gmail.com" className="report-btn" style={{ width: '100%', maxWidth: '300px', textDecoration: 'none', display: 'block', textAlign: 'center' }}>
                OPEN COMMS
            </a>
            <div className="mono-text" style={{ fontSize: '12px', color: '#637785' }}>
                Location: Visakhapatnam, Andhra Pradesh
            </div>
        </div>
      </div>
    </motion.div>
  );
}

import { motion } from 'framer-motion';
import Crewmate from './Crewmate';

const navButtonsLeft = [
  { color: '#00CFCF', label: 'ABOUT', section: 'about' },
  { color: '#F5F557', label: 'SKILLS', section: 'skills' },
  { color: '#6B31BC', label: 'PROJECTS', section: 'projects' },
];

const navButtonsRight = [
  { color: '#FF8400', label: 'EXPERIENCE', section: 'experience' },
  { color: '#27E240', label: 'ACHIEVEMENTS', section: 'achievements' },
  { color: '#FF2070', label: 'CONTACT', section: 'contact' },
];

// Reusable Voting-style button component
function NavButton({ btn, onSelect, selectedModal, reverse }) {
  const isSelected = selectedModal === btn.section;
  
  return (
    <motion.div
      onClick={() => onSelect(btn.section)}
      whileHover={{ scale: 1.02, filter: 'brightness(1.2)' }}
      whileTap={{ scale: 0.98 }}
      style={{
        background: isSelected ? 'rgba(255,255,255,0.15)' : '#1A242B',
        border: `3px solid ${isSelected ? btn.color : '#2C3A46'}`,
        borderRadius: '8px',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        flexDirection: reverse ? 'row-reverse' : 'row',
        boxShadow: isSelected ? `0 0 15px ${btn.color}40` : 'none',
        transition: 'all 0.2s',
        height: '65px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {isSelected && (
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '100%',
          background: `linear-gradient(90deg, transparent, ${btn.color}20, transparent)`,
        }} />
      )}
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexDirection: reverse ? 'row-reverse' : 'row' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Crewmate color={btn.color} size={30} label="" />
        </div>
        <span className="pixel-heading" style={{ color: '#E0E0E0', fontSize: '11px', whiteSpace: 'nowrap' }}>
          {btn.label}
        </span>
      </div>
      
      {/* Impeccable Voting Megaphone / Badge (Mock) */}
      {!isSelected && (
        <div style={{
          width: '24px', height: '24px',
          background: 'rgba(255,255,255,0.9)', borderRadius: '50%',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          boxShadow: 'inset 0 0 5px rgba(0,0,0,0.5)'
        }}>
           <span className="pixel-text" style={{ fontSize: '12px', color: '#1A242B' }}>?</span>
        </div>
      )}

      {isSelected && (
        <div style={{
          width: '24px', height: '24px',
          background: '#C51111', borderRadius: '50%',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          border: '2px solid #FFF',
          boxShadow: '0 2px 4px rgba(0,0,0,0.5)'
        }}>
           <span className="pixel-text" style={{ fontSize: '10px', color: '#FFF' }}>✓</span>
        </div>
      )}
    </motion.div>
  );
}

export default function NavigationHub({ onSelect, selectedModal }) {
  return (
    <section
      id="nav-hub"
      style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        // Background resembling the Voting Meeting room (Teal lower half, dark ceiling)
        background: 'linear-gradient(180deg, #0A1116 0%, #0F1A24 40%, #153B47 80%, #0E252D 100%)',
        overflow: 'hidden' // hide table overflow
      }}
    >
      {/* The Giant Voting TV Monitor Screen */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring' }}
        style={{
          width: '100%',
          maxWidth: '1100px',
          background: '#455A64', // Outer TV Frame color
          border: '14px solid #2B3A42', // Thick bezel
          borderRadius: '24px',
          boxShadow: '0 30px 60px rgba(0,0,0,0.8), inset 0 0 20px rgba(0,0,0,0.6)',
          padding: '24px',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* Inner Screen */}
        <div
          style={{
            background: '#1A212D', // Screen panel color
            borderRadius: '16px',
            border: '4px solid #131821',
            padding: '24px',
            minHeight: '500px',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* subtle scanline on screen */}
          <div style={{
             position: 'absolute', inset: 0, 
             background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)',
             pointerEvents: 'none', zIndex: 0 
          }} />

          {/* Heading */}
          <h2 className="pixel-heading" style={{ color: '#E0E0E0', textAlign: 'center', fontSize: '26px', letterSpacing: '2px', marginBottom: '32px', zIndex: 1, textShadow: '2px 2px 0px #000' }}>
            Who Is The Developer?
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', flex: 1, zIndex: 1, alignItems: 'center' }}>

            {/* Center Profile Display (The Suspect Card) */}
            <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              
              <div className="profile-card-inner" style={{ width: '100%', display: 'flex', gap: '32px', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>

                {/* Profile Image Frame */}
                <div style={{
                  background: '#A6B6C1', // Light gray background box like Elijah Wood frame
                  padding: '12px',
                  borderRadius: '16px',
                  border: '6px solid #637785', // Thinner inner border
                  boxShadow: '0 12px 0 #3D4A52', // 3D Bottom drop shadow
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexShrink: 0
                }}>
                <img 
                  // Update src to look in public folder for profile.jpg
                  src="/profile.jpg" 
                  alt="Durga Venkata Prasad Rapeti"
                  style={{ 
                    width: '150px', 
                    height: '150px', 
                    borderRadius: '8px', 
                    objectFit: 'cover',
                    filter: 'grayscale(15%) contrast(105%)', // Slight stylized filter
                    border: '2px solid rgba(0,0,0,0.2)'
                  }}
                  // If no local image found, show placeholder text
                  onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
                />
                <div style={{ display: 'none', width: '150px', height: '150px', background: '#333', color: '#FFF', justifyContent: 'center', alignItems: 'center', borderRadius: '8px', fontFamily: "'Press Start 2P', monospace", fontSize: '10px', textAlign: 'center', padding: '10px' }}>
                  Please add profile.jpg to public folder
                </div>
              </div>

              {/* Profile Text & Button Container */}
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center', width: '100%' }}>
                
                {/* Profile Text Details */}
                <div style={{ 
                  background: 'rgba(0,0,0,0.5)', 
                  padding: '16px', 
                  borderRadius: '12px', 
                  border: '2px solid #2C3A46', 
                  width: '100%',
                  textAlign: 'center',
                  marginBottom: '16px'
                }}>
                  <h3 className="pixel-heading" style={{ color: '#00CFCF', fontSize: '14px', marginBottom: '12px', textShadow: '2px 2px 0px #000' }}>
                    Durga Venkata Prasad Rapeti
                  </h3>
                  
                  <div className="mono-text" style={{ color: '#A0AAB2', fontSize: '12px', lineHeight: '1.8', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div>📞 +91 73826 12327</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      📧 
                      <motion.a 
                        href="mailto:rdvprasad36@gmail.com"
                        whileHover={{ scale: 1.05, color: '#00CFCF' }}
                        transition={{ duration: 0.2 }}
                        style={{ color: '#A0AAB2', textDecoration: 'none', cursor: 'pointer' }}
                      >
                        rdvprasad36@gmail.com
                      </motion.a>
                    </div>
                    <div>📍 Chodavaram, Visakhapatnam - 531023, Andhra Pradesh, India</div>
                  </div>
                  
                  {/* Social Links Badges */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '16px', flexWrap: 'wrap' }}>
                    {[
                      { name: 'LinkedIn', url: 'https://linkedin.com/in/durga-venkata-prasad-rapeti-b154022b7' },
                      { name: 'GitHub', url: 'https://github.com/Rdvprasad36' },
                      { name: 'LeetCode', url: 'https://leetcode.com/u/Rdv36' },
                      { name: 'CodeChef', url: 'https://codechef.com/users/rdvprasad36' }
                    ].map(link => (
                      <a key={link.name} href={link.url} target="_blank" rel="noreferrer" className="pixel-text" style={{ 
                        background: '#1D242B', padding: '6px 8px', borderRadius: '4px', fontSize: '8px', color: '#E0E0E0', border: '1px solid #455A64', textDecoration: 'none'
                      }}>
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Download Resume Button */}
                <motion.a 
                  href="/nersme2k26.pdf"
                  download
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: '#A6B6C1', 
                    border: '3px solid #637785',
                    boxShadow: '0 6px 0 #3D4A52',
                    borderRadius: '8px',
                    padding: '14px 24px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    width: '100%',
                    maxWidth: '300px'
                  }}
                >
                  <span className="pixel-heading" style={{ fontSize: '12px', color: '#131920' }}>DOWNLOAD RESUME</span>
                </motion.a>

              </div>
              </div>

              {/* Objective Summary Box */}
              <div style={{ 
                background: '#151D26', 
                border: '2px dashed #3D4A52', 
                borderRadius: '8px', 
                padding: '16px', 
                marginBottom: '24px',
                width: '100%',
                textAlign: 'center'
              }}>
                <p className="mono-text" style={{ margin: 0, color: '#A0AAB2', fontSize: '13px', lineHeight: '1.6' }}>
                  <span style={{ color: '#00CFCF', fontWeight: 'bold' }}>{"// OBJECTIVE SUMMARY"}</span><br/><br/>
                  Passionate and detail-oriented computer science student seeking to leverage rigorous academic background, problem-solving skills, and software development experiences to build impactful technology solutions and engage in challenging technical roles.
                </p>
              </div>

            </div>

            {/* All Buttons Stacked at the bottom using a responsive grid */}
            <div style={{ 
              width: '100%', 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
              gap: '16px', 
              marginTop: '8px' 
            }}>
               {[...navButtonsLeft, ...navButtonsRight].map(btn => (
                 <NavButton key={btn.section} btn={btn} onSelect={onSelect} selectedModal={selectedModal} />
               ))}
            </div>

          </div>

          {/* Bottom Bar: Voting Count Only */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: '16px', zIndex: 1 }}>
            <div className="pixel-text" style={{ color: '#E0E0E0', fontSize: '16px' }}>
              Voting: <span style={{ color: '#00CFCF' }}>6</span>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* 3D Circular Voting Table Graphic exactly like the game at the bottom of the screen */}
      <div style={{
        marginTop: '-30px', /* slight overlap to look like it's in front of TV */
        width: '600px',
        maxWidth: '90vw',
        height: '100px',
        background: '#1A4D5C', /* Base teal table color */
        borderRadius: '50% 50% 0 0',
        borderTop: '6px solid #256173',
        position: 'relative',
        zIndex: 5,
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '20px'
      }}>
        {/* The Red Emergency Meeting Button on the table */}
        <div style={{
          width: '180px',
          height: '40px',
          background: '#C51111',
          borderRadius: '50%',
          border: '4px solid #820808',
          boxShadow: '0 8px 0 rgba(0,0,0,0.5), inset 0 2px 5px rgba(255,255,255,0.4)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
           <div style={{ width: '130px', height: '20px', background: '#FF4444', borderRadius: '50%' }} />
        </div>
      </div>
      
    </section>
  );
}

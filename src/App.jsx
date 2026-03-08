import { useState, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import SpaceBackground from './components/SpaceBackground';
import VCROverlay from './components/VCROverlay';
import NavigationHub from './components/NavigationHub';
import AboutModal from './components/AboutModal';
import SkillsModal from './components/SkillsModal';
import ProjectsModal from './components/ProjectsModal';
import ExperienceModal from './components/ExperienceModal';
import AchievementsModal from './components/AchievementsModal';
import ContactModal from './components/ContactModal';
import IntroSequence from './components/IntroSequence';

function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [showIntro, setShowIntro] = useState(true);

  const renderModal = () => {
    switch (activeModal) {
      case 'about':
        return <AboutModal onClose={() => setActiveModal(null)} />;
      case 'skills':
        return <SkillsModal onClose={() => setActiveModal(null)} />;
      case 'projects':
        return <ProjectsModal onClose={() => setActiveModal(null)} />;
      case 'experience':
        return <ExperienceModal onClose={() => setActiveModal(null)} />;
      case 'achievements':
        return <AchievementsModal onClose={() => setActiveModal(null)} />;
      case 'contact':
        return <ContactModal onClose={() => setActiveModal(null)} />;
      default:
        return null;
    }
  };

  return (
    <>
      <VCROverlay />
      <SpaceBackground />
      
      <main style={{ position: 'relative', minHeight: '100vh', zIndex: 10 }}>
        
        {/* Main Hub Navigation */}
        <NavigationHub onSelect={setActiveModal} selectedModal={activeModal} />

        {/* Global Floating Report Button */}
        <div style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 100 }}>
          <button
            onClick={() => setActiveModal('contact')}
            className="report-btn"
          >
            REPORT
          </button>
        </div>

        {/* Modals Container */}
        <AnimatePresence>
          {activeModal && renderModal()}
        </AnimatePresence>

        {/* Intro Sequence Overlay */}
        <AnimatePresence>
          {showIntro && <IntroSequence onComplete={() => setShowIntro(false)} />}
        </AnimatePresence>
        
      </main>
    </>
  );
}

export default App;

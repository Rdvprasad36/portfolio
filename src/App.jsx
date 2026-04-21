

import { lazy, Suspense, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SpaceBackground from './components/SpaceBackground';
import VCROverlay from './components/VCROverlay';
import Navbar from './components/Navbar';
import Intro from './components/Intro';


// Lazy load pages for better performance and route isolation
const Overview = lazy(() => import('./components/NavigationHub'));
const Experience = lazy(() => import('./pages/Experience'));
const Skills = lazy(() => import('./pages/Skills'));
const Projects = lazy(() => import('./pages/Projects'));
const Achievements = lazy(() => import('./pages/Achievements'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  const location = useLocation();
  const [introShown, setIntroShown] = useState(true);

  const handleIntroEnd = () => {
    setIntroShown(false);
  };

  if (introShown) {
    return <Intro onComplete={handleIntroEnd} />;
  }

  return (
    <>


      
      <main style={{ position: 'relative', minHeight: '100vh', zIndex: 10, paddingTop: '70px' }}>
        <Navbar />
        
<Suspense fallback={null}>

          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Overview />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </AnimatePresence>
        </Suspense>

        { /* Global Floating Report Button */ }
        <div style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 100 }}>
          <button
            onClick={() => window.location.href = '/contact'}
            className="report-btn"
          >
            REPORT
          </button>
        </div>
      </main>
    </>
  );
}

export default App;


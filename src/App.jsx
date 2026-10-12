import React, { useState } from 'react';
import Navbar, { LIVERIES } from './components/Navbar';
import HeroSection from './components/HeroSection';
import SpeedometerHUD from './components/SpeedometerHUD';
import SpecsSection from './components/SpecsSection';
import Footer from './components/Footer';

export default function App() {
  const [currentLivery, setCurrentLivery] = useState(LIVERIES[0]);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  return (
    <div className="w-full min-h-screen bg-asphalt-950 text-white selection:bg-cyber-lime selection:text-black font-sans">
      <Navbar
        currentLivery={currentLivery}
        setCurrentLivery={setCurrentLivery}
        currentSpeed={currentSpeed}
      />
      <main className="w-full">
        <HeroSection
          currentLivery={currentLivery}
          onSpeedUpdate={setCurrentSpeed}
          onProgressUpdate={setScrollProgress}
        />
        <SpeedometerHUD
          speed={currentSpeed}
          progress={scrollProgress}
        />
        <SpecsSection
          currentLivery={currentLivery}
          setCurrentLivery={setCurrentLivery}
        />
      </main>
      <Footer />
    </div>
  );
}

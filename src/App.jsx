import React, { useState } from 'react';
import Navbar, { LIVERIES } from './components/Navbar';
import HeroSection from './components/HeroSection';
import SpeedometerHUD from './components/SpeedometerHUD';
import SpecsSection from './components/SpecsSection';
import ArchitectureInfo from './components/ArchitectureInfo';
import Footer from './components/Footer';

export default function App() {
  const [currentLivery, setCurrentLivery] = useState(LIVERIES[0]);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  return (
    <div className="w-full min-h-screen bg-asphalt-950 text-white selection:bg-cyber-lime selection:text-black font-sans">
      {/* Top Header / Navigation */}
      <Navbar
        currentLivery={currentLivery}
        setCurrentLivery={setCurrentLivery}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        currentSpeed={currentSpeed}
        scrollProgress={scrollProgress}
      />

      {/* Hero Section: Scroll-Driven Animation (Mandatory Requirements 1, 2, 3, 4) */}
      <main className="w-full">
        <HeroSection
          currentLivery={currentLivery}
          onSpeedUpdate={setCurrentSpeed}
          onProgressUpdate={setScrollProgress}
        />

        {/* Live Telemetry Matrix HUD */}
        <SpeedometerHUD
          speed={currentSpeed}
          progress={scrollProgress}
        />

        {/* Hypercar Performance Specs & Livery Studio */}
        <SpecsSection
          currentLivery={currentLivery}
          setCurrentLivery={setCurrentLivery}
        />

        {/* Architecture & Engineering Technical Compliance */}
        <ArchitectureInfo />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

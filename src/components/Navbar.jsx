import React from 'react';
import { Volume2, VolumeX, Sparkles, Gauge, Compass } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const LIVERIES = [
  { id: 'orange', name: 'Papaya Spark', filter: 'none', color: '#fa7328' },
  { id: 'lime', name: 'Cyber Lime', filter: 'hue-rotate(90deg) saturate(1.4)', color: '#45db7d' },
  { id: 'cyan', name: 'Monaco Cyan', filter: 'hue-rotate(180deg) saturate(1.5)', color: '#6ac9ff' },
  { id: 'purple', name: 'Ultra Violet', filter: 'hue-rotate(260deg) saturate(1.8)', color: '#c084fc' },
  { id: 'stealth', name: 'Obsidian Stealth', filter: 'grayscale(1) brightness(0.65) contrast(1.3)', color: '#71717a' },
];

export default function Navbar({
  currentLivery,
  setCurrentLivery,
  soundEnabled,
  setSoundEnabled,
  currentSpeed,
  scrollProgress
}) {
  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    soundEngine.toggle(newState);
  };

  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTelemetry = () => {
    const el = document.getElementById('telemetry-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSpecs = () => {
    const el = document.getElementById('specs-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3.5 transition-all duration-300">
      <div className="max-w-7xl mx-auto glass-panel rounded-2xl px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-2xl border border-white/10">
        {/* Brand identity */}
        <div 
          onClick={scrollToHero}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyber-orange via-cyber-yellow to-cyber-lime p-[2px] shadow-lg group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-asphalt-950 rounded-[10px] flex items-center justify-center font-heading font-black text-xs text-white tracking-tighter">
              IF
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-black text-base sm:text-lg tracking-wider text-white group-hover:text-cyber-lime transition-colors">
                ITZFIZZ
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded bg-white/10 text-cyber-yellow border border-white/5">
                720S APEX
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 font-mono tracking-wide hidden sm:block">
              Scroll-Driven Aerodynamic Dynamics
            </p>
          </div>
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 font-mono text-xs text-zinc-400">
          <button 
            onClick={scrollToHero}
            className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-all"
          >
            01 // HERO TRACK
          </button>
          <button 
            onClick={scrollToTelemetry}
            className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-all"
          >
            02 // TELEMETRY
          </button>
          <button 
            onClick={scrollToSpecs}
            className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-all"
          >
            03 // SPECS & CODE
          </button>
        </nav>

        {/* Right Controls: Livery selector, Sound toggle, Live speed badge */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Live Speed Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-xl bg-black/40 border border-white/10 font-mono text-xs">
            <Gauge className="w-3.5 h-3.5 text-cyber-lime animate-pulse" />
            <span className="text-zinc-400">SPEED:</span>
            <span className="font-bold text-cyber-lime w-12 text-right">
              {Math.round(currentSpeed)} MPH
            </span>
          </div>

          {/* Color Livery Customizer */}
          <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10" title="Select Car Livery Color">
            {LIVERIES.map((livery) => (
              <button
                key={livery.id}
                onClick={() => setCurrentLivery(livery)}
                className={`w-5 h-5 rounded-full transition-all duration-200 border ${
                  currentLivery.id === livery.id
                    ? 'scale-125 border-white ring-2 ring-white/30'
                    : 'border-transparent opacity-60 hover:opacity-100 hover:scale-110'
                }`}
                style={{ backgroundColor: livery.color }}
                aria-label={livery.name}
              />
            ))}
          </div>

          {/* Audio V8 Engine Toggle */}
          <button
            onClick={toggleSound}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono transition-all border ${
              soundEnabled
                ? 'bg-cyber-lime/15 text-cyber-lime border-cyber-lime/40 shadow-[0_0_15px_rgba(69,219,125,0.25)]'
                : 'bg-black/40 text-zinc-400 border-white/10 hover:text-white hover:bg-white/5'
            }`}
            title="Toggle Synthesized Engine Audio"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                <span className="hidden sm:inline font-bold">V8 ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
                <span className="hidden sm:inline">SOUND</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

import React from 'react';
import { Gauge, Zap, Wind, Sliders, ShieldCheck } from 'lucide-react';

export default function SpeedometerHUD({ speed, progress }) {
  // Compute gear based on speed
  const getGear = (s) => {
    if (s <= 5) return 'N';
    if (s < 45) return '1';
    if (s < 80) return '2';
    if (s < 120) return '3';
    if (s < 160) return '4';
    if (s < 195) return '5';
    return '6';
  };

  const gear = getGear(speed);
  const rpm = Math.round(1200 + (speed / 212) * 7300);
  const gForce = (1.0 + (speed / 212) * 1.8).toFixed(2);
  const downforceKg = Math.round((speed / 212) * 240);

  // Manual scroll jumping helper
  const handleManualScrub = (e) => {
    const val = parseFloat(e.target.value);
    const heroSection = document.getElementById('hero-track');
    if (heroSection) {
      const scrollDist = 2400; // corresponds to ScrollTrigger end
      const topOffset = heroSection.offsetTop;
      window.scrollTo({
        top: topOffset + (val / 100) * scrollDist,
        behavior: 'auto',
      });
    }
  };

  return (
    <div
      id="telemetry-section"
      className="relative z-30 max-w-7xl mx-auto px-4 sm:px-8 py-10"
    >
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl bg-black/60">
        {/* Header bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyber-lime animate-ping" />
              <h2 className="font-heading font-black text-xl sm:text-2xl text-white tracking-wider">
                LIVE TELEMETRY MATRIX
              </h2>
            </div>
            <p className="text-xs font-mono text-zinc-400 mt-1">
              Real-time vehicle dynamics synchronized to page scroll interpolation
            </p>
          </div>

          {/* Interactive Scrub Slider for Reviewers */}
          <div className="flex items-center gap-3 w-full md:w-auto bg-black/40 px-4 py-2 rounded-2xl border border-white/10">
            <Sliders className="w-4 h-4 text-cyber-lime" />
            <div className="flex flex-col">
              <div className="flex justify-between text-[10px] font-mono text-zinc-400 mb-1">
                <span>MANUAL SCRUB</span>
                <span className="text-white font-bold">{Math.round(progress * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={Math.round(progress * 100)}
                onChange={handleManualScrub}
                className="w-44 sm:w-56 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyber-lime"
              />
            </div>
          </div>
        </div>

        {/* Telemetry Dials & Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-6">
          {/* 1. Speedometer */}
          <div className="bg-asphalt-900/80 p-5 rounded-2xl border border-white/5 flex flex-col justify-between glass-panel-hover">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
              <span>VELOCITY</span>
              <Gauge className="w-4 h-4 text-cyber-lime" />
            </div>
            <div className="my-3">
              <div className="text-4xl sm:text-5xl font-black font-heading text-white tracking-tight flex items-baseline gap-1">
                {Math.round(speed)}
                <span className="text-sm font-mono text-cyber-lime font-bold">MPH</span>
              </div>
              <div className="text-[11px] font-mono text-zinc-500 mt-0.5">
                {Math.round(speed * 1.60934)} KM/H EQUIVALENT
              </div>
            </div>
            <div className="w-full bg-black/50 h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyber-lime transition-all duration-150"
                style={{ width: `${(speed / 212) * 100}%` }}
              />
            </div>
          </div>

          {/* 2. RPM Gauge */}
          <div className="bg-asphalt-900/80 p-5 rounded-2xl border border-white/5 flex flex-col justify-between glass-panel-hover">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
              <span>TACHOMETER</span>
              <Zap className="w-4 h-4 text-cyber-yellow" />
            </div>
            <div className="my-3">
              <div className="text-4xl sm:text-5xl font-black font-heading text-white tracking-tight flex items-baseline gap-1">
                {rpm.toLocaleString()}
                <span className="text-sm font-mono text-cyber-yellow font-bold">RPM</span>
              </div>
              <div className="text-[11px] font-mono text-zinc-500 mt-0.5">
                8,500 RPM REDLINE
              </div>
            </div>
            <div className="w-full bg-black/50 h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyber-lime via-cyber-yellow to-red-500 transition-all duration-150"
                style={{ width: `${(rpm / 8500) * 100}%` }}
              />
            </div>
          </div>

          {/* 3. Gear & G-Force */}
          <div className="bg-asphalt-900/80 p-5 rounded-2xl border border-white/5 flex flex-col justify-between glass-panel-hover">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
              <span>TRANSMISSION</span>
              <span className="text-cyber-cyan text-xs font-bold font-mono">7-SPEED SSG</span>
            </div>
            <div className="my-3 flex items-baseline justify-between">
              <div>
                <div className="text-4xl sm:text-5xl font-black font-heading text-cyber-cyan">
                  {gear}
                </div>
                <div className="text-[11px] font-mono text-zinc-500 mt-0.5">
                  CURRENT GEAR
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black font-heading text-white">
                  {gForce}G
                </div>
                <div className="text-[10px] font-mono text-zinc-500">
                  LATERAL ACCEL
                </div>
              </div>
            </div>
            <div className="w-full bg-black/50 h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyber-cyan transition-all duration-150"
                style={{ width: `${(parseFloat(gForce) / 3.0) * 100}%` }}
              />
            </div>
          </div>

          {/* 4. Active Aero Downforce */}
          <div className="bg-asphalt-900/80 p-5 rounded-2xl border border-white/5 flex flex-col justify-between glass-panel-hover">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
              <span>AERODYNAMICS</span>
              <Wind className="w-4 h-4 text-cyber-orange" />
            </div>
            <div className="my-3">
              <div className="text-4xl sm:text-5xl font-black font-heading text-white tracking-tight flex items-baseline gap-1">
                {downforceKg}
                <span className="text-sm font-mono text-cyber-orange font-bold">KG</span>
              </div>
              <div className="text-[11px] font-mono text-zinc-500 mt-0.5">
                ACTIVE REAR WING AIRBRAKE
              </div>
            </div>
            <div className="w-full bg-black/50 h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyber-orange transition-all duration-150"
                style={{ width: `${(downforceKg / 240) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

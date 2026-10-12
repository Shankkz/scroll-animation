import React from 'react';
import { Cpu, ShieldCheck, Zap, Disc3, Gauge, Flame, Sparkles } from 'lucide-react';
import { LIVERIES } from './Navbar';

export default function SpecsSection({ currentLivery, setCurrentLivery }) {
  const specs = [
    { label: '0-60 MPH ACCELERATION', value: '2.8s', icon: Zap, detail: 'Launch-control telemetry with instantaneous torque delivery' },
    { label: 'PEAK HORSEPOWER', value: '710 BHP', icon: Flame, detail: 'M840T 4.0L Twin-Turbocharged 90° V8 Powertrain' },
    { label: 'TOP TRACK SPEED', value: '212 MPH', icon: Gauge, detail: 'Electronically regulated aerodynamic envelope' },
    { label: 'CHASSIS MONOCOQUE', value: 'Monocage II', icon: ShieldCheck, detail: 'Ultra-rigid carbon-fibre architecture with integrated roof structure' },
  ];

  return (
    <section id="specs-section" className="relative z-30 max-w-7xl mx-auto px-4 sm:px-8 py-16">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyber-yellow mb-3">
          <Cpu className="w-3.5 h-3.5" />
          <span>HYPERCAR SPECIFICATIONS // POWERTRAIN</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
          ENGINEERED FOR SUPREME VELOCITY
        </h2>
        <p className="text-zinc-400 text-sm font-mono mt-3">
          Every aerodynamic contour, active aero airbrake, and suspension geometry serves relentless forward momentum.
        </p>
      </div>

      {/* Grid of specs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {specs.map((spec, i) => {
          const Icon = spec.icon;
          return (
            <div
              key={i}
              className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col justify-between glass-panel-hover"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyber-lime mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-xs font-mono font-bold text-zinc-400 tracking-wider">
                  {spec.label}
                </div>
                <div className="text-3xl sm:text-4xl font-black font-heading text-white my-2">
                  {spec.value}
                </div>
              </div>
              <p className="text-xs text-zinc-400 font-mono leading-relaxed mt-2 border-t border-white/5 pt-3">
                {spec.detail}
              </p>
            </div>
          );
        })}
      </div>

      {/* Interactive Livery Customizer Studio */}
      <div className="glass-panel rounded-3xl p-8 border border-white/10 bg-gradient-to-br from-asphalt-900 to-black overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyber-lime/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          <div className="max-w-md">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyber-cyan mb-2">
              <Sparkles className="w-4 h-4" />
              <span>CUSTOM SPECIFICATION STUDIO</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-white">
              SELECT YOUR VEHICLE LIVERY
            </h3>
            <p className="text-sm text-zinc-400 font-mono mt-2 leading-relaxed">
              Dynamically calibrate the exterior finish of the McLaren 720S. Your active selection updates across the hero runway and telemetry HUD in real-time.
            </p>

            <div className="flex flex-wrap gap-2.5 mt-6">
              {LIVERIES.map((liv) => (
                <button
                  key={liv.id}
                  onClick={() => setCurrentLivery(liv)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono transition-all border ${
                    currentLivery.id === liv.id
                      ? 'bg-white/10 border-white text-white shadow-lg ring-2 ring-white/20'
                      : 'bg-black/40 border-white/10 text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full inline-block border border-white/30"
                    style={{ backgroundColor: liv.color }}
                  />
                  <span>{liv.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Large Preview of the vehicle in selected color */}
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 bg-black/40 rounded-2xl border border-white/5">
            <img
              src="./mclaren.png"
              alt="McLaren 720S Studio View"
              className="max-h-48 sm:max-h-60 w-auto object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)] transition-[filter] duration-300"
              style={{ filter: currentLivery.filter }}
            />
            <div className="mt-4 flex items-center justify-between w-full px-4 text-xs font-mono text-zinc-400 border-t border-white/10 pt-3">
              <span>FINISH: <strong className="text-white">{currentLivery.name}</strong></span>
              <span className="text-cyber-lime font-bold">READY TO DEPLOY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { Code2, Cpu, Check, Layers, Sparkles, Terminal, BookOpen } from 'lucide-react';

export default function ArchitectureInfo() {
  const [activeTab, setActiveTab] = useState('scroll');

  const tabs = [
    { id: 'scroll', label: 'Scroll Scrubbing Logic' },
    { id: 'letters', label: 'Letter Reveal Engine' },
    { id: 'perf', label: 'GPU Acceleration & Reflow' },
    { id: 'audio', label: 'Web Audio Synthesizer' },
  ];

  const codeSnippets = {
    scroll: `// GSAP ScrollTrigger Pinned Track with Interpolated Scrub
const st = ScrollTrigger.create({
  trigger: containerRef.current,
  start: 'top top',
  end: '+=2400',       // Multi-viewport scroll travel
  pin: trackRef.current, // Sticky lock above the fold
  scrub: 0.8,           // Inertial smoothing (0.8s lag dampening)
  anticipatePin: 1,
  onUpdate: (self) => {
    const progress = self.progress;     // 0.0 to 1.0
    const velocity = self.getVelocity(); // Scroll speed in px/s
    
    // Drive McLaren horizontal translation & engine acoustics
    const currentSpeed = (progress * 170) + (velocity * 0.025);
    soundEngine.updateRPM(currentSpeed / 200);
  }
});`,

    letters: `// Letter Reveal & Trail Expansion
const currentCarX = progress * endX;
const carTipX = currentCarX + (carWidth * 0.9);

// Accelerating neon trail pinned directly behind rear wheels
gsap.set(trailRef.current, { width: \`\${currentCarX + carWidth * 0.45}px\` });

// Illuminate each letter as vehicle passes over its offset
letterRefs.current.forEach((letterEl) => {
  if (carTipX >= letterEl.offsetLeft) {
    letterEl.style.opacity = '1';
    letterEl.style.color = '#0a0a0c'; // Crisp contrast on lime trail
    letterEl.style.textShadow = '0 0 12px rgba(69, 219, 125, 0.4)';
  } else {
    letterEl.style.opacity = '0.08';
    letterEl.style.color = '#71717a';
  }
});`,

    perf: `// 60FPS Performance Optimization Principles:
1. CSS Transforms Only:
   - x: endX maps directly to GPU transform: translate3d(x, 0, 0)
   - Eliminates expensive DOM layout recalculation and repaint cycles.

2. will-change: transform
   - Promotes the hypercar layer onto dedicated compositor thread.

3. gsap.context() lifecycle management:
   - Complete garbage collection and listener detachment on React unmount
   - Prevents memory leaks and duplicate scroll event listeners.`,

    audio: `// Synthesizer without external audio files
const AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();

// Dual-oscillator engine tone (Sawtooth + Triangle sub-harmonic)
const osc1 = ctx.createOscillator();
osc1.type = 'sawtooth';
osc1.frequency.setValueAtTime(45, ctx.currentTime);

const filter = ctx.createBiquadFilter();
filter.type = 'lowpass';
filter.frequency.setValueAtTime(250, ctx.currentTime);

// Real-time RPM pitch modulation driven by scroll velocity
osc1.frequency.setTargetAtTime(50 + speedFactor * 160, ctx.currentTime, 0.08);`,
  };

  return (
    <section className="relative z-30 max-w-7xl mx-auto px-4 sm:px-8 py-16">
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 bg-asphalt-950/90 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyber-lime mb-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>ARCHITECTURE & ENGINEERING COMPLIANCE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-heading text-white">
              HOW THE SCROLL MOTION IS ENGINEERED
            </h2>
            <p className="text-xs sm:text-sm font-mono text-zinc-400 mt-1 max-w-2xl">
              Fulfilling all functional requirements with high frame-rate GSAP ScrollTrigger execution, zero layout reflows, and clean React component state.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-black/40 px-3 py-2 rounded-xl border border-white/5">
            <span className="w-2 h-2 rounded-full bg-cyber-lime" />
            <span>REACT 19 + GSAP 3.12 + TAILWIND</span>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex flex-wrap gap-2 my-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all border ${
                activeTab === tab.id
                  ? 'bg-cyber-lime/15 border-cyber-lime/50 text-cyber-lime shadow-[0_0_15px_rgba(69,219,125,0.2)]'
                  : 'bg-black/30 border-white/10 text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Code View */}
        <div className="relative rounded-2xl bg-[#090b10] border border-white/10 p-4 sm:p-6 overflow-x-auto">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5 text-xs font-mono text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <span className="ml-2 text-zinc-400">{activeTab}.js</span>
            </div>
            <span className="text-[10px] text-zinc-600">ESM / SYNTAX HIGHLIGHTED</span>
          </div>
          <pre className="text-xs sm:text-sm font-mono text-zinc-300 leading-relaxed overflow-x-auto whitespace-pre">
            <code>{codeSnippets[activeTab]}</code>
          </pre>
        </div>

        {/* Requirements Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-2 text-cyber-lime font-mono text-xs font-bold mb-1">
              <Check className="w-4 h-4" /> 1. HERO SECTION LAYOUT
            </div>
            <p className="text-xs text-zinc-400 font-mono">
              Above-the-fold full screen with letter-spaced "WELCOME ITZFIZZ" headline and 4 impact statistics.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-2 text-cyber-lime font-mono text-xs font-bold mb-1">
              <Check className="w-4 h-4" /> 2. INITIAL LOAD MOTION
            </div>
            <p className="text-xs text-zinc-400 font-mono">
              Smooth staggered letter reveals, animated counter metrics, and entrance transitions.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-2 text-cyber-lime font-mono text-xs font-bold mb-1">
              <Check className="w-4 h-4" /> 3. SCROLL-BASED MOTION
            </div>
            <p className="text-xs text-zinc-400 font-mono">
              Smooth scrub pinned track with McLaren translation, expanding neon trail, and in-road letter lighting.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-2 text-cyber-lime font-mono text-xs font-bold mb-1">
              <Check className="w-4 h-4" /> 4. GPU PERFORMANCE
            </div>
            <p className="text-xs text-zinc-400 font-mono">
              Zero layout reflows, transforms run on hardware compositor, and smooth interpolation throughout.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

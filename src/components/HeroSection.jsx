import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ArrowRight, Activity, CheckCircle2, Zap } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

gsap.registerPlugin(ScrollTrigger);

// The letters for the runway & headline
const HEADLINE_LETTERS = [
  'W', 'E', 'L', 'C', 'O', 'M', 'E',
  ' ',
  'I', 'T', 'Z', 'F', 'I', 'Z', 'Z'
];

// Impact Metrics / Statistics configuration
const METRIC_CARDS = [
  {
    id: 'box1',
    value: 58,
    unit: '%',
    title: 'Increase in pick up point use',
    subtitle: 'Automated locker & hub routing',
    bg: 'bg-[#def54f]',
    textColor: 'text-neutral-950',
    badge: 'STAGE 01',
    triggerPoint: 0.28,
    tier: 'upper',
  },
  {
    id: 'box2',
    value: 23,
    unit: '%',
    title: 'Decreased in customer phone calls',
    subtitle: 'Real-time telemetry tracking',
    bg: 'bg-[#6ac9ff]',
    textColor: 'text-neutral-950',
    badge: 'STAGE 02',
    triggerPoint: 0.50,
    tier: 'lower',
  },
  {
    id: 'box3',
    value: 27,
    unit: '%',
    title: 'Increase in pick up point use',
    subtitle: 'Fleet turnaround acceleration',
    bg: 'bg-[#2b2d35]',
    textColor: 'text-white border border-white/20',
    badge: 'STAGE 03',
    triggerPoint: 0.74,
    tier: 'upper',
  },
  {
    id: 'box4',
    value: 40,
    unit: '%',
    title: 'Decreased in customer phone calls',
    subtitle: 'Predictive delivery dispatch',
    bg: 'bg-[#fa7328]',
    textColor: 'text-neutral-950',
    badge: 'STAGE 04',
    triggerPoint: 0.94,
    tier: 'lower',
  },
];

export default function HeroSection({
  currentLivery,
  onSpeedUpdate,
  onProgressUpdate,
}) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const roadRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const letterRefs = useRef([]);
  const headlineLettersRef = useRef([]);
  const cardRefs = useRef([]);
  const numberRefs = useRef([]);

  const [activeCardIndex, setActiveCardIndex] = useState(-1);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    // -----------------------------------------------------------------
    // 1. Initial Load Animations (Requirement 2)
    // -----------------------------------------------------------------
    const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Headline letter staggered entrance
    introTl.fromTo(
      headlineLettersRef.current.filter(Boolean),
      { y: 25, opacity: 0, scale: 0.85 },
      { y: 0, opacity: 1, scale: 1, stagger: 0.03, duration: 0.7, delay: 0.1 }
    );

    // Initial load for metric cards: animate in one by one with subtle delay
    introTl.fromTo(
      cardRefs.current.filter(Boolean),
      { y: 20, opacity: 0, scale: 0.94 },
      { y: 0, opacity: 0.8, scale: 1, stagger: 0.12, duration: 0.6 },
      '-=0.3'
    );

    // Number counting animation on initial load
    METRIC_CARDS.forEach((card, idx) => {
      const numEl = numberRefs.current[idx];
      if (numEl) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: card.value,
          duration: 1.5,
          delay: 0.35 + idx * 0.1,
          ease: 'power2.out',
          onUpdate: () => {
            numEl.innerText = `${Math.round(obj.val)}%`;
          },
        });
      }
    });

    // Car entrance slide
    introTl.fromTo(
      carRef.current,
      { x: -160, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'expo.out' },
      '-=0.7'
    );

    // -----------------------------------------------------------------
    // 2. Scroll-Driven Core Animation (Requirement 3 & 4)
    // -----------------------------------------------------------------
    let ctx = gsap.context(() => {
      const road = roadRef.current;
      const car = carRef.current;
      const trail = trailRef.current;
      if (!road || !car || !trail) return;

      const roadWidth = road.offsetWidth;
      const carWidth = car.offsetWidth || 180;
      const endX = roadWidth - carWidth;

      // ScrollTrigger instance pinning the hero section
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=2400',
        pin: trackRef.current,
        scrub: 0.8, // Buttery smooth interpolation / easing
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const velocity = Math.abs(self.getVelocity() || 0);

          setScrollPct(Math.round(progress * 100));
          if (onProgressUpdate) onProgressUpdate(progress);

          // Calculate current vehicle speed based on velocity + progress
          const calculatedSpeed = Math.min(212, Math.max(0, (progress * 170) + (velocity * 0.025)));
          if (onSpeedUpdate) onSpeedUpdate(calculatedSpeed);
          soundEngine.updateRPM(Math.min(1, (calculatedSpeed / 200) + (velocity * 0.0008)));

          // Current car center X position
          const currentCarX = progress * endX;
          const carTipX = currentCarX + (carWidth * 0.85);

          // Update trail width behind car rear wheels
          gsap.set(trail, { width: `${currentCarX + carWidth * 0.4}px` });

          // Letter reveal logic: as car sweeps over letter, ignite it to solid black!
          letterRefs.current.forEach((letterEl) => {
            if (!letterEl) return;
            const letterLeft = letterEl.offsetLeft;
            if (carTipX >= letterLeft) {
              letterEl.style.opacity = '1';
              letterEl.style.color = '#111317';
            } else {
              letterEl.style.opacity = '0.08';
              letterEl.style.color = '#71717a';
            }
          });

          // Metric card activation checkpoints based on scroll position
          let currentActive = -1;
          METRIC_CARDS.forEach((card, idx) => {
            if (progress >= card.triggerPoint - 0.12 && progress <= card.triggerPoint + 0.16) {
              currentActive = idx;
            }
          });
          setActiveCardIndex(currentActive);
        },
      });

      // Animate the car position tied strictly to scroll scrub
      gsap.to(car, {
        x: endX,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=2400',
          scrub: 0.8,
        },
      });
    }, containerRef);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  // Helper to render card
  const renderCard = (card, idx) => {
    const isActive = activeCardIndex === idx;
    return (
      <div
        key={card.id}
        id={card.id}
        ref={(el) => (cardRefs.current[idx] = el)}
        className={`p-3.5 sm:p-4 rounded-2xl ${card.bg} ${card.textColor} shadow-2xl transition-all duration-300 transform ${
          isActive
            ? 'scale-105 opacity-100 ring-4 ring-white shadow-[0_0_30px_rgba(255,255,255,0.45)] z-30'
            : 'opacity-80 hover:opacity-100 hover:scale-102'
        }`}
        style={{ width: '250px' }}
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-black/10">
            {card.badge}
          </span>
          {isActive && (
            <span className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase animate-pulse">
              <CheckCircle2 className="w-3.5 h-3.5 text-black" />
              ACTIVE
            </span>
          )}
        </div>

        <div className="flex items-baseline gap-1 my-0.5">
          <span
            ref={(el) => (numberRefs.current[idx] = el)}
            className="font-heading font-black text-3xl sm:text-4xl leading-none"
          >
            {card.value}%
          </span>
        </div>

        <p className="font-bold text-xs leading-tight mt-1">
          {card.title}
        </p>
        <p className="text-[10px] opacity-75 font-mono mt-0.5">
          {card.subtitle}
        </p>
      </div>
    );
  };

  return (
    <section
      ref={containerRef}
      id="hero-track"
      className="relative w-full bg-asphalt-950 selection:bg-cyber-lime selection:text-black"
    >
      {/* Sticky Fullscreen Track Container (Pinned) */}
      <div
        ref={trackRef}
        className="w-full h-screen min-h-[680px] flex flex-col justify-between pt-16 sm:pt-20 pb-3 relative overflow-hidden bg-carbon"
      >
        {/* Subtle Background Lighting & Grid Accents */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none" />
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[350px] bg-gradient-to-r from-cyber-lime/10 via-transparent to-cyber-cyan/10 blur-3xl pointer-events-none" />

        {/* ------------------------------------------------------------- */}
        {/* TIER 1: TOP LETTER-SPACED HEADLINE (Requirement 1 & 2)        */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-8 text-center shrink-0">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-zinc-400 mb-1.5 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyber-lime animate-ping" />
            <span>AERODYNAMIC TELEMETRY // SCROLL-DRIVEN MOTION</span>
          </div>

          <h1
            className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-heading tracking-[0.25em] sm:tracking-[0.38em] text-white flex justify-center items-center flex-wrap uppercase select-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
            aria-label="WELCOME ITZFIZZ"
          >
            {HEADLINE_LETTERS.map((char, i) => (
              <span
                key={i}
                ref={(el) => (headlineLettersRef.current[i] = el)}
                className={`inline-block transition-transform hover:text-cyber-lime hover:-translate-y-0.5 ${
                  char === ' ' ? 'w-3 sm:w-6' : ''
                }`}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          <p className="text-[11px] sm:text-xs font-mono text-zinc-400 mt-1 max-w-xl mx-auto tracking-wide">
            Scroll down to launch the McLaren 720S along the telemetry track and unlock real-time impact metrics.
          </p>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TIER 2: UPPER METRIC CARDS (Box 1: 58% & Box 3: 27%)          */}
        {/* Sits comfortably above the road on desktop                    */}
        {/* ------------------------------------------------------------- */}
        <div className="hidden lg:flex relative z-20 max-w-7xl mx-auto w-full px-8 justify-end gap-8 shrink-0">
          {renderCard(METRIC_CARDS[0], 0)}
          {renderCard(METRIC_CARDS[2], 2)}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TIER 3: THE RUNWAY ROAD, IN-ROAD LETTERS & MCLAREN 720S       */}
        {/* ------------------------------------------------------------- */}
        <div className="relative w-full my-auto z-10 flex flex-col justify-center shrink-0">
          {/* Road Curb Borders */}
          <div className="w-full h-1.5 bg-gradient-to-r from-red-600 via-white to-red-600 opacity-70" />

          {/* Road Surface */}
          <div
            ref={roadRef}
            id="road"
            className="w-full h-[170px] sm:h-[190px] md:h-[210px] road-surface relative overflow-hidden flex items-center shadow-2xl border-y border-white/10"
          >
            {/* Center Dashed Lane Divider */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] border-b-2 border-dashed border-white/20 pointer-events-none z-0" />

            {/* Solid vibrant green trail behind the car (z-10) */}
            <div
              ref={trailRef}
              id="trail"
              className="absolute left-0 top-0 bottom-0 bg-[#45db7d] z-10 transition-none shadow-[0_0_25px_rgba(69,219,125,0.6)]"
              style={{ width: 0 }}
            />

            {/* In-Road Lettering: "W E L C O M E   I T Z F I Z Z" (z-30: ON TOP OF TRAIL) */}
            <div
              className="absolute left-[3%] z-30 flex items-center gap-1.5 sm:gap-3 md:gap-4 select-none pointer-events-none"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
              {HEADLINE_LETTERS.map((char, index) => (
                <span
                  key={index}
                  ref={(el) => (letterRefs.current[index] = el)}
                  className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-heading transition-all duration-200 ${
                    char === ' ' ? 'w-3 sm:w-6 md:w-8' : ''
                  }`}
                  style={{ opacity: 0.08, color: '#71717a' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </div>

            {/* The McLaren 720S Hypercar (z-40) */}
            <div
              ref={carRef}
              id="car"
              className="absolute left-0 top-0 bottom-0 z-40 flex items-center pointer-events-none will-change-transform"
              style={{ height: '100%' }}
            >
              {/* Headlights beam projection forward */}
              <div
                className="absolute left-[85%] top-1/2 -translate-y-1/2 w-[200px] sm:w-[280px] md:w-[360px] h-[120px] sm:h-[160px] headlight-beam pointer-events-none opacity-80"
              />

              {/* McLaren 720S Top-View Image */}
              <img
                src="./mclaren.png"
                alt="McLaren 720S Top View"
                className="h-[130px] sm:h-[160px] md:h-[180px] w-auto object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.95)] transition-[filter] duration-300"
                style={{ filter: currentLivery.filter }}
              />

              {/* Rear exhaust thrust flame glow */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-cyber-lime blur-md opacity-70 animate-pulse" />
            </div>
          </div>

          {/* Road Curb Lower Border */}
          <div className="w-full h-1.5 bg-gradient-to-r from-red-600 via-white to-red-600 opacity-70" />
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TIER 4: LOWER METRIC CARDS (Box 2: 23% & Box 4: 40%)          */}
        {/* Sits comfortably below the road on desktop                    */}
        {/* ------------------------------------------------------------- */}
        <div className="hidden lg:flex relative z-20 max-w-7xl mx-auto w-full px-8 justify-end gap-8 shrink-0">
          {renderCard(METRIC_CARDS[1], 1)}
          {renderCard(METRIC_CARDS[3], 3)}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* MOBILE & TABLET METRIC CARDS CONTAINER (Compact Adaptive)     */}
        {/* ------------------------------------------------------------- */}
        <div className="lg:hidden relative z-20 px-4 grid grid-cols-2 sm:grid-cols-4 gap-2 my-1 shrink-0">
          {METRIC_CARDS.map((card, idx) => {
            const isActive = activeCardIndex === idx;
            return (
              <div
                key={`mobile-${card.id}`}
                className={`p-2 sm:p-3 rounded-xl ${card.bg} ${card.textColor} transition-all duration-300 ${
                  isActive ? 'scale-105 ring-2 ring-white shadow-lg opacity-100' : 'opacity-85'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono font-bold">{card.badge}</span>
                  <span className="font-heading font-black text-xl sm:text-2xl">{card.value}%</span>
                </div>
                <p className="text-[10px] font-bold line-clamp-1 mt-0.5">{card.title}</p>
              </div>
            );
          })}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TIER 5: BOTTOM CONTROLS & LIVE TRACK PROGRESS HUD             */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-8 pb-1 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          {/* Scroll instruction indicator */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center animate-bounce">
              <ChevronDown className="w-4 h-4 text-cyber-lime" />
            </div>
            <div>
              <p className="font-heading text-xs tracking-wider font-bold text-white flex items-center gap-1.5">
                SCROLL TO DRIVE <ArrowRight className="w-3.5 h-3.5 text-cyber-lime inline" />
              </p>
              <p className="text-[10px] font-mono text-zinc-400">
                Smooth GSAP scrub controls speed & milestone triggers
              </p>
            </div>
          </div>

          {/* Track Progress Bar HUD */}
          <div className="w-full sm:w-72 glass-panel p-2 rounded-xl border border-white/10 flex flex-col gap-1">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-zinc-400 flex items-center gap-1">
                <Activity className="w-3 h-3 text-cyber-lime" /> RUNWAY PROGRESS
              </span>
              <span className="font-bold text-cyber-lime">{scrollPct}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-black/60 overflow-hidden p-[1px]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyber-lime via-cyber-cyan to-cyber-orange transition-all duration-75"
                style={{ width: `${scrollPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

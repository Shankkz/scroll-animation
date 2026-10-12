import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ArrowRight, Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Headline characters
const HEADLINE_LETTERS = [
  'W', 'E', 'L', 'C', 'O', 'M', 'E',
  ' ',
  'I', 'T', 'Z', 'F', 'I', 'Z', 'Z'
];

// Metric cards data
const METRIC_CARDS = [
  {
    id: 'box1',
    value: '58%',
    title: 'Increase in pick up point use',
    bg: 'bg-[#def54f]',
    textColor: 'text-neutral-950',
  },
  {
    id: 'box2',
    value: '23%',
    title: 'Decreased in customer phone calls',
    bg: 'bg-[#6ac9ff]',
    textColor: 'text-neutral-950',
  },
  {
    id: 'box3',
    value: '27%',
    title: 'Increase in pick up point use',
    bg: 'bg-[#262830]',
    textColor: 'text-white border border-white/10',
  },
  {
    id: 'box4',
    value: '40%',
    title: 'Decreased in customer phone calls',
    bg: 'bg-[#fa7328]',
    textColor: 'text-neutral-950',
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
  const mobileCardRefs = useRef([]);

  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    // Initial entrance animation
    const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    introTl.fromTo(
      headlineLettersRef.current.filter(Boolean),
      { y: 25, opacity: 0, scale: 0.85 },
      { y: 0, opacity: 1, scale: 1, stagger: 0.03, duration: 0.7, delay: 0.1 }
    );

    introTl.fromTo(
      carRef.current,
      { x: -160, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'expo.out' },
      '-=0.5'
    );

    // Scroll-based animations
    const ctx = gsap.context(() => {
      const road = roadRef.current;
      const car = carRef.current;
      const trail = trailRef.current;
      if (!road || !car || !trail) return;

      const roadWidth = road.offsetWidth;
      const carWidth = car.offsetWidth || 180;
      const endX = roadWidth - carWidth;

      // Pin the section during scroll
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=2400',
        pin: trackRef.current,
        scrub: 0.8,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const velocity = Math.abs(self.getVelocity() || 0);

          setScrollPct(Math.round(progress * 100));
          if (onProgressUpdate) onProgressUpdate(progress);

          const calculatedSpeed = Math.min(212, Math.max(0, (progress * 170) + (velocity * 0.025)));
          if (onSpeedUpdate) onSpeedUpdate(calculatedSpeed);

          // Update green trail behind the car
          const currentCarX = progress * endX;
          const carTipX = currentCarX + (carWidth * 0.85);
          gsap.set(trail, { width: `${currentCarX + carWidth * 0.4}px` });

          // Light up road letters as the car drives over them
          letterRefs.current.forEach((letterEl) => {
            if (!letterEl) return;
            if (carTipX >= letterEl.offsetLeft) {
              letterEl.style.opacity = '1';
              letterEl.style.color = '#111317';
            } else {
              letterEl.style.opacity = '0.08';
              letterEl.style.color = '#71717a';
            }
          });
        },
      });

      // Move the car across the road
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

      // Fade in cards at specific scroll points
      const triggerRanges = [
        { start: 'top+=300 top', end: 'top+=550 top' },
        { start: 'top+=700 top', end: 'top+=950 top' },
        { start: 'top+=1150 top', end: 'top+=1400 top' },
        { start: 'top+=1600 top', end: 'top+=1850 top' },
      ];

      triggerRanges.forEach((range, idx) => {
        gsap.fromTo(
          [cardRefs.current[idx], mobileCardRefs.current[idx]].filter(Boolean),
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: range.start,
              end: range.end,
              scrub: true,
            },
          }
        );
      });
    }, containerRef);

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  // Card template
  const renderCard = (card, idx) => (
    <div
      key={card.id}
      id={card.id}
      ref={(el) => (cardRefs.current[idx] = el)}
      className={`p-4 sm:p-5 rounded-2xl ${card.bg} ${card.textColor} shadow-2xl transition-shadow duration-300`}
      style={{ width: '260px', opacity: 0, transform: 'translateY(20px)' }}
    >
      <div className="font-heading font-black text-4xl sm:text-5xl leading-none mb-2">
        {card.value}
      </div>
      <p className="font-bold text-xs sm:text-sm leading-snug">
        {card.title}
      </p>
    </div>
  );

  return (
    <section
      ref={containerRef}
      id="hero-track"
      className="relative w-full bg-asphalt-950 selection:bg-cyber-lime selection:text-black"
    >
      {/* Pinned track */}
      <div
        ref={trackRef}
        className="w-full h-screen min-h-[680px] flex flex-col justify-between pt-16 sm:pt-20 pb-3 relative overflow-hidden bg-carbon"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none" />
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[350px] bg-gradient-to-r from-cyber-lime/10 via-transparent to-cyber-cyan/10 blur-3xl pointer-events-none" />

        {/* Headline */}
        <div className="relative z-20 mt-5 max-w-7xl mx-auto w-full px-4 sm:px-8 text-center shrink-0">
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
                className={`inline-block transition-transform hover:text-cyber-lime hover:-translate-y-0.5 ${char === ' ' ? 'w-3 sm:w-6' : ''}`}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          <p className="text-[11px] sm:text-xs font-mono text-zinc-400 mt-3 max-w-xl mx-auto tracking-wide">
            Scroll down to launch the McLaren 720S along the telemetry track and unlock real-time impact metrics.
          </p>
        </div>

        {/* Upper cards */}
        <div className="hidden mt-5 lg:flex relative z-20 max-w-7xl mx-auto w-full px-8 justify-end gap-8 shrink-0">
          {renderCard(METRIC_CARDS[0], 0)}
          {renderCard(METRIC_CARDS[2], 2)}
        </div>

        {/* Road and car */}
        <div className="relative w-full my-auto z-10 flex flex-col justify-center shrink-0">
          <div className="w-full h-1.5 bg-gradient-to-r from-red-600 via-white to-red-600 opacity-70" />

          <div
            ref={roadRef}
            id="road"
            className="w-full h-[170px] sm:h-[190px] md:h-[210px] road-surface relative overflow-hidden flex items-center shadow-2xl border-y border-white/10"
          >
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] border-b-2 border-dashed border-white/20 pointer-events-none z-0" />

            {/* Green trail */}
            <div
              ref={trailRef}
              id="trail"
              className="absolute left-0 top-0 bottom-0 bg-[#45db7d] z-10 transition-none shadow-[0_0_25px_rgba(69,219,125,0.6)]"
              style={{ width: 0 }}
            />

            {/* Road letters */}
            <div
              className="absolute left-[3%] z-30 flex items-center gap-1.5 sm:gap-3 md:gap-4 select-none pointer-events-none"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
              {HEADLINE_LETTERS.map((char, index) => (
                <span
                  key={index}
                  ref={(el) => (letterRefs.current[index] = el)}
                  className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-heading transition-all duration-200 ${char === ' ' ? 'w-3 sm:w-6 md:w-8' : ''}`}
                  style={{ opacity: 0.08, color: '#71717a' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </div>

            {/* Car */}
            <div
              ref={carRef}
              id="car"
              className="absolute left-0 top-0 bottom-0 z-40 flex items-center pointer-events-none will-change-transform"
              style={{ height: '100%' }}
            >
              <div className="absolute left-[85%] top-1/2 -translate-y-1/2 w-[200px] sm:w-[280px] md:w-[360px] h-[120px] sm:h-[160px] headlight-beam pointer-events-none opacity-80" />

              <img
                src="./mclaren.png"
                alt="McLaren 720S Top View"
                className="h-[130px] sm:h-[160px] md:h-[180px] w-auto object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.95)] transition-[filter] duration-300"
                style={{ filter: currentLivery.filter }}
              />

              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-cyber-lime blur-md opacity-70 animate-pulse" />
            </div>
          </div>

          <div className="w-full h-1.5 bg-gradient-to-r from-red-600 via-white to-red-600 opacity-70" />
        </div>

        {/* Lower cards */}
        <div className="hidden lg:flex relative z-20 max-w-7xl mx-auto w-full px-8 justify-end gap-8 shrink-0">
          {renderCard(METRIC_CARDS[1], 1)}
          {renderCard(METRIC_CARDS[3], 3)}
        </div>

        {/* Mobile cards */}
        <div className="lg:hidden relative z-20 px-4 grid grid-cols-2 sm:grid-cols-4 gap-2 my-1 shrink-0">
          {METRIC_CARDS.map((card, idx) => (
            <div
              key={`mobile-${card.id}`}
              ref={(el) => (mobileCardRefs.current[idx] = el)}
              className={`p-2 sm:p-3 rounded-xl ${card.bg} ${card.textColor} transition-shadow duration-300`}
              style={{ opacity: 0, transform: 'translateY(15px)' }}
            >
              <div className="font-heading font-black text-xl sm:text-2xl leading-none">
                {card.value}
              </div>
              <p className="text-[10px] font-bold line-clamp-1 mt-1">{card.title}</p>
            </div>
          ))}
        </div>

        {/* Bottom progress bar */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-8 pb-1 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
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

import React from 'react';
import { ChevronUp, ExternalLink, Heart, Zap } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-30 border-t border-white/10 bg-black/90 py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-heading font-black text-lg text-white">ITZFIZZ</span>
            <span className="text-[10px] font-mono uppercase bg-cyber-lime/10 text-cyber-lime px-2 py-0.5 rounded border border-cyber-lime/30">
              SUBMISSION READY
            </span>
          </div>
          <p className="text-xs font-mono text-zinc-500 mt-1">
            Scroll-Driven Hero Section Animation Assignment • McLaren 720S Kinetic Showcase
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
          <a
            href="https://paraschaturvedi.github.io/car-scroll-animation"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <span>Reference Demo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all border border-white/10"
          >
            <span>Back to Top</span>
            <ChevronUp className="w-4 h-4 text-cyber-lime" />
          </button>
        </div>
      </div>
    </footer>
  );
}

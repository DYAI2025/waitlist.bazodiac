import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import CelestialHero from './components/CelestialHero';
import MicroExperience from './components/MicroExperience';
import WaitlistSection from './components/WaitlistSection';
import BentoGrid from './components/BentoGrid';
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';

import { useMotionValueEvent } from 'motion/react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMobileCta, setShowMobileCta] = useState(false);
  const { scrollYProgress } = useScroll();
  
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setShowMobileCta(latest > 0.1);
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen font-sans selection:bg-gold/30 scroll-smooth overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gold z-50 origin-[0%]"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 p-6 md:px-12 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-obsidian/40 backdrop-blur-md border border-white/5 p-4 rounded-2xl pointer-events-auto shadow-2xl">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center font-serif font-bold text-obsidian italic">B</div>
            <span className="text-xl font-serif italic tracking-tight text-white group-hover:text-gold transition-colors">Bazodiac</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-[10px] uppercase tracking-[0.3em] font-bold text-white/60">
            <a href="#engine-section" className="hover:text-gold transition-colors">Engine</a>
            <a href="#micro-experience" className="hover:text-gold transition-colors">Micro-Signal</a>
            <a href="#waitlist-section" className="hover:text-gold transition-colors text-gold">Waitlist</a>
            <button 
              onClick={() => document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gold text-obsidian px-5 py-2.5 rounded-lg hover:bg-gold-leaf transition-colors flex items-center gap-2"
            >
              Request Access <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <button 
            className="md:hidden p-2 text-white/60 hover:text-white pointer-events-auto"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-12 overflow-hidden bg-obsidian">
        <CelestialHero />
        
        <div className="relative z-10 text-center space-y-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 backdrop-blur-sm mb-4">
              <span className="text-[10px] font-mono tracking-[0.5em] uppercase text-gold">Bazodiac — Your Signal. Decoded.</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-serif leading-[0.9] tracking-tighter italic text-white/95 text-balance">
              Three symbolic systems.<br />One calculated <span className="text-gold text-glow-gold">timing signature</span>.
            </h1>
            
            <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto font-light leading-relaxed">
              Bazodiac verbindet westliche Astrologie, Bazi und Wu-Xing zu einer transparenten Signatur für Timing, Element und Resonanz.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <button 
              onClick={() => document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full md:w-auto bg-gold text-obsidian px-10 py-5 rounded-2xl font-bold uppercase text-xs tracking-[0.2em] shadow-[0_0_40px_rgba(212,175,55,0.1)] hover:shadow-[0_0_60px_rgba(212,175,55,0.3)] hover:bg-gold-leaf transition-all duration-500"
            >
              Request Early Access
            </button>
            <button 
                onClick={() => document.getElementById('micro-experience')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full md:w-auto text-white/60 hover:text-white flex items-center justify-center gap-3 group transition-colors px-6 py-5 rounded-2xl border border-white/5 hover:border-white/10"
            >
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/10 transition-colors">
                <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </div>
              <span className="text-xs uppercase tracking-widest font-bold">Decode a Micro-Signal</span>
            </button>
          </motion.div>
        </div>

        {/* Ambient background details */}
        <div className="absolute bottom-12 left-12 hidden lg:block opacity-20 font-mono text-[9px] uppercase tracking-widest text-white/40 space-y-1">
            <p className="">Active Nodes: 1.2e4</p>
            <p className="">System Coherence: 99.8%</p>
            <p className="">Sigil Load: Optimized</p>
        </div>
        <div className="absolute bottom-12 right-12 hidden lg:flex flex-col items-center gap-4 opacity-40">
            <div className="w-px h-24 bg-gradient-to-t from-gold to-transparent" />
            <p className="font-mono text-[10px] rotate-90 origin-bottom tracking-[0.5em] text-white">SCROLL</p>
        </div>
      </section>

      {/* Content Areas */}
      <main className="relative z-10 bg-gradient-to-b from-transparent via-obsidian/80 to-obsidian">
        <BentoGrid />
        
        <div className="py-32" id="micro-experience">
          <div className="text-center mb-16 space-y-4 px-6">
              <h2 className="text-sm font-mono uppercase tracking-[0.4em] text-gold/60">Interaktive Vorschau</h2>
              <h3 className="text-4xl md:text-5xl font-serif italic">Erlebe deine erste Signatur.</h3>
          </div>
          <MicroExperience />
        </div>

        <WaitlistSection />
      </main>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/5 relative z-10 bg-obsidian">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-serif text-gold italic text-xl border border-white/5">B</div>
                <div className="flex flex-col">
                  <span className="font-serif italic tracking-tight text-white text-lg">Bazodiac</span>
                  <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-mono">The Timing Engine</span>
                </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-[10px] uppercase tracking-widest font-bold text-white/40">
                <a href="#" className="hover:text-gold transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Ethics</a>
                <a href="#" className="hover:text-white transition-colors">Waitlist API</a>
                <a href="#" className="hover:text-white transition-colors">Legal</a>
            </div>

            <div className="flex gap-4">
               {['TW', 'IG', 'LI'].map(social => (
                 <a key={social} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[10px] hover:border-gold hover:text-gold transition-all duration-300 text-white/50">
                   {social}
                 </a>
               ))}
            </div>
        </div>
        <div className="mt-16 text-center text-[9px] font-mono text-white/20 uppercase tracking-[0.5em]">
          © 2026 Bazodiac Symbolic Systems. Designed for the Seekers.
        </div>
      </footer>

      {/* Mobile Thumb-Zone CTA */}
      <div className="fixed bottom-8 left-0 right-0 z-40 px-6 md:hidden pointer-events-none">
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ 
            y: showMobileCta ? 0 : 100, 
            opacity: showMobileCta ? 1 : 0 
          }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="pointer-events-auto"
        >
          <button 
            onClick={() => document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full bg-gold text-obsidian py-4 rounded-2xl font-bold uppercase tracking-widest text-xs shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex items-center justify-center gap-2"
          >
            Join Waitlist <ArrowUpRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-obsidian/95 backdrop-blur-3xl flex flex-col p-12 md:hidden"
          >
            <button className="absolute top-8 right-8 p-2 text-white" onClick={() => setIsMenuOpen(false)}>
              <X className="w-10 h-10" />
            </button>
            
            <div className="flex flex-col gap-12 mt-20">
              {['Engine', 'Micro-Signal', 'Waitlist'].map((item, i) => (
                <motion.a 
                  key={item}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  href={`#${item === 'Engine' ? 'engine-section' : item.toLowerCase()}`} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-5xl font-serif italic text-white/90 hover:text-gold transition-colors"
                >
                  {item}
                </motion.a>
              ))}
              <motion.button 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gold text-obsidian py-5 rounded-2xl font-bold uppercase tracking-widest text-sm mt-8 shadow-xl"
                  onClick={() => {
                     document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' });
                     setIsMenuOpen(false);
                  }}
              >
                  Request Early Access
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

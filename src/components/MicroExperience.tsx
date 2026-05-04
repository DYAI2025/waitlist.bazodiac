import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Clock, MapPin, ChevronRight, Share2 } from 'lucide-react';

type Step = 'input' | 'calculating' | 'payoff';

const ELEMENTS = [
  { name: 'Wood', color: 'text-emerald-400', desc: 'Growth, Flexibility, Altruism', sigil: '木' },
  { name: 'Fire', color: 'text-rose-400', desc: 'Passion, Dynamism, Clarity', sigil: '火' },
  { name: 'Earth', color: 'text-amber-400', desc: 'Stability, Nurturing, Reliability', sigil: '土' },
  { name: 'Metal', color: 'text-slate-200', desc: 'Precision, Strength, Integrity', sigil: '金' },
  { name: 'Water', color: 'text-sky-400', desc: 'Wisdom, Intuition, Fluidity', sigil: '水' },
];

export default function MicroExperience() {
  const [step, setStep] = useState<Step>('input');
  const [formData, setFormData] = useState({ date: '', time: '', place: '' });
  const [result, setResult] = useState<typeof ELEMENTS[0] | null>(null);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('calculating');
    
    // Simple deterministic logic based on date for the teaser
    const dateNum = new Date(formData.date).getDate() || 0;
    const element = ELEMENTS[dateNum % ELEMENTS.length];
    
    setTimeout(() => {
      setResult(element);
      setStep('payoff');
    }, 2800);
  };

  return (
    <div className="w-full max-w-xl mx-auto" id="micro-experience">
      <AnimatePresence mode="wait">
        {step === 'input' && (
          <motion.div 
            key="input"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles className="w-12 h-12" />
            </div>
            
            <h2 className="font-serif text-3xl mb-6 text-gold-leaf">Decode Your Micro-Signal</h2>
            <p className="text-white/60 mb-8 text-sm leading-relaxed">
              Before you join the inner circle, witness the engine's precision. 
              Input your origin points to reveal your dominant elemental resonance.
            </p>

            <form onSubmit={handleStart} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
                  <input 
                    required
                    type="date" 
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-12 focus:outline-none focus:border-gold/50 transition-colors text-sm"
                    placeholder="Birth Date"
                  />
                </div>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
                  <input 
                    required
                    type="time" 
                    value={formData.time}
                    onChange={e => setFormData({...formData, time: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-12 focus:outline-none focus:border-gold/50 transition-colors text-sm"
                    placeholder="Birth Time"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
                  <input 
                    required
                    type="text" 
                    value={formData.place}
                    onChange={e => setFormData({...formData, place: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-12 focus:outline-none focus:border-gold/50 transition-colors text-sm"
                    placeholder="Birth City"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full group bg-gradient-to-r from-gold/20 to-gold/10 hover:from-gold/30 hover:to-gold/20 border border-gold/30 py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-500 font-medium tracking-wide"
                id="cta-calculate"
              >
                Reveal Resonance
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        )}

        {step === 'calculating' && (
          <motion.div 
            key="calculating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="relative w-24 h-24 mb-8">
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border border-dashed border-gold/30 rounded-full"
                />
                <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-4 border border-dashed border-white/10 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-gold animate-pulse" />
                </div>
            </div>
            <div className="space-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gold/60">
                <motion.p animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }}>Synchronizing Pillars...</motion.p>
                <p className="text-white/20">Mapping Wu-Xing Coherence</p>
                <p className="text-white/20">Analyzing Timing Signature</p>
            </div>
          </motion.div>
        )}

        {step === 'payoff' && result && (
          <motion.div 
            key="payoff"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-3xl p-8 md:p-12 text-center relative"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 glass rounded-full flex items-center justify-center text-gold text-2xl font-serif">
                {result.sigil}
            </div>
            
            <div className="mt-4 mb-2 uppercase tracking-[0.3em] text-[10px] text-gold/60 font-mono">Dominant Resonance</div>
            <h1 className={`text-6xl font-serif mb-4 ${result.color} transition-all duration-1000`}>
              {result.name}
            </h1>
            <p className="text-white/60 mb-8 max-w-xs mx-auto text-sm">
              Your signature is defined by <span className="text-white italic">{result.desc}</span>. 
              This is just the surface of your calculated timing.
            </p>

            <div className="space-y-4">
                <button 
                    onClick={() => document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full bg-gold text-obsidian py-4 rounded-xl font-bold tracking-widest uppercase text-xs hover:bg-gold-leaf transition-colors"
                >
                    Claim Founding Rank
                </button>
                <div className="flex items-center gap-4">
                    <button className="flex-1 border border-white/10 py-3 rounded-xl flex items-center justify-center gap-2 text-xs text-white/60 hover:bg-white/5 transition-colors">
                        <Share2 className="w-3 h-3" />
                        Share Result
                    </button>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

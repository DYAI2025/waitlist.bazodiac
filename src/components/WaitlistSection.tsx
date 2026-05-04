import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';
import { Users, Trophy, Zap, Share2, CheckCircle2 } from 'lucide-react';

function AnimatedCounter({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 60, damping: 20, mass: 1 });
  const displayValue = useTransform(spring, (current) => Math.round(current).toLocaleString());

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{displayValue}</motion.span>;
}

export default function WaitlistSection() {
  const [email, setEmail] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('bazodiac_waitlist');
    if (saved) {
      const data = JSON.parse(saved);
      setIsJoined(true);
      setPosition(data.position);
    }
  }, []);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    const newPos = Math.floor(Math.random() * 200) + 1200;
    setPosition(newPos);
    setIsJoined(true);
    localStorage.setItem('bazodiac_waitlist', JSON.stringify({ email, position: newPos, joinedAt: new Date().toISOString() }));
  };

  return (
    <div className="py-24 px-6" id="waitlist-section">
      <div className="max-w-4xl mx-auto">
        {!isJoined ? (
          <div className="text-center space-y-12">
            <div className="space-y-4">
               <h2 className="text-4xl md:text-5xl font-serif italic text-gold-leaf">Secure Your Signature</h2>
               <p className="text-white/40 max-w-lg mx-auto">
                 The first 500 members receive permanent Founding status and legacy referral rewards.
               </p>
            </div>
            
            <motion.form 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.15,
                      delayChildren: 0.2
                    }
                  }
                }}
                onSubmit={handleJoin} 
                className="flex flex-col md:flex-row gap-2 max-w-md mx-auto"
            >
                <motion.input 
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    required
                    type="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:border-gold/50 transition-all text-sm placeholder:text-white/20"
                />
                <motion.button 
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(241, 210, 121, 1)" }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="bg-gold text-obsidian px-8 py-4 rounded-xl font-bold uppercase text-xs tracking-widest transition-colors shadow-[0_0_20px_rgba(212,175,55,0.1)] hover:shadow-[0_0_40px_rgba(212,175,55,0.3)]"
                >
                    Request Access
                </motion.button>
            </motion.form>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* Position Card */}
            <div className="glass rounded-3xl p-8 relative overflow-hidden border-gold/20">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/5 blur-3xl rounded-full" />
              <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-start">
                    <div className="uppercase tracking-widest text-[10px] text-white/40 font-mono">Status: Reserved</div>
                    <Trophy className="w-5 h-5 text-gold" />
                </div>
                <div className="space-y-1">
                    <div className="text-6xl font-serif text-white tracking-tighter italic">#<AnimatedCounter value={position} /></div>
                    <div className="text-xs text-white/40 font-mono uppercase tracking-widest">Global Rank</div>
                </div>
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gold/60" />
                        <span className="text-[10px] text-white/60 uppercase tracking-wider">34 Ahead of you</span>
                    </div>
                    <button 
                        onClick={() => setPosition(prev => Math.max(1, prev - Math.floor(Math.random() * 3 + 1)))}
                        className="text-gold text-[10px] font-bold uppercase tracking-widest hover:text-gold-leaf flex items-center gap-1 active:scale-95 transition-transform"
                    >
                        Move Up <Zap className="w-3 h-3 fill-gold text-gold" />
                    </button>
                </div>
              </div>
            </div>

            {/* Referrals & Share */}
            <div className="space-y-6">
                <div className="glass rounded-3xl p-8 space-y-4 border-white/5">
                    <h3 className="text-lg font-serif">Accelerate Access</h3>
                    <p className="text-xs text-white/40 leading-relaxed">
                        Refer 3 seekers to unlock <span className="text-white italic">Beta Tester Tier</span>. Priority access for those who share the signal.
                    </p>
                    <div className="flex bg-white/5 rounded-xl p-2 border border-white/5">
                        <input 
                            readOnly 
                            value={`bazodiac.com/join?ref=${position}`} 
                            className="bg-transparent text-[10px] flex-1 px-4 outline-none font-mono text-white/60"
                        />
                        <button 
                          onClick={() => {
                            const template = `Ich habe gerade meine exklusive Bazi-Signatur bei Bazodiac reserviert. 🌌 Platz #${position} in der Schlange – wer meine Einladung nutzt, rückt mit mir nach vorn: https://bazodiac.com/join?ref=${position} #Bazodiac2026 #AstroTech`;
                            navigator.clipboard.writeText(template);
                            alert('Sharing template copied to clipboard!');
                          }}
                          className="p-3 hover:bg-white/10 rounded-lg transition-colors group"
                        >
                            <Share2 className="w-4 h-4 text-gold group-active:scale-90 transition-transform" />
                        </button>
                    </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { label: 'Founding Members', status: 'locked', icon: Trophy, desc: 'Top 500' },
                        { label: 'Beta-Tester', status: 'potential', icon: Zap, desc: '3+ Referrals' },
                        { label: 'General Waitlist', status: 'achieved', icon: CheckCircle2, desc: 'Standard Access' }
                    ].map((tier, index) => (
                        <motion.div 
                            key={tier.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={tier.status !== 'locked' ? { 
                                y: -8, 
                                scale: 1.05,
                                borderColor: 'rgba(212, 175, 55, 0.5)',
                                boxShadow: '0 20px 40px -20px rgba(212, 175, 55, 0.3)'
                            } : {}}
                            className={`relative glass p-4 rounded-2xl flex flex-col items-center gap-2 border transition-all duration-500 cursor-default group ${
                                tier.status === 'achieved' 
                                    ? 'border-gold/40 bg-gold/5 shadow-[0_0_20px_rgba(212,175,55,0.05)]' 
                                    : tier.status === 'potential'
                                        ? 'border-white/10 opacity-70 hover:opacity-100' 
                                        : 'border-white/5 opacity-30 grayscale'
                            }`}
                        >
                            {tier.status === 'achieved' && (
                                <motion.div 
                                    layoutId="active-glow"
                                    className="absolute inset-0 rounded-2xl bg-gold/5 blur-xl -z-10"
                                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />
                            )}
                            
                            <tier.icon className={`w-4 h-4 transition-colors duration-500 ${
                                tier.status === 'achieved' ? 'text-gold' : 'text-white/40 group-hover:text-gold/60'
                            }`} />
                            
                            <div className="flex flex-col items-center text-center">
                                <span className={`text-[8px] uppercase tracking-widest font-bold leading-tight ${tier.status === 'achieved' ? 'text-white' : 'text-white/60'}`}>
                                    {tier.label}
                                </span>
                                <span className="text-[6px] uppercase tracking-[0.2em] text-white/20 mt-1 block">
                                    {tier.desc}
                                </span>
                            </div>

                            {tier.status === 'achieved' && (
                                <div className="absolute -top-1 -right-1">
                                    <motion.div 
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                        className="w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]"
                                    />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

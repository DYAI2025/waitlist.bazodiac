import { motion } from 'motion/react';
import { Network, Activity, Shield, Cpu, Lock, Globe } from 'lucide-react';

const FEATURES = [
  {
    title: "Three Symbolic Systems",
    desc: "A unified synthesis of Western Astrology, Bazi, and Wu-Xing. No contradictions. Just coherence.",
    icon: Network,
    size: "col-span-2 row-span-2",
    bg: "bg-indigo-900/10"
  },
  {
    title: "Visible Engine",
    desc: "Watch the logic unfold. We don't just give results; we reveal the calculated timing signature.",
    icon: Cpu,
    size: "col-span-1 row-span-1",
    bg: "bg-gold/5"
  },
  {
    title: "Ethical Precision",
    desc: "Analytical, symbolic, transparent. No absolute predictions—only resonant probabilities.",
    icon: Shield,
    size: "col-span-1 row-span-1",
    bg: "bg-emerald-900/10"
  },
  {
    title: "Data Coherence",
    desc: "Personalized signal-tendency mapping for timing, elements, and environmental resonance.",
    icon: Activity,
    size: "col-span-1 row-span-1",
    bg: "bg-rose-900/10"
  },
  {
    title: "Private by Design",
    desc: "Your origin data is ephemeral. Encrypted at the source, utilized strictly for decoding.",
    icon: Lock,
    size: "col-span-1 row-span-2",
    bg: "bg-slate-900/20"
  },
  {
    title: "Global Timing Signature",
    desc: "Calculations based on precise birth coordinates and solar time corrections.",
    icon: Globe,
    size: "col-span-1 row-span-1",
    bg: "bg-sky-900/10"
  }
];

export default function BentoGrid() {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto" id="engine-section">
      <div className="mb-16 space-y-4">
          <h2 className="text-sm font-mono uppercase tracking-[0.4em] text-gold/60">The Visible Engine Strategy</h2>
          <h3 className="text-4xl md:text-5xl font-serif max-w-2xl">Calculated resonance. Decoded for the intellectual seeker.</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-3 gap-4 h-full md:h-[600px]">
        {FEATURES.map((f, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`glass p-8 rounded-[2.5rem] flex flex-col justify-between group hover:border-gold/20 transition-all duration-500 overflow-hidden relative ${f.size} ${f.bg}`}
          >
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <f.icon className="w-32 h-32" />
            </div>
            
            <f.icon className="w-6 h-6 text-gold mb-8 mb-auto" />
            
            <div className="space-y-3">
              <h4 className="text-xl font-serif text-gold-leaf">{f.title}</h4>
              <p className="text-xs text-white/40 leading-relaxed font-light">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

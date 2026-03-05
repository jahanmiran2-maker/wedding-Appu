import { motion } from 'motion/react';
import { COUPLE_NAMES } from '../constants';
import Countdown from './Countdown';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/seed/wedding-cover/1920/1080"
          alt="Wedding Cover"
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-wedding-cream" />
      </div>

      <div className="relative z-10 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-sm uppercase tracking-[0.3em] text-wedding-olive font-sans font-semibold mb-4 block"
        >
          Our Wedding Album
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-7xl md:text-9xl font-serif italic text-stone-900 leading-tight mb-8"
        >
          {COUPLE_NAMES.bride} <span className="text-wedding-gold font-normal not-italic">&</span> {COUPLE_NAMES.groom}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Countdown />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-12 flex flex-col items-center"
        >
          <div className="w-px h-24 bg-wedding-olive/30 mb-4" />
          <p className="text-lg italic text-stone-600">Scroll to explore our journey</p>
        </motion.div>
      </div>
    </section>
  );
}


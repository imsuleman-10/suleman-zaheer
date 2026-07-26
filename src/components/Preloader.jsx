import { motion } from 'framer-motion';

const Preloader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
    >
      <div className="relative">
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Inline SVG monogram — replaces 693KB PNG logo, zero network cost */}
          <div className="w-28 h-28 mb-6 rounded-3xl bg-white/5 backdrop-blur-md border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.3)] flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 100 100" width="80" height="80" xmlns="http://www.w3.org/2000/svg" aria-label="Suleman Zaheer">
              <defs>
                <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
              </defs>
              <text
                x="50" y="72"
                textAnchor="middle"
                fontSize="72"
                fontWeight="bold"
                fontFamily="Arial, sans-serif"
                fill="url(#sg)"
                letterSpacing="-2"
              >S</text>
            </svg>
          </div>
        </motion.div>

        {/* Animated progress ring */}
        <svg className="absolute inset-0 w-32 h-32 -m-4 text-cyan-500 animate-spin" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="70 200" strokeLinecap="round" className="opacity-70" />
        </svg>
      </div>

      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="text-cyan-500 font-mono text-xs tracking-[0.3em] uppercase mt-8"
      >
        Suleman Zaheer
      </motion.div>
    </motion.div>
  );
};

export default Preloader;

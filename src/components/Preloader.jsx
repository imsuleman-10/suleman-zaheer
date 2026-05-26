import { motion } from 'framer-motion';

const Preloader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
    >
      <div className="relative">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-28 h-28 mb-6 rounded-3xl bg-white/5 backdrop-blur-md border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.3)] overflow-hidden">
            <img src="/assets/suleman-zaheer-logo.png" alt="Logo" className="w-full h-full object-cover filter drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          </div>
        </motion.div>
        
        {/* Animated progress ring */}
        <svg className="absolute inset-0 w-32 h-32 -m-4 text-cyan-500 animate-spin" viewBox="0 0 100 100" fill="none">
           <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="70 200" strokeLinecap="round" className="opacity-70" />
        </svg>
      </div>
      
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="text-cyan-500 font-mono text-xs tracking-[0.3em] uppercase mt-8"
      >
        Suleman Zaheer – Portfolio
      </motion.div>
    </motion.div>
  );
};

export default Preloader;

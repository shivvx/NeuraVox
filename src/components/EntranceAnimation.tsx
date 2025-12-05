import { motion, AnimatePresence } from "motion/react";
import { Mic } from "lucide-react";
import { useEffect, useState } from "react";

interface EntranceAnimationProps {
  onComplete: () => void;
}

export function EntranceAnimation({ onComplete }: EntranceAnimationProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar animation
    const duration = 3000;
    const startTime = Date.now();
    
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(progressInterval);
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    }, 16);

    return () => {
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ 
          opacity: 0,
          scale: 1.05,
        }}
        transition={{ 
          duration: 0.6,
          ease: [0.43, 0.13, 0.23, 0.96]
        }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A0F1F] overflow-hidden"
        style={{ willChange: 'transform, opacity' }}
      >
        {/* Animated Background Gradients */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1 }}
          className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-[#3A82FF]/30 rounded-full blur-[120px]"
          style={{ willChange: 'opacity' }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] bg-[#2CCBFF]/30 rounded-full blur-[120px]"
          style={{ willChange: 'opacity' }}
        />

        {/* Reduced Floating Particles - Only 20 for performance */}
        {[...Array(20)].map((_, i) => {
          const randomX = Math.random() * window.innerWidth;
          const randomDelay = Math.random() * 2;
          const randomDuration = 4 + Math.random() * 3;
          const randomSize = 2 + Math.random() * 2;
          
          return (
            <motion.div
              key={`particle-${i}`}
              initial={{
                x: randomX,
                y: window.innerHeight + 50,
                opacity: 0,
              }}
              animate={{
                y: -100,
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: randomDuration,
                repeat: Infinity,
                delay: randomDelay,
                ease: "linear",
              }}
              className="absolute rounded-full"
              style={{
                width: `${randomSize}px`,
                height: `${randomSize}px`,
                backgroundColor: i % 3 === 0 ? '#3A82FF' : i % 3 === 1 ? '#2CCBFF' : '#FFFFFF',
                boxShadow: `0 0 ${randomSize * 4}px ${
                  i % 3 === 0 ? 'rgba(58, 130, 255, 0.6)' : 
                  i % 3 === 1 ? 'rgba(44, 203, 255, 0.6)' : 
                  'rgba(255, 255, 255, 0.4)'
                }`,
                willChange: 'transform, opacity',
              }}
            />
          );
        })}

        {/* Main Content Container */}
        <div className="relative z-10 flex flex-col items-center gap-10">
          {/* Logo Container with Optimized Rings */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              duration: 0.8,
            }}
            className="relative"
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Reduced Pulsing Rings - Only 3 */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`ring-${i}`}
                initial={{ opacity: 0, scale: 1 }}
                animate={{
                  scale: [1, 1.3 + i * 0.15],
                  opacity: [0.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: i * 0.3,
                }}
                className="absolute rounded-full border-2"
                style={{
                  width: `${140 + i * 20}px`,
                  height: `${140 + i * 20}px`,
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  borderColor: i % 2 === 0 ? '#3A82FF' : '#2CCBFF',
                  willChange: 'transform, opacity',
                }}
              />
            ))}

            {/* Main Logo Circle */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              className="relative w-[120px] h-[120px] rounded-full bg-gradient-to-br from-[#3A82FF] via-[#2E8FFF] to-[#2CCBFF] flex items-center justify-center"
              style={{
                boxShadow: "0 0 40px rgba(58, 130, 255, 0.5)",
                willChange: 'transform, opacity',
              }}
            >
              {/* Glossy overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent rounded-full" />
              
              {/* Mic Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: 0.4,
                  duration: 0.4,
                }}
                className="relative z-10"
              >
                <Mic className="w-[48px] h-[48px] text-white drop-shadow-lg" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Title and Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6,
              delay: 0.6,
            }}
            className="text-center space-y-3"
          >
            {/* Main Title */}
            <h1
              className="text-[40px] max-sm:text-[32px] bg-gradient-to-r from-[#3A82FF] via-white to-[#2CCBFF] bg-clip-text text-transparent"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
            >
              NEURA Vox
            </h1>
            
            {/* Subtitle */}
            <p
              className="text-[16px] max-sm:text-[14px] text-[#A2B2D9]"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
              }}
            >
              powered by Murf AI
            </p>
            
            {/* Under Development Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.4,
                delay: 0.9,
              }}
              className="inline-block px-4 py-1.5 bg-white/[0.04] border border-[#3A82FF]/30 rounded-full backdrop-blur-sm"
            >
              <span
                className="text-[12px] max-sm:text-[11px] text-[#3A82FF]"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                }}
              >
                ( under development )
              </span>
            </motion.div>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
            }}
            transition={{ 
              duration: 0.5,
              delay: 0.8,
            }}
            className="w-[350px] max-sm:w-[280px]"
          >
            {/* Progress Container */}
            <div className="relative h-[4px] bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
              {/* Progress Fill */}
              <motion.div
                initial={{ width: "0%" }}
                animate={{ 
                  width: `${progress}%`,
                }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#3A82FF] via-[#2E8FFF] to-[#2CCBFF] rounded-full"
                style={{
                  boxShadow: "0 0 15px rgba(58, 130, 255, 0.6)",
                  willChange: 'width',
                }}
              />

              {/* Glowing Progress Head */}
              <motion.div
                animate={{
                  left: `${progress}%`,
                  opacity: progress > 5 ? 1 : 0,
                }}
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 -ml-1.5"
                style={{ willChange: 'transform, opacity' }}
              >
                <div className="w-full h-full rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
              </motion.div>
            </div>

            {/* Progress Text */}
            <div className="flex justify-between items-center mt-4">
              <span
                className="text-[13px] max-sm:text-[12px] text-[#A2B2D9]"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
              >
                Initializing...
              </span>
              <span
                className="text-[13px] max-sm:text-[12px] text-[#3A82FF] font-mono"
                style={{ fontWeight: 600 }}
              >
                {Math.round(progress)}%
              </span>
            </div>
          </motion.div>
        </div>

        {/* Single Scan Line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            y: ["-100%", "300%"],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#3A82FF]/50 to-transparent"
          style={{
            boxShadow: '0 0 10px rgba(58, 130, 255, 0.4)',
            willChange: 'transform, opacity',
          }}
        />

        {/* Corner Accent Lines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 0.8 }}
          className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-[#3A82FF]/40 rounded-tl-lg"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-[#2CCBFF]/40 rounded-tr-lg"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-[#3A82FF]/40 rounded-bl-lg"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-[#2CCBFF]/40 rounded-br-lg"
        />
      </motion.div>
    </AnimatePresence>
  );
}
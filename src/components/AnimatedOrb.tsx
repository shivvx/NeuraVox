import { motion } from "motion/react";

interface AnimatedOrbProps {
  state: 'idle' | 'listening' | 'processing' | 'speaking';
}

export function AnimatedOrb({ state }: AnimatedOrbProps) {
  const statusText = {
    idle: "Ready.",
    listening: "Speak now...",
    processing: "Thinking...",
    speaking: "Speaking...",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Animated Orb Container */}
      <div className="relative w-[180px] h-[180px] flex items-center justify-center">
        {/* Outer pulsing rings */}
        {(state === 'listening' || state === 'speaking') && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`ring-${i}`}
                animate={{
                  scale: [1, 2.5],
                  opacity: [0.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: i * 0.4,
                }}
                className="absolute inset-0 rounded-full"
                style={{
                  background: state === 'listening' 
                    ? 'radial-gradient(circle, rgba(139, 92, 246, 0.4), transparent 70%)'
                    : 'radial-gradient(circle, rgba(59, 130, 246, 0.4), transparent 70%)',
                }}
              />
            ))}
          </>
        )}

        {/* Main Orb */}
        <motion.div
          animate={{
            scale: state === 'listening' 
              ? [1, 1.05, 1] 
              : state === 'speaking'
              ? [1, 1.1, 0.95, 1.08, 1]
              : state === 'processing'
              ? [1, 1.08, 1]
              : [1, 1.02, 1],
          }}
          transition={{
            duration: state === 'listening' 
              ? 0.8 
              : state === 'speaking'
              ? 0.6
              : state === 'processing'
              ? 1.2
              : 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-[140px] h-[140px] rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.4) 0%, rgba(59, 130, 246, 0.3) 100%)',
            boxShadow: '0 0 60px rgba(139, 92, 246, 0.5), inset 0 0 40px rgba(139, 92, 246, 0.2)',
          }}
        >
          {/* Rotating gradient overlay */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: state === 'processing' ? 2 : 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, transparent, rgba(139, 92, 246, 0.4), transparent)',
            }}
          />

          {/* Inner glow */}
          <motion.div
            animate={{
              opacity: state === 'idle' ? [0.3, 0.5, 0.3] : [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-[20px] rounded-full bg-white/20 blur-xl"
          />

          {/* AI Speaking Indicator - Equalizer Bars */}
          {state === 'speaking' && (
            <div className="relative z-10 flex items-center gap-[4px] h-[40px]">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`bar-${i}`}
                  animate={{
                    scaleY: [0.3, Math.random() * 0.8 + 0.6, 0.4, Math.random() * 0.9 + 0.5, 0.3],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.08,
                  }}
                  className="w-[6px] bg-white rounded-full origin-center"
                  style={{
                    height: `${20 + i * 2}px`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Processing - Rotating dots */}
          {state === 'processing' && (
            <div className="relative z-10 flex gap-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`dot-${i}`}
                  animate={{
                    y: [0, -12, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.15,
                  }}
                  className="w-[10px] h-[10px] rounded-full bg-white"
                />
              ))}
            </div>
          )}

          {/* Listening - Waveform */}
          {state === 'listening' && (
            <div className="relative z-10 flex items-center gap-[5px] h-[40px]">
              {[...Array(7)].map((_, i) => (
                <motion.div
                  key={`wave-${i}`}
                  animate={{
                    scaleY: [0.5, 1.2, 0.7, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.1,
                  }}
                  className="w-[4px] bg-white/80 rounded-full origin-center"
                  style={{
                    height: `${15 + Math.abs(3 - i) * 3}px`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Glossy overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-full pointer-events-none" />
        </motion.div>
      </div>

      {/* Status Text */}
      <motion.div
        key={state}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <p className={`text-[16px] ${
          state === 'listening' ? 'text-purple-300' : 
          state === 'speaking' ? 'text-blue-300' : 
          state === 'processing' ? 'text-purple-400' : 
          'text-white/40'
        }`}>
          {statusText[state]}
        </p>
      </motion.div>
    </div>
  );
}

import { motion } from "motion/react";
import imgAsset31 from "figma:asset/caec6c3f78f7805c486c979f08e0ec7b3f5f8f7f.png";

interface VisualizerProps {
  state: 'idle' | 'listening' | 'processing' | 'speaking';
}

export function Visualizer({ state }: VisualizerProps) {
  // Organic Blob Shapes using border-radius (Fancy Border Radius generator style)
  const blobShapes = {
    idle: [
        "60% 40% 30% 70% / 60% 30% 70% 40%", 
        "30% 60% 70% 40% / 50% 60% 30% 60%", 
        "60% 40% 30% 70% / 60% 30% 70% 40%"
    ],
    listening: [
        "50% 50% 50% 50% / 50% 50% 50% 50%",
        "45% 55% 45% 55% / 55% 45% 55% 45%",
        "50% 50% 50% 50% / 50% 50% 50% 50%"
    ],
    processing: [
        "40% 60% 60% 40% / 40% 60% 60% 40%",
        "60% 40% 40% 60% / 60% 40% 40% 60%",
        "40% 60% 60% 40% / 40% 60% 60% 40%"
    ],
    speaking: [
        "70% 30% 30% 70% / 60% 40% 60% 40%",
        "30% 70% 70% 30% / 40% 60% 40% 60%",
        "70% 30% 30% 70% / 60% 40% 60% 40%"
    ]
  };

  const containerVariants = {
    idle: {
      borderRadius: blobShapes.idle,
      scale: [1, 1.05, 1],
      rotate: [0, 5, -5, 0],
      transition: { 
        borderRadius: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" }
      }
    },
    listening: {
      borderRadius: blobShapes.listening,
      scale: [1, 0.95, 1],
      transition: { 
        borderRadius: { duration: 0.5, repeat: Infinity, ease: "linear" },
        scale: { duration: 0.5, repeat: Infinity, ease: "easeInOut" }
      }
    },
    processing: {
      borderRadius: blobShapes.processing,
      rotate: 360,
      scale: [0.9, 1.1, 0.9],
      transition: { 
        borderRadius: { duration: 2, repeat: Infinity, ease: "linear" },
        rotate: { duration: 2, repeat: Infinity, ease: "linear" },
        scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
      }
    },
    speaking: {
      borderRadius: blobShapes.speaking,
      scale: [1, 1.2, 0.9, 1.15, 1],
      transition: { 
        borderRadius: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        scale: { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
      }
    }
  };

  // Inner image rotation to simulate fluid movement inside the container
  const imageVariants = {
    idle: {
      scale: 1.2,
      rotate: [0, -360],
      transition: { duration: 60, repeat: Infinity, ease: "linear" }
    },
    processing: {
        scale: 1.4,
        rotate: [0, 360],
        transition: { duration: 5, repeat: Infinity, ease: "linear" }
    },
    listening: {
        scale: 1.2,
    },
    speaking: {
        scale: 1.3,
        rotate: [0, -360],
        transition: { duration: 30, repeat: Infinity, ease: "linear" }
    }
  };

  return (
    <div className="relative w-[420px] h-[320px] max-md:w-[340px] max-md:h-[260px] max-sm:w-[280px] max-sm:h-[220px] mx-auto flex items-center justify-center">
      {/* Glow Effect Behind */}
      <motion.div
        animate={{
          scale: state === 'speaking' ? [1, 1.3, 1] : 1,
          opacity: state === 'speaking' ? 0.5 : 0.25,
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 rounded-full blur-[100px] max-sm:blur-[60px] -z-10"
        style={{ willChange: 'transform, opacity' }}
      />

      {/* The Fluid Blob Container - Completely Transparent */}
      <motion.div
        variants={containerVariants}
        animate={state}
        className="w-[340px] h-[260px] max-md:w-[280px] max-md:h-[220px] max-sm:w-[240px] max-sm:h-[190px] overflow-hidden relative z-10"
        style={{ 
          willChange: 'border-radius, transform',
          backgroundColor: 'transparent',
          border: 'none',
          boxShadow: 'none'
        }}
      >
         {/* The Texture/Image inside */}
         <motion.div
           variants={imageVariants}
           animate={state}
           className="w-full h-full"
           style={{ willChange: 'transform' }}
         >
             <img 
                src={imgAsset31} 
                alt="Fluid Bubble"
                className="w-full h-full object-cover scale-[1.5] transform-gpu opacity-90"
                style={{ 
                  objectPosition: 'center',
                  mixBlendMode: 'screen'
                }}
             />
         </motion.div>
         
         {/* Overlay for gloss/shine effect */}
         <div className="absolute inset-0 bg-gradient-to-br from-[#3A82FF]/30 via-transparent to-[#2CCBFF]/20 opacity-60 pointer-events-none" />
      </motion.div>
    </div>
  );
}

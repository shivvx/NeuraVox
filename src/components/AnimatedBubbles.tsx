import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Bubble {
  id: number;
  size: number;
  x: number;
  duration: number;
  delay: number;
  blur: number;
  opacity: number;
}

export function AnimatedBubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    // Reduced to 8 bubbles for better performance
    const generatedBubbles: Bubble[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: Math.random() * 120 + 80, // 80-200px
      x: Math.random() * 100, // 0-100%
      duration: Math.random() * 15 + 25, // 25-40 seconds
      delay: Math.random() * 8, // 0-8s delay
      blur: Math.random() * 50 + 40, // 40-90px blur
      opacity: Math.random() * 0.06 + 0.06, // 6%-12%
    }));
    setBubbles(generatedBubbles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          initial={{
            y: "100vh",
            x: `${bubble.x}%`,
          }}
          animate={{
            y: "-20vh",
            x: [
              `${bubble.x}%`,
              `${bubble.x + (Math.random() - 0.5) * 8}%`,
              `${bubble.x}%`,
            ],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "linear",
            x: {
              duration: bubble.duration / 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
          className="absolute rounded-full"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            background: `linear-gradient(135deg, #3A82FF 0%, #2CCBFF 50%, #A47CFF 100%)`,
            filter: `blur(${bubble.blur}px)`,
            opacity: bubble.opacity,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
}
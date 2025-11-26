import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface VoiceWaveformProps {
  isActive: boolean;
  state: 'idle' | 'listening' | 'processing' | 'speaking';
}

export function VoiceWaveform({ isActive, state }: VoiceWaveformProps) {
  const bars = Array.from({ length: 40 }, (_, i) => i);
  const [heights, setHeights] = useState<number[]>(bars.map(() => 0.2));

  useEffect(() => {
    if (!isActive) {
      setHeights(bars.map(() => 0.2));
      return;
    }

    const interval = setInterval(() => {
      setHeights(bars.map(() => {
        if (state === 'listening') {
          return Math.random() * 0.8 + 0.2;
        } else if (state === 'speaking') {
          return Math.random() * 1 + 0.3;
        } else if (state === 'processing') {
          return Math.random() * 0.5 + 0.2;
        }
        return 0.2;
      }));
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, state]);

  return (
    <div className="flex items-center justify-center gap-[3px] h-[60px] w-full">
      {bars.map((bar, index) => (
        <motion.div
          key={bar}
          animate={{
            height: `${heights[index] * 100}%`,
          }}
          transition={{
            duration: 0.1,
            ease: "easeOut",
          }}
          className="w-[2px] bg-gradient-to-t from-purple-500 to-blue-500 rounded-full"
          style={{
            minHeight: '4px',
          }}
        />
      ))}
    </div>
  );
}

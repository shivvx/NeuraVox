import { motion } from "motion/react";
import { Mic, Square } from "lucide-react";
import { VoiceWaveform } from "./VoiceWaveform";

interface FloatingMicProps {
  isListening: boolean;
  onToggle: () => void;
  onStop?: () => void;
  state: 'idle' | 'listening' | 'processing' | 'speaking';
}

export function FloatingMic({ isListening, onToggle, onStop, state }: FloatingMicProps) {
  return (
    <div className="relative flex flex-col items-center gap-3 max-sm:gap-2">
      {/* Voice Waveform - Show when listening */}
      {isListening && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="mb-2"
        >
          <VoiceWaveform isActive={isListening} state={state} />
        </motion.div>
      )}
      {/* Main Mic Button */}
      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        {/* Expanding wave circle animation when listening */}
        {isListening && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`wave-${i}`}
                animate={{
                  scale: [1, 2.5],
                  opacity: [0.45, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: i * 0.5,
                }}
                className="absolute inset-0 rounded-full bg-[#2CCBFF]"
                style={{
                  filter: 'blur(8px)',
                }}
              />
            ))}
          </>
        )}

        {/* Main Button */}
        <motion.div
          animate={isListening ? {
            boxShadow: [
              "0 0 20px rgba(44, 203, 255, 0.45)",
              "0 0 36px rgba(44, 203, 255, 0.65)",
              "0 0 20px rgba(44, 203, 255, 0.45)",
            ],
          } : {
            boxShadow: "0 0 20px rgba(58, 130, 255, 0.25)",
          }}
          transition={{
            boxShadow: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          whileHover={{
            scale: 1.05,
          }}
          className={`relative w-[50px] h-[50px] max-sm:w-[44px] max-sm:h-[44px] rounded-full flex items-center justify-center transition-all duration-300 ${
            isListening
              ? "bg-[#3A82FF]"
              : "bg-[#0E152A]"
          }`}
        >
          {/* Mic Icon */}
          <Mic className={`w-[20px] h-[20px] max-sm:w-[18px] max-sm:h-[18px] transition-colors ${
            isListening ? "text-white" : "text-white/80"
          }`} />
        </motion.div>
      </motion.button>

      {/* Stop Button - Only visible when listening */}
      {isListening && onStop && (
        <motion.button
          initial={{ opacity: 0, scale: 0, x: -10 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onStop}
          className="w-[32px] h-[32px] max-sm:w-[28px] max-sm:h-[28px] rounded-full bg-[#0E152A] border border-white/10 flex items-center justify-center hover:bg-[#FF4F6B]/20 transition-colors"
        >
          <Square className="w-[18px] h-[18px] max-sm:w-[16px] max-sm:h-[16px] text-[#FF4F6B] fill-[#FF4F6B]" />
        </motion.button>
      )}
    </div>
  );
}
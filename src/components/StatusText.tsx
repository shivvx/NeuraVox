import { motion } from "motion/react";

interface StatusTextProps {
  state: 'idle' | 'listening' | 'processing' | 'speaking';
}

export function StatusText({ state }: StatusTextProps) {
  const statusText = {
    idle: "Ready.",
    listening: "Listening...",
    processing: "Processing...",
    speaking: "Speak now...",
  };

  return (
    <motion.div
      key={state}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.2 }}
      className="text-center mt-[16px] max-sm:mt-[12px]"
    >
      <p 
        className="text-[15px] max-sm:text-[13px] text-[#A2B2D9]/60"
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
      >
        {statusText[state]}
      </p>
    </motion.div>
  );
}
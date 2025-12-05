import { motion } from "motion/react";
import { Bot } from "lucide-react";

export function ThinkingBubble() {
  return (
    <div className="flex gap-3 flex-row">
      {/* Avatar */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.05, type: "spring", stiffness: 300 }}
        className="flex-shrink-0 w-[24px] h-[24px] rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500"
      >
        <Bot className="w-[12px] h-[12px] text-white" />
      </motion.div>

      {/* Thinking Bubble */}
      <div className="flex flex-col gap-1 items-start">
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.12, ease: "easeOut" }}
          className="px-[16px] py-[12px] rounded-[18px] bg-[rgba(58,130,255,0.10)] border border-[rgba(58,130,255,0.25)]"
        >
          <div className="flex gap-[6px] items-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -6, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
                className="w-[8px] h-[8px] rounded-full bg-[#2CCBFF]"
              />
            ))}
          </div>
        </motion.div>

        {/* Timestamp */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-[11px] text-[#A2B2D9]/50 px-2 text-left"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          AI is thinking...
        </motion.span>
      </div>
    </div>
  );
}
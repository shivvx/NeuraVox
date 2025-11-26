import { motion } from "motion/react";

export function TopBar() {
  return (
    <div className="absolute top-0 left-0 w-full flex flex-col items-center pt-[64px] z-10">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#c6f432] px-[16px] py-[8px] rounded-[100px] flex items-center justify-center"
      >
        <p className="font-bold leading-normal text-[#010101] text-[14px] text-center whitespace-nowrap">
          AI Buddy
        </p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex items-center gap-[8px] mt-4"
      >
        <motion.div 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[#c6f432] text-[14px]"
        >
          •
        </motion.div>
        <p className="opacity-50 text-[13px] text-white">Online</p>
      </motion.div>
    </div>
  );
}

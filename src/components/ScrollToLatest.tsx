import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";

interface ScrollToLatestProps {
  onClick: () => void;
  show: boolean;
}

export function ScrollToLatest({ onClick, show }: ScrollToLatestProps) {
  if (!show) return null;

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="absolute bottom-[16px] right-[16px] w-[36px] h-[36px] rounded-full bg-[#3A82FF] shadow-lg hover:shadow-[0_0_20px_rgba(58,130,255,0.5)] transition-shadow flex items-center justify-center z-10"
    >
      <ArrowDown className="w-[18px] h-[18px] text-white" />
    </motion.button>
  );
}

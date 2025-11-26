import { motion } from "motion/react";
import { Activity, Menu } from "lucide-react";

interface NavigationProps {
  isActive?: boolean;
  status?: string;
  onMenuClick?: () => void;
}

export function Navigation({ isActive = false, status = "idle", onMenuClick }: NavigationProps) {
  const getStatusColor = () => {
    switch(status) {
      case 'listening': return 'bg-blue-500';
      case 'processing': return 'bg-yellow-500';
      case 'speaking': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = () => {
    switch(status) {
      case 'listening': return 'Listening';
      case 'processing': return 'Processing';
      case 'speaking': return 'Speaking';
      default: return 'Idle';
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-[70px] max-sm:h-[60px] bg-gradient-to-b from-[#0A0F1F]/95 via-[#0A0F1F]/90 to-[#0A0F1F]/80 backdrop-blur-2xl border-b border-white/10 z-50 flex items-center justify-between px-[60px] max-lg:px-[30px] max-md:px-[20px] max-sm:px-[16px] shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
      {/* Glossy top line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      {/* Left - Hamburger Menu (Mobile Only) */}
      <div className="flex-1 flex items-center justify-start">
        <button
          onClick={onMenuClick}
          className="md:hidden w-[40px] h-[40px] rounded-[12px] bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-center transition-colors"
        >
          <Menu className="w-[20px] h-[20px] text-white/70" />
        </button>
      </div>

      {/* Center - Title */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col items-center absolute left-1/2 -translate-x-1/2"
      >
        <h1 
          className="text-[17px] max-sm:text-[15px] text-[#E3EBFF]"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
        >
          NEURA Vox
        </h1>
        <p 
          className="text-[11px] max-sm:text-[10px] text-[#E3EBFF]/50 max-sm:hidden"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          powered by Murf falcon tts
        </p>
      </motion.div>

      {/* Right - Status Indicator */}
      <div className="flex-1 flex items-center justify-end">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 max-sm:gap-2 px-5 max-sm:px-3 py-2 max-sm:py-1.5 bg-white/[0.04] backdrop-blur-xl rounded-full border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] relative overflow-hidden"
        >
          {/* Glossy overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none rounded-full" />
          
          <div className="relative z-10 flex items-center gap-3 max-sm:gap-2">
            {/* Status dot with pulse */}
            <div className="relative">
              <motion.div
                animate={{ 
                  scale: isActive ? [1, 1.3, 1] : 1,
                  opacity: isActive ? [1, 0.5, 1] : 0.5,
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`w-2.5 h-2.5 max-sm:w-2 max-sm:h-2 rounded-full ${getStatusColor()}`}
              />
              {isActive && (
                <motion.div
                  animate={{ 
                    scale: [1, 2, 2],
                    opacity: [0.6, 0, 0],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className={`absolute inset-0 rounded-full ${getStatusColor()}`}
                />
              )}
            </div>

            <span 
              className="text-[13px] max-sm:text-[11px] text-[#E3EBFF]/80"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              {getStatusLabel()}
            </span>

            {isActive && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="max-sm:hidden"
              >
                <Activity className="w-[14px] h-[14px] text-white/60" />
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </nav>
  );
}
import { motion, AnimatePresence } from "motion/react";
import { X, Volume2, Zap, Mic } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-[20px] z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.6)] z-50 overflow-hidden"
          >
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none rounded-[20px]" />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="relative z-10 p-[32px]">
              {/* Header */}
              <div className="flex items-center justify-between mb-[24px]">
                <h2 
                  className="text-[20px] text-[#E3EBFF]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  Settings
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-[32px] h-[32px] rounded-full bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center transition-colors"
                >
                  <X className="w-[18px] h-[18px] text-white/70" />
                </motion.button>
              </div>

              {/* Settings Items */}
              <div className="space-y-[20px]">
                {/* Voice Selection */}
                <div>
                  <label 
                    className="text-[13px] text-[#A2B2D9]/70 mb-[8px] flex items-center gap-2"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                  >
                    <Volume2 className="w-[14px] h-[14px]" />
                    Select Voice
                  </label>
                  <select 
                    className="w-full h-[44px] bg-white/[0.04] border border-white/[0.08] rounded-[12px] px-4 text-[14px] text-[#E3EBFF] appearance-none cursor-pointer focus:outline-none focus:border-[#3A82FF]/50 transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <option>Emily - Professional</option>
                    <option>Marcus - Confident</option>
                    <option>Sophia - Warm</option>
                    <option>David - Authoritative</option>
                  </select>
                </div>

                {/* Speed Slider */}
                <div>
                  <label 
                    className="text-[13px] text-[#A2B2D9]/70 mb-[8px] flex items-center gap-2"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                  >
                    <Zap className="w-[14px] h-[14px]" />
                    Voice Speed
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      defaultValue="1"
                      className="flex-1 h-[6px] bg-white/[0.08] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-[#3A82FF] [&::-webkit-slider-thumb]:to-[#2CCBFF] [&::-webkit-slider-thumb]:shadow-lg"
                    />
                    <span 
                      className="text-[13px] text-[#E3EBFF] min-w-[40px] text-right"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                    >
                      1.0x
                    </span>
                  </div>
                </div>

                {/* Auto Playback Toggle */}
                <div className="flex items-center justify-between py-[8px]">
                  <label 
                    className="text-[14px] text-[#E3EBFF]"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                  >
                    Auto Playback
                  </label>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="relative w-[48px] h-[26px] bg-[#3A82FF] rounded-full"
                  >
                    <motion.div
                      className="absolute top-[3px] right-[3px] w-[20px] h-[20px] bg-white rounded-full shadow-lg"
                      layout
                    />
                  </motion.button>
                </div>

                {/* ASR Provider */}
                <div>
                  <label 
                    className="text-[13px] text-[#A2B2D9]/70 mb-[8px] flex items-center gap-2"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                  >
                    <Mic className="w-[14px] h-[14px]" />
                    ASR Provider
                  </label>
                  <select 
                    className="w-full h-[44px] bg-white/[0.04] border border-white/[0.08] rounded-[12px] px-4 text-[14px] text-[#E3EBFF] appearance-none cursor-pointer focus:outline-none focus:border-[#3A82FF]/50 transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <option>Deepgram Nova-2</option>
                    <option>AssemblyAI</option>
                    <option>Whisper API</option>
                  </select>
                </div>

                {/* Clear History Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-[44px] bg-[#FF4F6B]/10 border border-[#FF4F6B]/30 rounded-[12px] text-[14px] text-[#FF4F6B] hover:bg-[#FF4F6B]/20 transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  Clear Conversation History
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

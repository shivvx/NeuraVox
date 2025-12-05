import { motion } from "motion/react";
import { Volume2, Play, Settings } from "lucide-react";
import { useState } from "react";
import { CustomDropdown } from "./CustomDropdown";

export function MurfVoicePanel() {
  const [selectedVoice, setSelectedVoice] = useState('Emily - Professional');
  const [isPlaying, setIsPlaying] = useState(false);

  const voices = [
    'Emily - Professional',
    'Marcus - Confident',
    'Sophia - Warm',
    'David - Authoritative'
  ];

  const handlePlaySample = () => {
    setIsPlaying(true);
    // Simulate playing audio for 3 seconds
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };

  const handleSelectVoice = (voice: string) => {
    setSelectedVoice(voice);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="relative bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] rounded-[16px] max-sm:rounded-[14px] p-[16px] max-sm:p-[14px] shadow-[0_4px_24px_rgba(0,0,0,0.2)] w-full max-w-[300px] max-xl:max-w-full"
    >
      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none rounded-[16px] max-sm:rounded-[14px]" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative z-10 space-y-[16px] max-sm:space-y-[14px]">
        {/* Header */}
        <div className="flex items-center gap-3 max-sm:gap-2">
          <div className="w-[32px] h-[32px] max-sm:w-[28px] max-sm:h-[28px] rounded-full bg-gradient-to-br from-[#3A82FF] to-[#2CCBFF] flex items-center justify-center shadow-lg">
            <Volume2 className="w-[16px] h-[16px] max-sm:w-[14px] max-sm:h-[14px] text-white" />
          </div>
          <div>
            <h3 
              className="text-[#E3EBFF]/90 text-[15px] max-sm:text-[14px]"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              Voice Model
            </h3>
          </div>
        </div>

        {/* Selected Voice */}
        <div className="space-y-2">
          <label 
            className="text-[12px] max-sm:text-[11px] text-[#A2B2D9]/60"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            Selected Voice
          </label>
          <CustomDropdown
            options={voices}
            value={selectedVoice}
            onChange={setSelectedVoice}
          />
        </div>

        {/* Play Sample Button */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(44,203,255,0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlaySample}
            disabled={isPlaying}
            className="w-[36px] h-[36px] max-sm:w-[32px] max-sm:h-[32px] rounded-full bg-gradient-to-r from-[#3A82FF] to-[#2CCBFF] flex items-center justify-center shadow-lg transition-shadow disabled:opacity-50"
          >
            <Play className="w-[20px] h-[20px] max-sm:w-[18px] max-sm:h-[18px] text-white fill-white" />
          </motion.button>
          {isPlaying && (
            <motion.span
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[12px] max-sm:text-[11px] text-[#2CCBFF]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Playing sample...
            </motion.span>
          )}
        </div>

        {/* Stats */}
        <div className="pt-[8px] max-sm:pt-[6px] space-y-[12px] max-sm:space-y-[10px]">
          <div 
            className="bg-white/[0.05] border border-white/[0.08] rounded-[16px] max-sm:rounded-[14px] p-[16px] max-sm:p-[14px] space-y-[12px] max-sm:space-y-[10px]"
          >
            <div className="flex items-center justify-between">
              <span 
                className="text-[12px] max-sm:text-[11px] text-[#A2B2D9]/60"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Latency
              </span>
              <span 
                className="text-[13px] max-sm:text-[12px] text-green-400"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                142ms
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span 
                className="text-[12px] max-sm:text-[11px] text-[#A2B2D9]/60"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Smoothness
              </span>
              <span 
                className="text-[13px] max-sm:text-[12px] text-[#2CCBFF]"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                94%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span 
                className="text-[12px] max-sm:text-[11px] text-[#A2B2D9]/60"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                TTS Chars Today
              </span>
              <span 
                className="text-[13px] max-sm:text-[12px] text-[#E3EBFF]/90"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                12,847
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span 
                className="text-[12px] max-sm:text-[11px] text-[#A2B2D9]/60"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Clarity Score
              </span>
              <span 
                className="text-[13px] max-sm:text-[12px] text-[#3A82FF]"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                98%
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
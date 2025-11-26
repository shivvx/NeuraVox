import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../imports/svg-lei4t6ok41";

interface VoiceControlsProps {
  isListening: boolean;
  onToggleListening: () => void;
}

export function VoiceControls({ isListening, onToggleListening }: VoiceControlsProps) {
  const [showKeyboard, setShowKeyboard] = useState(false);

  const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"]
  ];

  return (
    <>
      <div className="absolute bottom-0 w-full h-[300px] flex flex-col items-center justify-end pb-[50px] pointer-events-none z-20">
        
        {/* Interactive Area Container */}
        <div className="relative w-full max-w-[390px] flex items-center justify-between px-[24px] pointer-events-auto">
          
          {/* Keyboard Button */}
          <motion.button 
              onClick={() => setShowKeyboard(true)}
              whileTap={{ scale: 0.95 }}
              className="relative size-[48px] flex items-center justify-center rounded-full group"
          >
              {/* Background Circle */}
              <div className="absolute inset-0 bg-[#C09FF8] opacity-50 rounded-full" />
              
              {/* Icon */}
              <div className="relative size-[24px] z-10">
                  <svg className="block size-full" fill="none" viewBox="0 0 24 24">
                  <g>
                      <path d={svgPaths.p31563900} fill="white" />
                      <path d={svgPaths.p192d0000} fill="white" />
                      <path d={svgPaths.p27dbfe00} fill="white" />
                      <path d={svgPaths.pfe8f840} fill="white" />
                      <path d={svgPaths.pec43400} fill="white" />
                  </g>
                  </svg>
              </div>
          </motion.button>

          {/* Mic Button Wrapper */}
          <div className="relative flex items-center justify-center">
              {/* Ripples */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <AnimatePresence>
                      {isListening && (
                          <>
                              {[1, 2, 3].map((i) => (
                                  <motion.div
                                      key={i}
                                      initial={{ width: "96px", height: "96px", opacity: 0.5, borderColor: "#C6F432" }}
                                      animate={{ 
                                          width: ["96px", "220px"], 
                                          height: ["96px", "220px"],
                                          opacity: [0.5, 0],
                                          borderWidth: ["1px", "0px"]
                                      }}
                                      transition={{ 
                                          duration: 2, 
                                          repeat: Infinity, 
                                          delay: i * 0.4,
                                          ease: "easeOut"
                                      }}
                                      className="absolute rounded-full border border-[#C6F432]"
                                  />
                              ))}
                          </>
                      )}
                  </AnimatePresence>
                  
                  {/* Static/Base Rings */}
                  <div className="absolute w-[118px] h-[118px] border border-[#C6F432] opacity-50 rounded-full" />
                  <div className="absolute w-[154px] h-[154px] border border-[#C6F432] opacity-25 rounded-full" />
                  <div className="absolute w-[198px] h-[198px] border border-[#C6F432] opacity-10 rounded-full" />
              </div>

              {/* Main Mic Button */}
              <motion.button 
                  onClick={onToggleListening}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                      scale: isListening ? 1.1 : 1,
                      backgroundColor: isListening ? "#ffffff" : "#C6F432"
                  }}
                  className="relative z-10 w-[96px] h-[96px] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(198,244,50,0.3)] cursor-pointer"
              >
                  <div className="w-[32px] h-[38px]">
                      <svg className="block size-full" fill="none" viewBox="0 0 29 35">
                          <path d={svgPaths.p10a6fab2} fill={isListening ? "#000000" : "#010101"} />
                      </svg>
                  </div>
              </motion.button>
          </div>

          {/* Close Button */}
          <motion.button 
              whileTap={{ scale: 0.95 }}
              className="relative size-[48px] flex items-center justify-center rounded-full group"
          >
             {/* Background Circle */}
             <div className="absolute inset-0 bg-[#171717] rounded-full border border-white/10" />
             
             {/* Icon */}
             <div className="relative size-[24px] z-10 opacity-50">
               <svg className="block size-full" fill="none" viewBox="0 0 24 24">
                  <path d={svgPaths.p2913ed00} fill="white" />
               </svg>
             </div>
          </motion.button>
        </div>
      </div>

      {/* Keyboard Drawer */}
      <AnimatePresence>
        {showKeyboard && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowKeyboard(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />
            
            {/* Keyboard Panel */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-[#1c1c1e] rounded-t-[24px] z-50 overflow-hidden flex flex-col"
            >
               {/* Header / Drag Handle */}
               <div className="w-full h-[40px] flex items-center justify-center shrink-0" onClick={() => setShowKeyboard(false)}>
                  <div className="w-[40px] h-[4px] bg-zinc-600 rounded-full" />
               </div>

               {/* Input Preview */}
               <div className="px-4 mb-4">
                 <div className="bg-zinc-800/50 rounded-xl h-[50px] flex items-center px-4 text-white/80 border border-zinc-700/50">
                    <span className="animate-pulse">|</span>
                 </div>
               </div>

               {/* Keys Container */}
               <div className="flex-1 bg-[#2c2c2e] pb-[40px] pt-2 px-1">
                  {keys.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center gap-1.5 mb-2">
                      {row.map((key) => (
                        <button 
                          key={key} 
                          className="h-[42px] min-w-[32px] bg-[#4c4c4e] rounded-[6px] text-white text-[20px] font-medium shadow-[0_1px_0_rgba(0,0,0,0.3)] flex-1 max-w-[40px] active:bg-white active:text-black transition-colors"
                        >
                          {key}
                        </button>
                      ))}
                    </div>
                  ))}
                  
                  {/* Spacebar Row */}
                  <div className="flex justify-center gap-2 px-2 mt-2">
                     <button className="h-[42px] w-[40px] bg-[#3a3a3c] rounded-[6px] flex items-center justify-center text-white/70">123</button>
                     <button className="h-[42px] flex-1 max-w-[200px] bg-[#4c4c4e] rounded-[6px] text-white shadow-sm">space</button>
                     <button 
                        onClick={() => setShowKeyboard(false)}
                        className="h-[42px] w-[80px] bg-[#3d3d40] rounded-[6px] text-white text-[14px] font-medium bg-blue-600"
                     >
                       Go
                     </button>
                  </div>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

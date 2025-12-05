import { motion } from "motion/react";
import { Sparkles, Wrench, Users, Square, Calendar, Grid3x3, TrendingUp, Activity } from "lucide-react";
import { useState, useEffect } from "react";

export function VoiceAgentPanel() {
  const [accuracyData, setAccuracyData] = useState<number[]>([85, 87, 89, 91, 93, 95, 97, 99]);
  const [activeToolIndex, setActiveToolIndex] = useState<number | null>(null);

  const tools = [
    { icon: Sparkles, color: "bg-purple-500", name: "AI Assistant" },
    { icon: Wrench, color: "bg-gray-500", name: "Tools" },
    { icon: Users, color: "bg-blue-500", name: "Team" },
    { icon: Square, color: "bg-cyan-500", name: "Apps" },
    { icon: Calendar, color: "bg-green-500", name: "Calendar" },
    { icon: Grid3x3, color: "bg-orange-500", name: "Dashboard" },
  ];

  // Animate chart data
  useEffect(() => {
    const interval = setInterval(() => {
      setAccuracyData(prev => {
        const newData = [...prev];
        newData.shift();
        newData.push(Math.floor(Math.random() * 5) + 95);
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-[380px] bg-gradient-to-br from-zinc-950/80 via-zinc-900/60 to-zinc-950/80 backdrop-blur-2xl rounded-[24px] border border-white/10 p-[32px] max-xl:max-w-full shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_48px_rgba(168,85,247,0.15)] transition-shadow relative overflow-hidden"
    >
      {/* Glossy overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none rounded-[24px]" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="relative z-10">
        {/* Header with Icon */}
        <div className="flex items-center gap-3 mb-[24px]">
          <motion.div 
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-[40px] h-[40px] rounded-[12px] bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)]"
          >
            <Activity className="w-[20px] h-[20px] text-white" />
          </motion.div>
          <h2 className="text-[24px] text-white">Voice AI Agent</h2>
        </div>

        {/* Agent Tools */}
        <div className="mb-[32px]">
          <p className="text-white/50 text-[14px] mb-[16px]">Agent Tools</p>
          <div className="flex items-center gap-[8px] flex-wrap">
            {tools.map((tool, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setActiveToolIndex(index)}
                onHoverEnd={() => setActiveToolIndex(null)}
                className={`relative w-[40px] h-[40px] ${tool.color} rounded-[8px] flex items-center justify-center cursor-pointer transition-shadow hover:shadow-[0_8px_20px_rgba(168,85,247,0.3)]`}
              >
                <tool.icon className="w-[20px] h-[20px] text-white" />
                
                {/* Tooltip */}
                {activeToolIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-[35px] left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[11px] px-2 py-1 rounded-[6px] whitespace-nowrap pointer-events-none shadow-lg"
                  >
                    {tool.name}
                    <div className="absolute -bottom-[4px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-zinc-900" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Key Statistics */}
        <div className="space-y-[20px]">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-[16px] h-[16px] text-green-400" />
            <p className="text-white/50 text-[14px]">Key Statistics</p>
          </div>
          
          {/* Response Accuracy with animated chart */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-zinc-900/50 rounded-[16px] p-[20px] border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer"
          >
            <div className="flex items-end justify-between mb-[12px]">
              <div>
                <p className="text-white/60 text-[12px] mb-1">Response Accuracy</p>
                <motion.p 
                  key={accuracyData[accuracyData.length - 1]}
                  initial={{ scale: 1.2, color: "#a855f7" }}
                  animate={{ scale: 1, color: "#ffffff" }}
                  className="text-[32px] text-white"
                >
                  {accuracyData[accuracyData.length - 1]}%
                </motion.p>
                <motion.p 
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-green-400 text-[12px]"
                >
                  +6.64%
                </motion.p>
              </div>
              <div className="h-[60px] w-[120px] relative">
                <svg viewBox="0 0 120 60" className="w-full h-full">
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#a855f7" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d={`M 0 ${60 - (accuracyData[0] - 85) * 4} 
                        ${accuracyData.map((val, i) => `L ${i * 17} ${60 - (val - 85) * 4}`).join(' ')}
                        L 120 60 L 0 60 Z`}
                    fill="url(#gradient1)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />
                  <motion.path
                    d={`M 0 ${60 - (accuracyData[0] - 85) * 4} 
                        ${accuracyData.map((val, i) => `L ${i * 17} ${60 - (val - 85) * 4}`).join(' ')}`}
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />
                  {/* Animated dot at the end */}
                  <motion.circle
                    cx="119"
                    cy={60 - (accuracyData[accuracyData.length - 1] - 85) * 4}
                    r="3"
                    fill="#a855f7"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Customer Satisfaction & Task Completion */}
          <div className="flex gap-[12px]">
            <motion.div 
              whileHover={{ scale: 1.05, y: -4 }}
              className="flex-1 bg-zinc-900/50 rounded-[16px] p-[20px] border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer"
            >
              <p className="text-white/60 text-[12px] mb-2">Customer Satisfaction</p>
              <motion.p 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-[28px] text-white"
              >
                96%
              </motion.p>
              <div className="mt-2 h-[4px] bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "96%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                />
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, y: -4 }}
              className="flex-1 bg-zinc-900/50 rounded-[16px] p-[20px] border border-white/5 hover:border-green-500/30 transition-all cursor-pointer"
            >
              <p className="text-white/60 text-[12px] mb-2">Task Completion Rate</p>
              <motion.p 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="text-[28px] text-white"
              >
                91%
              </motion.p>
              <div className="mt-2 h-[4px] bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "91%" }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
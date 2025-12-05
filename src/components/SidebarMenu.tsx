import { motion } from "motion/react";
import { 
  Home, 
  Mic, 
  Settings
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  { icon: Home, label: "Home" },
  { icon: Mic, label: "Voice Assistant" },
  { icon: Settings, label: "Settings" },
];

interface SidebarMenuProps {
  onSettingsClick?: () => void;
  onDiscordClick?: () => void;
  isLoggedIn?: boolean;
  username?: string;
}

export function SidebarMenu({ onSettingsClick, onDiscordClick, isLoggedIn = false, username = '' }: SidebarMenuProps) {
  const [activeItem, setActiveItem] = useState("Voice Assistant");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isDiscordHovered, setIsDiscordHovered] = useState(false);

  const handleItemClick = (label: string) => {
    setActiveItem(label);
    if (label === "Settings" && onSettingsClick) {
      onSettingsClick();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-[300px] bg-white/[0.04] backdrop-blur-2xl rounded-[16px] border border-white/[0.08] p-[16px] max-xl:max-w-full shadow-[0_4px_24px_rgba(0,0,0,0.2)] relative overflow-hidden"
    >
      {/* Glossy overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none rounded-[16px]" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="relative z-10 space-y-[8px]">
        {/* Discord Login Button - ABOVE Home */}
        <motion.button
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            delay: 0.1,
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
          onClick={onDiscordClick}
          onMouseEnter={() => setIsDiscordHovered(true)}
          onMouseLeave={() => setIsDiscordHovered(false)}
          whileHover={{ x: 2, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full relative group h-[48px] mb-[4px]"
        >
          {/* Animated gradient background */}
          <motion.div
            initial={false}
            animate={{
              opacity: isDiscordHovered ? 1 : isLoggedIn ? 0.7 : 0.4,
              scale: isDiscordHovered ? 1 : 0.98,
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-r from-[#5865F2] to-[#7289DA] rounded-[12px] border border-[#5865F2]/30"
            style={{
              boxShadow: isDiscordHovered 
                ? '0 0 25px rgba(88,101,242,0.4), 0 4px 12px rgba(88,101,242,0.3)' 
                : isLoggedIn
                ? '0 0 15px rgba(88,101,242,0.2)'
                : 'none',
            }}
          />

          {/* Shimmer effect on hover */}
          {isDiscordHovered && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-[12px]"
              style={{ willChange: 'transform' }}
            />
          )}

          <div className="relative flex items-center gap-[12px] px-[12px] h-full">
            {isLoggedIn ? (
              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 15
                }}
                className="w-[24px] h-[24px] rounded-full bg-gradient-to-br from-[#3A82FF] to-[#2CCBFF] flex items-center justify-center shadow-lg"
              >
                <motion.span 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-[12px] text-white" 
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                >
                  {username.charAt(0).toUpperCase()}
                </motion.span>
              </motion.div>
            ) : (
              <motion.div
                animate={{ 
                  rotate: isDiscordHovered ? [0, -10, 10, -10, 0] : 0,
                  scale: isDiscordHovered ? [1, 1.1, 1] : 1
                }}
                transition={{ 
                  duration: 0.5,
                  ease: "easeInOut"
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 71 55"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0)">
                    <path
                      d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"
                      fill="white"
                      fillOpacity={isDiscordHovered ? "0.95" : "0.85"}
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width="71" height="55" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </motion.div>
            )}

            <div className="flex flex-col items-start gap-[2px]">
              <motion.span 
                animate={{ 
                  color: isDiscordHovered ? '#FFFFFF' : isLoggedIn ? '#E3EBFF' : '#FFFFFF'
                }}
                className="text-[14px] transition-colors"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                {isLoggedIn ? username.split('#')[0] : 'Discord Login'}
              </motion.span>
              {isLoggedIn && (
                <motion.span
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10px] text-white/60"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  #{username.split('#')[1]}
                </motion.span>
              )}
            </div>

            {/* Status indicator for logged in state */}
            {isLoggedIn && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="ml-auto"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.8, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-[8px] h-[8px] rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]"
                />
              </motion.div>
            )}
          </div>

          {/* Glow effect on bottom edge when hovered */}
          {isDiscordHovered && (
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0 }}
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full"
            />
          )}
        </motion.button>

        {/* Divider */}
        <div className="py-[8px]">
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent origin-center"
          />
        </div>

        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeItem === item.label;
          const isHovered = hoveredItem === item.label;

          return (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 * (index + 1) }}
              onClick={() => handleItemClick(item.label)}
              onMouseEnter={() => setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full relative group h-[44px]"
            >
              {/* Active/Hover background */}
              <motion.div
                initial={false}
                animate={{
                  opacity: isActive ? 1 : isHovered ? 0.5 : 0,
                  scale: isActive ? 1 : isHovered ? 0.98 : 0.95,
                }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-[rgba(58,130,255,0.15)] rounded-[12px] border border-[#3A82FF]/20"
                style={{
                  boxShadow: isHovered ? '0 0 20px rgba(58,130,255,0.1)' : 'none',
                }}
              />

              <div className="relative flex items-center gap-[12px] px-[12px] h-full">
                <Icon 
                  className={`transition-colors ${
                    isActive 
                      ? "text-[#3A82FF]" 
                      : "text-white/60"
                  }`}
                  style={{ width: '18px', height: '18px' }}
                />
                <span 
                  className={`text-[14px] transition-colors ${
                    isActive 
                      ? "text-[#E3EBFF]" 
                      : "text-white/70"
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  {item.label}
                </span>
              </div>

              {/* Active indicator line */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[60%] bg-gradient-to-b from-[#3A82FF] to-[#2CCBFF] rounded-r-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
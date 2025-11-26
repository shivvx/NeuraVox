import { motion, AnimatePresence } from "motion/react";
import { X, Github, Linkedin } from "lucide-react";
import { SidebarMenu } from "./SidebarMenu";
import { RecentConversations } from "./RecentConversations";
import { MurfVoicePanel } from "./MurfVoicePanel";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsClick: () => void;
  onDiscordClick: () => void;
  isLoggedIn: boolean;
  username: string;
}

export function MobileMenu({ 
  isOpen, 
  onClose, 
  onSettingsClick,
  onDiscordClick,
  isLoggedIn,
  username 
}: MobileMenuProps) {
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] md:hidden"
          />

          {/* Mobile Menu Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 w-full max-w-[340px] bg-[#0A0F1F] border-r border-white/10 z-[101] overflow-y-auto md:hidden"
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#0A0F1F]/95 backdrop-blur-xl border-b border-white/10 p-[24px] flex items-center justify-between z-10">
              <h2 
                className="text-[20px] text-white"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
              >
                Menu
              </h2>
              <button
                onClick={onClose}
                className="w-[32px] h-[32px] rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-center transition-colors"
              >
                <X className="w-[18px] h-[18px] text-white/70" />
              </button>
            </div>

            {/* Content */}
            <div className="p-[20px] space-y-[24px]">
              {/* Sidebar Menu Section */}
              <div>
                <h3 
                  className="text-[14px] text-white/50 mb-[12px] px-[4px]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  Navigation
                </h3>
                <SidebarMenu 
                  onSettingsClick={() => {
                    onSettingsClick();
                    onClose();
                  }}
                  onDiscordClick={onDiscordClick}
                  isLoggedIn={isLoggedIn}
                  username={username}
                />
              </div>

              {/* Recent Conversations Section */}
              <div>
                <h3 
                  className="text-[14px] text-white/50 mb-[12px] px-[4px]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  Recent
                </h3>
                <RecentConversations />
              </div>

              {/* Murf Voice Panel Section */}
              <div>
                <h3 
                  className="text-[14px] text-white/50 mb-[12px] px-[4px]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  Voice Settings
                </h3>
                <MurfVoicePanel />
              </div>
            </div>

            {/* Footer Info */}
            <div className="sticky bottom-0 left-0 right-0 p-[24px] border-t border-white/10 bg-[#0A0F1F]/95 backdrop-blur-xl">
              <div className="p-[16px] bg-white/[0.02] border border-white/[0.06] rounded-[10px] space-y-[12px]">
                {/* Copyright */}
                <p 
                  className="text-[11px] text-white/40 text-center"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  © 2025 Shivam Kumar & Kalash Tiwari
                  <br />
                  All Rights Reserved.
                </p>

                {/* Credits Section */}
                <div className="space-y-[8px] pt-[8px] border-t border-white/[0.06]">
                  <p 
                    className="text-[10px] text-[#3A82FF] text-center"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                  >
                    Credits:
                  </p>
                  
                  {/* Shivam Kumar */}
                  <div className="space-y-[4px]">
                    <p 
                      className="text-[10px] text-[#A2B2D9]/80 text-center"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Designed and Developed by Shivam Kumar
                    </p>
                    <div className="flex items-center justify-center gap-[6px]">
                      <motion.a
                        href="https://linkedin.com/in/shivvx"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(58, 130, 255, 0.15)' }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-[4px] px-[8px] py-[4px] bg-white/[0.04] hover:bg-[#3A82FF]/10 border border-white/[0.08] rounded-[6px] transition-colors"
                      >
                        <Linkedin className="w-[12px] h-[12px] text-[#3A82FF]" />
                        <span 
                          className="text-[9px] text-[#E3EBFF]"
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                        >
                          LinkedIn
                        </span>
                      </motion.a>
                      <motion.a
                        href="https://github.com/shivvx"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(58, 130, 255, 0.15)' }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-[4px] px-[8px] py-[4px] bg-white/[0.04] hover:bg-[#3A82FF]/10 border border-white/[0.08] rounded-[6px] transition-colors"
                      >
                        <Github className="w-[12px] h-[12px] text-[#3A82FF]" />
                        <span 
                          className="text-[9px] text-[#E3EBFF]"
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                        >
                          GitHub
                        </span>
                      </motion.a>
                    </div>
                  </div>

                  {/* Kalash Tiwari */}
                  <div className="space-y-[4px]">
                    <p 
                      className="text-[10px] text-[#A2B2D9]/80 text-center"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Backend and Managed by Kalash Tiwari
                    </p>
                    <div className="flex items-center justify-center gap-[6px]">
                      <motion.a
                        href="https://www.linkedin.com/in/kalash-tiwari-382324329/"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(58, 130, 255, 0.15)' }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-[4px] px-[8px] py-[4px] bg-white/[0.04] hover:bg-[#3A82FF]/10 border border-white/[0.08] rounded-[6px] transition-colors"
                      >
                        <Linkedin className="w-[12px] h-[12px] text-[#3A82FF]" />
                        <span 
                          className="text-[9px] text-[#E3EBFF]"
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                        >
                          LinkedIn
                        </span>
                      </motion.a>
                      <motion.a
                        href="https://github.com/ScientistKalash"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(58, 130, 255, 0.15)' }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-[4px] px-[8px] py-[4px] bg-white/[0.04] hover:bg-[#3A82FF]/10 border border-white/[0.08] rounded-[6px] transition-colors"
                      >
                        <Github className="w-[12px] h-[12px] text-[#3A82FF]" />
                        <span 
                          className="text-[9px] text-[#E3EBFF]"
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                        >
                          GitHub
                        </span>
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
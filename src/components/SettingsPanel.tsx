import { motion, AnimatePresence } from "motion/react";
import { X, User, Crown, Palette, Settings as SettingsIcon, HelpCircle, LogOut, ChevronRight, Github, Linkedin } from "lucide-react";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const handleEditProfile = () => {
    alert('Edit Profile - Navigate to profile editing page');
  };

  const handleUpgradePlan = () => {
    alert('Upgrade Plan - Navigate to subscription page');
  };

  const handlePersonalization = () => {
    alert('Personalization - Navigate to personalization settings');
  };

  const handleSettings = () => {
    alert('Settings - Navigate to app settings');
  };

  const handleHelp = () => {
    alert('Help - Navigate to help center');
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      alert('Logged out successfully!');
      onClose();
    }
  };

  const menuItems = [
    { icon: User, label: 'Edit profile', onClick: handleEditProfile, hasChevron: false },
    { icon: Crown, label: 'Upgrade plan', onClick: handleUpgradePlan, hasChevron: false },
    { icon: Palette, label: 'Personalization', onClick: handlePersonalization, hasChevron: false },
    { icon: SettingsIcon, label: 'Settings', onClick: handleSettings, hasChevron: false },
    { icon: HelpCircle, label: 'Help', onClick: handleHelp, hasChevron: true },
    { icon: LogOut, label: 'Log out', onClick: handleLogout, hasChevron: false },
  ];

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
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-[320px] bg-[#0A0F1F] border-l border-white/10 z-[101] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#0A0F1F]/95 backdrop-blur-xl border-b border-white/10 p-[24px] flex items-center justify-between z-10">
              <h2 
                className="text-[20px] text-[#E3EBFF]"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                Account
              </h2>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-[32px] h-[32px] rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-center transition-colors"
              >
                <X className="w-[18px] h-[18px] text-[#E3EBFF]" />
              </motion.button>
            </div>

            {/* Menu Items */}
            <div className="p-[16px]">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isLogout = item.label === 'Log out';
                const needsSeparator = item.label === 'Settings';
                
                return (
                  <div key={item.label}>
                    <motion.button
                      whileHover={{ x: 4, backgroundColor: 'rgba(58, 130, 255, 0.08)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={item.onClick}
                      className={`w-full flex items-center justify-between p-[14px] rounded-[10px] transition-colors group ${
                        isLogout 
                          ? 'hover:bg-[#FF4F6B]/10' 
                          : 'hover:bg-[#3A82FF]/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-[20px] h-[20px] flex items-center justify-center ${
                          isLogout ? 'text-[#FF4F6B]' : 'text-[#3A82FF]'
                        }`}>
                          <Icon className="w-[20px] h-[20px]" />
                        </div>
                        <span 
                          className={`text-[15px] ${
                            isLogout ? 'text-[#FF4F6B]' : 'text-[#E3EBFF]'
                          }`}
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                        >
                          {item.label}
                        </span>
                      </div>
                      {item.hasChevron && (
                        <ChevronRight className="w-[18px] h-[18px] text-[#A2B2D9]/50 group-hover:text-[#3A82FF] transition-colors" />
                      )}
                    </motion.button>
                    {needsSeparator && (
                      <div className="my-[8px] h-[1px] bg-white/[0.08]" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Footer Info */}
            <div className="absolute bottom-0 left-0 right-0 p-[24px] border-t border-white/10 bg-[#0A0F1F]/95 backdrop-blur-xl">
              {/* Copyright Section */}
              <div className="mb-[20px] p-[16px] bg-white/[0.02] border border-white/[0.06] rounded-[10px]">
                <p 
                  className="text-[13px] text-[#E3EBFF] mb-[12px]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  Copyright © 2025
                </p>
                <p 
                  className="text-[12px] text-[#A2B2D9] mb-[8px]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  Shivam Kumar & Kalash Tiwari
                </p>
                <p 
                  className="text-[11px] text-[#A2B2D9]/70 leading-[1.6] mb-[12px]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  All rights reserved. This project and its source code are the intellectual property of Shivam Kumar & Kalash Tiwari. Unauthorized copying, modification, distribution, or use of any part of this project, via any medium, is strictly prohibited unless explicit permission is granted by the owners.
                </p>
                
                {/* Credits Section with Social Links */}
                <div className="space-y-[8px] mb-[12px]">
                  <p 
                    className="text-[11px] text-[#3A82FF]"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                  >
                    Credits:
                  </p>
                  
                  {/* Shivam Kumar */}
                  <div className="space-y-[4px]">
                    <p 
                      className="text-[11px] text-[#A2B2D9]/80"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Designed and Developed by Shivam Kumar
                    </p>
                    <div className="flex items-center gap-[8px]">
                      <motion.a
                        href="https://linkedin.com/in/shivvx"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(58, 130, 255, 0.15)' }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-[6px] px-[10px] py-[6px] bg-white/[0.04] hover:bg-[#3A82FF]/10 border border-white/[0.08] rounded-[6px] transition-colors"
                      >
                        <Linkedin className="w-[14px] h-[14px] text-[#3A82FF]" />
                        <span 
                          className="text-[10px] text-[#E3EBFF]"
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
                        className="flex items-center gap-[6px] px-[10px] py-[6px] bg-white/[0.04] hover:bg-[#3A82FF]/10 border border-white/[0.08] rounded-[6px] transition-colors"
                      >
                        <Github className="w-[14px] h-[14px] text-[#3A82FF]" />
                        <span 
                          className="text-[10px] text-[#E3EBFF]"
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
                      className="text-[11px] text-[#A2B2D9]/80"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Backend and Managed by Kalash Tiwari
                    </p>
                    <div className="flex items-center gap-[8px]">
                      <motion.a
                        href="https://www.linkedin.com/in/kalash-tiwari-382324329/"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(58, 130, 255, 0.15)' }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-[6px] px-[10px] py-[6px] bg-white/[0.04] hover:bg-[#3A82FF]/10 border border-white/[0.08] rounded-[6px] transition-colors"
                      >
                        <Linkedin className="w-[14px] h-[14px] text-[#3A82FF]" />
                        <span 
                          className="text-[10px] text-[#E3EBFF]"
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
                        className="flex items-center gap-[6px] px-[10px] py-[6px] bg-white/[0.04] hover:bg-[#3A82FF]/10 border border-white/[0.08] rounded-[6px] transition-colors"
                      >
                        <Github className="w-[14px] h-[14px] text-[#3A82FF]" />
                        <span 
                          className="text-[10px] text-[#E3EBFF]"
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                        >
                          GitHub
                        </span>
                      </motion.a>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-[4px]">
                  <p 
                    className="text-[11px] text-[#3A82FF]"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                  >
                    For collaboration or commercial usage:
                  </p>
                  <p 
                    className="text-[11px] text-[#A2B2D9]/80"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Shivam Kumar (shivvx.me)
                  </p>
                  <p 
                    className="text-[11px] text-[#A2B2D9]/80"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Kalash Tiwari
                  </p>
                </div>
              </div>

              {/* Version Info */}
              <div className="text-center">
                <p 
                  className="text-[12px] text-[#A2B2D9]/50"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Version 1.0.0
                </p>
                <p 
                  className="text-[12px] text-[#A2B2D9]/50 mt-[4px]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Murf AI Voice Assistant
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
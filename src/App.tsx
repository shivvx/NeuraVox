import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { Navigation } from "./components/Navigation";
import { Visualizer } from "./components/Visualizer";
import { StatusText } from "./components/StatusText";
import { ChatMessages } from "./components/ChatMessages";
import { AnimatedBubbles } from "./components/AnimatedBubbles";
import { MurfVoicePanel } from "./components/MurfVoicePanel";
import { SidebarMenu } from "./components/SidebarMenu";
import { RecentConversations } from "./components/RecentConversations";
import { SettingsPanel } from "./components/SettingsPanel";
import { FloatingMic } from "./components/FloatingMic";
import { EntranceAnimation } from "./components/EntranceAnimation";
import { MobileMenu } from "./components/MobileMenu";

type VoiceState = 'idle' | 'listening' | 'processing' | 'speaking';

interface Message {
  id: string;
  type: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export default function App() {
  const [state, setState] = useState<VoiceState>('idle');
  const [inputValue, setInputValue] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isInputHovered, setIsInputHovered] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      text: 'Hello! I\'m your AI voice assistant. How can I help you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [showSettings, setShowSettings] = useState(false);
  const [showEntrance, setShowEntrance] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  // Prevent viewport zoom on mobile
  useEffect(() => {
    const handleResize = () => {
      // Update CSS custom property for real viewport height
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  const handleDiscordLogin = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      setUsername('');
    } else {
      // Simulate Discord OAuth login
      const mockUsername = 'UserName#1234';
      setUsername(mockUsername);
      setIsLoggedIn(true);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/wav' });
        await processAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      setMediaRecorder(recorder);
      recorder.start();
    } catch (error) {
      console.error('Error starting recording:', error);
      setState('idle');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
    }
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const processAudio = async (audioBlob: Blob) => {
    try {
      setState('processing');

      const base64Audio = await blobToBase64(audioBlob);

      const response = await fetch('http://localhost:3002/api/pipeline', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ audio: base64Audio }),
      });

      if (!response.ok) {
        throw new Error('Failed to process audio');
      }

      const data = await response.json();

      // Add user transcript message
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        text: data.transcription,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, userMessage]);

      // Add AI response message
      setState('speaking');
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        text: data.aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMessage]);

      // Play TTS audio
      if (data.speechAudio) {
        const audio = new Audio(`data:audio/wav;base64,${data.speechAudio}`);
        audio.onended = () => setState('idle');
        audio.play().catch(error => {
          console.error('Error playing audio:', error);
          setState('idle');
        });
      } else {
        setTimeout(() => setState('idle'), 2000);
      }
    } catch (error) {
      console.error('Error processing audio:', error);
      setState('idle');
    }
  };

  const handleToggleMic = () => {
    if (state === 'idle') {
      setState('listening');
      startRecording();
    } else if (state === 'listening') {
      stopRecording();
      setState('idle');
    }
  };

  const handleStopRecording = () => {
    stopRecording();
    setState('idle');
  };

  const processText = async (text: string) => {
    try {
      setState('processing');

      const response = await fetch('http://localhost:3002/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to process text');
      }

      const data = await response.json();

      // Add AI response message
      setState('speaking');
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMessage]);

      // Return to idle after speaking
      setTimeout(() => setState('idle'), 2000);
    } catch (error) {
      console.error('Error processing text:', error);
      setState('idle');
    }
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const textToSend = inputValue;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Process text with AI
    processText(textToSend);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && inputValue.trim()) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: '1',
        type: 'ai',
        text: 'Hello! I\'m your AI voice assistant. How can I help you today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="relative w-full min-h-screen min-h-screen-real bg-[#0A0F1F] overflow-hidden text-white">
      {/* Animated Bubbles Animation */}
      <AnimatedBubbles />
      
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] max-sm:w-[300px] max-sm:h-[300px] bg-[#3A82FF]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] max-sm:w-[300px] max-sm:h-[300px] bg-[#2CCBFF]/10 rounded-full blur-[150px]" />
      </div>

      {/* Navigation */}
      <AnimatePresence mode="wait">
        {!showEntrance && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Navigation isActive={state !== 'idle'} status={state} onMenuClick={() => setShowMobileMenu(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {!showEntrance && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative z-10 min-h-screen px-[60px] max-lg:px-[30px] max-md:px-[20px] max-sm:px-[16px]"
            style={{
              paddingTop: 'clamp(80px, 15vh, 120px)',
              paddingBottom: 'clamp(240px, 35vh, 400px)'
            }}
          >
            <div className="max-w-[1400px] mx-auto">
              <div className="grid grid-cols-[300px_1fr_300px] gap-[40px] max-lg:gap-[24px] items-start max-xl:grid-cols-1 max-xl:max-w-[900px] max-xl:mx-auto max-sm:gap-[20px]">
                {/* Left Panel - Sidebar Menu & Recent Conversations - Hidden on Mobile */}
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="space-y-[24px] max-xl:order-2 max-sm:space-y-[16px] max-md:hidden"
                >
                  <SidebarMenu 
                    onSettingsClick={() => setShowSettings(true)}
                    onDiscordClick={handleDiscordLogin}
                    isLoggedIn={isLoggedIn}
                    username={username}
                  />
                  <RecentConversations messages={messages} />
                </motion.div>

                {/* Center - Visualizer, Status Text & Chat Messages */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="flex flex-col items-center justify-start gap-6 max-xl:order-first max-sm:gap-4 mb-[20px]"
                >
                  <Visualizer state={state} />
                  <StatusText state={state} />
                  <ChatMessages messages={messages} isThinking={state === 'processing'} />
                </motion.div>

                {/* Right Panel - Murf Voice Settings - Hidden on Mobile */}
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="max-xl:order-3 max-md:hidden"
                >
                  <MurfVoicePanel />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Input Bar */}
      <AnimatePresence mode="wait">
        {!showEntrance && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="fixed bottom-[64px] max-sm:bottom-[16px] left-1/2 transform -translate-x-1/2 w-full max-w-[800px] max-sm:max-w-[calc(100%-32px)] px-[20px] max-sm:px-0 z-30"
          >
            {/* Floating Mic */}
            <div className="absolute -top-[64px] max-sm:-top-[56px] left-1/2 transform -translate-x-1/2 z-10">
              <FloatingMic
                isListening={state === 'listening'}
                onToggle={handleToggleMic}
                onStop={handleStopRecording}
                state={state}
              />
            </div>

            <div className={`snake-border-wrapper ${(isInputFocused || isInputHovered) ? 'active' : ''} rounded-[14px] max-sm:rounded-[12px]`}
              onMouseEnter={() => setIsInputHovered(true)}
              onMouseLeave={() => setIsInputHovered(false)}
            >
              <div className="relative bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] rounded-[14px] max-sm:rounded-[12px] max-sm:bg-white/[0.02] max-sm:border-white/[0.05] shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden">
                {/* Glossy overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none rounded-[14px] max-sm:rounded-[12px]" />
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="relative z-10 w-full h-[56px] max-sm:h-[48px] bg-transparent px-[24px] max-sm:px-[16px] pr-[60px] max-sm:pr-[52px] text-[#E3EBFF] placeholder:text-[#A2B2D9] text-[14px] max-sm:text-[16px] focus:outline-none"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="absolute right-[8px] max-sm:right-[6px] top-1/2 transform -translate-y-1/2 w-[40px] h-[40px] max-sm:w-[36px] max-sm:h-[36px] bg-gradient-to-r from-[#3A82FF] to-[#2CCBFF] rounded-[12px] max-sm:rounded-[10px] flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg z-20"
                >
                  <Send className="w-[18px] h-[18px] max-sm:w-[16px] max-sm:h-[16px] text-white" />
                </motion.button>
              </div>
            </div>

            {/* Copyright Notice Below Input */}
            <div className="mt-[12px] max-sm:mt-[8px] text-center">
              <p 
                className="text-[12px] max-sm:text-[10px] text-[#A2B2D9]/70"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                © 2025 Shivam Kumar & Kalash Tiwari • All Rights Reserved.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Panel */}
      <SettingsPanel 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={showMobileMenu}
        onClose={() => setShowMobileMenu(false)}
        onSettingsClick={() => setShowSettings(true)}
        onDiscordClick={handleDiscordLogin}
        isLoggedIn={isLoggedIn}
        username={username}
      />

      {/* Entrance Animation */}
      {showEntrance && (
        <EntranceAnimation onComplete={() => setShowEntrance(false)} />
      )}
    </div>
  );
}
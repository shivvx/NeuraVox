import { motion, AnimatePresence } from "motion/react";
import { User, Bot } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ScrollToLatest } from "./ScrollToLatest";
import { ThinkingBubble } from "./ThinkingBubble";

interface Message {
  id: string;
  type: 'user' | 'ai';
  text: string;
  timestamp: string;
}

interface ChatMessagesProps {
  messages: Message[];
  isThinking?: boolean;
}

export function ChatMessages({ messages, isThinking = false }: ChatMessagesProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Auto-scroll to latest message
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const isScrolledToBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 100;
      
      if (isScrolledToBottom) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [messages]);

  // Handle scroll to check if user is at bottom
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const isScrolledToBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 100;
      setShowScrollButton(!isScrolledToBottom);
    }
  };

  // Scroll to latest message
  const scrollToLatest = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative w-full max-w-[720px] max-sm:max-w-full mx-auto">
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="w-full overflow-y-auto custom-scrollbar px-[48px] max-sm:px-[16px]"
        style={{
          height: 'clamp(250px, 30vh, 400px)',
          maxHeight: 'calc(100vh - 500px)'
        }}
      >
        <div className="space-y-[10px] max-sm:space-y-[8px] py-4 max-sm:py-3">
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ 
                  duration: 0.12, 
                  ease: "easeOut",
                  delay: index * 0.02 
                }}
                className={`flex gap-3 max-sm:gap-2 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.05, type: "spring", stiffness: 300 }}
                  className={`flex-shrink-0 w-[24px] h-[24px] max-sm:w-[20px] max-sm:h-[20px] rounded-full flex items-center justify-center ${
                    message.type === 'user'
                      ? 'bg-gradient-to-br from-purple-500 to-blue-500'
                      : 'bg-gradient-to-br from-blue-500 to-purple-500'
                  }`}
                >
                  {message.type === 'user' ? (
                    <User className="w-[12px] h-[12px] max-sm:w-[10px] max-sm:h-[10px] text-white" />
                  ) : (
                    <Bot className="w-[12px] h-[12px] max-sm:w-[10px] max-sm:h-[10px] text-white" />
                  )}
                </motion.div>

                {/* Message Bubble */}
                <div className={`flex flex-col gap-1 max-w-[70%] max-sm:max-w-[75%] ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.12, ease: "easeOut" }}
                    className={`px-[16px] max-sm:px-[12px] py-[12px] max-sm:py-[10px] rounded-[18px] max-sm:rounded-[14px] ${
                      message.type === 'user'
                        ? 'bg-white/[0.06] border border-white/[0.08]'
                        : 'bg-[rgba(58,130,255,0.10)] border border-[rgba(58,130,255,0.25)]'
                    }`}
                  >
                    <p 
                      className={`text-[14px] max-sm:text-[13px] leading-relaxed break-words ${
                        message.type === 'user' ? 'text-[#E3EBFF]' : 'text-[#CDE5FF]'
                      }`} 
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {message.text}
                    </p>
                  </motion.div>

                  {/* Timestamp */}
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className={`text-[11px] max-sm:text-[10px] text-[#A2B2D9]/50 px-2 ${message.type === 'user' ? 'text-right' : 'text-left'}`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {message.timestamp}
                  </motion.span>
                </div>
              </motion.div>
            ))}

            {/* Thinking Bubble */}
            {isThinking && (
              <motion.div
                key="thinking-bubble"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.12, ease: "easeOut" }}
              >
                <ThinkingBubble />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Scroll to Latest Button */}
      <ScrollToLatest show={showScrollButton} onClick={scrollToLatest} />
    </div>
  );
}
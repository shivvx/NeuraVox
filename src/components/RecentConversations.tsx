import { motion } from "motion/react";
import { Clock } from "lucide-react";
import { useState, useEffect } from "react";

interface Message {
  id: string;
  type: 'user' | 'ai';
  text: string;
  timestamp: string;
}

interface RecentConversationsProps {
  messages: Message[];
}

export function RecentConversations({ messages }: RecentConversationsProps) {
  const [selectedConv, setSelectedConv] = useState<string | null>(null);

  // Generate conversations from messages
  const conversations = useState(() => {
    const convs = [];
    let currentConv: Message[] = [];
    let convId = 1;

    for (const msg of messages) {
      if (msg.type === 'user') {
        if (currentConv.length > 0) {
          // Save previous conversation
          const title = currentConv[0].text.length > 30
            ? currentConv[0].text.substring(0, 30) + '...'
            : currentConv[0].text;
          convs.push({
            id: convId.toString(),
            title,
            time: currentConv[0].timestamp,
            messages: [...currentConv]
          });
          convId++;
        }
        currentConv = [msg];
      } else if (msg.type === 'ai' && currentConv.length > 0) {
        currentConv.push(msg);
      }
    }

    // Add the last conversation if exists
    if (currentConv.length > 0) {
      const title = currentConv[0].text.length > 30
        ? currentConv[0].text.substring(0, 30) + '...'
        : currentConv[0].text;
      convs.push({
        id: convId.toString(),
        title,
        time: currentConv[0].timestamp,
        messages: [...currentConv]
      });
    }

    return convs.reverse(); // Most recent first
  })[0];

  const handleSelectConversation = (id: string) => {
    setSelectedConv(id);
    // In a real app, this would load the conversation history
    console.log(`Loading conversation: ${id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="w-full max-w-[300px] bg-white/[0.04] backdrop-blur-2xl rounded-[16px] border border-white/[0.06] p-[14px] max-xl:max-w-full shadow-[0_4px_24px_rgba(0,0,0,0.2)] relative overflow-hidden"
    >
      {/* Glossy overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none rounded-[16px]" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="relative z-10">
        <h3 
          className="text-[14px] text-[#E3EBFF]/70 mb-[12px] px-[4px]"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
        >
          Recent Conversations
        </h3>
        
        <div className="space-y-[8px]">
          {conversations.map((conv, index) => (
            <motion.button
              key={conv.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              onClick={() => handleSelectConversation(conv.id)}
              whileHover={{ x: 2, backgroundColor: 'rgba(255,255,255,0.03)' }}
              whileTap={{ scale: 0.98 }}
              className={`w-full text-left p-[12px] rounded-[12px] border transition-all ${
                selectedConv === conv.id 
                  ? 'border-[#3A82FF]/40 bg-[rgba(58,130,255,0.08)]' 
                  : 'border-white/5 hover:border-white/10'
              }`}
            >
              <p 
                className={`text-[13px] mb-[6px] ${
                  selectedConv === conv.id ? 'text-[#3A82FF]' : 'text-[#E3EBFF]/80'
                }`}
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                {conv.title}
              </p>
              <div className="flex items-center gap-[6px]">
                <Clock className="w-[11px] h-[11px] text-[#A2B2D9]/50" />
                <span 
                  className="text-[11px] text-[#A2B2D9]/50"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {conv.time}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
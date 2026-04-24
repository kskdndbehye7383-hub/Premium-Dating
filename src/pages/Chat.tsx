import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Send, MoreVertical, Flame } from "lucide-react";
import { INITIAL_MATCHES, INITIAL_MESSAGES, PROFILES, CURRENT_USER } from "../data/mock";
import { cn } from "../lib/utils";
import type { Message } from "../types";

export default function Chat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const match = INITIAL_MATCHES.find(m => m.id === id);
  const profile = PROFILES.find(p => p.id === match?.profileId);

  useEffect(() => {
    if (id && INITIAL_MESSAGES[id]) {
      setMessages(INITIAL_MESSAGES[id]);
    }
  }, [id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!match || !profile) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-400 bg-white shadow-[-4px_0_24px_-10px_rgba(0,0,0,0.05)] border-l border-gray-100">
        <Flame size={48} className="text-gray-200 mb-4" />
        <p className="text-lg">Select a match to start messaging</p>
      </div>
    );
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      matchId: match.id,
      senderId: CURRENT_USER.id,
      content: inputText,
      timestamp: new Date().toISOString()
    };

    setMessages([...messages, newMsg]);
    setInputText("");

    // Simulate auto-reply with a random delay between 1 and 5 seconds
    const randomDelay = Math.floor(Math.random() * 4000) + 1000;
    setTimeout(() => {
      const replyMsg: Message = {
        id: (Date.now() + 1).toString(),
        matchId: match.id,
        senderId: profile.id,
        content: "Oh really? Tell me more! 😊",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, replyMsg]);
    }, randomDelay);
  };

  return (
    <div className="h-full flex flex-col bg-white shadow-[-4px_0_24px_-10px_rgba(0,0,0,0.05)] border-l border-gray-100 z-50">
      {/* Header */}
      <div className="h-20 px-6 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm">
            <img src={profile.images[0]} alt={profile.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 leading-tight">{profile.name}</h2>
            <p className="text-sm text-rose-500 font-medium tracking-wide">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <button onClick={() => alert("User reported and blocked.")} className="p-2.5 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"><MoreVertical size={22} /></button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, index) => {
          const isMe = msg.senderId === CURRENT_USER.id;
          const showAvatar = !isMe && (index === 0 || messages[index - 1].senderId !== profile.id);

          return (
            <div key={msg.id} className={cn("flex flex-col", isMe ? "items-end" : "items-start")}>
              <div className="flex items-end gap-3 max-w-[70%]">
                {!isMe && (
                  <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 mb-1 shadow-sm">
                    {showAvatar ? (
                      <img src={profile.images[0]} alt={profile.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full" /> // Placeholder to align texts
                    )}
                  </div>
                )}
                
                <div className={cn(
                  "px-5 py-3 rounded-2xl text-[15px] leading-[1.5]",
                  isMe 
                    ? "bg-gradient-to-tr from-rose-500 to-pink-500 text-white rounded-br-sm shadow-md shadow-rose-100" 
                    : "bg-gray-50 text-gray-800 rounded-bl-sm border border-gray-100"
                )}>
                  {msg.content}
                </div>
              </div>
              <span className="text-xs text-gray-400 mt-1.5 mx-[44px]">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-100 shrink-0 mx-4 mb-4 rounded-b-2xl">
        <form onSubmit={handleSend} className="relative flex items-center shadow-lg shadow-gray-100/50 rounded-full">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            className="w-full bg-gray-50 border border-gray-100/50 rounded-full pl-6 pr-14 py-4 text-[15px] focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:bg-white focus:border-rose-100 transition-all shadow-inner shadow-gray-50/50"
          />
          <button 
            type="submit" 
            disabled={!inputText.trim()}
            className="absolute right-2 w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-rose-500 to-pink-500 text-white rounded-full hover:shadow-lg hover:shadow-rose-200 disabled:opacity-0 disabled:scale-75 transition-all outline-none"
          >
            <Send size={18} className="ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
}

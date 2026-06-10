import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, Sparkles, AlertCircle, MapPin, Calendar, Star, Users } from 'lucide-react';
import { Message, Plan, User } from '../types';

interface GroupChatProps {
  plan: Plan;
  messages: Message[];
  onBack: () => void;
  onSendMessage: (text: string) => void;
  currentUser: User | null;
  allUsers: User[];
  onConcludePlan: (planId: string) => void;
}

export default function GroupChat({
  plan,
  messages,
  onBack,
  onSendMessage,
  currentUser,
  allUsers,
  onConcludePlan
}: GroupChatProps) {
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to lowest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const participantsCount = plan.joinedUserIds.length;

  return (
    <div className="flex-1 flex flex-col bg-[#FDFAF5]">
      {/* Chat header bar info */}
      <div className="h-12 bg-[#FDFAF5] border-b border-[#ededf2]/55 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <button onClick={onBack} className="p-1 text-[#1A4F7A] hover:bg-[#F5EFE0]/50 rounded-lg">
            <ArrowLeft size={16} />
          </button>
          <div className="min-w-0">
            <h3 className="font-display font-bold text-xs text-[#362E1C] truncate leading-none">
              {plan.title}
            </h3>
            <span className="text-[10px] text-[#574B30]/75 inline-flex items-center gap-0.5 leading-none mt-1">
              <Users size={8} />
              {participantsCount} confirmados activos
            </span>
          </div>
        </div>

        {/* Action: Simulate event happened for ratings */}
        <button
          onClick={() => onConcludePlan(plan.id)}
          className="text-[9px] font-extrabold text-[#1A4F7A] uppercase bg-[#1A4F7A]/10 border border-[#1A4F7A]/20 px-2.5 py-1 rounded-full hover:bg-[#1A4F7A]/15 active:scale-95 transition"
        >
          Finalizar Encontro
        </button>
      </div>

      {/* Safety Closed Notice banner */}
      <div className="bg-[#574B30]/5 px-4 py-2 border-b border-orange-100 flex items-start gap-1 text-[10px] text-[#574B30] shrink-0 font-medium leading-tight">
        <AlertCircle size={12} className="text-amber-600 shrink-0 mt-0.5" />
        <p>Grupo cerrado exclusivo para gente del plan. Se destruirá automáticamente 24hs después del evento.</p>
      </div>

      {/* Message scroll list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {messages.map((msg) => {
          const isMe = currentUser ? msg.userId === currentUser.id : false;
          
          return (
            <div key={msg.id} className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
              {!isMe && (
                <img
                  src={msg.userPhoto}
                  alt={msg.userName}
                  className="w-7 h-7 rounded-full object-cover border border-[#F5EFE0]"
                  referrerPolicy="no-referrer"
                />
              )}
              
              <div className={`max-w-[70%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed shadow-3xs ${
                isMe
                  ? 'bg-[#1A4F7A] text-white rounded-br-none'
                  : 'bg-white text-[#362E1C] border border-[#ededf2]/55 rounded-bl-none'
              }`}>
                {!isMe && (
                  <span className="block text-[9px] font-extrabold uppercase text-[#1A4F7A] mb-0.5">
                    {msg.userName.split(' ')[0]}
                  </span>
                )}
                <p>{msg.text}</p>
                <span className={`block text-[8px] text-right mt-1 opacity-70 ${isMe ? 'text-white' : 'text-[#574B30]'}`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      {/* Input keyboard tray typing bar */}
      <form onSubmit={handleSend} className="bg-white border-t border-[#ededf2] px-4 py-3 shrink-0 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Escribe un mensaje de coordinación..."
          className="flex-1 h-9 px-3 bg-[#FDFAF5] border border-[#ededf2] rounded-full text-xs font-semibold placeholder-[#574B30]/40 focus:outline-none focus:ring-1 focus:ring-[#1A4F7A]"
        />
        <button
          type="submit"
          className="w-9 h-9 bg-[#1A4F7A] hover:bg-[#103D61] text-white rounded-full flex items-center justify-center transition shrink-0 active:scale-95 shadow"
        >
          <Send size={14} className="ml-0.5" />
        </button>
      </form>
    </div>
  );
}

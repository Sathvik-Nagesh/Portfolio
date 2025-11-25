'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  hasAnimated?: boolean;
}

const TypewriterMessage = ({ content, onComplete }: { content: string; onComplete?: () => void }) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayedContent('');
    
    const interval = setInterval(() => {
      if (indexRef.current < content.length) {
        setDisplayedContent((prev) => prev + content.charAt(indexRef.current));
        indexRef.current++;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 15);

    return () => clearInterval(interval);
  }, [content, onComplete]);

  return <span>{displayedContent}</span>;
};

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 'welcome', role: 'assistant', content: 'Hi! I\'m Lumi ✨. Ask me anything about Sathvik\'s projects or skills!', hasAnimated: false }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleAnimationComplete = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, hasAnimated: true } : m));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input, hasAnimated: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      const botMessage: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: data.content,
        hasAnimated: false 
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again later.',
        hasAnimated: false
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-80 md:w-96 bg-black border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px]"
          >
            {/* ... header ... */}
            <div className="p-4 border-b border-neutral-800 bg-neutral-900/50 flex justify-between items-center backdrop-blur-md">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-purple-500/20 rounded-lg">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                    <span className="font-semibold text-white block text-sm">Lumi</span>
                    <span className="text-xs text-neutral-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Online
                    </span>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 text-neutral-400 hover:text-white hover:bg-white/10 rounded-full">
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-neutral-800">
              {messages.map((msg, idx) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex w-full",
                    msg.role === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] p-3 rounded-2xl text-sm",
                      msg.role === 'user'
                        ? "bg-white text-black rounded-br-sm"
                        : "bg-neutral-900 text-neutral-200 border border-neutral-800 rounded-bl-sm"
                    )}
                  >
                    {msg.role === 'assistant' && !msg.hasAnimated && !isLoading ? (
                        <TypewriterMessage 
                            content={msg.content} 
                            onComplete={() => handleAnimationComplete(msg.id)}
                        />
                    ) : (
                        msg.content
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-2xl rounded-bl-sm flex space-x-1 items-center h-10">
                    <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-3 border-t border-neutral-800 bg-neutral-900/30 backdrop-blur-md">
              <div className="flex space-x-2 relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Lumi..."
                  className="bg-neutral-950 border-neutral-800 focus:ring-purple-500/20 focus:border-purple-500/50 text-white pr-10 rounded-xl"
                  disabled={isLoading}
                />
                <Button 
                    type="submit" 
                    size="icon" 
                    disabled={isLoading || !input.trim()} 
                    className="absolute right-1 top-1 h-8 w-8 bg-white text-black hover:bg-neutral-200 rounded-lg transition-all"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white text-black p-4 rounded-full shadow-lg hover:bg-neutral-200 transition-colors relative group"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6 text-purple-600" />}
        {!isOpen && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-black" />
        )}
      </motion.button>
    </div>
  );
};

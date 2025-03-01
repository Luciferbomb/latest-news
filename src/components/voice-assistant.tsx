"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useVoiceAssistant from '@/hooks/useVoiceAssistant';
import { Mic, MicOff, X, Volume2, Loader2 } from 'lucide-react';

interface VoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VoiceAssistant({ isOpen, onClose }: VoiceAssistantProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<{type: 'user' | 'assistant', text: string}[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
    isListening,
    isProcessing,
    isSpeaking,
    transcript,
    response,
    error,
    startListening,
    stopListening
  } = useVoiceAssistant({
    onResult: (result) => {
      // Update the transcript as the user speaks
    },
    onResponse: (response) => {
      // Add the assistant's response to the messages
      setMessages(prev => [
        ...prev,
        { type: 'assistant', text: response.answer }
      ]);
    },
    onError: (error) => {
      console.error('Voice assistant error:', error);
    }
  });
  
  // Scroll to bottom of messages when new ones are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Add user message when transcript is finalized
  useEffect(() => {
    if (!isListening && transcript && !isProcessing) {
      setMessages(prev => [
        ...prev,
        { type: 'user', text: transcript }
      ]);
    }
  }, [isListening, transcript, isProcessing]);
  
  // Reset state when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setMessages([]);
        setIsMinimized(false);
      }, 300);
    }
  }, [isOpen]);
  
  // Define animations for the voice visualizer
  const visualizerVariants = {
    listening: {
      height: [4, 12, 8, 16, 10, 14, 6, 8],
      transition: {
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 1.5,
      },
    },
    idle: {
      height: 4,
    },
    speaking: {
      height: [4, 8, 12, 16, 20, 16, 12, 8, 4],
      transition: {
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 1,
      },
    },
  };
  
  // Generate visualizer bars
  const renderVisualizerBars = () => {
    const barCount = 7;
    const bars = [];
    
    for (let i = 0; i < barCount; i++) {
      bars.push(
        <motion.div
          key={i}
          className="bg-cyan-500 rounded-full w-1 mx-0.5"
          variants={visualizerVariants}
          initial="idle"
          animate={isListening ? "listening" : isSpeaking ? "speaking" : "idle"}
          custom={i}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      );
    }
    
    return bars;
  };
  
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      <motion.div 
        className={`fixed ${isMinimized ? 'bottom-6 right-6' : 'inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div 
          className={`bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-2xl overflow-hidden shadow-2xl border border-neutral-700 ${
            isMinimized ? 'w-16 h-16 p-0' : 'w-full max-w-lg'
          }`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          {isMinimized ? (
            <button 
              onClick={() => setIsMinimized(false)}
              className="w-full h-full flex items-center justify-center rounded-full"
            >
              <div className="flex flex-col items-center">
                <div className="flex justify-center mb-1">
                  {renderVisualizerBars()}
                </div>
              </div>
            </button>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-neutral-700">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">AI</span>
                  </div>
                  <h3 className="ml-3 text-white font-semibold">Tech Voice Assistant</h3>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsMinimized(true)}
                    className="text-neutral-400 hover:text-white p-1 rounded-full hover:bg-neutral-700 transition-colors"
                  >
                    <div className="w-4 h-1 bg-current rounded-full"></div>
                  </button>
                  <button 
                    onClick={onClose}
                    className="text-neutral-400 hover:text-white p-1 rounded-full hover:bg-neutral-700 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
              
              {/* Chat area */}
              <div className="p-4 h-80 overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                      <Volume2 size={32} className="text-white" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">Tech Voice Assistant</h4>
                    <p className="text-neutral-400 text-sm max-w-xs">
                      Ask me anything about AI, technology, programming, or the latest tech news.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div 
                        key={index} 
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`rounded-lg px-4 py-2 max-w-[80%] ${
                            message.type === 'user'
                              ? 'bg-purple-600 text-white'
                              : 'bg-neutral-700 text-white'
                          }`}
                        >
                          {message.text}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>
              
              {/* Voice controls */}
              <div className="p-4 border-t border-neutral-700 bg-neutral-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex h-8 items-center">
                      {renderVisualizerBars()}
                    </div>
                    {isProcessing && (
                      <Loader2 size={18} className="text-cyan-500 animate-spin" />
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    <button
                      onClick={isListening ? stopListening : startListening}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                        isListening
                          ? 'bg-red-500 hover:bg-red-600'
                          : 'bg-cyan-500 hover:bg-cyan-600'
                      }`}
                    >
                      {isListening ? (
                        <MicOff size={20} className="text-white" />
                      ) : (
                        <Mic size={20} className="text-white" />
                      )}
                    </button>
                  </div>
                </div>
                
                {isListening && (
                  <div className="mt-3 text-neutral-300 text-sm">
                    <p>
                      {transcript || "Listening..."}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 
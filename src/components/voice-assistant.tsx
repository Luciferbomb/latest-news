"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useVoiceAssistant from '@/hooks/useVoiceAssistant';
import { Mic, MicOff, X, Volume2, Loader2, AlertCircle } from 'lucide-react';

interface VoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VoiceAssistant({ isOpen, onClose }: VoiceAssistantProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<{type: 'user' | 'assistant' | 'system' | 'error', text: string}[]>([]);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline' | 'error'>('online');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const activeQueryRef = useRef<string | null>(null);
  
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
      // Just using this to track the transcript as the user speaks
    },
    onResponse: (response) => {
      // Add the assistant's response to the messages
      if (activeQueryRef.current) {
        setMessages(prev => [
          ...prev,
          { 
            type: 'assistant', 
            text: response.answer,
          }
        ]);
        activeQueryRef.current = null;
        
        // If we got a response, we must be online
        if (networkStatus !== 'online') {
          setNetworkStatus('online');
        }
      }
    },
    onError: (error) => {
      console.error('Voice assistant error:', error);
      
      // Check if it's a network error
      if (error.includes('502') || error.includes('unavailable') || error.includes('network')) {
        setNetworkStatus('error');
        setMessages(prev => [
          ...prev,
          { 
            type: 'error', 
            text: `Network error: The voice assistant service is currently unavailable. Using local fallback responses.` 
          }
        ]);
      } else {
        // Show error message to user
        setMessages(prev => [
          ...prev,
          { type: 'system', text: `Error: ${error}. Please try again.` }
        ]);
      }
    }
  });
  
  // Check network status
  useEffect(() => {
    const handleOnline = () => setNetworkStatus('online');
    const handleOffline = () => setNetworkStatus('offline');
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Scroll to bottom of messages when new ones are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Add user message when transcript is finalized
  useEffect(() => {
    if (!isListening && transcript && !isProcessing && !activeQueryRef.current) {
      // Set the active query
      activeQueryRef.current = transcript;
      
      // Add user message
      setMessages(prev => [
        ...prev,
        { type: 'user', text: transcript }
      ]);
      
      // Mark that user has interacted
      setHasInteracted(true);
    }
  }, [isListening, transcript, isProcessing]);
  
  // Reset state when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setMessages([]);
        setIsMinimized(false);
        setHasInteracted(false);
        activeQueryRef.current = null;
      }, 300);
    }
  }, [isOpen]);
  
  // If there's an error, show a message after a delay
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setMessages(prev => {
          // Only add the error message if it's not already there
          if (!prev.some(m => m.type === 'system' && m.text.includes(error))) {
            return [...prev, { type: 'system', text: `Error: ${error}. Please try again.` }];
          }
          return prev;
        });
      }, 1000); // Show error after 1 second delay
      
      return () => clearTimeout(timer);
    }
  }, [error]);
  
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
  
  // Function to handle manual clearing of messages
  const clearMessages = () => {
    setMessages([]);
    setHasInteracted(false);
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
                  
                  {/* Network status indicator */}
                  {networkStatus === 'offline' && (
                    <div className="ml-2 px-2 py-0.5 bg-yellow-600/20 border border-yellow-600/40 rounded-full flex items-center">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></span>
                      <span className="text-yellow-500 text-xs">Offline</span>
                    </div>
                  )}
                  {networkStatus === 'error' && (
                    <div className="ml-2 px-2 py-0.5 bg-red-600/20 border border-red-600/40 rounded-full flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                      <span className="text-red-500 text-xs">API Error</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  {hasInteracted && (
                    <button 
                      onClick={clearMessages}
                      className="text-neutral-400 hover:text-white p-1 rounded-full hover:bg-neutral-700 transition-colors"
                      title="Clear conversation"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                    </button>
                  )}
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
                    
                    {networkStatus === 'offline' && (
                      <div className="mt-4 p-2 bg-yellow-600/20 border border-yellow-600/40 rounded-md">
                        <p className="text-yellow-500 text-xs">
                          You appear to be offline. Voice assistant will use limited local responses.
                        </p>
                      </div>
                    )}
                    
                    {networkStatus === 'error' && (
                      <div className="mt-4 p-2 bg-red-600/20 border border-red-600/40 rounded-md">
                        <p className="text-red-500 text-xs">
                          The voice assistant API is currently unavailable. Using fallback responses.
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div 
                        key={index} 
                        className={`flex ${
                          message.type === 'user' 
                            ? 'justify-end' 
                            : message.type === 'system' || message.type === 'error'
                            ? 'justify-center' 
                            : 'justify-start'
                        }`}
                      >
                        <div 
                          className={`rounded-lg px-4 py-2 max-w-[80%] ${
                            message.type === 'user'
                              ? 'bg-purple-600 text-white'
                              : message.type === 'system'
                              ? 'bg-yellow-600 text-white flex items-center'
                              : message.type === 'error'
                              ? 'bg-red-600 text-white flex items-center'
                              : 'bg-neutral-700 text-white'
                          }`}
                        >
                          {message.type === 'system' && (
                            <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                          )}
                          {message.type === 'error' && (
                            <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                          )}
                          {message.text}
                        </div>
                      </div>
                    ))}
                    {/* Show typing indicator when processing */}
                    {isProcessing && (
                      <div className="flex justify-start">
                        <div className="bg-neutral-700 rounded-lg px-4 py-2 flex items-center space-x-2">
                          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                        </div>
                      </div>
                    )}
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
                    {error && !error.includes("502") && (
                      <p className="text-red-400 text-sm max-w-[200px] truncate">{error}</p>
                    )}
                    <button
                      onClick={isListening ? stopListening : startListening}
                      disabled={isProcessing}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                        isListening
                          ? 'bg-red-500 hover:bg-red-600'
                          : isProcessing
                          ? 'bg-gray-500 cursor-not-allowed'
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
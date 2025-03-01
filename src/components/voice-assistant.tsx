"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, X, AlertCircle, Loader2 } from 'lucide-react';
import useVoiceAssistant from '@/hooks/useVoiceAssistant';

// Define message types
type MessageType = 'user' | 'assistant' | 'system' | 'error';

interface Message {
  text: string;
  type: MessageType;
  timestamp: number;
  isProcessing?: boolean;
}

interface VoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

// Network status types
type NetworkStatusType = 'online' | 'offline' | 'error' | 'processing';

export default function VoiceAssistant({ isOpen, onClose }: VoiceAssistantProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [networkStatus, setNetworkStatus] = useState<NetworkStatusType>('online');
  const [showWelcome, setShowWelcome] = useState(true);
  
  // Enhanced visualizer states
  const [visualizerType, setVisualizerType] = useState<'idle' | 'listening' | 'speaking'>('idle');
  const [visualizerIntensity, setVisualizerIntensity] = useState(0);
  
  // Animation timelines for smooth transitions
  const visualizerTimeline = useRef<number[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Use custom hook
  const {
    isListening,
    isProcessing,
    isSpeaking,
    transcript,
    response,
    error,
    startListening,
    stopListening,
  } = useVoiceAssistant({
    onListening: (isActive) => {
      if (isActive) {
        setVisualizerType('listening');
        // Start visualizer animation when listening
        startVisualizerAnimation('listening');
      } else {
        if (!isProcessing) {
          setVisualizerType('idle');
        }
      }
    },
    onResult: (result) => {
      // Update visualizer intensity based on speech volume
      const intensity = Math.min(0.5 + (result.length % 10) * 0.05, 1);
      setVisualizerIntensity(intensity);
    },
    onResponse: (responseData) => {
      const newMessage: Message = {
        text: responseData.answer,
        type: 'assistant',
        timestamp: Date.now(),
      };
      
      // Add the assistant message
      setMessages(prev => [...prev, newMessage]);
      
      // Update network status back to online
      setNetworkStatus('online');
      
      // Update visualizer for speaking
      setVisualizerType('speaking');
      startVisualizerAnimation('speaking');
      
      // Track the assistant's speaking
      setTimeout(() => {
        if (!isListening && !isProcessing) {
          setVisualizerType('idle');
        }
      }, responseData.answer.length * 80); // Approximate time it takes to speak
    },
    onError: (errorMsg) => {
      // Handle network errors
      if (errorMsg.includes('502') || errorMsg.includes('unavailable')) {
        setNetworkStatus('error');
      }
      
      // Only add error message if it's significant
      if (!errorMsg.includes('aborted') && !errorMsg.includes('no-speech')) {
        const newMessage: Message = {
          text: errorMsg,
          type: 'error',
          timestamp: Date.now(),
        };
        setMessages(prev => [...prev, newMessage]);
      }
      
      setVisualizerType('idle');
    },
  });
  
  // Start a visualizer animation based on mode
  const startVisualizerAnimation = (mode: 'listening' | 'speaking') => {
    // Clear any existing animation
    visualizerTimeline.current.forEach(id => window.clearInterval(id));
    visualizerTimeline.current = [];
    
    if (mode === 'listening') {
      // Listening has more random fluctuations
      const intervalId = window.setInterval(() => {
        setVisualizerIntensity(Math.random() * 0.7 + 0.3);
      }, 150);
      visualizerTimeline.current.push(intervalId);
    } else if (mode === 'speaking') {
      // Speaking has a more rhythmic pattern
      const baseInterval = 180;
      const intervalId1 = window.setInterval(() => {
        setVisualizerIntensity(prevIntensity => {
          const newIntensity = Math.sin(Date.now() / 1000) * 0.3 + 0.7;
          return Math.max(0.2, Math.min(1, newIntensity));
        });
      }, baseInterval);
      visualizerTimeline.current.push(intervalId1);
    }
  };
  
  // Clean up animations when component unmounts
  useEffect(() => {
    return () => {
      visualizerTimeline.current.forEach(id => window.clearInterval(id));
    };
  }, []);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Reset messages when closed
  useEffect(() => {
    if (!isOpen) {
      // Wait for close animation to finish
      const timer = setTimeout(() => {
        setMessages([]);
        setIsMinimized(false);
        setShowWelcome(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  // Show welcome message briefly when opened
  useEffect(() => {
    if (isOpen && showWelcome) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, showWelcome]);
  
  // Handle online/offline status
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
  
  // Enhanced user message handler
  const handleUserMessage = () => {
    if (transcript.trim()) {
      const newMessage: Message = {
        text: transcript,
        type: 'user',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, newMessage]);
      
      // Show temporary processing state
      setNetworkStatus('processing');
    }
  };
  
  // Listen for transcript changes to add user messages
  useEffect(() => {
    if (!isListening && transcript && isProcessing) {
      handleUserMessage();
    }
  }, [isListening, transcript, isProcessing]);
  
  // Function to render visualizer bars with improved animation
  const renderVisualizerBars = () => {
    const numberOfBars = 9;
    const bars = [];
    
    for (let i = 0; i < numberOfBars; i++) {
      const isMiddle = i === Math.floor(numberOfBars / 2);
      const baseHeight = isMiddle ? 10 : 6 + Math.abs(i - Math.floor(numberOfBars / 2)) * 0.5;
      
      // Different visualizer styles based on state
      let barColor = 'bg-neutral-600';
      let multiplier = 0.2; // idle
      
      if (visualizerType === 'listening') {
        barColor = 'bg-purple-500';
        // More dynamic for listening
        multiplier = visualizerIntensity * 1.4 * (0.6 + Math.sin(i * 0.8) * 0.4);
      } else if (visualizerType === 'speaking') {
        barColor = 'bg-cyan-500';
        // More rhythmic for speaking
        multiplier = visualizerIntensity * (0.8 + Math.cos(i * 0.7) * 0.3);
      }
      
      // Calculate height with smoother animation
      const height = baseHeight * multiplier;
      
      bars.push(
        <motion.div
          key={i}
          className={`w-0.5 mx-0.5 rounded-full ${barColor}`}
          initial={{ height: 2 }}
          animate={{ 
            height: Math.max(2, height),
            opacity: multiplier < 0.3 ? 0.5 : 1
          }}
          transition={{ 
            type: 'spring',
            stiffness: 300,
            damping: 15,
            mass: 0.8
          }}
        />
      );
    }
    
    return (
      <div className="flex items-end h-8 space-x-0.5">
        {bars}
      </div>
    );
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-neutral-900 border border-neutral-800 shadow-xl rounded-lg w-full max-w-md overflow-hidden"
            initial={{ scale: 0.9, y: 40, opacity: 0 }}
            animate={{ 
              scale: isMinimized ? 0.9 : 1, 
              y: isMinimized ? 200 : 0, 
              opacity: 1 
            }}
            exit={{ scale: 0.9, y: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {isMinimized ? (
              <div
                className="p-3 cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600"
                onClick={() => setIsMinimized(false)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Volume2 size={18} className="text-white" />
                    <span className="text-white font-medium">Voice Assistant</span>
                  </div>
                  <div className="flex space-x-1">
                    {renderVisualizerBars()}
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="border-b border-neutral-800 bg-gradient-to-r from-indigo-600 to-purple-600 p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Volume2 size={18} className="text-white" />
                      <span className="text-white font-medium">Voice Assistant</span>
                      
                      {/* Network status indicator */}
                      {networkStatus !== 'online' && (
                        <span className={`
                          rounded-full h-2 w-2 
                          ${networkStatus === 'offline' ? 'bg-yellow-500' : 
                            networkStatus === 'error' ? 'bg-red-500' : 'bg-cyan-500 animate-pulse'}
                        `}></span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      {messages.length > 0 && (
                        <button
                          onClick={() => setMessages([])}
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
                </div>
                
                {/* Chat area */}
                <div className="p-4 h-80 overflow-y-auto">
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <motion.div 
                        className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4"
                        animate={{ 
                          scale: showWelcome ? [1, 1.05, 1] : 1,
                          boxShadow: showWelcome ? [
                            "0 0 0 0 rgba(166, 152, 254, 0)", 
                            "0 0 0 15px rgba(166, 152, 254, 0.3)", 
                            "0 0 0 0 rgba(166, 152, 254, 0)"
                          ] : "0 0 0 0 rgba(166, 152, 254, 0)"
                        }}
                        transition={{ 
                          repeat: showWelcome ? Infinity : 0, 
                          duration: 2.5,
                          repeatType: "loop"
                        }}
                      >
                        <Volume2 size={32} className="text-white" />
                      </motion.div>
                      <motion.h4 
                        className="text-white font-semibold mb-2"
                        animate={{ 
                          opacity: showWelcome ? [1, 1] : 1,
                          y: showWelcome ? [0, 0] : 0
                        }}
                      >
                        Tech Voice Assistant
                      </motion.h4>
                      <motion.p 
                        className="text-neutral-400 text-sm max-w-xs"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          transition: { delay: 0.3 }
                        }}
                      >
                        Ask me anything about AI, technology, programming, or the latest tech news.
                      </motion.p>
                      
                      {networkStatus === 'offline' && (
                        <motion.div 
                          className="mt-4 p-2 bg-yellow-600/20 border border-yellow-600/40 rounded-md"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ 
                            opacity: 1, 
                            y: 0,
                            transition: { delay: 0.5 }
                          }}
                        >
                          <p className="text-yellow-500 text-xs">
                            You appear to be offline. Voice assistant will use limited local responses.
                          </p>
                        </motion.div>
                      )}
                      
                      {networkStatus === 'error' && (
                        <motion.div 
                          className="mt-4 p-2 bg-red-600/20 border border-red-600/40 rounded-md"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ 
                            opacity: 1, 
                            y: 0,
                            transition: { delay: 0.5 }
                          }}
                        >
                          <p className="text-red-500 text-xs">
                            The voice assistant API is currently unavailable. Using fallback responses.
                          </p>
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message, index) => (
                        <motion.div 
                          key={index} 
                          className={`flex ${
                            message.type === 'user' 
                              ? 'justify-end' 
                              : message.type === 'system' || message.type === 'error'
                              ? 'justify-center' 
                              : 'justify-start'
                          }`}
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ 
                            type: 'spring', 
                            stiffness: 500, 
                            damping: 25,
                            mass: 0.8
                          }}
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
                        </motion.div>
                      ))}
                      {/* Show typing indicator when processing */}
                      {isProcessing && (
                        <motion.div 
                          className="flex justify-start"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                        >
                          <div className="bg-neutral-700 rounded-lg px-4 py-2 flex items-center space-x-2">
                            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                          </div>
                        </motion.div>
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
                      <motion.button
                        onClick={isListening ? stopListening : startListening}
                        disabled={isProcessing}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                          isListening
                            ? 'bg-red-500 hover:bg-red-600'
                            : isProcessing
                            ? 'bg-gray-500 cursor-not-allowed'
                            : 'bg-cyan-500 hover:bg-cyan-600'
                        }`}
                        whileHover={{ scale: isProcessing ? 1 : 1.05 }}
                        whileTap={{ scale: isProcessing ? 1 : 0.95 }}
                      >
                        {isListening ? (
                          <MicOff size={20} className="text-white" />
                        ) : (
                          <Mic size={20} className="text-white" />
                        )}
                      </motion.button>
                    </div>
                  </div>
                  
                  {isListening && (
                    <motion.div 
                      className="mt-3 text-neutral-300 text-sm"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <p>
                        {transcript || "Listening..."}
                      </p>
                    </motion.div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 
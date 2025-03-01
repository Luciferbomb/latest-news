'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, X, Send } from 'lucide-react';
import { useVoiceAssistant, VoiceAssistantMessage, NetworkStatus } from '@/hooks/useVoiceAssistant';

// Define VoiceAssistantProps interface
interface VoiceAssistantProps {
  isInitiallyOpen?: boolean;
  isPermanentlyOpen?: boolean;
}

// Define AnimationState type
type AnimationState = 'idle' | 'listening' | 'processing' | 'speaking';

// Function to generate a unique ID
const generateId = () => `id-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

// Enhanced wave visualizer component with smoother animations
const VoiceVisualizer = ({ isActive, mode }: { isActive: boolean; mode: 'listening' | 'speaking' }) => {
  // Different colors for listening vs speaking
  const color = mode === 'listening' ? 'bg-blue-500' : 'bg-green-500';
  
  // We'll use 5 bars for the visualizer
  return (
    <div className="flex items-center justify-center h-6 gap-1 px-2">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className={`w-1 ${color} rounded-full`}
          initial={{ height: 4 }}
          animate={{ 
            height: isActive 
              ? [4, 12 + Math.random() * 12, 4, 16 + Math.random() * 8, 4] 
              : 4 
          }}
          transition={{ 
            duration: isActive ? 1.5 : 0.2, 
            repeat: isActive ? Infinity : 0,
            repeatType: "reverse",
            // Each bar has a slightly different timing
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Typing animation for assistant responses
const TypingAnimation = ({ children, isTyping }: { children: string; isTyping: boolean }) => {
  const [displayText, setDisplayText] = useState('');
  const textRef = useRef(children);
  const charIndexRef = useRef(0);
  
  useEffect(() => {
    // Reset when content changes
    textRef.current = children;
    if (!isTyping) {
      setDisplayText(children);
      charIndexRef.current = children.length;
      return;
    }
    
    // Start typing animation from the beginning
    charIndexRef.current = 0;
    setDisplayText('');
    
    // Typing animation with varying speed
    const typingInterval = setInterval(() => {
      if (charIndexRef.current < textRef.current.length) {
        charIndexRef.current += 1;
        setDisplayText(textRef.current.substring(0, charIndexRef.current));
        
        // Type faster for long responses
        if (charIndexRef.current === textRef.current.length) {
          clearInterval(typingInterval);
        }
      } else {
        clearInterval(typingInterval);
      }
    }, 20); // Base typing speed
    
    return () => clearInterval(typingInterval);
  }, [children, isTyping]);
  
  return <>{displayText}</>;
};

// Message bubble component
const MessageBubble = ({ message }: { message: VoiceAssistantMessage }) => {
  const [isAnimating, setIsAnimating] = useState(true);
  
  useEffect(() => {
    // Animation duration based on text length, but capped
    const duration = Math.min(message.text.length * 10, 1000);
    const timer = setTimeout(() => setIsAnimating(false), duration);
    return () => clearTimeout(timer);
  }, [message.text.length]);
  
  const bubbleClass = message.isUser 
    ? 'bg-blue-500 text-white ml-auto' 
    : message.type === 'error'
      ? 'bg-red-100 text-red-800 border border-red-300'
      : message.type === 'thinking'
      ? 'bg-gray-100 text-gray-600 border border-gray-200'
      : 'bg-gray-100 text-gray-800';
  
  return (
    <motion.div 
      className={`max-w-[80%] rounded-lg px-4 py-2 mb-2 ${bubbleClass}`}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {message.type === 'thinking' ? (
        <div className="flex items-center gap-2">
          <div className="text-sm">{message.text}</div>
          <motion.div
            className="w-1.5 h-1.5 bg-gray-500 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
          <motion.div
            className="w-1.5 h-1.5 bg-gray-500 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 0.5, repeat: Infinity, delay: 0.15 }}
          />
          <motion.div
            className="w-1.5 h-1.5 bg-gray-500 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 0.5, repeat: Infinity, delay: 0.3 }}
          />
        </div>
      ) : (
        <TypingAnimation isTyping={isAnimating}>
          {message.text}
        </TypingAnimation>
      )}
    </motion.div>
  );
};

// Network status indicator
const NetworkStatusIndicator = ({ status }: { status: NetworkStatus }) => {
  if (!status.error && status.online) return null;
  
  const statusClass = !status.online 
    ? 'bg-red-100 text-red-800 border-red-300'
    : status.error?.includes('502')
    ? 'bg-orange-100 text-orange-800 border-orange-300'
    : 'bg-yellow-100 text-yellow-800 border-yellow-300';
  
  const statusMessage = !status.online 
    ? 'Offline - Please check your connection'
    : status.error?.includes('502')
    ? 'Server is busy - May experience delays'
    : `API Issue: ${status.error}`;
  
  return (
    <motion.div 
      className={`text-xs px-3 py-1 rounded-full mb-2 border ${statusClass} flex items-center gap-1`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {statusMessage}
    </motion.div>
  );
};

export default function VoiceAssistant({ isInitiallyOpen = false, isPermanentlyOpen = false }: VoiceAssistantProps) {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen || isPermanentlyOpen);
  const [isPermanent, setIsPermanent] = useState(isPermanentlyOpen);
  const [textInput, setTextInput] = useState('');
  const [animationState, setAnimationState] = useState<AnimationState>('idle');
  const [lastInteraction, setLastInteraction] = useState(new Date());
  const [messages, setMessages] = useState<VoiceAssistantMessage[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize the voice assistant hook
  const {
    isListening,
    isProcessing,
    isSpeaking,
    messages: assistantMessages,
    error,
    networkStatus,
    startListening,
    stopListening,
    submitQuery,
    cancelRequest,
    stopSpeaking,
    clearMessages,
    newSession,
    processQuery
  } = useVoiceAssistant({
    onProcessingStart: () => {
      setAnimationState('processing');
      setLastInteraction(new Date());
    },
    onProcessingEnd: () => {
      setAnimationState(isSpeaking ? 'speaking' : 'idle');
    },
    onResponse: () => {
      setLastInteraction(new Date());
    },
    onError: (error) => {
      console.error('Voice assistant error:', error);
      setAnimationState('idle');
      setLastInteraction(new Date());
    },
    onNetworkStatusChange: () => {
      // If network status changes, we'll re-render with the updated status
      setLastInteraction(new Date());
    }
  });
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [assistantMessages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Update animation state based on voice assistant state
  useEffect(() => {
    if (isListening) {
      setAnimationState('listening');
    } else if (isProcessing) {
      setAnimationState('processing');
    } else if (isSpeaking) {
      setAnimationState('speaking');
    } else {
      setAnimationState('idle');
    }
  }, [isListening, isProcessing, isSpeaking]);

  // Auto-close after inactivity (if not permanent)
  useEffect(() => {
    if (!isOpen || isPermanent) return;
    
    // Auto-close after 60 seconds of inactivity
    const inactivityTimeout = setTimeout(() => {
      if (!isListening && !isProcessing && !isSpeaking) {
        setIsOpen(false);
      }
    }, 60000);
    
    return () => clearTimeout(inactivityTimeout);
  }, [isOpen, isPermanent, isListening, isProcessing, isSpeaking, lastInteraction]);

  // Handle toggle
  const handleToggle = () => {
    if (isOpen) {
      // Close and reset
      setIsOpen(false);
      stopListening();
      stopSpeaking();
      cancelRequest();
    } else {
      // Open
      setIsOpen(true);
      setLastInteraction(new Date());
    }
  };

  // Handle microphone click
  const handleMicrophoneClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
    setLastInteraction(new Date());
  };

  // Handle text input submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput.trim() && submitQuery) {
      try {
        submitQuery(textInput.trim());
      } catch (error) {
        console.error("Error submitting query:", error);
        // Create an error message directly instead of using addMessage
        setMessages(prev => [
          ...prev,
          {
            id: generateId(),
            text: "There was an error processing your query. Please try again.",
            isUser: false,
            timestamp: new Date(),
            type: "error"
          }
        ]);
      }
      setTextInput('');
    }
    setLastInteraction(new Date());
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle toggle permanent mode
  const handleTogglePermanent = () => {
    setIsPermanent(!isPermanent);
    setLastInteraction(new Date());
  };
  
  // Get icon and color based on animation state
  const getButtonStyles = () => {
    switch (animationState) {
      case 'listening':
        return {
          icon: <Mic size={20} />,
          className: 'bg-blue-500 text-white shadow-lg animate-pulse',
        };
      case 'processing':
        return {
          icon: (
            <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
          ),
          className: 'bg-yellow-500 text-white shadow-lg',
        };
      case 'speaking':
        return {
          icon: <Volume2 size={20} />,
          className: 'bg-green-500 text-white shadow-lg',
        };
      default:
        return {
          icon: <Mic size={20} />,
          className: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
        };
    }
  };

  const { icon, className } = getButtonStyles();

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={handleToggle}
        className={`fixed bottom-6 right-6 flex items-center justify-center w-12 h-12 rounded-full z-50 ${className}`}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        aria-label="Voice Assistant"
      >
        {icon}
      </motion.button>

      {/* Modal dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) handleToggle();
            }}
          >
            <motion.div
              className="bg-white rounded-lg w-full max-w-md shadow-xl flex flex-col"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-medium">AI Voice Assistant</h2>
                  {(isListening || isSpeaking) && (
                    <VoiceVisualizer 
                      isActive={true} 
                      mode={isListening ? 'listening' : 'speaking'} 
                    />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleTogglePermanent}
                    className={`text-sm px-2 py-1 rounded ${
                      isPermanent ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                    }`}
                    aria-label={isPermanent ? 'Disable permanent mode' : 'Enable permanent mode'}
                    title={isPermanent ? 'Disable permanent mode' : 'Keep assistant open'}
                  >
                    {isPermanent ? 'Pin' : 'Pin'}
                  </button>
                  <button
                    onClick={handleToggle}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Chat area */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50 max-h-[400px] min-h-[300px]">
                <AnimatePresence>
                  {networkStatus.error || !networkStatus.online ? (
                    <NetworkStatusIndicator status={networkStatus} />
                  ) : null}
                </AnimatePresence>
                
                {assistantMessages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-4">
                    <p className="mb-2">How can I help you with technology today?</p>
                    <p className="text-sm">Try saying "What's new in AI?" or "Tell me about the latest smartphones"</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {assistantMessages.map((message) => (
                      <MessageBubble key={message.id} message={message} />
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Input area */}
              <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
                <button
                  type="button"
                  onClick={handleMicrophoneClick}
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    isListening
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  }`}
                  aria-label={isListening ? 'Stop listening' : 'Start listening'}
                >
                  <Mic size={20} />
                </button>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  disabled={isProcessing}
                />
                <button
                  type="submit"
                  disabled={!textInput.trim() || isProcessing}
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-green-100 text-green-600 hover:bg-green-200 disabled:opacity-50 disabled:hover:bg-green-100"
                  aria-label="Send message"
                >
                  <Send size={20} />
                </button>
              </form>

              {/* Footer with controls */}
              <div className="p-2 border-t text-xs text-gray-500 flex justify-between items-center">
                <div>
                  {isSpeaking && (
                    <button
                      onClick={stopSpeaking}
                      className="text-red-600 hover:text-red-800 flex items-center gap-1"
                    >
                      <MicOff size={14} />
                      Stop Speaking
                    </button>
                  )}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={clearMessages}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Clear Chat
                  </button>
                  <button
                    onClick={newSession}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    New Session
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 
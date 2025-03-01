"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic } from 'lucide-react';
import VoiceAssistant from './voice-assistant';

export function VoiceAssistantButton() {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  
  return (
    <>
      <AnimatePresence>
        {!isAssistantOpen && (
          <motion.button
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-rose-500 text-white shadow-lg flex items-center justify-center z-40 hover:shadow-xl"
            onClick={() => setIsAssistantOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mic size={24} />
          </motion.button>
        )}
      </AnimatePresence>
      
      <VoiceAssistant 
        isOpen={isAssistantOpen} 
        onClose={() => setIsAssistantOpen(false)} 
      />
    </>
  );
} 
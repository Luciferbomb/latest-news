import { useState, useEffect, useCallback, useRef } from 'react';

interface UseVoiceAssistantProps {
  onListening?: (isListening: boolean) => void;
  onResult?: (result: string) => void;
  onError?: (error: string) => void;
  onResponse?: (response: VoiceAssistantResponse) => void;
}

interface VoiceAssistantResponse {
  answer: string;
  confidence: number;
  isTechQuestion: boolean;
}

export default function useVoiceAssistant({
  onListening,
  onResult,
  onError,
  onResponse
}: UseVoiceAssistantProps = {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState<VoiceAssistantResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // References to hold instances
  const recognitionRef = useRef<any>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Initialize speech recognition on component mount
  useEffect(() => {
    // Check if the browser supports the Web Speech API
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Speech recognition is not supported in this browser');
      return;
    }
    
    // Initialize the speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';
    
    // Set up event handlers
    recognitionRef.current.onstart = () => {
      setIsListening(true);
      setTranscript('');
      onListening?.(true);
    };
    
    recognitionRef.current.onresult = (event: any) => {
      const result = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('');
      
      setTranscript(result);
      onResult?.(result);
    };
    
    recognitionRef.current.onerror = (event: any) => {
      const errorMessage = `Speech recognition error: ${event.error}`;
      setError(errorMessage);
      onError?.(errorMessage);
    };
    
    recognitionRef.current.onend = () => {
      setIsListening(false);
      onListening?.(false);
      
      // If we have a transcript, process it
      if (transcript.trim()) {
        processTranscript(transcript);
      }
    };
    
    // Initialize speech synthesis
    speechSynthesisRef.current = new SpeechSynthesisUtterance();
    speechSynthesisRef.current.lang = 'en-US';
    
    speechSynthesisRef.current.onstart = () => {
      setIsSpeaking(true);
    };
    
    speechSynthesisRef.current.onend = () => {
      setIsSpeaking(false);
    };
    
    // Cleanup on unmount
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      window.speechSynthesis.cancel();
    };
  }, []);
  
  // Effect to handle changes to the transcript
  useEffect(() => {
    if (transcript && !isListening && !isProcessing) {
      processTranscript(transcript);
    }
  }, [transcript, isListening, isProcessing]);
  
  // Process the transcript and get a response
  const processTranscript = useCallback(async (text: string) => {
    if (!text.trim() || isProcessing) return;
    
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/voice-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: text.trim() }),
      });
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      
      const data = await response.json();
      setResponse(data);
      onResponse?.(data);
      
      // Speak the response
      speakResponse(data.answer);
      
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to process voice command';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing, onResponse, onError]);
  
  // Start listening
  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
        setError(null);
      } catch (err: any) {
        setError(`Failed to start listening: ${err.message}`);
        onError?.(`Failed to start listening: ${err.message}`);
      }
    }
  }, [isListening, onError]);
  
  // Stop listening
  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  }, [isListening]);
  
  // Speak a response
  const speakResponse = useCallback((text: string) => {
    if (!speechSynthesisRef.current) return;
    
    // Cancel any current speech
    window.speechSynthesis.cancel();
    
    // Set the text to speak
    speechSynthesisRef.current.text = text;
    
    // Use a more natural voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Google') || voice.name.includes('Natural') || 
      voice.name.includes('Samantha') || voice.name.includes('Alex'));
    
    if (preferredVoice) {
      speechSynthesisRef.current.voice = preferredVoice;
    }
    
    // Speak the text
    window.speechSynthesis.speak(speechSynthesisRef.current);
  }, []);
  
  return {
    isListening,
    isProcessing,
    isSpeaking,
    transcript,
    response,
    error,
    startListening,
    stopListening,
    speakResponse
  };
} 
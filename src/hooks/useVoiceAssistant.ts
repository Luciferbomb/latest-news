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
  source?: string;
}

export default function useVoiceAssistant({
  onListening,
  onResult,
  onError,
  onResponse
}: UseVoiceAssistantProps = {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [response, setResponse] = useState<VoiceAssistantResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // References to hold instances
  const recognitionRef = useRef<any>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const processingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastQueryRef = useRef<string>('');
  const processingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef<string>('');
  
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
      setFinalTranscript('');
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
      
      // If we have a transcript, finalize it and process it
      if (transcript.trim()) {
        setFinalTranscript(transcript);
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

      if (processingTimerRef.current) {
        clearTimeout(processingTimerRef.current);
      }

      if (processingTimeoutRef.current) {
        clearTimeout(processingTimeoutRef.current);
      }

      // Abort any in-flight fetch requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);
  
  // Effect to handle changes to the finalized transcript
  useEffect(() => {
    if (finalTranscript && !isListening && !isProcessing) {
      // Prevent processing the same query twice in a row
      if (finalTranscript === lastQueryRef.current) {
        console.log("Skipping duplicate query:", finalTranscript);
        return;
      }
      
      // Set a processing timeout to avoid indefinite processing
      if (processingTimeoutRef.current) {
        clearTimeout(processingTimeoutRef.current);
      }
      
      processingTimeoutRef.current = setTimeout(() => {
        if (isProcessing) {
          console.warn("Processing timeout reached. Resetting state.");
          setIsProcessing(false);
          setError("Request timed out. Please try again.");
          onError?.("Request timed out. Please try again.");
          
          // Abort any pending fetch
          if (abortControllerRef.current) {
            abortControllerRef.current.abort();
          }
        }
      }, 8000); // 8 second timeout
      
      // Update last query and process the new one
      lastQueryRef.current = finalTranscript;
      processTranscript(finalTranscript);
    }
  }, [finalTranscript, isListening, isProcessing]);
  
  // Process the transcript and get a response
  const processTranscript = useCallback(async (text: string) => {
    if (!text.trim() || isProcessing) return;
    
    // Generate a unique request ID
    requestIdRef.current = `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    // Create a new AbortController for this request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/voice-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          query: text.trim(),
          sessionId: requestIdRef.current
        }),
        signal: abortControllerRef.current.signal
      });
      
      if (!response.ok) {
        if (response.status === 502) {
          // Special handling for 502 errors - these are likely API gateway issues
          console.error("Received 502 error from voice assistant API");
          throw new Error("The voice assistant service is currently unavailable (502 error). Using fallback responses.");
        } else {
          throw new Error(`Server error: ${response.status}`);
        }
      }
      
      const data = await response.json();
      
      // Check for error response
      if (data.error) {
        throw new Error(data.error);
      }
      
      setResponse(data);
      onResponse?.(data);
      
      // Speak the response
      speakResponse(data.answer);
      
    } catch (err: any) {
      // Check if this is an abort error (user cancelled)
      if (err.name === 'AbortError') {
        console.log('Request was cancelled');
        return;
      }
      
      const errorMessage = err.message || 'Failed to process voice command';
      setError(errorMessage);
      onError?.(errorMessage);
      
      // Provide a fallback response if needed
      if (errorMessage.includes("502")) {
        // If it's a 502 error, try to get a fallback response from local storage if possible
        // or use a generic one
        const fallbackResponse = {
          answer: "I'm having trouble connecting to my knowledge base right now. Please try again shortly or check your internet connection.",
          confidence: 0.5,
          isTechQuestion: true,
          source: "fallback_from_client"
        };
        
        setResponse(fallbackResponse);
        onResponse?.(fallbackResponse);
        speakResponse(fallbackResponse.answer);
      }
    } finally {
      setIsProcessing(false);
      
      // Clear any timeout
      if (processingTimeoutRef.current) {
        clearTimeout(processingTimeoutRef.current);
        processingTimeoutRef.current = null;
      }
    }
  }, [onResponse, onError]);
  
  // Start listening
  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      try {
        // Cancel any existing speech
        window.speechSynthesis.cancel();
        
        // Clear previous errors
        setError(null);
        
        // Start recognition
        recognitionRef.current.start();
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
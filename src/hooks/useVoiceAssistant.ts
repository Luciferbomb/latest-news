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
  const apiCacheRef = useRef<Map<string, VoiceAssistantResponse>>(new Map());
  const speakingRetryTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Enhanced speech recognition settings
  const recognitionSettingsRef = useRef({
    continuous: false,
    interimResults: true,
    maxAlternatives: 3,
    lang: 'en-US',
  });
  
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
    
    // Apply recognition settings
    const settings = recognitionSettingsRef.current;
    recognitionRef.current.continuous = settings.continuous;
    recognitionRef.current.interimResults = settings.interimResults;
    recognitionRef.current.maxAlternatives = settings.maxAlternatives;
    recognitionRef.current.lang = settings.lang;
    
    // Set up event handlers
    recognitionRef.current.onstart = () => {
      setIsListening(true);
      setTranscript('');
      setFinalTranscript('');
      setError(null); // Clear previous errors when starting new session
      onListening?.(true);
    };
    
    recognitionRef.current.onresult = (event: any) => {
      try {
        // Get the most confident result
        let bestResult = '';
        let bestConfidence = 0;
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          
          // If this is a final result, consider all alternatives
          if (result.isFinal) {
            for (let j = 0; j < result.length; j++) {
              if (result[j].confidence > bestConfidence) {
                bestConfidence = result[j].confidence;
                bestResult = result[j].transcript;
              }
            }
          } else {
            // For interim results, just use the first one
            bestResult = result[0].transcript;
          }
        }
        
        // Clean up the transcript
        const cleanResult = bestResult.trim();
        
        // Apply smart corrections to common speech recognition errors
        const correctedResult = applyVoiceCorrections(cleanResult);
        
        setTranscript(correctedResult);
        onResult?.(correctedResult);
      } catch (err) {
        console.error("Error processing speech result:", err);
      }
    };
    
    recognitionRef.current.onerror = (event: any) => {
      // Don't report no-speech as an error to the user
      if (event.error === 'no-speech') {
        console.log("No speech detected.");
        return;
      }
      
      const errorMessage = `Speech recognition error: ${event.error}`;
      console.error(errorMessage);
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
    speechSynthesisRef.current.rate = 1.0; // Slightly faster than default
    speechSynthesisRef.current.pitch = 1.0;
    
    speechSynthesisRef.current.onstart = () => {
      setIsSpeaking(true);
    };
    
    speechSynthesisRef.current.onend = () => {
      setIsSpeaking(false);
    };
    
    speechSynthesisRef.current.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      setIsSpeaking(false);
      
      // Retry if synthesis fails
      if (speakingRetryTimerRef.current) {
        clearTimeout(speakingRetryTimerRef.current);
      }
      
      speakingRetryTimerRef.current = setTimeout(() => {
        if (speechSynthesisRef.current && speechSynthesisRef.current.text) {
          window.speechSynthesis.speak(speechSynthesisRef.current);
        }
      }, 500);
    };
    
    // Load voices when available
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const preferredVoice = selectBestVoice(voices);
        if (preferredVoice && speechSynthesisRef.current) {
          speechSynthesisRef.current.voice = preferredVoice;
        }
      }
    };
    
    // Chrome loads voices asynchronously
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    
    // Try to load voices immediately too
    loadVoices();
    
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
      
      if (speakingRetryTimerRef.current) {
        clearTimeout(speakingRetryTimerRef.current);
      }

      // Abort any in-flight fetch requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);
  
  // Select the best voice for speech synthesis
  const selectBestVoice = (voices: SpeechSynthesisVoice[]) => {
    // Order of preference: Premium natural voices > Google voices > other voices
    const voicePreferenceList = [
      // Premium voices available on various platforms
      'Google Premium', 'Google Assistant', 'Daniel', 'Samantha', 'Siri',
      // Google standard voices
      'Google US English', 'Google UK English',
      // Other natural sounding voices by platform
      'Microsoft David', 'Microsoft Zira', 'Alex'
    ];
    
    // Try to find the preferred voice in order of preference
    for (const preferredName of voicePreferenceList) {
      const matchedVoice = voices.find(v => 
        v.name.includes(preferredName) && v.lang.startsWith('en')
      );
      if (matchedVoice) return matchedVoice;
    }
    
    // If no preferred voice found, use any English US voice
    const englishVoice = voices.find(v => v.lang === 'en-US');
    if (englishVoice) return englishVoice;
    
    // Default to first voice
    return voices[0];
  };
  
  // Apply smart corrections to common speech recognition errors
  const applyVoiceCorrections = (text: string): string => {
    if (!text) return text;
    
    // Standardize abbreviations and technical terms
    let corrected = text
      .replace(/a i\b/gi, "AI")
      .replace(/a pi\b/gi, "API")
      .replace(/u i\b/gi, "UI")
      .replace(/u x\b/gi, "UX")
      .replace(/\brest api\b/gi, "REST API")
      .replace(/\bc plus plus\b/gi, "C++")
      .replace(/\bJavaScript\b/gi, "JavaScript") // Ensure proper capitalization
      .replace(/\bpython\b/gi, "Python")
      .replace(/\breact\b/gi, "React")
      .replace(/\bangular\b/gi, "Angular")
      .replace(/\bVue\b/gi, "Vue.js")
      .replace(/\bnpm\b/gi, "npm")
      .replace(/\bnode js\b/gi, "Node.js");
    
    // Add a period at the end if it's missing
    if (corrected.length > 10 && !/[.?!]$/.test(corrected)) {
      corrected += '.';
    }
    
    // Capitalize first letter of sentences
    corrected = corrected.replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
    
    return corrected;
  };
  
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
      }, 6500); // Reduced timeout to 6.5 seconds for faster response
      
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
    
    // Check cache first for exact matches
    const normalizedQuery = text.trim().toLowerCase();
    const cachedResponse = apiCacheRef.current.get(normalizedQuery);
    
    if (cachedResponse) {
      console.log("Using cached response for:", normalizedQuery);
      setResponse(cachedResponse);
      onResponse?.(cachedResponse);
      speakResponse(cachedResponse.answer);
      setIsProcessing(false);
      
      if (processingTimeoutRef.current) {
        clearTimeout(processingTimeoutRef.current);
        processingTimeoutRef.current = null;
      }
      
      return;
    }
    
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
      
      // Cache the response for future use
      apiCacheRef.current.set(normalizedQuery, data);
      
      // Limit cache size to 20 entries
      if (apiCacheRef.current.size > 20) {
        const firstKey = apiCacheRef.current.keys().next().value;
        apiCacheRef.current.delete(firstKey);
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
    
    // Apply punctuation-based pauses for more natural speech
    const processedText = text
      .replace(/\.\s/g, '... ')  // Longer pause after periods
      .replace(/\,\s/g, ', ') // Short pause after commas
      .replace(/\?\s/g, '? ') // Pause after question marks
      .replace(/\!\s/g, '! '); // Pause after exclamation points
      
    speechSynthesisRef.current.text = processedText;
    
    // Try to get good voices again if they've loaded since initialization
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = selectBestVoice(voices);
    
    if (preferredVoice) {
      speechSynthesisRef.current.voice = preferredVoice;
    }
    
    // Adjust rate based on content length for more natural delivery
    if (text.length > 100) {
      speechSynthesisRef.current.rate = 1.1; // Slightly faster for long content
    } else {
      speechSynthesisRef.current.rate = 1.0; // Normal rate for short responses
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
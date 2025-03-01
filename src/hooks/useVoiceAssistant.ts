import { useState, useEffect, useCallback, useRef } from 'react';

export interface VoiceAssistantMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type: 'message' | 'thinking' | 'error';
}

export interface VoiceAssistantResponse {
  answer: string;
  confidence: number;
  isTechQuestion: boolean;
  source?: string;
}

export interface NetworkStatus {
  online: boolean;
  error: string | null;
  lastChecked: Date | null;
}

interface UseVoiceAssistantOptions {
  onProcessingStart?: () => void;
  onProcessingEnd?: () => void;
  onResponse?: (response: VoiceAssistantResponse) => void;
  onError?: (error: Error) => void;
  onNetworkStatusChange?: (status: NetworkStatus) => void;
  apiEndpoint?: string;
  speakResponse?: boolean;
}

// Function to generate a unique ID
const generateId = () => `id-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

// Fix TypeScript declarations for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export function useVoiceAssistant({
  onProcessingStart,
  onProcessingEnd,
  onResponse,
  onError,
  onNetworkStatusChange,
  apiEndpoint = '/api/voice-assistant',
  speakResponse = true,
}: UseVoiceAssistantOptions = {}) {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<VoiceAssistantMessage[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [listeningStartTime, setListeningStartTime] = useState<number | null>(null);
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    online: typeof navigator !== 'undefined' ? navigator.onLine : true,
    error: null,
    lastChecked: new Date()
  });

  // Reference to SpeechRecognition
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  // Reference to SpeechSynthesis
  const synthRef = useRef<SpeechSynthesis | null>(null);
  // Reference to abort controller for fetch requests
  const abortControllerRef = useRef<AbortController | null>(null);
  // Reference to timeout ID for request timeout
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Reference to session ID for grouped requests
  const sessionIdRef = useRef<string>(generateId());
  // Track if component is mounted
  const mountedRef = useRef<boolean>(true);
  // Track active API requests
  const pendingRequestRef = useRef<boolean>(false);
  // Track animation frames
  const animationFrameRef = useRef<number | null>(null);
  // Track request count for debouncing
  const requestCountRef = useRef<number>(0);

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check for browser support and initialize
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        if (recognitionRef.current) {
          recognitionRef.current.continuous = true;
          recognitionRef.current.interimResults = true;
          recognitionRef.current.lang = 'en-US';
        }
      }
      
      if ('speechSynthesis' in window) {
        synthRef.current = window.speechSynthesis;
      }
      
      // Set up network status monitoring
      const handleOnline = () => {
        const newStatus = {
          online: true,
          error: null,
          lastChecked: new Date()
        };
        setNetworkStatus(newStatus);
        if (onNetworkStatusChange) onNetworkStatusChange(newStatus);
      };
      
      const handleOffline = () => {
        const newStatus = {
          online: false,
          error: 'Network connection lost',
          lastChecked: new Date()
        };
        setNetworkStatus(newStatus);
        if (onNetworkStatusChange) onNetworkStatusChange(newStatus);
      };
      
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
      
      // Check network connectivity immediately
      checkNetworkStatus();
      
      // Cleanup
      return () => {
        mountedRef.current = false;
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
        
        // Clean up any ongoing processes
        if (recognitionRef.current) {
          try {
            recognitionRef.current.stop();
          } catch (e) {
            // Ignore errors when stopping recognition
          }
        }
        
        if (synthRef.current) {
          synthRef.current.cancel();
        }
        
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
        
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
    
    return undefined;
  }, [onNetworkStatusChange]);

  // Function to check network status and API endpoint health
  const checkNetworkStatus = useCallback(async () => {
    if (!mountedRef.current) return;
    
    const newStatus: NetworkStatus = {
      online: navigator.onLine,
      error: null,
      lastChecked: new Date()
    };
    
    // If we're offline, no need to check API
    if (!newStatus.online) {
      setNetworkStatus(newStatus);
      if (onNetworkStatusChange) onNetworkStatusChange(newStatus);
      return;
    }
    
    try {
      // Check API endpoint with a HEAD request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      const response = await fetch(apiEndpoint, { 
        method: 'HEAD',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        newStatus.error = `API error: ${response.status}`;
      }
    } catch (e) {
      // Only set error if we're online but API is unreachable
      if (navigator.onLine) {
        newStatus.error = 'API endpoint unreachable';
      }
    }
    
    if (mountedRef.current) {
      setNetworkStatus(newStatus);
      if (onNetworkStatusChange) onNetworkStatusChange(newStatus);
    }
  }, [apiEndpoint, onNetworkStatusChange]);

  // Function to add a message to the message list
  const addMessage = useCallback((text: string, isUser: boolean, type: 'message' | 'thinking' | 'error' = 'message') => {
    setMessages(prev => [
      ...prev,
      {
        id: generateId(),
        text,
        isUser,
        timestamp: new Date(),
        type
      }
    ]);
  }, []);

  // Function to create a new session
  const newSession = useCallback(() => {
    sessionIdRef.current = generateId();
  }, []);

  // Function to process the query and get a response
  const processQuery = useCallback(async (query: string) => {
    if (!query.trim() || isProcessing) return;
    
    try {
      setIsProcessing(true);
      if (onProcessingStart) onProcessingStart();
      
      // Add thinking message
      addMessage('Thinking...', false, 'thinking');
      
      // Create a new abort controller
      abortControllerRef.current = new AbortController();
      pendingRequestRef.current = true;
      
      // Count this request
      const currentRequestCount = ++requestCountRef.current;
      
      // Set request timeout
      timeoutRef.current = setTimeout(() => {
        if (abortControllerRef.current && pendingRequestRef.current) {
          abortControllerRef.current.abort();
          pendingRequestRef.current = false;
          
          if (mountedRef.current && currentRequestCount === requestCountRef.current) {
            setIsProcessing(false);
            if (onProcessingEnd) onProcessingEnd();
            
            // Replace thinking message with error
            setMessages(prev => {
              const newMessages = [...prev];
              // Remove the last message if it's a thinking message
              if (newMessages.length > 0 && newMessages[newMessages.length - 1].type === 'thinking') {
                newMessages.pop();
              }
              // Add error message
              newMessages.push({
                id: generateId(),
                text: 'Request timed out. Please try again.',
                isUser: false,
                timestamp: new Date(),
                type: 'error'
              });
              return newMessages;
            });
            
            // Update network status to indicate API issues
            const newStatus = {
              ...networkStatus,
              error: 'Request timed out',
              lastChecked: new Date()
            };
            setNetworkStatus(newStatus);
            if (onNetworkStatusChange) onNetworkStatusChange(newStatus);
          }
        }
      }, 15000); // 15 second timeout
      
      // Make API request
      try {
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            query,
            sessionId: sessionIdRef.current
          }),
          signal: abortControllerRef.current.signal
        });
        
        pendingRequestRef.current = false;
        
        // Clear timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        
        // Update network status
        const newStatus = {
          online: true,
          error: null,
          lastChecked: new Date()
        };
        setNetworkStatus(newStatus);
        if (onNetworkStatusChange) onNetworkStatusChange(newStatus);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Only update if this is still the latest request
        if (mountedRef.current && currentRequestCount === requestCountRef.current) {
          // Replace thinking message with assistant response
          setMessages(prev => {
            const newMessages = [...prev];
            // Remove the last message if it's a thinking message
            if (newMessages.length > 0 && newMessages[newMessages.length - 1].type === 'thinking') {
              newMessages.pop();
            }
            // Add assistant response
            newMessages.push({
              id: generateId(),
              text: data.answer,
              isUser: false,
              timestamp: new Date(),
              type: 'message'
            });
            return newMessages;
          });
          
          // Trigger callback
          if (onResponse) onResponse(data);
          
          // Read response aloud if speech synthesis is available
          if (speakResponse && synthRef.current && data.answer) {
            const utterance = new SpeechSynthesisUtterance(data.answer);
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            utterance.volume = 1.0;
            
            utterance.onstart = () => {
              if (mountedRef.current) setIsSpeaking(true);
            };
            
            utterance.onend = () => {
              if (mountedRef.current) setIsSpeaking(false);
            };
            
            utterance.onerror = (event) => {
              console.error('Speech synthesis error:', event.error);
              if (mountedRef.current) setIsSpeaking(false);
            };
            
            synthRef.current.speak(utterance);
          }
        }
      } catch (fetchError) {
        throw fetchError;
      }
      
    } catch (e) {
      if (e instanceof Error && e.name === 'AbortError') {
        // Request was aborted, ignore
        return;
      }
      
      console.error('Error processing query:', e);
      
      // Only update if component is still mounted
      if (mountedRef.current) {
        const error = e instanceof Error ? e : new Error(String(e));
        setError(error);
        if (onError) onError(error);
        
        // Replace thinking message with error
        setMessages(prev => {
          const newMessages = [...prev];
          // Remove the last message if it's a thinking message
          if (newMessages.length > 0 && newMessages[newMessages.length - 1].type === 'thinking') {
            newMessages.pop();
          }
          // Add error message
          newMessages.push({
            id: generateId(),
            text: `Error: ${error.message}`,
            isUser: false,
            timestamp: new Date(),
            type: 'error'
          });
          return newMessages;
        });
        
        // Update network status
        if (navigator.onLine) {
          const newStatus = {
            ...networkStatus,
            error: error.message,
            lastChecked: new Date()
          };
          setNetworkStatus(newStatus);
          if (onNetworkStatusChange) onNetworkStatusChange(newStatus);
        }
      }
    } finally {
      if (mountedRef.current) {
        setIsProcessing(false);
        if (onProcessingEnd) onProcessingEnd();
      }
    }
  }, [isProcessing, apiEndpoint, onError, onProcessingEnd, onProcessingStart, onResponse, onNetworkStatusChange, speakResponse, networkStatus, addMessage]);

  // Submit text query function (for typed queries)
  const submitQuery = useCallback((query: string) => {
    if (!query || !query.trim()) return;
    
    // Add user message
    addMessage(query, true);
    // Process query
    processQuery(query);
  }, [addMessage, processQuery]);

  // Function to start listening for voice input
  const startListening = useCallback(() => {
    // Check if speech recognition is supported and initialized
    if (!recognitionRef.current) {
      console.error('Speech recognition not supported or not initialized');
      addMessage('Speech recognition not supported in this browser.', false, 'error');
      setIsListening(false);
      return;
    }

    try {
      // Clear any existing recognition handlers to prevent duplicates
      const recognition = recognitionRef.current;
      
      // Clear old event listeners if any - use type casting to avoid type errors
      recognition.onstart = null as unknown as ((event: Event) => void);
      recognition.onend = null as unknown as ((event: Event) => void);
      recognition.onerror = null as unknown as ((event: SpeechRecognitionErrorEvent) => void);
      recognition.onresult = null as unknown as ((event: SpeechRecognitionEvent) => void);
      
      // Setup new event handlers
      recognition.onstart = () => {
        if (mountedRef.current) {
          setTranscript('');
          setIsListening(true);
          setListeningStartTime(Date.now());
        }
      };
      
      recognition.onend = () => {
        if (mountedRef.current) {
          setIsListening(false);
          
          // If we have a valid transcript, submit it after recognition ends
          if (transcript.trim()) {
            const finalTranscript = transcript.trim();
            submitQuery(finalTranscript);
          }
        }
      };
      
      recognition.onerror = (event: any) => {
        if (mountedRef.current) {
          setIsListening(false);
          console.error('Speech recognition error:', event.error);
          
          // Add user-friendly error message
          if (event.error === 'no-speech') {
            addMessage('I didn\'t hear anything. Please try again.', false, 'error');
          } else if (event.error === 'network') {
            addMessage('Network error occurred. Please check your connection.', false, 'error');
          } else {
            addMessage(`Speech recognition error: ${event.error}`, false, 'error');
          }
        }
      };
      
      recognition.onresult = (event: any) => {
        if (mountedRef.current) {
          const current = event.resultIndex;
          const result = event.results[current];
          const transcriptValue = result[0].transcript;
          
          if (result.isFinal) {
            setTranscript(prev => {
              const newTranscript = (prev + ' ' + transcriptValue).trim();
              return newTranscript;
            });
          } else {
            // Update interim results for visual feedback
            setInterimTranscript(transcriptValue);
          }
        }
      };
      
      // Start the recognition
      recognition.start();
      
      // Add timeout to stop listening after a certain period of inactivity
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        if (isListening && recognitionRef.current) {
          try {
            recognitionRef.current.stop();
          } catch (e) {
            console.error('Error stopping recognition:', e);
          }
        }
      }, 10000); // 10 seconds timeout
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setIsListening(false);
      addMessage('Failed to start speech recognition. Please try again.', false, 'error');
    }
  }, [isListening, transcript, addMessage, submitQuery]);

  // Stop listening function
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.error('Error stopping speech recognition:', e);
      }
    }
    setIsListening(false);
  }, []);

  // Cancel current request
  const cancelRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    pendingRequestRef.current = false;
    setIsProcessing(false);
    if (onProcessingEnd) onProcessingEnd();
    
    // Remove any thinking messages
    setMessages(prev => prev.filter(msg => msg.type !== 'thinking'));
  }, [onProcessingEnd]);

  // Stop speaking
  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsSpeaking(false);
  }, []);

  // Clear all messages
  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
    cancelRequest();
    stopSpeaking();
  }, [cancelRequest, stopSpeaking]);

  // Return all functions and state
  return {
    isListening,
    isProcessing,
    isSpeaking,
    messages,
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
  };
} 
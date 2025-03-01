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
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    online: navigator.onLine,
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

  // Start listening function
  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      setError(new Error('Speech recognition not supported'));
      if (onError) onError(new Error('Speech recognition not supported'));
      return;
    }
    
    try {
      recognitionRef.current.start();
      setIsListening(true);
      
      // Clear any previous transcript
      setMessages(prev => {
        // If the last message is a user message that's empty, remove it
        if (prev.length > 0 && prev[prev.length - 1].isUser && prev[prev.length - 1].text === '') {
          return prev.slice(0, -1);
        }
        return prev;
      });
      
      // Add an empty user message that will be updated with transcript
      setMessages(prev => [
        ...prev,
        { 
          id: generateId(), 
          text: '', 
          isUser: true, 
          timestamp: new Date(),
          type: 'message'
        }
      ]);
      
      // Set up recognition event handlers
      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        
        // Update the last user message with the transcript
        setMessages(prev => {
          const newMessages = [...prev];
          if (newMessages.length > 0 && newMessages[newMessages.length - 1].isUser) {
            newMessages[newMessages.length - 1].text = transcript;
          }
          return newMessages;
        });
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setError(new Error(`Speech recognition error: ${event.error}`));
        if (onError) onError(new Error(`Speech recognition error: ${event.error}`));
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        if (mountedRef.current) {
          setIsListening(false);
          
          // Get the last message to see if we have content to process
          const lastMessage = messages[messages.length - 1];
          if (lastMessage && lastMessage.isUser && lastMessage.text.trim()) {
            // Process the message
            processQuery(lastMessage.text);
          }
        }
      };
    } catch (e) {
      console.error('Error starting speech recognition:', e);
      setError(e instanceof Error ? e : new Error(String(e)));
      if (onError) onError(e instanceof Error ? e : new Error(String(e)));
      setIsListening(false);
    }
  }, [messages, onError]);

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

  // Process query function with debouncing and cancellation
  const processQuery = useCallback(async (query: string) => {
    if (!query.trim() || pendingRequestRef.current) return;
    
    // Increment the request count for debouncing
    const currentRequestId = ++requestCountRef.current;
    
    // Cancel any previous requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Mark that we're processing a request
    setIsProcessing(true);
    pendingRequestRef.current = true;
    if (onProcessingStart) onProcessingStart();
    
    // Add a thinking message from the assistant
    const thinkingMessageId = generateId();
    setMessages(prev => [
      ...prev,
      { 
        id: thinkingMessageId, 
        text: 'Thinking...', 
        isUser: false, 
        timestamp: new Date(),
        type: 'thinking'
      }
    ]);
    
    // Create a new AbortController for this request
    abortControllerRef.current = new AbortController();
    
    // Set a timeout to abort the request if it takes too long
    timeoutRef.current = setTimeout(() => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
      
      // If this is still the current request, update state
      if (currentRequestId === requestCountRef.current && mountedRef.current) {
        pendingRequestRef.current = false;
        setIsProcessing(false);
        if (onProcessingEnd) onProcessingEnd();
        
        // Replace thinking message with error
        setMessages(prev => prev.map(msg => 
          msg.id === thinkingMessageId
            ? { 
                ...msg, 
                text: 'Sorry, the request timed out. Please try again.', 
                type: 'error' 
              }
            : msg
        ));
        
        setError(new Error('Request timed out'));
        if (onError) onError(new Error('Request timed out'));
      }
    }, 8000); // 8 second timeout
    
    try {
      const requestId = generateId();
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          sessionId: sessionIdRef.current,
          requestId // Include unique request ID
        }),
        signal: abortControllerRef.current.signal,
      });
      
      // Check if this is still the current request
      if (currentRequestId !== requestCountRef.current) {
        return; // A newer request has been made, discard this one
      }
      
      // Clear the timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      
      if (!response.ok) {
        let errorMessage = `Server error: ${response.status}`;
        
        if (response.status === 502) {
          errorMessage = 'The service is temporarily unavailable. Please try again later.';
          console.error('502 Bad Gateway error from API');
          
          // Update network status
          const newStatus: NetworkStatus = {
            online: true,
            error: '502 Bad Gateway',
            lastChecked: new Date()
          };
          setNetworkStatus(newStatus);
          if (onNetworkStatusChange) onNetworkStatusChange(newStatus);
        }
        
        // Replace thinking message with error
        setMessages(prev => prev.map(msg => 
          msg.id === thinkingMessageId
            ? { 
                ...msg, 
                text: errorMessage, 
                type: 'error' 
              }
            : msg
        ));
        
        const error = new Error(errorMessage);
        setError(error);
        if (onError) onError(error);
      } else {
        const data: VoiceAssistantResponse = await response.json();
        
        // Replace thinking message with actual response
        setMessages(prev => prev.map(msg => 
          msg.id === thinkingMessageId
            ? { 
                ...msg, 
                text: data.answer, 
                type: 'message' 
              }
            : msg
        ));
        
        // Speak the response if enabled
        if (speakResponse && synthRef.current && data.answer) {
          const utterance = new SpeechSynthesisUtterance(data.answer);
          utterance.rate = 1.0;
          utterance.pitch = 1.0;
          
          // Use a more natural voice if available
          const voices = synthRef.current.getVoices();
          const preferredVoice = voices.find(voice => 
            voice.name.includes('Samantha') || 
            voice.name.includes('Google UK English Female') ||
            voice.name.includes('Microsoft Zira')
          );
          
          if (preferredVoice) {
            utterance.voice = preferredVoice;
          }
          
          utterance.onstart = () => {
            setIsSpeaking(true);
          };
          
          utterance.onend = () => {
            if (mountedRef.current) {
              setIsSpeaking(false);
            }
          };
          
          utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event.error);
            if (mountedRef.current) {
              setIsSpeaking(false);
            }
          };
          
          synthRef.current.speak(utterance);
        }
        
        // Call the onResponse callback if provided
        if (onResponse) onResponse(data);
      }
    } catch (e) {
      // Only handle errors if this is still the current request
      if (currentRequestId === requestCountRef.current && mountedRef.current) {
        console.error('Error processing query:', e);
        
        let errorMessage = 'An error occurred while processing your request.';
        
        // Check if this is an abort error (timeout or user cancellation)
        if (e instanceof DOMException && e.name === 'AbortError') {
          errorMessage = 'The request was cancelled.';
        }
        
        // Check if we're offline
        if (!navigator.onLine) {
          errorMessage = 'You appear to be offline. Please check your connection and try again.';
        }
        
        // Replace thinking message with error
        setMessages(prev => prev.map(msg => 
          msg.id === thinkingMessageId
            ? { 
                ...msg, 
                text: errorMessage, 
                type: 'error' 
              }
            : msg
        ));
        
        setError(e instanceof Error ? e : new Error(String(e)));
        if (onError) onError(e instanceof Error ? e : new Error(String(e)));
      }
    } finally {
      // Check if this is still the current request
      if (currentRequestId === requestCountRef.current && mountedRef.current) {
        pendingRequestRef.current = false;
        setIsProcessing(false);
        if (onProcessingEnd) onProcessingEnd();
      }
    }
  }, [apiEndpoint, onError, onProcessingEnd, onProcessingStart, onResponse, onNetworkStatusChange, speakResponse]);

  // Process query manually (for text input)
  const submitQuery = useCallback((query: string) => {
    if (!query.trim()) return;
    
    // Add user message
    setMessages(prev => [
      ...prev,
      { 
        id: generateId(), 
        text: query, 
        isUser: true, 
        timestamp: new Date(),
        type: 'message'
      }
    ]);
    
    // Process the query
    processQuery(query);
  }, [processQuery]);

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

  // Create a new session
  const newSession = useCallback(() => {
    sessionIdRef.current = generateId();
    clearMessages();
  }, [clearMessages]);

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
    checkNetworkStatus
  };
} 
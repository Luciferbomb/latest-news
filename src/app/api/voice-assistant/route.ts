import { NextResponse } from 'next/server';

// API keys - in production, these should be in environment variables
const HUME_API_KEY = process.env.HUME_API_KEY || 'epagql1TPhg8e1hqHMutK4o1D3wksACU9uodFq4HjGbOlbE4';
const HUME_CONFIG_ID = process.env.NEXT_PUBLIC_HUME_CONFIG_ID || '6de7c548-a0a2-4d95-b975-1bfd9d245b15';
const HUME_SECRET_KEY = process.env.HUME_SECRET_KEY || 'MTYVq0wnAaZQQt2hEzJLLUn7sbNqmvkX0GRTuZOx0TzUePJfV1wgpUOB3RouQ8MR';

// Define a type for the voice assistant request
interface VoiceAssistantRequest {
  query: string;
  sessionId?: string;
}

// Define a type for the voice assistant response
interface VoiceAssistantResponse {
  answer: string;
  confidence: number;
  isTechQuestion: boolean;
  source?: string;
}

// System prompt for Hume to ensure it responds only to tech questions
const SYSTEM_PROMPT = `You are a helpful AI assistant specialized in technology topics.
You should ONLY answer questions related to technology, AI, programming, computers, 
electronics, software, hardware, and related technical fields.

If a user asks a question that is not related to technology, politely decline to answer and
explain that you can only provide information about technology topics.

Keep your answers concise (maximum 2-3 sentences), accurate, and informative. Focus on the latest 
advancements and developments in AI and technology. 

Always respond in a helpful, enthusiastic tone. Speak directly to the user as if in a conversation.
Include specific details when answering questions about technology companies, products, or concepts.`;

// Tech-related keywords to determine if a question is about technology
const TECH_KEYWORDS = [
  'ai', 'artificial intelligence', 'machine learning', 'ml', 'deep learning', 
  'neural network', 'technology', 'software', 'hardware', 'computer', 'programming',
  'code', 'algorithm', 'data', 'cloud', 'internet', 'web', 'app', 'application',
  'device', 'robot', 'robotics', 'automation', 'cyber', 'digital', 'electronic',
  'processor', 'chip', 'semiconductor', 'server', 'network', 'browser', 'language',
  'framework', 'library', 'api', 'interface', 'database', 'storage', 'memory',
  'gpu', 'cpu', 'quantum', 'virtual reality', 'vr', 'augmented reality', 'ar',
  'blockchain', 'cryptocurrency', 'crypto', 'bitcoin', 'ethereum', 'nft',
  'security', 'encryption', 'privacy', 'streaming', 'video', 'audio', 'voice',
  'assistant', 'chatbot', 'gpt', 'llm', 'large language model', 'transformer',
  'openai', 'google', 'microsoft', 'apple', 'amazon', 'meta', 'facebook',
  'twitter', 'x', 'social media', 'search engine', 'browser', 'mobile', 'phone',
  'smartphone', 'tablet', 'laptop', 'desktop', 'server', 'cloud computing',
  'saas', 'paas', 'iaas', 'devops', 'agile', 'scrum', 'kanban', 'git', 'github',
  'gitlab', 'bitbucket', 'coding', 'development', 'developer', 'engineer',
  'engineering', 'computer science', 'cs', 'information technology', 'it'
];

/**
 * Checks if a query is related to technology
 */
function isTechQuestion(query: string): boolean {
  const techKeywords = ['ai', 'artificial intelligence', 'machine learning', 'technology', 'software', 'hardware', 'computer', 'digital', 'app', 'application', 'code', 'programming', 'developer', 'tech', 'algorithm', 'data', 'neural', 'model', 'automation', 'robot'];
  return techKeywords.some(keyword => query.toLowerCase().includes(keyword));
}

/**
 * Pre-process the user query to enhance API response quality
 */
function preprocessQuery(query: string): string {
  // Remove filler words and common speech patterns
  let processed = query
    .replace(/^(hey|hi|hello|um|uh|so|like|basically|actually|you know|i mean|right)\s+/gi, '')
    .replace(/\s+(hey|hi|hello|um|uh|so|like|basically|actually|you know|i mean|right)$/gi, '')
    .trim();
  
  // Add a question mark if it's likely a question but missing punctuation
  if (processed.match(/^(what|who|where|when|why|how|can|could|would|is|are|will|should)/i) && 
      !processed.match(/[.?!]$/)) {
    processed += '?';
  }
  
  return processed;
}

/**
 * Try to get a response from Hume API
 */
async function getHumeResponse(query: string): Promise<VoiceAssistantResponse | null> {
  const configId = process.env.NEXT_PUBLIC_HUME_CONFIG_ID;
  const apiKey = process.env.HUME_API_KEY;
  
  if (!apiKey) {
    console.warn("No Hume API key found");
    return null;
  }
  
  try {
    console.log("Attempting to call Hume API with query:", query);
    
    // Use the correct API endpoint for Hume AI
    const response = await fetch('https://api.hume.ai/v0/models/text/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Hume-Api-Key': apiKey
      },
      body: JSON.stringify({
        config_id: configId,
        prompt: preprocessQuery(query),
        max_tokens: 256
      }),
      cache: 'no-store' // Ensure we don't get cached responses
    });

    if (!response.ok) {
      console.error(`Hume API Error: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error('Hume API Error details:', errorText);
      
      // Try fallback with a different API key if available
      const fallbackKey = process.env.HUME_SECRET_KEY;
      if (fallbackKey && fallbackKey !== apiKey) {
        console.log("Attempting with fallback API key");
        const fallbackResponse = await fetch('https://api.hume.ai/v0/models/text/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Hume-Api-Key': fallbackKey
          },
          body: JSON.stringify({
            config_id: configId,
            prompt: preprocessQuery(query),
            max_tokens: 256
          }),
          cache: 'no-store'
        });
        
        if (!fallbackResponse.ok) {
          console.error(`Fallback Hume API Error: ${fallbackResponse.status} ${fallbackResponse.statusText}`);
          return generateFallbackResponse(query);
        }
        
        const fallbackData = await fallbackResponse.json();
        if (!fallbackData.text) {
          console.error('Unexpected fallback Hume API response format:', fallbackData);
          return generateFallbackResponse(query);
        }
        
        const fallbackAnswer = fallbackData.text || '';
        return {
          answer: postprocessAnswer(fallbackAnswer),
          confidence: 0.9,
          isTechQuestion: isTechQuestion(query),
          source: 'Hume AI (Fallback)'
        };
      }
      
      return generateFallbackResponse(query);
    }

    const data = await response.json();
    console.log("Hume API response received:", JSON.stringify(data).substring(0, 200) + "...");
    
    if (!data.text) {
      console.error('Unexpected Hume API response format:', data);
      return generateFallbackResponse(query);
    }

    const answer = data.text || '';
    
    return {
      answer: postprocessAnswer(answer),
      confidence: 0.95,
      isTechQuestion: isTechQuestion(query),
      source: 'Hume AI'
    };
  } catch (error) {
    console.error('Hume API request error:', error);
    return generateFallbackResponse(query);
  }
}

/**
 * Post-process the AI answer to ensure it's conversational and concise
 */
function postprocessAnswer(answer: string): string {
  // Remove any markdown formatting that might be present
  let processed = answer
    .replace(/```[a-z]*\n|```/g, '') // Remove code blocks
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1')     // Remove italics
    .trim();
  
  // Limit to first 3 sentences if the answer is very long
  if (processed.length > 200) {
    const sentences = processed.match(/[^.!?]+[.!?]+/g) || [];
    if (sentences.length > 3) {
      processed = sentences.slice(0, 3).join(' ');
    }
  }
  
  // Make sure the answer sounds conversational
  if (!processed.match(/^(I'm|I am|I'll|I will|I've|I have|I'd|I would|The|This|That|There|These|Those|It|Its)/i)) {
    processed = "The " + processed.charAt(0).toLowerCase() + processed.slice(1);
  }
  
  return processed;
}

/**
 * Generates a fallback response based on the query
 */
function generateFallbackResponse(query: string): VoiceAssistantResponse {
  let answer = "I'm sorry, I couldn't process your request at the moment. ";
  
  if (isTechQuestion(query)) {
    answer += "This appears to be a technology-related question. Please try again later or check our news feed for the latest AI updates.";
  } else {
    answer += "Please try again later or browse our latest news for information that might help.";
  }
  
  return {
    answer,
    confidence: 0.5,
    isTechQuestion: isTechQuestion(query),
    source: 'Fallback System'
  };
}

// Track requests to prevent duplicates
const pendingQueries = new Map<string, Promise<VoiceAssistantResponse>>();

// Enhanced in-memory cache with TTL and request frequency tracking
interface CacheEntry {
  response: VoiceAssistantResponse;
  timestamp: number;
  accessCount: number;
}

const responseCache = new Map<string, CacheEntry>();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_CACHE_SIZE = 50; // Maximum number of cached responses

// Periodically clean up old cache entries
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of responseCache.entries()) {
    if (now - entry.timestamp > CACHE_TTL) {
      responseCache.delete(key);
    }
  }
}, 60 * 1000); // Clean up every minute

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body: VoiceAssistantRequest = await request.json();
    
    if (!body.query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }
    
    // Create a unique key for this query
    const queryKey = `${body.sessionId || 'default'}-${body.query}`;
    
    // Check if we're already processing this exact query
    if (pendingQueries.has(queryKey)) {
      console.log(`Duplicate query detected: ${body.query}`);
      const response = await pendingQueries.get(queryKey);
      return NextResponse.json(response, { status: 200 });
    }
    
    // Check cache first with normalized query
    const normalizedQuery = body.query.toLowerCase().trim();
    const cachedItem = responseCache.get(normalizedQuery);
    
    if (cachedItem && (Date.now() - cachedItem.timestamp) < CACHE_TTL) {
      console.log(`Using cached response for: ${normalizedQuery}`);
      
      // Update access count for this cache entry
      cachedItem.accessCount += 1;
      
      return NextResponse.json(cachedItem.response, { status: 200 });
    }
    
    // Log the query (for debugging)
    console.log(`Voice assistant query: ${body.query}`);
    
    // Create a promise for the query processing
    const responsePromise = (async () => {
      try {
        // First try to get a response from Hume
        const humeResponse = await getHumeResponse(body.query);
        
        // Store successful response in cache
        if (humeResponse) {
          // Check if we need to trim the cache
          if (responseCache.size >= MAX_CACHE_SIZE) {
            // Find the least accessed entry
            let leastAccessedKey: string | null = null;
            let leastAccessCount = Infinity;
            
            for (const [key, entry] of responseCache.entries()) {
              if (entry.accessCount < leastAccessCount) {
                leastAccessCount = entry.accessCount;
                leastAccessedKey = key;
              }
            }
            
            // Remove least accessed entry
            if (leastAccessedKey) {
              responseCache.delete(leastAccessedKey);
            }
          }
          
          // Store in cache
          responseCache.set(normalizedQuery, {
            response: humeResponse,
            timestamp: Date.now(),
            accessCount: 1
          });
          
          return humeResponse;
        }
        
        // Fallback if Hume fails
        const fallbackResponse = generateFallbackResponse(body.query);
        responseCache.set(normalizedQuery, {
          response: fallbackResponse,
          timestamp: Date.now(),
          accessCount: 1
        });
        return fallbackResponse;
      } catch (error) {
        console.error("Error processing query:", error);
        return generateFallbackResponse(body.query);
      }
    })();
    
    // Store the promise in our map
    pendingQueries.set(queryKey, responsePromise);
    
    // Wait for the response
    const response = await responsePromise;
    
    // Clean up after a short delay (to catch rapid duplicate requests)
    setTimeout(() => {
      pendingQueries.delete(queryKey);
    }, 5000);
    
    // Return the response
    return NextResponse.json(response, { status: 200 });
    
  } catch (error: any) {
    console.error('Error processing voice assistant query:', error);
    
    // Provide a fallback response even on errors
    const fallbackResponse = {
      answer: "I'm sorry, I'm having trouble processing your request. Please try again in a moment.",
      confidence: 0.5,
      isTechQuestion: true,
      source: "error_fallback"
    };
    
    return NextResponse.json(fallbackResponse, { status: 200 });
  }
}

// For simple test queries via GET
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter q is required' },
        { status: 400 }
      );
    }
    
    // Create a unique key for this query
    const queryKey = `get-${query}`;
    
    // Check cache first
    const normalizedQuery = query.toLowerCase().trim();
    const cachedItem = responseCache.get(normalizedQuery);
    
    if (cachedItem && (Date.now() - cachedItem.timestamp) < CACHE_TTL) {
      console.log(`Using cached response for GET: ${normalizedQuery}`);
      
      // Update access count
      cachedItem.accessCount += 1;
      
      return NextResponse.json(cachedItem.response, { status: 200 });
    }
    
    // Check if we're already processing this exact query
    if (pendingQueries.has(queryKey)) {
      console.log(`Duplicate GET query detected: ${query}`);
      const response = await pendingQueries.get(queryKey);
      return NextResponse.json(response, { status: 200 });
    }
    
    // Create a promise for the query processing
    const responsePromise = (async () => {
      try {
        // Try to get a response from Hume first
        const humeResponse = await getHumeResponse(query);
        
        // Store successful response in cache
        if (humeResponse) {
          // Check if we need to trim the cache
          if (responseCache.size >= MAX_CACHE_SIZE) {
            // Similar to POST handler - find least accessed entry
            let leastAccessedKey: string | null = null;
            let leastAccessCount = Infinity;
            
            for (const [key, entry] of responseCache.entries()) {
              if (entry.accessCount < leastAccessCount) {
                leastAccessCount = entry.accessCount;
                leastAccessedKey = key;
              }
            }
            
            if (leastAccessedKey) {
              responseCache.delete(leastAccessedKey);
            }
          }
          
          responseCache.set(normalizedQuery, {
            response: humeResponse,
            timestamp: Date.now(),
            accessCount: 1
          });
          
          return humeResponse;
        }
        
        // Fallback if Hume fails
        const fallbackResponse = generateFallbackResponse(query);
        responseCache.set(normalizedQuery, {
          response: fallbackResponse,
          timestamp: Date.now(),
          accessCount: 1
        });
        return fallbackResponse;
      } catch (error) {
        console.error("Error processing GET query:", error);
        return generateFallbackResponse(query);
      }
    })();
    
    // Store the promise in our map
    pendingQueries.set(queryKey, responsePromise);
    
    // Wait for the response
    const response = await responsePromise;
    
    // Clean up after a short delay
    setTimeout(() => {
      pendingQueries.delete(queryKey);
    }, 5000);
    
    // Return the response
    return NextResponse.json(response, { status: 200 });
    
  } catch (error: any) {
    console.error('Error processing voice assistant query:', error);
    
    // Provide a fallback response even on errors
    const fallbackResponse = {
      answer: "I'm sorry, I'm having trouble processing your request. Please try again in a moment.",
      confidence: 0.5,
      isTechQuestion: true,
      source: "error_fallback"
    };
    
    return NextResponse.json(fallbackResponse, { status: 200 });
  }
}

// HEAD request handler
export async function HEAD(request: Request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
} 
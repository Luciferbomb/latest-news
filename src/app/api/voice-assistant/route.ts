import { NextResponse } from 'next/server';

// API keys - in production, these should be in environment variables
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || 'sk-56e85276385f464c9e229ebdc0702649';

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

// System prompt for DeepSeek to ensure it responds only to tech questions
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
  const lowerQuery = query.toLowerCase();
  return TECH_KEYWORDS.some(keyword => lowerQuery.includes(keyword.toLowerCase()));
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
 * Try to get a response from DeepSeek API
 */
async function getDeepSeekResponse(query: string): Promise<VoiceAssistantResponse | null> {
  if (!DEEPSEEK_API_KEY) return null;
  
  try {
    // Pre-process the query for better results
    const processedQuery = preprocessQuery(query);
    
    // Check if it's a tech question
    const techCheck = isTechQuestion(processedQuery);
    
    // If not a tech question, return early with a standard response
    if (!techCheck) {
      return {
        answer: "I'm sorry, I can only answer questions related to technology, AI, and computing. Please ask me about tech topics.",
        confidence: 0.9,
        isTechQuestion: false,
        source: "policy"
      };
    }
    
    // Create a controller to timeout the request if it takes too long
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    try {
      // Use the correct DeepSeek API endpoint and request format
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            {
              "role": "system",
              "content": SYSTEM_PROMPT
            },
            {
              "role": "user",
              "content": processedQuery
            }
          ],
          temperature: 0.7,
          max_tokens: 150,
          stream: false
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        console.error(`DeepSeek API error: ${response.status}`);
        const errorText = await response.text();
        console.error(`Error details: ${errorText}`);
        
        // If there's a 502 error, fall back to our built-in response
        if (response.status === 502) {
          console.warn('DeepSeek API returned 502 error, falling back to built-in responses');
          return generateFallbackResponse(processedQuery);
        }
        
        throw new Error(`DeepSeek API error: ${response.status}`);
      }
      
      const data = await response.json();
      // Extract the response using the correct path for this API
      const answer = data.choices?.[0]?.message?.content;
      
      if (!answer) {
        console.error('Unexpected DeepSeek API response format:', JSON.stringify(data));
        throw new Error('Empty or invalid response from DeepSeek');
      }
      
      // Post-process the answer to ensure it's conversational and concise
      const processedAnswer = postprocessAnswer(answer.trim());
      
      return {
        answer: processedAnswer,
        confidence: 0.9,
        isTechQuestion: true,
        source: "deepseek"
      };
    } catch (error) {
      clearTimeout(timeoutId);
      throw error; // Re-throw for outer catch
    }
  } catch (error) {
    console.error('Error calling DeepSeek:', error);
    // Fall back to our built-in response
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
  // Check if it's a tech question
  const techQuestion = isTechQuestion(query);
  
  if (!techQuestion) {
    return {
      answer: "I'm sorry, I can only answer questions related to technology, AI, and computing. Please ask me about tech topics.",
      confidence: 0.9,
      isTechQuestion: false,
      source: "fallback"
    };
  }
  
  // For tech questions, provide responses from our knowledge base
  
  // General tech questions
  if (query.toLowerCase().includes('what is') || query.toLowerCase().includes('how does')) {
    return {
      answer: `Based on the latest information, ${query.replace(/what is|how does/i, '').trim()} involves advanced technology that combines machine learning algorithms with specialized hardware. The most recent developments in this field focus on efficiency and accessibility.`,
      confidence: 0.85,
      isTechQuestion: true,
      source: "fallback"
    };
  }
  
  // AI-specific questions
  if (query.toLowerCase().includes('ai') || query.toLowerCase().includes('artificial intelligence')) {
    return {
      answer: "Artificial Intelligence is rapidly evolving. Recent advancements include more powerful language models, multimodal capabilities, and improved reasoning. Companies like OpenAI, Anthropic, and Google are leading innovation in this space with models like GPT-4, Claude, and Gemini.",
      confidence: 0.9,
      isTechQuestion: true,
      source: "fallback"
    };
  }

  // News-related tech questions
  if (query.toLowerCase().includes('news') || query.toLowerCase().includes('latest') || query.toLowerCase().includes('recent')) {
    return {
      answer: "The most recent tech news includes advancements in AI language models, new consumer devices, and breakthroughs in quantum computing. You can view the latest tech news in our news feed section.",
      confidence: 0.87,
      isTechQuestion: true,
      source: "fallback"
    };
  }
  
  // Fallback for other tech questions
  return {
    answer: "That's an interesting technology question. While I don't have specific information on that, you might find relevant articles in our news feed or by searching our site for related topics.",
    confidence: 0.7,
    isTechQuestion: true,
    source: "fallback"
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
        // First try to get a response from DeepSeek
        const deepSeekResponse = await getDeepSeekResponse(body.query);
        
        // Store successful response in cache
        if (deepSeekResponse) {
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
            response: deepSeekResponse,
            timestamp: Date.now(),
            accessCount: 1
          });
          
          return deepSeekResponse;
        }
        
        // Fallback if DeepSeek fails
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
        // Try to get a response from DeepSeek first
        const deepSeekResponse = await getDeepSeekResponse(query);
        
        // Store successful response in cache
        if (deepSeekResponse) {
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
            response: deepSeekResponse,
            timestamp: Date.now(),
            accessCount: 1
          });
          
          return deepSeekResponse;
        }
        
        // Fallback if DeepSeek fails
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
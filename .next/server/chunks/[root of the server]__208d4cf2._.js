module.exports = {

"[project]/latest-news/.next-internal/server/app/api/voice-assistant/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route.runtime.dev.js [external] (next/dist/compiled/next-server/app-route.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, d: __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/latest-news/src/app/api/voice-assistant/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET),
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
// API keys - in production, these should be in environment variables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
// System prompt for OpenAI to ensure it responds only to tech questions
const SYSTEM_PROMPT = `You are a helpful AI assistant specialized in technology topics.
You should ONLY answer questions related to technology, AI, programming, computers, 
electronics, software, hardware, and related technical fields.

If a user asks a question that is not related to technology, politely decline to answer and
explain that you can only provide information about technology topics.

Keep your answers concise (maximum 3 sentences), accurate, and informative. Focus on the latest 
advancements and developments in AI and technology.`;
// Tech-related keywords to determine if a question is about technology
const TECH_KEYWORDS = [
    'ai',
    'artificial intelligence',
    'machine learning',
    'ml',
    'deep learning',
    'neural network',
    'technology',
    'software',
    'hardware',
    'computer',
    'programming',
    'code',
    'algorithm',
    'data',
    'cloud',
    'internet',
    'web',
    'app',
    'application',
    'device',
    'robot',
    'robotics',
    'automation',
    'cyber',
    'digital',
    'electronic',
    'processor',
    'chip',
    'semiconductor',
    'server',
    'network',
    'browser',
    'language',
    'framework',
    'library',
    'api',
    'interface',
    'database',
    'storage',
    'memory',
    'gpu',
    'cpu',
    'quantum',
    'virtual reality',
    'vr',
    'augmented reality',
    'ar',
    'blockchain',
    'cryptocurrency',
    'crypto',
    'bitcoin',
    'ethereum',
    'nft',
    'security',
    'encryption',
    'privacy',
    'streaming',
    'video',
    'audio',
    'voice',
    'assistant',
    'chatbot',
    'gpt',
    'llm',
    'large language model',
    'transformer',
    'openai',
    'google',
    'microsoft',
    'apple',
    'amazon',
    'meta',
    'facebook',
    'twitter',
    'x',
    'social media',
    'search engine',
    'browser',
    'mobile',
    'phone',
    'smartphone',
    'tablet',
    'laptop',
    'desktop',
    'server',
    'cloud computing',
    'saas',
    'paas',
    'iaas',
    'devops',
    'agile',
    'scrum',
    'kanban',
    'git',
    'github',
    'gitlab',
    'bitbucket',
    'coding',
    'development',
    'developer',
    'engineer',
    'engineering',
    'computer science',
    'cs',
    'information technology',
    'it'
];
/**
 * Checks if a query is related to technology
 */ function isTechQuestion(query) {
    const lowerQuery = query.toLowerCase();
    return TECH_KEYWORDS.some((keyword)=>lowerQuery.includes(keyword.toLowerCase()));
}
/**
 * Try to get a response from OpenAI
 */ async function getOpenAIResponse(query) {
    if (!OPENAI_API_KEY) return null;
    try {
        const techCheck = isTechQuestion(query);
        // If not a tech question, return early with a standard response
        if (!techCheck) {
            return {
                answer: "I'm sorry, I can only answer questions related to technology, AI, and computing. Please ask me about tech topics.",
                confidence: 0.9,
                isTechQuestion: false,
                source: "policy"
            };
        }
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        "role": "system",
                        "content": SYSTEM_PROMPT
                    },
                    {
                        "role": "user",
                        "content": query
                    }
                ],
                temperature: 0.7,
                max_tokens: 150
            })
        });
        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.status}`);
        }
        const data = await response.json();
        const answer = data.choices?.[0]?.message?.content?.trim();
        if (!answer) {
            throw new Error('Empty response from OpenAI');
        }
        return {
            answer,
            confidence: 0.9,
            isTechQuestion: true,
            source: "openai"
        };
    } catch (error) {
        console.error('Error calling OpenAI:', error);
        return null;
    }
}
/**
 * Generates a fallback response based on the query
 */ function generateFallbackResponse(query) {
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
async function POST(request) {
    try {
        // Parse the request body
        const body = await request.json();
        if (!body.query) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Query is required'
            }, {
                status: 400
            });
        }
        // Log the query (for debugging)
        console.log(`Voice assistant query: ${body.query}`);
        // Try to get a response from OpenAI first
        const openAIResponse = await getOpenAIResponse(body.query);
        // If we got a valid response from OpenAI, use that
        if (openAIResponse) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(openAIResponse, {
                status: 200
            });
        }
        // Otherwise, fall back to our built-in response generator
        const fallbackResponse = generateFallbackResponse(body.query);
        // Return the response
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(fallbackResponse, {
            status: 200
        });
    } catch (error) {
        console.error('Error processing voice assistant query:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to process query',
            details: error.message
        }, {
            status: 500
        });
    }
}
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q');
        if (!query) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Query parameter q is required'
            }, {
                status: 400
            });
        }
        // Try to get a response from OpenAI first
        const openAIResponse = await getOpenAIResponse(query);
        // If we got a valid response from OpenAI, use that
        if (openAIResponse) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(openAIResponse, {
                status: 200
            });
        }
        // Otherwise, fall back to our built-in response generator
        const fallbackResponse = generateFallbackResponse(query);
        // Return the response
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(fallbackResponse, {
            status: 200
        });
    } catch (error) {
        console.error('Error processing voice assistant query:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to process query',
            details: error.message
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__208d4cf2._.js.map
module.exports = {

"[project]/latest-news/.next-internal/server/app/api/combined-news/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[project]/latest-news/src/app/api/combined-news/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
// API keys - in production, these should be in environment variables
const NEWS_API_KEY = process.env.NEWS_API_KEY || '0a3970c61b3346f28a0cfa28d0be700a';
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q') || 'AI tools OR AI agents OR artificial intelligence technology';
        console.log(`Fetching news with query: ${query}`);
        let newsData = [];
        let sourcesStatus = {
            newscatcher: 'not_attempted',
            serpApi: 'not_attempted'
        };
        // Try to fetch from NewsAPI.org
        try {
            // Make multiple requests to get comprehensive news coverage
            const apiRequests = [
                // Top headlines in technology category
                fetch(`https://newsapi.org/v2/top-headlines?category=technology&pageSize=15&language=en&apiKey=${NEWS_API_KEY}`),
                // Everything with AI query, sorted by relevance
                fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=relevancy&pageSize=15&language=en&apiKey=${NEWS_API_KEY}`),
                // Everything with AI query, sorted by date
                fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&pageSize=15&language=en&apiKey=${NEWS_API_KEY}`)
            ];
            // Execute API requests in parallel
            const responses = await Promise.all(apiRequests);
            // Check if any request was successful
            let successfulResponse = false;
            for (const response of responses){
                if (response.ok) {
                    successfulResponse = true;
                    const data = await response.json();
                    if (data.status === 'ok' && data.articles && data.articles.length > 0) {
                        const articles = data.articles.map((article)=>({
                                id: `newsapi-${Math.random().toString(36).substring(2)}`,
                                title: article.title,
                                description: article.description || article.content || '',
                                imageUrl: article.urlToImage || 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop',
                                date: article.publishedAt || new Date().toISOString(),
                                readTime: `${Math.ceil((article.content || '').length / 200 || 3)} min read`,
                                url: article.url,
                                source: article.source?.name || 'News Source',
                                categories: [
                                    'ai',
                                    'technology'
                                ]
                            }));
                        newsData = [
                            ...newsData,
                            ...articles
                        ];
                    }
                }
            }
            if (successfulResponse) {
                sourcesStatus = {
                    newscatcher: 'not_used',
                    serpApi: 'not_used',
                    newsApi: 'success'
                };
            } else {
                throw new Error('All NewsAPI requests failed');
            }
        } catch (apiError) {
            console.error('Error fetching from real APIs:', apiError);
        }
        // If we couldn't get data from real APIs or there was an error, return empty array
        if (newsData.length === 0) {
            console.log('No news data available from API');
            // Return empty array instead of mock data
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                news: [],
                lastUpdated: new Date().toISOString(),
                error: 'No news data available',
                sources: {
                    newscatcher: 'failed',
                    serpApi: 'failed',
                    newsApi: 'failed'
                }
            }, {
                status: 404
            });
        }
        // Sort by date (most recent first)
        newsData.sort((a, b)=>{
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB.getTime() - dateA.getTime();
        });
        // Remove duplicates based on title similarity
        const uniqueNews = removeDuplicates(newsData);
        // Enhance news items with AI features
        const enhancedNews = uniqueNews.map((item)=>({
                ...item,
                sentiment: getRandomSentiment(),
                sentimentScore: Math.random(),
                summary: item.description.length > 120 ? item.description.substring(0, 120) + '...' : item.description
            }));
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            news: enhancedNews,
            lastUpdated: new Date().toISOString(),
            sources: {
                ...sourcesStatus,
                newsApi: sourcesStatus.newsApi || 'using_mock'
            }
        }, {
            status: 200
        });
    } catch (error) {
        console.error('Error providing mock news:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            news: [],
            lastUpdated: new Date().toISOString(),
            error: error.message
        }, {
            status: 500
        });
    }
}
// Helper function to get random sentiment
function getRandomSentiment() {
    const sentiments = [
        'positive',
        'negative',
        'neutral'
    ];
    return sentiments[Math.floor(Math.random() * sentiments.length)];
}
// Helper function to format dates
function formatDate(date) {
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}
// Helper function to subtract days from current date
function subtractDays(days) {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
}
// Helper function to remove duplicate news items
function removeDuplicates(newsItems) {
    const uniqueMap = new Map();
    for (const item of newsItems){
        // Create a normalized version of the title for comparison
        const normalizedTitle = item.title.toLowerCase().replace(/[^a-z0-9]/g, '');
        // If we haven't seen this title before, or if this item has a better image, keep it
        if (!uniqueMap.has(normalizedTitle) || uniqueMap.get(normalizedTitle).imageUrl.includes('unsplash.com') && !item.imageUrl.includes('unsplash.com')) {
            uniqueMap.set(normalizedTitle, item);
        }
    }
    return Array.from(uniqueMap.values());
}
// Mock news data
function getMockNewsData() {
    return [
        {
            id: 'mock-1',
            title: 'Claude 3.5 Sonnet: Anthropic\'s New AI Model Outperforms GPT-4 on Reasoning Benchmarks',
            description: 'Anthropic has released Claude 3.5 Sonnet, their latest AI model that demonstrates superior performance on reasoning tasks compared to OpenAI\'s GPT-4. The model features enhanced contextual understanding, better instruction following, and reduced hallucination rates.',
            imageUrl: 'https://images.unsplash.com/photo-1677442135136-760c813a1e2a?q=80&w=1932&auto=format&fit=crop',
            date: formatDate(subtractDays(1)),
            readTime: '4 min read',
            url: 'https://example.com/claude-3.5-sonnet',
            source: 'Anthropic',
            categories: [
                'ai-tools',
                'large-language-models',
                'nlp'
            ]
        },
        {
            id: 'mock-2',
            title: 'Perplexity Launches AI Search Pro with Real-Time Data and Custom Knowledge Integration',
            description: 'Perplexity has expanded its AI search capabilities with a new Pro tier that offers real-time data access, integration with custom knowledge bases, and enhanced citation accuracy. The tool aims to revolutionize information discovery for both casual users and professionals.',
            imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1770&auto=format&fit=crop',
            date: formatDate(subtractDays(2)),
            readTime: '5 min read',
            url: 'https://example.com/perplexity-ai-search-pro',
            source: 'Perplexity AI',
            categories: [
                'ai-tools',
                'search',
                'information-retrieval'
            ]
        },
        {
            id: 'mock-3',
            title: 'Microsoft Copilot Studio: New No-Code Platform for Building Custom AI Agents',
            description: 'Microsoft has launched Copilot Studio, a no-code platform allowing businesses to create customized AI agents. The tool enables integration with enterprise data, custom workflows, and specialized knowledge bases without requiring programming expertise.',
            imageUrl: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1770&auto=format&fit=crop',
            date: formatDate(subtractDays(3)),
            readTime: '6 min read',
            url: 'https://example.com/microsoft-copilot-studio',
            source: 'Microsoft',
            categories: [
                'ai-tools',
                'no-code',
                'productivity'
            ]
        },
        {
            id: 'mock-4',
            title: 'Stability AI Releases Stable Diffusion 3 With Unprecedented Image Quality',
            description: 'Stability AI has unveiled Stable Diffusion 3, their latest image generation model featuring remarkable improvements in quality, coherence, and artistic control. The new model supports enhanced text-to-image capabilities and better follows complex prompts.',
            imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1770&auto=format&fit=crop',
            date: formatDate(subtractDays(4)),
            readTime: '3 min read',
            url: 'https://example.com/stable-diffusion-3',
            source: 'Stability AI',
            categories: [
                'ai-tools',
                'image-generation',
                'creative'
            ]
        },
        {
            id: 'mock-5',
            title: 'ChatGPT Enterprise Adds Code Interpreter 2.0 with Enhanced Data Analysis Capabilities',
            description: 'OpenAI has rolled out a major update to ChatGPT Enterprise\'s Code Interpreter, featuring improved data analysis, support for larger datasets, and interactive data visualization tools. The update allows businesses to process and analyze complex data directly within the chat interface.',
            imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1964&auto=format&fit=crop',
            date: formatDate(subtractDays(5)),
            readTime: '4 min read',
            url: 'https://example.com/chatgpt-code-interpreter-2',
            source: 'OpenAI',
            categories: [
                'ai-tools',
                'data-analysis',
                'enterprise'
            ]
        },
        {
            id: 'mock-6',
            title: 'Notion AI Gets Major Upgrade with Writing Styles and Document Intelligence',
            description: 'Notion has significantly expanded its AI capabilities with customizable writing styles, document summarization, and intelligent organization features. The new tools help users create content faster while maintaining their unique voice across different document types.',
            imageUrl: 'https://images.unsplash.com/photo-1611273426858-450e7f08d0bf?q=80&w=1770&auto=format&fit=crop',
            date: formatDate(subtractDays(6)),
            readTime: '5 min read',
            url: 'https://example.com/notion-ai-upgrade',
            source: 'Notion',
            categories: [
                'ai-tools',
                'productivity',
                'content-creation'
            ]
        },
        {
            id: 'mock-7',
            title: 'Midjourney v6 Introduces Ultra-Realistic Mode and Advanced Compositing',
            description: 'Midjourney has released version 6 of its AI image generator with a new ultra-realistic mode, improved compositional understanding, and enhanced style adaptation capabilities. The update gives artists and designers unprecedented control over generated imagery.',
            imageUrl: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=1770&auto=format&fit=crop',
            date: formatDate(subtractDays(7)),
            readTime: '4 min read',
            url: 'https://example.com/midjourney-v6',
            source: 'Midjourney',
            categories: [
                'ai-tools',
                'image-generation',
                'creative'
            ]
        },
        {
            id: 'mock-8',
            title: 'GitHub Copilot Enterprise Adds Project-Specific Intelligence and Custom Policies',
            description: 'GitHub has enhanced Copilot Enterprise with project-specific AI models that understand proprietary codebases and company-specific development patterns. The update also introduces customizable security policies and improved code documentation features.',
            imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1776&auto=format&fit=crop',
            date: formatDate(subtractDays(8)),
            readTime: '5 min read',
            url: 'https://example.com/github-copilot-enterprise',
            source: 'GitHub',
            categories: [
                'ai-tools',
                'development',
                'enterprise'
            ]
        }
    ];
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__29b95b77._.js.map
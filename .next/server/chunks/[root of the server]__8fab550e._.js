module.exports = {

"[project]/latest-news/.next-internal/server/app/api/image-generation/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[project]/latest-news/src/app/api/image-generation/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
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
const LEXICA_API_URL = 'https://lexica.art/api/v1/search';
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q') || 'artificial intelligence image generation';
        // Add AI image generation focus to the query
        const enhancedQuery = `${query} AI generated art, high quality, detailed`;
        // Try to use OpenAI API if available
        if (OPENAI_API_KEY) {
            try {
                const response = await fetch('https://api.openai.com/v1/images/generations', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${OPENAI_API_KEY}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        model: "dall-e-3",
                        prompt: enhancedQuery,
                        n: 1,
                        size: "1024x1024"
                    })
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data.data && data.data.length > 0) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            images: data.data.map((img)=>({
                                    id: Math.random().toString(36).substring(2),
                                    url: img.url,
                                    prompt: enhancedQuery,
                                    width: 1024,
                                    height: 1024
                                }))
                        }, {
                            status: 200
                        });
                    }
                }
            // If OpenAI API fails, fall through to fallback
            } catch (openaiError) {
                console.error('Error with OpenAI image generation:', openaiError);
            // Continue to fallback
            }
        }
        // Log the fallback
        console.log(`Using fallback images with query: ${enhancedQuery}`);
        // Return AI-focused fallback images
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            images: getAIFocusedImages(query)
        }, {
            status: 200
        });
    } catch (error) {
        console.error('Error fetching images:', error);
        // Return fallback images if API call fails
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            images: getAIFocusedImages(),
            error: error.message
        }, {
            status: 200
        });
    }
}
// AI-focused images for when the API is unavailable
function getAIFocusedImages(query = 'artificial intelligence') {
    // Collection of high-quality AI-related images focused on image generation
    const aiImages = [
        {
            id: 'ai-gen-1',
            url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop',
            width: 1965,
            height: 1310,
            prompt: 'AI image generation visualization',
            source: 'Unsplash'
        },
        {
            id: 'ai-gen-2',
            url: 'https://images.unsplash.com/photo-1677442135968-6db3d0aa9bf5?q=80&w=2070&auto=format&fit=crop',
            width: 2070,
            height: 1380,
            prompt: 'DALL-E generated art',
            source: 'Unsplash'
        },
        {
            id: 'ai-gen-3',
            url: 'https://images.unsplash.com/photo-1675271591211-728bc2c0c995?q=80&w=2187&auto=format&fit=crop',
            width: 2187,
            height: 1458,
            prompt: 'Midjourney AI art creation',
            source: 'Unsplash'
        },
        {
            id: 'ai-gen-4',
            url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
            width: 5000,
            height: 3333,
            prompt: 'AI-generated landscape art',
            source: 'Pexels'
        },
        {
            id: 'ai-gen-5',
            url: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg',
            width: 5000,
            height: 3333,
            prompt: 'Stable Diffusion artwork',
            source: 'Pexels'
        },
        {
            id: 'ai-gen-6',
            url: 'https://images.unsplash.com/photo-1684469499849-3db7d9e04c06?q=80&w=1964&auto=format&fit=crop',
            width: 1964,
            height: 1309,
            prompt: 'AI art generation process',
            source: 'Unsplash'
        }
    ];
    // Add the query to each image's prompt to make it seem more relevant
    return aiImages.map((img)=>({
            ...img,
            prompt: `${img.prompt} - ${query}`
        }));
}
async function POST(request) {
    try {
        const body = await request.json();
        const prompt = body.prompt;
        if (!prompt) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Prompt is required'
            }, {
                status: 400
            });
        }
        console.log(`Generating image with DALL-E for prompt: ${prompt}`);
        // Call the OpenAI API to generate an image
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "dall-e-3",
                prompt: prompt,
                n: 1,
                size: "1024x1024"
            })
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error('OpenAI API error:', errorData);
            throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
        }
        const data = await response.json();
        // Transform the OpenAI response to our format
        const generatedImages = data.data.map((image, index)=>({
                id: `openai-${Date.now()}-${index}`,
                url: image.url,
                width: 1024,
                height: 1024,
                prompt: prompt,
                source: 'DALL-E'
            }));
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            images: generatedImages,
            prompt: prompt
        }, {
            status: 200
        });
    } catch (error) {
        console.error('Error generating images:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            images: getAIFocusedImages().slice(0, 1),
            error: error.message
        }, {
            status: 200
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__8fab550e._.js.map
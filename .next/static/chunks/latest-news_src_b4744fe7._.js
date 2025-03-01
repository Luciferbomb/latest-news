(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/latest-news_src_b4744fe7._.js", {

"[project]/latest-news/src/components/ui/shape-landing-hero.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "HeroGeometric": (()=>HeroGeometric)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle.js [app-client] (ecmascript) <export default as Circle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$latest$2d$news$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/latest-news/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
function ElegantShape({ className, delay = 0, width = 400, height = 100, rotate = 0, gradient = "from-white/[0.08]" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: -150,
            rotate: rotate - 15
        },
        animate: {
            opacity: 1,
            y: 0,
            rotate: rotate
        },
        transition: {
            duration: 2.4,
            delay,
            ease: [
                0.23,
                0.86,
                0.39,
                0.96
            ],
            opacity: {
                duration: 1.2
            }
        },
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$latest$2d$news$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute", className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            animate: {
                y: [
                    0,
                    15,
                    0
                ]
            },
            transition: {
                duration: 12,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
            },
            style: {
                width,
                height
            },
            className: "relative",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$latest$2d$news$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute inset-0 rounded-full", "bg-gradient-to-r to-transparent", gradient, "backdrop-blur-[2px] border-2 border-white/[0.15]", "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]", "after:absolute after:inset-0 after:rounded-full", "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]")
            }, void 0, false, {
                fileName: "[project]/latest-news/src/components/ui/shape-landing-hero.tsx",
                lineNumber: 58,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/latest-news/src/components/ui/shape-landing-hero.tsx",
            lineNumber: 43,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/latest-news/src/components/ui/shape-landing-hero.tsx",
        lineNumber: 24,
        columnNumber: 9
    }, this);
}
_c = ElegantShape;
function HeroGeometric({ badge = "Design Collective", title1 = "Elevate Your Digital Vision", title2 = "Crafting Exceptional Websites" }) {
    const fadeUpVariants = {
        hidden: {
            opacity: 0,
            y: 30
        },
        visible: (i)=>({
                opacity: 1,
                y: 0,
                transition: {
                    duration: 1,
                    delay: 0.5 + i * 0.2,
                    ease: [
                        0.25,
                        0.4,
                        0.25,
                        1
                    ]
                }
            })
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl"
            }, void 0, false, {
                fileName: "[project]/latest-news/src/components/ui/shape-landing-hero.tsx",
                lineNumber: 98,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ElegantShape, {
                        delay: 0.3,
                        width: 600,
                        height: 140,
                        rotate: 12,
                        gradient: "from-indigo-500/[0.15]",
                        className: "left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                    }, void 0, false, {
                        fileName: "[project]/latest-news/src/components/ui/shape-landing-hero.tsx",
                        lineNumber: 101,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ElegantShape, {
                        delay: 0.5,
                        width: 500,
                        height: 120,
                        rotate: -15,
                        gradient: "from-rose-500/[0.15]",
                        className: "right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                    }, void 0, false, {
                        fileName: "[project]/latest-news/src/components/ui/shape-landing-hero.tsx",
                        lineNumber: 110,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ElegantShape, {
                        delay: 0.4,
                        width: 300,
                        height: 80,
                        rotate: -8,
                        gradient: "from-violet-500/[0.15]",
                        className: "left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                    }, void 0, false, {
                        fileName: "[project]/latest-news/src/components/ui/shape-landing-hero.tsx",
                        lineNumber: 119,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ElegantShape, {
                        delay: 0.6,
                        width: 200,
                        height: 60,
                        rotate: 20,
                        gradient: "from-amber-500/[0.15]",
                        className: "right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                    }, void 0, false, {
                        fileName: "[project]/latest-news/src/components/ui/shape-landing-hero.tsx",
                        lineNumber: 128,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ElegantShape, {
                        delay: 0.7,
                        width: 150,
                        height: 40,
                        rotate: -25,
                        gradient: "from-cyan-500/[0.15]",
                        className: "left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
                    }, void 0, false, {
                        fileName: "[project]/latest-news/src/components/ui/shape-landing-hero.tsx",
                        lineNumber: 137,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/latest-news/src/components/ui/shape-landing-hero.tsx",
                lineNumber: 100,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 container mx-auto px-4 md:px-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-3xl mx-auto text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            custom: 0,
                            variants: fadeUpVariants,
                            initial: "hidden",
                            animate: "visible",
                            className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                                    className: "h-2 w-2 fill-rose-500/80"
                                }, void 0, false, {
                                    fileName: "[project]/latest-news/src/components/ui/shape-landing-hero.tsx",
                                    lineNumber: 156,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-white/60 tracking-wide",
                                    children: badge
                                }, void 0, false, {
                                    fileName: "[project]/latest-news/src/components/ui/shape-landing-hero.tsx",
                                    lineNumber: 157,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/latest-news/src/components/ui/shape-landing-hero.tsx",
                            lineNumber: 149,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            custom: 1,
                            variants: fadeUpVariants,
                            initial: "hidden",
                            animate: "visible",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80",
                                        children: title1
                                    }, void 0, false, {
                                        fileName: "[project]/latest-news/src/components/ui/shape-landing-hero.tsx",
                                        lineNumber: 169,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/latest-news/src/components/ui/shape-landing-hero.tsx",
                                        lineNumber: 172,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$latest$2d$news$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 "),
                                        children: title2
                                    }, void 0, false, {
                                        fileName: "[project]/latest-news/src/components/ui/shape-landing-hero.tsx",
                                        lineNumber: 173,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/latest-news/src/components/ui/shape-landing-hero.tsx",
                                lineNumber: 168,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/latest-news/src/components/ui/shape-landing-hero.tsx",
                            lineNumber: 162,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            custom: 2,
                            variants: fadeUpVariants,
                            initial: "hidden",
                            animate: "visible",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-base sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4",
                                children: "Crafting exceptional digital experiences through innovative design and cutting-edge technology."
                            }, void 0, false, {
                                fileName: "[project]/latest-news/src/components/ui/shape-landing-hero.tsx",
                                lineNumber: 189,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/latest-news/src/components/ui/shape-landing-hero.tsx",
                            lineNumber: 183,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/latest-news/src/components/ui/shape-landing-hero.tsx",
                    lineNumber: 148,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/latest-news/src/components/ui/shape-landing-hero.tsx",
                lineNumber: 147,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none"
            }, void 0, false, {
                fileName: "[project]/latest-news/src/components/ui/shape-landing-hero.tsx",
                lineNumber: 197,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/latest-news/src/components/ui/shape-landing-hero.tsx",
        lineNumber: 97,
        columnNumber: 9
    }, this);
}
_c1 = HeroGeometric;
;
var _c, _c1;
__turbopack_context__.k.register(_c, "ElegantShape");
__turbopack_context__.k.register(_c1, "HeroGeometric");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/latest-news/src/components/ui/news-card.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "NewsCard": (()=>NewsCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$latest$2d$news$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/latest-news/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-right.js [app-client] (ecmascript) <export default as ArrowUpRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image.js [app-client] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function NewsCard({ title, description, imageUrl, date, readTime, url, categories, sentiment, sentimentScore, summary, source, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: url,
        target: "_blank",
        rel: "noopener noreferrer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$latest$2d$news$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("group relative overflow-hidden rounded-xl border border-white/10 bg-black/20 backdrop-blur-sm transition-all hover:shadow-lg block", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/30 z-10"
            }, void 0, false, {
                fileName: "[project]/latest-news/src/components/ui/news-card.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative aspect-[16/9] w-full overflow-hidden",
                children: imageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: imageUrl,
                    alt: title,
                    fill: true,
                    className: "object-cover transition-transform duration-500 group-hover:scale-105",
                    onError: (e)=>{
                        // If image fails to load, replace with a fallback
                        const target = e.target;
                        target.src = "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop";
                    },
                    unoptimized: true
                }, void 0, false, {
                    fileName: "[project]/latest-news/src/components/ui/news-card.tsx",
                    lineNumber: 51,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 flex items-center justify-center bg-gray-800",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                        className: "h-12 w-12 text-gray-500"
                    }, void 0, false, {
                        fileName: "[project]/latest-news/src/components/ui/news-card.tsx",
                        lineNumber: 65,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/latest-news/src/components/ui/news-card.tsx",
                    lineNumber: 64,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/latest-news/src/components/ui/news-card.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-20 p-4 md:p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-2 text-xs text-white/60 mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                        className: "h-3 w-3"
                                    }, void 0, false, {
                                        fileName: "[project]/latest-news/src/components/ui/news-card.tsx",
                                        lineNumber: 73,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: date
                                    }, void 0, false, {
                                        fileName: "[project]/latest-news/src/components/ui/news-card.tsx",
                                        lineNumber: 74,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/latest-news/src/components/ui/news-card.tsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                        className: "h-3 w-3"
                                    }, void 0, false, {
                                        fileName: "[project]/latest-news/src/components/ui/news-card.tsx",
                                        lineNumber: 77,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: readTime
                                    }, void 0, false, {
                                        fileName: "[project]/latest-news/src/components/ui/news-card.tsx",
                                        lineNumber: 78,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/latest-news/src/components/ui/news-card.tsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this),
                            source && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ml-auto px-2 py-0.5 bg-black/30 rounded-full text-[10px] font-medium text-white/80",
                                children: source
                            }, void 0, false, {
                                fileName: "[project]/latest-news/src/components/ui/news-card.tsx",
                                lineNumber: 82,
                                columnNumber: 13
                            }, this),
                            sentiment && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full mt-2 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$latest$2d$news$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-2 w-2 rounded-full", sentiment === 'positive' ? "bg-green-500" : sentiment === 'negative' ? "bg-red-500" : "bg-gray-400")
                                    }, void 0, false, {
                                        fileName: "[project]/latest-news/src/components/ui/news-card.tsx",
                                        lineNumber: 90,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] capitalize",
                                        children: [
                                            sentiment,
                                            " ",
                                            sentimentScore !== undefined && `(${(sentimentScore * 100).toFixed(0)}%)`
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/latest-news/src/components/ui/news-card.tsx",
                                        lineNumber: 97,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/latest-news/src/components/ui/news-card.tsx",
                                lineNumber: 89,
                                columnNumber: 13
                            }, this),
                            categories && categories.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full mt-2 flex flex-wrap gap-1.5",
                                children: categories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "px-2 py-0.5 bg-white/10 rounded-full text-[10px] font-medium text-white/80",
                                        children: category.replace('-', ' ')
                                    }, category, false, {
                                        fileName: "[project]/latest-news/src/components/ui/news-card.tsx",
                                        lineNumber: 106,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/latest-news/src/components/ui/news-card.tsx",
                                lineNumber: 104,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/latest-news/src/components/ui/news-card.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg md:text-xl font-bold text-white mb-2 line-clamp-2",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/latest-news/src/components/ui/news-card.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-white/70 mb-2 line-clamp-3",
                        children: summary || description
                    }, void 0, false, {
                        fileName: "[project]/latest-news/src/components/ui/news-card.tsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this),
                    summary && summary !== description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                            className: "text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                    className: "text-indigo-300 cursor-pointer hover:text-indigo-200 transition-colors inline-flex items-center gap-1",
                                    children: "View full description"
                                }, void 0, false, {
                                    fileName: "[project]/latest-news/src/components/ui/news-card.tsx",
                                    lineNumber: 128,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 text-white/60 pl-2 border-l border-white/10",
                                    children: description
                                }, void 0, false, {
                                    fileName: "[project]/latest-news/src/components/ui/news-card.tsx",
                                    lineNumber: 131,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/latest-news/src/components/ui/news-card.tsx",
                            lineNumber: 127,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/latest-news/src/components/ui/news-card.tsx",
                        lineNumber: 126,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex items-center gap-1 text-sm font-medium text-indigo-400 group-hover:text-indigo-300 transition-colors",
                        children: [
                            "Read more ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"], {
                                className: "h-3 w-3"
                            }, void 0, false, {
                                fileName: "[project]/latest-news/src/components/ui/news-card.tsx",
                                lineNumber: 141,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/latest-news/src/components/ui/news-card.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/latest-news/src/components/ui/news-card.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/latest-news/src/components/ui/news-card.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_c = NewsCard;
var _c;
__turbopack_context__.k.register(_c, "NewsCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/latest-news/src/hooks/useRealTimeNews.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "getTimeUntilNextUpdate": (()=>getTimeUntilNextUpdate),
    "useRealTimeNews": (()=>useRealTimeNews)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
const getTimeUntilNextUpdate = (lastUpdated)=>{
    if (!lastUpdated) return 'Unknown';
    const updateInterval = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
    const nextUpdate = new Date(lastUpdated.getTime() + updateInterval);
    const now = new Date();
    const timeRemaining = nextUpdate.getTime() - now.getTime();
    if (timeRemaining <= 0) return 'Now';
    const hours = Math.floor(timeRemaining / (60 * 60 * 1000));
    const minutes = Math.floor(timeRemaining % (60 * 60 * 1000) / (60 * 1000));
    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    } else {
        return `${minutes}m`;
    }
};
function useRealTimeNews(searchQuery) {
    _s();
    const [news, setNews] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [lastUpdated, setLastUpdated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Function to fetch news from our combined API
    const fetchNews = async ()=>{
        setIsLoading(true);
        try {
            // Build the API URL for our combined endpoint
            let apiUrl = '/api/combined-news';
            // Add search query if provided
            if (searchQuery) {
                apiUrl += `?q=${encodeURIComponent(searchQuery)}`;
            } else {
                // Default query for AI news if no specific search
                apiUrl += '?q=artificial+intelligence+OR+AI+tools+OR+machine+learning';
            }
            // Fetch data from our combined API
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            const data = await response.json();
            // Process the news data
            setNews(data.news);
            setLastUpdated(new Date(data.lastUpdated));
            setError(null);
            // Return the fetched news for potential further processing
            return data.news;
        } catch (err) {
            console.error('Error fetching news:', err);
            setError(err.message || 'Failed to fetch news data. Please try again later.');
            return [];
        } finally{
            setIsLoading(false);
        }
    };
    // Function to analyze sentiment and generate summaries for news items
    const enhanceNewsWithAI = async (newsItems)=>{
        if (!newsItems.length) return;
        try {
            // We'll process a few items at a time to avoid overwhelming the API
            const itemsToProcess = newsItems.slice(0, 5).filter((item)=>!item.summary || !item.sentiment);
            if (itemsToProcess.length === 0) return;
            // Call our text analysis API
            const response = await fetch('/api/text-analysis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    items: itemsToProcess.map((item)=>({
                            id: item.id,
                            text: item.description
                        }))
                })
            });
            if (!response.ok) return;
            const enhancedData = await response.json();
            // Update the news items with AI-enhanced data
            setNews((prevNews)=>{
                return prevNews.map((item)=>{
                    const enhanced = enhancedData.results.find((r)=>r.id === item.id);
                    if (enhanced) {
                        return {
                            ...item,
                            summary: enhanced.summary || item.summary,
                            sentiment: enhanced.sentiment || item.sentiment,
                            sentimentScore: enhanced.sentimentScore || item.sentimentScore
                        };
                    }
                    return item;
                });
            });
        } catch (err) {
            console.error('Error enhancing news with AI:', err);
        }
    };
    // Initial fetch
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useRealTimeNews.useEffect": ()=>{
            const initialFetch = {
                "useRealTimeNews.useEffect.initialFetch": async ()=>{
                    const newsItems = await fetchNews();
                    // After fetching news, enhance them with AI
                    enhanceNewsWithAI(newsItems);
                }
            }["useRealTimeNews.useEffect.initialFetch"];
            initialFetch();
            // Set up interval to update news 4 times a day (every 6 hours)
            const updateInterval = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
            const interval = setInterval(initialFetch, updateInterval);
            return ({
                "useRealTimeNews.useEffect": ()=>clearInterval(interval)
            })["useRealTimeNews.useEffect"];
        }
    }["useRealTimeNews.useEffect"], [
        searchQuery
    ]);
    return {
        news,
        isLoading,
        error,
        lastUpdated,
        refreshNews: fetchNews,
        getTimeUntilNextUpdate: ()=>getTimeUntilNextUpdate(lastUpdated)
    };
}
_s(useRealTimeNews, "n0pR260WS3ljgmIQLFAZDeIUr5Q=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/latest-news/src/components/news-feed.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "NewsFeed": (()=>NewsFeed)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$latest$2d$news$2f$src$2f$components$2f$ui$2f$news$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/latest-news/src/components/ui/news-card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$latest$2d$news$2f$src$2f$hooks$2f$useRealTimeNews$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/latest-news/src/hooks/useRealTimeNews.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function NewsFeed() {
    _s();
    // Use the real-time news hook
    const { news, isLoading, error, lastUpdated, refreshNews } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$latest$2d$news$2f$src$2f$hooks$2f$useRealTimeNews$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRealTimeNews"])();
    // State for auto-refresh countdown
    const [nextRefreshIn, setNextRefreshIn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(6 * 60 * 60); // 6 hours in seconds
    // Update countdown timer
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NewsFeed.useEffect": ()=>{
            const timer = setInterval({
                "NewsFeed.useEffect.timer": ()=>{
                    setNextRefreshIn({
                        "NewsFeed.useEffect.timer": (prev)=>{
                            if (prev <= 1) {
                                // Refresh when countdown reaches zero
                                refreshNews();
                                return 6 * 60 * 60; // Reset to 6 hours
                            }
                            return prev - 1;
                        }
                    }["NewsFeed.useEffect.timer"]);
                }
            }["NewsFeed.useEffect.timer"], 1000);
            return ({
                "NewsFeed.useEffect": ()=>clearInterval(timer)
            })["NewsFeed.useEffect"];
        }
    }["NewsFeed.useEffect"], [
        refreshNews
    ]);
    // Format the countdown time
    const formatCountdown = (seconds)=>{
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor(seconds % 3600 / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    const container = {
        hidden: {
            opacity: 0
        },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };
    const item = {
        hidden: {
            opacity: 0,
            y: 20
        },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "w-full py-12 md:py-24 bg-gradient-to-b from-[#030303] to-[#050505]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4 md:px-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center mb-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-rose-400 mb-4",
                            children: "Latest AI News"
                        }, void 0, false, {
                            fileName: "[project]/latest-news/src/components/news-feed.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-white/60 max-w-2xl mx-auto text-center mb-4",
                            children: "Stay updated with the most recent developments, breakthroughs, and releases in the world of artificial intelligence."
                        }, void 0, false, {
                            fileName: "[project]/latest-news/src/components/news-feed.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center gap-4 mt-2",
                            children: [
                                lastUpdated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-white/60",
                                    children: [
                                        "Last updated: ",
                                        lastUpdated.toLocaleTimeString()
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/latest-news/src/components/news-feed.tsx",
                                    lineNumber: 69,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        refreshNews();
                                        setNextRefreshIn(6 * 60 * 60);
                                    },
                                    className: "flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-white/80 hover:text-white text-sm transition-colors",
                                    disabled: isLoading,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                            className: `h-4 w-4 ${isLoading ? 'animate-spin' : ''}`
                                        }, void 0, false, {
                                            fileName: "[project]/latest-news/src/components/news-feed.tsx",
                                            lineNumber: 81,
                                            columnNumber: 15
                                        }, this),
                                        "Refresh Now"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/latest-news/src/components/news-feed.tsx",
                                    lineNumber: 73,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-white/60",
                                    children: [
                                        "Next update in: ",
                                        formatCountdown(nextRefreshIn)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/latest-news/src/components/news-feed.tsx",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/latest-news/src/components/news-feed.tsx",
                            lineNumber: 67,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/latest-news/src/components/news-feed.tsx",
                    lineNumber: 59,
                    columnNumber: 9
                }, this),
                error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-md mx-auto bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-red-400 mb-4",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/latest-news/src/components/news-feed.tsx",
                            lineNumber: 92,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: refreshNews,
                            className: "px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-md transition-colors",
                            children: "Try Again"
                        }, void 0, false, {
                            fileName: "[project]/latest-news/src/components/news-feed.tsx",
                            lineNumber: 93,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/latest-news/src/components/news-feed.tsx",
                    lineNumber: 91,
                    columnNumber: 11
                }, this) : isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse",
                    children: [
                        1,
                        2,
                        3,
                        4,
                        5,
                        6
                    ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-[400px] rounded-xl bg-white/5"
                        }, i, false, {
                            fileName: "[project]/latest-news/src/components/news-feed.tsx",
                            lineNumber: 103,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/latest-news/src/components/news-feed.tsx",
                    lineNumber: 101,
                    columnNumber: 11
                }, this) : news.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center justify-center py-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-gray-400 mb-4 text-xl",
                            children: "No news articles available at the moment"
                        }, void 0, false, {
                            fileName: "[project]/latest-news/src/components/news-feed.tsx",
                            lineNumber: 108,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: refreshNews,
                            className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors",
                            children: "Refresh"
                        }, void 0, false, {
                            fileName: "[project]/latest-news/src/components/news-feed.tsx",
                            lineNumber: 109,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/latest-news/src/components/news-feed.tsx",
                    lineNumber: 107,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                    variants: container,
                    initial: "hidden",
                    animate: "show",
                    children: news.map((newsItem)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            variants: item,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$latest$2d$news$2f$src$2f$components$2f$ui$2f$news$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NewsCard"], {
                                title: newsItem.title,
                                description: newsItem.description,
                                imageUrl: newsItem.imageUrl,
                                date: newsItem.date,
                                readTime: newsItem.readTime,
                                url: newsItem.url
                            }, void 0, false, {
                                fileName: "[project]/latest-news/src/components/news-feed.tsx",
                                lineNumber: 125,
                                columnNumber: 17
                            }, this)
                        }, newsItem.id, false, {
                            fileName: "[project]/latest-news/src/components/news-feed.tsx",
                            lineNumber: 124,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/latest-news/src/components/news-feed.tsx",
                    lineNumber: 117,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/latest-news/src/components/news-feed.tsx",
            lineNumber: 58,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/latest-news/src/components/news-feed.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_s(NewsFeed, "4uMdm+YBcoj/YwJtDBIxZCe9/0g=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$latest$2d$news$2f$src$2f$hooks$2f$useRealTimeNews$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRealTimeNews"]
    ];
});
_c = NewsFeed;
var _c;
__turbopack_context__.k.register(_c, "NewsFeed");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/latest-news/src/components/ui/video-carousel.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "VideoCarousel": (()=>VideoCarousel)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pause.js [app-client] (ecmascript) <export default as Pause>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function VideoCarousel({ videos }) {
    _s();
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [iframeError, setIframeError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const iframeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleNext = ()=>{
        setCurrentIndex((prevIndex)=>(prevIndex + 1) % videos.length);
        resetPlayState();
    };
    const handlePrev = ()=>{
        setCurrentIndex((prevIndex)=>(prevIndex - 1 + videos.length) % videos.length);
        resetPlayState();
    };
    const resetPlayState = ()=>{
        setIsPlaying(false);
        setIframeError(false);
    };
    const togglePlayPause = ()=>{
        if (currentVideo.embedUrl && !iframeError) {
            // For YouTube videos, we just toggle the state and the iframe src will update
            setIsPlaying(!isPlaying);
        } else if (videoRef.current) {
            // For regular videos, use the video element API
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play().catch((err)=>{
                    console.error("Error playing video:", err);
                });
            }
            setIsPlaying(!isPlaying);
        }
    };
    // Handle iFrame errors by showing a fallback
    const handleIframeError = ()=>{
        console.error("Error loading embedded video");
        setIframeError(true);
    };
    // Auto-advance carousel every 10 seconds if not playing video
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VideoCarousel.useEffect": ()=>{
            if (!isPlaying) {
                const interval = setInterval({
                    "VideoCarousel.useEffect.interval": ()=>{
                        handleNext();
                    }
                }["VideoCarousel.useEffect.interval"], 10000);
                return ({
                    "VideoCarousel.useEffect": ()=>clearInterval(interval)
                })["VideoCarousel.useEffect"];
            }
        }
    }["VideoCarousel.useEffect"], [
        isPlaying
    ]);
    // Reset video state when changing videos
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VideoCarousel.useEffect": ()=>{
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
            resetPlayState();
        }
    }["VideoCarousel.useEffect"], [
        currentIndex
    ]);
    if (!videos || videos.length === 0) {
        return null;
    }
    const currentVideo = videos[currentIndex];
    // Make sure we have a valid video with required fields
    if (!currentVideo || !currentVideo.title || !currentVideo.videoUrl && !currentVideo.embedUrl) {
        console.error("Invalid video data", currentVideo);
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full max-w-5xl mx-auto overflow-hidden rounded-xl bg-black",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative aspect-video w-full",
                children: [
                    currentVideo.embedUrl && !iframeError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                        ref: iframeRef,
                        src: `${currentVideo.embedUrl}?autoplay=${isPlaying ? 1 : 0}&mute=0`,
                        className: "w-full h-full object-cover",
                        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                        allowFullScreen: true,
                        onError: handleIframeError
                    }, void 0, false, {
                        fileName: "[project]/latest-news/src/components/ui/video-carousel.tsx",
                        lineNumber: 104,
                        columnNumber: 11
                    }, this) : currentVideo.videoUrl && currentVideo.videoUrl.endsWith('.mp4') ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                        ref: videoRef,
                        src: currentVideo.videoUrl,
                        poster: currentVideo.thumbnailUrl,
                        className: "w-full h-full object-cover",
                        onEnded: ()=>setIsPlaying(false),
                        onPlay: ()=>setIsPlaying(true),
                        onPause: ()=>setIsPlaying(false),
                        onError: ()=>console.error("Video error")
                    }, void 0, false, {
                        fileName: "[project]/latest-news/src/components/ui/video-carousel.tsx",
                        lineNumber: 113,
                        columnNumber: 11
                    }, this) : // Fallback to just showing the thumbnail if no valid video source
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-full h-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: currentVideo.thumbnailUrl,
                                alt: currentVideo.title,
                                className: "w-full h-full object-cover"
                            }, void 0, false, {
                                fileName: "[project]/latest-news/src/components/ui/video-carousel.tsx",
                                lineNumber: 126,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 flex items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: currentVideo.videoUrl,
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "p-4 bg-white/10 hover:bg-white/20 rounded-full transition-colors",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                        className: "h-8 w-8 text-white"
                                    }, void 0, false, {
                                        fileName: "[project]/latest-news/src/components/ui/video-carousel.tsx",
                                        lineNumber: 138,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/latest-news/src/components/ui/video-carousel.tsx",
                                    lineNumber: 132,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/latest-news/src/components/ui/video-carousel.tsx",
                                lineNumber: 131,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/latest-news/src/components/ui/video-carousel.tsx",
                        lineNumber: 125,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4 md:p-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg md:text-xl font-semibold text-white line-clamp-1",
                                    children: currentVideo.title
                                }, void 0, false, {
                                    fileName: "[project]/latest-news/src/components/ui/video-carousel.tsx",
                                    lineNumber: 147,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-white/70 line-clamp-2 mb-2",
                                    children: currentVideo.description
                                }, void 0, false, {
                                    fileName: "[project]/latest-news/src/components/ui/video-carousel.tsx",
                                    lineNumber: 150,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center space-x-2 text-xs text-white/60",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: currentVideo.channelUrl,
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                    className: "hover:text-indigo-400 transition-colors",
                                                    children: currentVideo.source
                                                }, void 0, false, {
                                                    fileName: "[project]/latest-news/src/components/ui/video-carousel.tsx",
                                                    lineNumber: 155,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "•"
                                                }, void 0, false, {
                                                    fileName: "[project]/latest-news/src/components/ui/video-carousel.tsx",
                                                    lineNumber: 163,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: currentVideo.date
                                                }, void 0, false, {
                                                    fileName: "[project]/latest-news/src/components/ui/video-carousel.tsx",
                                                    lineNumber: 164,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/latest-news/src/components/ui/video-carousel.tsx",
                                            lineNumber: 154,
                                            columnNumber: 15
                                        }, this),
                                        currentVideo.embedUrl && !iframeError || currentVideo.videoUrl && currentVideo.videoUrl.endsWith('.mp4') ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: togglePlayPause,
                                            className: "p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors",
                                            "aria-label": isPlaying ? "Pause video" : "Play video",
                                            children: isPlaying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__["Pause"], {
                                                className: "h-5 w-5 text-white"
                                            }, void 0, false, {
                                                fileName: "[project]/latest-news/src/components/ui/video-carousel.tsx",
                                                lineNumber: 174,
                                                columnNumber: 21
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                                className: "h-5 w-5 text-white"
                                            }, void 0, false, {
                                                fileName: "[project]/latest-news/src/components/ui/video-carousel.tsx",
                                                lineNumber: 176,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/latest-news/src/components/ui/video-carousel.tsx",
                                            lineNumber: 168,
                                            columnNumber: 17
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: currentVideo.videoUrl,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                className: "h-5 w-5 text-white"
                                            }, void 0, false, {
                                                fileName: "[project]/latest-news/src/components/ui/video-carousel.tsx",
                                                lineNumber: 186,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/latest-news/src/components/ui/video-carousel.tsx",
                                            lineNumber: 180,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/latest-news/src/components/ui/video-carousel.tsx",
                                    lineNumber: 153,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/latest-news/src/components/ui/video-carousel.tsx",
                            lineNumber: 146,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/latest-news/src/components/ui/video-carousel.tsx",
                        lineNumber: 145,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/latest-news/src/components/ui/video-carousel.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            videos.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handlePrev,
                        className: "absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors",
                        "aria-label": "Previous video",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                            className: "h-6 w-6 text-white"
                        }, void 0, false, {
                            fileName: "[project]/latest-news/src/components/ui/video-carousel.tsx",
                            lineNumber: 202,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/latest-news/src/components/ui/video-carousel.tsx",
                        lineNumber: 197,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleNext,
                        className: "absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors",
                        "aria-label": "Next video",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                            className: "h-6 w-6 text-white"
                        }, void 0, false, {
                            fileName: "[project]/latest-news/src/components/ui/video-carousel.tsx",
                            lineNumber: 209,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/latest-news/src/components/ui/video-carousel.tsx",
                        lineNumber: 204,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            videos.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-0 left-0 right-0 flex justify-center pb-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex space-x-1.5",
                    children: videos.map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setCurrentIndex(index),
                            className: `h-1.5 rounded-full transition-all ${index === currentIndex ? "w-6 bg-white" : "w-1.5 bg-white/40"}`,
                            "aria-label": `Go to video ${index + 1}`
                        }, index, false, {
                            fileName: "[project]/latest-news/src/components/ui/video-carousel.tsx",
                            lineNumber: 219,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/latest-news/src/components/ui/video-carousel.tsx",
                    lineNumber: 217,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/latest-news/src/components/ui/video-carousel.tsx",
                lineNumber: 216,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/latest-news/src/components/ui/video-carousel.tsx",
        lineNumber: 100,
        columnNumber: 5
    }, this);
}
_s(VideoCarousel, "PQvWWKmHyv8bk6tADakkskaghHY=");
_c = VideoCarousel;
var _c;
__turbopack_context__.k.register(_c, "VideoCarousel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/latest-news/src/components/video-news-section.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>VideoNewsSection)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$latest$2d$news$2f$src$2f$components$2f$ui$2f$video$2d$carousel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/latest-news/src/components/ui/video-carousel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
// Featured AI YouTube channels and their videos
const SAMPLE_VIDEOS = [
    {
        id: "1",
        title: "I Tested 10 AI Tools That Will Change Everything",
        description: "Ripley AI explores the latest AI tools that are revolutionizing productivity and creativity, with hands-on demonstrations and practical use cases.",
        thumbnailUrl: "https://images.unsplash.com/photo-1677442135136-760c813a1e2a?q=80&w=1932&auto=format&fit=crop",
        videoUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        source: "Ripley AI",
        date: "Mar 1, 2025",
        channelUrl: "https://youtube.com/@RipleyAI"
    },
    {
        id: "2",
        title: "How to Build an AI SaaS in 1 Hour | Builder Central",
        description: "Builder Central shows you how to create a complete AI SaaS application in just one hour using the latest development tools and frameworks.",
        thumbnailUrl: "https://images.unsplash.com/photo-1581093196277-9f608bb3b511?q=80&w=2070&auto=format&fit=crop",
        videoUrl: "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
        embedUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
        source: "Builder Central",
        date: "Feb 28, 2025",
        channelUrl: "https://www.youtube.com/@BuildersCentral"
    },
    {
        id: "3",
        title: "GPT-5 vs Claude 3 vs Gemini 2 | The ULTIMATE AI Model Comparison",
        description: "A comprehensive comparison of the latest AI language models, testing their capabilities across reasoning, coding, creativity, and factual knowledge.",
        thumbnailUrl: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?q=80&w=1780&auto=format&fit=crop",
        videoUrl: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
        embedUrl: "https://www.youtube.com/embed/9bZkp7q19f0",
        source: "AI Explained",
        date: "Feb 25, 2025",
        channelUrl: "https://youtube.com/@AIExplained"
    },
    {
        id: "4",
        title: "How Midjourney v6 is Changing the Art Industry Forever",
        description: "An in-depth look at how Midjourney's latest version is transforming digital art creation and disrupting traditional creative workflows.",
        thumbnailUrl: "https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?q=80&w=2080&auto=format&fit=crop",
        videoUrl: "https://samplelib.com/lib/preview/mp4/sample-20s.mp4",
        embedUrl: "https://www.youtube.com/embed/kJQP7kiw5Fk",
        source: "Two Minute Papers",
        date: "Feb 22, 2025",
        channelUrl: "https://youtube.com/@TwoMinutePapers"
    },
    {
        id: "5",
        title: "The Dark Side of AI: Privacy Concerns You Need to Know",
        description: "An investigative look into the privacy implications of modern AI systems and what users should be aware of when using these technologies.",
        thumbnailUrl: "https://images.unsplash.com/photo-1611273426858-450e7f08d0bf?q=80&w=1770&auto=format&fit=crop",
        videoUrl: "https://samplelib.com/lib/preview/mp4/sample-30s.mp4",
        source: "AI Ethics with Lex",
        date: "Feb 20, 2025",
        channelUrl: "https://youtube.com/@AIEthics"
    },
    {
        id: "6",
        title: "I Built a Complete AI Agent That Runs My Business",
        description: "A developer shares how they created an autonomous AI agent system that handles various aspects of their online business operations.",
        thumbnailUrl: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=1770&auto=format&fit=crop",
        videoUrl: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
        source: "Matt Wolfe",
        date: "Feb 18, 2025",
        channelUrl: "https://youtube.com/@MattWolfe"
    },
    {
        id: "7",
        title: "The Future of AI: 2025 Predictions from Industry Leaders",
        description: "Top AI researchers and industry executives share their predictions for how artificial intelligence will evolve in the coming year.",
        thumbnailUrl: "https://images.unsplash.com/photo-1620063633487-4ced43f0a40d?q=80&w=2070&auto=format&fit=crop",
        videoUrl: "https://samplelib.com/lib/preview/mp4/sample-20s.mp4",
        source: "Lex Fridman",
        date: "Feb 15, 2025",
        channelUrl: "https://youtube.com/@lexfridman"
    },
    {
        id: "8",
        title: "How to Use AI to 10x Your Productivity | Practical Guide",
        description: "A practical tutorial on integrating AI tools into your daily workflow to dramatically increase productivity across various professional tasks.",
        thumbnailUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop",
        videoUrl: "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
        source: "Ali Abdaal",
        date: "Feb 12, 2025",
        channelUrl: "https://youtube.com/@aliabdaal"
    }
];
function VideoNewsSection() {
    _s();
    const [videos, setVideos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [lastUpdated, setLastUpdated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [debugInfo, setDebugInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchVideos = async ()=>{
        setIsLoading(true);
        setError(null);
        setDebugInfo(null);
        try {
            // Fetch videos from our YouTube API endpoint with a focus on AI tools and image generation
            const response = await fetch('/api/youtube?q=AI+tools+image+generation+midjourney+stable+diffusion+dall-e&refresh=true');
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            const data = await response.json();
            console.log('YouTube API response:', data); // Log the full response for debugging
            if (data.videos && Array.isArray(data.videos) && data.videos.length > 0) {
                // Transform the API response to match our VideoItem interface
                const fetchedVideos = data.videos.map((video)=>({
                        id: video.id || `video-${Math.random().toString(36).substr(2, 9)}`,
                        title: video.title || 'Untitled Video',
                        description: video.description || 'No description available',
                        thumbnailUrl: video.thumbnailUrl || 'https://via.placeholder.com/640x360?text=No+Thumbnail',
                        videoUrl: video.videoUrl || '#',
                        embedUrl: video.embedUrl || undefined,
                        source: video.source || 'Unknown Source',
                        date: video.date || 'Unknown Date',
                        channelUrl: video.channelUrl || '#'
                    }));
                // Check if all required fields are populated
                const validVideos = fetchedVideos.filter((video)=>video.title && video.description && video.thumbnailUrl && (video.videoUrl || video.embedUrl));
                if (validVideos.length === 0) {
                    setDebugInfo(JSON.stringify(fetchedVideos, null, 2).substring(0, 500) + '...');
                    throw new Error('Received videos but they are missing required fields');
                }
                // Filter videos to focus on image generation and AI tools
                const filteredVideos = validVideos.filter((video)=>{
                    const content = `${video.title.toLowerCase()} ${video.description.toLowerCase()}`;
                    const aiKeywords = [
                        'ai',
                        'artificial intelligence',
                        'machine learning',
                        'neural network',
                        'deep learning',
                        'image generation',
                        'text-to-image',
                        'ai tool',
                        'ai art',
                        'midjourney',
                        'stable diffusion',
                        'dall-e',
                        'ai image',
                        'generated image',
                        'ai agent',
                        'chatgpt',
                        'claude',
                        'gemini'
                    ];
                    return aiKeywords.some((keyword)=>content.includes(keyword));
                });
                if (filteredVideos.length > 0) {
                    setVideos(filteredVideos);
                    setLastUpdated(new Date());
                } else {
                    // If no filtered videos, use all valid videos as fallback
                    setVideos(validVideos);
                    setLastUpdated(new Date());
                }
            } else {
                // If no videos were returned, log the response and show an error
                console.warn('No videos returned from API:', data);
                setDebugInfo(JSON.stringify(data, null, 2).substring(0, 500) + '...');
                if (data.notice) {
                    setError(`${data.notice}. Please try again later.`);
                } else if (data.error) {
                    setError(`Error: ${data.error}. Please try again later.`);
                } else {
                    setError('No videos available. Please try again later.');
                }
                // Use sample videos as a fallback if available
                if (SAMPLE_VIDEOS.length > 0) {
                    console.log('Using sample videos as fallback');
                    setVideos(SAMPLE_VIDEOS);
                }
            }
        } catch (err) {
            console.error('Error fetching videos:', err);
            setError(`Failed to fetch video content: ${err.message}. Please try again later.`);
            // Use sample videos as a fallback
            if (SAMPLE_VIDEOS.length > 0) {
                console.log('Using sample videos as fallback after error');
                setVideos(SAMPLE_VIDEOS);
            }
        } finally{
            setIsLoading(false);
        }
    };
    // Initial fetch
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VideoNewsSection.useEffect": ()=>{
            fetchVideos();
            // Set up interval to update videos 4 times a day (every 6 hours)
            const updateInterval = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
            const interval = setInterval(fetchVideos, updateInterval);
            return ({
                "VideoNewsSection.useEffect": ()=>clearInterval(interval)
            })["VideoNewsSection.useEffect"];
        }
    }["VideoNewsSection.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "py-8 md:py-12",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4 md:px-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl md:text-3xl font-bold text-white",
                            children: "Latest AI Image Generation Videos"
                        }, void 0, false, {
                            fileName: "[project]/latest-news/src/components/video-news-section.tsx",
                            lineNumber: 212,
                            columnNumber: 11
                        }, this),
                        lastUpdated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center text-sm text-white/60",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "Updated ",
                                        lastUpdated.toLocaleTimeString()
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/latest-news/src/components/video-news-section.tsx",
                                    lineNumber: 217,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: fetchVideos,
                                    className: "ml-2 p-1.5 rounded-full hover:bg-white/5 transition-colors",
                                    "aria-label": "Refresh videos",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/latest-news/src/components/video-news-section.tsx",
                                        lineNumber: 223,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/latest-news/src/components/video-news-section.tsx",
                                    lineNumber: 218,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/latest-news/src/components/video-news-section.tsx",
                            lineNumber: 216,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/latest-news/src/components/video-news-section.tsx",
                    lineNumber: 211,
                    columnNumber: 9
                }, this),
                isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "aspect-video w-full max-w-5xl mx-auto rounded-xl bg-white/5 animate-pulse"
                }, void 0, false, {
                    fileName: "[project]/latest-news/src/components/video-news-section.tsx",
                    lineNumber: 230,
                    columnNumber: 11
                }, this) : error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-md mx-auto bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-red-400 mb-4",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/latest-news/src/components/video-news-section.tsx",
                            lineNumber: 233,
                            columnNumber: 13
                        }, this),
                        debugInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 overflow-auto max-h-32 bg-black/40 p-2 rounded text-xs text-left",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                className: "text-red-300",
                                children: debugInfo
                            }, void 0, false, {
                                fileName: "[project]/latest-news/src/components/video-news-section.tsx",
                                lineNumber: 236,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/latest-news/src/components/video-news-section.tsx",
                            lineNumber: 235,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: fetchVideos,
                            className: "px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-md transition-colors",
                            children: "Try Again"
                        }, void 0, false, {
                            fileName: "[project]/latest-news/src/components/video-news-section.tsx",
                            lineNumber: 239,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/latest-news/src/components/video-news-section.tsx",
                    lineNumber: 232,
                    columnNumber: 11
                }, this) : videos.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    transition: {
                        duration: 0.5
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$latest$2d$news$2f$src$2f$components$2f$ui$2f$video$2d$carousel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VideoCarousel"], {
                        videos: videos
                    }, void 0, false, {
                        fileName: "[project]/latest-news/src/components/video-news-section.tsx",
                        lineNumber: 252,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/latest-news/src/components/video-news-section.tsx",
                    lineNumber: 247,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "aspect-video w-full max-w-5xl mx-auto bg-white/5 rounded-xl flex flex-col items-center justify-center p-6 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-white/60 text-xl mb-4",
                            children: "No video content available at this time."
                        }, void 0, false, {
                            fileName: "[project]/latest-news/src/components/video-news-section.tsx",
                            lineNumber: 256,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: fetchVideos,
                            className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors",
                            children: "Refresh Videos"
                        }, void 0, false, {
                            fileName: "[project]/latest-news/src/components/video-news-section.tsx",
                            lineNumber: 257,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/latest-news/src/components/video-news-section.tsx",
                    lineNumber: 255,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/latest-news/src/components/video-news-section.tsx",
            lineNumber: 210,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/latest-news/src/components/video-news-section.tsx",
        lineNumber: 209,
        columnNumber: 5
    }, this);
}
_s(VideoNewsSection, "a5LToRlTvRCLQMbQapJC0jF7ouA=");
_c = VideoNewsSection;
var _c;
__turbopack_context__.k.register(_c, "VideoNewsSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/latest-news/src/components/ai-image-gallery.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "AIImageGallery": (()=>AIImageGallery)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function AIImageGallery({ query = 'artificial intelligence news', className }) {
    _s();
    const [images, setImages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [customPrompt, setCustomPrompt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isGenerating, setIsGenerating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Fetch images from our API
    const fetchImages = async ()=>{
        setIsLoading(true);
        try {
            const response = await fetch(`/api/image-generation?q=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error('Failed to fetch images');
            }
            const data = await response.json();
            setImages(data.images || []);
            setError(null);
        } catch (err) {
            console.error('Error fetching images:', err);
            setError(err.message || 'Failed to load images');
        } finally{
            setIsLoading(false);
        }
    };
    // Generate images with custom prompt
    const generateImages = async ()=>{
        if (!customPrompt.trim()) return;
        setIsGenerating(true);
        try {
            const response = await fetch('/api/image-generation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: customPrompt
                })
            });
            if (!response.ok) {
                throw new Error('Failed to generate images');
            }
            const data = await response.json();
            setImages(data.images || []);
            setCurrentIndex(0);
            setError(null);
        } catch (err) {
            console.error('Error generating images:', err);
            setError(err.message || 'Failed to generate images');
        } finally{
            setIsGenerating(false);
        }
    };
    // Navigate to the next image
    const nextImage = ()=>{
        if (images.length === 0) return;
        setCurrentIndex((prevIndex)=>(prevIndex + 1) % images.length);
    };
    // Navigate to the previous image
    const prevImage = ()=>{
        if (images.length === 0) return;
        setCurrentIndex((prevIndex)=>(prevIndex - 1 + images.length) % images.length);
    };
    // Initial fetch
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AIImageGallery.useEffect": ()=>{
            fetchImages();
        }
    }["AIImageGallery.useEffect"], [
        query
    ]);
    // Handle form submission
    const handleSubmit = (e)=>{
        e.preventDefault();
        generateImages();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative rounded-xl overflow-hidden bg-black/20 backdrop-blur-sm border border-white/10 ${className}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-xl font-bold text-white mb-4",
                    children: "AI-Generated Images"
                }, void 0, false, {
                    fileName: "[project]/latest-news/src/components/ai-image-gallery.tsx",
                    lineNumber: 106,
                    columnNumber: 9
                }, this),
                isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-center items-center h-64",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                        className: "h-8 w-8 text-indigo-400 animate-spin"
                    }, void 0, false, {
                        fileName: "[project]/latest-news/src/components/ai-image-gallery.tsx",
                        lineNumber: 110,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/latest-news/src/components/ai-image-gallery.tsx",
                    lineNumber: 109,
                    columnNumber: 11
                }, this) : error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-red-400 p-4 text-center",
                    children: [
                        error,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: fetchImages,
                            className: "mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white block mx-auto",
                            children: "Try Again"
                        }, void 0, false, {
                            fileName: "[project]/latest-news/src/components/ai-image-gallery.tsx",
                            lineNumber: 115,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/latest-news/src/components/ai-image-gallery.tsx",
                    lineNumber: 113,
                    columnNumber: 11
                }, this) : images.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative aspect-[16/9] overflow-hidden rounded-lg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: images[currentIndex].url,
                                    alt: images[currentIndex].prompt || 'AI-generated image',
                                    fill: true,
                                    className: "object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/latest-news/src/components/ai-image-gallery.tsx",
                                    lineNumber: 125,
                                    columnNumber: 15
                                }, this),
                                images[currentIndex].source && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute bottom-2 right-2 bg-black/60 text-white/80 text-xs px-2 py-1 rounded",
                                    children: images[currentIndex].source
                                }, void 0, false, {
                                    fileName: "[project]/latest-news/src/components/ai-image-gallery.tsx",
                                    lineNumber: 134,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: prevImage,
                                    className: "absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full",
                                    "aria-label": "Previous image",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                        className: "h-5 w-5"
                                    }, void 0, false, {
                                        fileName: "[project]/latest-news/src/components/ai-image-gallery.tsx",
                                        lineNumber: 145,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/latest-news/src/components/ai-image-gallery.tsx",
                                    lineNumber: 140,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: nextImage,
                                    className: "absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full",
                                    "aria-label": "Next image",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                        className: "h-5 w-5"
                                    }, void 0, false, {
                                        fileName: "[project]/latest-news/src/components/ai-image-gallery.tsx",
                                        lineNumber: 153,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/latest-news/src/components/ai-image-gallery.tsx",
                                    lineNumber: 148,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/latest-news/src/components/ai-image-gallery.tsx",
                            lineNumber: 124,
                            columnNumber: 13
                        }, this),
                        images[currentIndex].prompt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-sm text-white/70 italic",
                            children: [
                                '"',
                                images[currentIndex].prompt,
                                '"'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/latest-news/src/components/ai-image-gallery.tsx",
                            lineNumber: 159,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-2 text-xs text-white/60",
                            children: [
                                currentIndex + 1,
                                " of ",
                                images.length
                            ]
                        }, void 0, true, {
                            fileName: "[project]/latest-news/src/components/ai-image-gallery.tsx",
                            lineNumber: 165,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/latest-news/src/components/ai-image-gallery.tsx",
                    lineNumber: 123,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-white/70 p-4 text-center",
                    children: "No images found. Try a different query."
                }, void 0, false, {
                    fileName: "[project]/latest-news/src/components/ai-image-gallery.tsx",
                    lineNumber: 170,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "mt-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: customPrompt,
                                onChange: (e)=>setCustomPrompt(e.target.value),
                                placeholder: "Enter a custom prompt...",
                                className: "flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            }, void 0, false, {
                                fileName: "[project]/latest-news/src/components/ai-image-gallery.tsx",
                                lineNumber: 178,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: isGenerating || !customPrompt.trim(),
                                className: "px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800/50 disabled:cursor-not-allowed rounded-md text-white flex items-center gap-2",
                                children: isGenerating ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                            className: "h-4 w-4 animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/latest-news/src/components/ai-image-gallery.tsx",
                                            lineNumber: 192,
                                            columnNumber: 19
                                        }, this),
                                        "Generating..."
                                    ]
                                }, void 0, true) : 'Generate'
                            }, void 0, false, {
                                fileName: "[project]/latest-news/src/components/ai-image-gallery.tsx",
                                lineNumber: 185,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/latest-news/src/components/ai-image-gallery.tsx",
                        lineNumber: 177,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/latest-news/src/components/ai-image-gallery.tsx",
                    lineNumber: 176,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/latest-news/src/components/ai-image-gallery.tsx",
            lineNumber: 105,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/latest-news/src/components/ai-image-gallery.tsx",
        lineNumber: 104,
        columnNumber: 5
    }, this);
}
_s(AIImageGallery, "DjoLMhhBDFR5gj8gx/Avj8PPv1w=");
_c = AIImageGallery;
var _c;
__turbopack_context__.k.register(_c, "AIImageGallery");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=latest-news_src_b4744fe7._.js.map
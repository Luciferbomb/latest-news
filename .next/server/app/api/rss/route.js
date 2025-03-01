(()=>{var e={};e.id=394,e.ids=[394],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},4870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},6487:()=>{},8335:()=>{},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},9617:(e,t,r)=>{"use strict";r.r(t),r.d(t,{patchFetch:()=>g,routeModule:()=>p,serverHooks:()=>d,workAsyncStorage:()=>u,workUnitAsyncStorage:()=>c});var s={};r.r(s),r.d(s,{GET:()=>l});var a=r(2706),n=r(8203),i=r(5994),o=r(9187);async function l(){try{let e=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL||"http://localhost:3000"}/api/combined-news`);if(!e.ok)throw Error("Failed to fetch news data");let t=(await e.json()).news||[],r=function(e){let t=process.env.NEXT_PUBLIC_BASE_URL||"http://localhost:3000",r=new Date().toUTCString(),s=`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AI News Hub</title>
    <link>${t}</link>
    <description>The latest news and updates from the world of artificial intelligence</description>
    <language>en-us</language>
    <lastBuildDate>${r}</lastBuildDate>
    <atom:link href="${t}/api/rss" rel="self" type="application/rss+xml" />
`;return e.forEach(e=>{let t=new Date(e.date).toUTCString();s+=`    <item>
      <title><![CDATA[${e.title}]]></title>
      <link>${e.url}</link>
      <guid isPermaLink="false">${e.id}</guid>
      <pubDate>${t}</pubDate>
      <description><![CDATA[${e.description}]]></description>
      ${e.imageUrl?`<enclosure url="${e.imageUrl}" type="image/jpeg" />`:""}
      ${e.categories?.map(e=>`<category>${e}</category>`).join("\n      ")||""}
      ${e.source?`<source url="${e.url}">${e.source}</source>`:""}
    </item>
`}),s+=`  </channel>
</rss>`}(t);return new o.NextResponse(r,{headers:{"Content-Type":"application/xml","Cache-Control":"public, max-age=3600, s-maxage=3600"}})}catch(e){return console.error("Error generating RSS feed:",e),o.NextResponse.json({error:"Failed to generate RSS feed"},{status:500})}}let p=new a.AppRouteRouteModule({definition:{kind:n.RouteKind.APP_ROUTE,page:"/api/rss/route",pathname:"/api/rss",filename:"route",bundlePath:"app/api/rss/route"},resolvedPagePath:"/Users/ashutoshranjan/test/src/app/api/rss/route.ts",nextConfigOutput:"",userland:s}),{workAsyncStorage:u,workUnitAsyncStorage:c,serverHooks:d}=p;function g(){return(0,i.patchFetch)({workAsyncStorage:u,workUnitAsyncStorage:c})}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[638,452],()=>r(9617));module.exports=s})();
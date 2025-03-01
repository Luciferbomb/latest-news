import { DemoHeroGeometric } from "@/components/demo-hero-geometric";
import { NewsFeed } from "@/components/news-feed";
import { VideoNewsSection } from "@/components/video-news-section";
import { AIImageGallery } from "@/components/ai-image-gallery";
import { JobImpactPromo } from "@/components/job-impact-promo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI News Hub - Latest Updates on AI Tools",
  description: "Stay updated with the latest news and developments in AI tools and technologies in real-time.",
};

export default function Home() {
  return (
    <main>
      <DemoHeroGeometric />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <VideoNewsSection />
          </div>
          <div>
            <AIImageGallery query="artificial intelligence news visualization" />
          </div>
        </div>
        
        {/* AI Job Impact Calculator Promo */}
        <div className="mt-16 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Explore AI's Impact on Jobs
          </h2>
          <JobImpactPromo />
        </div>
      </div>
      <NewsFeed />
    </main>
  );
}

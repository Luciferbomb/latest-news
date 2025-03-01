import { DemoHeroGeometric } from "@/components/demo-hero-geometric";
import { NewsFeed } from "@/components/news-feed";
import VideoNewsSection from "@/components/video-news-section";
import { AIImageGallery } from "@/components/ai-image-gallery";
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
      </div>
      <NewsFeed />
    </main>
  );
}

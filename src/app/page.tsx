import { TrendsDashboard } from './components/TrendsDashboard';
import { NewsFeed } from '@/components/news-feed';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI News Hub - Latest Updates on AI Tools",
  description: "Stay updated with the latest news and developments in AI tools and technologies in real-time.",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-[#030303] to-[#050505]">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              Your AI News Hub
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
              Stay updated with the latest in artificial intelligence, powered by real-time trend analysis.
            </p>
          </div>
        </div>
      </section>

      {/* Trends Dashboard */}
      <section className="w-full py-12 bg-gradient-to-b from-[#050505] to-[#030303]">
        <div className="container px-4 md:px-6">
          <TrendsDashboard />
        </div>
      </section>

      {/* News Feed */}
      <section className="w-full py-12 bg-gradient-to-b from-[#030303] to-[#050505]">
        <div className="container px-4 md:px-6">
          <NewsFeed />
        </div>
      </section>
    </main>
  );
}

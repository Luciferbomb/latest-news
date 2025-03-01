import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About AI News Hub",
  description: "Learn more about AI News Hub, your source for the latest AI tools and technologies.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-[#030303] to-[#050505]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-rose-400 mb-6">
            About AI News Hub
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">Our Mission</h2>
              <p className="text-white/70 leading-relaxed">
                AI News Hub is dedicated to providing the most up-to-date and comprehensive coverage of artificial intelligence tools, technologies, and breakthroughs. Our mission is to keep you informed about the rapidly evolving AI landscape, helping you stay ahead of the curve in this transformative field.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">What We Cover</h2>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-indigo-500 mt-2"></span>
                  <span>Latest AI tool releases and updates from major companies and startups</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-indigo-500 mt-2"></span>
                  <span>Breakthroughs in machine learning, natural language processing, and computer vision</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-indigo-500 mt-2"></span>
                  <span>Applications of AI across industries including healthcare, finance, education, and more</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-indigo-500 mt-2"></span>
                  <span>Ethical considerations and responsible AI development</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-indigo-500 mt-2"></span>
                  <span>Interviews with AI researchers, developers, and thought leaders</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">Our Team</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Our team consists of AI enthusiasts, researchers, and journalists who are passionate about the field of artificial intelligence. We work tirelessly to bring you accurate, timely, and insightful coverage of the AI landscape.
              </p>
              <p className="text-white/70 leading-relaxed">
                We believe in the transformative power of AI and its potential to solve some of humanity's most pressing challenges. At the same time, we recognize the importance of responsible AI development and deployment.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-semibold text-white mb-4">Stay Connected</h2>
              <p className="text-white/70 mb-4">
                Subscribe to our newsletter to receive the latest AI news directly in your inbox.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-rose-500 text-white text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Subscribe
                </button>
              </form>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-semibold text-white mb-4">Contact Us</h2>
              <p className="text-white/70 mb-4">
                Have a tip, suggestion, or want to collaborate? We'd love to hear from you!
              </p>
              <a
                href="mailto:contact@ainewshub.com"
                className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                contact@ainewshub.com
              </a>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-semibold text-white mb-4">Our Values</h2>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-start gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-rose-500 mt-2"></span>
                  <span>Accuracy and integrity in reporting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-rose-500 mt-2"></span>
                  <span>Accessibility of information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-rose-500 mt-2"></span>
                  <span>Promoting ethical AI development</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-rose-500 mt-2"></span>
                  <span>Diversity and inclusion in AI</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

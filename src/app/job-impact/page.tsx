import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import JobImpactContent from "./job-impact-content";

export const metadata: Metadata = {
  title: "AI Job Impact Calculator | AI News Hub",
  description: "Explore how AI might impact different professions and industries over the next 5 years with our interactive calculator.",
};

export default function JobImpactPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-[#030303] to-[#050505]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">AI Job Impact Calculator</h1>
          <p className="text-lg text-white/70 max-w-3xl mb-8">
            Explore how artificial intelligence might transform different professions over the next 5 years. 
            Select your industry and job role to see a detailed forecast of AI's potential impact on key job tasks.
          </p>
        </div>

        <JobImpactContent />
        
        <div className="mt-12 bg-white/5 rounded-lg p-6 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-white mb-3">About This Tool</h2>
          <p className="text-white/70 mb-4">
            This interactive calculator is based on research and trends in AI adoption across industries. 
            The predictions represent potential scenarios based on current technological trajectories and 
            expert forecasts, but actual outcomes may vary based on numerous factors including regulatory changes, 
            technological breakthroughs, and social adaptations.
          </p>
          <p className="text-white/70">
            Rather than focusing on job replacement, we've highlighted how AI will likely transform roles 
            by automating routine tasks while potentially creating new opportunities that leverage uniquely 
            human skills such as creativity, empathy, and strategic thinking.
          </p>
        </div>
      </div>
    </div>
  );
} 
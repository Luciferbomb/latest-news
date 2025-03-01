"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { TrendingUp, BriefcaseBusiness, BrainCog, ArrowRight } from 'lucide-react';

export function JobImpactPromo() {
  return (
    <div className="w-full bg-gradient-to-br from-blue-900/20 to-indigo-900/20 rounded-xl overflow-hidden border border-blue-800/30 shadow-lg">
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <BriefcaseBusiness className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-blue-400">
            Interactive Tool
          </h3>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-3">
          AI Job Impact Calculator
        </h2>
        
        <p className="text-white/70 mb-6">
          Discover how AI might transform your profession over the next 5 years. Explore impact predictions 
          across 8 industries and 40+ job roles.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="flex items-center gap-2 bg-white/5 rounded-lg p-3">
            <TrendingUp className="h-4 w-4 text-blue-400 flex-shrink-0" />
            <span className="text-sm text-white/80">Impact forecasting</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 rounded-lg p-3">
            <BriefcaseBusiness className="h-4 w-4 text-blue-400 flex-shrink-0" />
            <span className="text-sm text-white/80">40+ job roles</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 rounded-lg p-3">
            <BrainCog className="h-4 w-4 text-blue-400 flex-shrink-0" />
            <span className="text-sm text-white/80">Task automation</span>
          </div>
        </div>
        
        <Link 
          href="/job-impact" 
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg transition-colors"
        >
          Try the Calculator
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
} 
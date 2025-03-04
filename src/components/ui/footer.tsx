"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#030303] border-t border-white/10 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-rose-400">
                AI News Hub
              </span>
            </Link>
            <p className="text-sm text-white/60 mb-4">
              Stay updated with the latest news and developments in AI tools and technologies in real-time.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Latest News
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/categories?category=ai-tools"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  AI Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/categories?category=machine-learning"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Machine Learning
                </Link>
              </li>
              <li>
                <Link
                  href="/categories?category=nlp"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Natural Language Processing
                </Link>
              </li>
              <li>
                <Link
                  href="/categories?category=computer-vision"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Computer Vision
                </Link>
              </li>
              <li>
                <Link
                  href="/categories?category=robotics"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Robotics
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Subscribe</h3>
            <p className="text-sm text-white/60 mb-4">
              Get the latest AI news delivered to your inbox.
            </p>
            <form className="space-y-2">
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
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-center">
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="flex items-center justify-center gap-2">
              <img 
                src="/images/logo-color.svg" 
                alt="Quantash Global Tech Logo" 
                className="h-10 w-10" 
              />
              <span className="text-white/80 text-lg font-light">Quantash Global Tech</span>
              <span className="text-xs align-top text-white/60">™</span>
            </div>
            <p className="text-sm text-white/40">
              © {new Date().getFullYear()} AI News Hub. A product of Quantash Global Tech™. All rights reserved.
            </p>
            <p className="text-xs text-white/30 mt-1">
              Version 1.2.3 | <span className="text-indigo-400/60">Enhanced YouTube Video Support</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

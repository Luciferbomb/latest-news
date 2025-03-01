"use client";

import { cn } from "@/lib/utils";
import { Menu, X, Search, BellRing } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-black/80 backdrop-blur-md py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center">
              <img 
                src="/images/logo-color.svg" 
                alt="Quantash Labs Ai Logo" 
                className="h-8 w-8" 
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-rose-400">
                AI News Hub
              </span>
              <span className="text-[10px] text-white/60 -mt-1">by Quantash Labs Ai™</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-white/80 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="#"
              className="text-white/80 hover:text-white transition-colors"
            >
              Latest News
            </Link>
            <Link
              href="/blog"
              className="text-white/80 hover:text-white transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/job-impact"
              className="text-white/80 hover:text-white transition-colors"
            >
              Job Impact
            </Link>
            <Link
              href="/categories"
              className="text-white/80 hover:text-white transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/about"
              className="text-white/80 hover:text-white transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/search"
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Link>
            <button
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Notifications"
            >
              <BellRing className="h-5 w-5" />
            </button>
            <button className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-rose-500 text-white text-sm font-medium hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 backdrop-blur-md"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src="/images/logo-color.svg" 
                  alt="Quantash Labs Ai Logo" 
                  className="h-6 w-6" 
                />
                <span className="text-sm text-white/60">Quantash Labs Ai™</span>
              </div>
              <nav className="flex flex-col gap-4">
                <Link
                  href="/"
                  className="text-white/80 hover:text-white transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="#"
                  className="text-white/80 hover:text-white transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Latest News
                </Link>
                <Link
                  href="/blog"
                  className="text-white/80 hover:text-white transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/job-impact"
                  className="text-white/80 hover:text-white transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Job Impact
                </Link>
                <Link
                  href="/categories"
                  className="text-white/80 hover:text-white transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Categories
                </Link>
                <Link
                  href="/about"
                  className="text-white/80 hover:text-white transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <div className="flex items-center gap-4 pt-4">
                  <Link
                    href="/search"
                    className="text-white/80 hover:text-white transition-colors"
                    aria-label="Search"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Search className="h-5 w-5" />
                  </Link>
                  <button
                    className="text-white/80 hover:text-white transition-colors"
                    aria-label="Notifications"
                  >
                    <BellRing className="h-5 w-5" />
                  </button>
                  <button className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-rose-500 text-white text-sm font-medium hover:opacity-90 transition-opacity">
                    Subscribe
                  </button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

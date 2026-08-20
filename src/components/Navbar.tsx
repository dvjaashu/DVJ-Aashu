import React, { useState, useEffect } from 'react';
import { Calendar, Download, Menu, X, Sun, Moon, Sparkles } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { DvjAashuLogo } from './DvjAashuLogo';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenPressKit: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenPressKit }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = audioEngine.subscribe((state) => {
      setIsPlaying(state.isPlaying);
    });
    return () => unsubscribe();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <nav
          className={`flex items-center justify-between px-4 sm:px-7 py-3 rounded-full transition-all duration-300 border ${
            isScrolled
              ? 'glass-nav-scrolled shadow-lg'
              : 'glass-nav-light shadow-sm'
          }`}
        >
          {/* Official DVJ Aashu Brand Logo */}
          <a href="#" className="flex items-center group">
            <DvjAashuLogo size="md" animated={isPlaying} />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-7 text-xs font-medium text-[var(--text-secondary)]">
            <a href="#music" className="hover:text-[var(--text-primary)] transition-colors">
              Catalogue & SoundCloud
            </a>
            <a href="#updates" className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5">
              <span>Latest Updates</span>
              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono bg-[var(--accent)]/15 text-[var(--accent)] font-semibold">New</span>
            </a>
            <a href="#gallery" className="hover:text-[var(--text-primary)] transition-colors">
              Visual Archive
            </a>
            <a href="#booth" className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1">
              <span>AV Booth</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            </a>
            <a href="#tour" className="hover:text-[var(--text-primary)] transition-colors">
              Tour Dates
            </a>
            <a href="#services" className="hover:text-[var(--text-primary)] transition-colors">
              18 Years & Rider
            </a>
          </div>

          {/* Action CTAs & Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Theme Toggle Button (Light <-> Midnight Club) */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium bg-[var(--bg-surface)] hover:bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-all border border-[var(--border-subtle)] hover:border-[var(--border-medium)] flex items-center gap-1.5 cursor-pointer shadow-sm"
              title={`Switch to ${theme === 'light' ? 'Midnight Club Dark Mode' : 'Clean Light Mode'}`}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#0071E3]" />
                  <span className="hidden lg:inline text-[11px] font-mono text-[var(--text-secondary)]">Midnight</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden lg:inline text-[11px] font-mono text-[var(--text-secondary)]">Light</span>
                </>
              )}
            </button>

            <button
              onClick={onOpenPressKit}
              className="hidden sm:flex px-3.5 py-1.5 rounded-full text-xs font-medium text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors border border-[var(--border-subtle)] items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
              <span>EPK</span>
            </button>

            <button
              onClick={onOpenBooking}
              className="hidden sm:flex px-4 py-1.5 rounded-full text-xs font-medium btn-primary items-center gap-1.5 shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Inquire & Book</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-full transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-5 bg-[var(--bg-surface)] backdrop-blur-xl rounded-3xl border border-[var(--border-medium)] shadow-2xl space-y-4 animate-in slide-in-from-top-3 duration-200">
            <div className="flex flex-col space-y-3 text-sm font-medium text-[var(--text-primary)]">
              <a
                href="#music"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[var(--accent)] transition-colors"
              >
                Music Catalogue & SoundCloud
              </a>
              <a
                href="#updates"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[var(--accent)] transition-colors flex items-center justify-between"
              >
                <span>Latest Updates (Instagram)</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[var(--accent)]/15 text-[var(--accent)]">New</span>
              </a>
              <a
                href="#gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[var(--accent)] transition-colors"
              >
                Visual & Event Archive
              </a>
              <a
                href="#booth"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[var(--accent)] transition-colors"
              >
                Virtual AV DJ Booth
              </a>
              <a
                href="#tour"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[var(--accent)] transition-colors"
              >
                Tour Dates & Residencies
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[var(--accent)] transition-colors"
              >
                18-Year Milestone Timeline & Rider
              </a>
            </div>

            <div className="pt-3 border-t border-[var(--border-subtle)] flex flex-col gap-2">
              <button
                onClick={() => {
                  toggleTheme();
                }}
                className="w-full py-2.5 rounded-full text-xs font-medium bg-[var(--bg-secondary)] text-[var(--text-primary)] flex items-center justify-center gap-2 cursor-pointer"
              >
                {theme === 'light' ? (
                  <>
                    <Moon className="w-4 h-4 text-[#0071E3]" />
                    <span>Switch to Midnight Club Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span>Switch to Clean Light Mode</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPressKit();
                }}
                className="w-full py-2.5 rounded-full text-xs font-medium bg-[var(--bg-secondary)] text-[var(--text-primary)] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
                Download Electronic Press Kit
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-2.5 rounded-full text-xs font-medium btn-primary flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                Inquire & Book Performance
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};



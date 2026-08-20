import React from 'react';
import { Music, Video, Mail, MapPin, ArrowUp, ExternalLink } from 'lucide-react';
import { DvjAashuLogo } from './DvjAashuLogo';
import { OFFICIAL_SOCIALS } from '../data/musicData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[var(--bg-primary)] text-[var(--text-primary)] border-t border-[var(--border-subtle)] pt-16 pb-28 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[var(--border-subtle)] text-left">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <DvjAashuLogo size="lg" />

            <p className="text-xs text-[var(--text-secondary)] max-w-sm leading-relaxed">
              18 years of pioneering Audio-Visual DJing and experimental electronic music from Jaipur, Rajasthan. Fusing Rajasthani folk heritage and live classical flute with high-octane House, Trance, and frame-accurate video scratching on Classitrick.
            </p>

            <div className="text-[11px] font-mono text-[var(--text-tertiary)]">
              Ashutosh Verma • Official Artist Portfolio & Media Portal
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-mono text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">
              Portfolio Navigation
            </div>
            <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
              <li>
                <a href="#music" className="hover:text-[var(--accent)] transition-colors">
                  Original Music Catalogue
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[var(--accent)] transition-colors">
                  18-Year Visual Archive
                </a>
              </li>
              <li>
                <a href="#booth" className="hover:text-[var(--accent)] transition-colors">
                  Virtual AV DJ Console
                </a>
              </li>
              <li>
                <a href="#tour" className="hover:text-[var(--accent)] transition-colors">
                  Tour Dates & Residencies
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[var(--accent)] transition-colors">
                  18 Years Timeline & Technical Rider
                </a>
              </li>
            </ul>
          </div>

          {/* Official Profiles & Channels */}
          <div className="md:col-span-4 space-y-3">
            <div className="font-mono text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">
              Official Verified Channels
            </div>
            <div className="flex flex-col space-y-2 text-xs">
              <a
                href={OFFICIAL_SOCIALS.amazonMusic}
                target="_blank"
                rel="noreferrer"
                className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors flex items-center justify-between p-2 rounded-xl bg-[var(--bg-surface-elevated)] hover:bg-[var(--accent-subtle)] border border-[var(--border-subtle)] group"
              >
                <div className="flex items-center gap-2">
                  <Music className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span className="font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)]">Amazon Music Artist Profile</span>
                </div>
                <ExternalLink className="w-3 h-3 text-[var(--text-tertiary)]" />
              </a>

              <a
                href={OFFICIAL_SOCIALS.soundCloud}
                target="_blank"
                rel="noreferrer"
                className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors flex items-center justify-between p-2 rounded-xl bg-[var(--bg-surface-elevated)] hover:bg-[var(--accent-subtle)] border border-[var(--border-subtle)] group"
              >
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span className="font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)]">SoundCloud Profile (dvjaashu)</span>
                </div>
                <ExternalLink className="w-3 h-3 text-[var(--text-tertiary)]" />
              </a>

              <a
                href={OFFICIAL_SOCIALS.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors flex items-center justify-between p-2 rounded-xl bg-[var(--bg-surface-elevated)] hover:bg-[var(--accent-subtle)] border border-[var(--border-subtle)] group"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)]">Instagram (@dvjaashuofficial)</span>
                </div>
                <ExternalLink className="w-3 h-3 text-[var(--text-tertiary)]" />
              </a>

              <a
                href={OFFICIAL_SOCIALS.facebook}
                target="_blank"
                rel="noreferrer"
                className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors flex items-center justify-between p-2 rounded-xl bg-[var(--bg-surface-elevated)] hover:bg-[var(--accent-subtle)] border border-[var(--border-subtle)] group"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)]">Facebook Official Page</span>
                </div>
                <ExternalLink className="w-3 h-3 text-[var(--text-tertiary)]" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-tertiary)]">
          <div>
            © {new Date().getFullYear()} DVJ Aashu (Ashutosh Verma). All rights reserved. Classitrick Records • Jaipur, Rajasthan.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};


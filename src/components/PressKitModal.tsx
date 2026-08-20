import React, { useState } from 'react';
import { X, Download, FileText, Camera, Disc, ExternalLink, Copy, Check, Sparkles, Music, Video } from 'lucide-react';

interface PressKitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PressKitModal: React.FC<PressKitModalProps> = ({ isOpen, onClose }) => {
  const [copiedBio, setCopiedBio] = useState(false);

  if (!isOpen) return null;

  const shortBio = `DVJ Aashu (Ashutosh Verma) is a pioneering Audio-Visual DJ, Music Producer, and Composer with over 18 years of experience from Jaipur, Rajasthan. Known for fusing classical Indian instrumental textures and Nazar Khan’s live flute with high-octane House, Trance, and frame-accurate video scratching, his original discography on Classitrick includes "Disciple of Nature", "Translucent Flute", and "Fear of Darkness".`;

  const copyBio = () => {
    navigator.clipboard.writeText(shortBio);
    setCopiedBio(true);
    setTimeout(() => setCopiedBio(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="apple-card max-w-2xl w-full p-6 sm:p-8 bg-[var(--bg-surface)] relative max-h-[90vh] overflow-y-auto shadow-2xl text-left border border-[var(--border-subtle)]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[var(--bg-surface-elevated)] hover:bg-[var(--border-medium)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-[var(--accent-subtle)] text-[var(--accent)] flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider font-semibold">
              OFFICIAL ELECTRONIC PRESS KIT (EPK)
            </span>
            <h3 className="font-headline font-bold text-2xl text-[var(--text-primary)]">
              DVJ Aashu • Press & Media Kit
            </h3>
          </div>
        </div>

        {/* Quick Bio Section */}
        <div className="space-y-4 text-xs text-[var(--text-secondary)] leading-relaxed border-b border-[var(--border-subtle)] pb-6">
          <div className="flex items-center justify-between">
            <span className="font-mono font-semibold text-[var(--text-primary)]">Short Biography:</span>
            <button
              onClick={copyBio}
              className="text-[var(--accent)] font-medium flex items-center gap-1 hover:underline cursor-pointer"
            >
              {copiedBio ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedBio ? 'Copied' : 'Copy Bio'}</span>
            </button>
          </div>

          <p className="p-3.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)]">
            {shortBio}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
            <div>
              <span className="font-mono text-[var(--text-tertiary)] block text-[10px]">Real Name:</span>
              <span className="font-semibold text-[var(--text-primary)]">Ashutosh Verma</span>
            </div>
            <div>
              <span className="font-mono text-[var(--text-tertiary)] block text-[10px]">Base & Roots:</span>
              <span className="font-semibold text-[var(--text-primary)]">Jaipur, Rajasthan</span>
            </div>
            <div>
              <span className="font-mono text-[var(--text-tertiary)] block text-[10px]">Experience:</span>
              <span className="font-semibold text-[var(--text-primary)]">18 Years Active</span>
            </div>
            <div>
              <span className="font-mono text-[var(--text-tertiary)] block text-[10px]">Primary Label:</span>
              <span className="font-semibold text-[var(--text-primary)]">Classitrick</span>
            </div>
          </div>
        </div>

        {/* Key Collaborations & Milestones */}
        <div className="py-5 border-b border-[var(--border-subtle)] space-y-3">
          <span className="font-mono font-semibold text-xs text-[var(--text-primary)] block">
            Notable Works & Collaborations:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
              <strong className="text-[var(--text-primary)]">Nazar Khan (Live Flute):</strong>
              <div className="text-[11px] text-[var(--text-secondary)]">"Disciple of Nature" & "Translucent Flute"</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
              <strong className="text-[var(--text-primary)]">Dino Banjara & DJ Jazz:</strong>
              <div className="text-[11px] text-[var(--text-secondary)]">"Sanak (Official Deep House Remix)"</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
              <strong className="text-[var(--text-primary)]">Ora Club Residency:</strong>
              <div className="text-[11px] text-[var(--text-secondary)]">Longstanding Audio-Visual Club Resident</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
              <strong className="text-[var(--text-primary)]">Hotel OM Tower (2013):</strong>
              <div className="text-[11px] text-[var(--text-secondary)]">Historic "Summer Spark" Heavy Electro Set</div>
            </div>
          </div>
        </div>

        {/* Asset Downloads & Links */}
        <div className="pt-5 space-y-3">
          <span className="font-mono font-semibold text-xs text-[var(--text-primary)] block">
            Media Links & Direct Verified Profiles:
          </span>
          
          <div className="flex flex-wrap gap-2.5">
            <a
              href="https://music.amazon.in/artists/B0CW1M5Q4R/dvj-aashu"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-full bg-[var(--bg-surface-elevated)] hover:bg-[var(--border-medium)] text-[var(--text-primary)] text-xs font-mono transition-colors flex items-center gap-1.5 border border-[var(--border-subtle)]"
            >
              <Music className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Amazon Music (DVJ Aashu)</span>
            </a>

            <a
              href="https://soundcloud.com/dvjaashu"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-full bg-[var(--bg-surface-elevated)] hover:bg-[var(--border-medium)] text-[var(--text-primary)] text-xs font-mono transition-colors flex items-center gap-1.5 border border-[var(--border-subtle)]"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>SoundCloud Profile</span>
            </a>

            <a
              href="https://instagram.com/dvjaashuofficial"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-full bg-[var(--bg-surface-elevated)] hover:bg-[var(--border-medium)] text-[var(--text-primary)] text-xs font-mono transition-colors flex items-center gap-1.5 border border-[var(--border-subtle)]"
            >
              <Camera className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Instagram (@dvjaashuofficial)</span>
            </a>

            <a
              href="https://facebook.com/dvjaashuofficial"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-full bg-[var(--bg-surface-elevated)] hover:bg-[var(--border-medium)] text-[var(--text-primary)] text-xs font-mono transition-colors flex items-center gap-1.5 border border-[var(--border-subtle)]"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Facebook Official</span>
            </a>

            <a
              href="https://music.apple.com/in/artist/dvj-aashu"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-full bg-[var(--bg-surface-elevated)] hover:bg-[var(--border-medium)] text-[var(--text-primary)] text-xs font-mono transition-colors flex items-center gap-1.5 border border-[var(--border-subtle)]"
            >
              <Music className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Apple Music</span>
            </a>
          </div>
        </div>

        {/* Close CTA */}
        <div className="mt-8 pt-4 border-t border-[var(--border-subtle)] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full btn-primary text-xs font-medium cursor-pointer"
          >
            Close Press Kit
          </button>
        </div>

      </div>
    </div>
  );
};

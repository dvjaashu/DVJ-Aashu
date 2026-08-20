import React from 'react';
import { Play, Pause, Disc, Sparkles, Volume2, Sliders, ExternalLink, Heart, Music, Video } from 'lucide-react';
import { Track } from '../types';

interface TrackCardProps {
  track: Track;
  isPlaying: boolean;
  onPlayToggle: () => void;
  onOpenStemModal: () => void;
}

export const TrackCard: React.FC<TrackCardProps> = ({
  track,
  isPlaying,
  onPlayToggle,
  onOpenStemModal,
}) => {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="apple-card p-5 flex flex-col justify-between group transition-all duration-300">
      
      {/* Top Media & Cover */}
      <div>
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#E5E5EA] mb-4">
          <img
            src={track.coverUrl}
            alt={track.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Overlays */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-black/60 backdrop-blur-md text-white border border-white/10 uppercase">
              {track.genre}
            </span>
          </div>

          {/* Quick Play overlay button */}
          <button
            onClick={onPlayToggle}
            className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            <div className="w-12 h-12 rounded-full bg-white text-[#1D1D1F] flex items-center justify-center shadow-lg shadow-black/20 transform scale-90 group-hover:scale-100 transition-transform">
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current translate-x-0.5" />
              )}
            </div>
          </button>

          {/* Playing wave badge */}
          {isPlaying && (
            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-[#0071E3] text-white text-[10px] font-mono font-medium flex items-center gap-1.5 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              <span>SYNTHESIZING</span>
            </div>
          )}
        </div>

        {/* Track Metadata */}
        <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-tertiary)] mb-1">
          <span>{track.releaseDate}</span>
          <span className="text-[var(--accent)] font-medium">{track.bpm} BPM • {track.key}</span>
        </div>

        <h3 className="font-headline font-bold text-base text-[var(--text-primary)] leading-snug group-hover:text-[var(--accent)] transition-colors">
          {track.title}
        </h3>

        {track.collaborators && (
          <div className="text-xs font-medium text-[var(--accent)] mt-0.5">
            {track.collaborators}
          </div>
        )}

        {track.label && (
          <div className="text-[11px] font-mono text-[var(--text-tertiary)] mt-0.5">
            Label: {track.label}
          </div>
        )}

        <p className="text-xs text-[var(--text-secondary)] mt-2 line-clamp-2 leading-relaxed">
          {track.description}
        </p>
      </div>

      {/* Footer Controls & Streaming Outlets */}
      <div className="mt-5 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-2">
        
        {/* Stem & Filter Audition Button */}
        <button
          onClick={onOpenStemModal}
          className="px-3 py-1.5 rounded-full bg-[var(--bg-surface-elevated)] hover:bg-[var(--border-medium)] text-[11px] font-mono font-medium text-[var(--text-primary)] border border-[var(--border-subtle)] flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Sliders className="w-3 h-3 text-[var(--accent)]" />
          <span>Stem Filter</span>
        </button>

        {/* Streaming links */}
        <div className="flex items-center gap-1.5">
          {track.links.amazonMusic && (
            <a
              href={track.links.amazonMusic}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-full hover:bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              title="Listen on Amazon Music"
            >
              <Music className="w-4 h-4" />
            </a>
          )}
          {track.links.soundCloud && (
            <a
              href={track.links.soundCloud}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-full hover:bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              title="Listen on SoundCloud"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

      </div>

    </div>
  );
};

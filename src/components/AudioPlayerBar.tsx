import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Sliders, ChevronUp, ChevronDown, Disc3 } from 'lucide-react';
import { TRACKS } from '../data/musicData';
import { audioEngine } from '../utils/audioEngine';

export const AudioPlayerBar: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(TRACKS[0].id);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(TRACKS[0].duration);
  const [volume, setVolume] = useState(85);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [filterCutoff, setFilterCutoff] = useState(20000);

  useEffect(() => {
    const unsub = audioEngine.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      if (state.trackId) {
        setCurrentTrackId(state.trackId);
      }
      setCurrentTime(state.currentTime);
      setDuration(state.duration);
    });
    return () => unsub();
  }, []);

  const currentTrack = TRACKS.find(t => t.id === currentTrackId) || TRACKS[0];
  const currentIndex = TRACKS.findIndex(t => t.id === currentTrack.id);

  const handlePlayToggle = () => {
    if (isPlaying) {
      audioEngine.pause();
    } else {
      audioEngine.playTrack(currentTrack.id, currentTrack.bpm, currentTrack.duration, currentTrack.synthPreset);
    }
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % TRACKS.length;
    const nextTrack = TRACKS[nextIdx];
    audioEngine.playTrack(nextTrack.id, nextTrack.bpm, nextTrack.duration, nextTrack.synthPreset);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + TRACKS.length) % TRACKS.length;
    const prevTrack = TRACKS[prevIdx];
    audioEngine.playTrack(prevTrack.id, prevTrack.bpm, prevTrack.duration, prevTrack.synthPreset);
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    audioEngine.setVolume(newVol / 100);
    if (isMuted && newVol > 0) {
      setIsMuted(false);
      audioEngine.setMute(false);
    }
  };

  const handleMuteToggle = () => {
    const next = !isMuted;
    setIsMuted(next);
    audioEngine.setMute(next);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTo = Number(e.target.value);
    setCurrentTime(seekTo);
    audioEngine.seek(seekTo);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-4 pointer-events-auto">
        
        {/* Expanded Sound Color FX Panel */}
        {isExpanded && (
          <div className="mb-2 p-4 bg-[var(--bg-surface)]/95 backdrop-blur-2xl border border-[var(--border-medium)] rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--accent-subtle)] text-[var(--accent)] flex items-center justify-center">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-[var(--text-primary)]">Master DJ Sound Color Low-Pass Filter</h4>
                <p className="text-[10px] font-mono text-[var(--text-secondary)]">Analog cutoff frequency curve emulation</p>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-72">
              <span className="text-[11px] font-mono text-[var(--text-secondary)]">Cutoff:</span>
              <input
                type="range"
                min="400"
                max="20000"
                step="200"
                value={filterCutoff}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setFilterCutoff(val);
                  audioEngine.setFilter(val);
                }}
                className="w-full accent-[var(--accent)] h-1.5 bg-[var(--bg-secondary)] rounded-lg cursor-pointer"
              />
              <span className="text-[11px] font-mono text-[var(--accent)] font-semibold min-w-[50px] text-right">
                {Math.round(filterCutoff)}Hz
              </span>
            </div>
          </div>
        )}

        {/* Main Dock Container */}
        <div className="bg-[var(--bg-surface)]/90 backdrop-blur-2xl rounded-2xl p-3 sm:p-3.5 border border-[var(--border-medium)] shadow-2xl shadow-black/20 flex flex-col gap-2">
          
          <div className="flex items-center justify-between gap-4">
            
            {/* Track Cover & Details */}
            <div className="flex items-center gap-3 min-w-0 max-w-[260px] sm:max-w-xs">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
                <img
                  src={currentTrack.coverUrl}
                  alt={currentTrack.title}
                  className={`w-full h-full object-cover ${isPlaying ? 'scale-105' : ''}`}
                />
                {isPlaying && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Disc3 className="w-4 h-4 text-white animate-spin" style={{ animationDuration: '3s' }} />
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-mono font-semibold text-[var(--accent)] bg-[var(--accent-subtle)] px-1 rounded uppercase">
                    {currentTrack.genre}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
                    {currentTrack.bpm} BPM
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] truncate">
                  {currentTrack.title}
                </h4>
              </div>
            </div>

            {/* Center Controls: Prev, Play, Next */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handlePrev}
                className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                title="Previous Track"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={handlePlayToggle}
                className="w-9 h-9 rounded-full bg-[var(--accent)] hover:bg-[var(--accent)]/90 active:scale-95 text-white flex items-center justify-center shadow-md transition-all cursor-pointer"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5 fill-white" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-white translate-x-0.5" />
                )}
              </button>

              <button
                onClick={handleNext}
                className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                title="Next Track"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Right Controls: Filter Toggle, Volume Slider */}
            <div className="flex items-center gap-3">
              
              {/* Filter Expand Button */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`px-2.5 py-1 rounded-full border text-xs font-mono flex items-center gap-1 transition-colors cursor-pointer hidden md:flex ${
                  isExpanded ? 'bg-[var(--accent)] text-white border-[var(--accent)]' : 'bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:bg-[var(--border-medium)]'
                }`}
                title="Sound Filter & EQ"
              >
                <Sliders className="w-3 h-3" />
                <span>FX</span>
                {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
              </button>

              {/* Volume Slider */}
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={handleMuteToggle}
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-1 cursor-pointer"
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => handleVolumeChange(Number(e.target.value))}
                  className="w-16 sm:w-20 accent-[var(--accent)] h-1.5 bg-[var(--bg-secondary)] rounded-lg cursor-pointer"
                />
              </div>

            </div>

          </div>

          {/* Scrub Bar */}
          <div className="flex items-center gap-3 text-[10px] font-mono text-[var(--text-tertiary)]">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 300}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 accent-[var(--accent)] h-1 bg-[var(--bg-secondary)] rounded-full appearance-none cursor-pointer"
            />
            <span>{formatTime(duration)}</span>
          </div>

        </div>

      </div>

    </div>
  );
};
